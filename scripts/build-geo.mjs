/**
 * Prepare the globe's geometry.
 *
 * Natural Earth 1:50m from `world-atlas` is the right source, but not the right
 * shipping format. It carries 80,000 points, quantised to a 1e5 grid — about a
 * metre. The globe is roughly 560 px across, so its visible hemisphere spans
 * 180° in 560 px: a third of a degree per pixel. Most of those points fall
 * inside a single pixel, and every one of them is paid for twice — once on the
 * wire, and again on every animation frame, because an orthographic projection
 * has to re-clip the whole world each time the globe turns.
 *
 * So: simplify to the detail the screen can actually show, then re-quantise to
 * a grid near that same scale.
 *
 * The hazard is silent. Either step can shrink a small island's ring to nothing,
 * and a ring with no area is not a small polygon on a sphere — d3 reads it as
 * one enclosing everything *except* a point, so a single lost island turns the
 * fill inside out and paints the ocean white instead of the land. Nothing about
 * the output looks wrong until it is on screen, which is why the land's share of
 * the sphere is measured against the source before a byte is written.
 *
 * Run with `npm run geo`; the output is committed, so a build never needs it.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { merge } from "topojson-client";
import { presimplify, simplify, sphericalTriangleArea } from "topojson-simplify";
import { geoArea } from "d3-geo";

const SOURCE = "node_modules/world-atlas/countries-50m.json";
const OUT = "public/geo/countries.json";

/**
 * Smallest triangle worth keeping, in steradians. 2e-6 sr is a patch about
 * 9 km across — roughly a third of a pixel at this globe's size.
 *
 * Note what is *not* here: topojson-simplify also offers `filter` with
 * `filterWeight` to drop rings that fall below a threshold. It looks like the
 * safety net for collapsed islands, and it is the wrong tool — it removes 8% of
 * the world's land outright. `simplify` never reduces a ring below four points,
 * so it cannot produce a degenerate one, and the area check below holds it to
 * that.
 */
const MIN_AREA = 2e-6;
/** Steps across the full lon/lat range: ~0.09°, about a third of a pixel. */
const GRID = 4000;
/** Simplification moves the coastline; an inverted ring moves it by 350%. */
const AREA_TOLERANCE = 0.02;

const source = JSON.parse(readFileSync(SOURCE, "utf8"));
const truth = geoArea(merge(source, source.objects.countries.geometries));

const countPoints = (topology) =>
  topology.arcs.reduce((total, arc) => total + arc.length, 0);

/* --- 1. Undo the source quantisation.
 *
 * `presimplify` rewrites every coordinate as [x, y, weight], which it can only
 * do on absolute positions — a delta-encoded topology has no coordinates to
 * annotate. Decode the arcs and drop the transform before simplifying.
 */
const {
  scale: [sx0, sy0],
  translate: [tx0, ty0],
} = source.transform;

const absolute = {
  type: "Topology",
  objects: source.objects,
  arcs: source.arcs.map((arc) => {
    let x = 0;
    let y = 0;
    return arc.map(([dx, dy]) => {
      x += dx;
      y += dy;
      return [x * sx0 + tx0, y * sy0 + ty0];
    });
  }),
};

/* --- 2. Simplify. --- */
const simplified = simplify(presimplify(absolute, sphericalTriangleArea), MIN_AREA);

/* --- 3. Re-quantise onto a coarse grid. --- */
const decoded = simplified.arcs.map((arc) => arc.map(([x, y]) => [x, y]));

const bounds = [Infinity, Infinity, -Infinity, -Infinity];
for (const arc of decoded) {
  for (const [x, y] of arc) {
    if (x < bounds[0]) bounds[0] = x;
    if (y < bounds[1]) bounds[1] = y;
    if (x > bounds[2]) bounds[2] = x;
    if (y > bounds[3]) bounds[3] = y;
  }
}

const nsx = (bounds[2] - bounds[0]) / (GRID - 1);
const nsy = (bounds[3] - bounds[1]) / (GRID - 1);

const arcs = decoded.map((arc) => {
  const snapped = arc.map(([x, y]) => [
    Math.round((x - bounds[0]) / nsx),
    Math.round((y - bounds[1]) / nsy),
  ]);

  const kept = [];
  for (const point of snapped) {
    const last = kept[kept.length - 1];
    if (!last || last[0] !== point[0] || last[1] !== point[1]) kept.push(point);
  }
  // An arc must keep both ends, or a ring built from it will not close.
  const points = kept.length >= Math.min(4, snapped.length) ? kept : snapped;

  let x = 0;
  let y = 0;
  return points.map(([px, py]) => {
    const delta = [px - x, py - y];
    x = px;
    y = py;
    return delta;
  });
});

const topology = {
  type: "Topology",
  transform: { scale: [nsx, nsy], translate: [bounds[0], bounds[1]] },
  objects: {
    countries: {
      type: "GeometryCollection",
      // The names and ids are never read; only the shapes are drawn.
      geometries: simplified.objects.countries.geometries.map(
        ({ properties, id, ...rest }) => {
          void properties;
          void id;
          return rest;
        },
      ),
    },
  },
  arcs,
};

/* --- 4. Prove the land is still the land. --- */
const area = geoArea(merge(topology, topology.objects.countries.geometries));
const drift = Math.abs(area - truth) / truth;
if (!(drift <= AREA_TOLERANCE)) {
  throw new Error(
    `land area moved by ${(drift * 100).toFixed(1)}% — a ring collapsed or ` +
      `inverted. Lower MIN_AREA or raise GRID rather than shipping this.`,
  );
}

mkdirSync("public/geo", { recursive: true });
const json = JSON.stringify(topology);
writeFileSync(OUT, json);

console.log(
  `${OUT}\n` +
    `  points   ${countPoints(source)} → ${countPoints(topology)}\n` +
    `  size     ${(json.length / 1024).toFixed(0)} KB raw, ` +
    `${(gzipSync(json).length / 1024).toFixed(0)} KB gzipped\n` +
    `  land     ${(area / (4 * Math.PI)).toFixed(4)} of the sphere ` +
    `(source ${(truth / (4 * Math.PI)).toFixed(4)}, drift ${(drift * 100).toFixed(2)}%)`,
);
