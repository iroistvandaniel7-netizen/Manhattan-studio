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

export const mapsUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
