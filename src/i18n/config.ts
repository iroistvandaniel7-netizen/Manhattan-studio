export const locales = ["hu", "sk", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "hu";

/** BCP-47 tags used for <html lang> and hreflang. */
export const htmlLang: Record<Locale, string> = {
  hu: "hu-HU",
  sk: "sk-SK",
  en: "en",
};

/** Short labels for the language switcher. */
export const localeLabel: Record<Locale, string> = {
  hu: "HU",
  sk: "SK",
  en: "EN",
};

/** Full, self-referential names (each written in its own language). */
export const localeName: Record<Locale, string> = {
  hu: "Magyar",
  sk: "Slovenčina",
  en: "English",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
