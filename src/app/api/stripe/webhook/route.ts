import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { priceBasket, type CartLine } from "@/lib/catalogue";
import { buildOrder, deliver, type Buyer } from "@/lib/orders";

/**
 * Stripe telling us a payment happened.
 *
 * This endpoint — not the customer's return trip — is what confirms an order.
 * The browser can reach `success_url` without having paid, by typing it, and a
 * customer who pays and then closes the tab never reaches it at all. Money
 * arriving is a fact about Stripe's servers, so it has to be Stripe's servers
 * that report it.
 *
 * Which makes this endpoint the one place on the site where an unauthenticated
 * POST causes the studio to act. Everything below exists to make sure only
 * Stripe can do that: a signature over the exact bytes received, checked with a
 * timing-safe comparison, within a five-minute window so a captured request
 * cannot be replayed tomorrow.
 */

export const runtime = "nodejs";
/* The signature covers the raw body. Anything that reparses it first — a body
   parser, a cache — invalidates it, so this route is always dynamic. */
export const dynamic = "force-dynamic";

/** Stripe's default tolerance, and a sensible one: five minutes. */
const TOLERANCE_SECONDS = 300;

/**
 * Verify `Stripe-Signature` against the raw body.
 *
 * The header looks like `t=1700000000,v1=<hex>,v1=<hex>` — more than one v1 is
 * normal while a secret is being rotated, so any match is a pass.
 */
function verify(raw: string, header: string | null, secret: string): boolean {
  if (!header) return false;

  let timestamp = "";
  const signatures: string[] = [];
  for (const part of header.split(",")) {
    const [key, value] = part.split("=", 2);
    if (key === "t") timestamp = value ?? "";
    if (key === "v1" && value) signatures.push(value);
  }
  if (!timestamp || !signatures.length) return false;

  const sent = Number(timestamp);
  if (!Number.isFinite(sent)) return false;
  if (Math.abs(Date.now() / 1000 - sent) > TOLERANCE_SECONDS) return false;

  const expected = createHmac("sha256", secret).update(`${timestamp}.${raw}`).digest();

  return signatures.some((candidate) => {
    let given: Buffer;
    try {
      given = Buffer.from(candidate, "hex");
    } catch {
      return false;
    }
    /* `timingSafeEqual` throws on a length mismatch, which is itself a leak of
       sorts — check the length first and compare only same-sized buffers. */
    if (given.length !== expected.length) return false;
    return timingSafeEqual(given, expected);
  });
}

/** `cambridge-30:1,private-5:2` back into a basket. */
function readLines(value: unknown): CartLine[] {
  if (typeof value !== "string" || !value) return [];
  const lines: CartLine[] = [];
  for (const part of value.split(",").slice(0, 50)) {
    const [id, count] = part.split(":");
    const quantity = Number(count);
    if (!id || !Number.isFinite(quantity)) continue;
    if (lines.some((line) => line.id === id)) continue;
    lines.push({ id, quantity });
  }
  return lines;
}

/**
 * Sessions already handled, so Stripe's retries do not order twice.
 *
 * In memory, which is honest about what it is: it covers the retries that
 * actually happen — seconds apart, into the same process — and not a restart or
 * a second instance. The event id travels in the delivered order too, so
 * whatever receives it can be certain rather than probable. A shop at this
 * volume does not need a database to hold five identifiers; one that outgrows
 * this should move the check there rather than make this cleverer.
 */
const handled = new Set<string>();
const HANDLED_CAP = 500;

function seenBefore(id: string): boolean {
  if (handled.has(id)) return true;
  handled.add(id);
  if (handled.size > HANDLED_CAP) {
    /* Oldest first — a Set iterates in insertion order. */
    for (const old of handled) {
      handled.delete(old);
      if (handled.size <= HANDLED_CAP) break;
    }
  }
  return false;
}

