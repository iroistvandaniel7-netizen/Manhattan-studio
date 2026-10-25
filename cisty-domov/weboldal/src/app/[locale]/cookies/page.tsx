import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales } from "@/i18n";
import { alternatesFor } from "@/lib/meta";
import { CONSENT_COOKIE, CONSENT_MAX_AGE } from "@/lib/consent";
import LegalPage from "@/components/layout/LegalPage";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: dict.legal.cookiesTitle, alternates: alternatesFor(locale, "/cookies") };
}

export default async function CookiePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { legal } = getDictionary(locale);
  const table = legal.cookieTable;

  return (
    <LegalPage
      locale={locale}
      copy={legal}
      title={legal.cookiesTitle}
      lead={legal.cookiesLead}
      sections={legal.cookiesSections}
      dated
    >
      {/* The full inventory, as a table — it is one row long, and that is the point. */}
      <div className="mt-10 overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[34rem] text-left text-sm">
          <thead className="bg-accent-soft">
            <tr>
              {[table.name, table.type, table.purpose, table.lifetime].map((h) => (
                <th key={h} scope="col" className="label px-5 py-3.5 text-slate-600">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-line">
              <td className="px-5 py-4 font-semibold">{CONSENT_COOKIE}</td>
              <td className="px-5 py-4">{table.typeValue}</td>
              <td className="px-5 py-4 text-slate-600">{table.purposeValue}</td>
              <td className="px-5 py-4">
                {Math.round(CONSENT_MAX_AGE / 86400 / 30)} {table.months}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </LegalPage>
  );
}
