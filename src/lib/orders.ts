import { CURRENCY, formatPrice, type PricedLine } from "./catalogue";
import { getDictionary } from "@/i18n";
import { isLocale, defaultLocale } from "@/i18n/config";

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
 * The confirmation the customer gets, if the studio has set up a sender.
 *
 * Optional on purpose. Sending email needs an account somewhere, and the shop
 * has to work before that account exists — so with no `RESEND_API_KEY` this
 * does nothing at all and reports as much. Nothing else changes.
 *
 * For paid orders Stripe can also send its own receipt, and that receipt is
 * the better document: it carries the payment. This is the one that goes out
 * for an order placed before payment is connected, where otherwise the
 * customer's only record is a screen they can close.
 *
 * A plain POST rather than the SDK, for the same reason as the Stripe call:
 * one request does not justify a dependency to keep patched.
 */
/**
 * The confirmation's subject and body, in the customer's own language.
 *
 * Plain text, not HTML: it reads the same in every mail client, there is
 * nothing in it to render wrongly, and it cannot carry a tracking pixel — which
 * would contradict the privacy notice two clicks away.
 */
export function confirmationText(order: Order): { subject: string; body: string } {
  const locale = isLocale(order.locale) ? order.locale : defaultLocale;
  const dict = getDictionary(locale);
  const copy = dict.shop;

  const lines = order.lines.map((line) => {
    const item = dict.courses.items[line.id as keyof typeof dict.courses.items];
    const name = item?.name ?? line.id;
    return `- ${name} × ${line.quantity} — ${formatPrice(line.amount, locale)}`;
  });

  const body = [
    copy.mailIntro,
    "",
    ...lines,
    "",
    `${copy.total}: ${formatPrice(order.total, locale)}`,
    `${copy.orderRef}: ${order.reference}`,
    "",
    order.paid ? copy.mailPaidNext : copy.mailUnpaidNext,
    "",
    copy.mailOutro,
  ].join("\n");

  return { subject: `${copy.mailSubject} — ${order.reference}`, body };
}

export async function confirmToCustomer(
  order: Order,
  subject: string,
  body: string,
): Promise<{ configured: boolean; sent: boolean }> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.ORDER_FROM_EMAIL;
  if (!key || !from || !order.email) return { configured: false, sent: false };

  try {
    /* `||`, not `??`: an empty value must fall back to the real API, not be
       treated as a deliberate override. Same reasoning as `stripeApiBase`. */
    const base = process.env.RESEND_API_BASE || "https://api.resend.com";
    const response = await fetch(`${base}/emails`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        /* The reference, so a retry cannot send the same customer the same
           confirmation twice. */
        "Idempotency-Key": order.reference,
      },
      body: JSON.stringify({ from, to: [order.email], subject, text: body }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.error("[orders] confirmation email refused:", response.status);
      return { configured: true, sent: false };
    }
    return { configured: true, sent: true };
  } catch (error) {
    /* Never fatal. The order is already recorded; a missing confirmation is
       worth a log line, not a failed checkout. */
    console.error("[orders] confirmation email failed:", error);
    return { configured: true, sent: false };
  }
}

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
