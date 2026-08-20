/**
 * Central Park at golden hour, hand-built as three stacked SVG layers.
 *
 * The classic view: the lake in the foreground, the Midtown skyline rising
 * behind the tree line. Each layer is a full-bleed SVG on the same viewBox,
 * so the Hero can parallax them at different speeds for depth.
 *
 * Composition note: the layers are sliced to cover, which crops hard from the
 * sides on narrow screens. Everything that carries the picture — the sun, the
 * landmark towers, tree clusters and the boats — is therefore kept inside the
 * central band (roughly x 560–1050), so the scene still reads on a phone.
 *
 * Motion lives inside the SVGs and every animated class is paired with
 * `motion-reduce:animate-none`. All three layers are decorative; the Hero
 * carries the alternative text.
 */

const VIEW_BOX = "0 0 1600 900";

/** Where the far shore meets the water. */
const HORIZON = 604;

/* ------------------------------------------------------------------ *
 * Layer 1 — sky, sun, clouds, birds
 * ------------------------------------------------------------------ */

export function ParkSky({ className }: { className?: string }) {
  return (
    <svg
      viewBox={VIEW_BOX}
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="cp-sky" x1="0" y1="0" x2="0.12" y2="1">
          <stop offset="0%" stopColor="#4E9CB8" />
          <stop offset="26%" stopColor="#89BEC4" />
          <stop offset="48%" stopColor="#D8C79C" />
          <stop offset="66%" stopColor="#F3C07E" />
          <stop offset="84%" stopColor="#F2A365" />
          <stop offset="100%" stopColor="#E8825C" />
        </linearGradient>

        <radialGradient id="cp-sunglow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FFE7B4" stopOpacity="0.9" />
          <stop offset="42%" stopColor="#FFC978" stopOpacity="0.38" />
          <stop offset="100%" stopColor="#FFB25C" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="cp-sundisc" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FFF8E4" />
          <stop offset="68%" stopColor="#FFDE9B" />
          <stop offset="100%" stopColor="#FFC873" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="1600" height={HORIZON + 30} fill="url(#cp-sky)" />

      {/* Sun, kept just right of centre so it survives the mobile crop */}
      <g>
        <circle
          cx="985"
          cy="452"
          r="248"
          fill="url(#cp-sunglow)"
          className="origin-[985px_452px] animate-sun-glow motion-reduce:animate-none"
        />
        <circle cx="985" cy="452" r="54" fill="url(#cp-sundisc)" />
      </g>

      {/* Rays fanning off the sun */}
      <g opacity="0.13" fill="#FFEDCB">
        {[-34, -17, 0, 17, 34].map((angle) => (
          <rect
            key={angle}
            x="977"
            y="196"
            width="16"
            height="256"
            transform={`rotate(${angle} 985 452)`}
          />
        ))}
      </g>

      {/* Cloud bands, each holding two identical runs so the wrap is seamless */}
      <g className="animate-cloud-slow motion-reduce:animate-none" opacity="0.62">
        <CloudRun y={150} scale={1} />
      </g>
      <g className="animate-cloud-fast motion-reduce:animate-none" opacity="0.4">
        <CloudRun y={272} scale={0.66} tint="#FBDCB4" />
      </g>

      {/* A small skein of birds crossing the frame */}
      <g className="animate-bird motion-reduce:animate-none">
        <g stroke="#33403D" strokeWidth="2.6" fill="none" strokeLinecap="round" opacity="0.75">
          <path d="M700 246c7-8 14-8 21 0" />
          <path d="M729 258c5-6 11-6 16 0" />
          <path d="M678 268c4-5 9-5 13 0" />
        </g>
      </g>
    </svg>
  );
}

