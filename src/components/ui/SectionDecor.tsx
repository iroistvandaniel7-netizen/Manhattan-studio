import { FLAGS } from "@/components/graphics/Flags";

/**
 * Faint decorative layer sitting behind a section's content.
 *
 * Two parts, both optional: a large flag watermark and a geometric accent
 * (a ring, or a grid of dots). Everything is `aria-hidden`, `pointer-events:
 * none` and pinned behind the content, so it can never interfere with
 * reading, selecting or tabbing.
 *
 * Opacity is kept very low deliberately — the flags are texture, not
 * information, and the page's blue/white/black palette has to stay dominant.
 */
export default function SectionDecor({
  flag,
  side = "right",
  accent = "ring",
  invert = false,
}: {
  /** Badge code — "EN", "DE", "RU", "ES", "IT", "SK", "HU". */
  flag?: keyof typeof FLAGS | string;
  side?: "left" | "right";
  accent?: "ring" | "dots" | "none";
  /** Set on dark sections, where the accent must be light rather than blue. */
  invert?: boolean;
}) {
  const Flag = flag ? FLAGS[flag] : undefined;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {Flag ? (
        <div
          className={`absolute top-[8%] w-[42vw] max-w-lg animate-flag-sway opacity-[0.05] saturate-[0.6] motion-reduce:animate-none ${
            side === "right" ? "-right-[10%]" : "-left-[10%]"
          }`}
        >
          <Flag className="h-auto w-full" />
        </div>
      ) : null}

      {accent === "ring" ? (
        <div
          className={`absolute bottom-[-14%] size-[34rem] animate-pulse-ring rounded-full border-2 motion-reduce:animate-none ${
            side === "right" ? "-left-[10%]" : "-right-[10%]"
          } ${invert ? "border-white/20" : "border-blue/20"}`}
        />
      ) : null}

      {accent === "dots" ? (
        <div
          className={`absolute bottom-[6%] size-72 opacity-30 ${
            side === "right" ? "left-[4%]" : "right-[4%]"
          }`}
          style={{
            backgroundImage: `radial-gradient(currentColor 1.5px, transparent 1.5px)`,
            backgroundSize: "18px 18px",
            color: invert ? "rgba(255,255,255,0.35)" : "var(--color-blue)",
          }}
        />
      ) : null}
    </div>
  );
}
