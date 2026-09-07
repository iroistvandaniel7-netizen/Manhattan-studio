import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n";
import { htmlLang, isLocale, locales } from "@/i18n/config";
import { SITE_URL } from "@/lib/site";
import LegalPage from "@/components/layout/LegalPage";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: dict.legal.termsTitle,
    description: dict.legal.termsLead,
    alternates: {
      canonical: `${SITE_URL}/${locale}/aszf`,
      languages: Object.fromEntries(locales.map((l) => [htmlLang[l], `${SITE_URL}/${l}/aszf`])),
    },
    /*
     * Not indexed yet.
     *
     * Every statement on this page came from the studio or from what the code
     * demonstrably does, but the document has not been through a lawyer, and a
     * terms page is the one page on a shop that a search engine should not be
     * surfacing before somebody qualified has read it. Lift this — and add the
     * page to `sitemap.ts` — once it has been approved.
     */
    robots: { index: false, follow: true },
  };
}

/**
 * The terms of sale.
 *
 * Same shell as the privacy and cookie pages, with two differences: it names
 * the seller rather than the data controller, and it carries the complaints
 * route, because a shop has to say where a complaint goes.
 *
 * What is deliberately absent is as considered as what is here. There is no
 * rule about lessons the studio has to call off, no notice period for
 * rescheduling a private lesson, and no choice-of-law clause — the studio has
 * not stated any of those, and a term invented on a terms page is worse than a
 * missing one: it is a promise nobody at the studio knows they made.
 */
export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <LegalPage
      locale={locale}
      title={dict.legal.termsTitle}
      lead={dict.legal.termsLead}
      sections={dict.legal.termsSections}
      pending={dict.legal.termsPending}
      controllerHeading={dict.legal.sellerHeading}
      vatNote={dict.legal.vatNote}
      complaintsHeading={dict.legal.termsComplaintsHeading}
      complaintsBody={dict.legal.termsComplaintsBody}
      contactHeading={dict.legal.termsContactHeading}
      backLabel={dict.legal.backHome}
    />
  );
}
