import type { Metadata, Viewport } from "next";
import { Funnel_Display, Funnel_Sans } from "next/font/google";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import CookieButton from "@/components/layout/CookieButton";
import ScriptFlag from "@/components/layout/ScriptFlag";
import { META } from "@/lib/content";
import { AREA, BRAND, COMPANY, EMAIL, HOURS, PHONE, SITE_URL } from "@/lib/site";

/*
 * Funnel Display for headlines, Funnel Sans for text: one family drawn for
 * both jobs, so the page has a voice of its own without two faces arguing.
 * Self-hosted by next/font — the files come from this site, so no visitor's
 * request reaches Google, which is what lets the cookie notice say so.
 * latin-ext carries ő, ű, č and ý.
 */
const display = Funnel_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-funnel-display",
});

const sans = Funnel_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-funnel-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: META.title, template: `%s — ${BRAND.name}` },
  description: META.description,
  applicationName: BRAND.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: BRAND.name,
    title: META.title,
    description: META.description,
    url: SITE_URL,
    locale: "hu_HU",
  },
  twitter: { card: "summary_large_image", title: META.title, description: META.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1b63d6",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: BRAND.name,
    legalName: COMPANY.legalName,
    url: SITE_URL,
    description: META.description,
    telephone: PHONE.label,
    email: EMAIL,
    areaServed: AREA,
    address: { "@type": "PostalAddress", streetAddress: COMPANY.seat, addressCountry: "SK" },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: HOURS.days, opens: HOURS.opens, closes: HOURS.closes },
    ],
  };

  return (
    <html lang="hu" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        {/* Arms the scroll reveals before first paint; <ScriptFlag /> is the backstop. */}
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.setAttribute('data-js','')` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body id="top">
        <ScriptFlag />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Ugrás a tartalomra
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <CookieBanner />
        <CookieButton />
      </body>
    </html>
  );
}
