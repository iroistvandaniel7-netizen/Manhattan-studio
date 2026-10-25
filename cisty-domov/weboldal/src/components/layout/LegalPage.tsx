import Link from "next/link";
import type { Dictionary, Locale } from "@/i18n";
import { EMAIL, PHONE } from "@/lib/site";

export type LegalSection = {
  heading: string;
  body: readonly string[];
  list?: readonly string[];
};

/** Shared shell for the privacy notice, the cookie notice and the imprint. */
export default function LegalPage({
  locale,
  copy,
  title,
  lead,
  sections,
  dated = false,
  children,
}: {
  locale: Locale;
  copy: Dictionary["legal"];
  title: string;
  lead?: string;
  sections?: readonly LegalSection[];
  /** Print the "effective from" date under the title. */
  dated?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section className="pb-section pt-32 sm:pt-40">
      <div className="container-x max-w-3xl">
        <h1 className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.02]">{title}</h1>
        {dated ? (
          <p className="label mt-4 text-slate-500">
            {copy.effective}: {copy.effectiveDate}
          </p>
        ) : null}
        {lead ? <p className="mt-6 text-lg leading-relaxed text-slate-600">{lead}</p> : null}

        {children}

        {sections?.map((section) => (
          <section key={section.heading} className="mt-12">
            <h2 className="text-xl tracking-[-0.02em] sm:text-2xl">{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph} className="mt-4 text-base leading-relaxed text-slate-600">
                {paragraph}
              </p>
            ))}
            {section.list ? (
              <ul className="mt-4 flex flex-col gap-2">
                {section.list.map((entry) => (
                  <li key={entry} className="border-l-2 border-sky pl-4 text-base leading-relaxed text-slate-600">
                    {entry}
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        <section className="mt-12 border-t border-line pt-8">
          <h2 className="text-xl tracking-[-0.02em]">{copy.questions}</h2>
          <p className="mt-4 flex flex-col gap-1 text-base">
            <a href={`mailto:${EMAIL}`} className="link-underline self-start font-semibold text-accent-ink">
              {EMAIL}
            </a>
            <a href={`tel:${PHONE.href}`} className="link-underline self-start font-semibold text-accent-ink">
              {PHONE.label}
            </a>
          </p>
        </section>

        <Link href={`/${locale}`} className="link-underline mt-12 inline-block text-[0.8125rem] font-semibold">
          ← {copy.back}
        </Link>
      </div>
    </section>
  );
}
