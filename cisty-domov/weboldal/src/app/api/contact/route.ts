import { NextResponse } from "next/server";
import { sendMail, senderFor } from "@/lib/mail";
import { EMAIL } from "@/lib/site";

/**
 * Quote request endpoint.
 *
 * Two ways out, and either one is enough:
 *
 * - **Email to the business** — needs `RESEND_API_KEY` and a verified sender
 *   (`CONTACT_FROM_EMAIL`). Reply-To is the visitor, so pressing Reply answers
 *   them directly.
 * - **`CONTACT_WEBHOOK_URL`** — any endpoint that takes a JSON POST: a CRM, a
 *   Make/Zapier hook, a Google Sheet script.
 *
 * Both are tried when both are configured, and the request counts as delivered
 * if either lands. When neither is set the route answers 503 in production —
 * a form that reports a success it could not deliver is worse than one that
 * admits it is off, and the client turns that 503 into a ready-made email.
 * In development the submission is logged and accepted.
 */

export const runtime = "nodejs";

type Submission = {
  name: string;
  email: string;
  phone: string;
  service: string;
  size: string;
  city: string;
  message: string;
  consent: boolean;
  /** The language the visitor wrote in, so the reply can match it. */
  locale: string;
  receivedAt: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

const str = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: accept silently so bots do not learn they were caught.
  if (str(body.company, 200)) {
    return NextResponse.json({ ok: true });
  }

  const submission: Submission = {
    name: str(body.name, 120),
    email: str(body.email, 200),
    phone: str(body.phone, 60),
    service: str(body.service, 120),
    size: str(body.size, 60),
    city: str(body.city, 120),
    message: str(body.message, 4000),
    consent: body.consent === true,
    locale: str(body.locale, 5),
    receivedAt: new Date().toISOString(),
  };

  // Mirrors the client, so the endpoint is safe on its own.
  const invalid: string[] = [];
  if (!submission.name) invalid.push("name");
  if (!submission.email || !EMAIL_RE.test(submission.email)) invalid.push("email");
  if (!submission.service) invalid.push("service");
  if (!submission.message) invalid.push("message");
  if (!submission.consent) invalid.push("consent");

  if (invalid.length) {
    return NextResponse.json({ error: "validation", fields: invalid }, { status: 422 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  const from = senderFor();
  const to = process.env.CONTACT_TO_EMAIL || EMAIL;
  const canEmail = Boolean(process.env.RESEND_API_KEY && from && to);

  if (!webhook && !canEmail) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] nothing configured — submission:", submission);
      return NextResponse.json({ ok: true, delivered: false });
    }
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const [byMail, byWebhook] = await Promise.all([
    canEmail
      ? sendMail({
          from,
          to,
          subject: `Ajánlatkérés: ${submission.service} — ${submission.name}`,
          text: notificationBody(submission),
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

function notificationBody(s: Submission): string {
  return [
    `Név:           ${s.name}`,
    `E-mail:        ${s.email}`,
    `Telefon:       ${s.phone || "—"}`,
    `Szolgáltatás:  ${s.service}`,
    `Alapterület:   ${s.size || "—"}`,
    `Település:     ${s.city || "—"}`,
    `Nyelv:         ${s.locale || "—"}`,
    `Érkezett:      ${s.receivedAt}`,
    `Adatkezelés:   elfogadva`,
    "",
    "Üzenet:",
    "───────",
    s.message,
  ].join("\n");
}
