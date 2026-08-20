/**
 * Central, single-source-of-truth site data.
 *
 * Every value below is taken from the studio's published, verifiable
 * information. Nothing here is invented — if a detail could not be verified it
 * is simply absent rather than filled with a placeholder.
 */

export const SITE_URL = "https://manhattannyelvstudio.hu";

export const BRAND = {
  name: "Manhattan",
  nameFull: "Manhattan Nyelvstúdió",
  wordmarkTop: "MANHATTAN",
  wordmarkBottom: "NYELVSTÚDIÓ",
} as const;

/** Phone numbers: `href` is E.164 for tel: links, `label` is display form. */
export const PHONES = [
  { href: "+3614318630", label: "+36 1 431 8630" },
  { href: "+36204458901", label: "+36 20 445 8901" },
] as const;

export const FAX = { label: "+36 1 431 8631" } as const;

export const LOCATIONS = [
  {
    id: "ors",
    /** Not translated — Hungarian postal addresses stay in Hungarian. */
    address: "1106 Budapest, Örs vezér tere 25/C",
    detail: "Árkád Irodaház, II. emelet",
    mapQuery: "Manhattan Nyelvstúdió, Örs vezér tere 25/C, Budapest",
  },
  {
    id: "obuda",
    address: "1032 Budapest, Kiscelli utca 7–9.",
    detail: "Óbuda",
    mapQuery: "Manhattan Nyelvstúdió Buda, Kiscelli utca 7-9, Budapest",
  },
] as const;

/** Accredited exam systems the studio is an exam centre for. */
export const EXAMS = [
  "ECL",
  "Euro",
  "EuroPro",
  "Goethe",
  "ITK Origó",
  "TELC",
] as const;

/** Taught languages. `code` keys into the per-locale course dictionary. */
export const LANGUAGE_CODES = ["en", "de", "fr", "it", "es"] as const;
export type LanguageCode = (typeof LANGUAGE_CODES)[number];

export const mapsUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
