/**
 * Three paces, one destination.
 *
 * The page's argument is that the course formats differ in tempo rather than
 * in where they get you — intensive is steeper, normal is gentler, and all
 * three reach the same level. That is a shape, so it is drawn rather than
 * described again in a box with an icon in it.
 *
 * The three curves are told apart by dash pattern as well as by opacity, so
 * the chart still reads for anyone who cannot separate the three tints — and
 * in print, and at the size a phone renders it.
 *
 * Labels arrive as props: they are three of the page's own headings, and a
 * graphic with Hungarian baked into it would be a graphic the Slovak and
 * English pages cannot use.
 */

type Pace = { label: string; d: string; end: [number, number]; dash?: string; opacity: number };

/* All three start where the learner starts and finish at the same height —
   only the distance along the time axis differs. The end points are where the
   dots sit, so they are declared once rather than eyeballed twice. */
const PACES = (labels: readonly [string, string, string]): Pace[] => [
  {
    label: labels[0],
    d: "M40 182 C 92 176, 132 128, 168 60",
    end: [168, 60],
    opacity: 1,
  },
  {
    label: labels[1],
    d: "M40 182 C 118 179, 186 146, 248 60",
    end: [248, 60],
    dash: "7 5",
    opacity: 0.62,
  },
  {
    label: labels[2],
    d: "M40 182 C 152 182, 268 158, 352 60",
    end: [352, 60],
    dash: "2 6",
    opacity: 0.42,
  },
];

export default function PaceChart({
  labels,
  axis,
  className,
}: {
  /** Intensive, semi-intensive, normal — in that order. */
  labels: readonly [string, string, string];
  axis: { time: string; level: string };
  className?: string;
}) {
  const paces = PACES(labels);

  return (
    <figure className={className}>
      <svg
        viewBox="0 0 400 230"
        className="w-full"
        role="img"
        aria-label={`${labels[0]}, ${labels[1]}, ${labels[2]} — ${axis.level} / ${axis.time}`}
      >
        {/* The level everyone is heading for. Dashed, because it is a goal
            rather than a ceiling. */}
        <line
          x1="28"
          y1="60"
          x2="376"
          y2="60"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 5"
          opacity="0.28"
        />

        {/* The two axes, drawn as one open corner rather than a box: a closed
            frame would make this look like a measurement, and it is not one. */}
        <path
          d="M28 44 L28 194 L376 194"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          opacity="0.35"
        />

        {paces.map((pace) => (
          <g key={pace.label} opacity={pace.opacity}>
            <path
              d={pace.d}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeDasharray={pace.dash}
            />
            <circle cx={pace.end[0]} cy={pace.end[1]} r="5" fill="currentColor" />
          </g>
        ))}
      </svg>

      {/* The key, in HTML rather than SVG text: three languages set three
          different widths, and HTML wraps where SVG would overlap. */}
      <figcaption className="mt-5 flex flex-col gap-2">
        {paces.map((pace) => (
          <span key={pace.label} className="flex items-center gap-3 text-sm">
            <svg
              aria-hidden="true"
              viewBox="0 0 34 8"
              className="h-2 w-[34px] shrink-0"
              style={{ opacity: pace.opacity }}
            >
              <line
                x1="1"
                y1="4"
                x2="33"
                y2="4"
                stroke="currentColor"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeDasharray={pace.dash}
              />
            </svg>
            {pace.label}
          </span>
        ))}
        <span className="mt-2 text-xs uppercase tracking-[0.1em] opacity-60">
          {axis.level} / {axis.time}
        </span>
      </figcaption>
    </figure>
  );
}
