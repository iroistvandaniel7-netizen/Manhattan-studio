/**
 * Hand-built Manhattan skyline.
 *
 * Plain blocks come from a data array; the three landmark towers (a stepped
 * setback tower with a mast, an art-deco crown, and a tapered spire) are
 * explicit paths so the silhouette reads as New York rather than "generic
 * city". Purely decorative — every instance is aria-hidden.
 */

type Block = {
  x: number;
  w: number;
  y: number;
  /** Number of horizontal floor lines to suggest storeys. */
  floors?: number;
  /** Draw a roof-top water tower, the most New York detail there is. */
  tank?: boolean;
};

const BLOCKS: Block[] = [
  { x: 0, w: 74, y: 428, floors: 4 },
  { x: 78, w: 46, y: 470 },
  { x: 128, w: 78, y: 358, floors: 5, tank: true },
  { x: 210, w: 42, y: 498 },
  { x: 334, w: 52, y: 452 },
  { x: 390, w: 78, y: 388, floors: 4 },
  { x: 584, w: 64, y: 418, floors: 3, tank: true },
  { x: 652, w: 46, y: 468 },
  { x: 774, w: 74, y: 394, floors: 4 },
  { x: 852, w: 46, y: 458 },
  { x: 902, w: 92, y: 330, floors: 6 },
  { x: 1090, w: 62, y: 418, floors: 3, tank: true },
  { x: 1156, w: 72, y: 366, floors: 4 },
  { x: 1232, w: 44, y: 478 },
  { x: 1384, w: 56, y: 438, floors: 3 },
  { x: 1444, w: 74, y: 392, floors: 4 },
  { x: 1522, w: 78, y: 458, floors: 2 },
];

/** Stepped block with two setbacks — the classic 1920s zoning silhouette. */
const STEPPED_A = "M250 600 V302 H272 V256 H296 V228 H316 V256 H330 V302 H352 V600 Z";

/** Setback tower with a mast (Empire State-inspired proportions). */
const TOWER_MAST =
  "M470 600 V304 H492 V214 H506 V120 H544 V214 H558 V304 H580 V600 Z";

/** Art-deco stepped crown with a needle (Chrysler-inspired proportions). */
const TOWER_CROWN =
  "M700 600 V344 H714 V318 H726 V296 H740 V276 H752 V296 H758 V318 H764 V344 H770 V600 Z";

/** Tapered modern tower with a tall spire. */
const TOWER_TAPER = "M1000 600 V196 L1030 168 L1060 168 L1086 196 V600 Z";

/** Stepped ziggurat-style block. */
const STEPPED_B = "M1280 600 V344 H1300 V308 H1326 V286 H1352 V308 H1366 V344 H1380 V600 Z";

export default function Skyline({
  className,
  variant = "outline",
  strokeWidth = 1.4,
}: {
  className?: string;
  variant?: "outline" | "solid";
  strokeWidth?: number;
}) {
  const solid = variant === "solid";
  const shape = solid
    ? { fill: "currentColor", stroke: "none" }
    : {
        fill: "none",
        stroke: "currentColor",
        strokeWidth,
        strokeLinejoin: "round" as const,
      };

  return (
    <svg
      viewBox="0 0 1600 600"
      preserveAspectRatio="xMidYMax meet"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Landmark towers */}
      <path d={STEPPED_A} {...shape} />
      <path d={TOWER_MAST} {...shape} />
      <path d={TOWER_CROWN} {...shape} />
      <path d={TOWER_TAPER} {...shape} />
      <path d={STEPPED_B} {...shape} />

      {/* Masts and antennae */}
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={solid ? 3 : strokeWidth}
        strokeLinecap="round"
      >
        <path d="M525 120 V44" />
        <path d="M746 276 V156" />
        <path d="M1043 168 V78" />
        <path d="M948 330 V286" />
      </g>
      <circle cx="525" cy="96" r={solid ? 9 : 7} {...shape} />

      {/* Plain blocks */}
      {BLOCKS.map((b) => (
        <g key={b.x}>
          <path d={`M${b.x} 600 V${b.y} H${b.x + b.w} V600 Z`} {...shape} />
          {b.floors
            ? Array.from({ length: b.floors }, (_, i) => {
                const y = b.y + ((600 - b.y) / (b.floors! + 1)) * (i + 1);
                return (
                  <line
                    key={i}
                    x1={b.x + 7}
                    x2={b.x + b.w - 7}
                    y1={y}
                    y2={y}
                    stroke={solid ? "var(--color-paper)" : "currentColor"}
                    strokeWidth={solid ? 1.2 : strokeWidth * 0.55}
                    opacity={solid ? 0.35 : 0.5}
                  />
                );
              })
            : null}
          {b.tank ? (
            <g {...shape}>
              <path
                d={`M${b.x + b.w / 2 - 13} ${b.y - 8} L${b.x + b.w / 2 - 10} ${b.y - 26} H${b.x + b.w / 2 + 10} L${b.x + b.w / 2 + 13} ${b.y - 8} Z`}
              />
              <line
                x1={b.x + b.w / 2 - 9}
                x2={b.x + b.w / 2 - 9}
                y1={b.y - 8}
                y2={b.y}
                stroke="currentColor"
                strokeWidth={strokeWidth}
              />
              <line
                x1={b.x + b.w / 2 + 9}
                x2={b.x + b.w / 2 + 9}
                y1={b.y - 8}
                y2={b.y}
                stroke="currentColor"
                strokeWidth={strokeWidth}
              />
            </g>
          ) : null}
        </g>
      ))}
    </svg>
  );
}
