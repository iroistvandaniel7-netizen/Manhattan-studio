import type { Widen } from "../types";

/**
 * Hungarian dictionary — the reference shape. `sk.ts` and `en.ts` are typed
 * against `Dictionary`, so a missing key in any locale is a build error.
 *
 * CONTENT RULE: every fact traces back to MANHATTAN STUDIO's own published
 * information (manhattanstudio.sk, Dunajská Streda) — the seven languages,
 * the free communication training with English and German, the minimum group
 * size, the address, phone, email and opening hours. Nothing is invented. Do
 * not add claims, figures, slogans or testimonials that cannot be traced back
 * to the studio.
 *
 * Prices are not here. They live in `src/lib/catalogue.ts`, in cents, because
 * the checkout endpoint prices every order from the same file the page reads —
 * a price written twice is a price that will disagree with itself.
 */
const hu = {
  meta: {
    title: "MANHATTAN STUDIO — Nyelviskola Dunaszerdahelyen",
    description:
      "Angol, német, orosz, spanyol, olasz, szlovák és magyar nyelvtanfolyamok Dunaszerdahely szívében. Normál, félintenzív és intenzív kurzusok, a hét minden napján 9:00–20:00.",
    ogAlt: "MANHATTAN STUDIO — nyelviskola Dunaszerdahelyen",
    skipToContent: "Ugrás a tartalomra",
  },

  nav: {
    home: "Kezdőlap",
    languages: "Nyelvek",
    courses: "Kurzusok",
    why: "Amit kapsz",
    contact: "Kapcsolat",
    cta: "Jelentkezem",
    openMenu: "Menü megnyitása",
    closeMenu: "Menü bezárása",
    languageLabel: "Nyelv választása",
    backToTop: "Vissza a tetejére",
  },

  hero: {
    eyebrow: "Dunaszerdahely · Korzo Bélu Bartóka",
    title: "Hét nyelv. Egy stúdió.",
    lead: "Nyelviskola Dunaszerdahely szívében. Kezdőtől haladóig, a hét minden napján — hétvégén is.",
    cta: "Kurzusok megtekintése",
    photoAlt: "Manhattan látképe naplementében, az alsó-manhattani felhőkarcolókkal.",
    scroll: "Görgess",
  },

  facts: {
    title: "Számokban",
    items: [
      { value: "7", label: "Nyelv", note: "Kezdőtől haladóig" },
      { value: "16,50 €", label: "Egyéni óra ettől", note: "10 órás csomagban" },
      { value: "10", label: "Óra tréning ajándékba", note: "Angol és német kurzushoz" },
      { value: "7", label: "Nap nyitva", note: "Minden nap 9:00–20:00" },
    ],
  },

  languages: {
    eyebrow: "Nyelvek",
    title: "Amit tanítunk",
    lead: "Hét nyelv, kezdő szinttől haladóig.",
    map: {
      spokenIn: "Hol beszélik",
    },
    /* Országok, ahol az adott nyelv hivatalos vagy mindennapi használatban van. */
    regions: {
      gb: "Egyesült Királyság",
      ie: "Írország",
      us: "Egyesült Államok",
      ca: "Kanada",
      au: "Ausztrália",
      nz: "Új-Zéland",
      za: "Dél-Afrika",
      in: "India",
      de: "Németország",
      at: "Ausztria",
      ch: "Svájc",
      ru: "Oroszország",
      by: "Belarusz",
      kz: "Kazahsztán",
      es: "Spanyolország",
      mx: "Mexikó",
      co: "Kolumbia",
      pe: "Peru",
      cl: "Chile",
      ar: "Argentína",
      it: "Olaszország",
      sk: "Szlovákia",
      hu: "Magyarország",
    },
    items: [
      { code: "EN", name: "Angol" },
      { code: "DE", name: "Német" },
      { code: "RU", name: "Orosz" },
      { code: "ES", name: "Spanyol" },
      { code: "IT", name: "Olasz" },
      { code: "SK", name: "Szlovák" },
      { code: "HU", name: "Magyar" },
    ],
  },

  courses: {
    eyebrow: "Kurzusok",
    title: "Árak",
    lead: "Csoportos angol kurzusok meghirdetett áron, és egyéni órák minden nyelvre.",

    groupTitle: "Csoportos kurzusok",
    groupNote:
      "A többi nyelv csoportos óráiról érdeklődj a stúdióban — az induló csoportokat a jelentkezők szintjéhez igazítjuk.",
    groupEnquire: "Érdeklődöm a csoportos órákról",

    privateTitle: "Egyéni órák",
    privateLead:
      "Az egyéni órák mind a hét nyelvre érvényesek, a csomag megvásárlása után választod ki, melyiket tanulod.",
    perHour: "óránként",

    hours: "óra",
    lesson: "óra",
    lessons: "óra",

    items: {
      "cambridge-30": {
        name: "Cambridge felkészítő",
        note: "Felkészítés a Cambridge nyelvvizsgára.",
      },
      "english-a1a2-20": {
        name: "Angol A1–A2",
        note: "Kezdő és újrakezdő szint, csoportban.",
      },
      "english-b1b2-20": {
        name: "Angol B1–B2",
        note: "Középhaladó szint, csoportban.",
      },
      "private-1": { name: "1 egyéni óra", note: "" },
      "private-5": { name: "5 egyéni óra", note: "" },
      "private-10": { name: "10 egyéni óra", note: "" },
    },

    groupBadge: "Angol",
    privateBadge: "Minden nyelvre",
    railPrevious: "Előző",
    railNext: "Következő",

    add: "Kosárba",
    added: "A kosárban",
  },

  shop: {
    cartTitle: "Kosár",
    open: "Kosár",
    empty: "A kosarad üres.",
    emptyNote: "Válassz egy kurzust vagy egy egyéni csomagot.",
    remove: "Törlés",
    quantity: "Mennyiség",
    increase: "Több",
    decrease: "Kevesebb",
    total: "Összesen",
    checkout: "Tovább a megrendeléshez",
    continue: "Vásárlás folytatása",
    itemCount: "tétel",

    checkoutTitle: "Megrendelés",
    checkoutLead: "Add meg az adataidat, és felvesszük veled a kapcsolatot.",
    summary: "A rendelésed",
    name: "Név",
    email: "E-mail",
    phone: "Telefonszám",
    note: "Megjegyzés",
    notePlaceholder: "Melyik nyelvet tanulnád, mikor érnél rá?",
    optional: "nem kötelező",
    submit: "Megrendelés elküldése",
    sending: "Küldés…",

    /* A payment provider is not connected yet, so say what actually happens. */
    payLater:
      "A fizetés még nem online történik: a megrendelés után felvesszük veled a kapcsolatot, és a stúdióban vagy átutalással rendezed.",

    doneTitle: "Megkaptuk a rendelésed",
    doneLead: "Hamarosan jelentkezünk a részletekkel.",
    orderRef: "Rendelés azonosítója",

    errorTitle: "A megrendelést nem sikerült elküldeni",
    errorLead: "Hívj minket, és felvesszük a rendelést telefonon.",
    required: "Kötelező mező",
    invalidEmail: "Érvényes e-mail címet adj meg",
  },

  why: {
    eyebrow: "Amit kapsz",
    title: "Ez jár hozzá",
    items: [
      {
        title: "10 óra kommunikációs tréning",
        desc: "Az angol és német kurzusokhoz ajándékba adjuk.",
      },
      { title: "Kis csoportok", desc: "A csoportok minimum négy fővel indulnak." },
      { title: "Nyitva minden nap", desc: "Hétfőtől vasárnapig, 9:00 és 20:00 között." },
      { title: "Hétvégén is tanulhatsz", desc: "A hétvégi időpontok is választhatók." },
      { title: "A város szívében", desc: "A stúdió Dunaszerdahely központjában van." },
      { title: "Nyelvvizsgára készítünk", desc: "Felkészítünk a sikeres nyelvvizsgára." },
    ],
  },

  contact: {
    eyebrow: "Kapcsolat",
    title: "Elérhetőség",
    lead: "Hívj, írj e-mailt, vagy töltsd ki az űrlapot.",
    addressTitle: "Cím",
    city: "Dunaszerdahely",
    openMap: "Térkép",
    phoneTitle: "Telefon",
    emailTitle: "E-mail",
    hoursTitle: "Nyitvatartás",
    hoursDays: "Hétfő – Vasárnap",
    hoursTime: "9:00 – 20:00",
    form: {
      title: "Írj nekünk",
      name: "Név",
      namePlaceholder: "Kovács Anna",
      email: "E-mail",
      emailPlaceholder: "anna@example.com",
      phone: "Telefonszám",
      phonePlaceholder: "0948 172 288",
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
      "Ennek az oldalnak a végleges jogi szövegét a MANHATTAN STUDIO adja meg. Addig is bármilyen adatkezeléssel kapcsolatos kérdéssel fordulj hozzánk telefonon vagy e-mailben.",
  },

  notFound: {
    title: "Az oldal nem található",
    lead: "A keresett oldal nem létezik.",
    cta: "Vissza a kezdőlapra",
  },
} as const;

export type Dictionary = Widen<typeof hu>;

export default hu;
