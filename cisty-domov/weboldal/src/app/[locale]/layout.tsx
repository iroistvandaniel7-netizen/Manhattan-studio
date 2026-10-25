import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import CookieButton from "@/components/layout/CookieButton";
import ScriptFlag from "@/components/layout/ScriptFlag";
import { getDictionary } from "@/i18n";
import { defaultLocale, htmlLang, isLocale, locales, ogLocale, type Locale } from "@/i18n/config";
import { BRAND, COMPANY, EMAIL, HOURS, PHONE, SITE_URL } from "@/lib/site";

/*
 * Poppins everywhere, self-hosted by next/font: the files come from this
 * site, so no visitor's request reaches Google — which is what lets the
 * cookie notice say so. latin-ext carries ő, ű, č and ý. Only the weights
 * the page sets are fetched.
 */
const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["100", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: dict.meta.title, template: `%s — ${BRAND.name}` },
    description: dict.meta.description,
    applicationName: BRAND.name,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [htmlLang[l], `/${l}`])),
        "x-default": `/${defaultLocale}`,
      },
    },
    openGraph: {
      type: "website",
      siteName: BRAND.name,
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${locale}`,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
    },
    twitter: { card: "summary_large_image", title: dict.meta.title, description: dict.meta.description },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#89CFF0",
  colorScheme: "light",
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: BRAND.name,
    legalName: COMPANY.legalName,
    url: `${SITE_URL}/${typedLocale}`,
    description: dict.meta.description,
    telephone: PHONE.label,
    email: EMAIL,
    areaServed: dict.contact.area,
    address: { "@type": "PostalAddress", streetAddress: COMPANY.seat, addressCountry: "SK" },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: HOURS.days, opens: HOURS.opens, closes: HOURS.closes },
    ],
  };

  return (
    <html lang={htmlLang[typedLocale]} className={poppins.variable} suppressHydrationWarning>
      <head>
        {/*
          Arms the scroll reveals before first paint, so nothing flashes. If the
          app never starts — a blocked or failed script, a page opened from disk
          in a browser that will not load its bundles — the reveals would hold
          the copy hidden for good, so after three seconds without
          <ScriptFlag /> reporting in, the flag is taken back down and
          everything shows in its finished state.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.setAttribute('data-js','');setTimeout(function(){if(!window.__ktReady)document.documentElement.removeAttribute('data-js')},3000)`,
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body id="top">
        <ScriptFlag />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink"
        >
          {dict.ui.skipToContent}
        </a>
        <Header locale={typedLocale} dict={dict} />
        <main id="main">{children}</main>
        <Footer locale={typedLocale} dict={dict} />
        <CookieBanner locale={typedLocale} copy={dict.cookies} />
        <CookieButton label={dict.cookies.reopen} />
      </body>
    </html>
  );
}
