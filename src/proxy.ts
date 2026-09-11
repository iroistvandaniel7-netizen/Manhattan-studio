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
/**
 * Where the old site's pages went.
 *
 * The domain has been online for years, and Google still has the previous
 * site in its index: `/kurzy/madarsky-jazyk/`, `/hu/kurzusok/angol-nyelv/`,
 * `/skusobny-test/deutsch-test/` and their neighbours. None of those paths
 * exist here, so every one of them was answering 404 — which throws away the
 * ranking those pages spent years earning instead of handing it to the pages
 * that replaced them.
 *
 * Each rule points at the section that now does that page's job. The old site
 * had a page per topic; this one has one page with sections, so several old
 * URLs land on the same new one. That is a site consolidation, and a permanent
 * redirect is exactly how you tell a crawler about it.
 *
 * Only routes verified in Google's index are listed. The full list of what
 * Google still remembers is in Search Console under Pages → Not found (404);
 * anything there that is missing here belongs in this table.
 *
 * `/hu/...` has to be matched here, before the locale check below waves it
 * through — the old site used `/hu/` as its Hungarian prefix too, so those
 * paths look locale-prefixed and would otherwise reach a 404.
 */
const MOVED: ReadonlyArray<readonly [RegExp, string]> = [
  /* Slovak lived at the root of the old site. */
  [/^\/kurzy(\/|$)/, "/sk#courses"],
  [/^\/skusobny-test(\/|$)/, "/sk#quiz"],
  /* Hungarian lived under /hu/. */
  [/^\/hu\/kurzusok(\/|$)/, "/hu#courses"],
  [/^\/hu\/orosz-nyelv(\/|$)/, "/hu#languages"],
  [/^\/hu\/gyakran-idezett-kerdesek(\/|$)/, "/hu"],
];

function movedTo(pathname: string): string | null {
  for (const [pattern, target] of MOVED) {
    if (pattern.test(pathname)) return target;
  }
  return null;
}

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

  /* The old site's URLs, first — see MOVED. Permanent, because they are. */
  const moved = movedTo(pathname);
  if (moved) {
    const [path, hash] = moved.split("#");
    const url = request.nextUrl.clone();
    url.pathname = path;
    url.hash = hash ? `#${hash}` : "";
    url.search = "";
    return NextResponse.redirect(url, 301);
  }

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const locale = preferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  /*
   * Temporary, and it says which header it read.
   *
   * Temporary because the answer depends on the visitor, not on the URL: a
   * crawler that cached this as permanent would decide the bare domain *is*
   * the Slovak page and stop asking, and a Hungarian visitor would never be
   * offered Hungarian again.
   *
   * `Vary` is the other half of that. Without it a shared cache — Vercel's
   * edge, a company proxy, an ISP — is entitled to store the first redirect it
   * sees and replay it to everyone behind it, which is how a Hungarian visitor
   * ends up on the Slovak page because a Slovak one loaded the site first.
   */
  const response = NextResponse.redirect(url);
  response.headers.set("Vary", "Accept-Language");
  return response;
}

export const config = {
  // Everything except Next internals, the metadata routes and static assets.
  // `/geo` holds the globe's coastline data, which is fetched, not visited —
  // sending it through the locale redirect would hand the fetch an HTML page.
  matcher: [
    "/((?!_next|api|geo/|favicon.ico|icon.svg|apple-icon.png|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|json|webmanifest)$).*)",
  ],
};
