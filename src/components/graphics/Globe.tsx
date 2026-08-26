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

export type GlobePoint = {
  key: string;
  lon: number;
  lat: number;
  lit: boolean;
  /** Which way the code hangs off its marker. Only the first point of a place has one. */
  label?: { dx: number; dy: number; anchor: "start" | "end" };
};

type GeoData = { land: MultiPolygon; borders: MultiLineString };

/**
 * Natural Earth 1:50m, re-quantised by `scripts/build-geo.mjs`. Fetched once
 * per page and shared by every globe on it; it is half a megabyte of
 * coastline, so it is never part of the main bundle.
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

/**
 * The point to turn toward so a set of places is on the near side: the
 * direction of their mean position on the sphere. Falls back to the origin
 * when the places cancel each other out, which is what happens for a language
 * spoken on opposite sides of the world.
 */
export function viewCentre(
  points: [number, number][],
  fallback: [number, number],
): [number, number] {
  let x = 0;
  let y = 0;
  let z = 0;
  for (const [lon, lat] of points) {
    const [vx, vy, vz] = toVector(lon, lat);
    x += vx;
    y += vy;
    z += vz;
  }
  const length = Math.hypot(x, y, z);
  if (length < 0.15) return fallback;
  const lat = Math.asin(y / length) / DEG;
  const lon = Math.atan2(x / length, z / length) / DEG;
  // Keep the pole off the edge of the frame; a steep tilt reads as a mistake.
  return [lon, Math.max(-52, Math.min(52, lat))];
}

/** Shortest signed way round from one longitude to another. */
function shortWay(from: number, to: number): number {
  return ((((to - from) % 360) + 540) % 360) - 180;
}

