/**
 * Brooklyn Bridge line-art: two gothic-arched towers, a main catenary and the
 * fan of suspender cables. Decorative only.
 */
export default function BridgeLines({
  className,
  strokeWidth = 1.3,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  const deckY = 300;

  /**
   * Height of the main cable at x. This is the same parabola the `Q` command
   * below traces, so the suspenders meet the cable exactly.
   */
  const cableY = (x: number) => {
    const t = (x - 500) / 350; // -1 at the left tower, +1 at the right tower
    return 262 - (1 - t * t) * 122; // 140 at mid-span, 262 at the towers
  };

  // Suspender cables hang from the catenary down to the deck.
  const cables: number[] = [];
  for (let x = 175; x <= 825; x += 25) cables.push(x);

  return (
    <svg
      viewBox="0 0 1000 420"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Deck */}
      <line x1="0" y1={deckY} x2="1000" y2={deckY} />
      <line x1="0" y1={deckY + 9} x2="1000" y2={deckY + 9} opacity="0.55" />

      {/* Towers with paired gothic arches */}
      {[150, 850].map((tx) => (
        <g key={tx}>
          <path d={`M${tx - 34} ${deckY} V150 H${tx + 34} V${deckY}`} />
          <path
            d={`M${tx - 24} ${deckY} V224 A12 12 0 0 1 ${tx - 4} 224 V${deckY}`}
          />
          <path
            d={`M${tx + 4} ${deckY} V224 A12 12 0 0 1 ${tx + 24} 224 V${deckY}`}
          />
          <line x1={tx - 34} y1="186" x2={tx + 34} y2="186" opacity="0.6" />
          {/* Pier below the deck */}
          <path d={`M${tx - 30} ${deckY + 9} V400 H${tx + 30} V${deckY + 9}`} opacity="0.5" />
        </g>
      ))}

      {/* Main cable across the span and the back-stays to the anchorages */}
      <path
        d={`M150 262 Q500 18 850 262`}
        strokeWidth={strokeWidth * 1.5}
      />
      <path d={`M0 ${deckY - 60} Q75 260 150 262`} opacity="0.8" />
      <path d={`M850 262 Q925 260 1000 ${deckY - 60}`} opacity="0.8" />

      {/* Suspender cables */}
      <g opacity="0.65">
        {cables.map((x) => (
          <line
            key={x}
            x1={x}
            x2={x}
            y1={cableY(x)}
            y2={deckY}
            strokeWidth={strokeWidth * 0.72}
          />
        ))}
      </g>
    </svg>
  );
}
