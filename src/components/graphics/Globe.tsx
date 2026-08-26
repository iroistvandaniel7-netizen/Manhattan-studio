"use client";

import { useEffect, useRef } from "react";
import {
  geoDistance,
  geoGraticule10,
  geoInterpolate,
  geoOrthographic,
  geoPath,
  geoRotation,
} from "d3-geo";
import { merge, mesh } from "topojson-client";
import type {
  GeometryCollection,
  MultiPolygon as TopoMultiPolygon,
  Polygon as TopoPolygon,
  Topology,
} from "topojson-specification";
import type { MultiLineString, MultiPolygon } from "geojson";

const DEG = Math.PI / 180;
const TAU = Math.PI * 2;

export type GlobePlace = {
  /** Region key, e.g. "gb". Only used to keep places distinct. */
  key: string;
  /** Badge code of the language spoken here, e.g. "EN". */
  lang: string;
  /** The language's name in the reader's locale — this is what gets drawn. */
  name: string;
  lon: number;
  lat: number;
  /** Preferred side for a label anchored here. */
  label: { dx: number; dy: number; anchor: "start" | "end" };
};

type GeoData = { land: MultiPolygon; borders: MultiLineString };
type Box = [number, number, number, number];

/**
 * Natural Earth 1:50m, re-quantised by `scripts/build-geo.mjs`. Fetched once
 * per page and shared by every globe on it; it is a couple of hundred kilobytes
 * of coastline, so it is never part of the main bundle.
 */
let geoRequest: Promise<GeoData> | null = null;
function loadGeo(): Promise<GeoData> {
  if (!geoRequest) {
    geoRequest = fetch("/geo/countries.json")
      .then((response) => {
        if (!response.ok) throw new Error(`geo ${response.status}`);
        return response.json();
      })
      .then((topology: Topology) => {
        // Every geometry in this collection is a country outline; the wider
        // GeometryObject type the parser hands back is not what is in the file.
        const countries = topology.objects.countries as GeometryCollection<
          Record<string, never>
        > & { geometries: (TopoPolygon | TopoMultiPolygon)[] };
        return {
          // Merged, so filling the land does not leave hairlines along every
          // shared border where two fills meet.
          land: merge(topology, countries.geometries) as MultiPolygon,
          borders: mesh(topology, countries, (a, b) => a !== b) as MultiLineString,
        };
      });
  }
  return geoRequest;
}

/** Unit vector for a lon/lat, in the projection's rotated frame. */
function toVector(lon: number, lat: number): [number, number, number] {
  const cosLat = Math.cos(lat * DEG);
  return [cosLat * Math.sin(lon * DEG), Math.sin(lat * DEG), cosLat * Math.cos(lon * DEG)];
}

function overlaps(a: Box, b: Box): boolean {
  return !(a[0] > b[0] + b[2] || a[0] + a[2] < b[0] || a[1] > b[1] + b[3] || a[1] + a[3] < b[1]);
}

/**
 * Where else a label can go if its preferred side is taken. Four diagonals
 * first — they read as deliberate placement — then the axes.
 */
const ALTERNATES: [number, number, "start" | "end"][] = [
  [1, -1, "start"],
  [1, 1, "start"],
  [-1, -1, "end"],
  [-1, 1, "end"],
  [1, 0, "start"],
  [-1, 0, "end"],
  [0, -1, "start"],
  [0, 1, "start"],
];

