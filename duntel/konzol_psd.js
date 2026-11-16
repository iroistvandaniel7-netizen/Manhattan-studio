// Duntel console cleaning poster, landscape 1350×1080 (default) or portrait 1080×1350
// (LAYOUT=portrait), exported as a layered PSD
// (every element its own layer, headline and info texts as editable Anton text layers)
// plus a flat PNG. Run with NODE_PATH pointing at a folder that has ag-psd and pngjs.
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const { writePsdBuffer } = require('ag-psd'); const { PNG } = require('pngjs');
const A = f => path.join(__dirname, 'assets', f);
const uri = f => `data:${{ png: 'image/png', jpg: 'image/jpeg', woff2: 'font/woff2' }[f.split('.').pop()]};base64,${fs.readFileSync(A(f)).toString('base64')}`;
const PORTRAIT = process.env.LAYOUT === 'portrait';
const W = PORTRAIT ? 1080 : 1350, H = PORTRAIT ? 1350 : 1080, CY = '#3EC4F2', NAVY = '#06173A';

let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const brush = (w, h, fill) => {
  const top = [], bot = [], n = 70;
  for (let k = 0; k <= n; k++) { const x = (k / n) * w; top.push(`${x},${(rnd() - .5) * 10}`); bot.unshift(`${x + (k === n ? 30 : 0)},${h + (rnd() - .5) * 12}`); }
  const streaks = Array.from({ length: 9 }, (_, k) => { const y = 6 + k * (h - 12) / 8, len = 30 + rnd() * 70; return `<rect x="${w + 4 + rnd() * 20}" y="${y}" width="${len}" height="${3 + rnd() * 5}" rx="2" fill="${fill}" opacity="${.5 + rnd() * .5}"/><rect x="${-10 - len * rnd()}" y="${y + 3}" width="${len * .6}" height="${2 + rnd() * 4}" rx="2" fill="${fill}" opacity="${.4 + rnd() * .5}"/>`; }).join('');
  return `<svg viewBox="-90 -14 ${w + 200} ${h + 28}" width="${w + 200}" height="${h + 28}" style="position:absolute;left:-90px;top:-14px;overflow:visible"><polygon points="${top.join(' ')} ${bot.join(' ')}" fill="${fill}"/>${streaks}</svg>`;
};
const brushOld = (w, h, fill) => {
  const pts = [], n = 40;
  for (let k = 0; k <= n; k++) pts.push(`${(k / n) * w},${(k % 2 ? 4 : 0) + Math.sin(k * 1.7) * 5}`);
  for (let k = n; k >= 0; k--) pts.push(`${(k / n) * w + (k === n ? 14 : 0)},${h - (k % 3 ? 3 : 0) + Math.cos(k * 1.3) * 6}`);
  return `<svg viewBox="-20 -12 ${w + 40} ${h + 24}" width="${w + 40}" height="${h + 24}" style="position:absolute;left:-20px;top:-12px;overflow:visible"><polygon points="${pts.join(' ')}" fill="${fill}"/><polygon points="-18,8 0,2 0,${h - 4} -12,${h - 10}" fill="${fill}"/></svg>`;
};
const spray = (w, h, n) => `<svg width="${w}" height="${h}" style="display:block">${Array.from({ length: n }, () => { const x = rnd() * w, y = h * (.25 + .75 * Math.pow(rnd(), .6)), r = rnd() < .93 ? rnd() * 2.4 + .4 : rnd() * 3.5 + 2.5; return `<circle cx="${x}" cy="${y}" r="${r}" fill="${rnd() < .75 ? CY : '#ffffff'}" opacity="${.25 + rnd() * .6}"/>`; }).join('')}</svg>`;
const star = (size, fill) => { const p = []; for (let k = 0; k < 32; k++) { const r = k % 2 ? 41 : 50, a = k / 32 * Math.PI * 2; p.push(`${50 + Math.cos(a) * r},${50 + Math.sin(a) * r}`); } return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" style="display:block"><polygon points="${p.join(' ')}" fill="${fill}"/></svg>`; };

// Every top-level [data-layer] becomes one PSD layer, listed bottom to top.
// [data-text] layers also carry editable text: runs of [text, colour].
const L = (name, style, inner, text, fx) => `<div data-layer="${name}"${text ? ` data-text='${JSON.stringify(text)}'` : ''}${fx ? ` data-fx='${JSON.stringify(fx)}'` : ''} style="position:absolute;${style};${fx ? `text-shadow:0 ${fx[0]}px 0 ${fx[1]},0 ${fx[0] + 6}px 22px rgba(0,0,0,.55);` : ''}">${inner}</div>`;
const T = 'font-family:Anton;text-transform:uppercase;line-height:1;white-space:nowrap;';
const SH = '';
const P = PORTRAIT ? {
  gta: `left:0;top:330px;width:${W}px;height:800px;background:url(${uri('gta6.jpg')}) 58% 0/auto 1050px no-repeat`,
  dark: `inset:0;background:linear-gradient(180deg,${NAVY} 0%,#2a2370 26%,rgba(42,35,112,.5) 33%,rgba(6,23,58,0) 44%,rgba(6,23,58,0) 60%,rgba(8,40,96,.85) 74%,${NAVY} 86%)`,
  spray: [0, 470, 640], h1: 'left:0;right:0;top:40px;text-align:center;', h1s: 96, h2: 'left:0;right:0;top:140px;text-align:center;', h2s: 250, hc: true,
  band: [60, 410, 960, 96, 54], photo: [40, 720, 470, 330], xbox: 'right:250px;top:800px', xh: 300, ps5: 'right:20px;top:690px', ph: 430,
  tag: [190, 540, 220, 40], foot: 230, logo: [50, 1180, 110], ft: [360, 1150, 50, 1214, 34, 1262, 20],
} : {
  gta: `left:0;top:0;width:${W}px;height:900px;background:url(${uri('gta6.jpg')}) right 0 top 0/auto 900px no-repeat`,
  dark: `inset:0;background:linear-gradient(90deg,${NAVY} 0%,rgba(6,23,58,.88) 30%,rgba(6,23,58,.25) 55%,rgba(6,23,58,0) 70%),linear-gradient(180deg,rgba(6,23,58,0) 62%,${NAVY} 84%)`,
  spray: [0, 300, 600], h1: 'left:50px;top:40px;', h1s: 100, h2: 'left:46px;top:146px;', h2s: 250, hc: false,
  band: [56, 412, 720, 84, 48], photo: [56, 560, 430, 270], xbox: 'left:850px;top:560px', xh: 290, ps5: 'right:30px;top:440px', ph: 420,
  tag: [520, 560, 220, 62], foot: 180, logo: [56, 943, 100], ft: [380, 928, 56, 996, 34, 1042, 19],
};
const layers = [
  L('Háttér', `inset:0;background:${NAVY}`, ''),
  L('GTA 6 kép', P.gta, ''),
  L('Sötétítés', P.dark, ''),
  L('Festékfröccs', `left:${P.spray[0]}px;top:${P.spray[1]}px;width:${W}px;height:${P.spray[2]}px`, spray(W, P.spray[2], 420)),
  L('Cím 1', `${P.h1}${T}font-size:${P.h1s}px;color:#fff`, 'Hamarosan érkezik a', { runs: [['HAMAROSAN ÉRKEZIK A', '#ffffff']], size: P.h1s, center: P.hc }, [9, '#041029']),
  L('Cím 2', `${P.h2}${T}font-size:${P.h2s}px;color:#fff`, `<span style="color:${CY}">GTA 6</span>!`, { runs: [['GTA 6', CY], ['!', '#ffffff']], size: P.h2s, center: P.hc }, [14, '#041029']),
  L('Ecsetcsík', `left:${P.band[0]}px;top:${P.band[1]}px;width:${P.band[2]}px;height:${P.band[3]}px;transform:rotate(-2.5deg)`, brush(P.band[2], P.band[3], CY)),
  L('Ecsetcsík szöveg', `left:${P.band[0]}px;top:${P.band[1]}px;width:${P.band[2]}px;height:${P.band[3]}px;transform:rotate(-2.5deg);${T}font-size:${P.band[4]}px;line-height:${P.band[3]}px;text-align:center;color:#fff`, `Ne hagyd, hogy <span style="color:${NAVY};text-shadow:none">akadozzon</span> a konzolod!`, { runs: [['NE HAGYD, HOGY ', '#ffffff'], ['AKADOZZON', NAVY], [' A KONZOLOD!', '#ffffff']], size: P.band[4], center: true, rotate: -2.5 }, [5, '#041029']),
  L('Fotó keret és kép', `left:${P.photo[0]}px;top:${P.photo[1]}px;width:${P.photo[2]}px;padding:11px 11px 50px;background:#fff;transform:rotate(-5deg);box-shadow:0 20px 40px rgba(0,0,0,.45)`, `<div style="height:${P.photo[3]}px;background:url(${uri('technikus.png')}) 62% 45%/cover"></div><div style="${T}position:absolute;left:0;right:0;bottom:12px;text-align:center;color:${NAVY};font-size:30px">Belülről is tisztára</div>`),
  L('Xbox', `${P.xbox};height:${P.xh}px;filter:drop-shadow(0 18px 24px rgba(0,0,0,.5))`, `<img src="${uri('xbox.png')}" style="height:${P.xh}px;display:block">`),
  L('PS5', `${P.ps5};height:${P.ph}px;filter:drop-shadow(0 18px 24px rgba(0,0,0,.5))`, `<img src="${uri('ps5.png')}" style="height:${P.ph}px;display:block">`),
  L('Matrica', `left:${P.tag[0]}px;top:${P.tag[1]}px;width:${P.tag[2]}px;height:${P.tag[2]}px;transform:rotate(-10deg)`, `<svg width="${P.tag[2]}" height="${P.tag[3] + 14}" style="position:absolute;left:0;top:-${P.tag[3]}px;overflow:visible"><path d="M${P.tag[2] / 2} ${P.tag[3] + 14} C ${P.tag[2] / 2 - 4} ${P.tag[3] * .6}, ${P.tag[2] / 2 + 6} ${P.tag[3] * .3}, ${P.tag[2] / 2 + 16} 0" fill="none" stroke="#dfe8f2" stroke-width="3"/></svg>${star(P.tag[2], CY)}<div style="position:absolute;left:${P.tag[2] / 2 - 7}px;top:14px;width:14px;height:14px;border-radius:50%;background:${NAVY};box-shadow:inset 0 0 0 3px #dfe8f2"></div><div style="${T}position:absolute;inset:0;padding-top:14px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:${NAVY};text-align:center"><span style="font-size:50px">PS5</span><span style="font-size:28px">&amp;</span><span style="font-size:50px">Xbox</span><span style="font-size:24px;margin-top:2px">tisztítás</span></div>`),
  L('Alsó sáv', `left:0;right:0;bottom:0;height:${P.foot}px;background:${NAVY};border-top:6px solid ${CY}`, ''),
  L('Duntel logó', `left:${P.logo[0]}px;top:${P.logo[1]}px;height:${P.logo[2]}px`, `<img src="${uri('duntel-logo-white.png')}" style="height:${P.logo[2]}px;display:block">`),
  L('Alsó szöveg 1', `left:${P.ft[0]}px;top:${P.ft[1]}px;${T}font-size:${P.ft[2]}px;color:#fff`, `Hozd be hozzánk, <span style="color:${CY}">mi kitisztítjuk!</span>`, { runs: [['HOZD BE HOZZÁNK, ', '#ffffff'], ['MI KITISZTÍTJUK!', CY]], size: P.ft[2] }, [5, '#000000']),
  L('Alsó szöveg 2', `left:${P.ft[0]}px;top:${P.ft[3]}px;${T}font-size:${P.ft[4]}px;color:#cfe3f5`, 'Várunk szeretettel! &nbsp;📍 Max, Dunaszerdahely', null),
  L('Alsó szöveg 3', `left:${P.ft[0]}px;top:${P.ft[5]}px;font-family:Inter,sans-serif;font-weight:600;font-size:${P.ft[6]}px;letter-spacing:.06em;color:#8fb0cf;white-space:nowrap`, 'ČISTENIE KONZOL PS5 A XBOX', { runs: [['ČISTENIE KONZOL PS5 A XBOX', '#8fb0cf']], size: P.ft[6], font: 'Inter-SemiBold' }),
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
  const out = path.join(__dirname, PORTRAIT ? 'duntel-konzol-1080x1350' : 'duntel-konzol-1350x1080');
  await p.screenshot({ path: out + '.png' });
  if (process.argv[2]) await p.screenshot({ path: process.argv[2] + '/duntel-land.jpg', type: 'jpeg', quality: 75 });
  // baseline of each text layer, measured in the page
  const metas = await p.evaluate(() => [...document.querySelectorAll('[data-layer]')].map(el => {
    const r = el.getBoundingClientRect(); let baseline = null;
    if (el.dataset.text) { const m = document.createElement('span'); m.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline'; el.appendChild(m); const mr = m.getBoundingClientRect(); baseline = mr.top; m.remove(); }
    return { fx: el.dataset.fx ? JSON.parse(el.dataset.fx) : null, name: el.dataset.layer, text: el.dataset.text ? JSON.parse(el.dataset.text) : null, left: r.left, right: r.right, cx: r.left + r.width / 2, baseline };
  }));
  const children = [];
  for (let i = 0; i < metas.length; i++) {
    await p.evaluate(i => document.querySelectorAll('[data-layer]').forEach((el, k) => { el.style.visibility = k === i ? 'visible' : 'hidden'; if (el.dataset.fx) el.style.textShadow = k === i ? 'none' : ''; }), i);
    const png = PNG.sync.read(await p.screenshot({ omitBackground: true }));
    let x0 = W, y0 = H, x1 = -1, y1 = -1;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (png.data[(y * W + x) * 4 + 3]) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    if (x1 < 0) continue;
    const w = x1 - x0 + 1, h = y1 - y0 + 1, data = new Uint8ClampedArray(w * h * 4);
    for (let y = 0; y < h; y++) data.set(png.data.subarray(((y + y0) * W + x0) * 4, ((y + y0) * W + x0 + w) * 4), y * w * 4);
    const layer = { name: metas[i].name, left: x0, top: y0, imageData: { width: w, height: h, data } };
    const fx = metas[i].fx;
    if (fx) {
      const px = v => ({ units: 'Pixels', value: v });
      layer.effects = { dropShadow: [
        { enabled: true, present: true, showInDialog: true, blendMode: 'normal', color: rgb(fx[1]), opacity: 1, angle: 90, useGlobalLight: false, distance: px(fx[0]), choke: px(100), size: px(0) },
        { enabled: true, present: true, showInDialog: true, blendMode: 'multiply', color: { r: 0, g: 0, b: 0 }, opacity: 0.55, angle: 90, useGlobalLight: false, distance: px(fx[0] + 6), choke: px(0), size: px(22) },
      ] };
    }
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
  await p.evaluate(() => document.querySelectorAll('[data-layer]').forEach(el => { el.style.visibility = 'visible'; el.style.textShadow = ''; }));
  const flat = PNG.sync.read(fs.readFileSync(out + '.png'));
  const psd = { width: W, height: H, imageData: { width: W, height: H, data: new Uint8ClampedArray(flat.data) }, children };
  fs.writeFileSync(out + '.psd', writePsdBuffer(psd, { generateThumbnail: false }));
  console.log('layers:', children.map(c => c.name + (c.text ? ' [szöveg]' : '')).join(', '));
  await b.close();
})();