type Session = {
  id?: string;
  payment_status?: string;
  amount_total?: number;
  currency?: string;
  client_reference_id?: string;
  customer_email?: string;
  customer_details?: { email?: string; name?: string; phone?: string };
  payment_intent?: string;
  metadata?: Record<string, string>;
};

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    /* Nothing to verify against, so nothing can be trusted. Refusing is the
       only safe answer; `/api/checkout` warns about this state and delivers
       orders as unpaid so they are not lost while it lasts. */
    console.error("[stripe] STRIPE_WEBHOOK_SECRET is not set — refusing.");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const raw = await request.text();
  if (!verify(raw, request.headers.get("stripe-signature"), secret)) {
    return NextResponse.json({ error: "bad_signature" }, { status: 400 });
  }

  let event: { id?: string; type?: string; data?: { object?: Session } };
  try {
    event = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  /*
   * Two event types mean "this is paid". The second is for methods that settle
   * after the customer leaves the page; ignoring it would drop those orders on
   * the floor the day anything but a card is enabled in the dashboard.
   *
   * Everything else gets a 200 and no action. Answering an error to an event we
   * simply do not handle makes Stripe retry it forever and eventually disable
   * the endpoint — including for the events we do care about.
   */
  const paidEvents = ["checkout.session.completed", "checkout.session.async_payment_succeeded"];
  if (!event.type || !paidEvents.includes(event.type)) {
    return NextResponse.json({ ok: true, ignored: event.type ?? "unknown" });
  }

  const session = event.data?.object ?? {};
  if (session.payment_status !== "paid") {
    /* A completed session that is not paid yet — an asynchronous method still
       clearing. The success event will follow; nothing to deliver now. */
    return NextResponse.json({ ok: true, pending: session.payment_status ?? "unknown" });
  }

  const key = session.id ?? event.id ?? "";
  if (key && seenBefore(key)) {
    return NextResponse.json({ ok: true, duplicate: true });
  }

  const meta = session.metadata ?? {};
  const priced = priceBasket(readLines(meta.lines));
  if (!priced.lines.length) {
    /* Paid, but we cannot tell what for. Never silent: this is money taken
       against an order the studio cannot fulfil, and it needs a human. */
    console.error("[stripe] paid session with no recoverable basket:", key, meta);
    return NextResponse.json({ ok: true, unrecoverable: true });
  }

  /*
   * What Stripe collected, against what the catalogue says it should have been.
   *
   * They can only differ if a session was tampered with or a price changed
   * between the basket and the payment. Either way the studio is told the
   * amount Stripe actually took — never the one we recomputed — because that is
   * the figure on the customer's statement.
   */
  const collected = typeof session.amount_total === "number" ? session.amount_total : null;
  const mismatch = collected !== null && collected !== priced.total;
  if (mismatch) {
    console.error(
      `[stripe] amount mismatch on ${key}: Stripe took ${collected}, catalogue says ${priced.total}`,
    );
  }

  const buyer: Buyer = {
    name: meta.name || session.customer_details?.name || "",
    email: session.customer_email || session.customer_details?.email || "",
    phone: meta.phone || session.customer_details?.phone || "",
    note: meta.note || "",
    locale: meta.locale || "hu",
  };

  const order = buildOrder(
    meta.reference || session.client_reference_id || key,
    buyer,
    priced.lines,
    collected ?? priced.total,
    true,
  );
  order.paymentRef = typeof session.payment_intent === "string" ? session.payment_intent : key;
  order.eventId = event.id;

  const { configured, delivered } = await deliver(
    mismatch ? { ...order, amountMismatch: true } : order,
  );

  if (configured && !delivered) {
    /*
     * The money is taken and the studio has not been told. A 500 asks Stripe to
     * retry, which is exactly right — and the dedup entry is withdrawn so the
     * retry is not turned away as a duplicate.
     */
    handled.delete(key);
    return NextResponse.json({ error: "delivery_failed" }, { status: 500 });
  }
  if (!configured) {
    console.error("[stripe] paid order with nowhere to deliver it:", order.reference);
  }

  return NextResponse.json({ ok: true, reference: order.reference });
}
