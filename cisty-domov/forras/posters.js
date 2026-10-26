const { chromium } = require('playwright'); const fs = require('fs');
const L = '/home/user/Manhattan-studio/cisty-domov/logo/';
const OUT = '/home/user/Manhattan-studio/cisty-domov/plakatok/';
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
.p{width:1123px;height:1587px;position:relative;overflow:hidden;padding:88px 96px;display:flex;flex-direction:column}
.d{font-family:'Inter Display';letter-spacing:-0.035em;line-height:.95}
.eyebrow{font-size:20px;font-weight:600;letter-spacing:.2em;text-transform:uppercase}
.foot{margin-top:auto;display:flex;justify-content:space-between;align-items:flex-end;font-size:30px;font-weight:600;position:relative}
.foot small{display:block;font-size:17px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;opacity:.7;margin-bottom:10px}
`;
const foot = (logo, w = 300) => `<div class="foot"><div>${svg(logo, w)}</div><div style="text-align:right"><small>Vyžiadajte si ponuku</small>${PHONE}<br><span style="font-weight:500">${WEB}</span></div></div>`;

const posters = [
// 1 — brand
`<div class="p" style="background:#fff;color:#0B2D5B">
  <svg viewBox="0 0 100 100" style="position:absolute;width:1050px;right:-300px;bottom:-170px">${markPath('#EAF2FD')}${spark('#fff')}</svg>
  <div style="position:relative">${svg('cisty-domov-logo.svg', 380)}</div>
  ${W('width:380px;right:60px;bottom:60px', onWhite)}
  <div style="position:relative;margin-top:230px">
    <div class="eyebrow" style="color:#1B63D6;margin-bottom:36px">Upratovanie domácností</div>
    <h1 class="d" style="font-size:118px;font-weight:600">Čistý domov.<br><span style="color:#1B63D6;font-weight:400">Viac voľného času.</span></h1>
    <p style="font-size:34px;line-height:1.4;margin-top:48px;max-width:640px;color:#3A5478">Spoľahlivý, overený tím. Prídeme s vlastnými pomôckami, vy sa len vrátite domov.</p>
  </div>
  <div class="foot" style="color:#0B2D5B"><div style="background:#1B63D6;color:#fff;padding:34px 40px;border-radius:20px"><small>Vyžiadajte si ponuku</small>${PHONE}<br><span style="font-weight:500">${WEB}</span></div><div></div></div>
</div>`,
// 2 — services
`<div class="p" style="background:#1B63D6;color:#fff">
  ${W('width:205px;right:120px;top:52px', onBlue)}
  <div class="eyebrow" style="color:#BFD7FA">Naše služby</div>
  <h1 class="d" style="font-size:120px;font-weight:600;margin-top:36px">Všetko<br>načisto.</h1>
  <div style="margin-top:90px;border-top:2px solid rgba(255,255,255,.3)">
    ${[['Pravidelné upratovanie','bytov a domov, raz za týždeň alebo dva'],['Generálne upratovanie','jarné, pred sviatkami, dôkladné'],['Umývanie okien','vrátane rámov a parapetov'],['Upratovanie po sťahovaní','pred odovzdaním alebo nasťahovaním'],['Upratovanie kancelárií','aj schodiská, mimo pracovného času']]
      .map(([t,s],i)=>`<div style="display:flex;align-items:baseline;gap:40px;padding:34px 0;border-bottom:2px solid rgba(255,255,255,.3)"><span style="font-size:22px;font-weight:600;color:#BFD7FA;width:40px">0${i+1}</span><span class="d" style="font-size:50px;font-weight:500;line-height:1.1;flex:1">${t}</span><span style="font-size:22px;color:#D6E6FC;text-align:right;width:260px">${s}</span></div>`).join('')}
  </div>
  ${foot('cisty-domov-logo-feher.svg')}
</div>`,
// 3 — offer
`<div class="p" style="background:#EAF2FD;color:#0B2D5B">
  <div style="display:flex;justify-content:space-between;align-items:center">${svg('cisty-domov-logo.svg', 330)}<span class="eyebrow" style="color:#1B63D6">Bemutatkozó ajánlat</span></div>
  <div style="margin-top:150px">
    <p class="d" style="font-size:60px;font-weight:500;color:#1B63D6">Az első takarításból</p>
    <h1 class="d" style="font-size:390px;font-weight:700;letter-spacing:-0.06em;line-height:.85;margin-top:20px;margin-left:-14px">−20<span style="font-size:220px;color:#1B63D6">%</span></h1>
    ${W('width:330px;right:96px;bottom:262px', onWhite)}
    <p style="font-size:34px;line-height:1.4;margin-top:60px;max-width:560px;color:#3A5478">Próbálja ki kockázat nélkül. Ha valami nem tökéletes, 24 órán belül díjmentesen visszamegyünk.</p>
  </div>
  <div class="foot"><p style="font-size:17px;font-weight:500;color:#6A82A3;max-width:420px;line-height:1.5">Az ajánlat új ügyfelekre, egy alkalomra érvényes. Más kedvezménnyel nem vonható össze.</p><div style="text-align:right;background:#0B2D5B;color:#fff;padding:34px 40px;border-radius:20px"><small>Foglaljon most</small>${PHONE}<br><span style="font-weight:500">${WEB}</span></div></div>
