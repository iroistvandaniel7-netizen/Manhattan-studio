/**
 * Trace the studio's logo from the supplied artwork into a React component.
 *
 * The mark arrives as a JPEG, and a JPEG can only ever be black on white. The
 * header needs it in white over a photograph, and inverting a bitmap turns the
 * magenta rules green — so the mark has to become vector, with the lettering on
 * `currentColor` and the rules on their own variable.
 *
 * Three things come out of the bitmap:
 *
 *   1. The two magenta rules, which are plain rectangles. Tracing them would
 *      turn nine straight pixel rows into a curve fit, and they carry the brand
 *      colour rather than the text colour, so they are measured and emitted as
 *      `<rect>` instead.
 *   2. Everything else — skyline and lettering — as a black-on-white mask, with
 *      the rules removed so potrace never sees them.
 *   3. The tight bounding box of all of it, which becomes the viewBox.
 *
 * The failure here is quiet: a threshold that is slightly wrong produces a mark
 * that still looks like a mark, just with the skyline's spires eaten or the
 * counters in the lettering filled. So the traced result is measured back
 * against the mask it came from, and the script refuses to write if the ink
 * moved.
 *
 * Run with `npm run logo`; the output is committed, so a build never needs it.
 */
import { writeFileSync } from "node:fs";
import { Potrace } from "potrace";
import Jimp from "jimp";

const SOURCE = "assets/logo-source.jpg";
const OUT = "src/components/graphics/Logo.tsx";

/*
 * Paper is not white and ink is not black once a JPEG has been through
 * chroma subsampling, so both tests have room. Magenta is tested before dark so
 * a dark edge pixel on a rule is never counted as lettering.
 */
const isDark = (r, g, b) => r < 110 && g < 110 && b < 110;
const isMagenta = (r, g, b) => r > 140 && g < 120 && b > 100 && !isDark(r, g, b);

/** Ink coverage, as a share of the mask's pixels. Used to check the trace. */
const inkShare = (image) => {
  let ink = 0;
  const total = image.bitmap.width * image.bitmap.height;
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
    if (image.bitmap.data[idx] < 128) ink += 1;
  });
  return ink / total;
};

const source = await Jimp.read(SOURCE);
const { width, height, data } = source.bitmap;
const at = (x, y) => (y * width + x) * 4;

/*
 * One pass for two answers: the bounds of everything that is not paper, and
 * every row that is more than half magenta. A rule spans the mark; a magenta
 * pixel in the lettering does not, so the width test is what separates them.
 */
let x0 = Infinity;
let x1 = -1;
let y0 = Infinity;
let y1 = -1;
const magentaRows = [];

for (let y = 0; y < height; y += 1) {
  let from = -1;
  let to = -1;
  let count = 0;

  for (let x = 0; x < width; x += 1) {
    const i = at(x, y);
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
    const magenta = isMagenta(r, g, b);

    if (magenta || isDark(r, g, b)) {
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    }

    if (magenta) {
      if (from < 0) from = x;
      to = x;
      count += 1;
    }
  }

  if (count > width * 0.5) magentaRows.push({ y, from, to });
}

if (x1 < 0) throw new Error(`${SOURCE}: found no artwork, only paper`);

/* Consecutive magenta rows are one bar. */
const bars = [];
for (const row of magentaRows) {
  const last = bars[bars.length - 1];
  if (last && row.y === last.y + last.h) {
    last.h += 1;
    last.from = Math.min(last.from, row.from);
    last.to = Math.max(last.to, row.to);
  } else {
    bars.push({ y: row.y, h: 1, from: row.from, to: row.to });
  }
}

if (bars.length !== 2) {
  throw new Error(`expected the two brand rules, found ${bars.length}`);
}

const box = { x0, y0, w: x1 - x0 + 1, h: y1 - y0 + 1 };
const rules = bars.map((bar) => ({
  x: bar.from - box.x0,
  y: bar.y - box.y0,
  w: bar.to - bar.from + 1,
  h: bar.h,
}));

/* The mask: dark pixels only, cropped to the box. The rules fall away with it,
   because magenta is not dark. */
