# Čistý Domov — weboldal

Egyoldalas weboldal a Čistý Domov takarító cégnek, a Manhattan Studio oldalának
felépítésére, a `../logo` és `../plakatok` arculatával (logó, #1B63D6 / #0B2D5B
színek, Inter betű, a plakátok takarítónő-illusztrációja és szövegei). Önálló
Next.js alkalmazás ebben a mappában — a szülő repó buildjétől független.

```bash
cd cisty-domov/weboldal
npm install
npm run dev        # http://localhost:3000
```

| Parancs             | Mit csinál          |
| ------------------- | ------------------- |
| `npm run dev`       | Fejlesztői szerver  |
| `npm run build`     | Éles build          |
| `npm run lint`      | ESLint              |
| `npm run typecheck` | `tsc --noEmit`      |

Vercelen: új projekt, **Root Directory = `cisty-domov/weboldal`**.

## Mit hol kell átírni

| Fájl                  | Tartalom                                                              |
| --------------------- | --------------------------------------------------------------------- |
| `src/lib/site.ts`     | Cégnév, székhely, IČO, DIČ, cégjegyzék, e-mail, terület, nyitvatartás — **minden `TODO` helyőrző**. A telefonszám és a domain a plakátokról való. |
| `src/lib/content.ts`  | Az oldal összes szövege (szolgáltatások, GYIK, garancia, ígéretek)    |
| `src/lib/prices.ts`   | Az árlista (euróban). Amíg üres, a −20%-os bemutatkozó ajánlat látszik helyette |
| `src/lib/legal.ts`    | Adatkezelési és süti tájékoztató szövege                              |

## Oldal

Hero → számok → szolgáltatások (fül + panel, a plakát 5 szolgáltatása) → **mini játék** (ablakpucolás 20 mp
alatt, egérrel, ujjal vagy nyilakkal) → árak → miért mi → 3 lépés → GYIK →
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

A jogi szövegek a szlovák szabályozásra (GDPR, 18/2018 Tt., 452/2021 Tt., 22/2004 Tt.) írt sablonok — élesítés előtt nézesse át szakemberrel.
