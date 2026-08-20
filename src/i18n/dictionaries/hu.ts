import type { Widen } from "../types";

/**
 * Hungarian dictionary — the reference shape. `sk.ts` and `en.ts` are typed
 * against `Dictionary`, so a missing key in any locale is a build error.
 *
 * CONTENT RULE: every fact here traces back to Manhattan Nyelvstúdió's own
 * published information — the languages, the course formats, the exam
 * systems, the free placement test / trial lesson / mock exam / childcare,
 * the exam guarantee, the two addresses, the phone numbers, the fax and the
 * opening hours. Nothing is invented. Do not add claims, figures, prices,
 * slogans or testimonials that cannot be traced back to the studio.
 */
const hu = {
  meta: {
    title: "Manhattan Nyelvstúdió — Nyelvtanfolyamok Budapesten",
    description:
      "Angol, német, francia, olasz és spanyol nyelvtanfolyamok kis csoportokban, Budapest két helyszínén. Akkreditált nyelvvizsgaközpont. Ingyenes szintfelmérés és próbaóra.",
    ogAlt: "Manhattan Nyelvstúdió — nyelvtanfolyamok Budapesten",
    skipToContent: "Ugrás a tartalomra",
  },

  nav: {
    home: "Kezdőlap",
    languages: "Nyelvek",
    courses: "Tanfolyamok",
    why: "Amit kapsz",
    exams: "Nyelvvizsga",
    contact: "Kapcsolat",
    cta: "Jelentkezem",
    openMenu: "Menü megnyitása",
    closeMenu: "Menü bezárása",
    languageLabel: "Nyelv választása",
    backToTop: "Vissza a tetejére",
  },

  hero: {
    eyebrow: "Budapest · Örs vezér tere és Óbuda",
    title: "Öt nyelv. Kis csoportok.",
    lead: "Angol, német, francia, olasz és spanyol nyelvtanfolyamok kezdő szinttől haladóig. Akkreditált nyelvvizsgaközpont.",
    cta: "Kurzusok megtekintése",
    photoAlt: "Manhattan látképe naplementében, az alsó-manhattani felhőkarcolókkal.",
    scroll: "Görgess",
  },

  facts: {
    title: "Számokban",
    items: [
      { value: "5", label: "Nyelv" },
      { value: "6", label: "Nyelvvizsgarendszer" },
      { value: "2", label: "Budapesti helyszín" },
      { value: "0 €", label: "Szintfelmérés" },
    ],
  },

  languages: {
    eyebrow: "Nyelvek",
    title: "Amit tanítunk",
    lead: "Minden nyelvet kezdő szinttől haladóig, kis csoportokban.",
    levels: "Kezdőtől haladóig",
    items: [
      { code: "EN", name: "Angol" },
      { code: "DE", name: "Német" },
      { code: "FR", name: "Francia" },
      { code: "IT", name: "Olasz" },
      { code: "ES", name: "Spanyol" },
    ],
  },

  courses: {
    eyebrow: "Tanfolyamok",
    title: "Tanfolyamtípusok",
    lead: "Ugyanaz a nyelv, többféle formában.",
    items: [
      "Általános nyelvtanfolyam",
      "Nyelvvizsga-felkészítő",
      "Nyári intenzív tanfolyam",
      "Társalgási túra anyanyelvi tanárral",
      "Túlélő nyelvi csomag utazáshoz",
      "Junior tanfolyam",
      "Egyéni oktatás",
      "Állásinterjú-felkészítő tréning",
      "Szaknyelvi oktatás",
      "Kismama tanfolyam",
      "Céges oktatás a helyszínen",
    ],
  },

  why: {
    eyebrow: "Amit kapsz",
    title: "Ez jár hozzá",
    items: [
      { title: "Kis csoportok", desc: "Kis létszámú csoportokban tanulsz." },
      { title: "Képzett tanárok", desc: "Szakképzett oktatók vezetik az órákat." },
      { title: "Sok beszélgetés", desc: "Az órák a beszédre épülnek, oldott hangulatban." },
      { title: "Ingyenes szintfelmérés", desc: "A szintfelmérés díjtalan." },
      { title: "Ingyenes próbaóra", desc: "Jelentkezés előtt beülhetsz egy órára." },
      { title: "Ingyenes próbanyelvvizsga", desc: "A próbanyelvvizsga is díjtalan." },
      { title: "Nyelvvizsga-garancia", desc: "A felkészítéshez nyelvvizsga-garancia jár." },
      { title: "Ingyenes gyermekmegőrzés", desc: "A délelőtti tanfolyamok alatt vigyázunk a gyerekre." },
    ],
  },

  exams: {
    eyebrow: "Nyelvvizsga",
    title: "Akkreditált nyelvvizsgaközpont",
    lead: "Az alábbi nyelvvizsgarendszerekben vagyunk vizsgaközpont.",
  },

  contact: {
    eyebrow: "Kapcsolat",
    title: "Elérhetőség",
    lead: "Hívj minket, vagy írj az űrlapon.",
    locationsTitle: "Helyszínek",
    locations: {
      ors: { name: "Örs vezér tere", note: "Árkád Irodaház, II. emelet" },
      obuda: { name: "Óbuda", note: "Manhattan Nyelvstúdió Buda" },
    },
    openMap: "Térkép",
    phoneTitle: "Telefon",
    faxTitle: "Fax",
    hoursTitle: "Nyitvatartás",
    hours: [
      { d: "Hétfő – Péntek", h: "10:00 – 18:30" },
      { d: "Szombat", h: "09:00 – 12:00" },
      { d: "Vasárnap", h: "Zárva" },
    ],
    form: {
      title: "Írj nekünk",
      name: "Név",
      namePlaceholder: "Kovács Anna",
      email: "E-mail",
      emailPlaceholder: "anna@example.com",
      phone: "Telefonszám",
      phonePlaceholder: "+36 20 123 4567",
      language: "Melyik nyelv érdekel?",
      languagePlaceholder: "Válassz nyelvet",
      languageOther: "Még nem tudom",
      message: "Üzenet",
      messagePlaceholder: "Írd le röviden, mire van szükséged.",
      optional: "opcionális",
      submit: "Üzenet küldése",
      sending: "Küldés…",
      successTitle: "Köszönjük!",
      success: "Megkaptuk az üzeneted.",
      again: "Új üzenet",
      errors: {
        name: "Kérjük, add meg a neved.",
        email: "Kérjük, add meg az e-mail-címed.",
        emailInvalid: "Ez az e-mail-cím nem tűnik érvényesnek.",
        phoneInvalid: "Ez a telefonszám nem tűnik érvényesnek.",
        language: "Kérjük, válassz nyelvet.",
        message: "Kérjük, írj néhány szót.",
        summary: "Az űrlap hiányos. Ellenőrizd a megjelölt mezőket.",
        network: "Az üzenetet most nem sikerült elküldeni. Kérjük, hívj minket telefonon.",
        unavailable: "Az online üzenetküldés jelenleg nem érhető el. Hívj minket telefonon.",
      },
    },
  },

  footer: {
    navTitle: "Oldaltérkép",
    contactTitle: "Elérhetőség",
    langTitle: "Nyelv",
    rights: "Minden jog fenntartva.",
    privacy: "Adatvédelem",
    cookies: "Cookie-k",
  },

  legal: {
    privacyTitle: "Adatvédelmi tájékoztató",
    cookiesTitle: "Cookie-tájékoztató",
    backHome: "Vissza a kezdőlapra",
    placeholderNote:
      "Ennek az oldalnak a végleges jogi szövegét a Manhattan Nyelvstúdió adja meg. Addig is bármilyen adatkezeléssel kapcsolatos kérdéssel fordulj hozzánk telefonon.",
  },

  notFound: {
    title: "Az oldal nem található",
    lead: "A keresett oldal nem létezik.",
    cta: "Vissza a kezdőlapra",
  },
} as const;

export type Dictionary = Widen<typeof hu>;

export default hu;
