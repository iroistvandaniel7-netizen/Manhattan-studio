import type { MetadataRoute } from "next";
import { htmlLang, locales } from "@/i18n/config";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const languageMap = (path: string) =>
    Object.fromEntries(locales.map((l) => [htmlLang[l], `${SITE_URL}/${l}${path}`]));

  // The legal pages are noindex until their final text lands, so the sitemap
  // lists the home pages only.
  return locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: locale === "hu" ? 1 : 0.8,
    alternates: { languages: languageMap("") },
  }));
}
