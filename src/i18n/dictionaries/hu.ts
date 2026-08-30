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
    quiz: "Szintfelmérő",
    gallery: "Galéria",
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
      { value: "165 €", label: "10 egyéni óra", note: "Bármelyik nyelvre" },
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

  /* A kép leírása, nem állítás róluk: nem tudjuk, kik ők. */
  people: {
    alt: "Öt mosolygó ember egymás mellett, világos háttér előtt",
  },

  /*
   * A szintfelmérő. A kérdések angolul vannak, és nincsenek lefordítva —
   * angoltudást mérnek, a fordításuk magát a mérendő dolgot fordítaná le.
   * Itt csak a keret van.
   *
   * A záró szöveg ajánlás, nem szintbesorolás: tizenöt böngészőben kitöltött
   * kérdés nem mér CEFR-szintet, és a lap ezt ki is mondja.
   */
  quiz: {
    eyebrow: "Szintfelmérő",
    title: "Milyen az angolod?",
    lead: "15 kérdés, körülbelül két perc. A végén megmutatjuk az eredményed, és hogy melyik kurzussal érdemes kezdened.",

    questionLabel: "Kérdés",
    progressLabel: "Haladás",
    tiers: {
      basic: "Alapszint",
      mid: "Középszint",
      high: "Haladó",
    },

    correct: "Helyes",
    wrong: "Nem ez az",
    solution: "A helyes válasz:",

    scoreTitle: "Az eredményed",
    recommendTitle: "Ezt a kurzust ajánljuk",
    seeAll: "Összes kurzus és ár",
    again: "Újra kitöltöm",

    bands: {
      starter: {
        title: "Kezdő és újrakezdő",
        desc: "Érdemes az alapokkal kezdeni: igeidők, mondatszerkezet, mindennapi szókincs.",
      },
      core: {
        title: "Középhaladó",
        desc: "Az alapok megvannak. A következő lépés, hogy magabiztosan is használd őket.",
      },
      advanced: {
        title: "Haladó",
        desc: "Erős alapod van. Innen a nyelvvizsga felé érdemes lépni.",
      },
    },

    disclaimer:
      "Ez tájékoztató teszt, nem hivatalos szintfelmérés — a pontos szintedet a stúdióban beszéljük át.",
    bare: "A teszt kitöltéséhez JavaScript szükséges. Addig is nézd meg a kurzusokat és az árakat.",
  },

  /*
   * A galéria. A képleírások azt mondják el, ami a képen látszik, és semmi
   * többet — nem tudjuk, kik a képeken szereplők, és nem is állítunk róluk
   * semmit.
   *
   * A Times Square-es kép nem a stúdióban készült, ezért nem is a stúdió
   * képei közé kerül: külön áll, saját aláírással, és a négy stúdiófotót egy
   * cím vezeti be. Így a felépítés maga mondja meg, melyik hol készült.
   */
  gallery: {
    eyebrow: "Galéria",
    title: "A stúdió",
    lead: "Fényképek a dunaszerdahelyi stúdióról — a bejárattól a tantermekig.",
    metaDescription:
      "Fényképek a MANHATTAN STUDIO nyelviskoláról Dunaszerdahelyen: bejárat, tantermek, órák.",

    bannerAlt: "Times Square New Yorkban: óriásplakátok, sárga taxi és járókelők.",
    bannerCaption: "Times Square, New York",

    inside: "A stúdióban",

    photos: {
      entrance:
        "A stúdió bejárata a MANHATTAN nyelvstúdió táblájával; két ember tankönyvvel a lépcsőn.",
      board:
        "Tanterem: valaki a fehér táblára ír, a falon nyelvtani és szókincstáblák.",
      teacher:
        "Tanterem a táblával és a poszterekkel; az asztalon tankönyv, jegyzetek és képkártyák.",
      kids: "Felnőtt és gyerek képes kártyákkal játszik a szőnyegen, játékokkal berendezett szobában.",
    },

    open: "Nagyítás",
    close: "Bezárás",
    previous: "Előző kép",
    next: "Következő kép",
  },

  contactPage: {
    title: "Kapcsolat",
    lead: "Gyere be a stúdióba, hívj minket, vagy írd meg, mire van szükséged — és visszajelzünk.",
    metaDescription:
      "MANHATTAN STUDIO nyelviskola Dunaszerdahelyen: cím, telefonszám, e-mail és nyitvatartás.",
    findUs: "Elérhetőségek",
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
