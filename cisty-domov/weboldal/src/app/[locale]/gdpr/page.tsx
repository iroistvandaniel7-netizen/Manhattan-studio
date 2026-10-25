import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales } from "@/i18n";
import { alternatesFor } from "@/lib/meta";
import LegalPage from "@/components/layout/LegalPage";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: dict.legal.privacyTitle, alternates: alternatesFor(locale, "/gdpr") };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { legal } = getDictionary(locale);

  return (
    <LegalPage
      locale={locale}
      copy={legal}
      title={legal.privacyTitle}
      lead={legal.privacyLead}
      sections={legal.privacySections}
      dated
    />
  );
}
