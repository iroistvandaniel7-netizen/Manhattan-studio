// November content pack: tips, seasonal and package posts in the poster style, 4:5.
const { chromium } = require('playwright'); const fs = require('fs');
const L = '/home/user/Manhattan-studio/cisty-domov/logo/';
const OUT = '/home/user/Manhattan-studio/cisty-domov/social/';
fs.mkdirSync(OUT, { recursive: true });
const svg = (f, w) => fs.readFileSync(L + f, 'utf8').replace(/width="[\d.]+" height="[\d.]+"/, `width="${w}" style="display:block;height:auto"`);
const markPath = c => `<path d="M50 10 L90 43 L90 90 L10 90 L10 43 Z" fill="${c}" stroke="${c}" stroke-width="10" stroke-linejoin="round"/>`;
const spark = c => `<path d="M50 42 C51.8 56 55 59.6 69 61.5 C55 63.4 51.8 67 50 81 C48.2 67 45 63.4 31 61.5 C45 59.6 48.2 56 50 42 Z" fill="${c}"/>`;
const woman = require('./woman.js');
const W = (style, o={}) => `<div style="position:absolute;${style}">${woman(o).replace('<svg ', '<svg style="display:block;width:100%;height:auto" ')}</div>`;
const onWhite = { bottle: '#DCE9FB' };
const onBlue = { shirt: '#0B2D5B', pants: '#0A2550', shoes: '#0A2550', mop: '#0B2D5B', fringe: '#BFD7FA', label: '#0B2D5B' };
const onNavy = { pants: '#2C5BA8', shoes: '#BFD7FA', mop: '#BFD7FA', fringe: '#7FB0F5', apronLine: '#9EC2F4' };
const PHONE = '0918 188 252', WEB = 'mojcistydomov.sk';

const css = `
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter';-webkit-font-smoothing:antialiased}
.p{width:1123px;height:1404px;position:relative;overflow:hidden;padding:88px 96px;display:flex;flex-direction:column}
.d{font-family:'Inter Display';letter-spacing:-0.035em;line-height:.95}
.eyebrow{font-size:20px;font-weight:600;letter-spacing:.2em;text-transform:uppercase}
.foot{margin-top:auto;display:flex;justify-content:space-between;align-items:flex-end;font-size:30px;font-weight:600;position:relative}
.foot small{display:block;font-size:17px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;opacity:.7;margin-bottom:10px}
`;
const foot = (logo, w = 300) => `<div class="foot"><div>${svg(logo, w)}</div><div style="text-align:right"><small>Vyžiadajte si ponuku</small>${PHONE}<br><span style="font-weight:500">${WEB}</span></div></div>`;


const check = (bg, fg, s = 30) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" style="flex:none;margin-top:4px"><circle cx="12" cy="12" r="12" fill="${bg}"/><path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="${fg}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const book = (bg, fg) => `<div style="display:inline-flex;align-items:center;gap:14px;background:${bg};color:${fg};border-radius:999px;padding:18px 30px;font-size:24px;font-weight:600">Rezervovať termín<svg viewBox="0 0 24 24" width="24" height="24"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="${fg}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></div>`;
const footBook = (logo, c, btnBg, btnFg, sub) => `<div class="foot"><div>${svg(logo, 280)}</div><div style="display:flex;flex-direction:column;align-items:flex-end;gap:14px;color:${c}"><div style="font-size:28px;font-weight:600">${PHONE}</div>${book(btnBg, btnFg)}<div style="font-size:20px;font-weight:500;color:${sub}">${WEB}</div></div></div>`;
const list = (items, bg, fg, size = 28) => `<div style="display:flex;flex-direction:column;gap:26px">${items.map(t => `<div style="display:flex;gap:20px;font-size:${size}px;line-height:1.4">${check(bg, fg)}<span>${t}</span></div>`).join('')}</div>`;

