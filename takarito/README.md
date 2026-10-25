# Kristály Takarítás — weboldal

Egyoldalas weboldal egy takarító cégnek, a Manhattan Studio oldalának felépítésére,
kék–fehér arculattal. Önálló Next.js alkalmazás ebben a mappában — a szülő repó
buildjétől független.

```bash
cd takarito
npm install
npm run dev        # http://localhost:3000
```

| Parancs             | Mit csinál          |
| ------------------- | ------------------- |
| `npm run dev`       | Fejlesztői szerver  |
| `npm run build`     | Éles build          |
| `npm run lint`      | ESLint              |
| `npm run typecheck` | `tsc --noEmit`      |

Vercelen: új projekt, **Root Directory = `takarito`**.

## Mit hol kell átírni

| Fájl                  | Tartalom                                                              |
| --------------------- | --------------------------------------------------------------------- |
| `src/lib/site.ts`     | Cégnév, székhely, cégjegyzékszám, adószám, telefon, e-mail, terület — **minden `TODO` helyőrző** |
| `src/lib/content.ts`  | Az oldal összes szövege (szolgáltatások, GYIK, garancia, ígéretek)    |
| `src/lib/prices.ts`   | Az árlista. Amíg üres, az „Egyedi ajánlat” blokk látszik helyette     |
| `src/lib/legal.ts`    | Adatkezelési és süti tájékoztató szövege                              |

## Oldal

Hero → számok → szolgáltatások (fül + panel) → **mini játék** (ablakpucolás 20 mp
alatt, egérrel, ujjal vagy nyilakkal) → árak → miért mi → 4 lépés → GYIK →
ajánlatkérő űrlap. Külön oldalak: `/adatvedelem`, `/cookie`, `/impresszum`.

## Ajánlatkérő űrlap

Kliens- és szerveroldali ellenőrzés, honeypot a botok ellen, kötelező (nem
előre bejelölt) adatkezelési hozzájárulás. Kézbesítés (`.env.example`):

- `RESEND_API_KEY` + `CONTACT_FROM_EMAIL` — e-mail a cégnek, a válasz a küldőnek megy;
- és/vagy `CONTACT_WEBHOOK_URL` — JSON POST bármilyen CRM-be / Make / Zapier.

Ha egyik sincs beállítva, élesben az űrlap ezt bevallja, és egy kattintással
e-mail piszkozatot ad a beírt üzenettel — sosem jelez hamis sikert.

## Sütik, GDPR

Egyetlen saját süti (`kt-consent`, a választás). Süti-sáv „Csak a szükségesek” /
„Beállítások” / „Mindet elfogadom” gombokkal, kategóriánkénti kapcsolókkal; bármikor
újranyitható a bal alsó gombbal vagy a láblécből. A betűtípus saját szerverről jön,
Google felé nem megy adat. Ha később analitika kerül az oldalra, előtte
`getConsent().statistics` értékét kell olvasni (`src/lib/consent.ts`).

A jogi szövegek sablonok — élesítés előtt nézesse át szakemberrel.
