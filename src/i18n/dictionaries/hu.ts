import type { Widen } from "../types";

/**
 * Hungarian dictionary — the reference shape. `sk.ts` and `en.ts` are typed
 * against `Dictionary`, so a missing key in any locale is a build error.
 */
const hu = {
  meta: {
    title: "Manhattan Nyelvstúdió — Angol, német, francia, olasz és spanyol nyelvtanfolyamok Budapesten",
    description:
      "Kis csoportos nyelvtanfolyamok Budapest két pontján. Angol, német, francia, olasz és spanyol kezdőtől haladóig, akkreditált nyelvvizsgaközpont. Ingyenes szintfelmérés és próbaóra.",
    ogAlt: "Manhattan Nyelvstúdió — nyelvtanfolyamok Budapesten",
    skipToContent: "Ugrás a tartalomra",
  },

  nav: {
    home: "Kezdőlap",
    courses: "Nyelvtanfolyamok",
    about: "Rólunk",
    why: "Miért Manhattan?",
    method: "A módszer",
    contact: "Kapcsolat",
    cta: "Jelentkezem",
    openMenu: "Menü megnyitása",
    closeMenu: "Menü bezárása",
    languageLabel: "Nyelv választása",
    backToTop: "Vissza a tetejére",
  },

  hero: {
    eyebrow: "Budapest · Örs vezér tere & Óbuda",
    titleLines: ["Tanulj nyelveket.", "Nyiss új", "világokat."],
    lead: "Öt nyelv, kis csoportok, rengeteg beszélgetés. Olyan nyelvtudást építünk, amit a hétköznapokban, a munkádban és az utazásaidon is magabiztosan használsz.",
    ctaPrimary: "Megnézem a tanfolyamokat",
    ctaSecondary: "Kapcsolat",
    scroll: "Görgess",
    badge: "Ingyenes szintfelmérés és próbaóra",
    sceneAlt:
      "Illusztráció: a Central Park tava aranyóra idején, háttérben a manhattani felhőkarcolókkal.",
  },

  trust: {
    title: "Röviden rólunk",
    items: [
      { value: 5, suffix: "", label: "Nyelv", sub: "Angol, német, francia, olasz, spanyol" },
      { value: 6, suffix: "", label: "Nyelvvizsgarendszer", sub: "Akkreditált vizsgaközpont" },
      { value: 2, suffix: "", label: "Budapesti helyszín", sub: "Örs vezér tere és Óbuda" },
      { value: 0, suffix: " Ft", label: "Szintfelmérés", sub: "A próbaóra is ingyenes" },
    ],
  },

  courses: {
    eyebrow: "Nyelvtanfolyamok",
    title: "Válaszd ki a nyelvet, a többit ránk bízhatod",
    lead: "Minden nyelvünket kezdő szinttől haladóig tanítjuk, kis csoportokban. A tanfolyam típusát a célodhoz igazítjuk — legyen szó nyelvvizsgáról, munkáról vagy egy közelgő utazásról.",
    more: "További információ",
    levels: "Kezdőtől haladóig",
    items: [
      {
        code: "EN",
        name: "Angol",
        desc: "A legkeresettebb nyelvünk: általános, szaknyelvi és nyelvvizsga-felkészítő tanfolyamok, sok gyakorlati beszédhelyzettel.",
        tags: ["Általános", "Nyelvvizsga", "Üzleti"],
      },
      {
        code: "DE",
        name: "Német",
        desc: "Strukturált, érthető haladás a nyelvtanban, mellette valódi társalgás. Goethe- és ECL-felkészítéssel.",
        tags: ["Általános", "Goethe", "Társalgás"],
      },
      {
        code: "FR",
        name: "Francia",
        desc: "Kiejtés- és beszédközpontú órák, amelyekkel gyorsan eljutsz az első valódi beszélgetésekig.",
        tags: ["Általános", "Kiejtés", "Társalgás"],
      },
      {
        code: "IT",
        name: "Olasz",
        desc: "Élő, hétköznapi olasz nyelv — utazáshoz, munkához vagy egyszerűen a kedvedért.",
        tags: ["Általános", "Utazás", "Társalgás"],
      },
      {
        code: "ES",
        name: "Spanyol",
        desc: "Az egyik leggyorsabban használhatóvá váló nyelv. Oldott hangulatú órák, azonnal alkalmazható tudás.",
        tags: ["Általános", "Utazás", "Nyelvvizsga"],
      },
    ],
    formatsTitle: "Tanfolyamtípusok",
    formatsLead: "Ugyanaz a nyelv, többféle úton. Válaszd azt, ami az életedhez illik.",
    formats: [
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
    examsTitle: "Akkreditált nyelvvizsgaközpont",
    examsLead: "Nálunk nemcsak felkészülsz a vizsgára, hanem le is teheted. Vizsgaközpont vagyunk az alábbi rendszerekben:",
  },

  benefits: {
    eyebrow: "Miért Manhattan?",
    title: "Nem csak megtanulod. Használni is fogod.",
    lead: "A nyelvtudás akkor ér valamit, ha meg mersz szólalni. Minden, amit csinálunk, ezt az egy célt szolgálja.",
    items: [
      {
        title: "Kis csoportok",
        desc: "Kevesen vagytok egy csoportban, így minden órán sorra kerülsz és valóban beszélsz.",
      },
      {
        title: "Képzett tanárok",
        desc: "Tapasztalt, szakképzett oktatók, akik tudják, hol szoktak elakadni a magyar anyanyelvű tanulók.",
      },
      {
        title: "Sok beszélgetés",
        desc: "A hangsúly a valódi beszédhelyzeteken van, nem a magolható szabálylistákon.",
      },
      {
        title: "Ingyenes szintfelmérés",
        desc: "Pontosan abba a csoportba kerülsz, ahol se nem unatkozol, se nem szakadsz le.",
      },
      {
        title: "Ingyenes próbaóra",
        desc: "Előbb kipróbálod, aztán döntesz. Beülsz egy órára, és megnézed, hogy neked való-e.",
      },
      {
        title: "Nyelvvizsga-garancia",
        desc: "Felkészítünk a vizsgára, és nyelvvizsga-garanciával állunk mögötted.",
      },
      {
        title: "Ingyenes gyermekmegőrzés",
        desc: "A délelőtti tanfolyamok alatt vigyázunk a gyerekre, hogy te nyugodtan tanulhass.",
      },
      {
        title: "Jókedvű órák",
        desc: "Oldott, emberi hangulat. A nyelvtanulás akkor működik, ha nem félsz hibázni.",
      },
    ],
  },

  manhattan: {
    eyebrow: "A nevünk kötelez",
    title: "New York-i mentalitás. Nyelvtudás a való élethez.",
    lead: "Manhattanben senki nem kérdezi, hány nyelvtani szabályt tudsz. Ott az számít, hogy meg tudod-e értetni magad — magabiztosan, gyorsan, természetesen. Mi is így tanítunk.",
    marquee: "MANHATTAN · NYELVSTÚDIÓ · BUDAPEST · ",
    points: [
      { k: "Beszélj", v: "Az első órától kezdve a célnyelven kommunikálsz." },
      { k: "Merj hibázni", v: "A hiba nem kudarc, hanem a tanulás leggyorsabb útja." },
      { k: "Használd", v: "Munkahelyi, utazási és hétköznapi helyzetekre készítünk fel." },
    ],
  },

  process: {
    eyebrow: "Hogyan működik?",
    title: "Négy lépés az első magabiztos mondatig",
    lead: "Nincs bonyolult adminisztráció és nincs kockázat. Így indul nálunk egy tanfolyam.",
    steps: [
      {
        n: "01",
        title: "Ingyenes szintfelmérés",
        desc: "Felmérjük, hol tartasz most. Ez néhány perc, és nem kerül semmibe.",
      },
      {
        n: "02",
        title: "Megkeressük a csoportod",
        desc: "A szinted, a célod és az időbeosztásod alapján ajánlunk tanfolyamot.",
      },
      {
        n: "03",
        title: "Ingyenes próbaóra",
        desc: "Beülsz egy valódi órára. Ha jónak érzed, jelentkezel — ha nem, semmi kötelezettség.",
      },
      {
        n: "04",
        title: "Elkezded használni",
        desc: "Hétről hétre beszélsz, és pár hónap múlva már nem fordítasz, hanem gondolkodsz a nyelven.",
      },
    ],
  },

  method: {
    eyebrow: "A módszer",
    title: "Amiben hiszünk",
    lead: "Nem ígérünk csodát. Ezt a néhány dolgot viszont minden órán komolyan vesszük.",
    prev: "Előző",
    next: "Következő",
    goTo: "Ugrás a(z) {n}. idézetre",
    /**
     * These are the studio's own teaching principles, not student reviews.
     * The component also renders an optional `author` / `role` pair, so real,
     * attributed testimonials can be dropped in here without code changes.
     */
    quotes: [
      {
        text: "A nyelvtudás nem attól lesz jó, hogy hibátlan. Attól lesz jó, hogy meg mersz szólalni.",
        author: null as string | null,
        role: "A Manhattan-módszer" as string | null,
      },
      {
        text: "Kis csoportban nincs hova elbújni — és pontosan ezért fejlődsz ott a leggyorsabban.",
        author: null as string | null,
        role: "A Manhattan-módszer" as string | null,
      },
      {
        text: "Előbb próbáld ki, aztán dönts. Ezért ingyenes nálunk a szintfelmérés és az első óra is.",
        author: null as string | null,
        role: "A Manhattan-módszer" as string | null,
      },
      {
        text: "A nyelvvizsga nem cél, hanem következmény. Ha valóban használod a nyelvet, a papír is meglesz.",
        author: null as string | null,
        role: "A Manhattan-módszer" as string | null,
      },
    ],
  },

  cta: {
    title: "Készen állsz, hogy magabiztosabban beszélj?",
    lead: "Kezdd egy ingyenes szintfelméréssel és egy próbaórával. Utána már csak annyi a dolgod, hogy megszólalsz.",
    primary: "Jelentkezem",
    secondary: "Kapcsolat",
  },

  contact: {
    eyebrow: "Kapcsolat",
    title: "Beszéljünk!",
    lead: "Írj nekünk, vagy hívj minket — segítünk kiválasztani a hozzád illő tanfolyamot.",
    locationsTitle: "Helyszíneink",
    locations: {
      ors: { name: "Örs vezér tere", note: "Árkád Irodaház, II. emelet" },
      obuda: { name: "Óbuda", note: "Manhattan Nyelvstúdió Buda" },
    },
    openMap: "Megnyitás térképen",
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
      messagePlaceholder: "Mesélj röviden, hol tartasz most és mi a célod.",
      optional: "opcionális",
      submit: "Üzenet küldése",
      sending: "Küldés…",
      successTitle: "Köszönjük!",
      success: "Megkaptuk az üzeneted, hamarosan válaszolunk.",
      again: "Új üzenet írása",
      errors: {
        name: "Kérjük, add meg a neved.",
        email: "Kérjük, add meg az e-mail-címed.",
        emailInvalid: "Ez az e-mail-cím nem tűnik érvényesnek.",
        phoneInvalid: "Ez a telefonszám nem tűnik érvényesnek.",
        language: "Kérjük, válassz nyelvet.",
        message: "Kérjük, írj néhány szót.",
        summary: "Az űrlap hiányosan lett kitöltve. Kérjük, ellenőrizd a megjelölt mezőket.",
        network:
          "Az üzenetet most nem sikerült elküldeni. Kérjük, próbáld újra, vagy hívj minket telefonon.",
        unavailable:
          "Az online üzenetküldés jelenleg nem érhető el. Hívj minket bátran telefonon — szívesen segítünk.",
      },
    },
  },

  footer: {
    tagline: "Nyelvtanfolyamok Budapesten, kis csoportokban — angol, német, francia, olasz és spanyol nyelven.",
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
    /** Deliberately factual and generic: no legal text is invented here. */
    placeholderNote:
      "Ennek az oldalnak a végleges jogi szövegét a Manhattan Nyelvstúdió adja meg. Addig is bármilyen adatkezeléssel kapcsolatos kérdéssel fordulj hozzánk telefonon vagy a kapcsolati űrlapon.",
  },

  notFound: {
    title: "Ez az oldal nem található",
    lead: "A keresett oldal nem létezik, vagy időközben átkerült máshova.",
    cta: "Vissza a kezdőlapra",
  },
} as const;

export type Dictionary = Widen<typeof hu>;

export default hu;
