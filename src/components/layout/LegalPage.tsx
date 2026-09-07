import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { ADDRESS, BRAND, COMPANY, EMAIL, PHONES } from "@/lib/site";

export type LegalSection = {
  heading: string;
  /** Paragraphs. Plain text — no markup is accepted from the dictionary. */
  body: readonly string[];
  /** An optional bulleted list under the paragraphs. */
  list?: readonly string[];
};

/**
 * Shared shell for the privacy and cookie pages.
 *
 * These now carry real text rather than a placeholder, and the distinction
 * matters: what they describe is what this site actually does, which is
 * something that can be read off the code and stated as fact. The site sets no
 * cookies and loads no analytics, the contact form and the shop collect
 * exactly the fields they show, and each is sent to exactly one place. None of
 * that is a legal opinion; it is a description of the software.
 *
 * What is NOT here, and cannot be, is the company's registration details and
 * the terms of sale — those are the studio's to supply and its lawyer's to
 * approve. Where a page needs one, it says so in the open rather than
 * inventing a number.
 */
export default function LegalPage({
  locale,
  title,
  lead,
  sections,
  pending,
  controllerHeading,
  vatNote,
  contactHeading,
  backLabel,
}: {
  locale: Locale;
  title: string;
  lead: string;
  sections: readonly LegalSection[];
  /** Shown when the page still needs something only the studio has. */
  pending?: string;
  /** Set on pages that must identify the seller; omitted elsewhere. */
  controllerHeading?: string;
  vatNote?: string;
  contactHeading: string;
  backLabel: string;
}) {
  return (
    <section className="py-section">
      <div className="container-x max-w-3xl">
        <h1 className="mt-10 text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1] tracking-[-0.022em]">
          {title}
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-slate-600">{lead}</p>

        {pending ? (
          <p className="mt-8 border-l-2 border-accent pl-6 text-base leading-relaxed text-slate-600">
            {pending}
          </p>
        ) : null}

        {/*
          Who the reader is dealing with, on any page that needs it.

          Registration numbers are identifiers, not prose: they are printed as
          issued, in every language, and read from `lib/site.ts` so the site has
          one set of them rather than three that can drift apart.
        */}
        {controllerHeading ? (
          <section className="mt-12">
            <h2 className="font-display text-xl font-extrabold tracking-[-0.015em] sm:text-2xl">
              {controllerHeading}
            </h2>
            <dl className="mt-4 flex flex-col gap-2 text-base leading-relaxed">
              <div className="flex flex-wrap gap-x-3">
                <dt className="sr-only">{BRAND.nameFull}</dt>
                <dd className="font-semibold">{BRAND.legalName}</dd>
              </div>
              <div className="flex flex-wrap gap-x-3">
                <dt className="text-slate-500">IČO</dt>
                <dd className="font-mono">{COMPANY.ico}</dd>
              </div>
              <div className="flex flex-wrap gap-x-3">
                <dt className="text-slate-500">DIČ</dt>
                <dd className="font-mono">{COMPANY.dic}</dd>
              </div>
              <div className="flex flex-wrap gap-x-3">
                <dt className="text-slate-500">IČ DPH</dt>
                <dd className="font-mono">{COMPANY.icDph}</dd>
              </div>
            </dl>
            {vatNote ? (
              <p className="mt-4 text-base leading-relaxed text-slate-600">{vatNote}</p>
            ) : null}
          </section>
        ) : null}

        {sections.map((section) => (
          <section key={section.heading} className="mt-12">
            <h2 className="font-display text-xl font-extrabold tracking-[-0.015em] sm:text-2xl">
              {section.heading}
            </h2>
            {section.body.map((paragraph) => (
              <p key={paragraph} className="mt-4 text-base leading-relaxed text-slate-600">
                {paragraph}
              </p>
            ))}
            {section.list ? (
              <ul className="mt-4 flex flex-col gap-2">
                {section.list.map((entry) => (
                  <li
                    key={entry}
                    className="border-l-2 border-line pl-4 text-base leading-relaxed text-slate-600"
                  >
                    {entry}
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        {/* Whom to write to about any of it — from the same file the rest of
            the site reads, so there is one address on this site, not two. */}
        <section className="mt-12 border-t border-line pt-8">
          <h2 className="font-display text-xl font-extrabold tracking-[-0.015em]">
            {contactHeading}
          </h2>
          <address className="mt-4 flex flex-col gap-1 text-base not-italic leading-relaxed text-slate-600">
            <span lang="sk">{ADDRESS.street}</span>
            <span>
              {ADDRESS.postalCode} {ADDRESS.citySk}
            </span>
            <a href={`mailto:${EMAIL}`} className="link-underline mt-2 font-semibold text-accent">
              {EMAIL}
            </a>
            {PHONES.map((phone) => (
              <a
                key={phone.href}
                href={`tel:${phone.href}`}
                className="link-underline font-semibold text-accent"
              >
                {phone.label}
              </a>
            ))}
          </address>
        </section>

        <Link
          href={`/${locale}`}
          className="link-underline mt-12 inline-block text-[0.8125rem] font-semibold tracking-[0.02em]"
        >
          ← {backLabel}
        </Link>
      </div>
    </section>
  );
}
