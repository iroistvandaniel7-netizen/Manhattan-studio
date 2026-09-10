import type { Widen } from "../types";

/**
 * Hungarian dictionary — the reference shape. `sk.ts` and `en.ts` are typed
 * against `Dictionary`, so a missing key in any locale is a build error.
 *
 * CONTENT RULE: every fact traces back to MANHATTAN STUDIO's own published
 * information or to what the studio has told us directly — the seven
 * languages, the English Club, the address, phone, email and opening hours.
 * Nothing is invented. Do not add claims, figures, slogans or testimonials
 * that cannot be traced back to the studio.
 *
 * Opening hours in particular: the studio dropped weekends, and the claim
 * lived in nine places across three languages plus the structured data. If it
 * changes again, search for the day names — not just the section somebody
 * happens to point at.
 *
 * Prices are not here. They live in `src/lib/catalogue.ts`, in cents, because
 * the checkout endpoint prices every order from the same file the page reads —
 * a price written twice is a price that will disagree with itself.
 */
const hu = {
  meta: {
    title: "MANHATTAN STUDIO — Nyelviskola Dunaszerdahelyen",
    description:
      "Angol, német, orosz, spanyol, olasz, szlovák és magyar nyelvtanfolyamok Dunaszerdahely szívében. Normál, félintenzív és intenzív kurzusok, hétköznap 9:00–20:00.",
    ogAlt: "MANHATTAN STUDIO — nyelviskola Dunaszerdahelyen",
    skipToContent: "Ugrás a tartalomra",
  },

  nav: {
    home: "Kezdőlap",
    about: "Rólunk",
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
    lead: "Nyelviskola Dunaszerdahely szívében. Kezdőtől haladóig, hétköznap reggeltől estig.",
    cta: "Kurzusok megtekintése",
    photoAlt: "Manhattan látképe naplementében, az alsó-manhattani felhőkarcolókkal.",
    scroll: "Görgess",
  },

  facts: {
    title: "Számokban",
    items: [
      { value: "7", label: "Nyelv", note: "Kezdőtől haladóig" },
      { value: "165 €", label: "10 egyéni óra", note: "Bármelyik nyelvre" },
      /* Az „English Club" a stúdió saját, folyamatos programja — nem a
         kurzusokhoz járó tréning, az az „Amit kapsz" szakaszban maradt. */
      { value: "20+", label: "English Club", note: "Kéthetente, egész tanévben" },
      { value: "5", label: "Nap nyitva", note: "Hétköznap 9:00–20:00" },
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

    /* Amit a vevő tudni akar, mielőtt kosárba tesz: nem jön rá semmi.
       Az áfa jogcímét nem nevezi meg — az a stúdió könyvelőjének a dolga —,
       csak azt mondja ki, ami a vevő szempontjából számít. */
    priceNote: "Az árak véglegesek: a feltüntetett összegen felül nem számítunk fel semmilyen további díjat.",

    groupTitle: "Csoportos kurzusok",
    groupNote:
      "A többi nyelv csoportos óráiról érdeklődj a stúdióban — az induló csoportokat a jelentkezők szintjéhez igazítjuk.",
    groupEnquire: "Érdeklődöm a csoportos órákról",

    privateTitle: "Egyéni órák",
    privateLead:
      "Az egyéni órák mind a hét nyelvre érvényesek, a csomag megvásárlása után választod ki, melyiket tanulod.",

    /* A stúdió megerősítette: a megvett órák nem évülnek el. Ez a vevőnek
       jó hír, tehát ki van írva, nem az ÁSZF-ben elrejtve. */
    privateValidity: "A megvásárolt órák nem járnak le: addig érvényesek, amíg fel nem használod őket.",

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

    soldOut: "Betelt",
    soldOutNote: "Ez a csoport betelt. Írj nekünk, és szólunk, ha új indul.",
    soldOutAsk: "Értesítést kérek",

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
    /* Amit a vevő a gomb fölött olvas, aszerint, hogy be van-e kötve a fizetés.
       A szerver dönti el, nem egy külön kapcsoló: így nem tud olyan állapot
       lenni, ahol az oldal mást ír, mint amit a rendszer csinál. */
    payNow:
      "A fizetés a következő lépésben, a Stripe biztonságos oldalán történik. Bankkártyával fizetsz, és utána azonnal visszaigazolást kapsz.",
    submitPay: "Tovább a fizetéshez",

    payLater:
      "A fizetés még nem online történik: a megrendelés után felvesszük veled a kapcsolatot, és a stúdióban vagy átutalással rendezed.",

    /* A gomb alatt, nem fölötte: ott van, ahol a vevő dönt, és nem az utolsó,
       amit a szeme megakad rajta a gomb megnyomása előtt. */
    termsNote: "A megrendeléssel elfogadod a feltételeinket:",
    termsLink: "Általános szerződési feltételek",

    /* A vevőnek küldött visszaigazoló e-mail szövege. Sima szöveg, nem HTML:
       minden levelezőben olvasható, és nincs mit elrontani rajta. */
    mailSubject: "MANHATTAN STUDIO — rendelés visszaigazolása",
    mailIntro: "Köszönjük a rendelésed! Az alábbiakat kaptuk meg:",
    mailPaidNext:
      "A fizetés megtörtént. Hamarosan jelentkezünk az időpontokkal.",
    mailUnpaidNext:
      "A fizetés még nem történt meg: felvesszük veled a kapcsolatot, és a stúdióban vagy átutalással rendezed.",
    mailOutro: "Ha bármi kérdésed van, válaszolj erre a levélre, vagy hívj minket.",

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
      { title: "English Club", desc: "Kéthetente találkozunk, az egész tanéven át." },
      { title: "Kiscsoportos foglalkozások", desc: "A csoportokat kisebb létszámmal is elindítjuk." },
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
    hoursDays: "Hétfő – Péntek",
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
    terms: "ÁSZF",
  },

  /* A kép leírása, nem állítás róluk: nem tudjuk, kik ők. */
  people: {
    alt: "Fiatal pár a Times Square-en, mögöttük sárga taxik és fényreklámok",
  },

  /*
   * A Rólunk oldal.
   *
   * A szöveg a stúdiótól származik, szó szerint — ez a saját hangja, nem az
   * enyém. A tagolás az egyetlen, ami hozzá lett téve: a folyó szövegből
   * címek és bekezdések lettek, hogy olvasható legyen egy telefonon is.
   *
   * A kurzustípusok itt leírások, nem megvásárolható tételek: a bolt a
   * konkrét, meghirdetett kurzusokat árulja, ez a lap pedig azt mondja el,
   * milyen formák léteznek. Ezért nincs mellettük ár és „kosárba" gomb.
   */
  /*
   * A süti-ablak.
   *
   * A szöveg pontosan azt mondja, ami történik: ma a két válasz között nincs
   * különbség abban, amit az oldal csinál, mert semmi nem mér semmit. Ezt
   * kimondani jobb, mint úgy tenni, mintha a kattintás sokat döntene el —
   * és ha egyszer indul a mérés, a kapcsoló már ott van és a válaszhoz van kötve.
   */
  cookieBanner: {
    title: "Sütik ezen az oldalon",
    body: "Egyetlen sütit használunk: azt, amelyik megjegyzi ezt a válaszodat. Nyomkövető és hirdetési sütit nem teszünk le. Ha engedélyezed, a jövőben névtelen látogatottsági statisztikát mérhetünk — enélkül is minden ugyanúgy működik.",
    more: "Cookie-tájékoztató",
    accept: "Elfogadom",
    necessary: "Csak a szükségeseket",
  },

  about: {
    eyebrow: "Rólunk",
    title: "A nyelv, amit végre használni is mersz",
    metaDescription:
      "A MANHATTAN Nyelvstúdió Dunaszerdahelyen: modern módszerek, tapasztalt tanárok, jó hangulatú órák — a saját szintedhez és céljaidhoz igazodva.",

    lead: "Szeretnél megtanulni egy új nyelvet? Fejlesztenéd a meglévő tudásodat? Vagy végre magabiztosan szeretnél megszólalni angolul vagy más idegen nyelven?",
    leadStrong: "Mi segítünk elérni a célodat.",
    leadMore:
      "A MANHATTAN Nyelvstúdióban modern módszerekkel, tapasztalt tanárokkal és jó hangulatú órákon tanulhatsz – a saját szintedhez és céljaidhoz igazodva.",

    whyTitle: "Miért a MANHATTAN?",
    whyItems: [
      {
        title: "A te célod, a te tempód",
        desc: "Akár a munkádhoz van szükséged nyelvtudásra, akár nyelvvizsgára készülsz, esetleg külföldre mennél, vagy egyszerűen csak szeretnél magabiztosabban kommunikálni – mi segítünk megtalálni a számodra megfelelő utat.",
      },
      {
        title: "Tapasztalt tanárok",
        desc: "Felkészült, szakképzett oktatóink támogatnak abban, hogy ne csak megtanuld a nyelvet, hanem használni is merd.",
      },
      {
        title: "Látványos fejlődés",
        desc: "Hatékony módszerekkel és jól felépített tanfolyamokkal dolgozunk, hogy a tanulással töltött idő valóban a fejlődésedről szóljon.",
      },
      {
        title: "Jó hangulatú órák",
        desc: "A nyelvtanulás lehet szórakoztató is. Nálunk támogató, közvetlen légkörben tanulhatsz, ahol a kérdések és a hibák is természetes részei a fejlődésnek.",
      },
    ],

    coursesTitle: "Találd meg a hozzád illő tanfolyamot!",
    coursesLead:
      "Akár most ismerkedsz a nyelvvel, akár már rendelkezel előzetes tudással, nálunk megtalálod a megfelelő szintet és képzési formát.",
    coursesItems: [
      {
        title: "Intenzív kurzus",
        desc: "Ha gyorsan szeretnél fejlődni, és rövidebb idő alatt szeretnéd elérni a célodat.",
      },
      {
        title: "Félintenzív kurzus",
        desc: "Ha fontos számodra a folyamatos haladás, de rugalmasabb tempóra van szükséged.",
      },
      {
        title: "Normál kurzus",
        desc: "Ha a munkád vagy a tanulmányaid mellett, kényelmesebb tempóban szeretnél nyelvet tanulni.",
      },
      {
        title: "Alapfoktól felsőfokig",
        desc: "A jelenlegi tudásszintedhez igazodva segítünk megtalálni a következő lépcsőfokot.",
      },
    ],

    /* Az ábra felirata. A három görbe ugyanoda ér — csak más idő alatt. */
    chartAxis: { time: "Idő", level: "Tudásszint" },
    chartNote: "Ugyanaz a cél, három tempóban.",

    closing:
      "A nyelvtanulás nem kell, hogy évekig tartson – a megfelelő módszerrel, megfelelő tempóban és megfelelő támogatással sokkal hatékonyabban haladhatsz.",

    ctaCourses: "Nézd meg a kurzusokat",
    ctaContact: "Kérdésed van? Írj nekünk",
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
    complaintsTitle: "Reklamáció",
    complaintsNote: "Ha panaszod van a szolgáltatással kapcsolatban, ide írj — a bejelentést a törvényben előírt határidőn belül elintézzük.",
  },

  thanks: {
    eyebrow: "Megrendelés",
    title: "Köszönjük a rendelésed!",
    lead: "A fizetés sikerült. A rendelésed megérkezett hozzánk, és hamarosan jelentkezünk az időpontokkal.",
    next: "A rendelés azonosítóját érdemes megőrizned — erre tudsz hivatkozni, ha kérdésed van. Ha valami nem stimmel, hívj minket bátran.",
    metaDescription: "Köszönjük a rendelésed a MANHATTAN STUDIO nyelviskolánál.",
  },
  legal: {
    privacyTitle: "Adatvédelmi tájékoztató",
    cookiesTitle: "Cookie-tájékoztató",
    termsTitle: "Általános szerződési feltételek",
    backHome: "Vissza a kezdőlapra",
    contactHeading: "Kérdésed van az adataiddal kapcsolatban?",
    termsContactHeading: "Kérdésed van a megrendeléssel kapcsolatban?",
    controllerHeading: "Ki kezeli az adataidat",
    sellerHeading: "Kivel szerződsz",
    vatNote:
      "A társaság a szlovák áfatörvény §4 szerint 2023. november 2-tól áfaalany.",

    privacyLead:
      "Ez a tájékoztató azt írja le, milyen adatokat kér tőled ez a weboldal, mi történik velük, és mit kérhetsz velük kapcsolatban.",
    privacyPending:
      "Ez a tájékoztató az adatkezelésről szól. A megrendelés, a fizetés és az elállás szabályai az általános szerződési feltételekben olvashatók — a link a lap alján van.",

    privacySections: [
      {
        heading: "Milyen adatokat kérünk",
        body: [
          "Csak azt, amit te írsz be. Az oldal magától semmit nem gyűjt rólad.",
        ],
        list: [
          "Kapcsolati űrlap: név, e-mail-cím, telefonszám (nem kötelező), a téged érdeklő nyelv, és az üzeneted.",
          "Megrendelés: név, e-mail-cím, telefonszám (nem kötelező), megjegyzés (nem kötelező), és hogy melyik kurzust vagy csomagot választottad.",
        ],
      },
      {
        heading: "Mi történik velük",
        body: [
          "Az űrlap és a megrendelés adatai a stúdióhoz kerülnek, hogy fel tudjuk venni veled a kapcsolatot és el tudjuk indítani a kurzust. Nem adjuk el és nem adjuk át őket senkinek marketing céljából.",
          "Bankkártyás fizetésnél a fizetést a Stripe bonyolítja, a saját oldalán. A kártyaszámodat a stúdió soha nem látja és nem tárolja — a Stripe csak azt jelzi vissza, hogy a fizetés megtörtént, és mennyiről.",
        ],
      },
      {
        heading: "Nem követünk",
        body: [
          "Ezen az oldalon nincs Google Analytics, nincs Facebook-pixel, és nincs semmilyen más mérő- vagy hirdetési kód. Nem építünk rólad profilt, és nem követjük, mit néztél meg.",
          "Egyetlen sütit használunk: azt, amelyik megjegyzi, mit válaszoltál a süti-ablakban. A részletek a cookie-tájékoztatóban.",
        ],
      },
      {
        heading: "Meddig őrizzük meg",
        body: [
          "A kurzus befejezésétől számított egy évig. Utána töröljük őket, kivéve amit számviteli vagy adójogszabály hosszabb ideig megőrizni rendel — a kiállított számlákat például a törvény szerinti ideig tartjuk meg.",
        ],
      },
      {
        heading: "A jogaid",
        body: [
          "Bármikor kérheted, hogy megmondjuk, milyen adataid vannak nálunk, hogy javítsuk vagy töröljük őket, vagy hogy ne kezeljük őket tovább. Elég egy e-mail az alábbi címre; igazolnunk kell, hogy tényleg te vagy az.",
          "Ha úgy érzed, rosszul kezeljük az adataidat, panasszal fordulhatsz a szlovák adatvédelmi hatósághoz (Úrad na ochranu osobných údajov Slovenskej republiky).",
        ],
      },
    ],

    /*
     * Az ÁSZF.
     *
     * Minden mondat mögött vagy a stúdió által megadott adat áll, vagy annak
     * leírása, amit a kód ténylegesen csinál — a fizetés a Stripe oldalán
     * történik, a hivatkozási szám MS-ÉÉHH-XXXXX alakú, a kosár csak
     * azonosítót küld. Amiről a stúdió nem nyilatkozott, az nincs benne:
     * inkább hiányzik, mint hogy kitalált szabály legyen.
     */
    termsLead:
      "Ez az oldal azt írja le, mit vásárolsz, hogyan jön létre a megrendelés, hogyan fizetsz, és mit tehetsz, ha meggondolod magad.",
    termsPending:
      "Ezek a feltételek a stúdió által megadott adatokon alapulnak. Mielőtt kötelező érvényűvé válnának, jogi ellenőrzésen mennek át — addig ez az oldal tájékoztatás.",

    termsSections: [
      {
        heading: "Mit vásárolsz",
        body: [
          "A stúdió nyelvoktatást ad el: meghirdetett csoportos kurzusokat, és magánórákat, amelyeket órákból álló csomagokban lehet megvenni. Minden kurzusnál és csomagnál ki van írva, hány tanórát tartalmaz.",
          "A feltüntetett árak véglegesek. Tartalmazzák az áfát, és a kiírt összegen felül semmilyen további díjat nem számítunk fel.",
        ],
      },
      {
        heading: "Hogyan jön létre a megrendelés",
        body: [
          "A kurzust vagy a csomagot kosárba teszed, megadod a neved és az e-mail-címed — a telefonszám és a megjegyzés nem kötelező —, majd elküldöd a megrendelést.",
          "A megrendelés kap egy hivatkozási számot MS-2609-ABCDE alakban. Ezt add meg, ha a megrendelésről kérdezel: ez alapján találjuk meg.",
          "A szerződés akkor jön létre, amikor a fizetés beérkezett, és a megrendelést e-mailben visszaigazoltuk. Addig a megrendelés ajánlat.",
        ],
      },
      {
        heading: "Fizetés",
        body: [
          "A fizetés a Stripe fizetési oldalán történik, euróban. Onnan visszakerülsz erre az oldalra.",
          "A kártyaadataidat a stúdió nem látja és nem tárolja — azokat a Stripe kezeli. A stúdió csak azt kapja vissza, hogy a fizetés megtörtént, és mekkora összegről.",
          "Hogy pontosan mivel lehet fizetni, azt a fizetési oldal mutatja meg: ott csak azok a módok jelennek meg, amelyeket a kártyád és az eszközöd is támogat.",
        ],
      },
      {
        heading: "A kurzus elindul",
        body: [
          "A meghirdetett kurzust akkor is megtartjuk, ha a vártnál kevesebben jelentkeznek. A helyed nem múlik azon, összejön-e a létszám.",
        ],
      },
      {
        heading: "Meddig érvényes, amit megvettél",
        body: [
          "A magánórás csomagok nem járnak le. A megvásárolt órák addig érvényesek, amíg fel nem használod őket — nincs rájuk határidő.",
          "A csoportos kurzusok a meghirdetett időpontban futnak, a megadott helyszínen, a kiírt óraszámban.",
        ],
      },
      {
        heading: "Ha meggondolod magad",
        body: [
          "Fogyasztóként, aki interneten rendel, a megrendeléstől számított 14 napon belül indokolás nélkül elállhatsz. Elég egy e-mail az alább megadott címre, a megrendelés hivatkozási számával.",
          "Ha a tanítás a kérésedre már a 14 nap letelte előtt elkezdődött, az elállást arányosan számoljuk el: a már megtartott órák árát levonjuk, a maradékot visszautaljuk.",
          "Ha a tanítás még nem kezdődött el, a teljes összeget visszautaljuk. A pénz azon a módon megy vissza, amellyel fizettél.",
        ],
      },
      {
        heading: "Felügyeleti hatóság",
        body: [
          "Ha a panaszod nálunk nem oldódik meg, a szlovák Kereskedelmi Felügyelethez (Slovenská obchodná inšpekcia, SOI) fordulhatsz. Az elérhetőségei a www.soi.sk oldalon találhatók.",
        ],
      },
    ],

    termsComplaintsHeading: "Panasz, reklamáció",
    termsComplaintsBody: [
      "Ha nem vagy elégedett azzal, amit kaptál, írd meg. Add meg a megrendelés hivatkozási számát, és azt, hogy mi a baj.",
      "A panaszt átvesszük, és a jogszabályban előírt határidőn belül válaszolunk rá.",
    ],

    cookiesLead:
      "Röviden: ez az oldal egyetlen sütit használ, azt is csak arra, hogy megjegyezze a válaszodat. Nyomkövetés nincs.",

    cookiesSections: [
      {
        heading: "Egyetlen sütit használunk",
        body: [
          "Azt, amelyik megjegyzi, mit válaszoltál a süti-ablakban. Ha nem tárolnánk el a döntésedet, minden egyes oldalbetöltésnél újra megkérdeznénk.",
          "Nyomkövető, statisztikai és hirdetési sütit nem helyezünk el — sem sajátot, sem harmadik félét. A „Csak a szükségeseket” és az „Elfogadom” válasz között ma nincs különbség abban, amit az oldal csinál; a különbség akkor lép életbe, ha a jövőben látogatottsági mérés indul, és azt előre a te válaszodhoz kötöttük.",
        ],
        list: [
          "Neve: ms-consent — Tartalma: „all” vagy „necessary” — Érvényessége: 6 hónap",
        ],
      },
      {
        heading: "Meggondoltad magad?",
        body: [
          "Töröld az oldal sütijeit a böngésződ beállításaiban, és a kérdés újra megjelenik. Hat hónap után magától is újra megkérdezzük.",
        ],
      },
      {
        heading: "A kosarad a saját böngésződben marad",
        body: [
          "Ha kurzust teszel a kosárba, a böngésződ eltárolja, mi van benne, hogy frissítés után is megmaradjon. Ez nem süti: nem kerül el a gépedről, és nem küldjük sehová. Csak akkor jut el hozzánk, amikor te elküldöd a megrendelést.",
          "Bármikor eltüntetheted: ürítsd ki a kosarat, vagy töröld az oldal adatait a böngésződ beállításaiban.",
        ],
      },
      {
        heading: "Fizetéskor",
        body: [
          "A bankkártyás fizetés a Stripe oldalán történik. A Stripe a saját oldalán a saját sütijeit használja, a saját szabályzata szerint — arra az oldalra ez a tájékoztató nem terjed ki.",
        ],
      },
    ],
  },

  notFound: {
    title: "Az oldal nem található",
    lead: "A keresett oldal nem létezik.",
    cta: "Vissza a kezdőlapra",
  },
} as const;

export type Dictionary = Widen<typeof hu>;

export default hu;
