/**
 * Every fact about the business, in one place.
 *
 * The header, the footer, the contact block, the legal pages, the structured
 * data and the form's fallback all read from here, so a phone number changed
 * in this file is changed everywhere at once.
 *
 * ⚠ Everything marked TODO is a placeholder. Replace it with the real
 * business details before the site goes live — the legal pages print these
 * values as they stand.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.kristalytakaritas.hu"; // TODO: domain

export const BRAND = {
  name: "Kristály Takarítás",
  wordmarkTop: "KRISTÁLY",
  wordmarkBottom: "TAKARÍTÁS",
} as const;

/** Who runs the site — required by the imprint and the privacy notice. */
export const COMPANY = {
  legalName: "Kristály Takarítás Kft.", // TODO
  seat: "1234 Budapest, Minta utca 1.", // TODO
  registryNumber: "01-09-000000", // TODO: cégjegyzékszám (or nyilvántartási szám for a sole trader)
  registryCourt: "Fővárosi Törvényszék Cégbírósága", // TODO
  taxNumber: "00000000-0-00", // TODO: adószám
  representative: "Minta Kristóf", // TODO: képviselő / ügyvezető
} as const;

/** `href` is E.164 for tel: links, `label` is the display form. */
export const PHONE = { href: "+36300000000", label: "+36 30 000 0000" } as const; // TODO

export const EMAIL = "info@kristalytakaritas.hu"; // TODO

/** Where the team works. Shown in the contact block. */
export const AREA = "Budapest és 30 km-es környéke"; // TODO

export const HOURS = {
  label: "Hétfő–Szombat",
  opens: "07:00",
  closes: "19:00",
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
} as const;

/** The hosting provider has to be named in the imprint (Ektv. 4. §). */
export const HOSTING = {
  name: "Vercel Inc.",
  address: "440 N Barranca Ave #4133, Covina, CA 91723, USA",
  web: "https://vercel.com",
} as const;

/**
 * The data protection authority a complaint goes to. Hungary's by default;
 * a business registered elsewhere in the EU names its own authority here.
 */
export const AUTHORITY = {
  name: "Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH)",
  address: "1055 Budapest, Falk Miksa utca 9–11.",
  web: "https://naih.hu",
  email: "ugyfelszolgalat@naih.hu",
} as const;

/** How long an enquiry is kept if it never becomes a job. */
export const RETENTION_MONTHS = 12;
