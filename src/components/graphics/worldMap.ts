/**
 * The world as a dot matrix — geometry only, no React.
 *
 * The map is drawn the way a station destination board is: one lamp every five
 * degrees of longitude, lit where there is land. Coastlines are approximated by
 * a union of longitude/latitude boxes minus a set of sea boxes, which is enough
 * at this resolution — the eye reads continents from their gross shape, and the
 * matrix is meant to look built out of lamps rather than traced.
 *
 * Projection is equirectangular, so degrees map linearly to units in both axes
 * and a marker's position is a straight multiplication. Antarctica is outside
 * the window; nothing on the map depends on it.
 */

export const LON_MIN = -180;
export const LON_MAX = 180;
export const LAT_MAX = 84;
export const LAT_MIN = -56;

/** One lamp every 5°, spaced 10 user units apart. */
export const STEP_DEG = 5;
export const STEP_PX = 10;

export const COLS = (LON_MAX - LON_MIN) / STEP_DEG; // 72
export const ROWS = (LAT_MAX - LAT_MIN) / STEP_DEG; // 28
export const MAP_W = COLS * STEP_PX; // 720
export const MAP_H = ROWS * STEP_PX; // 280

export function project(lon: number, lat: number): { x: number; y: number } {
  return {
    x: ((lon - LON_MIN) / STEP_DEG) * STEP_PX,
    y: ((LAT_MAX - lat) / STEP_DEG) * STEP_PX,
  };
}

/** [lonMin, lonMax, latMin, latMax] */
type Box = [number, number, number, number];

const LAND: Box[] = [
  // --- North America ---
  [-168, -141, 55, 71],   // Alaska
  [-141, -58, 50, 70],    // Canada
  [-125, -62, 70, 80],    // Arctic archipelago
  [-125, -68, 25, 50],    // United States
  [-115, -97, 20, 32],    // northern Mexico
  [-105, -88, 15, 22],    // southern Mexico
  [-92, -83, 13, 21],     // Yucatán
  [-90, -77, 7, 15],      // Central America
  [-85, -75, 20, 23],     // Cuba
  [-56, -26, 59, 83],     // Greenland
  [-68, -45, 70, 80],
  [-24, -15, 63, 67],     // Iceland

  // --- South America ---
  [-81, -35, -4, 12],
  [-79, -34, -20, -4],
  [-73, -38, -34, -20],
  [-73, -53, -44, -34],
  [-75, -65, -55, -44],

  // --- Europe ---
  [-9, 3, 36, 44],        // Iberia
  [-5, 24, 43, 55],       // France to Poland
  [-10, 2, 50, 59],       // British Isles
  [4, 31, 55, 71],        // Scandinavia
  [7, 18, 37, 47],        // Italy
  [13, 29, 35, 47],       // Balkans and Greece
  [22, 47, 44, 60],       // Ukraine, western Russia
  [21, 42, 54, 66],       // Baltics, northwestern Russia
  [26, 45, 36, 42],       // Anatolia

  // --- Africa ---
  [-17, 34, 20, 33],      // Maghreb and Sahara
  [-17, 43, 4, 22],       // Sahel
  [8, 48, -12, 12],       // Equatorial Africa
  [40, 51, 2, 12],        // Horn of Africa
  [11, 41, -35, -12],     // Southern Africa
  [44, 51, -26, -12],     // Madagascar

  // --- Asia ---
  [34, 60, 12, 32],       // Arabia and the Levant
  [40, 68, 25, 42],       // Caucasus, Iran, Pakistan
  [40, 90, 50, 72],       // western Russia
  [88, 180, 50, 73],      // Siberia
  [46, 88, 36, 56],       // Central Asia
  [68, 90, 8, 36],        // India
  [75, 128, 20, 52],      // China and Mongolia
  [92, 110, 8, 24],       // mainland Southeast Asia
  [95, 141, -10, 7],      // Indonesia
  [117, 127, 5, 19],      // Philippines
  [129, 146, 31, 46],     // Japan
  [125, 130, 34, 43],     // Korea

  // --- Oceania ---
  [113, 154, -39, -11],   // Australia
  [145, 149, -44, -40],   // Tasmania
  [172, 179, -42, -34],   // New Zealand, North Island
  [166, 175, -47, -40],   // New Zealand, South Island
  [140, 152, -11, -2],    // New Guinea
];

