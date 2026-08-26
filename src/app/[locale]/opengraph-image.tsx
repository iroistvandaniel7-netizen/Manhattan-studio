import { ImageResponse } from "next/og";
import { getDictionary } from "@/i18n";
import { isLocale, locales } from "@/i18n/config";
import { BRAND } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const alt = BRAND.nameFull;

/**
 * Social card: flat accent ground, white type, no imagery. `next/og` supports
 * only a subset of CSS, so nothing here depends on the site's stylesheet.
 */
export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "hu");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0039a6",
          color: "#ffffff",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: "0.16em" }}>
            {BRAND.wordmarkTop}
          </div>
          <div
            style={{
              marginTop: 8,
              fontSize: 16,
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            {BRAND.wordmarkBottom}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 940 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
            }}
          >
            {dict.hero.title}
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 26,
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.8)",
            }}
          >
            {dict.hero.eyebrow}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
