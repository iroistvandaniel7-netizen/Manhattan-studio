/**
 * The page's signature: a long desk of people studying, drawn as flat
 * geometric figures, with speech bubbles surfacing greetings in the seven
 * languages the studio teaches.
 *
 * It is built from primitives rather than traced artwork, so it stays crisp
 * at any width and weighs nothing. Motion is all CSS: each figure breathes on
 * its own delay, one head nods over a page, one hand tracks a line of
 * writing, and the bubbles share a single 12s cycle offset per bubble so one
 * is nearly always up and they never pop in unison.
 *
 * Decorative — the section around it carries the meaning, so the whole scene
 * is aria-hidden.
 */

type Tone = "light" | "dark";

const GREETINGS = [
  { text: "Hello", x: 96, y: 74 },
  { text: "Hallo", x: 336, y: 44 },
  { text: "Привет", x: 566, y: 82 },
  { text: "Hola", x: 812, y: 40 },
  { text: "Ciao", x: 1010, y: 78 },
  { text: "Ahoj", x: 214, y: 116 },
  { text: "Szia", x: 700, y: 118 },
] as const;

/** Seated figures along the desk. */
const FIGURES = [
  { x: 150, hair: 0, action: "write" as const },
  { x: 388, hair: 1, action: "read" as const },
  { x: 618, hair: 2, action: "nod" as const },
  { x: 852, hair: 3, action: "write" as const },
  { x: 1066, hair: 4, action: "read" as const },
];

const DESK_Y = 252;

export default function StudyScene({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: Tone;
}) {
  const ink = tone === "light" ? "#0b0710" : "#ffffff";
  const accent = tone === "light" ? "#0039a6" : "#9db8ee";
  const bubbleFill = tone === "light" ? "#ffffff" : "#0b0710";
  const bubbleStroke = tone === "light" ? "#0039a6" : "#9db8ee";
  const bubbleText = tone === "light" ? "#0039a6" : "#ffffff";

  return (
    <svg
      viewBox="0 0 1200 300"
      preserveAspectRatio="xMidYMax meet"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {FIGURES.map((f, i) => (
        <Figure
          key={f.x}
          x={f.x}
          hair={f.hair}
          action={f.action}
          fill={i % 2 === 0 ? ink : accent}
          delay={i * 0.55}
        />
      ))}

      {/* The desk, drawn over the figures so they sit behind it */}
      <rect x="0" y={DESK_Y} width="1200" height="9" fill={ink} />
      <rect x="0" y={DESK_Y + 9} width="1200" height="42" fill={ink} opacity="0.14" />

      {/* Things on the desk */}
      <g fill={accent}>
        {/* Open laptop */}
        <path d={`M300 ${DESK_Y} l16-34h44l16 34Z`} opacity="0.9" />
        {/* Stack of books */}
        <rect x="700" y={DESK_Y - 10} width="52" height="10" />
        <rect x="706" y={DESK_Y - 19} width="40" height="9" opacity="0.7" />
        {/* Cup */}
        <rect x="1004" y={DESK_Y - 16} width="18" height="16" rx="2" />
      </g>

      {/* Speech bubbles */}
      {GREETINGS.map((g, i) => (
        <Bubble
          key={g.text}
          x={g.x}
          y={g.y}
          text={g.text}
          delay={(i * 12) / GREETINGS.length}
          fill={bubbleFill}
          stroke={bubbleStroke}
          color={bubbleText}
        />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */

function Figure({
  x,
  hair,
  action,
  fill,
  delay,
}: {
  x: number;
  hair: number;
  action: "write" | "read" | "nod";
  fill: string;
  delay: number;
}) {
  const headY = 152;
  const shoulder = 190;

  return (
    <g
      className="animate-bob motion-reduce:animate-none"
      style={{ animationDelay: `${delay}s` }}
      fill={fill}
    >
      {/* Torso */}
      <path
        d={`M${x - 40} ${DESK_Y} C${x - 40} ${shoulder + 14} ${x - 24} ${shoulder} ${x} ${shoulder} C${x + 24} ${shoulder} ${x + 40} ${shoulder + 14} ${x + 40} ${DESK_Y} Z`}
      />

      {/* Head, with its own nod for the reading figures */}
      <g
        className={
          action === "nod" || action === "read"
            ? "animate-nod motion-reduce:animate-none"
            : undefined
        }
        style={{
          transformOrigin: `${x}px ${headY + 26}px`,
          animationDelay: `${delay + 0.4}s`,
        }}
      >
        <rect x={x - 7} y={headY + 18} width="14" height="16" />
        <circle cx={x} cy={headY} r="26" />
        <Hair x={x} y={headY} variant={hair} />
      </g>

      {/* Arm reaching to the desk; the writing figures track a line */}
      <g
        className={action === "write" ? "animate-write motion-reduce:animate-none" : undefined}
        style={{ animationDelay: `${delay + 0.2}s` }}
      >
        <path
          d={`M${x + 14} ${shoulder + 8} q28 12 34 46 l-16 6 q-8-26-26-38 Z`}
        />
      </g>
    </g>
  );
}

/** Five silhouettes, so a row of figures never looks stamped from one shape. */
function Hair({ x, y, variant }: { x: number; y: number; variant: number }) {
  switch (variant % 5) {
    case 0: // cropped
      return <path d={`M${x - 26} ${y - 4} a26 26 0 0 1 52 0 q-26-14-52 0Z`} />;
    case 1: // bun
      return (
        <>
          <circle cx={x} cy={y - 32} r="11" />
          <path d={`M${x - 26} ${y - 2} a26 26 0 0 1 52 0 q-26-16-52 0Z`} />
        </>
      );
    case 2: // long
      return (
        <path
          d={`M${x - 27} ${y + 20} q-6-46 27-46 q33 0 27 46 q-9-30-27-30 q-18 0-27 30Z`}
        />
      );
    case 3: // cap
      return (
        <path d={`M${x - 27} ${y - 6} a27 27 0 0 1 54 0 l14 3 v7 l-68-2Z`} />
      );
    default: // curls
      return (
        <>
          <circle cx={x - 16} cy={y - 18} r="10" />
          <circle cx={x} cy={y - 25} r="11" />
          <circle cx={x + 16} cy={y - 18} r="10" />
        </>
      );
  }
}

function Bubble({
  x,
  y,
  text,
  delay,
  fill,
  stroke,
  color,
}: {
  x: number;
  y: number;
  text: string;
  delay: number;
  fill: string;
  stroke: string;
  color: string;
}) {
  // Roughly sized to the word so the bubble hugs its text at any length.
  const w = Math.max(74, text.length * 15 + 30);
  const h = 44;

  return (
    <g
      className="study-bubble animate-bubble motion-reduce:animate-none"
      style={{ animationDelay: `${delay}s`, transformOrigin: `${x + w / 2}px ${y + h}px` }}
    >
      <path
        d={`M${x} ${y + 10} a10 10 0 0 1 10-10 h${w - 20} a10 10 0 0 1 10 10 v${h - 20} a10 10 0 0 1 -10 10 h${-(w - 46)} l-12 14 v-14 h-4 a10 10 0 0 1 -10-10 Z`}
        fill={fill}
        stroke={stroke}
        strokeWidth="2.5"
      />
      <text
        x={x + w / 2}
        y={y + h / 2 + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={color}
        className="font-display text-[19px] font-extrabold"
      >
        {text}
      </text>
    </g>
  );
}
