/**
 * Landmarks drifting behind the page.
 *
 * The studio's subject is places you can reach by learning the language, so the
 * background carries a few of them: the Elizabeth Tower, Tower Bridge, the
 * Empire State Building, the Statue of Liberty, and a stretch of Manhattan.
 *
 * They are drawn as flat silhouettes and then blurred, which is why they are
 * blocky: at four per cent opacity behind a two-pixel blur, nothing survives
 * except the outline. What tells them apart is the shape alone — a square
 * tower under a spire, a stepped ziggurat with a mast, a figure with one arm
 * raised — so each is drawn for that outline and nothing else. Detail here
 * would be work the reader never sees.
 *
 * Everything about this layer is subordinate: it never takes a pointer, it is
 * hidden from assistive technology, and it sits behind the section's own
 * content. If it ever competes with a word on the page it has failed.
 */

type Landmark = {
  key: string;
  /** `viewBox` and the path that fills it. */
  box: string;
  path: string;
  /**
   * `nonzero` unless a shape needs a hole punched in it.
   *
   * This is not a detail. Under `evenodd` any two overlapping subpaths cancel
   * where they cross, so the statue's arm — drawn to overlap its shoulder, as
   * an arm must — was subtracted from the body and floated free beside it.
   * Only Big Ben wants the rule, and only for its clock face.
   */
  rule?: "nonzero" | "evenodd";
};

/*
 * One path each, drawn on its own grid rather than a shared one — a tower is
 * tall and a bridge is wide, and forcing both into one viewBox would mean
 * padding half of every drawing with emptiness that still has to be positioned.
 */
const BIG_BEN: Landmark = {
  key: "big-ben",
  box: "0 0 100 300",
  rule: "evenodd",
  path:
    // Spire, belfry, clock stage, shaft, base.
    "M50 0 L58 34 L58 46 L66 46 L66 62 L70 62 L70 78 L74 78 L74 300 L26 300 " +
    "L26 78 L30 78 L30 62 L34 62 L34 46 L42 46 L42 34 Z " +
    // The clock face, cut out so the tower reads as Big Ben and not a chimney.
    "M50 96 m-13 0 a13 13 0 1 0 26 0 a13 13 0 1 0 -26 0 Z",
};

const EMPIRE_STATE: Landmark = {
  key: "empire-state",
  box: "0 0 120 300",
  path:
    // Mast, crown, shaft, then two setbacks down to a wide base.
    "M60 0 L63 58 L69 58 L69 74 L74 74 L74 96 L80 96 L80 190 L92 190 L92 232 " +
    "L104 232 L104 300 L16 300 L16 232 L28 232 L28 190 L40 190 L40 96 L46 96 " +
    "L46 74 L51 74 L51 58 L57 58 Z",
};

const LIBERTY: Landmark = {
  key: "liberty",
  box: "0 0 130 300",
  path:
    /*
     * Drawn fat throughout. A first attempt used a hairline arm and delicate
     * crown, and at six per cent behind a blur both dissolved — what was left
     * read as a bottle. The raised arm, the torch and the spikes are what make
     * this the Statue of Liberty rather than a figure, so they are the parts
     * that have to survive the blur.
     */
    // Robe.
    "M38 66 L70 66 L82 132 L94 192 L18 192 L30 130 Z " +
    // Head.
    "M46 44 L64 44 L64 70 L46 70 Z " +
    // Crown.
    "M40 46 L44 26 L49 40 L54 20 L59 40 L64 26 L68 46 Z " +
    // Arm, overlapping the shoulder it grows out of.
    "M62 84 L76 68 L104 34 L116 44 L86 82 L72 96 Z " +
    // Torch cup and flame.
    "M96 24 L120 24 L115 40 L100 40 Z M108 0 L119 18 L109 31 L98 18 Z " +
    // Pedestal.
    "M26 192 L86 192 L90 218 L22 218 Z M18 218 L94 218 L94 300 L18 300 Z",
};

const TOWER_BRIDGE: Landmark = {
  key: "tower-bridge",
  box: "0 0 300 160",
  path:
    // Left tower.
    "M78 22 L86 40 L86 52 L92 52 L92 128 L64 128 L64 52 L70 52 L70 40 Z " +
    // Right tower.
    "M222 22 L230 40 L230 52 L236 52 L236 128 L208 128 L208 52 L214 52 L214 40 Z " +
    // High walkway between them.
    "M92 56 L208 56 L208 70 L92 70 Z " +
    // Roadway and the piers it runs to.
    "M0 118 L64 118 L64 132 L0 132 Z M236 118 L300 118 L300 132 L236 132 Z " +
    "M92 118 L208 118 L208 132 L92 132 Z " +
    "M56 128 L100 128 L100 160 L56 160 Z M200 128 L244 128 L244 160 L200 160 Z",
};

