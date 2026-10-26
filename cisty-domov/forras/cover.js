// Facebook cover (1640×624) in the style of poster 1. Key content stays in the centre
// so the mobile crop (about the middle 68% of the width) keeps it.
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const woman = require('./woman.js');
const OUT = path.join(__dirname, '../facebook/');
fs.mkdirSync(OUT, { recursive: true });
const house = `<path d="M50 10 L90 43 L90 90 L10 90 L10 43 Z" fill="#EAF2FD" stroke="#EAF2FD" stroke-width="10" stroke-linejoin="round"/><path d="M50 42 C51.8 56 55 59.6 69 61.5 C55 63.4 51.8 67 50 81 C48.2 67 45 63.4 31 61.5 C45 59.6 48.2 56 50 42 Z" fill="#fff"/>`;
const T = {
  sk: { eyebrow: 'Upratovanie domácností a kancelárií', l1: 'Čistý domov.', l2: 'Viac voľného času.', sub: 'Byty a domy · Generálne upratovanie · Okná · Kancelárie' },
  hu: { eyebrow: 'Otthoni és irodai takarítás', l1: 'Tiszta otthon.', l2: 'Több szabad idő.', sub: 'Lakások, házak · Nagytakarítás · Ablakok · Irodák' },
};
const page = t => `<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Inter;-webkit-font-smoothing:antialiased}
.c{width:1640px;height:624px;position:relative;overflow:hidden;background:#fff;color:#0B2D5B}
.d{font-family:'Inter Display';letter-spacing:-0.035em;line-height:.98}</style>
<div class="c">
  <svg viewBox="0 0 100 100" style="position:absolute;width:640px;left:930px;top:40px">${house}</svg>
  <div style="position:absolute;width:280px;left:1080px;top:36px">${woman({ bottle: '#DCE9FB' }).replace('<svg ', '<svg style="display:block;width:100%;height:auto" ')}</div>
  <div style="position:absolute;left:330px;top:150px;width:720px">
    <div style="font-size:19px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#1B63D6">${t.eyebrow}</div>
    <h1 class="d" style="font-size:88px;font-weight:600;margin-top:26px">${t.l1}<br><span style="color:#1B63D6;font-weight:400">${t.l2}</span></h1>
    <p style="font-size:24px;color:#3A5478;margin-top:30px">${t.sub}</p>
  </div>
</div>`;
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1640, height: 624 } });
  for (const [k, t] of Object.entries(T)) {
    await p.setContent(page(t)); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: OUT + `facebook-cover-${k}.png` });
  }
  await b.close();
})();
