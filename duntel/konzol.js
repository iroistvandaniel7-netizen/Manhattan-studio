// Duntel: console cleaning poster (PS5 / Xbox) with the GTA 6 hook. 1080×1350, Anton.
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const A = f => path.join(__dirname, 'assets', f);
const uri = f => `data:${{ png: 'image/png', jpg: 'image/jpeg', woff2: 'font/woff2' }[f.split('.').pop()]};base64,${fs.readFileSync(A(f)).toString('base64')}`;
const CY = '#3EC4F2', NAVY = '#06173A';
// rough brush-stroke band
const brush = (w, h, fill) => {
  const pts = [], n = 40;
  for (let k = 0; k <= n; k++) pts.push(`${(k / n) * w},${(k % 2 ? 4 : 0) + Math.sin(k * 1.7) * 5}`);
  for (let k = n; k >= 0; k--) pts.push(`${(k / n) * w + (k === n ? 14 : 0)},${h - (k % 3 ? 3 : 0) + Math.cos(k * 1.3) * 6}`);
  return `<svg viewBox="-20 -12 ${w + 40} ${h + 24}" width="${w + 40}" height="${h + 24}" style="position:absolute;left:-20px;top:-12px;overflow:visible"><polygon points="${pts.join(' ')}" fill="${fill}"/><polygon points="-18,8 0,2 0,${h - 4} -12,${h - 10}" fill="${fill}"/></svg>`;
};
const star = (size, fill) => { const p = []; for (let k = 0; k < 32; k++) { const r = k % 2 ? 41 : 50, a = k / 32 * Math.PI * 2; p.push(`${50 + Math.cos(a) * r},${50 + Math.sin(a) * r}`); } return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" style="position:absolute;inset:0"><polygon points="${p.join(' ')}" fill="${fill}"/></svg>`; };
const html = `<style>
@font-face{font-family:Anton;src:url(${uri('anton-latin-ext-400-normal.woff2')}) format('woff2');unicode-range:U+0100-02AF,U+1E00-1EFF}
@font-face{font-family:Anton;src:url(${uri('anton-latin-400-normal.woff2')}) format('woff2')}
*{margin:0;padding:0;box-sizing:border-box}
.a{font-family:Anton;text-transform:uppercase;line-height:.95;letter-spacing:.005em}
.sh{text-shadow:0 6px 0 rgba(0,0,0,.35),0 10px 30px rgba(0,0,0,.45)}
</style>
<div style="width:1080px;height:1350px;position:relative;overflow:hidden;background:${NAVY};font-family:Inter,sans-serif">
  <div style="position:absolute;inset:0 0 230px 0;background:url(${uri('gta6.jpg')}) 58% 330px/auto 1050px no-repeat"></div>
  <div style="position:absolute;inset:0;background:linear-gradient(180deg,${NAVY} 0%,#2a2370 26%,rgba(42,35,112,.5) 33%,rgba(6,23,58,0) 44%,rgba(6,23,58,0) 60%,rgba(8,40,96,.85) 74%,${NAVY} 86%)"></div>

  <div style="position:absolute;left:44px;right:44px;top:44px;text-align:center;color:#fff">
    <div class="a sh" style="font-size:88px">Hamarosan érkezik a</div>
    <div class="a sh" style="font-size:210px;margin-top:-4px"><span style="color:${CY}">GTA 6</span>!</div>
  </div>

  <div style="position:absolute;left:60px;top:395px;width:960px;height:96px;transform:rotate(-2.5deg)">
    ${brush(960, 96, CY)}
    <div class="a" style="position:relative;color:${NAVY};font-size:56px;line-height:96px;text-align:center">Ne hagyd, hogy akadozzon a konzolod!</div>
  </div>

  <div style="position:absolute;left:40px;top:720px;width:470px;padding:12px 12px 52px;background:#fff;transform:rotate(-5deg);box-shadow:0 20px 40px rgba(0,0,0,.45)">
    <div style="height:330px;background:url(${uri('technikus.png')}) 62% 45%/cover"></div>
    <div class="a" style="position:absolute;left:0;right:0;bottom:8px;text-align:center;color:${NAVY};font-size:32px">Belülről is tisztára</div>
  </div>

  <img src="${uri('xbox.png')}" style="position:absolute;right:250px;top:800px;height:300px;filter:drop-shadow(0 18px 24px rgba(0,0,0,.5))">
  <img src="${uri('ps5.png')}" style="position:absolute;right:20px;top:690px;height:430px;filter:drop-shadow(0 18px 24px rgba(0,0,0,.5))">

  <div style="position:absolute;left:430px;top:660px;width:230px;height:230px;transform:rotate(-10deg)">
    ${star(230, CY)}
    <div class="a" style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;color:${NAVY};text-align:center">
      <span style="font-size:52px">PS5</span><span style="font-size:30px">&amp;</span><span style="font-size:52px">Xbox</span><span style="font-size:26px;margin-top:2px">tisztítás</span>
    </div>
  </div>

  <div style="position:absolute;left:0;right:0;bottom:0;height:230px;background:${NAVY};border-top:6px solid ${CY};display:flex;align-items:center;gap:36px;padding:0 50px">
    <img src="${uri('duntel-logo-white.png')}" style="height:110px;flex:none">
    <div style="color:#fff">
      <div class="a" style="font-size:50px">Hozd be hozzánk, <span style="color:${CY}">mi kitisztítjuk!</span></div>
      <div class="a" style="font-size:34px;margin-top:10px;color:#cfe3f5">Várunk szeretettel! &nbsp;📍 Max, Dunaszerdahely</div>
      <div style="font-size:20px;margin-top:10px;color:#8fb0cf;font-weight:600;letter-spacing:.06em">ČISTENIE KONZOL PS5 A XBOX</div>
    </div>
  </div>
</div>`;
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 2 });
  await p.setContent(html); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  await p.screenshot({ path: path.join(__dirname, 'duntel-konzol-tisztitas.png') });
  if (process.argv[2]) await p.screenshot({ path: process.argv[2] + '/duntel.jpg', type: 'jpeg', quality: 75, scale: 'css' });
  await b.close();
})();
