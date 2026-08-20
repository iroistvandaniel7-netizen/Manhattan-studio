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
 * Social card: ink ground, paper type, and a simplified skyline along the
 * bottom edge. Drawn with plain divs and one inline SVG — `next/og` supports
 * only a subset of CSS, so nothing here relies on the site's stylesheet.
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
          background: "#0a0a0a",
          color: "#ffffff",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Wordmark */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 30,
              fontWeight: 800,
              letterSpacing: "0.18em",
            }}
          >
            {BRAND.wordmarkTop}
          </div>
          <div
            style={{
              marginTop: 8,
              fontSize: 16,
              letterSpacing: "0.34em",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            {BRAND.wordmarkBottom}
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
          <div
            style={{
              fontSize: 74,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
            }}
          >
            {dict.hero.titleLines.join(" ")}
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 26,
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.62)",
            }}
          >
            {dict.hero.eyebrow}
          </div>
        </div>

        {/* Skyline strip */}
        <svg
          width="1200"
          height="150"
          viewBox="0 0 1200 150"
          style={{ position: "absolute", left: 0, bottom: 0 }}
        >
          <g fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="2">
            <path d="M0 150V96h56v54" />
            <path d="M62 150V112h38v38" />
            <path d="M106 150V72h58v78" />
            <path d="M170 150V120h34v30" />
            <path d="M210 150V58h26v-30h20v30h26v92" />
            <path d="M290 150V104h44v46" />
            <path d="M340 150V80h56v70" />
            <path d="M404 150V60h18V26h12v-20h12v20h12v34h18v90" />
            <path d="M488 150V100h48v50" />
            <path d="M542 150V118h34v32" />
            <path d="M584 150V64h20V34h16v30h20v86" />
            <path d="M648 150V108h42v42" />
            <path d="M696 150V76h54v74" />
            <path d="M758 150V46l24-22 24 22v104" />
            <path d="M814 150V112h36v38" />
            <path d="M856 150V84h52v66" />
            <path d="M916 150V56h20V28h16v28h20v94" />
            <path d="M984 150V106h44v44" />
            <path d="M1034 150V78h50v72" />
            <path d="M1090 150V116h38v34" />
            <path d="M1134 150V90h66v60" />
          </g>
          <g stroke="rgba(255,255,255,0.28)" strokeWidth="2" strokeLinecap="round">
            <path d="M429 6V-14" />
            <path d="M782 24V-6" />
            <path d="M944 28V4" />
          </g>
        </svg>

        {/* Accent marker */}
        <div
          style={{
            position: "absolute",
            top: 72,
            right: 80,
            width: 18,
            height: 18,
            background: "#f2c53d",
          }}
        />
      </div>
    ),
    size,
  );
}
