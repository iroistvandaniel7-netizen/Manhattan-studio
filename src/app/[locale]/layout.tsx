import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans, Martian_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getDictionary } from "@/i18n";
import { htmlLang, isLocale, locales, type Locale } from "@/i18n/config";
import { ADDRESS, BRAND, EMAIL, HOURS, PHONES, SITE_URL } from "@/lib/site";

/*
 * Three faces, each with a job.
 *
 * Bricolage Grotesque is the display voice — a variable grotesque with
 * deliberately irregular joins, so headlines have a hand in them rather than
 * reading as another geometric sans. Instrument Sans carries running text.
 * Martian Mono is the utility face: wide, monospaced, used only for labels,
 * codes and figures, where it gives the page the character of station
 * signage and printed timetables.
 *
 * latin-ext carries the Hungarian ő/ű and the Slovak ľ/š/č/ž.
 */
const display = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-display-src",
});

const body = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-body-src",
});

const mono = Martian_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-mono-src",
});

export const dynamicParams = false;

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
  const url = `${SITE_URL}/${locale}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.meta.title,
      template: `%s — ${BRAND.nameFull}`,
    },
    description: dict.meta.description,
    applicationName: BRAND.nameFull,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(locales.map((l) => [htmlLang[l], `${SITE_URL}/${l}`])),
        "x-default": `${SITE_URL}/hu`,
      },
    },
    openGraph: {
      type: "website",
      siteName: BRAND.nameFull,
      title: dict.meta.title,
      description: dict.meta.description,
      url,
      locale: htmlLang[locale].replace("-", "_"),
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => htmlLang[l].replace("-", "_")),
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export const viewport = {
  themeColor: "#ffffff",
  colorScheme: "light" as const,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale: Locale = locale;
  const dict = getDictionary(typedLocale);

  /* Structured data — every value is verified studio information. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LanguageSchool",
    name: BRAND.nameFull,
    url: `${SITE_URL}/${typedLocale}`,
    description: dict.meta.description,
    legalName: BRAND.legalName,
    telephone: PHONES.map((p) => p.label),
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS.street,
      postalCode: ADDRESS.postalCode,
      addressLocality: ADDRESS.citySk,
      addressCountry: ADDRESS.countryCode,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: HOURS.opens,
        closes: HOURS.closes,
      },
    ],
    availableLanguage: dict.languages.items.map((language) => language.name),
  };

  return (
    <html
      lang={htmlLang[typedLocale]}
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/*
         * Marks the document as script-enabled before first paint, which is
         * what arms the scroll-reveal styles. Without JavaScript the attribute
         * never appears and all content renders in its final state.
         */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.setAttribute('data-js','')`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body id="top">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-blue focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          {dict.meta.skipToContent}
        </a>

        <Header locale={typedLocale} dict={dict} />
        <main id="main">{children}</main>
        <Footer locale={typedLocale} dict={dict} />
      </body>
    </html>
  );
}