const SEA: Box[] = [
  [-95, -78, 51, 64],     // Hudson Bay
  [-97, -82, 19, 30],     // Gulf of Mexico
  [-113, -109, 23, 30],   // Gulf of California
  [-5, -1.5, 44, 47],     // Bay of Biscay
  [-1, 7, 51, 58],        // North Sea
  [16, 24, 55, 65],       // Baltic Sea
  [14, 18, 40, 45],       // Adriatic
  [28, 41, 41, 46],       // Black Sea
  [47, 55, 37, 47],       // Caspian Sea
  [33, 43, 13, 29],       // Red Sea
  [-5, 9, -6, 4],         // Gulf of Guinea
  [-79, -68, 25, 31],     // Atlantic off the Carolinas
  [80, 92, 5, 20],        // Bay of Bengal
  [116, 130, 18, 23],     // South China Sea
  [123, 129, 24, 35],     // East China Sea
  [119, 124, 33, 40],     // Yellow Sea
  [142, 157, 50, 60],     // Sea of Okhotsk
  [136, 142, -17, -11],   // Gulf of Carpentaria
  [118, 136, -39, -34],   // Great Australian Bight
];

function inside(lon: number, lat: number, [w, e, s, n]: Box): boolean {
  return lon >= w && lon <= e && lat >= s && lat <= n;
}

function isLand(lon: number, lat: number): boolean {
  if (SEA.some((box) => inside(lon, lat, box))) return false;
  return LAND.some((box) => inside(lon, lat, box));
}

/** Lamp size inside its 10-unit cell. */
export const DOT = 3.4;

/**
 * Every lit lamp as one path — a few hundred squares in a single element
 * rather than a few hundred nodes.
 */
export const DOT_FIELD: string = (() => {
  let d = "";
  for (let row = 0; row < ROWS; row += 1) {
    const lat = LAT_MAX - (row + 0.5) * STEP_DEG;
    for (let col = 0; col < COLS; col += 1) {
      const lon = LON_MIN + (col + 0.5) * STEP_DEG;
      if (!isLand(lon, lat)) continue;
      const x = col * STEP_PX + (STEP_PX - DOT) / 2;
      const y = row * STEP_PX + (STEP_PX - DOT) / 2;
      d += `M${x} ${y}h${DOT}v${DOT}h-${DOT}z`;
    }
  }
  return d;
})();

/* ------------------------------------------------------------------ *
 * Where the studio's languages are spoken.
 *
 * These are places where the language is official or in everyday public use —
 * geography, not a claim about the school. Each region carries its own points
 * so a country the size of Russia is not represented by a single lamp.
 * ------------------------------------------------------------------ */

export type RegionKey =
  | "gb" | "ie" | "us" | "ca" | "au" | "nz" | "za" | "in"
  | "de" | "at" | "ch"
  | "ru" | "by" | "kz"
  | "es" | "mx" | "co" | "pe" | "cl" | "ar"
  | "it" | "sk" | "hu";

type Region = {
  points: [number, number][];
  /**
   * Where the code sits relative to the first point. Placed by hand rather
   * than by a rule: Germany, Austria and Switzerland are a few units apart on
   * this board, and only a deliberate arrangement keeps three labels legible
   * in that space.
   */
  dx: number;
  dy: number;
  anchor: "start" | "end";
};