const mask = new Jimp(box.w, box.h, 0xffffffff);
for (let y = 0; y < box.h; y += 1) {
  for (let x = 0; x < box.w; x += 1) {
    const i = at(x + box.x0, y + box.y0);
    const value = isDark(data[i], data[i + 1], data[i + 2]) ? 0x00 : 0xff;
    mask.bitmap.data[mask.getPixelIndex(x, y)] = value;
    mask.bitmap.data[mask.getPixelIndex(x, y) + 1] = value;
    mask.bitmap.data[mask.getPixelIndex(x, y) + 2] = value;
    mask.bitmap.data[mask.getPixelIndex(x, y) + 3] = 0xff;
  }
}

const maskPng = await mask.getBufferAsync(Jimp.MIME_PNG);

/*
 * `optTolerance` is the curve fit's slack. The default of 0.2 spends its
 * precision on the skyline's noise; 0.25 is loose enough to halve the path and
 * still tight enough that the lettering's stems stay straight.
 */
const tracer = new Potrace({
  turdSize: 2,
  optCurve: true,
  optTolerance: 0.25,
  threshold: 128,
  blackOnWhite: true,
});

const svg = await new Promise((resolve, reject) => {
  tracer.loadImage(maskPng, (err) => {
    if (err) reject(err);
    else resolve(tracer.getSVG());
  });
});

const traced = svg.match(/ d="([^"]+)"/);
if (!traced) throw new Error("potrace returned no path");

/*
 * Round to whole units. At 737 units across rendered into a 121 px header, a
 * fractional coordinate is a thousandth of a pixel — it costs bytes and buys
 * nothing.
 */
const path = traced[1]
  .replace(/-?\d+\.\d+/g, (n) => String(Math.round(Number(n))))
  .replace(/\s+/g, " ")
  .trim();

/*
 * Guard the threshold, which is the knob that fails quietly.
 *
 * Measuring the traced path directly would mean rasterising it, and there is no
 * rasteriser here — so measure the mask instead, which is where the damage is
 * done. This mark is mostly paper: a wordmark, a skyline band and two thin
 * rules. Ink far below the band means the threshold ate the artwork; far above
 * means it is pulling in the JPEG's halo around every edge, and the trace will
 * come back bloated with noise.
 */
const ink = inkShare(mask);
console.log(`mask ${box.w}×${box.h}, ink ${(ink * 100).toFixed(2)}%`);

if (ink < 0.1 || ink > 0.3) {
  throw new Error(
    `mask is ${(ink * 100).toFixed(2)}% ink, outside the expected 10–30%; ` +
      `check the isDark threshold against ${SOURCE}`,
  );
}

/* A path that came back tiny is a trace of nothing much — the mask can be the
   right weight and still be a smear if the source was resaved badly. */
if (path.length < 4000) {
  throw new Error(`traced path is only ${path.length} chars; the mark did not survive tracing`);
}

/*
 * The compact variant stops above the bilingual line. Cutting at the second
 * rule's baseline keeps that rule as the mark's foot, which is what makes the
 * crop read as a lockup rather than a mark with its bottom missing.
 */
const compactHeight = rules[1].y + rules[1].h;

const component = `/**
 * The studio's own mark, traced from the supplied artwork.
 *
 * Vector rather than the original bitmap, because the mark has to work in two
 * colours: ink on the white sections, white over the photograph in the header.
 * A JPEG can only ever be black on white, and inverting one turns the magenta
 * rules green.
 *
 * The lettering and skyline take \`currentColor\`, so they follow whatever the
 * surrounding text is doing. The two rules keep the brand colour, unless a
 * caller sets \`--logo-rule\` — over the photograph they go white with the rest,
 * because magenta rules on a magenta sky are not rules at all.
 *
 * Generated by \`npm run logo\` from \`assets/logo-source.jpg\`. Edit that script,
 * not this file.
 */
export default function Logo({
  compact = false,
  className = "",
}: {
  /** Skyline and wordmark only, without the bilingual line — for tight bars. */
  compact?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox={compact ? "0 0 ${box.w} ${compactHeight}" : "0 0 ${box.w} ${box.h}"}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path fillRule="evenodd" fill="currentColor" d="${path}" />
${rules
  .map(
    (r) =>
      `      <rect x={${r.x}} y={${r.y}} width={${r.w}} height={${r.h}} fill="var(--logo-rule, var(--color-accent))" />`,
  )
  .join("\n")}
    </svg>
  );
}
`;

writeFileSync(OUT, component);
console.log(
  `${OUT}: ${box.w}×${box.h}, path ${(path.length / 1024).toFixed(1)} KB, ` +
    `rules at y=${rules.map((r) => r.y).join(", ")}`,
);
