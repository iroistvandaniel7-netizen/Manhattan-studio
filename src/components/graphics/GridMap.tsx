/**
 * Abstract Manhattan street grid: numbered avenues running up the island,
 * cross-streets, Broadway cutting across on the diagonal, and the rectangle
 * of Central Park. Rotated slightly, as the real grid is. Decorative only.
 */
export default function GridMap({
  className,
  strokeWidth = 1,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  const avenues = Array.from({ length: 11 }, (_, i) => 60 + i * 78);
  const streets = Array.from({ length: 15 }, (_, i) => 40 + i * 62);

  return (
    <svg
      viewBox="0 0 900 900"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
    >
      <g transform="rotate(-29 450 450)">
        {/* Avenues */}
        {avenues.map((x) => (
          <line key={`a${x}`} x1={x} y1="-120" x2={x} y2="1020" opacity="0.7" />
        ))}
        {/* Cross-streets, thinner and denser, as on the real grid */}
        {streets.map((y) => (
          <line
            key={`s${y}`}
            x1="-120"
            y1={y}
            x2="1020"
            y2={y}
            opacity="0.4"
            strokeWidth={strokeWidth * 0.7}
          />
        ))}
        {/* Broadway: the one street that refuses the grid */}
        <path
          d="M110 -80 L300 300 L360 520 L420 760 L470 1000"
          strokeWidth={strokeWidth * 2.2}
          opacity="0.95"
        />
        {/* Central Park */}
        <rect
          x="216"
          y="164"
          width="156"
          height="372"
          strokeWidth={strokeWidth * 2}
          opacity="0.95"
        />
        {/* The reservoir inside it */}
        <ellipse
          cx="294"
          cy="300"
          rx="46"
          ry="62"
          strokeWidth={strokeWidth * 1.2}
          opacity="0.6"
        />
      </g>
    </svg>
  );
}
