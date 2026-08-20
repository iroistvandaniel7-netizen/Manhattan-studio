import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { PHONES } from "@/lib/site";

/**
 * Shared shell for the privacy and cookie pages.
 *
 * No legal text is invented here: the page states plainly that the final
 * wording comes from the studio and points at contact routes that work today.
 * Both pages are `noindex` until that text lands.
 */
export default function LegalPage({
  locale,
  title,
  note,
  backLabel,
}: {
  locale: Locale;
  title: string;
  note: string;
  backLabel: string;
}) {
  return (
    <section className="py-section">
      <div className="container-x max-w-3xl">
        <h1 className="mt-10 text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1] tracking-[-0.04em]">
          {title}
        </h1>

        <p className="mt-8 border-l-2 border-ink pl-6 text-base leading-relaxed text-graphite-600">
          {note}
        </p>

        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          {PHONES.map((phone) => (
            <li key={phone.href}>
              <a
                href={`tel:${phone.href}`}
                className="link-underline text-base font-semibold"
              >
                {phone.label}
              </a>
            </li>
          ))}
        </ul>

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
