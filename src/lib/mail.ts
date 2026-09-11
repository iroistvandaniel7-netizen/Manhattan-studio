/**
 * Sending a plain email.
 *
 * Two things here send mail — the order confirmation that goes to a customer,
 * and the enquiry notification that goes to the studio — and they were about to
 * become two copies of the same Resend request. One copy, so a change to how
 * mail leaves this site is a change in one file.
 *
 * A plain POST rather than the SDK: one request does not justify a dependency
 * to keep patched.
 *
 * Plain text, never HTML. It reads the same in every mail client, there is
 * nothing in it to render wrongly, and it cannot carry a tracking pixel —
 * which would contradict the privacy notice two clicks away.
 */

export type MailResult = {
  /** Whether a sender is set up at all. Distinguishes "off" from "broken". */
  configured: boolean;
  sent: boolean;
};

export type Mail = {
  from: string;
  to: string;
  subject: string;
  text: string;
  /** Where a reply goes, when that is not the sender. */
  replyTo?: string;
  /** Optional, and only where a natural one exists — see the note below. */
  idempotencyKey?: string;
};

/**
 * The API key, or nothing.
 *
 * Kept as a function rather than a constant: module scope is evaluated once per
 * process, and reading the variable at call time is what lets a test start a
 * server with a different environment without a rebuild.
 */
export function mailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

export async function sendMail(mail: Mail): Promise<MailResult> {
  const key = process.env.RESEND_API_KEY;
  if (!key || !mail.from || !mail.to) return { configured: false, sent: false };

  try {
    /* `||`, not `??`: a variable that exists but is empty must fall back to the
       real API rather than send the request to "". Same reasoning as the
       Stripe base — an empty string is a mistake, not an override. */
    const base = process.env.RESEND_API_BASE || "https://api.resend.com";

    const headers: Record<string, string> = {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    };
    /* Only when the caller has something stable to key on. An order has its
       reference; a contact message has nothing that is the same across a retry
       and different across two genuine messages, and a made-up key would either
       do nothing or silently swallow a second enquiry. */
    if (mail.idempotencyKey) headers["Idempotency-Key"] = mail.idempotencyKey;

    const response = await fetch(`${base}/emails`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        from: mail.from,
        to: [mail.to],
        subject: mail.subject,
        text: mail.text,
        ...(mail.replyTo ? { reply_to: mail.replyTo } : {}),
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error("[mail] refused:", response.status);
      return { configured: true, sent: false };
    }
    return { configured: true, sent: true };
  } catch (error) {
    console.error("[mail] request failed:", error);
    return { configured: true, sent: false };
  }
}

/**
 * The address mail is sent from.
 *
 * It has to be on a domain verified with the mail provider, which is why it is
 * configuration rather than the studio's published address: `info@` is where
 * people write *to*, and is very often a mailbox at a provider that would
 * refuse to let this site send as it.
 *
 * One sender for both jobs, with a per-job override. A studio that has set up
 * exactly one address gets a working shop *and* a working contact form out of
 * it, which is the common case and the one worth making effortless.
 */
export function senderFor(job: "order" | "contact"): string {
  const specific =
    job === "order" ? process.env.ORDER_FROM_EMAIL : process.env.CONTACT_FROM_EMAIL;
  return specific || process.env.ORDER_FROM_EMAIL || process.env.CONTACT_FROM_EMAIL || "";
}
