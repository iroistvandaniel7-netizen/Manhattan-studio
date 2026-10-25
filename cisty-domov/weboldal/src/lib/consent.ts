/**
 * What the visitor has agreed to.
 *
 * The site sets exactly one cookie of its own: the record of this answer. That
 * one is strictly necessary — a site may remember that you said no without
 * asking permission to remember it.
 *
 * `statistics` and `marketing` gate nothing yet, because nothing measures and
 * nothing advertises. The switches exist before the things they govern, so the
 * day an analytics tag is added it is already behind a question. Read
 * `getConsent()` before loading anything of the kind.
 *
 * Client-side only. The answer lives in the browser and nothing on the server
 * depends on it.
 */

export const CONSENT_COOKIE = "kt-consent";

/** Six months, then ask again — long enough not to nag, short enough not to stand for ever. */
export const CONSENT_MAX_AGE = 60 * 60 * 24 * 182;

export type Consent = {
  necessary: true;
  statistics: boolean;
  marketing: boolean;
};

/** Stored as two digits, statistics then marketing: "10" = statistics only. */
const encode = (c: Consent) => `${c.statistics ? 1 : 0}${c.marketing ? 1 : 0}`;

export function readConsent(): Consent | null {
  if (typeof document === "undefined") return null;

  const found = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${CONSENT_COOKIE}=`));

  if (!found) return null;
  const value = decodeURIComponent(found.slice(CONSENT_COOKIE.length + 1));
  if (!/^[01]{2}$/.test(value)) return null;

  return { necessary: true, statistics: value[0] === "1", marketing: value[1] === "1" };
}

function writeCookie(value: string, maxAge: number): void {
  /* `Secure` only on https — on a plain-http local build the browser would drop
     the cookie silently and the bar would come back on every reload. */
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${maxAge}; Path=/; SameSite=Lax${secure}`;
}

/** For anything that might measure or advertise: ask before you load. */
export function getConsent(): Consent {
  return readConsent() ?? { necessary: true, statistics: false, marketing: false };
}

/* --------------------------------------------------------------------- *
 * Read the way React wants an external store read, so the server render
 * (which has no cookie) and the first client paint never disagree.
 * --------------------------------------------------------------------- */

/**
 * "unknown" is the server's answer: neither the bar nor the corner button
 * paints until the browser has actually looked at the cookie.
 */
export type ConsentState = "ask" | "answered" | "unknown";

const listeners = new Set<() => void>();
/* The settings panel can be opened while an answer is already on record. */
let editing = false;

export function subscribeConsent(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function announce(): void {
  for (const listener of listeners) listener();
}

export function consentSnapshot(): ConsentState {
  return editing || readConsent() === null ? "ask" : "answered";
}

export function consentServerSnapshot(): ConsentState {
  return "unknown";
}

export function answerConsent(choice: Omit<Consent, "necessary">): void {
  writeCookie(encode({ necessary: true, ...choice }), CONSENT_MAX_AGE);
  editing = false;
  announce();
}

/**
 * Ask again. Somebody who said no in January has to be able to say yes in
 * March without hunting through browser settings — the footer link and the
 * corner button both call this.
 */
export function reopenConsent(): void {
  editing = true;
  announce();
}
