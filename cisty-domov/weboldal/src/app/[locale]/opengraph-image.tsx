import { ImageResponse } from "next/og";
import { getDictionary, isLocale, locales } from "@/i18n";
import { BRAND } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = BRAND.name;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/** Social card: the brand blue, navy type, the hero's two lines. */
export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { hero } = getDictionary(isLocale(locale) ? locale : "sk");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#89CFF0",
          color: "#0B2D5B",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 54, fontWeight: 700, letterSpacing: "-0.03em" }}>
            čistý<span style={{ marginLeft: 14, fontWeight: 400 }}>domov</span>
          </div>
          <div style={{ marginTop: 8, fontSize: 18, letterSpacing: "0.3em" }}>{BRAND.tagline.toUpperCase()}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 1000 }}>
          <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1.02, letterSpacing: "-0.04em" }}>{hero.title}</div>
          <div style={{ fontSize: 96, fontWeight: 400, lineHeight: 1.02, letterSpacing: "-0.04em", color: "#ffffff" }}>
            {hero.titleSoft}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
