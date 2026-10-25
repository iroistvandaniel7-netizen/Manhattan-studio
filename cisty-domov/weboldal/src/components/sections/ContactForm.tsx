"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { CONTACT, SERVICES } from "@/lib/content";
import { EMAIL, PHONE } from "@/lib/site";
import { SERVICE_EVENT } from "./Services";

type FieldName = "name" | "email" | "phone" | "service" | "size" | "city" | "message" | "consent";
type Errors = Partial<Record<FieldName, string>>;
type Status = "idle" | "sending" | "success" | "error";

/** Permissive — enough to catch typos, not to reject real addresses. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const PHONE_RE = /^[+]?[\d\s()./-]{6,}$/;

const t = CONTACT.form;

export default function ContactForm() {
  const uid = useId();
  const summaryRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [failure, setFailure] = useState<string | null>(null);
  const [draft, setDraft] = useState<string | null>(null);
  const [service, setService] = useState("");

  const fieldId = (name: FieldName) => `${uid}-${name}`;
  const errorId = (name: FieldName) => `${uid}-${name}-error`;

  /* "Erre kérek ajánlatot" in the services section preselects that service. */
  useEffect(() => {
    const onService = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      const match = SERVICES.items.find((item) => item.id === id);
      if (match) {
        setService(match.name);
        setStatus((s) => (s === "success" ? "idle" : s));
      }
    };
    window.addEventListener(SERVICE_EVENT, onService);
    return () => window.removeEventListener(SERVICE_EVENT, onService);
  }, []);

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const value = (key: FieldName) => String(data.get(key) ?? "").trim();

    if (!value("name")) next.name = t.errors.name;

    const email = value("email");
    if (!email) next.email = t.errors.email;
    else if (!EMAIL_RE.test(email)) next.email = t.errors.emailInvalid;

    const phone = value("phone");
    if (phone && !PHONE_RE.test(phone)) next.phone = t.errors.phoneInvalid;

    if (!value("service")) next.service = t.errors.service;
    if (!value("message")) next.message = t.errors.message;
    if (!data.get("consent")) next.consent = t.errors.consent;

    return next;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const found = validate(data);
    setErrors(found);
    setFailure(null);
    setDraft(null);

    if (Object.keys(found).length > 0) {
      requestAnimationFrame(() => {
        summaryRef.current?.focus();
        const first = Object.keys(found)[0] as FieldName;
        form.querySelector<HTMLElement>(`#${CSS.escape(fieldId(first))}`)?.focus();
      });
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          service: data.get("service"),
          size: data.get("size"),
          city: data.get("city"),
          message: data.get("message"),
          consent: Boolean(data.get("consent")),
          // Honeypot: bots fill hidden fields, people never see this one.
          company: data.get("company"),
        }),
      });

      if (response.ok) {
        setStatus("success");
        setService("");
        form.reset();
        return;
      }

      setStatus("error");
      setFailure(response.status === 503 ? t.errors.unavailable : t.errors.network);
      setDraft(mailtoHref(data));
    } catch {
      setStatus("error");
      setFailure(t.errors.network);
      setDraft(mailtoHref(data));
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="pop-in flex min-h-[32rem] flex-col justify-center rounded-[1.75rem] bg-accent p-8 text-white sm:p-12">
        <span aria-hidden="true" className="mb-6 grid size-14 place-items-center rounded-full bg-white text-accent">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="size-7">
            <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="text-[clamp(1.75rem,3.4vw,2.5rem)]">{t.successTitle}</h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/85">{t.success}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="link-underline mt-9 self-start text-[0.8125rem] font-semibold"
        >
          {t.again}
        </button>
      </div>
    );
  }

  const invalidCount = Object.keys(errors).length;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative flex h-full flex-col rounded-[1.75rem] border border-line bg-white p-6 shadow-[0_20px_60px_rgba(11,45,91,0.08)] sm:p-10"
    >
      <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">{t.title}</h3>

      <div
        ref={summaryRef}
        tabIndex={-1}
        role={invalidCount ? "alert" : undefined}
        className={invalidCount ? "mt-6 rounded-xl border-l-4 border-accent bg-accent-soft p-4" : "sr-only"}
      >
        {invalidCount ? <p className="text-[0.8125rem] leading-relaxed text-slate-600">{t.errors.summary}</p> : null}
      </div>

      <div className="mt-7 grid gap-6 sm:grid-cols-2">
        <Field id={fieldId("name")} name="name" label={t.name} placeholder={t.namePlaceholder} autoComplete="name" required error={errors.name} errorId={errorId("name")} />
        <Field id={fieldId("email")} name="email" type="email" label={t.email} placeholder={t.emailPlaceholder} autoComplete="email" inputMode="email" required error={errors.email} errorId={errorId("email")} />
        <Field id={fieldId("phone")} name="phone" type="tel" label={t.phone} hint={t.optional} placeholder={t.phonePlaceholder} autoComplete="tel" inputMode="tel" error={errors.phone} errorId={errorId("phone")} />

        <div className="flex flex-col">
          <label htmlFor={fieldId("service")} className="label text-slate-600">
            {t.service} <span aria-hidden="true">*</span>
          </label>
          <select
            id={fieldId("service")}
            name="service"
            required
            value={service}
            onChange={(event) => setService(event.target.value)}
            aria-invalid={errors.service ? "true" : undefined}
            aria-describedby={errors.service ? errorId("service") : undefined}
            className={`mt-2.5 w-full appearance-none border-b-2 bg-transparent bg-[length:1rem] bg-[right_0.1rem_center] bg-no-repeat py-3 pr-7 text-sm transition-colors duration-300 focus:border-accent focus:outline-none ${
              errors.service ? "border-accent" : "border-slate-300"
            } ${service ? "" : "text-slate-400"}`}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2366768f' stroke-width='1.6'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
            }}
          >
            <option value="" disabled>
              {t.servicePlaceholder}
            </option>
            {SERVICES.items.map((item) => (
              <option key={item.id} value={item.name} className="text-ink">
                {item.name}
              </option>
            ))}
            <option value={t.serviceOther} className="text-ink">
              {t.serviceOther}
            </option>
          </select>
          <FieldError id={errorId("service")} message={errors.service} />
        </div>

        <Field id={fieldId("size")} name="size" label={t.size} hint={t.optional} placeholder={t.sizePlaceholder} inputMode="text" error={errors.size} errorId={errorId("size")} />
        <Field id={fieldId("city")} name="city" label={t.city} hint={t.optional} placeholder={t.cityPlaceholder} autoComplete="address-level2" error={errors.city} errorId={errorId("city")} />
      </div>

      <div className="mt-6 flex flex-col">
        <label htmlFor={fieldId("message")} className="label text-slate-600">
          {t.message} <span aria-hidden="true">*</span>
        </label>
        <textarea
          id={fieldId("message")}
          name="message"
          rows={4}
          required
          placeholder={t.messagePlaceholder}
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={errors.message ? errorId("message") : undefined}
          className={`mt-2.5 w-full resize-y border-b-2 bg-transparent py-3 text-sm transition-colors duration-300 placeholder:text-slate-400 focus:border-accent focus:outline-none ${
            errors.message ? "border-accent" : "border-slate-300"
          }`}
        />
        <FieldError id={errorId("message")} message={errors.message} />
      </div>

      {/* GDPR acknowledgement — never pre-ticked. */}
      <div className="mt-7">
        <label htmlFor={fieldId("consent")} className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-slate-600">
          <input
            id={fieldId("consent")}
            name="consent"
            type="checkbox"
            value="yes"
            aria-invalid={errors.consent ? "true" : undefined}
            aria-describedby={errors.consent ? errorId("consent") : undefined}
            className="mt-0.5 size-5 shrink-0 cursor-pointer accent-[var(--color-accent)]"
          />
          <span>
            {t.consentBefore}
            <Link href="/adatvedelem" target="_blank" className="font-semibold text-accent underline underline-offset-4">
              {t.consentLink}
            </Link>
            {t.consentAfter} <span aria-hidden="true">*</span>
          </span>
        </label>
        <FieldError id={errorId("consent")} message={errors.consent} />
      </div>

      {/* Honeypot — hidden from people and from assistive technology. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${uid}-company`}>Company</label>
        <input id={`${uid}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-auto pt-9">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group/submit label inline-flex w-full items-center justify-center gap-3 rounded-full bg-accent px-8 py-5 text-[0.75rem] text-white transition-colors duration-200 hover:bg-accent-deep disabled:cursor-wait disabled:opacity-60 sm:w-auto"
        >
          {status === "sending" ? t.sending : t.submit}
          {status === "sending" ? null : (
            <span aria-hidden="true" className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/submit:translate-x-1.5">
              →
            </span>
          )}
        </button>

        {failure ? (
          <div role="alert" className="mt-6 rounded-xl border-l-4 border-accent bg-accent-soft p-4">
            <p className="text-[0.8125rem] leading-relaxed text-slate-600">{failure}</p>
            {draft ? (
              <a
                href={draft}
                className="label mt-3.5 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-white transition-colors duration-200 hover:bg-accent-deep"
              >
                {t.mailInstead} <span aria-hidden="true">→</span>
              </a>
            ) : null}
            <p className="mt-3.5">
              <a href={`tel:${PHONE.href}`} className="link-underline text-[0.8125rem] font-semibold">
                {PHONE.label}
              </a>
            </p>
          </div>
        ) : null}
      </div>
    </form>
  );
}

/**
 * The same message as a draft in the visitor's own mail program — what a
 * failed send leaves behind, so nobody has to retype what they wrote.
 */
function mailtoHref(data: FormData): string {
  const value = (key: string) => String(data.get(key) ?? "").trim();
  const subject = `Ajánlatkérés: ${value("service")} — ${value("name")}`;
  const body = [
    value("message"),
    "",
    value("size") ? `Alapterület: ${value("size")}` : "",
    value("city") ? `Település: ${value("city")}` : "",
    "—",
    value("name"),
    value("phone"),
  ]
    .filter((line, i, all) => line !== "" || (i > 0 && all[i - 1] !== ""))
    .join("\n")
    .trimEnd();

  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-xs font-semibold text-accent-deep">
      {message}
    </p>
  );
}

function Field({
  id,
  name,
  label,
  hint,
  error,
  errorId,
  type = "text",
  required = false,
  ...rest
}: {
  id: string;
  name: string;
  label: string;
  hint?: string;
  error?: string;
  errorId: string;
  type?: string;
  required?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "name" | "type" | "required">) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="label flex items-baseline gap-2 text-slate-600">
        <span>
          {label} {required ? <span aria-hidden="true">*</span> : null}
        </span>
        {hint ? <span className="font-medium normal-case tracking-normal text-slate-500">({hint})</span> : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`mt-2.5 w-full border-b-2 bg-transparent py-3 text-sm transition-colors duration-300 placeholder:text-slate-400 focus:border-accent focus:outline-none ${
          error ? "border-accent" : "border-slate-300"
        }`}
        {...rest}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}
