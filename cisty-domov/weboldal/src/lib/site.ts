/**
 * Every fact about the business, in one place.
 *
 * The header, the footer, the contact block, the legal pages, the structured
 * data and the form's fallback all read from here, so a phone number changed
 * in this file is changed everywhere at once.
 *
 * The phone number and domain are the ones on the Čistý Domov posters.
 * ⚠ Everything marked TODO is a placeholder: replace it with the real company
 * details before the site goes live — the legal pages print these as they stand.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.cistydomov.sk";

export const BRAND = {
  name: "Čistý Domov",
  tagline: "Takarítás · Upratovanie",
} as const;

/** Who runs the site — required by the imprint and the privacy notice. */
export const COMPANY = {
  legalName: "Čistý Domov s.r.o.", // TODO
  seat: "Hlavná 1, 929 01 Dunajská Streda", // TODO
  ico: "00 000 000", // TODO: IČO
  dic: "0000000000", // TODO: DIČ
  icDph: "", // TODO: IČ DPH, if VAT-registered — leave empty otherwise
  register: "Obchodný register Okresného súdu Trnava, oddiel Sro, vložka č. 00000/T", // TODO
  representative: "Meno Priezvisko, konateľ", // TODO
} as const;

/** `href` is E.164 for tel: links, `label` is the display form. From the posters. */
export const PHONE = { href: "+421900123456", label: "+421 900 123 456" } as const;

export const EMAIL = "info@cistydomov.sk"; // TODO: confirm the mailbox exists

/** Opening hours; the day range is worded in each dictionary (`contact.hours`). */
export const HOURS = {
  opens: "07:00",
  closes: "19:00",
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
} as const; // TODO: confirm

/** The hosting provider, named in the imprint. */
export const HOSTING = {
  name: "Vercel Inc.",
  address: "440 N Barranca Ave #4133, Covina, CA 91723, USA",
  web: "https://vercel.com",
} as const;

/** The Slovak data protection authority, where a complaint goes. */
export const AUTHORITY = {
  name: "Úrad na ochranu osobných údajov Slovenskej republiky",
  address: "Hraničná 12, 820 07 Bratislava 27",
  web: "https://dataprotection.gov.sk",
  email: "statny.dozor@pdp.gov.sk",
} as const;

/** How long an enquiry is kept if it never becomes a job. */
export const RETENTION_MONTHS = 12;
