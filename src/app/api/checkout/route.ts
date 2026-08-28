import { NextResponse } from "next/server";
import { CURRENCY, MAX_QUANTITY, priceBasket, type CartLine } from "@/lib/catalogue";

/**
 * Orders from the shop.
 *
 * The browser sends product ids and quantities and nothing else. Every price,
 * every line total and the order total are computed here from the catalogue —
 * a basket that posts its own figures is a basket a customer can rewrite, and
 * no amount of client-side care changes that.
 *
 * Two ways an order can leave here, and which one runs depends on what is
 * configured rather than on a flag anyone has to remember to flip:
 *
 *   With `STRIPE_SECRET_KEY` set, a Stripe Checkout Session is created and its
 *   URL comes back for the browser to follow.
 *
 *   Without it — the state the studio is in until Stripe is connected — the
 *   order is delivered to `ORDER_WEBHOOK_URL` (falling back to the contact
 *   form's own hook) and the shop tells the customer plainly that they will be
 *   contacted to settle up. It never claims a payment it did not take.
 */

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

const str = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

/** Order reference: short, unambiguous when read aloud over the phone. */
function orderReference(): string {
  const alphabet = "ACDEFHJKLMNPRTUVWXY349";
  let tail = "";
  const bytes = crypto.getRandomValues(new Uint8Array(5));
  for (const byte of bytes) tail += alphabet[byte % alphabet.length];
  const now = new Date();
  return `MS-${String(now.getFullYear()).slice(2)}${String(now.getMonth() + 1).padStart(2, "0")}-${tail}`;
}

type Payload = {
  lines?: unknown;
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  note?: unknown;
  locale?: unknown;
  company?: unknown;
};

/** Ids and quantities only — anything else the browser sent is ignored. */
function readLines(value: unknown): CartLine[] {
  if (!Array.isArray(value)) return [];
  const lines: CartLine[] = [];
  for (const entry of value.slice(0, 50)) {
    if (!entry || typeof entry !== "object") continue;
    const { id, quantity } = entry as { id?: unknown; quantity?: unknown };
    if (typeof id !== "string") continue;
    if (typeof quantity !== "number" || !Number.isFinite(quantity)) continue;
    if (lines.some((line) => line.id === id)) continue;
    lines.push({ id, quantity: Math.min(MAX_QUANTITY, Math.max(1, Math.floor(quantity))) });
  }
  return lines;
}

/**
 * Create a Stripe Checkout Session over the REST API.
 *
 * Deliberately no SDK: this is one form-encoded POST, and a dependency that
 * exists for one call is a dependency to keep patched for one call. Swap it
 * for `stripe.checkout.sessions.create` if the integration grows past this.
 *
 * Untested against the live API — the studio has no keys yet — so it is kept
 * to the documented minimum and any failure falls through to the order hook
 * rather than losing the customer's basket.
 */
async function createStripeSession(
  key: string,
  origin: string,
  locale: string,
  reference: string,
  email: string,
  priced: ReturnType<typeof priceBasket>,
  names: Record<string, string>,
): Promise<string | null> {
  const form = new URLSearchParams();
  form.set("mode", "payment");
  form.set("success_url", `${origin}/${locale}?order=${reference}`);
  form.set("cancel_url", `${origin}/${locale}/kosar`);
  form.set("client_reference_id", reference);
  if (email) form.set("customer_email", email);

  priced.lines.forEach((line, index) => {
    const at = (field: string) => `line_items[${index}]${field}`;
    form.set(at("[quantity]"), String(line.quantity));
    form.set(at("[price_data][currency]"), CURRENCY.toLowerCase());
    form.set(at("[price_data][unit_amount]"), String(line.product.price));
    form.set(
      at("[price_data][product_data][name]"),
      names[line.product.id] ?? line.product.id,
    );
  });

  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/x-www-form-urlencoded",
      // Retrying a failed order must never charge twice.
      "Idempotency-Key": reference,
    },
    body: form,
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    console.error("[checkout] Stripe rejected the session:", response.status);
    return null;
  }

  const session: unknown = await response.json();
  const url = (session as { url?: unknown }).url;
  return typeof url === "string" ? url : null;
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: accept silently so bots don't learn they were caught.
  if (str(body.company, 200)) {
    return NextResponse.json({ ok: true, reference: orderReference() });
  }

  const buyer = {
    name: str(body.name, 120),
    email: str(body.email, 200),
    phone: str(body.phone, 60),
    note: str(body.note, 2000),
    locale: str(body.locale, 5) || "hu",
  };

  const priced = priceBasket(readLines(body.lines));

  const invalid: string[] = [];
  if (!buyer.name) invalid.push("name");
  if (!buyer.email || !EMAIL_RE.test(buyer.email)) invalid.push("email");
  if (!priced.lines.length) invalid.push("lines");

  if (invalid.length) {
    return NextResponse.json({ error: "validation", fields: invalid }, { status: 422 });
  }

  const reference = orderReference();
  const order = {
    reference,
    ...buyer,
    currency: CURRENCY,
    lines: priced.lines.map((line) => ({
      id: line.product.id,
      quantity: line.quantity,
      unitAmount: line.product.price,
      amount: line.total,
    })),
    total: priced.total,
    receivedAt: new Date().toISOString(),
  };

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (stripeKey) {
    const origin = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin;
    try {
      const url = await createStripeSession(
        stripeKey,
        origin,
        buyer.locale,
        reference,
        buyer.email,
        priced,
        // Line names come from the request rather than the catalogue: the
        // catalogue has no localised names, and Stripe's page should read in
        // the customer's language. They are labels only — the amounts beside
        // them were computed here.
        readNames(body.lines),
      );
      if (url) return NextResponse.json({ ok: true, reference, url });
    } catch (error) {
      console.error("[checkout] Stripe request failed:", error);
    }
    // Fall through: an order recorded is better than a basket lost.
  }

  const webhook = process.env.ORDER_WEBHOOK_URL ?? process.env.CONTACT_WEBHOOK_URL;

  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[checkout] no ORDER_WEBHOOK_URL set — order:", order);
      return NextResponse.json({ ok: true, reference, delivered: false });
    }
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.error("[checkout] webhook rejected the order:", response.status);
      return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true, reference, delivered: true });
  } catch (error) {
    console.error("[checkout] webhook request failed:", error);
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }
}

/** Display names the browser sent, for Stripe's own page. Labels only. */
function readNames(value: unknown): Record<string, string> {
  const names: Record<string, string> = {};
  if (!Array.isArray(value)) return names;
  for (const entry of value.slice(0, 50)) {
    if (!entry || typeof entry !== "object") continue;
    const { id, name } = entry as { id?: unknown; name?: unknown };
    if (typeof id === "string" && typeof name === "string") {
      names[id] = name.trim().slice(0, 160);
    }
  }
  return names;
}
