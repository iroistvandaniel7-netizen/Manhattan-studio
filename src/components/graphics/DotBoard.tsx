import {
  DOT,
  DOT_FIELD,
  LANGUAGE_REGIONS,
  MAP_H,
  MAP_W,
  STEP_PX,
  STUDIO,
  markersFor,
} from "./worldMap";

/**
 * The flat stand-in for the globe.
 *
 * A canvas is blank until scripting runs and the coastline data arrives, so
 * something has to hold the space and still answer the question — here is the
 * world, here is the studio, here is everywhere we teach. It is drawn as a lamp
 * matrix from the same coarse landmass boxes: cheap, in the first HTML
 * response, and correct without a single byte of JavaScript.
 */
export default function DotBoard({ className = "" }: { className?: string }) {
  const markers = Object.keys(LANGUAGE_REGIONS).flatMap((code) => markersFor(code));

  return (
    <svg
      viewBox={`0 0 ${MAP_W} ${MAP_H}`}
      className={`block h-auto w-full ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern id="board-lamps" width={STEP_PX} height={STEP_PX} patternUnits="userSpaceOnUse">
          <rect
            x={(STEP_PX - DOT) / 2}
            y={(STEP_PX - DOT) / 2}
            width={DOT}
            height={DOT}
            fill="#ffffff"
            fillOpacity="0.04"
          />
        </pattern>
      </defs>

      <rect width={MAP_W} height={MAP_H} fill="url(#board-lamps)" />
      <path d={DOT_FIELD} fill="#4d8dff" fillOpacity="0.55" />

      {markers.map((marker, i) => (
        <rect
          key={`${marker.code}-${marker.key}-${i}`}
          x={marker.x - 4}
          y={marker.y - 4}
          width={8}
          height={8}
          fill="#ffffff"
        />
      ))}

      <circle
        cx={STUDIO.x}
        cy={STUDIO.y}
        r={10}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.75"
        strokeWidth={1.4}
      />
    </svg>
  );
}
