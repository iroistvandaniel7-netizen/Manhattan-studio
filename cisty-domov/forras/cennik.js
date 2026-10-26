// Price list (cenník), two A-series pages in the poster style. Prices set against
// Slovak competitors' published lists (Oct 2026), see the session notes.
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const L = path.join(__dirname, '../logo/');
const OUT = path.join(__dirname, '../cennik/');
fs.mkdirSync(OUT, { recursive: true });
const svg = (f, w) => fs.readFileSync(L + f, 'utf8').replace(/width="[\d.]+" height="[\d.]+"/, `width="${w}" style="display:block;height:auto"`);
const PHONE = '0918 188 252', WEB = 'mojcistydomov.sk';
const check = (bg, fg) => `<svg viewBox="0 0 24 24" width="22" height="22" style="flex:none;margin-top:3px"><circle cx="12" cy="12" r="12" fill="${bg}"/><path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="${fg}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const sizes = ['Garsónka / 1-izbový', '2-izbový byt', '3-izbový byt', '4-izbový byt', 'Rodinný dom'];
const pkgs = [
  { name: 'Základné', desc: 'Rýchle osvieženie domácnosti, ideálne pri pravidelnom upratovaní.',
    prices: ['45 €', '60 €', '75 €', '90 €', 'od 0,80 €/m²'],
    items: ['Vysávanie a umytie podláh', 'Utretie prachu z voľných plôch', 'Kúpeľňa a WC: umývadlo, vaňa, sprcha, WC', 'Kuchyňa: linka zvonka, drez, varná doska', 'Vynesenie odpadu'] },
  { name: 'Dôkladné', desc: 'Keď má byť doma naozaj čisto, aj na miestach, kam sa bežne nedostanete.', hot: true,
    prices: ['70 €', '95 €', '120 €', '145 €', 'od 1,30 €/m²'],
    head: 'Všetko zo Základného, navyše:',
    items: ['Odmastenie kuchynskej linky a obkladov', 'Odstránenie vodného kameňa', 'Prach aj na skriniach, lištách a dverách', 'Kľučky, vypínače, radiátory', 'Zrkadlá a sklenené plochy', 'Mikrovlnka vnútri'] },
  { name: 'Generálne', desc: 'Kompletné upratovanie od stropu po podlahu, napríklad na jar alebo pred sviatkami.',
    prices: ['110 €', '150 €', '190 €', '230 €', 'od 2,00 €/m²'],
    head: 'Všetko z Dôkladného, navyše:',
    items: ['Umývanie okien vrátane rámov a parapetov', 'Rúra a chladnička vnútri', 'Kuchynské skrinky vnútri', 'Digestor vrátane filtra', 'Za a pod nábytkom (kde sa dá posunúť)', 'Svietidlá, dvere a zárubne'] },
];

const css = `*{box-sizing:border-box;margin:0;padding:0}body{font-family:Inter;-webkit-font-smoothing:antialiased}
.p{width:1123px;height:1587px;position:relative;overflow:hidden;padding:80px 80px 72px;display:flex;flex-direction:column;background:#fff;color:#0B2D5B}
.d{font-family:'Inter Display';letter-spacing:-0.035em;line-height:.98}
.eb{font-size:18px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#1B63D6}
.top{display:flex;justify-content:space-between;align-items:center}
.foot{margin-top:auto;display:flex;justify-content:space-between;align-items:flex-end;padding-top:28px;border-top:2px solid #EAF2FD}
.foot small{display:block;font-size:15px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:#6A82A3;margin-bottom:8px}
.foot b{font-size:28px;font-weight:600;line-height:1.3;text-align:right;display:block}
.num{font-variant-numeric:tabular-nums}`;
const foot = note => `<div class="foot"><p style="font-size:16px;line-height:1.55;color:#6A82A3;max-width:520px">${note}</p><div style="text-align:right"><small>Vyžiadajte si ponuku</small><b>${PHONE}<br><span style="font-weight:500">${WEB}</span></b></div></div>`;

const card = k => {
  const blue = k.hot, fg = blue ? '#fff' : '#0B2D5B', sub = blue ? '#D6E6FC' : '#3A5478', line = blue ? 'rgba(255,255,255,.25)' : '#DCE9FB';
  return `<div style="flex:1;min-width:0;border-radius:22px;padding:34px 30px;display:flex;flex-direction:column;gap:22px;background:${blue ? '#1B63D6' : '#F4F8FE'};color:${fg};position:relative">
    ${blue ? `<div style="position:absolute;top:-16px;left:30px;background:#0B2D5B;color:#fff;font-size:14px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;padding:8px 14px;border-radius:999px">Najčastejšia voľba</div>` : ''}
    <div><h2 class="d" style="font-size:46px;font-weight:600">${k.name}</h2><p style="font-size:18px;line-height:1.45;color:${sub};margin-top:10px;min-height:78px">${k.desc}</p></div>
    <div>${sizes.map((s, i) => `<div style="display:flex;justify-content:space-between;align-items:baseline;padding:11px 0;border-top:1.5px solid ${line}"><span style="font-size:17px;color:${sub}">${s}</span><span class="num d" style="font-size:${i < 4 ? 30 : 22}px;font-weight:600;letter-spacing:-0.02em">${k.prices[i]}</span></div>`).join('')}</div>
    <div style="display:flex;flex-direction:column;gap:12px">
      ${k.head ? `<div style="font-size:16px;font-weight:600;color:${sub}">${k.head}</div>` : `<div style="font-size:16px;font-weight:600;color:${sub}">Čo je v cene:</div>`}
      ${k.items.map(t => `<div style="display:flex;gap:12px;font-size:18px;line-height:1.35">${check(blue ? '#fff' : '#1B63D6', blue ? '#1B63D6' : '#fff')}<span>${t}</span></div>`).join('')}
    </div></div>`;
};

const page1 = `<div class="p">
  <div class="top">${svg('cisty-domov-logo.svg', 300)}<span class="eb">Cenník 2026</span></div>
  <h1 class="d" style="font-size:96px;font-weight:600;margin-top:64px">Vyberte si<br><span style="color:#1B63D6;font-weight:400">upratovanie.</span></h1>
  <p style="font-size:22px;line-height:1.5;color:#3A5478;margin-top:24px;max-width:760px">Tri balíky podľa toho, ako dôkladne chcete mať upratané. Čistiace prostriedky a pomôcky prinesieme so sebou, sú v cene.</p>
  <div style="display:flex;gap:20px;margin-top:56px;align-items:stretch">${pkgs.map(card).join('')}</div>
  ${foot('Ceny sú orientačné pre bežne znečistenú domácnosť. Presnú cenu vám povieme vopred, ešte pred upratovaním. Platíte až po upratovaní, v hotovosti alebo kartou.')}
</div>`;

const row = (t, p, s = '') => `<div style="display:flex;justify-content:space-between;align-items:baseline;gap:20px;padding:15px 0;border-top:1.5px solid #DCE9FB"><span style="font-size:20px">${t}${s ? `<span style="display:block;font-size:15px;color:#6A82A3;margin-top:3px">${s}</span>` : ''}</span><span class="num" style="font-size:21px;font-weight:600;white-space:nowrap">${p}</span></div>`;
const page2 = `<div class="p">
  <div class="top">${svg('cisty-domov-logo.svg', 300)}<span class="eb">Cenník 2026</span></div>
  <h1 class="d" style="font-size:96px;font-weight:600;margin-top:64px">Doplnkové<br><span style="color:#1B63D6;font-weight:400">služby.</span></h1>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:0 56px;margin-top:56px">
    <div>
      <div class="eb" style="margin-bottom:14px">Okná</div>
      ${row('Jednokrídlové okno', '5 €', 'vrátane rámu a parapetu')}${row('Dvojkrídlové okno', '7 €')}${row('Trojkrídlové okno, balkónové dvere', '9 €')}${row('Žalúzie', '+2 € / okno')}
      <div class="eb" style="margin:40px 0 14px">Kuchyňa</div>
      ${row('Rúra vnútri', '15 €')}${row('Chladnička vnútri', '15 €')}${row('Kuchynské skrinky vnútri', '15 €')}${row('Digestor vrátane filtra', '10 €')}
    </div>
    <div>
      <div class="eb" style="margin-bottom:14px">Ďalšie služby</div>
      ${row('Žehlenie', '12 € / hod.')}${row('Balkón alebo terasa', '10 €')}${row('Upratovanie po sťahovaní', 'ako Generálne')}${row('Upratovanie po rekonštrukcii', 'od 2,50 €/m²')}${row('Kancelárie a spoločné priestory', 'od 0,60 €/m²', 'pravidelné upratovanie podľa dohody')}${row('Hodinová sadzba mimo balíkov', '15 € / hod.', 'minimálne 2 hodiny')}
    </div>
  </div>
  <div style="margin-top:56px;background:#1B63D6;color:#fff;border-radius:22px;padding:38px 40px;display:grid;grid-template-columns:1.1fr 1fr 1fr 1fr;gap:28px;align-items:center">
    <div><div class="d" style="font-size:36px;font-weight:600">Pravidelne?</div><p style="font-size:17px;color:#D6E6FC;margin-top:8px;line-height:1.45">Zľava z ceny balíka pri každom upratovaní.</p></div>
    ${[['−15 %', 'raz za týždeň'], ['−10 %', 'raz za dva týždne'], ['−5 %', 'raz za mesiac']].map(([a, b]) => `<div style="border-left:1.5px solid rgba(255,255,255,.3);padding-left:24px"><div class="d num" style="font-size:52px;font-weight:600">${a}</div><div style="font-size:17px;color:#D6E6FC;margin-top:6px">${b}</div></div>`).join('')}
  </div>
  ${foot('Doplnkové služby sa pripočítavajú k balíku. Výrazne znečistené priestory a mimoriadne veľké okná naceníme individuálne. Doprava v rámci mesta je zadarmo.')}
</div>`;

(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1123, height: 1587 }, deviceScaleFactor: 2 });
  const pages = [['cennik-1-balicky', page1], ['cennik-2-doplnkove-sluzby', page2]];
  for (const [n, h] of pages) {
    await p.setContent(`<style>${css}</style>${h}`); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: OUT + n + '.png' });
  }
  await p.setContent(`<style>${css}@page{size:210mm 297mm;margin:0}.p{zoom:${210 / 25.4 * 96 / 1123}}</style>${page1}${page2}`);
  await p.pdf({ path: OUT + 'cisty-domov-cennik.pdf', width: '210mm', height: '297mm', printBackground: true });
  await b.close();
})();
