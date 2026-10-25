import type { MetadataRoute } from "next";
import { defaultLocale, htmlLang, locales } from "@/i18n/config";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages = [
    { path: "", priority: 1 },
    { path: "/gdpr", priority: 0.2 },
    { path: "/cookies", priority: 0.2 },
    { path: "/impressum", priority: 0.2 },
  ];

  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${SITE_URL}/${locale}${page.path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: locale === defaultLocale ? page.priority : page.priority * 0.8,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [htmlLang[l], `${SITE_URL}/${l}${page.path}`])),
      },
    })),
  );
}