/** A repeating run of soft, flat-bottomed clouds. */
function CloudRun({
  y,
  scale,
  tint = "#FFF6E6",
}: {
  y: number;
  scale: number;
  tint?: string;
}) {
  const cloud = (x: number, s: number, key: string) => (
    <g key={key} transform={`translate(${x} ${y}) scale(${s * scale})`} fill={tint}>
      <ellipse cx="0" cy="0" rx="92" ry="21" />
      <ellipse cx="-46" cy="7" rx="56" ry="16" />
      <ellipse cx="50" cy="8" rx="64" ry="17" />
      <ellipse cx="4" cy="-16" rx="48" ry="20" />
    </g>
  );

  return (
    <g>
      {[
        [-240, 1, "a"],
        [180, 0.74, "b"],
        [560, 1.1, "c"],
        [940, 0.62, "d"],
        [1300, 0.9, "e"],
      ].flatMap(([x, s, k]) => [
        cloud(x as number, s as number, k as string),
        cloud((x as number) - 1600, s as number, `${k}2`),
      ])}
    </g>
  );
}

/* ------------------------------------------------------------------ *
 * Layer 2 — the Midtown skyline behind the park
 * ------------------------------------------------------------------ */

type Tower = { x: number; w: number; y: number; lit?: boolean };

/*
 * Central Park South. Narrow, closely-packed towers with varied heights —
 * wide blocks read as clipart, so nothing here is broader than 54 units.
 */
const TOWERS: Tower[] = [
  { x: 20, w: 34, y: 470 },
  { x: 58, w: 26, y: 502, lit: true },
  { x: 88, w: 44, y: 436, lit: true },
  { x: 136, w: 30, y: 494 },
  { x: 170, w: 38, y: 458, lit: true },
  { x: 212, w: 24, y: 512 },
  { x: 240, w: 46, y: 424, lit: true },
  { x: 290, w: 28, y: 488 },
  { x: 322, w: 36, y: 452, lit: true },
  { x: 362, w: 30, y: 500 },
  { x: 430, w: 40, y: 440, lit: true },
  { x: 474, w: 26, y: 496 },
  { x: 504, w: 34, y: 462, lit: true },
  { x: 542, w: 30, y: 430, lit: true },
  { x: 576, w: 24, y: 498 },
  { x: 646, w: 38, y: 446, lit: true },
  { x: 688, w: 28, y: 486 },
  { x: 720, w: 44, y: 412, lit: true },
  { x: 768, w: 26, y: 492 },
  { x: 834, w: 36, y: 450, lit: true },
  { x: 874, w: 30, y: 484 },
  { x: 908, w: 42, y: 428, lit: true },
  { x: 1024, w: 32, y: 460, lit: true },
  { x: 1060, w: 44, y: 418, lit: true },
  { x: 1108, w: 26, y: 496 },
  { x: 1138, w: 38, y: 448, lit: true },
  { x: 1180, w: 30, y: 490 },
  { x: 1240, w: 46, y: 432, lit: true },
  { x: 1290, w: 28, y: 492 },
  { x: 1322, w: 36, y: 456, lit: true },
  { x: 1362, w: 30, y: 486 },
  { x: 1420, w: 42, y: 438, lit: true },
  { x: 1466, w: 26, y: 500 },
  { x: 1496, w: 38, y: 464, lit: true },
  { x: 1538, w: 44, y: 494 },
];

