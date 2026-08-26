"use client";

import { useId, useRef, useState } from "react";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { PHONES } from "@/lib/site";

type FieldName = "name" | "email" | "phone" | "language" | "message";
type Errors = Partial<Record<FieldName, string>>;
type Status = "idle" | "sending" | "success" | "error";

/** Deliberately permissive — enough to catch typos, not to reject real addresses. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
/** Digits, spaces and the usual separators; at least 6 digits. */
const PHONE_RE = /^[+]?[\d\s()./-]{6,}$/;

export default function ContactForm({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [failure, setFailure] = useState<string | null>(null);

  const t = dict.contact.form;
  const fieldId = (name: FieldName) => `${uid}-${name}`;
  const errorId = (name: FieldName) => `${uid}-${name}-error`;

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const value = (key: FieldName) => String(data.get(key) ?? "").trim();

    if (!value("name")) next.name = t.errors.name;

    const email = value("email");
    if (!email) next.email = t.errors.email;
    else if (!EMAIL_RE.test(email)) next.email = t.errors.emailInvalid;

    const phone = value("phone");
    if (phone && !PHONE_RE.test(phone)) next.phone = t.errors.phoneInvalid;

    if (!value("language")) next.language = t.errors.language;
    if (!value("message")) next.message = t.errors.message;

    return next;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const found = validate(data);
    setErrors(found);
    setFailure(null);

    if (Object.keys(found).length > 0) {
      // Move the user to the summary, then on to the first bad field.
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
          language: data.get("language"),
          message: data.get("message"),
          locale,
          // Honeypot: bots fill hidden fields, humans never see this one.
          company: data.get("company"),
        }),
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        return;
      }

      setStatus("error");
      setFailure(response.status === 503 ? t.errors.unavailable : t.errors.network);
    } catch {
      setStatus("error");
      setFailure(t.errors.network);
    }
  }

  if (status === "success") {
    return (
      <div className="flex min-h-[28rem] flex-col justify-center border-2 border-accent bg-accent-soft p-8 sm:p-12">
        <span aria-hidden="true" className="mb-6 inline-block size-2 bg-accent" />
        <h3 className="text-[clamp(1.75rem,3.4vw,2.5rem)] font-bold tracking-[-0.03em]">
          {t.successTitle}
        </h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600">
          {t.success}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="link-underline mt-9 self-start text-[0.8125rem] font-semibold tracking-[0.02em]"
        >
          {t.again}
        </button>
      </div>
    );
  }

  const invalidCount = Object.keys(errors).length;

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="flex h-full flex-col border-2 border-ink bg-white p-6 sm:p-10"
    >
      <h3 className="font-display text-xl font-extrabold tracking-[-0.03em]">{t.title}</h3>

      {/* Error summary — focusable so it can be announced on submit. */}
      <div
        ref={summaryRef}
        tabIndex={-1}
        role={invalidCount ? "alert" : undefined}
        className={invalidCount ? "mt-6 border-l-2 border-accent bg-accent-soft p-4" : "sr-only"}
      >
        {invalidCount ? (
          <p className="text-[0.8125rem] leading-relaxed text-slate-600">
            {t.errors.summary}
          </p>
        ) : null}
      </div>

      <div className="mt-7 grid gap-6 sm:grid-cols-2">
        <Field
          id={fieldId("name")}
          name="name"
          label={t.name}
          placeholder={t.namePlaceholder}
          autoComplete="name"
          required
          error={errors.name}
          errorId={errorId("name")}
        />
        <Field
          id={fieldId("email")}
          name="email"
          type="email"
          label={t.email}
          placeholder={t.emailPlaceholder}
          autoComplete="email"
          inputMode="email"
          required
          error={errors.email}
          errorId={errorId("email")}
        />
        <Field
          id={fieldId("phone")}
          name="phone"
          type="tel"
          label={t.phone}
          hint={t.optional}
          placeholder={t.phonePlaceholder}
          autoComplete="tel"
          inputMode="tel"
          error={errors.phone}
          errorId={errorId("phone")}
        />

        {/* Language of interest */}
        <div className="flex flex-col">
          <label
            htmlFor={fieldId("language")}
            className="label text-slate-600"
          >
            {t.language} <span aria-hidden="true">*</span>
          </label>
          <select
            id={fieldId("language")}
            name="language"
            required
            defaultValue=""
            aria-invalid={errors.language ? "true" : undefined}
            aria-describedby={errors.language ? errorId("language") : undefined}
            className={`mt-2.5 w-full appearance-none border-b-2 bg-transparent bg-[length:1rem] bg-[right_0.1rem_center] bg-no-repeat py-3 pr-7 text-sm transition-colors duration-300 focus:border-accent focus:outline-none ${
              errors.language ? "border-accent" : "border-slate-300"
            }`}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b6b6b' stroke-width='1.6'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
            }}
          >
            <option value="" disabled>
              {t.languagePlaceholder}
            </option>
            {dict.languages.items.map((language) => (
              <option key={language.code} value={language.name}>
                {language.name}
              </option>
            ))}
            <option value="other">{t.languageOther}</option>
          </select>
          <FieldError id={errorId("language")} message={errors.language} />
        </div>
      </div>

      {/* Message */}
      <div className="mt-6 flex flex-col">
        <label
          htmlFor={fieldId("message")}
          className="label text-slate-600"
        >
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

      {/* Honeypot — visually and semantically hidden from real users. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${uid}-company`}>Company</label>
        <input id={`${uid}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* `mt-auto` anchors the action to the bottom of the stretched form. */}
      <div className="mt-auto pt-9">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group/submit inline-flex w-full items-center justify-center gap-3 bg-accent px-8 py-4.5 text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-200 hover:bg-accent-deep disabled:cursor-wait disabled:opacity-60 sm:w-auto"
        >
          {status === "sending" ? t.sending : t.submit}
          {status === "sending" ? null : (
            <span
              aria-hidden="true"
              className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/submit:translate-x-1.5"
            >
              →
            </span>
          )}
        </button>

        {/* Delivery failure: always paired with a phone number that works. */}
        {failure ? (
          <div role="alert" className="mt-6 border-l-2 border-accent bg-accent-soft p-4">
            <p className="text-[0.8125rem] leading-relaxed text-slate-600">{failure}</p>
            <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              {PHONES.map((phone) => (
                <a
                  key={phone.href}
                  href={`tel:${phone.href}`}
                  className="link-underline text-[0.8125rem] font-semibold"
                >
                  {phone.label}
                </a>
              ))}
            </p>
          </div>
        ) : null}
      </div>
    </form>
  );
}

/* ---------------------------------------------------------------- */

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-xs font-medium text-slate-600">
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
      <label
        htmlFor={id}
        className="label flex items-baseline gap-2 text-slate-600"
      >
        <span>
          {label} {required ? <span aria-hidden="true">*</span> : null}
        </span>
        {hint ? (
          <span className="font-medium normal-case tracking-normal text-slate-500">
            ({hint})
          </span>
        ) : null}
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
