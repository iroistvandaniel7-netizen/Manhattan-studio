import { ImageResponse } from "next/og";
import { HERO } from "@/lib/content";
import { BRAND } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = BRAND.name;

/** Social card: flat blue ground, white type. */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b5bd3",
          color: "#ffffff",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: "0.1em" }}>{BRAND.wordmarkTop}</div>
          <div style={{ marginTop: 6, fontSize: 18, letterSpacing: "0.34em", color: "rgba(255,255,255,0.75)" }}>
            {BRAND.wordmarkBottom}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 960 }}>
          <div style={{ fontSize: 88, fontWeight: 800, lineHeight: 1.02, letterSpacing: "-0.04em" }}>{HERO.title}</div>
          <div style={{ marginTop: 26, fontSize: 28, color: "rgba(255,255,255,0.82)" }}>{HERO.eyebrow}</div>
        </div>
      </div>
    ),
    size,
  );
}
