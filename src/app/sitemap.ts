import type { MetadataRoute } from "next";
import { htmlLang, locales } from "@/i18n/config";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const languageMap = (path: string) =>
    Object.fromEntries(locales.map((l) => [htmlLang[l], `${SITE_URL}/${l}${path}`]));

  /*
   * The home page, the gallery and the contact page, in all three languages.
   *
   * The legal pages stay out: they are `noindex` until the studio supplies
   * their final text, and listing a page you have asked search engines not to
   * index is a contradiction to hand a crawler.
   */
  const pages = [
    { path: "", priority: 1 },
    { path: "/galeria", priority: 0.6 },
    { path: "/kapcsolat", priority: 0.7 },
  ];

  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${SITE_URL}/${locale}${page.path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      /* The Hungarian pages are the primary ones; the other two locales are
         the same content and rank behind their Hungarian counterpart. */
      priority: locale === "hu" ? page.priority : page.priority * 0.8,
      alternates: { languages: languageMap(page.path) },
    })),
  );
}
