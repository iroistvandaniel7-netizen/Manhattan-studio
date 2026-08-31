import { NextResponse } from "next/server";
import { CURRENCY, MAX_QUANTITY, priceBasket, type CartLine } from "@/lib/catalogue";
import { buildOrder, deliver, orderReference } from "@/lib/orders";

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

/**
 * Stripe's API root, overridable so the checkout can be exercised end to end
 * against a local stand-in. Nothing but the test harness ever sets it, and
 * anyone who can set environment variables on the server already owns it.
 */
export function stripeApiBase(): string {
  return process.env.STRIPE_API_BASE ?? "https://api.stripe.com";
}

const str = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

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
  buyer: { name: string; email: string; phone: string; note: string },
  priced: ReturnType<typeof priceBasket>,
  names: Record<string, string>,
): Promise<string | null> {
  const form = new URLSearchParams();
  form.set("mode", "payment");
  /* Where Stripe sends the customer back. The success page is a real page that
     shows the reference; cancelling returns to the price list with the basket
     still in it, so changing your mind costs nothing. An earlier version
     pointed `cancel_url` at `/kosar`, which is not a route — the basket is a
     panel — so anyone who backed out landed on a 404. */
  form.set("success_url", `${origin}/${locale}/koszonjuk?ref=${reference}`);
  form.set("cancel_url", `${origin}/${locale}#courses`);
  form.set("client_reference_id", reference);
  /* Stripe's own page, in the reader's language. */
  form.set("locale", locale);
  if (buyer.email) form.set("customer_email", buyer.email);

  /*
   * Everything the studio needs to fulfil the order, carried on the session.
   *
   * Stripe tells us a payment succeeded; it does not know who wanted what. The
   * webhook rebuilds the order from these, so what the studio receives after a
   * payment is the same order the customer filled in — not a bare amount.
   *
   * Stripe caps a metadata value at 500 characters. The catalogue has six
   * products and a basket holds each at most once, so `lines` cannot get near
   * that; the free-text fields are cut to be sure.
   */
  const meta: Record<string, string> = {
    reference,
    locale,
    name: buyer.name.slice(0, 400),
    phone: buyer.phone.slice(0, 60),
    note: buyer.note.slice(0, 450),
    lines: priced.lines
      .map((line) => `${line.product.id}:${line.quantity}`)
      .join(",")
      .slice(0, 450),
  };
  for (const [key_, value] of Object.entries(meta)) {
    if (value) form.set(`metadata[${key_}]`, value);
  }

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

  const response = await fetch(`${stripeApiBase()}/v1/checkout/sessions`, {
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

/**
 * What the shop is currently able to do.
 *
 * The basket needs this to describe the right flow, and it cannot get it from
 * the page: the home page is statically generated, so anything it reads from
 * the environment is frozen at build time. Set the Stripe key on a running
 * server without rebuilding and the basket would go on promising a phone call
 * while the endpoint sends people to a payment page.
 *
 * A route handler is evaluated per request, so this is the live answer.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    { payOnline: Boolean(process.env.STRIPE_SECRET_KEY) },
    { headers: { "Cache-Control": "no-store" } },
  );
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
  const order = buildOrder(reference, buyer, priced.lines, priced.total, false);

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (stripeKey) {
    const origin = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin;
    try {
      const url = await createStripeSession(
        stripeKey,
        origin,
        buyer.locale,
        reference,
        buyer,
        priced,
        // Line names come from the request rather than the catalogue: the
        // catalogue has no localised names, and Stripe's page should read in
        // the customer's language. They are labels only — the amounts beside
        // them were computed here.
        readNames(body.lines),
      );

      if (url) {
        /*
         * The order is NOT delivered to the studio here, and that is the whole
         * point of the payment flow: at this moment nobody has paid. A session
         * is an intention. `/api/stripe/webhook` delivers it when Stripe says
         * the money actually arrived.
         *
         * Unless the webhook cannot possibly run. With no signing secret there
         * is nothing to verify Stripe's callbacks against, so that endpoint
         * refuses everything — and a shop that takes card payments and never
         * tells anyone what was bought is worse than one that takes none. In
         * that half-configured state the order is delivered now, marked
         * unpaid, so the studio at least knows somebody is buying.
         */
        if (!process.env.STRIPE_WEBHOOK_SECRET) {
          console.warn(
            "[checkout] STRIPE_WEBHOOK_SECRET is not set — orders cannot be " +
              "confirmed by Stripe. Delivering this one as unpaid instead.",
          );
          await deliver({ ...order, paid: false, awaitingPayment: true });
        }
        return NextResponse.json({ ok: true, reference, url });
      }
    } catch (error) {
      console.error("[checkout] Stripe request failed:", error);
    }
    // Fall through: an order recorded is better than a basket lost.
  }

  const { configured, delivered } = await deliver(order);

  if (!configured) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[checkout] no ORDER_WEBHOOK_URL set — order:", order);
      return NextResponse.json({ ok: true, reference, delivered: false });
    }
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }
  if (!delivered) {
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true, reference, delivered: true });
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