export default function Globe({
  points,
  routes,
  origin,
  originLabel,
  focus,
  className = "",
  onReady,
}: {
  points: GlobePoint[];
  /** Destinations for the great circles leaving `origin`. */
  routes: [number, number][];
  origin: [number, number];
  originLabel: string;
  /** Where to turn to, or null to let it drift. */
  focus: [number, number] | null;
  className?: string;
  onReady?: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  /*
   * What to draw lives in a ref rather than in the draw loop's dependencies:
   * the loop runs on its own clock and reads the latest scene each frame, so
   * changing the selection must not tear down and restart it.
   */
  const scene = useRef({ points, routes, origin, originLabel });
  useEffect(() => {
    scene.current = { points, routes, origin, originLabel };
  }, [points, routes, origin, originLabel]);

  const centre = useRef({ lon: 12, lat: 20 });
  const fly = useRef<{ lon0: number; lat0: number; dLon: number; lat1: number; start: number } | null>(
    null,
  );
  const drag = useRef<{ x: number; y: number; lon: number; lat: number } | null>(null);
  const idleUntil = useRef(0);
  const spin = useRef(true);
  /** Degrees a second. Slower while a language is up, so its arcs linger. */
  const spinRate = useRef(4.2);
  const drawn = useRef(0);
  /** 0 → 1 while the routes for a new selection sweep out from the studio. */
  const sweep = useRef(1);

  // Turn toward the current selection, and stop drifting while one is shown.
  useEffect(() => {
    spin.current = focus === null;
    spinRate.current = focus ? 2.4 : 4.2;
    sweep.current = 0;
    if (!focus) return;
    fly.current = {
      lon0: centre.current.lon,
      lat0: centre.current.lat,
      dLon: shortWay(centre.current.lon, focus[0]),
      lat1: focus[1],
      start: performance.now(),
    };
  }, [focus]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const graticule = geoGraticule10();

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
     * and filling five of them every frame is several megapixels of work per
     * frame for an image that never changes, and on a machine without an
     * accelerated canvas that alone sets the frame rate.
     *
     * So they are painted once per resize into two offscreen canvases: what
     * goes under the continents, and what goes over them. Each frame blits two
     * ready images and draws only what actually moves.
     */
    let under: HTMLCanvasElement | null = null;
    let over: HTMLCanvasElement | null = null;

    const buildLayers = (ratio: number) => {
      const cx = width / 2;
      const cy = height / 2;
      const radius = (Math.min(width, height) / 2) * 0.84;
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
        const air = c.createRadialGradient(cx, cy, radius * 0.96, cx, cy, radius * 1.2);
        air.addColorStop(0, "rgba(77,141,255,0.34)");
        air.addColorStop(0.34, "rgba(77,141,255,0.13)");
        air.addColorStop(1, "rgba(77,141,255,0)");
        c.fillStyle = air;
        c.beginPath();
        c.arc(cx, cy, radius * 1.2, 0, TAU);
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
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
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

    const draw = () => {
      if (!data || width < 8 || height < 8) return;
      const { points: marks, routes: legs, origin: home, originLabel: homeName } = scene.current;

      const cx = width / 2;
      const cy = height / 2;
      const radius = (Math.min(width, height) / 2) * 0.84;
      const unit = radius / 270;
      // The light is fixed in the frame, not on the globe, so the sphere reads
      // as lit from over the reader's shoulder however far it has turned.
      const lx = cx - radius * 0.42;
      const ly = cy - radius * 0.48;

      const spec: [number, number] = [-centre.current.lon, -centre.current.lat];
      const projection = geoOrthographic()
        .translate([cx, cy])
        .scale(radius)
        .rotate(spec)
        .clipAngle(90);
      const path = geoPath(projection, context);
      const rotate = geoRotation(spec);

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

      /* Screen position and facing of a place. */
      const place = (lon: number, lat: number, lift = 0) => {
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

      /* Routes, lifted off the surface so they read as arcs over the globe. */
      const home3 = place(home[0], home[1]);
      context.lineCap = "round";
      context.lineJoin = "round";
      for (const leg of legs) {
        const span = geoDistance(home, leg);
        const lift = Math.min(0.22, 0.04 + span * 0.11);
        const along = geoInterpolate(home, leg);
        const steps = 72;
        const limit = Math.max(1, Math.round(steps * sweep.current));

        context.beginPath();
        let drawing = false;
        for (let i = 0; i <= limit; i += 1) {
          const t = i / steps;
          const [lon, lat] = along(t);
          // Visibility follows the point on the ground, not the lifted one: an
          // arc whose destination is round the back would otherwise keep
          // sweeping out past the limb into empty space.
          const ground = place(lon, lat);
          if (ground.z <= 0.015) {
            drawing = false;
            continue;
          }
          /*
           * Settle the arc back onto the surface as it nears the horizon, or
           * the lift carries the last stretch off the edge of the globe and
           * leaves a line hanging in the dark.
           *
           * The taper has to key off how far out the point is *drawn*, not how
           * far round the sphere it is. Those are not the same near the limb:
           * a point 76° from the centre still has a healthy depth of 0.24, but
           * it already projects to 97% of the radius, so any lift at all puts
           * it outside the disc. Distance from the centre of the drawing is
           * sin of that angle.
           */
          const outward = Math.sqrt(Math.max(0, 1 - ground.z * ground.z));
          const taper = Math.min(1, Math.max(0, (1 - outward) / 0.25));
          const p = place(lon, lat, lift * Math.sin(Math.PI * t) * taper);
          if (drawing) context.lineTo(p.x, p.y);
          else {
            context.moveTo(p.x, p.y);
            drawing = true;
          }
        }
        // Two passes: a dark one so the line survives the pale continents, a
        // white one so it survives the deep ocean.
        context.strokeStyle = "rgba(4,14,40,0.55)";
        context.lineWidth = Math.max(2.4, 3.4 * unit);
        context.stroke();
        context.strokeStyle = "rgba(255,255,255,0.92)";
        context.lineWidth = Math.max(1, 1.4 * unit);
        context.stroke();
      }

      /*
       * Marked places. Everything from here up is drawn over a globe that is
       * near-white where the land is and near-black where the ocean is, so
       * every mark carries a dark outline and every word a dark halo — without
       * one, half of them vanish depending on where the globe has turned to.
       */
      const fontSize = Math.max(10, 11 * unit);
      context.font = `600 ${fontSize}px ${mono}`;
      context.textBaseline = "middle";
      const write = (text: string, x: number, y: number, alpha: number) => {
        context.globalAlpha = alpha;
        context.lineJoin = "round";
        context.strokeStyle = "rgba(3,9,26,0.9)";
        context.lineWidth = Math.max(2.5, 3.2 * unit);
        context.strokeText(text, x, y);
        context.fillStyle = "#ffffff";
        context.fillText(text, x, y);
      };

      /*
       * Hang a label off a marker on whichever side it fits. On a phone the
       * globe is barely wider than the panel, so a name placed to the right of
       * a marker near the right limb is simply cut off by the canvas edge.
       */
      const hang = (text: string, x: number, y: number, side: number, alpha: number) => {
        const room = context.measureText(text).width + 18 * unit;
        const right = side > 0 ? x + room < width - 4 : x - room < 4;
        context.textAlign = right ? "left" : "right";
        write(text, x + (right ? 15 : -15) * unit, y, alpha);
      };

      for (const mark of marks) {
        const p = place(mark.lon, mark.lat);
        if (p.hidden || p.z <= 0) continue;
        // Fade out over the last few degrees rather than blinking off the edge.
        const edge = Math.max(0, Math.min(1, p.z * 6));

        if (mark.lit) {
          context.globalAlpha = edge;
          context.fillStyle = "rgba(20,70,180,0.42)";
          context.beginPath();
          context.arc(p.x, p.y, 6.8 * unit, 0, TAU);
          context.fill();

          context.strokeStyle = "rgba(3,9,26,0.75)";
          context.lineWidth = Math.max(2.4, 3.2 * unit);
          context.beginPath();
          context.arc(p.x, p.y, 5.4 * unit, 0, TAU);
          context.stroke();

          context.strokeStyle = "#ffffff";
          context.lineWidth = Math.max(1.2, 1.5 * unit);
          context.beginPath();
          context.arc(p.x, p.y, 5.4 * unit, 0, TAU);
          context.stroke();

          context.fillStyle = "rgba(3,9,26,0.75)";
          context.beginPath();
          context.arc(p.x, p.y, 3.9 * unit, 0, TAU);
          context.fill();
          context.fillStyle = "#ffffff";
          context.beginPath();
          context.arc(p.x, p.y, 3 * unit, 0, TAU);
          context.fill();

          if (mark.label) {
            const { dx, dy, anchor } = mark.label;
            const length = Math.hypot(dx, dy) || 1;
            const reach = 15 * unit;
            const text = mark.key.toUpperCase();
            const wide = context.measureText(text).width;
            const lx2 = p.x + (dx / length) * reach;
            const ly2 = p.y + (dy / length) * reach;
            // Keep the code inside the canvas, whichever side it was placed on.
            const right =
              anchor === "end" ? lx2 - wide < 4 : !(lx2 + wide < width - 4);
            context.textAlign = right ? "left" : "right";
            write(text, lx2, ly2, edge);
          }
        } else {
          context.globalAlpha = edge * 0.8;
          context.fillStyle = "rgba(3,9,26,0.7)";
          context.beginPath();
          context.arc(p.x, p.y, 3.4 * unit, 0, TAU);
          context.fill();
          context.fillStyle = "rgba(255,255,255,0.9)";
          context.beginPath();
          context.arc(p.x, p.y, 2.1 * unit, 0, TAU);
          context.fill();
        }
        context.globalAlpha = 1;
      }

      /* The studio. An open ring with a crosshair, never a filled marker, so
         it does not read as one more of the places being pointed at. */
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

        hang(homeName, home3.x, home3.y + 18 * unit, 1, edge);
        context.globalAlpha = 1;
      }

      drawn.current += 1;
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

      const view = centre.current;
      const journey = fly.current;
      if (journey) {
        const t = reduced ? 1 : Math.min(1, (now - journey.start) / 1400);
        const eased = 1 - Math.pow(1 - t, 3);
        view.lon = journey.lon0 + journey.dLon * eased;
        view.lat = journey.lat0 + (journey.lat1 - journey.lat0) * eased;
        if (t >= 1) {
          fly.current = null;
          // Keep turning afterwards: the far half of a language's places would
          // otherwise stay behind the globe for as long as it is selected.
          spin.current = true;
        }
      } else if (spin.current && !drag.current && now >= idleUntil.current && !reduced) {
        view.lon += spinRate.current * delta;
      }
      view.lon = ((((view.lon + 180) % 360) + 360) % 360) - 180;

      if (sweep.current < 1) {
        sweep.current = reduced ? 1 : Math.min(1, sweep.current + delta / 0.9);
      }

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

    /* Dragging spins the globe. */
    const onDown = (event: PointerEvent) => {
      drag.current = {
        x: event.clientX,
        y: event.clientY,
        lon: centre.current.lon,
        lat: centre.current.lat,
      };
      fly.current = null;
      canvas.setPointerCapture(event.pointerId);
    };
    const onMove = (event: PointerEvent) => {
      const held = drag.current;
      if (!held) return;
      const radius = (Math.min(width, height) / 2) * 0.84 || 1;
      centre.current.lon = held.lon - ((event.clientX - held.x) / radius) * 90;
      centre.current.lat = Math.max(
        -72,
        Math.min(72, held.lat - ((event.clientY - held.y) / radius) * 90),
      );
    };
    const onUp = (event: PointerEvent) => {
      if (!drag.current) return;
      drag.current = null;
      idleUntil.current = performance.now() + 2600;
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
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
