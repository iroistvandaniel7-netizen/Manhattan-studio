import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale, type Locale } from "@/i18n/config";

/**
 * Sends every un-prefixed request to a locale-prefixed URL.
 *
 * `Accept-Language` decides, but only between Slovak and Hungarian — English
 * is never chosen from the header, and everything else falls through to
 * Slovak. That looks arbitrary and is not: around Dunajská Streda a great many
 * people who read Slovak or Hungarian keep their phone set to English, so
 * honouring the header for English served the site in a language the visitor
 * had not asked the site for. The studio found its own site opening in English
 * for exactly this reason.
 *
 * English is still one click away in the switcher, and still has its own URL
 * that anyone can link to or share.
 */
const NEGOTIABLE = ["sk", "hu"] as const;
function preferredLocale(request: NextRequest) {
  const header = request.headers.get("accept-language");
  if (!header) return defaultLocale;

  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.trim().toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    const base = tag.split("-")[0];
    if ((NEGOTIABLE as readonly string[]).includes(base)) return base as Locale;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const locale = preferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Everything except Next internals, the metadata routes and static assets.
  // `/geo` holds the globe's coastline data, which is fetched, not visited —
  // sending it through the locale redirect would hand the fetch an HTML page.
  matcher: [
    "/((?!_next|api|geo/|favicon.ico|icon.svg|apple-icon.png|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|json|webmanifest)$).*)",
  ],
};