export const REGIONS: Record<RegionKey, Region> = {
  gb: { points: [[-2, 54]], dx: 11, dy: -5, anchor: "start" },
  ie: { points: [[-8, 53.3]], dx: -11, dy: 7, anchor: "end" },
  us: { points: [[-98, 39]], dx: 11, dy: 7, anchor: "start" },
  ca: { points: [[-106, 56]], dx: -11, dy: -3, anchor: "end" },
  au: { points: [[134, -25]], dx: -11, dy: 3, anchor: "end" },
  nz: { points: [[172, -42]], dx: -11, dy: 9, anchor: "end" },
  za: { points: [[25, -29]], dx: 11, dy: 3, anchor: "start" },
  in: { points: [[79, 22]], dx: 11, dy: -3, anchor: "start" },

  de: { points: [[10.4, 51.2]], dx: -11, dy: -8, anchor: "end" },
  at: { points: [[14.5, 47.6]], dx: 11, dy: 2, anchor: "start" },
  ch: { points: [[8.2, 46.8]], dx: -11, dy: 11, anchor: "end" },

  ru: {
    points: [
      [38, 56],
      [88, 58],
      [132, 54],
    ],
    dx: 11,
    dy: -6,
    anchor: "start",
  },
  by: { points: [[28, 53.7]], dx: -11, dy: 2, anchor: "end" },
  kz: { points: [[68, 48]], dx: 11, dy: 10, anchor: "start" },

  es: { points: [[-3.7, 40.4]], dx: 11, dy: 3, anchor: "start" },
  mx: { points: [[-102, 23]], dx: -11, dy: -3, anchor: "end" },
  co: { points: [[-74, 4]], dx: 11, dy: -3, anchor: "start" },
  pe: { points: [[-76, -10]], dx: -11, dy: 3, anchor: "end" },
  cl: { points: [[-71, -33]], dx: -11, dy: 3, anchor: "end" },
  ar: { points: [[-64, -34]], dx: 11, dy: 7, anchor: "start" },

  it: { points: [[12.5, 42.8]], dx: 11, dy: 9, anchor: "start" },
  sk: { points: [[19.5, 48.7]], dx: 12, dy: -5, anchor: "start" },
  hu: { points: [[19, 47.2]], dx: 12, dy: 10, anchor: "start" },
};

/** Badge code → the regions marked for it. */
export const LANGUAGE_REGIONS: Record<string, RegionKey[]> = {
  EN: ["gb", "ie", "us", "ca", "au", "nz", "za", "in"],
  DE: ["de", "at", "ch"],
  RU: ["ru", "by", "kz"],
  ES: ["es", "mx", "co", "pe", "cl", "ar"],
  IT: ["it", "ch"],
  SK: ["sk"],
  HU: ["hu"],
};

/** The studio in Dunajská Streda, as longitude and latitude. */
export const STUDIO_LONLAT: [number, number] = [17.63, 47.99];

export type Place = {
  key: RegionKey;
  code: string;
  lon: number;
  lat: number;
  /** Preferred side for a label anchored at this point. */
  label: { dx: number; dy: number; anchor: "start" | "end" };
};

/** Every place one language is spoken, in degrees — what the globe works in. */
export function placesFor(code: string): Place[] {
  return (LANGUAGE_REGIONS[code] ?? []).flatMap((key) => {
    const region = REGIONS[key];
    const label = { dx: region.dx, dy: region.dy, anchor: region.anchor };
    return region.points.map(([lon, lat]) => ({ key, code, lon, lat, label }));
  });
}

export type Marker = {
  key: RegionKey;
  code: string;
  x: number;
  y: number;
  /** Only the first point of a region is labelled; the rest would repeat it. */
  label?: { dx: number; dy: number; anchor: "start" | "end" };
};

/** Every marked point for one language, already projected. */
export function markersFor(code: string): Marker[] {
  return (LANGUAGE_REGIONS[code] ?? []).flatMap((key) => {
    const region = REGIONS[key];
    return region.points.map(([lon, lat], i) => ({
      key,
      code,
      ...project(lon, lat),
      ...(i === 0
        ? { label: { dx: region.dx, dy: region.dy, anchor: region.anchor } }
        : {}),
    }));
  });
}

/**
 * The studio itself, on Korzo Bélu Bartóka in Dunajská Streda. Every route
 * drawn on the board leaves from here.
 */
export const STUDIO = project(17.63, 47.99);

/**
 * A bowed route from the studio to a marked place.
 *
 * Returns null only for Slovakia and Hungary, which sit on top of the studio —
 * and that is the point rather than a gap: their marker is the classroom. Every
 * other place gets a line, so the arc lengths themselves compare a language's
 * reach: a short hop to Vienna against a sweep to Auckland.
 */
export function routeTo(point: { x: number; y: number }): string | null {
  const dx = point.x - STUDIO.x;
  const dy = point.y - STUDIO.y;
  const length = Math.hypot(dx, dy);
  if (length < 6) return null;

  // Push the control point off the chord rather than straight up, so a route
  // due south bows as much as one due west instead of coming out a straight line.
  let px = dy / length;
  let py = -dx / length;
  if (py > 0) {
    px = -px;
    py = -py;
  }

  const bow = Math.max(4, Math.min(length * 0.24, 68));
  const cx = STUDIO.x + dx / 2 + px * bow;
  const cy = STUDIO.y + dy / 2 + py * bow;
  return `M${STUDIO.x} ${STUDIO.y}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${point.x} ${point.y}`;
}
