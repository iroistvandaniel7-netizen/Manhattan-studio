// Renders the website's background loop: a squeegee clearing soap film off a
// window, bubbles drifting up, soft light moving behind the glass.
//
// Frame by frame in a headless browser (deterministic, so the loop closes
// exactly), then encoded with ffmpeg to MP4 (H.264, plays everywhere) and a poster frame.
//
//   node cisty-domov/forras/video.js
//
// Output: cisty-domov/weboldal/public/video/takaritas.{mp4,jpg}
// Swap in real footage by replacing those two files — the page only knows
// the file names.

const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '../weboldal/public/video');
const FRAMES = path.resolve(__dirname, '../../.video-frames');
const W = 1280, H = 720, FPS = 24, SECONDS = 12;
const N = FPS * SECONDS;

const scene = `
<canvas id="c" width="${W}" height="${H}"></canvas>
<script>
const c = document.getElementById('c'), x = c.getContext('2d');
const W = ${W}, H = ${H}, N = ${N};
// seeded random, so every run draws the same film
let s = 7; const r = () => (s = (s * 16807) % 2147483647, (s - 1) / 2147483646);

// Soap film, painted once onto its own canvas.
const film = document.createElement('canvas'); film.width = W; film.height = H;
const f = film.getContext('2d');
function paintFilm() {
  s = 7;
  f.globalCompositeOperation = 'source-over';
  f.clearRect(0, 0, W, H);
  f.fillStyle = 'rgba(235,242,252,0.62)'; f.fillRect(0, 0, W, H);
  for (let i = 0; i < 260; i++) {
    const px = r() * W, py = r() * H, pr = 20 + r() * 90;
    const g = f.createRadialGradient(px, py, 0, px, py, pr);
    g.addColorStop(0, r() > .5 ? 'rgba(255,255,255,0.55)' : 'rgba(190,210,240,0.35)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    f.fillStyle = g; f.beginPath(); f.arc(px, py, pr, 0, 7); f.fill();
  }
  // circular swirls left by a sponge
  f.lineWidth = 3;
  for (let i = 0; i < 70; i++) {
    const px = r() * W, py = r() * H, pr = 30 + r() * 70;
    f.strokeStyle = 'rgba(255,255,255,' + (0.25 + r() * 0.35) + ')';
    f.beginPath(); f.arc(px, py, pr, r() * 6, r() * 6 + 2 + r() * 3); f.stroke();
  }
  // foam bubbles stuck to the glass
  for (let i = 0; i < 900; i++) {
    const px = r() * W, py = r() * H, pr = 1 + r() * 5;
    f.strokeStyle = 'rgba(255,255,255,0.7)'; f.lineWidth = 1;
    f.beginPath(); f.arc(px, py, pr, 0, 7); f.stroke();
  }
}

// The squeegee path: three horizontal S-strokes, top to bottom.
const BLADE = 170, BANDS = [150, 360, 570];
function bladeAt(p) { // p in 0..1 over the wiping phase
  const seg = Math.min(2, Math.floor(p * 3)), q = p * 3 - seg;
  const ease = q < .5 ? 2 * q * q : 1 - Math.pow(-2 * q + 2, 2) / 2;
  const dir = seg % 2 === 0 ? 1 : -1;
  const x0 = dir > 0 ? -140 : W + 140, x1 = dir > 0 ? W + 140 : -140;
  return { x: x0 + (x1 - x0) * ease, y: BANDS[seg] + Math.sin(ease * Math.PI * 2) * 22, dir, seg };
}

const bokeh = Array.from({ length: 18 }, () => ({ x: r() * W, y: r() * H, r: 40 + r() * 140, a: .05 + r() * .12, sp: .2 + r() * .6, ph: r() * 6 }));
const bubbles = Array.from({ length: 34 }, () => ({ x: r() * W, y0: r() * H, r: 4 + r() * 16, sp: 40 + r() * 90, ph: r() }));

paintFilm();
let last = null;

window.draw = (i) => {
  const t = i / N; // 0..1, loops
  // background: the room beyond the glass, soft and blue
  const g = x.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, '#89CFF0'); g.addColorStop(.55, '#5BB8E8'); g.addColorStop(1, '#0B2D5B');
  x.fillStyle = g; x.fillRect(0, 0, W, H);
  // window light from the top right
  const l = x.createRadialGradient(W * .85, H * .1, 0, W * .85, H * .1, W * .8);
  l.addColorStop(0, 'rgba(255,255,255,0.45)'); l.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = l; x.fillRect(0, 0, W, H);
  // bokeh drifting on a closed loop
  for (const b of bokeh) {
    const bx = b.x + Math.sin((t + b.ph) * Math.PI * 2) * 60 * b.sp;
    const by = b.y + Math.cos((t + b.ph) * Math.PI * 2) * 30 * b.sp;
    const bg = x.createRadialGradient(bx, by, 0, bx, by, b.r);
    bg.addColorStop(0, 'rgba(255,255,255,' + b.a + ')'); bg.addColorStop(1, 'rgba(255,255,255,0)');
    x.fillStyle = bg; x.beginPath(); x.arc(bx, by, b.r, 0, 7); x.fill();
  }

  // Phases: 0–.08 film settles in, .08–.78 wiping, .78–.9 clean glass, .9–1 film returns.
  const WIPE0 = .08, WIPE1 = .78;
  if (i === 0) { paintFilm(); last = null; }
  if (t >= WIPE0 && t <= WIPE1) {
    const p = (t - WIPE0) / (WIPE1 - WIPE0);
    const b = bladeAt(p);
    f.globalCompositeOperation = 'destination-out';
    f.lineCap = 'round'; f.lineWidth = BLADE * 1.25;
    if (last && last.seg === b.seg) { f.beginPath(); f.moveTo(last.x, last.y); f.lineTo(b.x, b.y); f.stroke(); }
    else { f.beginPath(); f.arc(b.x, b.y, BLADE * .62, 0, 7); f.fill(); }
    last = b;
  }
  let filmAlpha = 1;
  if (t < WIPE0) filmAlpha = t / WIPE0;
  if (t > .9) { if (t - 1 / N <= .9) paintFilm(); filmAlpha = (t - .9) / .1; }
  x.globalAlpha = filmAlpha; x.drawImage(film, 0, 0); x.globalAlpha = 1;

  // glint sweeping across the clean glass
  if (t > .74 && t < .9) {
    const q = (t - .74) / .16, gx = -300 + q * (W + 600);
    const sg = x.createLinearGradient(gx - 160, 0, gx + 160, 0);
    sg.addColorStop(0, 'rgba(255,255,255,0)'); sg.addColorStop(.5, 'rgba(255,255,255,0.28)'); sg.addColorStop(1, 'rgba(255,255,255,0)');
    x.save(); x.transform(1, 0, -.35, 1, 0, 0); x.fillStyle = sg; x.fillRect(gx - 160, 0, 320 + H, H); x.restore();
  }

  // the squeegee itself
  if (t >= WIPE0 && t <= WIPE1) {
    const b = bladeAt((t - WIPE0) / (WIPE1 - WIPE0));
    x.save(); x.translate(b.x, b.y); x.rotate(b.dir * 0.12);
    x.shadowColor = 'rgba(7,31,66,0.35)'; x.shadowBlur = 30; x.shadowOffsetY = 12;
    x.fillStyle = '#0B2D5B'; x.beginPath(); x.roundRect(-12 - b.dir * 6, -BLADE / 2 - 6, 24, BLADE + 12, 8); x.fill();
    x.shadowColor = 'transparent';
    x.fillStyle = '#89CFF0'; x.fillRect(-4 - b.dir * 16, -BLADE / 2, 8, BLADE);
    x.fillStyle = '#0B2D5B'; x.beginPath(); x.roundRect(-b.dir * 10 - 9 - b.dir * 120, -14, 130, 28, 14); x.fill();
    x.restore();
  }

  // bubbles rising over everything
  for (const u of bubbles) {
    const y = ((u.y0 - (t * u.sp * SECONDS)) % (H + 80) + H + 80) % (H + 80) - 40;
    const xx = u.x + Math.sin((t * 3 + u.ph) * Math.PI * 2) * 14;
    x.strokeStyle = 'rgba(255,255,255,0.75)'; x.lineWidth = 1.6;
    x.beginPath(); x.arc(xx, y, u.r, 0, 7); x.stroke();
    x.fillStyle = 'rgba(255,255,255,0.12)'; x.fill();
    x.fillStyle = 'rgba(255,255,255,0.85)'; x.beginPath(); x.arc(xx - u.r * .35, y - u.r * .35, u.r * .22, 0, 7); x.fill();
  }
};
const SECONDS = ${SECONDS};
</script>`;

(async () => {
  fs.rmSync(FRAMES, { recursive: true, force: true });
  fs.mkdirSync(FRAMES, { recursive: true });
  fs.mkdirSync(OUT, { recursive: true });
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: W, height: H } });
  await p.setContent(`<style>html,body{margin:0;background:#000}canvas{display:block}</style>${scene}`);
  const canvas = p.locator('#c');
  for (let i = 0; i < N; i++) {
    await p.evaluate((n) => window.draw(n), i);
    await canvas.screenshot({ path: path.join(FRAMES, String(i).padStart(4, '0') + '.png') });
  }
  await b.close();

  const ff = (args) => execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(FPS), '-i', path.join(FRAMES, '%04d.png'), ...args]);
  ff(['-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '26', '-preset', 'slow', '-movflags', '+faststart', '-an', path.join(OUT, 'takaritas.mp4')]);
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', path.join(FRAMES, String(Math.round(N * .5)).padStart(4, '0') + '.png'), '-q:v', '4', path.join(OUT, 'takaritas.jpg')]);
  fs.rmSync(FRAMES, { recursive: true, force: true });
  for (const f of fs.readdirSync(OUT)) console.log(f, Math.round(fs.statSync(path.join(OUT, f)).size / 1024) + ' KB');
})();