</div>`,
// 4 — process
`<div class="p" style="background:#fff;color:#0B2D5B">
  ${W('width:330px;right:40px;top:620px', onWhite)}
  <div class="eyebrow" style="color:#1B63D6">Ako pracujeme</div>
  <h1 class="d" style="font-size:120px;font-weight:600;margin-top:36px">Tri kroky<br><span style="color:#1B63D6;font-weight:400">k čistému bytu.</span></h1>
  <div style="margin-top:140px;display:flex;flex-direction:column;gap:84px">
    ${[['Zavolajte alebo napíšte','Poviete nám, aký veľký je byt a čo potrebujete. Ešte v ten deň dostanete pevnú cenu.'],['Prídeme','V dohodnutom čase, s vlastnými prostriedkami a pomôckami. Môžeme prevziať aj kľúče.'],['Vrátite sa domov','Čistý, svieži domov. Platíte až po upratovaní, v hotovosti alebo kartou.']]
      .map(([t,s],i)=>`<div style="display:flex;gap:48px;align-items:flex-start"><div style="flex:none;width:120px;height:120px;border-radius:50%;background:${i==2?'#1B63D6':'#EAF2FD'};color:${i==2?'#fff':'#1B63D6'};display:flex;align-items:center;justify-content:center" class="d"><span style="font-size:60px;font-weight:600">${i+1}</span></div><div style="padding-top:12px"><h2 class="d" style="font-size:52px;font-weight:600">${t}</h2><p style="font-size:28px;line-height:1.45;color:#3A5478;margin-top:16px;max-width:500px">${s}</p></div></div>`).join('')}
  </div>
  ${foot('cisty-domov-logo.svg')}
</div>`,
// 5 — business
`<div class="p" style="background:#0B2D5B;color:#fff">
  ${W('width:300px;right:80px;top:470px', onNavy)}
  <svg viewBox="0 0 100 100" style="position:absolute;width:300px;right:40px;top:40px">${spark('#1B63D6')}</svg>
  <div class="eyebrow" style="color:#7FB0F5;position:relative">Pre firmy a kancelárie</div>
  <h1 class="d" style="font-size:150px;font-weight:600;margin-top:36px;position:relative">Ráno<br>čistá<br><span style="color:#7FB0F5;font-weight:400">kancelária.</span></h1>
  <p style="font-size:34px;line-height:1.4;margin-top:56px;max-width:560px;color:#C9DBF5">Upratujeme po skončení pracovnej doby, takže váš tím nás ani nezbadá.</p>
  <div style="margin-top:auto;margin-bottom:110px;padding-top:56px;border-top:2px solid rgba(255,255,255,.18);display:grid;grid-template-columns:1fr 1fr;gap:26px 40px;font-size:28px;font-weight:500">
    ${['Flexibilná mesačná zmluva','Stály, zaškolený personál','Faktúra, prehľadné ceny','Dopĺňame spotrebný tovar'].map(t=>`<div style="display:flex;gap:18px;align-items:center"><svg viewBox="0 0 24 24" width="30" height="30"><circle cx="12" cy="12" r="12" fill="#1B63D6"/><path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>${t}</div>`).join('')}
  </div>
  ${foot('cisty-domov-logo-feher.svg').replace('class="foot"','class="foot" style="margin-top:0"')}
</div>`];

posters.splice(2, 1); // the −20% offer poster is retired
const names = ['01-tiszta-otthon','02-szolgaltatasok','03-harom-lepes','04-irodaknak'];
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1123, height: 1587 }, deviceScaleFactor: 3 });
  for (let i = 0; i < posters.length; i++) {
    await p.setContent(`<style>${css}</style>${posters[i]}`); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: OUT + names[i] + '.png' });
    await p.screenshot({ path: process.argv[2] + '/prev-' + i + '.jpg', type: 'jpeg', quality: 70, scale: 'css' });
  }
  await p.setContent(`<style>${css}@page{size:297mm 420mm;margin:0}.p{width:297mm;height:420mm;zoom:${1/1123*297/25.4*96}}</style>${posters.join('')}`);
  await p.pdf({ path: OUT + 'cisty-domov-plakatok-A3.pdf', width: '297mm', height: '420mm', printBackground: true });
  await b.close();
})();