export default function Globe({
  places,
  origin,
  originLabel,
  className = "",
  onReady,
}: {
  places: GlobePlace[];
  origin: [number, number];
  originLabel: string;
  className?: string;
  onReady?: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  /*
   * What to draw lives in a ref rather than in the draw loop's dependencies:
   * the loop runs on its own clock and reads the latest scene each frame, so a
   * change must not tear it down and restart it.
   */
  const scene = useRef({ places, origin, originLabel });
  useEffect(() => {
    scene.current = { places, origin, originLabel };
  }, [places, origin, originLabel]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const graticule = geoGraticule10();

    const centre = { lon: 12, lat: 18 };
    let drag: { x: number; y: number; lon: number; lat: number } | null = null;
    let idleUntil = 0;
    /** The language under the pointer, if any. Kept out of React: it changes on
     *  every mouse move and nothing outside the canvas needs to know. */
    let hovered: string | null = null;
    /** 0 → 1 while a hovered language's routes sweep out from the studio. */
    let sweep = 1;

    let data: GeoData | null = null;
    let frame = 0;
    let onScreen = true;
    let width = 0;
    let height = 0;
    let last = performance.now();
    let cancelled = false;
    // `ctx.font` cannot resolve a CSS variable, and an unparseable value is
    // dropped silently, leaving 10px sans-serif. Read the resolved stack.
    let mono = "ui-monospace, monospace";

    /*
     * The lighting does not turn with the globe.
     *
     * Atmosphere, ocean, terminator, sheen and limb are all radial gradients
     * fixed to the frame — they depend only on the canvas size. Regenerating
     * and filling five of them every frame is several megapixels of work for an
     * image that never changes, and on a machine without an accelerated canvas
     * that alone sets the frame rate.
     *
     * So they are painted once per resize into two offscreen canvases: what
     * goes under the continents, and what goes over them. Each frame blits two
     * ready images and draws only what actually moves.
     */
    let under: HTMLCanvasElement | null = null;
    let over: HTMLCanvasElement | null = null;

    const geometry = () => {
      const cx = width / 2;
      const cy = height / 2;
      // Room for the atmosphere, and for a label hanging off a marker at the limb.
      const radius = Math.min(width, height) * 0.5 * 0.86;
      return { cx, cy, radius };
    };

    const buildLayers = (ratio: number) => {
      const { cx, cy, radius } = geometry();
      const lx = cx - radius * 0.42;
      const ly = cy - radius * 0.48;

      const make = () => {
        const layer = document.createElement("canvas");
        layer.width = Math.max(1, Math.round(width * ratio));
        layer.height = Math.max(1, Math.round(height * ratio));
        const c = layer.getContext("2d");
        c?.setTransform(ratio, 0, 0, ratio, 0, 0);
        return { layer, c };
      };

      const back = make();
      if (back.c) {
        const c = back.c;
        const air = c.createRadialGradient(cx, cy, radius * 0.96, cx, cy, radius * 1.22);
        air.addColorStop(0, "rgba(77,141,255,0.34)");
        air.addColorStop(0.34, "rgba(77,141,255,0.13)");
        air.addColorStop(1, "rgba(77,141,255,0)");
        c.fillStyle = air;
        c.beginPath();
        c.arc(cx, cy, radius * 1.22, 0, TAU);
        c.fill();

        const sea = c.createRadialGradient(lx, ly, radius * 0.04, cx, cy, radius * 1.34);
        sea.addColorStop(0, "#1c58bb");
        sea.addColorStop(0.36, "#0b3a8e");
        sea.addColorStop(0.7, "#062354");
        sea.addColorStop(1, "#020b22");
        c.fillStyle = sea;
        c.beginPath();
        c.arc(cx, cy, radius, 0, TAU);
        c.fill();
      }
      under = back.layer;

      const front = make();
      if (front.c) {
        const c = front.c;
        c.save();
        c.beginPath();
        c.arc(cx, cy, radius, 0, TAU);
        c.clip();

        const shade = c.createRadialGradient(lx, ly, radius * 0.08, lx, ly, radius * 2);
        shade.addColorStop(0, "rgba(255,255,255,0.10)");
        shade.addColorStop(0.3, "rgba(255,255,255,0)");
        shade.addColorStop(0.62, "rgba(2,6,20,0.32)");
        shade.addColorStop(1, "rgba(1,3,12,0.82)");
        c.fillStyle = shade;
        c.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

        const sheen = c.createRadialGradient(lx, ly, 0, lx, ly, radius * 0.52);
        sheen.addColorStop(0, "rgba(214,234,255,0.15)");
        sheen.addColorStop(1, "rgba(214,234,255,0)");
        c.fillStyle = sheen;
        c.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
        c.restore();

        c.beginPath();
        c.arc(cx, cy, radius, 0, TAU);
        c.strokeStyle = "rgba(122,176,255,0.42)";
        c.lineWidth = Math.max(1, radius * 0.005);
        c.stroke();
      }
      over = front.layer;
    };

    const resize = () => {
      // Measure the canvas, not its parent: CSS drives its box, so writing the
      // backing-store size back cannot start a resize loop.
      const rect = canvas.getBoundingClientRect();
      mono = getComputedStyle(canvas).fontFamily || mono;
      const ratio = Math.min(2, window.devicePixelRatio || 1);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      buildLayers(ratio);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    // Never burn frames on a globe nobody is looking at.
    const visibility = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        last = performance.now();
      },
      { rootMargin: "120px" },
    );
    visibility.observe(canvas);

    /** Screen position and facing of a place, at the current rotation. */
    const locate = (rotate: ReturnType<typeof geoRotation>) => {
      const { cx, cy, radius } = geometry();
      return (lon: number, lat: number, lift = 0) => {
        const [rl, rp] = rotate([lon, lat]);
        const [vx, vy, vz] = toVector(rl, rp);
        const h = 1 + lift;
        return {
          x: cx + radius * h * vx,
          y: cy - radius * h * vy,
          z: vz,
          hidden: vz < 0 && Math.hypot(radius * h * vx, radius * h * vy) < radius,
        };
      };
    };

    const draw = () => {
      if (!data || width < 8 || height < 8) return;
      const { places: marks, origin: home, originLabel: homeName } = scene.current;

      const { cx, cy, radius } = geometry();
      const unit = radius / 270;

      const spec: [number, number] = [-centre.lon, -centre.lat];
      const projection = geoOrthographic()
        .translate([cx, cy])
        .scale(radius)
        .rotate(spec)
        .clipAngle(90);
      const path = geoPath(projection, context);
      const rotate = geoRotation(spec);
      const place = locate(rotate);

      context.clearRect(0, 0, width, height);

      /* Atmosphere and ocean, painted at this size once. */
      if (under) context.drawImage(under, 0, 0, width, height);

      context.save();
      context.beginPath();
      context.arc(cx, cy, radius, 0, TAU);
      context.clip();

      /* Graticule. */
      context.beginPath();
      path(graticule);
      context.strokeStyle = "rgba(165,205,255,0.10)";
      context.lineWidth = 0.6;
      context.stroke();

      /* Land, with a soft shadow so it sits above the water. */
      const lx = cx - radius * 0.42;
      const ly = cy - radius * 0.48;
      context.save();
      context.shadowColor = "rgba(2,8,26,0.85)";
      context.shadowBlur = radius * 0.05;
      context.shadowOffsetX = radius * 0.012;
      context.shadowOffsetY = radius * 0.024;
      const ground = context.createRadialGradient(lx, ly, radius * 0.04, cx, cy, radius * 1.36);
      ground.addColorStop(0, "#f4f7ff");
      ground.addColorStop(0.4, "#cfdcf5");
      ground.addColorStop(0.76, "#7d90bc");
      ground.addColorStop(1, "#3a4970");
      context.fillStyle = ground;
      context.beginPath();
      path(data.land);
      context.fill();
      context.restore();

      /* Borders, then a hairline of surf along every coast. */
      context.beginPath();
      path(data.borders);
      context.strokeStyle = "rgba(22,42,92,0.45)";
      context.lineWidth = Math.max(0.5, radius * 0.0022);
      context.stroke();

      context.beginPath();
      path(data.land);
      context.strokeStyle = "rgba(255,255,255,0.24)";
      context.lineWidth = Math.max(0.4, radius * 0.0018);
      context.stroke();

      context.restore();

      /* One lighting pass over water and land together, plus the limb — this is
         what makes the disc read as a sphere rather than a circle. */
      if (over) context.drawImage(over, 0, 0, width, height);

      /*
       * Everything from here up is drawn over a globe that is near-white where
       * the land is and near-black over the ocean, so every mark carries a dark
       * outline and every word a dark halo. Without one, half of them vanish
       * depending on where the globe has turned to.
       */
      const fontSize = Math.max(11, Math.min(17, 11 * unit));
      context.font = `600 ${fontSize}px ${mono}`;
      context.textBaseline = "middle";

      const write = (text: string, x: number, y: number, alpha: number) => {
        context.globalAlpha = alpha;
        context.lineJoin = "round";
        context.strokeStyle = "rgba(3,9,26,0.92)";
        context.lineWidth = Math.max(3, 3.6 * unit);
        context.strokeText(text, x, y);
        context.fillStyle = "#ffffff";
        context.fillText(text, x, y);
        context.globalAlpha = 1;
      };

      /* Routes, drawn only for the language under the pointer. */
      const home3 = place(home[0], home[1]);
      if (hovered) {
        context.lineCap = "round";
        context.lineJoin = "round";
        for (const mark of marks) {
          if (mark.lang !== hovered) continue;
          const to: [number, number] = [mark.lon, mark.lat];
          const span = geoDistance(home, to);
          if (span < 0.02) continue;
          const lift = Math.min(0.22, 0.04 + span * 0.11);
          const along = geoInterpolate(home, to);
          const steps = 72;
          const limit = Math.max(1, Math.round(steps * sweep));

          context.beginPath();
          let drawing = false;
          for (let i = 0; i <= limit; i += 1) {
            const t = i / steps;
            const [lon, lat] = along(t);
            const surface = place(lon, lat);
            if (surface.z <= 0.015) {
              drawing = false;
              continue;
            }
            /*
             * Settle the arc back onto the surface as it nears the horizon, or
             * the lift carries the last stretch off the edge of the globe and
             * leaves a line hanging in the dark. The taper has to key off how
             * far out the point is *drawn*, not how far round the sphere it is:
             * a point 76° from the centre still has a depth of 0.24 but already
             * projects to 97% of the radius, so any lift puts it outside.
             */
            const outward = Math.sqrt(Math.max(0, 1 - surface.z * surface.z));
            const taper = Math.min(1, Math.max(0, (1 - outward) / 0.25));
            const p = place(lon, lat, lift * Math.sin(Math.PI * t) * taper);
            if (drawing) context.lineTo(p.x, p.y);
            else {
              context.moveTo(p.x, p.y);
              drawing = true;
            }
          }
          context.strokeStyle = "rgba(4,14,40,0.55)";
          context.lineWidth = Math.max(2.4, 3.4 * unit);
          context.stroke();
          context.strokeStyle = "rgba(255,255,255,0.92)";
          context.lineWidth = Math.max(1, 1.4 * unit);
          context.stroke();
        }
      }

      /* Marked places. */
      for (const mark of marks) {
        const p = place(mark.lon, mark.lat);
        if (p.hidden || p.z <= 0) continue;
        // Fade out over the last few degrees rather than blinking off the edge.
        const edge = Math.max(0, Math.min(1, p.z * 6));
        const up = !hovered || mark.lang === hovered;
        const size = up ? 1 : 0.7;

        context.globalAlpha = edge * (up ? 1 : 0.45);
        if (hovered && up) {
          context.fillStyle = "rgba(20,70,180,0.45)";
          context.beginPath();
          context.arc(p.x, p.y, 8 * unit, 0, TAU);
          context.fill();
        }
        context.strokeStyle = "rgba(3,9,26,0.8)";
        context.lineWidth = Math.max(2.4, 3.2 * unit);
        context.beginPath();
        context.arc(p.x, p.y, 5.4 * size * unit, 0, TAU);
        context.stroke();
        context.strokeStyle = "#ffffff";
        context.lineWidth = Math.max(1.2, 1.5 * unit);
        context.beginPath();
        context.arc(p.x, p.y, 5.4 * size * unit, 0, TAU);
        context.stroke();
        context.fillStyle = "rgba(3,9,26,0.8)";
        context.beginPath();
        context.arc(p.x, p.y, 3.6 * size * unit, 0, TAU);
        context.fill();
        context.fillStyle = "#ffffff";
        context.beginPath();
        context.arc(p.x, p.y, 2.7 * size * unit, 0, TAU);
        context.fill();
        context.globalAlpha = 1;
      }

      /*
       * Language names.
       *
       * Each language is named once, at whichever of its places is facing the
       * reader most squarely. That is what makes a turning globe readable:
       * Spanish is labelled over Spain while Europe is in view and over Mexico
       * once the Atlantic has come round, instead of vanishing with its anchor.
       *
       * Five of the seven are taught within a few hundred kilometres of each
       * other, so on a globe their markers land in one thumbprint of Central
       * Europe. Names are pushed outward ring by ring until they find clear
       * space, and anything pushed far enough gets a leader back to its marker
       * so it is still obvious which dot it belongs to.
       */
      const taken: Box[] = [];
      const RINGS = [16, 30, 48, 70, 96];

      /** Find clear space for a name, working outward from a preferred side. */
      const findSpot = (
        text: string,
        ax: number,
        ay: number,
        preferred: [number, number, "start" | "end"],
      ) => {
        const w = context.measureText(text).width;
        const boxH = fontSize * 1.4;
        /*
         * After the hand-picked side, try straight out from the middle of the
         * globe. In a cluster that fans the names apart instead of stacking
         * them, which is the whole difficulty with Central Europe here.
         */
        const outX = ax - cx;
        const outY = ay - cy;
        const outward: [number, number, "start" | "end"] = [
          outX,
          outY,
          outX >= 0 ? "start" : "end",
        ];
        for (const ring of RINGS) {
          for (const [dx, dy, align] of [preferred, outward, ...ALTERNATES]) {
            const len = Math.hypot(dx, dy) || 1;
            const reach = ring * unit;
            const x = ax + (dx / len) * reach;
            const y = ay + (dy / len) * reach;
            const left = align === "end" ? x - w : x;
            const box: Box = [left - 4, y - boxH / 2, w + 8, boxH];
            if (box[0] < 4 || box[0] + box[2] > width - 4) continue;
            if (box[1] < 4 || box[1] + box[3] > height - 4) continue;
            if (taken.some((t) => overlaps(box, t))) continue;
            taken.push(box);
            return { x, y, align, ring };
          }
        }
        return null;
      };

      /** A hairline from a marker out to a name that had to be pushed away. */
      const leader = (ax: number, ay: number, x: number, y: number, alpha: number) => {
        const dx = x - ax;
        const dy = y - ay;
        const len = Math.hypot(dx, dy) || 1;
        const from = 7 * unit;
        const to = len - 5 * unit;
        context.globalAlpha = alpha * 0.8;
        context.beginPath();
        context.moveTo(ax + (dx / len) * from, ay + (dy / len) * from);
        context.lineTo(ax + (dx / len) * to, ay + (dy / len) * to);
        context.strokeStyle = "rgba(3,9,26,0.75)";
        context.lineWidth = Math.max(2.4, 3 * unit);
        context.stroke();
        context.strokeStyle = "rgba(255,255,255,0.75)";
        context.lineWidth = Math.max(1, 1.1 * unit);
        context.stroke();
        context.globalAlpha = 1;
      };

      /* The studio goes down first — the whole picture is drawn from it. */
      if (!home3.hidden && home3.z > 0) {
        const edge = Math.max(0, Math.min(1, home3.z * 6));
        context.globalAlpha = edge;

        const crosshair = [
          [-21, 0, -15, 0],
          [15, 0, 21, 0],
          [0, -21, 0, -15],
          [0, 15, 0, 21],
        ];
        const spokes = () => {
          context.beginPath();
          for (const [ax, ay, bx, by] of crosshair) {
            context.moveTo(home3.x + ax * unit, home3.y + ay * unit);
            context.lineTo(home3.x + bx * unit, home3.y + by * unit);
          }
          context.stroke();
        };

        context.strokeStyle = "rgba(3,9,26,0.8)";
        context.lineWidth = Math.max(3, 3.8 * unit);
        context.beginPath();
        context.arc(home3.x, home3.y, 12.5 * unit, 0, TAU);
        context.stroke();
        spokes();

        context.strokeStyle = "#ffffff";
        context.lineWidth = Math.max(1.4, 1.7 * unit);
        context.beginPath();
        context.arc(home3.x, home3.y, 12.5 * unit, 0, TAU);
        context.stroke();
        context.lineWidth = Math.max(1, 1.3 * unit);
        spokes();
        context.globalAlpha = 1;

        const spot = findSpot(homeName, home3.x, home3.y, [1, 1, "start"]);
        if (spot) {
          if (spot.ring > 20) leader(home3.x, home3.y, spot.x, spot.y, edge);
          context.textAlign = spot.align === "end" ? "right" : "left";
          write(homeName, spot.x, spot.y, edge);
        }
      }

      const byLanguage = new Map<string, GlobePlace & { x: number; y: number; z: number }>();
      for (const mark of marks) {
        const p = place(mark.lon, mark.lat);
        if (p.hidden || p.z <= 0.16) continue;
        const best = byLanguage.get(mark.lang);
        if (!best || p.z > best.z) byLanguage.set(mark.lang, { ...mark, ...p });
      }

      // Front-most first, so a language squarely in view keeps its chosen side.
      for (const mark of [...byLanguage.values()].sort((a, b) => b.z - a.z)) {
        const spot = findSpot(mark.name, mark.x, mark.y, [
          mark.label.dx,
          mark.label.dy,
          mark.label.anchor,
        ]);
        if (!spot) continue;
        const alpha = Math.min(1, mark.z * 6) * (hovered && mark.lang !== hovered ? 0.4 : 1);
        if (spot.ring > 20) leader(mark.x, mark.y, spot.x, spot.y, alpha);
        context.textAlign = spot.align === "end" ? "right" : "left";
        write(mark.name, spot.x, spot.y, alpha);
      }

      context.textAlign = "left";
    };

    /*
     * Redrawing means re-clipping every coastline against the sphere, so it is
     * the most expensive thing on the page. At four degrees a second the globe
     * moves a fifteenth of a degree between frames at 30fps and a thirtieth at
     * 60 — a difference nobody can see, for twice the work. Cap it.
     */
    const MIN_FRAME_MS = 32;
    let painted = 0;

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      if (now - painted < MIN_FRAME_MS) return;
      const delta = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!onScreen || !data) return;
      painted = now;

      if (!drag && now >= idleUntil && !reduced) centre.lon += 4.2 * delta;
      centre.lon = ((((centre.lon + 180) % 360) + 360) % 360) - 180;
      if (sweep < 1) sweep = reduced ? 1 : Math.min(1, sweep + delta / 0.7);

      draw();
    };

    loadGeo()
      .then((loaded) => {
        if (cancelled) return;
        data = loaded;
        draw();
        onReady?.();
      })
      .catch(() => {
        // The fallback map stays on screen; nothing else to do.
      });

    frame = requestAnimationFrame(tick);

    /* Pointer: drag to turn, hover to raise a language. */
    const pickLanguage = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const px = clientX - rect.left;
      const py = clientY - rect.top;
      const { radius } = geometry();
      const rotate = geoRotation([-centre.lon, -centre.lat]);
      const place = locate(rotate);
      const reach = Math.max(22, 26 * (radius / 270));

      let nearest: string | null = null;
      let best = reach * reach;
      for (const mark of scene.current.places) {
        const p = place(mark.lon, mark.lat);
        if (p.hidden || p.z <= 0) continue;
        const d = (p.x - px) ** 2 + (p.y - py) ** 2;
        if (d < best) {
          best = d;
          nearest = mark.lang;
        }
      }
      if (nearest !== hovered) {
        hovered = nearest;
        sweep = 0;
      }
    };

    const onDown = (event: PointerEvent) => {
      drag = { x: event.clientX, y: event.clientY, lon: centre.lon, lat: centre.lat };
      pickLanguage(event.clientX, event.clientY);
      canvas.setPointerCapture(event.pointerId);
    };
    const onMove = (event: PointerEvent) => {
      if (!drag) {
        pickLanguage(event.clientX, event.clientY);
        return;
      }
      const { radius } = geometry();
      centre.lon = drag.lon - ((event.clientX - drag.x) / (radius || 1)) * 90;
      centre.lat = Math.max(
        -72,
        Math.min(72, drag.lat - ((event.clientY - drag.y) / (radius || 1)) * 90),
      );
      idleUntil = performance.now() + 2600;
    };
    const onUp = (event: PointerEvent) => {
      if (!drag) return;
      drag = null;
      idleUntil = performance.now() + 2600;
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
    };
    const onLeave = () => {
      hovered = null;
      sweep = 1;
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [onReady]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      // `font-mono` is here so the drawing code can read the resolved family
      // off the element; canvas has no access to the CSS variable itself.
      className={`font-mono block h-full w-full cursor-grab touch-pan-y active:cursor-grabbing ${className}`}
    />
  );
}
