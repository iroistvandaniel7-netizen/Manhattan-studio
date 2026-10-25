import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales } from "@/i18n";
import { alternatesFor } from "@/lib/meta";
import { COMPANY, EMAIL, HOSTING, PHONE } from "@/lib/site";
import LegalPage from "@/components/layout/LegalPage";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: dict.legal.imprintTitle, alternates: alternatesFor(locale, "/impressum") };
}

/** The service provider's details, as the Slovak e-commerce act (zákon č. 22/2004 Z. z., § 4) requires. */
export default async function ImprintPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { legal } = getDictionary(locale);
  const l = legal.imprintLabels;

  const link = "link-underline font-semibold text-accent-ink";
  const operator: [string, React.ReactNode][] = [
    [l.provider, COMPANY.legalName],
    [l.seat, COMPANY.seat],
    ["IČO", COMPANY.ico],
    ["DIČ", COMPANY.dic],
    ...(COMPANY.icDph ? ([["IČ DPH", COMPANY.icDph]] as [string, React.ReactNode][]) : []),
    [l.register, COMPANY.register],
    [l.representative, COMPANY.representative],
    [l.email, <a key="e" href={`mailto:${EMAIL}`} className={link}>{EMAIL}</a>],
    [l.phone, <a key="p" href={`tel:${PHONE.href}`} className={link}>{PHONE.label}</a>],
  ];
  const hosting: [string, React.ReactNode][] = [
    [l.host, HOSTING.name],
    [l.address, HOSTING.address],
    [l.web, <a key="w" href={HOSTING.web} target="_blank" rel="noopener noreferrer" className={link}>{HOSTING.web}</a>],
  ];

  return (
    <LegalPage locale={locale} copy={legal} title={legal.imprintTitle} lead={legal.imprintLead}>
      {[
        { heading: legal.imprintOperator, rows: operator },
        { heading: legal.imprintHosting, rows: hosting },
      ].map((block) => (
        <section key={block.heading} className="mt-12">
          <h2 className="text-xl tracking-[-0.02em] sm:text-2xl">{block.heading}</h2>
          <dl className="mt-4 divide-y divide-line rounded-2xl border border-line">
            {block.rows.map(([label, value]) => (
              <div key={label} className="grid gap-1 px-5 py-4 sm:grid-cols-[14rem_1fr] sm:gap-6">
                <dt className="label pt-0.5 text-slate-500">{label}</dt>
                <dd className="text-base">{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </LegalPage>
  );
}
