import { NextResponse } from "next/server";

/**
 * Contact form endpoint.
 *
 * Delivery target is configured with `CONTACT_WEBHOOK_URL` (any endpoint that
 * accepts a JSON POST — an email service, a CRM, a Zapier/Make hook). When it
 * is not set the route refuses with 503 rather than reporting a success it
 * cannot deliver; the form then shows the studio's phone numbers instead. In
 * development the submission is logged so the flow stays testable.
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

  const submission = {
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

  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] no CONTACT_WEBHOOK_URL set — submission:", submission);
      return NextResponse.json({ ok: true, delivered: false });
    }
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submission),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error("[contact] webhook rejected the submission:", response.status);
      return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error("[contact] webhook request failed:", error);
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }
}
