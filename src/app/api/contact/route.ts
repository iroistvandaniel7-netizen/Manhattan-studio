import { NextResponse } from "next/server";
import { sendMail, senderFor } from "@/lib/mail";
import { EMAIL } from "@/lib/site";

/**
 * Contact form endpoint.
 *
 * Two ways out, and either one is enough:
 *
 * - **Email to the studio.** The normal one. Needs `RESEND_API_KEY` and a
 *   verified sender — the same pair the order confirmation already needs, so a
 *   studio that can email a customer can also receive an enquiry, with nothing
 *   further to set up.
 * - **`CONTACT_WEBHOOK_URL`.** Any endpoint that takes a JSON POST — a CRM, an
 *   automation, a script. Kept because a studio that has wired one up should
 *   not lose it, and because some want the enquiry in two places.
 *
 * Both are tried when both are configured, and the submission counts as
 * delivered if either lands: two half-configured routes should not add up to a
 * lost message. Only when neither is set does the route refuse, with 503 — a
 * form that reports success it cannot deliver is worse than one that admits it
 * is off, and the client turns that 503 into a one-click mail link rather than
 * a dead end.
 *
 * In development a submission with nothing configured is logged and accepted,
 * so the flow stays testable without an account anywhere.
 */

export const runtime = "nodejs";

type Payload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  language?: unknown;
  message?: unknown;
  locale?: unknown;
  company?: unknown;
};

/** A submission after it has been trimmed, capped and validated. */
type Submission = {
  name: string;
  email: string;
  phone: string;
  language: string;
  message: string;
  locale: string;
  receivedAt: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

const str = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: silently accept so bots don't learn they were caught.
  if (str(body.company, 200)) {
    return NextResponse.json({ ok: true });
  }

  const submission: Submission = {
    name: str(body.name, 120),
    email: str(body.email, 200),
    phone: str(body.phone, 60),
    language: str(body.language, 60),
    message: str(body.message, 4000),
    locale: str(body.locale, 5),
    receivedAt: new Date().toISOString(),
  };

  // Server-side validation mirrors the client, so the endpoint is safe on its own.
  const invalid: string[] = [];
  if (!submission.name) invalid.push("name");
  if (!submission.email || !EMAIL_RE.test(submission.email)) invalid.push("email");
  if (!submission.language) invalid.push("language");
  if (!submission.message) invalid.push("message");

  if (invalid.length) {
    return NextResponse.json({ error: "validation", fields: invalid }, { status: 422 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  const from = senderFor("contact");
  const to = process.env.CONTACT_TO_EMAIL || EMAIL;
  const canEmail = Boolean(process.env.RESEND_API_KEY && from && to);

  if (!webhook && !canEmail) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] nothing configured — submission:", submission);
      return NextResponse.json({ ok: true, delivered: false });
    }
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  /* Both, when both are set. Neither failure is allowed to hide the other's
     success, so they are settled rather than awaited in sequence. */
  const [byMail, byWebhook] = await Promise.all([
    canEmail
      ? sendMail({
          from,
          to,
          subject: notificationSubject(submission),
          text: notificationBody(submission),
          /* The point of the whole thing: the studio presses Reply and is
             writing to the person who filled the form, not to itself. */
          replyTo: submission.email,
        })
      : Promise.resolve({ configured: false, sent: false }),
    webhook ? postToWebhook(webhook, submission) : Promise.resolve(false),
  ]);

  if (byMail.sent || byWebhook) {
    return NextResponse.json({ ok: true, delivered: true });
  }

  console.error("[contact] every configured route failed to deliver");
  return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
}

async function postToWebhook(webhook: string, submission: Submission): Promise<boolean> {
  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submission),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.error("[contact] webhook rejected the submission:", response.status);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[contact] webhook request failed:", error);
    return false;
  }
}

/*
 * What the studio actually reads.
 *
 * Labelled in Slovak and Hungarian, because the studio works in both and this
 * message is read by the studio, not by the visitor. Six short lines; the cost
 * of the second label is far below the cost of picking the wrong one.
 *
 * The subject carries the name and the language asked about, so a full inbox
 * is still sortable without opening anything.
 */
function notificationSubject(s: Submission): string {
  return `Web / Weboldal: ${s.name} — ${s.language}`;
}

function notificationBody(s: Submission): string {
  return [
    `Meno / Név:               ${s.name}`,
    `E-mail:                   ${s.email}`,
    `Telefón / Telefon:        ${s.phone || "—"}`,
    `Jazyk / Nyelv:            ${s.language}`,
    `Jazyk stránky / Oldal:    ${s.locale || "—"}`,
    `Prijaté / Érkezett:       ${s.receivedAt}`,
    "",
    "Správa / Üzenet:",
    "────────────────",
    s.message,
  ].join("\n");
}
