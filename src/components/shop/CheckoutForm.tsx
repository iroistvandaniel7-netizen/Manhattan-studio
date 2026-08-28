"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { PHONES } from "@/lib/site";
import { useCart } from "./CartProvider";

type State = "idle" | "sending" | "done" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

/**
 * The order form, inside the basket.
 *
 * It posts ids and quantities — never prices. The endpoint re-prices the whole
 * order from the catalogue, so what the studio receives is what the studio
 * charges, whatever the browser sent.
 *
 * With a payment provider connected the endpoint answers with a URL to follow;
 * without one it records the order and the customer is told plainly that they
 * will be contacted to settle up. This form handles both, because which one is
 * live is a matter of configuration, not of code.
 */
export default function CheckoutForm({
  dict,
  locale,
  onDone,
}: {
  dict: Dictionary;
  locale: Locale;
  onDone?: () => void;
}) {
  const cart = useCart();
  const copy = dict.shop;
  const [state, setState] = useState<State>("idle");
  const [reference, setReference] = useState("");
  const [invalid, setInvalid] = useState<string[]>([]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();

    const bad: string[] = [];
    if (!name) bad.push("name");
    if (!email || !EMAIL_RE.test(email)) bad.push("email");
    setInvalid(bad);
    if (bad.length) return;

    setState("sending");
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: String(form.get("phone") ?? "").trim(),
          note: String(form.get("note") ?? "").trim(),
          company: String(form.get("company") ?? ""),
          locale,
          lines: cart.priced.lines.map((line) => ({
            id: line.product.id,
            quantity: line.quantity,
            /* A label for the payment page, in the reader's language. The
               amount beside it is the server's, not this one's. */
            name: dict.courses.items[line.product.id as keyof typeof dict.courses.items]
              .name,
          })),
        }),
      });

      const payload: unknown = await response.json().catch(() => ({}));
      const data = payload as { ok?: boolean; reference?: string; url?: string };

      if (!response.ok || !data.ok) {
        setState("error");
        return;
      }

      /* A payment page to follow: hand the customer over, basket intact until
         the payment settles — clearing it here would lose the order if they
         come back to change something. */
      if (data.url) {
        window.location.assign(data.url);
        return;
      }

      setReference(data.reference ?? "");
      setState("done");
      cart.clear();
    } catch {
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <div className="mt-6" role="status">
        <p className="font-display text-lg font-extrabold tracking-[-0.03em]">
          {copy.doneTitle}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{copy.doneLead}</p>
        {reference ? (
          <p className="mt-4 border border-line px-4 py-3">
            <span className="label block text-slate-500">{copy.orderRef}</span>
            <span className="font-mono mt-1 block text-base font-semibold">{reference}</span>
          </p>
        ) : null}
        <button
          type="button"
          onClick={onDone}
          className="label mt-5 w-full bg-ink px-6 py-4 text-white hover:bg-accent"
        >
          {copy.continue}
        </button>
      </div>
    );
  }

  const field =
    "mt-1.5 w-full border border-line bg-white px-4 py-3 text-base outline-none transition-colors focus:border-accent";

  return (
    <form onSubmit={onSubmit} noValidate className="mt-6">
      <p className="text-[0.8125rem] leading-relaxed text-slate-600">{copy.payLater}</p>

      <div className="mt-5 flex flex-col gap-4">
        <label className="block">
          <span className="label text-slate-500">{copy.name}</span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            aria-invalid={invalid.includes("name")}
            className={`${field} ${invalid.includes("name") ? "border-accent" : ""}`}
          />
          {invalid.includes("name") ? (
            <span className="mt-1.5 block text-xs text-accent">{copy.required}</span>
          ) : null}
        </label>

        <label className="block">
          <span className="label text-slate-500">{copy.email}</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={invalid.includes("email")}
            className={`${field} ${invalid.includes("email") ? "border-accent" : ""}`}
          />
          {invalid.includes("email") ? (
            <span className="mt-1.5 block text-xs text-accent">{copy.invalidEmail}</span>
          ) : null}
        </label>

        <label className="block">
          <span className="label text-slate-500">
            {copy.phone} <span className="normal-case">({copy.optional})</span>
          </span>
          <input name="phone" type="tel" autoComplete="tel" className={field} />
        </label>

        <label className="block">
          <span className="label text-slate-500">
            {copy.note} <span className="normal-case">({copy.optional})</span>
          </span>
          <textarea
            name="note"
            rows={3}
            placeholder={copy.notePlaceholder}
            className={`${field} resize-y`}
          />
        </label>

        {/* Honeypot: never shown, never focusable, never filled by a person. */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute left-[-9999px] size-px opacity-0"
        />
      </div>

      {state === "error" ? (
        <div role="alert" className="mt-5 border-2 border-accent px-4 py-3">
          <p className="font-display text-sm font-extrabold">{copy.errorTitle}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{copy.errorLead}</p>
          <p className="mt-2 flex flex-wrap gap-x-4">
            {PHONES.map((phone) => (
              <a
                key={phone.href}
                href={`tel:${phone.href}`}
                className="font-mono text-sm font-semibold text-accent underline-offset-4 hover:underline"
              >
                {phone.label}
              </a>
            ))}
          </p>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={state === "sending"}
        data-checkout-submit
        className="label mt-6 w-full bg-accent px-6 py-4 text-white transition-colors duration-200 hover:bg-accent-deep disabled:opacity-60"
      >
        {state === "sending" ? copy.sending : copy.submit}
      </button>
    </form>
  );
}