export function ParkSkyline({ className }: { className?: string }) {
  return (
    <svg
      viewBox={VIEW_BOX}
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="cp-tower" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#33555F" />
          <stop offset="70%" stopColor="#22414C" />
          <stop offset="100%" stopColor="#1A3540" />
        </linearGradient>
        <linearGradient id="cp-tower-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7E9BA0" />
          <stop offset="100%" stopColor="#587A83" />
        </linearGradient>
        {/* Warm haze settling along the horizon, for depth */}
        <linearGradient id="cp-haze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F6C68A" stopOpacity="0" />
          <stop offset="100%" stopColor="#F3A971" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      {/* A hazier rank set further back */}
      <g fill="url(#cp-tower-far)" opacity="0.45">
        {[
          [40, 30, 498],
          [124, 24, 512],
          [286, 34, 486],
          [400, 26, 504],
          [600, 30, 480],
          [792, 34, 494],
          [960, 26, 500],
          [1160, 32, 488],
          [1350, 28, 506],
          [1500, 30, 492],
        ].map(([x, w, y]) => (
          <rect key={`f${x}`} x={x} y={y} width={w} height={HORIZON - y + 8} />
        ))}
      </g>

      <g fill="url(#cp-tower)">
        {/* Setback tower with a mast */}
        <path d="M604 612V430h11v-58h8v-44h13v44h8v58h11v182Z" />
        <rect x="620" y="292" width="4" height="36" />
        {/* Tapered spire, near the centre of the frame */}
        <path d="M792 612V372l21-22 21 22v240Z" />
        <rect x="811" y="300" width="4" height="52" />
        {/* Stepped crown */}
        <path d="M962 612V446h13v-26h9v-20h9v20h9v26h13v166Z" />

        {TOWERS.map((t) => (
          <rect key={t.x} x={t.x} y={t.y} width={t.w} height={HORIZON - t.y + 8} />
        ))}
      </g>

      {/* Lit windows: narrow slits rather than big squares */}
      <g fill="#FFD98A">
        {TOWERS.filter((t) => t.lit).flatMap((t, ti) => {
          const cols = Math.max(2, Math.floor(t.w / 12));
          const rows = Math.floor((HORIZON - t.y) / 20);
          return Array.from({ length: rows }, (_, row) =>
            Array.from({ length: cols }, (_, col) => {
              const wx = t.x + 6 + col * ((t.w - 12) / cols);
              const wy = t.y + 14 + row * 20;
              if (wy > HORIZON - 16) return null;
              // Deterministic scatter: identical on server and client.
              const on = (ti * 7 + row * 5 + col * 3) % 4 !== 0;
              const twinkles = on && (ti + row * 2 + col) % 9 === 0;
              return (
                <rect
                  key={`${t.x}-${row}-${col}`}
                  x={wx}
                  y={wy}
                  width="3"
                  height="7"
                  opacity={on ? 0.8 : 0.14}
                  className={twinkles ? "animate-twinkle motion-reduce:animate-none" : undefined}
                  style={twinkles ? { animationDelay: `${((ti + col) % 7) * 0.7}s` } : undefined}
                />
              );
            }),
          ).flat();
        })}
      </g>

      {/* Haze pooling at the base of the towers */}
      <rect x="0" y={HORIZON - 150} width="1600" height="150" fill="url(#cp-haze)" />
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * Layer 3 — tree line, lake and foreground bank
 * ------------------------------------------------------------------ */

export function ParkWater({ className }: { className?: string }) {
  return (
    <svg
      viewBox={VIEW_BOX}
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="cp-lake" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EFBE84" />
          <stop offset="14%" stopColor="#A9B49C" />
          <stop offset="42%" stopColor="#3F7C8B" />
          <stop offset="100%" stopColor="#14384A" />
        </linearGradient>
        <linearGradient id="cp-canopy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2C8E64" />
          <stop offset="55%" stopColor="#166B4D" />
          <stop offset="100%" stopColor="#0B3626" />
        </linearGradient>
        <linearGradient id="cp-bank" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#14563E" />
          <stop offset="100%" stopColor="#062018" />
        </linearGradient>
      </defs>

      {/* Water */}
      <rect x="0" y={HORIZON} width="1600" height={900 - HORIZON} fill="url(#cp-lake)" />

      {/* The sun's column on the water, directly below the disc */}
      <rect x="944" y={HORIZON} width="82" height="230" fill="#FFD9A0" opacity="0.26" />

      {/* Skyline reflection, inverted and softened */}
      <g opacity="0.16" fill="#0C2B34" transform={`translate(0 ${HORIZON * 2}) scale(1 -1)`}>
        {TOWERS.map((t) => (
          <rect key={`r${t.x}`} x={t.x} y={t.y + 40} width={t.w} height={HORIZON - t.y - 40} />
        ))}
      </g>

      {/* Shimmer bands */}
      <g fill="#FFFFFF">
        {[
          [630, 220, 880, 3],
          [652, 110, 430, 2],
          [676, 280, 1020, 3],
          [706, 150, 640, 2],
          [740, 240, 930, 4],
          [778, 170, 520, 3],
        ].map(([y, w, x, h], i) => (
          <rect
            key={y}
            x={x}
            y={y}
            width={w}
            height={h}
            rx={(h as number) / 2}
            className="animate-shimmer motion-reduce:animate-none"
            style={{ animationDelay: `${i * 0.85}s` }}
            opacity="0.3"
          />
        ))}
      </g>

      {/* Far shore */}
      <rect x="0" y={HORIZON - 10} width="1600" height="14" fill="#10553C" />

      {/* Tree line along the far shore, clustered so the mobile crop keeps some */}
      <g fill="url(#cp-canopy)">
        {[
          [56, 0.82],
          [140, 0.6],
          [396, 0.72],
          [470, 0.55],
          [566, 0.88],
          [640, 0.6],
          [880, 0.7],
          [946, 0.52],
          [1042, 0.9],
          [1120, 0.62],
          [1394, 0.75],
          [1476, 0.58],
          [1556, 0.85],
        ].map(([x, s], i) => (
          <Canopy key={x} x={x} y={HORIZON - 2} scale={s} variant={i} />
        ))}
      </g>

      {/* Two rowing boats on the lake */}
      <g fill="#0F1D1A" opacity="0.5">
        <path d="M742 706c12-6 38-6 50 0-7 8-43 8-50 0Z" />
        <rect x="765" y="695" width="2.5" height="11" />
        <path d="M962 748c14-7 44-7 58 0-8 9-50 9-58 0Z" />
        <rect x="989" y="736" width="2.5" height="12" />
      </g>

      {/* Foreground bank, cropped by the bottom of the frame */}
      <path
        d="M0 828c170-30 306-16 452 6 164 25 312 37 474 20 168-18 322-42 484-28 60 5 112 14 190 26V900H0Z"
        fill="url(#cp-bank)"
      />

      {/* Foreground foliage, swaying in the wind */}
      <g
        fill="#0A3527"
        className="origin-bottom animate-sway motion-reduce:animate-none"
      >
        <Canopy x={96} y={896} scale={2.1} variant={0} />
        <Canopy x={612} y={900} scale={1.5} variant={2} />
        <Canopy x={1010} y={898} scale={1.7} variant={1} />
        <Canopy x={1512} y={894} scale={2} variant={2} />
      </g>
    </svg>
  );
}

/**
 * Tree canopies. Stacked ellipses read as clipart broccoli, so these are
 * irregular lobed outlines instead. Three silhouettes, picked by index, keep
 * a row of trees from looking stamped.
 */
const CANOPY_SHAPES = [
  // Broad, low deciduous
  "M0-14c-13 2-25-4-27-15-2-12 6-21 15-24 1-13 12-22 24-21 9-12 27-13 37-3 13-2 24 8 24 20 8 5 12 15 8 24-4 10-16 15-26 13-7 8-19 10-28 5-8 5-19 5-27 1Z",
  // Taller, narrower
  "M0-18c-11 1-21-6-22-16-1-11 6-19 15-21 2-14 14-24 27-22 12 1 21 11 22 23 8 4 12 14 9 22-4 10-15 15-25 13-7 7-18 8-26 1Z",
  // Wide and spreading
  "M0-10c-16 3-31-4-34-17-3-14 7-25 20-27 3-12 15-20 27-18 11-13 31-12 40 2 14 0 24 12 22 25 9 6 12 18 6 27-7 10-21 12-31 7-9 8-23 9-33 3-6 3-12 2-17-2Z",
];

function Canopy({
  x,
  y,
  scale,
  variant = 0,
}: {
  x: number;
  y: number;
  scale: number;
  /** Picks the silhouette and mirrors alternate trees. */
  variant?: number;
}) {
  const shape = CANOPY_SHAPES[variant % CANOPY_SHAPES.length];
  const flip = variant % 2 === 1 ? -1 : 1;

  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x="-2.5" y="-30" width="5" height="32" />
      <g transform={`translate(0 -34) scale(${flip} 1)`}>
        <path d={shape} />
      </g>
    </g>
  );
}
