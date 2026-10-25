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
          background: "#1b63d6",
          color: "#ffffff",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 54, fontWeight: 700, letterSpacing: "-0.03em" }}>
            čistý<span style={{ marginLeft: 14, fontWeight: 400, color: "#bfd7fa" }}>domov</span>
          </div>
          <div style={{ marginTop: 8, fontSize: 18, letterSpacing: "0.3em", color: "rgba(255,255,255,0.75)" }}>
            {BRAND.tagline.toUpperCase()}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 960 }}>
          <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1.02, letterSpacing: "-0.04em" }}>{HERO.title}</div>
          <div style={{ fontSize: 96, fontWeight: 400, lineHeight: 1.02, letterSpacing: "-0.04em", color: "#bfd7fa" }}>
            {HERO.titleSoft}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
