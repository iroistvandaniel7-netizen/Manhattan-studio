// Duntel console cleaning poster, landscape 1350×1080, exported as a layered PSD
// (every element its own layer, headline and info texts as editable Anton text layers)
// plus a flat PNG. Run with NODE_PATH pointing at a folder that has ag-psd and pngjs.
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const { writePsdBuffer } = require('ag-psd'); const { PNG } = require('pngjs');
const A = f => path.join(__dirname, 'assets', f);
const uri = f => `data:${{ png: 'image/png', jpg: 'image/jpeg', woff2: 'font/woff2' }[f.split('.').pop()]};base64,${fs.readFileSync(A(f)).toString('base64')}`;
const W = 1350, H = 1080, CY = '#3EC4F2', NAVY = '#06173A';

const brush = (w, h, fill) => {
  const pts = [], n = 40;
  for (let k = 0; k <= n; k++) pts.push(`${(k / n) * w},${(k % 2 ? 4 : 0) + Math.sin(k * 1.7) * 5}`);
  for (let k = n; k >= 0; k--) pts.push(`${(k / n) * w + (k === n ? 14 : 0)},${h - (k % 3 ? 3 : 0) + Math.cos(k * 1.3) * 6}`);
  return `<svg viewBox="-20 -12 ${w + 40} ${h + 24}" width="${w + 40}" height="${h + 24}" style="position:absolute;left:-20px;top:-12px;overflow:visible"><polygon points="${pts.join(' ')}" fill="${fill}"/><polygon points="-18,8 0,2 0,${h - 4} -12,${h - 10}" fill="${fill}"/></svg>`;
};
const star = (size, fill) => { const p = []; for (let k = 0; k < 32; k++) { const r = k % 2 ? 41 : 50, a = k / 32 * Math.PI * 2; p.push(`${50 + Math.cos(a) * r},${50 + Math.sin(a) * r}`); } return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" style="display:block"><polygon points="${p.join(' ')}" fill="${fill}"/></svg>`; };

// Every top-level [data-layer] becomes one PSD layer, listed bottom to top.
// [data-text] layers also carry editable text: runs of [text, colour].
const L = (name, style, inner, text) => `<div data-layer="${name}"${text ? ` data-text='${JSON.stringify(text)}'` : ''} style="position:absolute;${style}">${inner}</div>`;
const T = 'font-family:Anton;text-transform:uppercase;line-height:1;white-space:nowrap;';
const SH = 'text-shadow:0 6px 0 rgba(0,0,0,.35),0 10px 30px rgba(0,0,0,.45);';
const layers = [
  L('Háttér', `inset:0;background:${NAVY}`, ''),
  L('GTA 6 kép', `left:0;top:0;width:${W}px;height:900px;background:url(${uri('gta6.jpg')}) right 0 top 0/auto 900px no-repeat`, ''),
  L('Sötétítés', `inset:0;background:linear-gradient(90deg,${NAVY} 0%,rgba(6,23,58,.88) 30%,rgba(6,23,58,.25) 55%,rgba(6,23,58,0) 70%),linear-gradient(180deg,rgba(6,23,58,0) 62%,${NAVY} 84%)`, ''),
  L('Cím 1', `left:56px;top:46px;${T}${SH}font-size:84px;color:#fff`, 'Hamarosan érkezik a', { runs: [['HAMAROSAN ÉRKEZIK A', '#ffffff']], size: 84 }),
  L('Cím 2', `left:52px;top:138px;${T}${SH}font-size:230px;color:#fff`, `<span style="color:${CY}">GTA 6</span>!`, { runs: [['GTA 6', CY], ['!', '#ffffff']], size: 230 }),
  L('Ecsetcsík', `left:56px;top:412px;width:720px;height:84px;transform:rotate(-2.5deg)`, brush(720, 84, CY)),
  L('Ecsetcsík szöveg', `left:56px;top:412px;width:720px;height:84px;transform:rotate(-2.5deg);${T}font-size:46px;line-height:84px;text-align:center;color:${NAVY}`, 'Ne hagyd, hogy akadozzon a konzolod!', { runs: [['NE HAGYD, HOGY AKADOZZON A KONZOLOD!', NAVY]], size: 46, center: true, rotate: -2.5 }),
  L('Fotó keret és kép', `left:56px;top:560px;width:430px;padding:11px 11px 50px;background:#fff;transform:rotate(-5deg);box-shadow:0 20px 40px rgba(0,0,0,.45)`, `<div style="height:270px;background:url(${uri('technikus.png')}) 62% 45%/cover"></div><div style="${T}position:absolute;left:0;right:0;bottom:12px;text-align:center;color:${NAVY};font-size:30px">Belülről is tisztára</div>`),
  L('Xbox', `left:850px;top:560px;height:290px;filter:drop-shadow(0 18px 24px rgba(0,0,0,.5))`, `<img src="${uri('xbox.png')}" style="height:290px;display:block">`),
  L('PS5', `right:30px;top:440px;height:420px;filter:drop-shadow(0 18px 24px rgba(0,0,0,.5))`, `<img src="${uri('ps5.png')}" style="height:420px;display:block">`),
  L('Matrica', `left:520px;top:560px;width:220px;height:220px;transform:rotate(-10deg)`, `${star(220, CY)}<div style="${T}position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;color:${NAVY};text-align:center"><span style="font-size:50px">PS5</span><span style="font-size:28px">&amp;</span><span style="font-size:50px">Xbox</span><span style="font-size:24px;margin-top:2px">tisztítás</span></div>`),
  L('Alsó sáv', `left:0;right:0;bottom:0;height:180px;background:${NAVY};border-top:6px solid ${CY}`, ''),
  L('Duntel logó', `left:56px;top:943px;height:100px`, `<img src="${uri('duntel-logo-white.png')}" style="height:100px;display:block">`),
  L('Alsó szöveg 1', `left:380px;top:932px;${T}font-size:52px;color:#fff`, `Hozd be hozzánk, <span style="color:${CY}">mi kitisztítjuk!</span>`, { runs: [['HOZD BE HOZZÁNK, ', '#ffffff'], ['MI KITISZTÍTJUK!', CY]], size: 52 }),
  L('Alsó szöveg 2', `left:380px;top:996px;${T}font-size:34px;color:#cfe3f5`, 'Várunk szeretettel! &nbsp;📍 Max, Dunaszerdahely', null),
  L('Alsó szöveg 3', `left:380px;top:1042px;font-family:Inter,sans-serif;font-weight:600;font-size:19px;letter-spacing:.06em;color:#8fb0cf;white-space:nowrap`, 'ČISTENIE KONZOL PS5 A XBOX', { runs: [['ČISTENIE KONZOL PS5 A XBOX', '#8fb0cf']], size: 19, font: 'Inter-SemiBold' }),
];
const html = `<style>
@font-face{font-family:Anton;src:url(${uri('anton-latin-ext-400-normal.woff2')}) format('woff2');unicode-range:U+0100-02AF,U+1E00-1EFF}
@font-face{font-family:Anton;src:url(${uri('anton-latin-400-normal.woff2')}) format('woff2')}
*{margin:0;padding:0;box-sizing:border-box}body{width:${W}px;height:${H}px;position:relative;overflow:hidden}
</style>${layers.join('')}`;

const rgb = h => ({ r: parseInt(h.slice(1, 3), 16), g: parseInt(h.slice(3, 5), 16), b: parseInt(h.slice(5, 7), 16) });
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: W, height: H } });
  await p.setContent(html); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  const out = path.join(__dirname, 'duntel-konzol-1350x1080');
  await p.screenshot({ path: out + '.png' });
  if (process.argv[2]) await p.screenshot({ path: process.argv[2] + '/duntel-land.jpg', type: 'jpeg', quality: 75 });
  // baseline of each text layer, measured in the page
  const metas = await p.evaluate(() => [...document.querySelectorAll('[data-layer]')].map(el => {
    const r = el.getBoundingClientRect(); let baseline = null;
    if (el.dataset.text) { const m = document.createElement('span'); m.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline'; el.appendChild(m); const mr = m.getBoundingClientRect(); baseline = mr.top; m.remove(); }
    return { name: el.dataset.layer, text: el.dataset.text ? JSON.parse(el.dataset.text) : null, left: r.left, right: r.right, cx: r.left + r.width / 2, baseline };
  }));
  const children = [];
  for (let i = 0; i < metas.length; i++) {
    await p.evaluate(i => document.querySelectorAll('[data-layer]').forEach((el, k) => el.style.visibility = k === i ? 'visible' : 'hidden'), i);
    const png = PNG.sync.read(await p.screenshot({ omitBackground: true }));
    let x0 = W, y0 = H, x1 = -1, y1 = -1;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (png.data[(y * W + x) * 4 + 3]) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    if (x1 < 0) continue;
    const w = x1 - x0 + 1, h = y1 - y0 + 1, data = new Uint8ClampedArray(w * h * 4);
    for (let y = 0; y < h; y++) data.set(png.data.subarray(((y + y0) * W + x0) * 4, ((y + y0) * W + x0 + w) * 4), y * w * 4);
    const layer = { name: metas[i].name, left: x0, top: y0, imageData: { width: w, height: h, data } };
    const t = metas[i].text;
    if (t) {
      const a = (t.rotate || 0) * Math.PI / 180, x = t.center ? metas[i].cx : metas[i].left;
      layer.text = {
        text: t.runs.map(r => r[0]).join(''),
        transform: [Math.cos(a), Math.sin(a), -Math.sin(a), Math.cos(a), x, metas[i].baseline],
        style: { font: { name: t.font || 'Anton-Regular' }, fontSize: t.size, fillColor: rgb(t.runs[0][1]) },
        styleRuns: t.runs.map(r => ({ length: r[0].length, style: { fillColor: rgb(r[1]) } })),
        paragraphStyle: { justification: t.center ? 'center' : 'left' },
      };
    }
    children.push(layer);
  }
  await p.evaluate(() => document.querySelectorAll('[data-layer]').forEach(el => el.style.visibility = 'visible'));
  const flat = PNG.sync.read(fs.readFileSync(out + '.png'));
  const psd = { width: W, height: H, imageData: { width: W, height: H, data: new Uint8ClampedArray(flat.data) }, children };
  fs.writeFileSync(out + '.psd', writePsdBuffer(psd, { generateThumbnail: false }));
  console.log('layers:', children.map(c => c.name + (c.text ? ' [szöveg]' : '')).join(', '));
  await b.close();
})();