const MANHATTAN: Landmark = {
  key: "manhattan",
  box: "0 0 320 140",
  path:
    // A stretch of skyline: a run of towers of different heights, one of them
    // spired, so the block reads as a city rather than as a bar chart.
    "M0 140 L0 96 L18 96 L18 74 L34 74 L34 96 L48 96 L48 58 L56 58 L58 40 " +
    "L60 58 L68 58 L68 96 L84 96 L84 66 L104 66 L104 92 L120 92 L120 44 " +
    "L128 44 L130 22 L132 44 L140 44 L140 92 L158 92 L158 70 L176 70 L176 96 " +
    "L192 96 L192 52 L212 52 L212 84 L228 84 L228 62 L246 62 L246 96 L262 96 " +
    "L262 34 L268 34 L270 14 L272 34 L278 34 L278 96 L296 96 L296 78 L320 78 " +
    "L320 140 Z",
};

/**
 * Where each landmark sits, how big, and how long its drift takes.
 *
 * Positions are percentages so they hold at any width, and they are spread to
 * opposite corners: two silhouettes overlapping at four per cent opacity make
 * one unreadable smudge at eight, which is the only way this layer can become
 * visible enough to notice.
 *
 * The periods are all different and none is a multiple of another, so the set
 * never falls into step and never repeats as a group.
 */
type Placement = {
  landmark: Landmark;
  /** Percentages of the layer. */
  left: string;
  top: string;
  /** Height as a share of the layer, capped in px so it cannot swamp a phone. */
  height: string;
  seconds: number;
  delay: number;
  flip?: boolean;
};

const SCENES: Placement[][] = [
  [
    { landmark: BIG_BEN, left: "6%", top: "8%", height: "min(58%, 20rem)", seconds: 41, delay: 0 },
    {
      landmark: MANHATTAN,
      left: "52%",
      top: "56%",
      height: "min(30%, 9rem)",
      seconds: 67,
      delay: -12,
    },
  ],
  [
    {
      landmark: EMPIRE_STATE,
      left: "72%",
      top: "6%",
      height: "min(64%, 22rem)",
      seconds: 53,
      delay: -7,
    },
    {
      landmark: TOWER_BRIDGE,
      left: "2%",
      top: "58%",
      height: "min(26%, 8rem)",
      seconds: 73,
      delay: -21,
    },
  ],
  [
    { landmark: LIBERTY, left: "8%", top: "10%", height: "min(62%, 21rem)", seconds: 59, delay: -3 },
    {
      landmark: MANHATTAN,
      left: "46%",
      top: "62%",
      height: "min(28%, 8.5rem)",
      seconds: 47,
      delay: -18,
      flip: true,
    },
  ],
  [
    {
      landmark: TOWER_BRIDGE,
      left: "54%",
      top: "12%",
      height: "min(30%, 9rem)",
      seconds: 61,
      delay: -9,
    },
    {
      landmark: EMPIRE_STATE,
      left: "10%",
      top: "34%",
      height: "min(56%, 19rem)",
      seconds: 43,
      delay: -25,
    },
  ],
];

export default function Landmarks({
  /** Which arrangement to use. Sections pass their own so no two match. */
  scene = 0,
  tone = "light",
  className = "",
}: {
  scene?: number;
  /** `light` = a light ground, so the silhouettes are ink. */
  tone?: "light" | "dark";
  className?: string;
}) {
  const placements = SCENES[scene % SCENES.length];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {placements.map((placement) => (
        <div
          key={`${placement.landmark.key}-${placement.left}`}
          className="animate-landmark absolute motion-reduce:animate-none"
          style={{
            left: placement.left,
            top: placement.top,
            height: placement.height,
            animationDuration: `${placement.seconds}s`,
            animationDelay: `${placement.delay}s`,
            /*
             * Its own layer, so the blur below is rasterised once and the
             * animation only moves the result. Without this the browser
             * re-blurs a large shape on every frame, which is expensive for
             * something nobody is supposed to look at.
             */
            willChange: "transform",
          }}
        >
          <svg
            viewBox={placement.landmark.box}
            className={`h-full w-auto blur-[2px] ${
              tone === "dark" ? "text-white/6" : "text-ink/6"
            }`}
            style={placement.flip ? { transform: "scaleX(-1)" } : undefined}
            focusable="false"
          >
            <path
              fillRule={placement.landmark.rule ?? "nonzero"}
              fill="currentColor"
              d={placement.landmark.path}
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
