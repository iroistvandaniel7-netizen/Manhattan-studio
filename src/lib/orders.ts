import { CURRENCY, type PricedLine } from "./catalogue";

/**
 * Orders on their way out of the site.
 *
 * Two endpoints deliver orders now — checkout, while no payment provider is
 * connected, and the Stripe webhook once one is — and they must deliver the
 * same shape to the same place. Written twice they would drift, and the studio
 * would be reading two different kinds of order out of one inbox.
 */

export type Buyer = {
  name: string;
  email: string;
  phone: string;
  note: string;
  locale: string;
};

export type Order = {
  reference: string;
  currency: string;
  lines: { id: string; quantity: number; unitAmount: number; amount: number }[];
  total: number;
  receivedAt: string;
  /** Whether the money has actually arrived. Never inferred, only reported. */
  paid: boolean;
  /** Set when a payment was started but not yet confirmed. */
  awaitingPayment?: boolean;
  /** Stripe's own ids, when the order came through a payment. */
  paymentRef?: string;
  eventId?: string;
  /** Set when Stripe's total and the catalogue's disagree — needs a human. */
  amountMismatch?: boolean;
} & Buyer;

/**
 * The order reference the customer is given.
 *
 * Short, and drawn from an alphabet with no 0/O, 1/I/L or 8/B in it, because
 * the first thing anyone does with it is read it down the phone.
 */
export function orderReference(at: Date = new Date()): string {
  const alphabet = "ACDEFHJKLMNPRTUVWXY349";
  let tail = "";
  const bytes = crypto.getRandomValues(new Uint8Array(5));
  for (const byte of bytes) tail += alphabet[byte % alphabet.length];
  const year = String(at.getFullYear()).slice(2);
  const month = String(at.getMonth() + 1).padStart(2, "0");
  return `MS-${year}${month}-${tail}`;
}

export function buildOrder(
  reference: string,
  buyer: Buyer,
  lines: PricedLine[],
  total: number,
  paid: boolean,
): Order {
  return {
    reference,
    ...buyer,
    currency: CURRENCY,
    lines: lines.map((line) => ({
      id: line.product.id,
      quantity: line.quantity,
      unitAmount: line.product.price,
      amount: line.total,
    })),
    total,
    receivedAt: new Date().toISOString(),
    paid,
  };
}

export type Delivery = { configured: boolean; delivered: boolean };

/**
 * Hand the order to whatever the studio has pointed at.
 *
 * Any endpoint that accepts a JSON POST will do — a form service, an
 * automation, a script that sends an email. Falls back to the contact form's
 * own hook so a site with one webhook configured has a working shop.
 */
export async function deliver(order: Order): Promise<Delivery> {
  const webhook = process.env.ORDER_WEBHOOK_URL ?? process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) return { configured: false, delivered: false };

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.error("[orders] webhook rejected the order:", response.status);
      return { configured: true, delivered: false };
    }
    return { configured: true, delivered: true };
  } catch (error) {
    console.error("[orders] webhook request failed:", error);
    return { configured: true, delivered: false };
  }
}
