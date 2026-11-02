// Carousel: how much time you get back when someone else cleans. New layout language
// (giant numerals, data grids, full-bleed colour blocks); brand colours and Inter kept.
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const L = path.join(__dirname, '../logo/'), OUT = path.join(__dirname, '../social/cas/');
const svg = (f, w) => fs.readFileSync(L + f, 'utf8').replace(/width="[\d.]+" height="[\d.]+"/, `width="${w}" style="display:block;height:auto"`);
const C = { navy: '#0B2D5B', blue: '#1B63D6', sky: '#7FB0F5', pale: '#EAF2FD', mist: '#BFD7FA', ink: '#3A5478', white: '#FFFFFF' };
const N = 6;
const css = `*{margin:0;padding:0;box-sizing:border-box}body{font-family:Inter;-webkit-font-smoothing:antialiased}
.s{width:1123px;height:1404px;position:relative;overflow:hidden;padding:80px 88px;display:flex;flex-direction:column}
.d{font-family:'Inter Display';letter-spacing:-0.045em;line-height:.9}
.lab{font-size:20px;font-weight:600;letter-spacing:.22em;text-transform:uppercase}
.num{font-variant-numeric:tabular-nums}`;
// top bar: label left, page counter as segmented progress right
const top = (label, i, fg, dim) => `<div style="display:flex;justify-content:space-between;align-items:center"><span class="lab" style="color:${fg}">${label}</span><div style="display:flex;gap:8px;align-items:center">${Array.from({ length: N }, (_, k) => `<span style="width:${k === i ? 44 : 14}px;height:8px;border-radius:4px;background:${k <= i ? fg : dim}"></span>`).join('')}</div></div>`;
const swipe = (fg) => `<div style="display:flex;align-items:center;gap:14px;font-size:22px;font-weight:600;color:${fg}">Posuňte<svg viewBox="0 0 24 24" width="30" height="30"><path d="M4 12h15M13 5l7 7-7 7" fill="none" stroke="${fg}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></div>`;

// stopwatch drawn with 60 ticks, 3 o'clock-ish arc filled
const stopwatch = (size, ring, fill, tick) => {
  const r = 46, ticks = Array.from({ length: 60 }, (_, k) => { const a = k / 60 * 2 * Math.PI, l = k % 5 ? 3 : 7; return `<line x1="${50 + Math.sin(a) * r}" y1="${54 - Math.cos(a) * r}" x2="${50 + Math.sin(a) * (r - l)}" y2="${54 - Math.cos(a) * (r - l)}" stroke="${tick}" stroke-width="${k % 5 ? .8 : 1.6}" stroke-linecap="round"/>`; }).join('');
  const end = 0.25 * 2 * Math.PI, R = 36;
  return `<svg viewBox="0 0 100 104" width="${size}" style="display:block"><rect x="44" y="0" width="12" height="6" rx="2" fill="${ring}"/><circle cx="50" cy="54" r="${r + 3}" fill="none" stroke="${ring}" stroke-width="2"/>${ticks}<path d="M50 54 L50 ${54 - R} A${R} ${R} 0 0 1 ${50 + Math.sin(end) * R} ${54 - Math.cos(end) * R} Z" fill="${fill}"/><circle cx="50" cy="54" r="3" fill="${ring}"/></svg>`;
};

