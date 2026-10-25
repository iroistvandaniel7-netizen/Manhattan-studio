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
| `src/lib/site.ts`     | Cégnév, székhely, IČO, DIČ, cégjegyzék, e-mail, nyitvatartás — **minden `TODO` helyőrző**. A telefonszám és a domain a plakátokról való. |
| `src/i18n/dictionaries/{sk,hu,en}.ts` | Az oldal összes szövege nyelvenként, a jogi oldalakkal együtt. A `hu.ts` adja a szerkezetet: ha a másik kettőből hiányzik egy kulcs, a build hibát dob. A működési terület (`contact.area`) is itt van. |

## Oldal

1. **Hero** — az 1. plakát: „Tiszta otthon. Több szabad idő.”, a takarítónő a ház előtt, kék kapcsolat-doboz.
2. **Videó** — teljes szélességű háttérvideó egy mondattal, alján futó szalag a szolgáltatásokkal.
3. **Szolgáltatások** — egyetlen nagy mondat, benne minden szolgáltatás egy link, ami előre kiválasztja az űrlapon; alatta rövid leírások soronként.
4. **Három lépés**, **Mini játék**, **Irodáknak**.
5. **Munkáink** — valódi előtte/utána fotók (`src/lib/gallery.ts`). Üres listánál nem jelenik meg.
6. **GYIK**, **Ajánlatkérés**.

## Nyelvek

`/sk`, `/hu`, `/en` — a jogi oldalak `/{nyelv}/gdpr`, `/cookies`, `/impressum`.
A csupasz domain a böngésző nyelve szerint visz: magyar böngésző → `/hu`, minden
más → `/sk`. Angolra magától sosem vált (sokan angol nyelvű telefont használnak),
de a nyelvváltóban egy kattintás.

## Színek

A márkaszín a **#89CFF0**: gombok, kiemelések, sávok, logó-ikon. Rajta a szöveg
sötétkék (#0B2D5B, 8:1). Fehér háttéren kék *szövegként* ugyanennek a kéknek a
sötétebb árnyalata (#1F78A8, 4,8:1) szerepel, mert a #89CFF0 fehéren csak 1,7:1
kontrasztú, olvashatatlan. A `public/brand/` logói a webre át vannak színezve; az
eredeti logócsomag a `../logo/` mappában változatlan.

Betűtípus mindenhol Poppins, a saját szerverről kiszolgálva. Szándékosan nincsenek
ikonok és kártyarácsok: a szekciók tipográfiára és sorokra épülnek.

### A háttérvideó

`public/video/takaritas.mp4` és `takaritas.jpg` (a videó állóképe, ezt látja, aki
csökkentett mozgást kért, vagy amíg a videó tölt). A mostani videót a
`../forras/video.js` rendereli (`node cisty-domov/forras/video.js`). Valódi
felvételre cserélni: a két fájlt kell lecserélni ugyanezen a néven
(MP4/H.264, 1280×720 vagy 1920×1080, 10–20 mp, hang nélkül, 2–4 MB alatt).

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
