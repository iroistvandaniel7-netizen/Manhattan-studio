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
    title: dict.legal.privacyTitle,
    description: dict.legal.placeholderNote,
    alternates: {
      canonical: `${SITE_URL}/${locale}/adatvedelem`,
      languages: Object.fromEntries(
        locales.map((l) => [htmlLang[l], `${SITE_URL}/${l}/adatvedelem`]),
      ),
    },
    // Not indexed until the studio supplies the final legal text.
    robots: { index: false, follow: true },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <LegalPage
      locale={locale}
      title={dict.legal.privacyTitle}
      note={dict.legal.placeholderNote}
      backLabel={dict.legal.backHome}
    />
  );
}
