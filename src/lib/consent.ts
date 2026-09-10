/**
 * What the visitor has agreed to.
 *
 * The studio asked for a consent banner, so the site now sets exactly one
 * cookie: the record of the answer. That one is the "strictly necessary" kind
 * — a site is allowed to remember that you said no without asking permission
 * to remember it — and it is the only cookie here.
 *
 * `analytics` currently gates nothing, because nothing measures anything yet.
 * That is deliberate rather than lazy: the switch is the part that has to
 * exist before the thing it governs, or the day analytics is added somebody
 * has to remember to ask first. Read it with `getConsent()` before loading
 * anything that measures, and it will already be right.
 *
 * Client-side only. The banner is a client component and the answer lives in
 * the browser; nothing here runs on the server, and no decision on the server
 * depends on it.
 */

export const CONSENT_COOKIE = "ms-consent";

/**
 * Six months, then ask again.
 *
 * Long enough that a regular visitor is not nagged, short enough that a
 * decision made once does not stand for ever — which is the expectation
 * regulators have settled on, and the reason this is not simply "never
 * expires".
 */
export const CONSENT_MAX_AGE = 60 * 60 * 24 * 182;

export type Consent = {
  /** Always true. The basket and this record itself; no way to refuse them. */
  necessary: true;
  /** Whether measuring is allowed. Nothing measures yet — see the note above. */
  analytics: boolean;
};

/** The stored forms. Kept to two short words so the cookie stays tiny. */
type Stored = "all" | "necessary";

export function readConsent(): Consent | null {
  if (typeof document === "undefined") return null;

  /*
   * Parsed rather than pattern-matched against the whole cookie string: a
   * cookie called `other-ms-consent` would match a naive `includes`, and a
   * consent record read off the wrong cookie is the kind of bug that is
   * invisible until it matters.
   */
  const found = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${CONSENT_COOKIE}=`));

  if (!found) return null;
  const value = decodeURIComponent(found.slice(CONSENT_COOKIE.length + 1)) as Stored;
  if (value !== "all" && value !== "necessary") return null;

  return { necessary: true, analytics: value === "all" };
}

export function writeConsent(analytics: boolean): void {
  if (typeof document === "undefined") return;

  const value: Stored = analytics ? "all" : "necessary";
  /* `Secure` only where the page is already on https — set on a plain-http
     local build the browser drops the cookie silently, and the banner comes
     back on every reload with nothing to show for it. */
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie =
    `${CONSENT_COOKIE}=${value}; Max-Age=${CONSENT_MAX_AGE}; Path=/; SameSite=Lax${secure}`;
}

/** For anything that might measure: ask before you load. */
export function getConsent(): Consent {
  return readConsent() ?? { necessary: true, analytics: false };
}

/* --------------------------------------------------------------------- *
 * Reading the answer the way React wants an external store read.
 *
 * Not an effect that copies the cookie into state: the server has no cookie
 * to read, so the first client paint would disagree with the markup that came
 * down the wire — and this project's lint rules rightly refuse a mount effect
 * that sets state. Same arrangement the basket uses.
 * --------------------------------------------------------------------- */

/** "ask" until answered. A primitive, so React can compare snapshots. */
export type ConsentState = "ask" | "answered";

const listeners = new Set<() => void>();

export function subscribeConsent(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function announce(): void {
  for (const listener of listeners) listener();
}

export function consentSnapshot(): ConsentState {
  return readConsent() === null ? "ask" : "answered";
}

/** The server has no cookie, so it renders the quiet state and never the bar. */
export function consentServerSnapshot(): ConsentState {
  return "answered";
}

/** Record the answer and tell everyone reading. */
export function answerConsent(analytics: boolean): void {
  writeConsent(analytics);
  announce();
}

/**
 * Ask again.
 *
 * Somebody who said no in January has to be able to say yes in March, and
 * "clear this site's cookies in your browser settings" is not an answer — it
 * is an instruction to go and find a menu most people have never opened. The
 * footer carries a link that calls this, and the bar comes straight back.
 *
 * Expiring the cookie rather than deleting a value: setting `Max-Age=0` is
 * how a cookie is removed, and it has to be set on the same path it was
 * written to or the browser keeps the original alongside the new one.
 */
export function reopenConsent(): void {
  if (typeof document === "undefined") return;
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=; Max-Age=0; Path=/; SameSite=Lax${secure}`;
  announce();
}
