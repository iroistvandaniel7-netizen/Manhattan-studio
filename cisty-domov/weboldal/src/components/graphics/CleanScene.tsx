/**
 * The page's signature: a long shelf of cleaning things drawn from primitives
 * — a window with a squeegee crossing it, a spray bottle, a bucket and mop, a
 * plant, a stack of folded towels — with soap bubbles rising off them and
 * glints twinkling over the clean glass.
 *
 * Built from shapes rather than traced artwork, so it is crisp at any width
 * and weighs nothing. All motion is CSS, and all of it stops under reduced
 * motion. Decorative: the section around it carries the meaning.
 */

type Tone = "light" | "dark";

const FLOOR = 262;

/* x, start y, radius, delay (s), sideways drift (px) */
const BUBBLES = [
  [210, 200, 7, 0, 10],
  [250, 220, 4, 2.4, -8],
  [452, 150, 6, 1.1, 14],
  [470, 170, 3.5, 4.2, 6],
  [640, 190, 9, 0.6, -12],
  [668, 205, 5, 3.3, 10],
  [700, 196, 3.5, 5.6, -6],
  [880, 200, 5, 2, 12],
  [1010, 214, 6, 4.8, -10],
  [1060, 220, 4, 1.6, 8],
] as const;

const GLINTS = [
  [160, 120, 9, 0],
  [290, 92, 6, 1.2],
  [236, 196, 5, 2.3],
  [1100, 150, 8, 0.8],
] as const;

export default function CleanScene({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: Tone;
}) {
  const ink = tone === "light" ? "#0b2d5b" : "#ffffff";
  const accent = tone === "light" ? "#1b63d6" : "#bfe0ff";
  const glass = tone === "light" ? "#eaf3ff" : "rgba(255,255,255,0.12)";

  return (
    <svg
      viewBox="0 0 1200 300"
      preserveAspectRatio="xMidYMax meet"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* --- Window with a squeegee crossing the lower pane --------------- */}
      <g>
        <rect x="120" y="60" width="200" height="190" fill={glass} />
        <rect x="120" y="60" width="200" height="190" fill="none" stroke={ink} strokeWidth="8" />
        <path d="M220 60v190M120 155h200" stroke={ink} strokeWidth="6" />
        <rect x="108" y="248" width="224" height="10" fill={ink} />
        {/* Streak lines in the pane the squeegee has not reached. */}
        <path d="M232 178l26-14M246 200l40-22M262 226l40-22" stroke={accent} strokeWidth="3" strokeLinecap="round" opacity="0.5" />
        <g className="animate-wipe" style={{ transformBox: "fill-box" }}>
          <rect x="130" y="166" width="10" height="64" rx="3" fill={accent} />
          <rect x="140" y="194" width="34" height="8" rx="4" fill={ink} />
        </g>
      </g>

      {/* --- Spray bottle -------------------------------------------------- */}
      <g fill={accent}>
        <rect x="430" y="170" width="52" height="88" rx="10" />
        <rect x="444" y="150" width="24" height="22" />
        <path d="M440 132h44l8 10h-14v8h-34Z" fill={ink} />
        <path d="M456 150l-10 22" stroke={ink} strokeWidth="4" />
        <rect x="438" y="196" width="36" height="30" rx="4" fill={tone === "light" ? "#ffffff" : "#0b2d5b"} opacity="0.85" />
      </g>
      {/* Mist */}
      <g fill={accent} opacity="0.55">
        <circle cx="504" cy="130" r="3" />
        <circle cx="516" cy="124" r="2.4" />
        <circle cx="514" cy="138" r="2" />
        <circle cx="528" cy="132" r="2.6" />
      </g>

      {/* --- Bucket and mop ------------------------------------------------ */}
      <path d="M690 90L640 252" stroke={ink} strokeWidth="7" strokeLinecap="round" />
      <path d="M612 250h56l-6 10h-44Z" fill={ink} />
      <path d="M598 196h104l-12 64h-80Z" fill={accent} />
      <rect x="592" y="188" width="116" height="12" rx="4" fill={ink} />
      <path d="M612 190c0-30 76-30 76 0" fill="none" stroke={ink} strokeWidth="4" />
      {/* Foam on the water */}
      <g fill={tone === "light" ? "#ffffff" : "#bfe0ff"} stroke={accent} strokeWidth="2">
        <circle cx="622" cy="186" r="9" />
        <circle cx="640" cy="182" r="11" />
        <circle cx="664" cy="184" r="10" />
        <circle cx="684" cy="186" r="8" />
      </g>

      {/* --- Plant --------------------------------------------------------- */}
      <g>
        <path d="M850 214h60l-8 46h-44Z" fill={ink} />
        <g fill={accent}>
          <path d="M880 214c-4-34-30-50-44-52 2 22 18 44 44 52Z" />
          <path d="M880 214c2-40 24-62 42-66 0 28-16 54-42 66Z" />
          <path d="M880 214c-2-26 4-48 0-70-10 22-12 46 0 70Z" opacity="0.7" />
        </g>
      </g>

      {/* --- Folded towels and a sponge ------------------------------------ */}
      <g>
        <rect x="980" y="226" width="110" height="34" rx="8" fill={accent} />
        <rect x="988" y="196" width="94" height="32" rx="8" fill={ink} opacity={tone === "light" ? 0.85 : 0.9} />
        <rect x="996" y="170" width="78" height="28" rx="8" fill={accent} opacity="0.7" />
        <rect x="1110" y="236" width="56" height="24" rx="5" fill={accent} />
        <rect x="1110" y="236" width="56" height="9" rx="4" fill={ink} />
      </g>

      {/* The floor line everything stands on. */}
      <rect x="0" y={FLOOR - 2} width="1200" height="4" fill={ink} />
      <rect x="0" y={FLOOR + 2} width="1200" height="38" fill={ink} opacity="0.08" />

      {/* --- Bubbles ------------------------------------------------------- */}
      {BUBBLES.map(([x, y, r, delay, drift]) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r={r}
          fill="none"
          stroke={accent}
          strokeWidth={1.8}
          className="scene-bubble animate-rise"
          style={
            {
              animationDelay: `${delay}s`,
              transformBox: "fill-box",
              transformOrigin: "center",
              "--drift": `${drift}px`,
            } as React.CSSProperties
          }
        />
      ))}

      {/* --- Glints -------------------------------------------------------- */}
      {GLINTS.map(([x, y, s, delay]) => (
        <path
          key={`${x}-${y}`}
          d={`M${x} ${y - s}l${s * 0.24} ${s * 0.76} ${s * 0.76} ${s * 0.24}-${s * 0.76} ${s * 0.24}-${s * 0.24} ${s * 0.76}-${s * 0.24}-${s * 0.76}-${s * 0.76}-${s * 0.24} ${s * 0.76}-${s * 0.24}Z`}
          fill={tone === "light" ? accent : "#ffffff"}
          className="animate-twinkle"
          style={{ animationDelay: `${delay}s`, transformBox: "fill-box", transformOrigin: "center" }}
        />
      ))}
    </svg>
  );
}
