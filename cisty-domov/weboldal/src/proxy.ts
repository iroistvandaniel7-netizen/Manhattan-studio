import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale, type Locale } from "@/i18n/config";

/**
 * Sends every un-prefixed request to a locale-prefixed URL.
 *
 * `Accept-Language` decides between Slovak and Hungarian only. English is
 * never chosen from the header: around Dunajská Streda many people who read
 * Slovak or Hungarian keep their phone in English, and honouring that would
 * open the site in a language nobody asked it for. English keeps its own URL
 * and its place in the switcher.
 */
const NEGOTIABLE = ["sk", "hu"] as const;

function preferredLocale(request: NextRequest): Locale {
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

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;

  /*
   * Temporary, and it says which header it read: the answer depends on the
   * visitor, not the URL, so no crawler or shared cache may keep it as the
   * one true page for the bare domain.
   */
  const response = NextResponse.redirect(url);
  response.headers.set("Vary", "Accept-Language");
  return response;
}

export const config = {
  // Everything except Next internals, the API, metadata routes and static files.
  matcher: [
    "/((?!_next|api|brand/|video/|munkaink/|favicon.ico|icon.svg|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|json|mp4|webmanifest)$).*)",
  ],
};
