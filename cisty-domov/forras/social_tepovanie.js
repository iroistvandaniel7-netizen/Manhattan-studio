// Social post about sofa upholstery cleaning (tepovanie), built around the client's own photo.
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const woman = require('./woman.js');
const L = path.join(__dirname, '../logo/'), OUT = path.join(__dirname, '../social/');
const svg = (f, w) => fs.readFileSync(L + f, 'utf8').replace(/width="[\d.]+" height="[\d.]+"/, `width="${w}" style="display:block;height:auto"`);
const photo = 'data:image/webp;base64,' + fs.readFileSync(path.join(__dirname, '../foto/tepovanie-sedacky.webp')).toString('base64');
const pill = (t, x, dark) => `<span style="position:absolute;bottom:28px;left:${x}px;font-size:16px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;padding:9px 16px;border-radius:999px;background:${dark ? '#0B2D5B' : '#fff'};color:${dark ? '#fff' : '#0B2D5B'}">${t}</span>`;
const html = `<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Inter;-webkit-font-smoothing:antialiased}
.d{font-family:'Inter Display';letter-spacing:-0.035em;line-height:.98}</style>
<div style="width:1123px;height:1404px;background:#fff;color:#0B2D5B;display:flex;flex-direction:column;overflow:hidden">
  <div style="position:relative;height:800px;background:url(${photo}) center bottom/cover">
    ${pill('Po', 548, false)}${pill('Pred', 790, true)}
  </div>
  <div style="flex:1;padding:56px 96px 64px;display:flex;flex-direction:column;position:relative">
    <div style="font-size:19px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#1B63D6">Tepovanie sedačiek</div>
    <h1 class="d" style="font-size:92px;font-weight:600;margin-top:22px">Rozdiel uvidíte<br><span style="color:#1B63D6;font-weight:400">hneď.</span></h1>
    <p style="font-size:25px;line-height:1.45;color:#3A5478;margin-top:24px;max-width:640px">Hĺbkové čistenie sedacej súpravy, kresiel aj matracov. Odstránime škvrny, prach a nepríjemné pachy.</p>
    <div style="margin-top:auto;display:flex;justify-content:space-between;align-items:flex-end">
      ${svg('cisty-domov-logo.svg', 280)}
      <div style="text-align:right;font-size:28px;font-weight:600;line-height:1.3"><div style="font-size:15px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:#6A82A3;margin-bottom:8px">Vyžiadajte si ponuku</div>0918 188 252<br><span style="font-weight:500">mojcistydomov.sk</span></div>
    </div>
  </div>
</div>`;
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1123, height: 1404 }, deviceScaleFactor: 1080 / 1123 * 2 });
  await p.setContent(html); await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: OUT + '06-tepovanie.png' });
  if (process.argv[2]) await p.screenshot({ path: process.argv[2] + '/tep.jpg', type: 'jpeg', quality: 70, scale: 'css' });
  await b.close();
})();
