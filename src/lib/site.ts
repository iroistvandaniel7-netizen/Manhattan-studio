/**
 * Central, single-source-of-truth studio data.
 *
 * Source: manhattanstudio.sk (MANHATTAN STUDIO s.r.o., Dunajská Streda).
 * The domain is blocked by this environment's network policy, so these values
 * were gathered from the studio's published listings rather than read off the
 * site directly — see README. Nothing here is invented: if a detail could not
 * be corroborated it is absent rather than guessed.
 */

export const SITE_URL = "https://www.manhattanstudio.sk";

export const BRAND = {
  name: "Manhattan Studio",
  nameFull: "MANHATTAN STUDIO",
  legalName: "Manhattan Studio s.r.o.",
  wordmarkTop: "MANHATTAN",
  wordmarkBottom: "STUDIO",
} as const;

/**
 * Registration details, as supplied by the studio.
 *
 * Required on a site that sells: a buyer has to be able to see who they are
 * contracting with, and the VAT registration has to be on anything that names
 * a price. These are identifiers, so they are not translated and not
 * reformatted — they are reproduced exactly as issued.
 */
export const COMPANY = {
  /** Company registration number. */
  ico: "46787623",
  /** Tax identification number. */
  dic: "2023580097",
  /** VAT identification number. */
  icDph: "SK2023580097",
  /** Registered for VAT under §4 of the Slovak VAT Act, from this date. */
  vatRegisteredFrom: "2023-11-02",
  vatBasis: "§4",
} as const;

/**
 * How long the studio keeps what the site collects: one year from the end of
 * the course. Stated in the privacy notice, and here so there is one answer
 * rather than one per translation.
 */
export const RETENTION_YEARS = 1;

/** `href` is E.164 for tel: links, `label` is the display form. */
export const PHONES = [{ href: "+421948172288", label: "0948 172 288" }] as const;

export const EMAIL = "info@manhattanstudio.sk";

/**
 * Single location, in the centre of Dunajská Streda. The street address is
 * Slovak and stays in Slovak in every locale; only the city name is localised.
 */
export const ADDRESS = {
  street: "Korzo Bélu Bartóka 5119",
  postalCode: "929 01",
  citySk: "Dunajská Streda",
  cityHu: "Dunaszerdahely",
  countryCode: "SK",
  mapQuery: "Manhattan Studio, Korzo Bélu Bartóka 5119, Dunajská Streda",
} as const;

/** Opening hours: every day of the week, 09:00–20:00. */
export const HOURS = { opens: "09:00", closes: "20:00" } as const;

/** Taught languages. `code` is the badge label, names live in the dictionaries. */
export const LANGUAGE_CODES = ["en", "de", "ru", "es", "it", "sk", "hu"] as const;
export type LanguageCode = (typeof LANGUAGE_CODES)[number];

/**
 * A greeting per taught language, used as ornament in the language rows and
 * the study scene's speech bubbles. These are facts about the languages
 * themselves, not claims about the studio, and they stay the same in every
 * locale.
 */
export const GREETINGS: Record<string, string> = {
  EN: "Hello",
  DE: "Hallo",
  RU: "Привет",
  ES: "Hola",
  IT: "Ciao",
  SK: "Ahoj",
  HU: "Szia",
};

export const mapsUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
