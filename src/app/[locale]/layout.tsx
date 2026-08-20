import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getDictionary } from "@/i18n";
import { htmlLang, isLocale, locales, type Locale } from "@/i18n/config";
import { BRAND, EXAMS, LOCATIONS, PHONES, SITE_URL } from "@/lib/site";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  // latin-ext carries the Hungarian ő/ű and the Slovak ľ/š/č/ž.
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-poppins",
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
    telephone: PHONES.map((p) => p.label),
    address: LOCATIONS.map((location) => ({
      "@type": "PostalAddress",
      streetAddress: location.address.replace(/^\d{4}\s+Budapest,\s*/, ""),
      postalCode: location.address.slice(0, 4),
      addressLocality: "Budapest",
      addressCountry: "HU",
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "18:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "12:00",
      },
    ],
    availableLanguage: dict.languages.items.map((language) => language.name),
    hasCredential: EXAMS.map((exam) => `${exam} exam centre`),
  };

  return (
    <html
      lang={htmlLang[typedLocale]}
      className={poppins.variable}
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
