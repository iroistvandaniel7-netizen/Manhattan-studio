export const locales = ["sk", "hu", "en"] as const;

export type Locale = (typeof locales)[number];

/**
 * Where a visitor lands when nothing better is known: Slovak, the language of
 * the country the company works in. Hungarian browsers get Hungarian — see
 * `proxy.ts` — and English is always one click away.
 */
export const defaultLocale: Locale = "sk";

/** BCP-47 tags used for <html lang> and hreflang. */
export const htmlLang: Record<Locale, string> = {
  sk: "sk-SK",
  hu: "hu-HU",
  en: "en",
};

/** Open Graph locale tags. */
export const ogLocale: Record<Locale, string> = {
  sk: "sk_SK",
  hu: "hu_HU",
  en: "en_GB",
};

/** Short labels for the language switcher. */
export const localeLabel: Record<Locale, string> = {
  sk: "SK",
  hu: "HU",
  en: "EN",
};

/** Full, self-referential names (each written in its own language). */
export const localeName: Record<Locale, string> = {
  sk: "Slovenčina",
  hu: "Magyar",
  en: "English",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
