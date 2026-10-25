import type { Metadata } from "next";
import { htmlLang, locales, type Locale } from "@/i18n/config";

/** Canonical and hreflang links for a page that exists under every locale. */
export function alternatesFor(locale: Locale, path: string): Metadata["alternates"] {
  return {
    canonical: `/${locale}${path}`,
    languages: Object.fromEntries(locales.map((l) => [htmlLang[l], `/${l}${path}`])),
  };
}