const slides = [
// 1 hook
`<div class="s" style="background:${C.navy};color:#fff">
  ${top('Spočítali sme to', 0, '#fff', 'rgba(255,255,255,.22)')}
  <div style="position:absolute;right:-160px;top:110px">${stopwatch(620, C.sky, C.blue, 'rgba(255,255,255,.55)')}</div>
  <h1 class="d" style="font-size:150px;font-weight:600;margin-top:auto;position:relative">Koľko<br>času vám<br>zoberie<br><span style="color:${C.sky};font-weight:400">upratovanie?</span></h1>
  <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:70px">${svg('cisty-domov-logo-feher.svg', 260)}${swipe('#fff')}</div>
</div>`,
// 2 three hours a week
`<div class="s" style="background:#fff;color:${C.navy}">
  ${top('Bežný týždeň', 1, C.blue, C.pale)}
  <p style="font-size:34px;color:${C.ink};margin-top:80px">Povedzme, že doma upratujete</p>
  <div class="d num" style="font-size:400px;font-weight:600;color:${C.blue};margin-top:10px;margin-left:-16px">3–5 h</div>
  <p class="d" style="font-size:72px;font-weight:500;margin-top:-10px">každý týždeň.</p>
  <div style="margin-top:auto;display:flex;flex-direction:column;gap:14px">
    ${[['Vysávanie a podlahy', 55, 90], ['Kúpeľňa a WC', 45, 75], ['Kuchyňa', 40, 70], ['Prach a poriadok', 40, 65]].map(([t, a, z]) => `<div style="display:flex;align-items:center;gap:20px;font-size:22px"><span style="width:250px">${t}</span><span style="display:flex;width:${z * 5}px;height:22px;border-radius:11px;overflow:hidden;background:${C.mist}"><span style="width:${a * 5}px;background:${C.blue}"></span></span><span class="num" style="color:${C.ink}">${a}–${z} min</span></div>`).join('')}
  </div>
</div>`,
// 3 156 hours a year, 52-week grid
`<div class="s" style="background:${C.blue};color:#fff">
  ${top('Za celý rok', 2, '#fff', 'rgba(255,255,255,.3)')}
  <p style="font-size:34px;color:#D6E6FC;margin-top:80px">3 až 5 hodín × 52 týždňov =</p>
  <div class="d num" style="font-size:300px;font-weight:600;margin-top:16px;margin-left:-12px">156–260</div>
  <p class="d" style="font-size:80px;font-weight:400;color:${C.mist};margin-top:-6px">hodín ročne.</p>
  <div style="margin-top:auto;display:grid;grid-template-columns:repeat(13,1fr);gap:10px">
    ${Array.from({ length: 52 }, (_, k) => `<div style="aspect-ratio:1;border-radius:8px;background:#fff;opacity:${.55 + (k % 13) / 13 * .45}"></div>`).join('')}
  </div>
  <p style="font-size:20px;color:#D6E6FC;margin-top:18px">Každý štvorček je jeden týždeň s upratovaním.</p>
</div>`,
// 4 19.5 working days
`<div class="s" style="background:${C.pale};color:${C.navy}">
  ${top('To je', 3, C.navy, C.mist)}
  <div style="display:flex;align-items:flex-end;gap:24px;margin-top:70px"><div class="d num" style="font-size:300px;font-weight:600;color:${C.navy};margin-left:-12px"><span style="font-size:110px;font-weight:500;letter-spacing:-0.02em;margin-right:18px">až</span>32,5</div></div>
  <p class="d" style="font-size:80px;font-weight:400;color:${C.blue};margin-top:40px">pracovného dňa.</p>
  <p style="font-size:30px;line-height:1.45;color:${C.ink};margin-top:30px;max-width:760px">Viac ako mesiac v práci. Len bez výplaty a bez dovolenky.</p>
  <div style="margin-top:auto;display:grid;grid-template-columns:repeat(5,1fr);gap:10px 14px">
    ${['Po', 'Ut', 'St', 'Št', 'Pi'].map(d => `<div style="font-size:18px;font-weight:600;letter-spacing:.14em;color:${C.ink};text-align:center">${d.toUpperCase()}</div>`).join('')}
    ${Array.from({ length: 35 }, (_, k) => `<div style="height:40px;border-radius:10px;background:${k < 19 ? C.navy : k === 19 ? `linear-gradient(90deg,${C.navy} 50%,${C.sky} 50%)` : k < 32 ? C.sky : k === 32 ? `linear-gradient(90deg,${C.sky} 50%,#fff 50%)` : '#fff'}"></div>`).join('')}
  </div>
  <p style="font-size:20px;color:${C.ink};margin-top:18px"><span style="display:inline-block;width:14px;height:14px;border-radius:4px;background:${C.navy};margin-right:8px"></span>3 h týždenne = 19,5 dňa &nbsp;&nbsp;<span style="display:inline-block;width:14px;height:14px;border-radius:4px;background:${C.sky};margin-right:8px"></span>5 h týždenne = 32,5 dňa &nbsp;&nbsp;(8-hodinový deň)</p>
</div>`,
// 5 what would you do with it
`<div class="s" style="background:#fff;color:${C.navy}">
  ${top('A teraz si predstavte', 4, C.blue, C.pale)}
  <h1 class="d" style="font-size:112px;font-weight:600;margin-top:70px">Čo by ste robili<br><span style="color:${C.blue};font-weight:400">s 3 až 5 hodinami<br>navyše?</span></h1>
  <div style="margin-top:auto;display:flex;flex-direction:column;gap:18px">
    ${[['Výlet s deťmi', 180, C.blue, '#fff'], ['Dva tréningy', 120, C.pale, C.navy], ['Večera s priateľmi', 150, C.navy, '#fff'], ['Konečne dočítať knihu', 90, C.pale, C.navy]].map(([t, m, bg, fg]) => `<div style="display:flex;align-items:center;justify-content:space-between;border-radius:999px;padding:26px 34px;background:${bg};color:${fg};width:${520 + m * 2.4}px;font-size:30px;font-weight:600"><span>${t}</span><span class="num" style="font-weight:500;opacity:.8">${String(m / 60).replace('.', ',')} h</span></div>`).join('')}
  </div>
</div>`,
// 6 CTA
`<div class="s" style="background:${C.blue};color:#fff">
  ${top('Čistý domov', 5, '#fff', 'rgba(255,255,255,.3)')}
  <div style="position:absolute;left:88px;right:88px;top:250px;display:grid;grid-template-columns:repeat(13,1fr);gap:10px;opacity:.16">${Array.from({ length: 52 }, () => `<div style="aspect-ratio:1;border-radius:8px;background:#fff"></div>`).join('')}</div>
  <h1 class="d" style="font-size:118px;font-weight:600;margin-top:auto;position:relative">My upratujeme.<br><span style="font-weight:400;color:${C.mist}">Vy máte voľno.</span></h1>
  <p style="font-size:30px;line-height:1.45;color:#D6E6FC;margin-top:34px;max-width:760px;position:relative">Až 260 hodín ročne späť pre vás. Prídeme s vlastnými pomôckami, pevná cena vopred.</p>
  <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:70px;position:relative">
    ${svg('cisty-domov-logo-feher.svg', 260)}
    <div style="display:flex;flex-direction:column;align-items:flex-end;gap:14px"><div style="font-size:30px;font-weight:600">0918 188 252</div><div style="display:inline-flex;align-items:center;gap:14px;background:#fff;color:${C.blue};border-radius:999px;padding:20px 32px;font-size:26px;font-weight:600">Rezervovať termín<svg viewBox="0 0 24 24" width="26" height="26"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="${C.blue}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div style="font-size:22px;font-weight:500;color:#D6E6FC">mojcistydomov.sk</div></div>
  </div>
</div>`];

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1123, height: 1404 }, deviceScaleFactor: 1080 / 1123 * 2 });
  for (let i = 0; i < slides.length; i++) {
    await p.setContent(`<style>${css}</style>${slides[i]}`); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: `${OUT}${i + 1}.png` });
    if (process.argv[2]) await p.screenshot({ path: `${process.argv[2]}/cas-${i + 1}.jpg`, type: 'jpeg', quality: 70, scale: 'css' });
  }
  await b.close();
})();
