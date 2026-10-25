// Flat cleaning-woman illustration, viewBox 0 0 400 800. Colors are parameterised per background.
module.exports = function woman(o = {}) {
  const c = Object.assign({
    skin: '#EDBE9C', skinShade: '#D9A47F', hair: '#2B2321', shirt: '#1B63D6', apron: '#F4F8FE',
    apronLine: '#C9DCF7', pants: '#0B2D5B', shoes: '#0B2D5B', mop: '#0B2D5B', fringe: '#9EC2F4',
    bottle: '#FFFFFF', label: '#1B63D6', face: '#2B2321',
  }, o);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800">
  <!-- mop -->
  <line x1="104" y1="150" x2="80" y2="764" stroke="${c.mop}" stroke-width="9" stroke-linecap="round"/>
  <rect x="30" y="756" width="100" height="16" rx="8" fill="${c.mop}"/>
  <path d="M36 770 h88 v14 q0 10 -10 10 h-68 q-10 0 -10 -10z" fill="${c.fringe}"/>
  <!-- ponytail -->
  <path d="M236 92 C268 96 282 130 272 170 C266 196 252 208 240 214 C250 190 252 160 240 136 Z" fill="${c.hair}"/>
  <!-- neck -->
  <rect x="189" y="164" width="22" height="36" rx="6" fill="${c.skinShade}"/>
  <!-- legs -->
  <path d="M152 410 H248 L244 742 H210 L201 468 H199 L190 742 H156 Z" fill="${c.pants}"/>
  <rect x="148" y="734" width="46" height="18" rx="9" fill="${c.shoes}"/>
  <rect x="206" y="734" width="46" height="18" rx="9" fill="${c.shoes}"/>
  <!-- torso -->
  <path d="M146 214 C160 200 180 196 200 196 C220 196 240 200 254 214 L264 300 L254 424 H146 L136 300 Z" fill="${c.shirt}"/>
  <!-- apron -->
  <path d="M178 196 L170 252 M222 196 L230 252" stroke="${c.apron}" stroke-width="6" stroke-linecap="round"/>
  <path d="M166 250 H234 L242 436 Q242 444 234 444 H166 Q158 444 158 436 Z" fill="${c.apron}"/>
  <path d="M176 330 H224 V358 Q224 366 216 366 H184 Q176 366 176 358 Z" fill="none" stroke="${c.apronLine}" stroke-width="4"/>
  <line x1="160" y1="300" x2="240" y2="300" stroke="${c.apronLine}" stroke-width="4"/>
  <!-- left arm holding mop -->
  <path d="M152 222 L120 300" stroke="${c.shirt}" stroke-width="32" stroke-linecap="round"/>
  <path d="M120 300 L96 372" stroke="${c.skin}" stroke-width="22" stroke-linecap="round"/>
  <circle cx="95" cy="378" r="14" fill="${c.skin}"/>
  <!-- spray bottle -->
  <path d="M290 156 h26 v14 h-26z" fill="${c.bottle}"/>
  <path d="M286 150 h34 l10 8 h-6 l-4 -2 h-34 z" fill="${c.bottle}"/>
  <rect x="282" y="168" width="40" height="72" rx="10" fill="${c.bottle}"/>
  <rect x="282" y="188" width="40" height="26" fill="${c.label}"/>
  <!-- right arm raised -->
  <path d="M248 222 L284 296" stroke="${c.shirt}" stroke-width="32" stroke-linecap="round"/>
  <path d="M284 296 L300 236" stroke="${c.skin}" stroke-width="22" stroke-linecap="round"/>
  <circle cx="301" cy="230" r="14" fill="${c.skin}"/>
  <!-- head -->
  <circle cx="200" cy="128" r="46" fill="${c.skin}"/>
  <path d="M154 128 C150 88 176 74 202 74 C232 74 252 94 246 130 C238 110 216 98 192 104 C174 108 160 116 154 128 Z" fill="${c.hair}"/>
  <circle cx="183" cy="134" r="4" fill="${c.face}"/>
  <circle cx="217" cy="134" r="4" fill="${c.face}"/>
  <path d="M188 152 Q200 162 212 152" fill="none" stroke="${c.face}" stroke-width="4" stroke-linecap="round"/>
</svg>`;
};
if (require.main === module) {
  const { chromium } = require('playwright');
  (async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1200, height: 820 } });
    const w = module.exports;
    await p.setContent(`<body style="margin:0;display:flex">
      <div style="background:#fff;width:400px">${w()}</div>
      <div style="background:#1B63D6;width:400px">${w({ shirt: '#0B2D5B', pants: '#0A2550', shoes: '#0A2550', mop: '#0B2D5B', fringe: '#BFD7FA', label: '#0B2D5B' })}</div>
      <div style="background:#0B2D5B;width:400px">${w({ pants: '#3E74C9', shoes: '#BFD7FA', mop: '#BFD7FA', fringe: '#7FB0F5', apronLine: '#9EC2F4' })}</div></body>`);
    await p.screenshot({ path: 'woman.png' }); await b.close(); })();
}