const posts = [
['07-vianoce', `<div class="p" style="background:#0B2D5B;color:#fff">
  <svg viewBox="0 0 100 100" style="position:absolute;width:260px;right:70px;top:60px">${spark('#1B63D6')}</svg>
  <svg viewBox="0 0 100 100" style="position:absolute;width:120px;right:330px;top:250px">${spark('#7FB0F5')}</svg>
  ${W('width:270px;right:96px;top:470px', onNavy)}
  <div class="eyebrow" style="color:#7FB0F5;position:relative">Generálne upratovanie pred sviatkami</div>
  <h1 class="d" style="font-size:140px;font-weight:600;margin-top:36px;position:relative">Vianoce<br>bez<br><span style="color:#7FB0F5;font-weight:400">upratovania.</span></h1>
  <p style="font-size:30px;line-height:1.45;margin-top:44px;max-width:560px;color:#C9DBF5;position:relative">Termíny na december sa rýchlo míňajú. Rezervujte si upratovanie ešte v novembri a sviatky si užite v čistom.</p>
  ${footBook('cisty-domov-logo-feher.svg', '#fff', '#1B63D6', '#fff', '#C9DBF5')}
</div>`],
['08-tip-sedacka', `<div class="p" style="background:#fff;color:#0B2D5B">
  <div class="eyebrow" style="color:#1B63D6">Tip od nás</div>
  <h1 class="d" style="font-size:110px;font-weight:600;margin-top:36px">Ako udržať<br><span style="color:#1B63D6;font-weight:400">sedačku čistú.</span></h1>
  <div style="margin-top:80px;display:flex;flex-direction:column;gap:30px">
    ${[['Škvrnu hneď vysajte','Priložte papierovú utierku a jemne pritlačte. Netrite, škvrna by sa rozšírila.'],['Vysávajte každý týždeň','Aj medzi vankúšmi a pod nimi. Tam sa drží najviac prachu a omrviniek.'],['Raz ročne vytepovať','Tepovanie odstráni špinu a pachy z hĺbky, kam vysávač nedosiahne.']]
      .map(([t,s],i)=>`<div style="display:flex;gap:30px;padding:30px 34px;border-radius:22px;background:${i==2?'#1B63D6':'#F4F8FE'};color:${i==2?'#fff':'#0B2D5B'}"><div class="d" style="font-size:56px;font-weight:600;color:${i==2?'#fff':'#1B63D6'};width:44px;flex:none">${i+1}</div><div><div class="d" style="font-size:40px;font-weight:600">${t}</div><p style="font-size:23px;line-height:1.45;margin-top:10px;color:${i==2?'#D6E6FC':'#3A5478'}">${s}</p></div></div>`).join('')}
  </div>
  ${footBook('cisty-domov-logo.svg', '#0B2D5B', '#1B63D6', '#fff', '#3A5478')}
</div>`],
['09-tip-vodny-kamen', `<div class="p" style="background:#EAF2FD;color:#0B2D5B">
  ${W('width:250px;right:96px;top:470px', onWhite)}
  <div class="eyebrow" style="color:#1B63D6">Tip do kúpeľne</div>
  <h1 class="d" style="font-size:120px;font-weight:600;margin-top:36px">Vodný kameň<br><span style="color:#1B63D6;font-weight:400">bez drahej chémie.</span></h1>
  <div style="margin-top:80px;max-width:600px">${list(['Zmiešajte ocot a teplú vodu v pomere 1:1.','Namočte utierku a obaľte ňou batériu alebo sprchovú hlavicu.','Nechajte pôsobiť 15 až 30 minút, potom opláchnite a vyleštite dosucha.'], '#1B63D6', '#fff')}</div>
  <p style="font-size:20px;color:#6A82A3;margin-top:36px;max-width:600px;line-height:1.5">Nepoužívajte na mramor a prírodný kameň. Ak sa vám nechce, prídeme a urobíme to za vás.</p>
  ${footBook('cisty-domov-logo.svg', '#0B2D5B', '#0B2D5B', '#fff', '#3A5478')}
</div>`],
['10-ako-casto', `<div class="p" style="background:#1B63D6;color:#fff">
  <div class="eyebrow" style="color:#BFD7FA">Plán upratovania</div>
  <h1 class="d" style="font-size:110px;font-weight:600;margin-top:36px">Čo a ako často<br><span style="font-weight:400;color:#D6E6FC">upratovať.</span></h1>
  <div style="margin-top:64px;display:grid;grid-template-columns:1fr 1fr;gap:20px">
    ${[['Každý deň','Riad, odpad, utrieť kuchynskú linku'],['Každý týždeň','Vysávanie, podlahy, kúpeľňa, prach'],['Každý mesiac','Rúra, chladnička, radiátory, kľučky'],['1 až 2-krát ročne','Okná, tepovanie, generálne upratovanie']]
      .map(([t,s],i)=>`<div style="border-radius:22px;padding:30px 32px;background:${i==3?'#fff':'rgba(255,255,255,.12)'};color:${i==3?'#0B2D5B':'#fff'}"><div class="d" style="font-size:38px;font-weight:600">${t}</div><p style="font-size:23px;line-height:1.45;margin-top:12px;color:${i==3?'#3A5478':'#D6E6FC'}">${s}</p></div>`).join('')}
  </div>
  <p style="font-size:24px;margin-top:36px;color:#D6E6FC">Na to posledné máme balík Generálne.</p>
  ${footBook('cisty-domov-logo-feher.svg', '#fff', '#fff', '#1B63D6', '#D6E6FC')}
</div>`],
['11-minimum', `<div class="p" style="background:#fff;color:#0B2D5B">
  <svg viewBox="0 0 100 100" style="position:absolute;width:820px;right:-260px;bottom:-140px">${markPath('#EAF2FD')}${spark('#fff')}</svg>
  ${W('width:260px;right:90px;bottom:290px', onWhite)}
  <div class="eyebrow" style="color:#1B63D6;position:relative">Balík Minimum</div>
  <h1 class="d" style="font-size:120px;font-weight:600;margin-top:36px;position:relative">Rýchly<br>poriadok<br><span style="color:#1B63D6;font-weight:400">každý týždeň.</span></h1>
  <div style="margin-top:56px;max-width:560px;position:relative">${list(['Vysávanie a umytie podláh','Utretie prachu, aj z televízora','Poukladanie vecí na svoje miesto','Naloženie a spustenie umývačky','Vynesenie odpadu'], '#1B63D6', '#fff', 26)}</div>
  ${footBook('cisty-domov-logo.svg', '#0B2D5B', '#1B63D6', '#fff', '#3A5478')}
</div>`],
['12-story-rezervacia', null],
];
const story = `<div style="width:1123px;height:1996px;position:relative;overflow:hidden;background:#fff;color:#0B2D5B;padding:180px 96px 220px;display:flex;flex-direction:column">
  <svg viewBox="0 0 100 100" style="position:absolute;width:1100px;right:-330px;bottom:-60px">${markPath('#EAF2FD')}${spark('#fff')}</svg>
  ${W('width:420px;right:90px;bottom:380px', onWhite)}
  <div style="position:relative">${svg('cisty-domov-logo.svg', 360)}</div>
  <h1 class="d" style="font-size:140px;font-weight:600;margin-top:120px;position:relative">Čistý domov.<br><span style="color:#1B63D6;font-weight:400">Viac voľného<br>času.</span></h1>
  <div style="margin-top:auto;position:relative;display:flex;flex-direction:column;gap:22px;align-items:flex-start">
    <div style="font-size:40px;font-weight:600">${PHONE}</div>
    <div style="transform:scale(1.4);transform-origin:left center">${book('#1B63D6', '#fff')}</div>
    <div style="font-size:30px;font-weight:500;color:#3A5478;margin-top:14px">${WEB}</div>
  </div>
</div>`;
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1123, height: 1404 }, deviceScaleFactor: 1080 / 1123 * 2 });
  for (const [n, h] of posts.filter(x => x[1])) {
    await p.setContent(`<style>${css}</style>${h}`); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: OUT + n + '.png' });
    if (process.argv[2]) await p.screenshot({ path: `${process.argv[2]}/${n}.jpg`, type: 'jpeg', quality: 70, scale: 'css' });
  }
  await p.setViewportSize({ width: 1123, height: 1996 });
  await p.setContent(`<style>${css}</style>${story}`); await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: OUT + '12-story-rezervacia.png' });
  if (process.argv[2]) await p.screenshot({ path: `${process.argv[2]}/12-story.jpg`, type: 'jpeg', quality: 70, scale: 'css' });
  await b.close();
})();
