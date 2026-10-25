import { AUTHORITY, COMPANY, EMAIL, HOSTING, RETENTION_MONTHS } from "@/lib/site";
import { CONSENT_COOKIE } from "@/lib/consent";

/**
 * Hungarian — the source of truth for the dictionary's shape.
 *
 * `sk.ts` and `en.ts` are typed against it, so a key missing from either is a
 * build error rather than a blank on the page. Company identifiers are read
 * from `lib/site.ts`, never retyped here.
 *
 * Claims a customer could hold the business to (the same-day quote, the
 * 24-hour redo guarantee) come from the Čistý Domov posters.
 */
const hu = {
  meta: {
    title: "Čistý Domov — takarítás Dunaszerdahelyen",
    description:
      "Lakás-, nagy-, ablak-, költözéses és irodatakarítás fix áron Dunaszerdahelyen és környékén. Megbízható csapat, saját eszközökkel.",
  },

  ui: {
    skipToContent: "Ugrás a tartalomra",
    mainNav: "Fő navigáció",
    mobileNav: "Mobil navigáció",
    openMenu: "Menü megnyitása",
    closeMenu: "Menü bezárása",
    language: "Nyelv",
  },

  nav: [
    { href: "#services", label: "Szolgáltatások" },
    { href: "#office", label: "Irodáknak" },
    { href: "#game", label: "Játék" },
    { href: "#faq", label: "GYIK" },
    { href: "#contact", label: "Kapcsolat" },
  ],

  hero: {
    eyebrow: "Otthoni takarítás",
    title: "Tiszta otthon.",
    titleSoft: "Több szabad idő.",
    lead: "Megbízható, ellenőrzött csapat. Saját eszközökkel érkezünk, Ön csak hazaér.",
    cta: "Ajánlatot kérek",
    boxLabel: "Kérjen ajánlatot",
  },

  video: {
    line: "Minden sarok.",
    lineSoft: "Minden alkalommal.",
    caption: "Saját szerekkel, saját eszközökkel, ugyanazzal a csapattal.",
    label: "Videó: lehúzóval tisztított ablaküveg",
  },

  services: {
    eyebrow: "Szolgáltatásaink",
    title: "Mindent tisztára.",
    intro: "Vállaljuk a",
    and: "és",
    outro: "Mindenhez saját szereket és eszközöket hozunk.",
    hint: "Kattintson egy szolgáltatásra, és már kérheti is rá az ajánlatot.",
    items: [
      {
        id: "lakas",
        name: "Rendszeres lakástakarítás",
        inSentence: "rendszeres lakástakarítást",
        desc: "Állandó időpont, állandó csapat. Megtanuljuk, hogyan szereti, és minden alkalommal úgy csináljuk.",
      },
      {
        id: "nagy",
        name: "Nagytakarítás",
        inSentence: "nagytakarítást",
        desc: "Évszakváltáskor, ünnepek előtt vagy egyszerűen azért, mert ideje volt. Mindent elmozdítunk, ami elmozdítható.",
      },
      {
        id: "ablak",
        name: "Ablak- és üvegtisztítás",
        inSentence: "ablak- és üvegtisztítást",
        desc: "Csíkmentes üveg kívül-belül, tiszta keretek és párkányok. Külön is kérhető, vagy bármelyik takarítás mellé.",
      },
      {
        id: "koltozes",
        name: "Költözés utáni takarítás",
        inSentence: "költözés utáni takarítást",
        desc: "Átadás előtt, hogy visszakapja a kauciót — vagy beköltözés előtt, hogy már az első este otthon érezze magát.",
      },
      {
        id: "iroda",
        name: "Irodatakarítás",
        inSentence: "irodatakarítást",
        desc: "Munkaidő után takarítunk, hogy a csapatának ne kelljen kerülgetnie minket. Reggelre tiszta iroda.",
      },
    ],
  },

  steps: {
    eyebrow: "Így dolgozunk",
    title: "Három lépés",
    titleSoft: "a tiszta lakásig.",
    items: [
      { title: "Hívjon vagy írjon", desc: "Elmondja, mekkora a lakás és mire van szükség. Még aznap kap egy fix árat." },
      { title: "Megérkezünk", desc: "A megbeszélt időpontban, saját szerekkel és eszközökkel. Kulcsot is átvehetünk." },
      { title: "Ön hazaér", desc: "Tiszta, friss otthon. Fizetés a takarítás után, készpénzzel vagy kártyával." },
    ],
  },

  game: {
    eyebrow: "Mini játék",
    title: "Tisztítsa meg az ablakot!",
    lead: "Húzza végig az egeret vagy az ujját a koszos üvegen. Húsz másodperce van — lássuk, mennyire lesz kristálytiszta.",
    start: "Indulhat",
    again: "Még egyszer",
    time: "Idő",
    clean: "Tiszta",
    best: "Legjobb",
    keyboardHint: "Billentyűzettel: a nyilakkal mozgathatja a szivacsot.",
    canvasLabel: "Koszos ablak. Az egérrel, ujjal vagy a nyílbillentyűkkel tisztíthatja.",
    canvasText: "Tisztíts meg!",
    noScript: "A játékhoz JavaScript kell. Addig is: az ablakpucolást nyugodtan bízza ránk.",
    results: [
      { min: 0, title: "Ezt inkább bízza ránk.", text: "Semmi gond — mi ezt csináljuk egész nap. Csíkmentesen." },
      { min: 50, title: "Szép munka!", text: "Majdnem ott van. Az utolsó csíkokat hagyja meg nekünk." },
      { min: 85, title: "Majdnem kristály!", text: "Komolyan mondjuk: ilyen tempóval már szinte nálunk dolgozhatna." },
      { min: 97, title: "Kristálytiszta!", text: "Hibátlan munka. Otthon viszont nyugodtan hagyja ránk — mi is pont így csináljuk." },
    ],
    cta: "Kérek ajánlatot",
  },

  office: {
    eyebrow: "Cégeknek, irodáknak",
    title: "Reggelre",
    titleSoft: "tiszta iroda.",
    lead: "Munkaidő után takarítunk, hogy a csapatának ne kelljen kerülgetnie minket.",
    items: ["Rugalmas, havi szerződés", "Állandó, betanított takarítók", "Számla, átlátható díjak", "Fogyóeszköz-utántöltés"],
    cta: "Irodai ajánlatot kérek",
  },

  gallery: {
    eyebrow: "Munkáink",
    title: "Előtte és utána.",
    before: "Előtte",
    after: "Utána",
  },

  faq: {
    eyebrow: "GYIK",
    title: "Kérdése van?",
    lead: "Pukkassza ki a buborékokat — mindegyikben egy válasz lapul.",
    answered: "megválaszolva",
    answerLabel: "Válasz",
    doneTitle: "Minden kérdés tisztázva!",
    doneText: "Ha maradt még kérdése, írjon vagy hívjon nyugodtan.",
    again: "Újra",
    cta: "Ajánlatot kérek",
    items: [
      {
        q: "Otthon kell lennem a takarítás alatt?",
        a: "Nem szükséges. Sok ügyfelünk kulcsot ad át, vagy a portán hagyja. A takarítás végén üzenetben jelezzük, hogy végeztünk.",
      },
      {
        q: "Kell takarítószert vagy eszközt biztosítanom?",
        a: "Nem, mindent hozunk: szereket, porszívót, felmosót, létrát. Ha van kedvenc szere, szívesen azzal dolgozunk.",
      },
      {
        q: "Mennyi ideig tart egy takarítás?",
        a: "A lakás méretétől és a feladattól függ — az ajánlatban a várható időt is megírjuk.",
      },
      {
        q: "Hogyan fizethetek?",
        a: "A takarítás után, készpénzzel vagy kártyával. Cégeknek havi számlát állítunk ki.",
      },
      {
        q: "Mi történik, ha valami nem tetszik?",
        a: "Szóljon 24 órán belül, és visszamegyünk, hogy díjmentesen pótoljuk. Ez a garanciánk.",
      },
      {
        q: "Le tudom mondani vagy módosítani az időpontot?",
        a: "Igen, a megbeszélt időpont előtt legalább 24 órával díjmentesen.",
      },
    ],
  },

  contact: {
    eyebrow: "Kapcsolat",
    title: "Kérjen ajánlatot.",
    lead: "Írja meg, mire van szüksége, és még aznap jelentkezünk fix árral. Ha sürgős, hívjon nyugodtan.",
    area: "Dunaszerdahely és 30 km-es környéke",
    hours: "Hétfő–Szombat",
    form: {
      title: "Ajánlatkérés",
      name: "Név",
      namePlaceholder: "Kovács Anna",
      email: "E-mail",
      emailPlaceholder: "anna@pelda.sk",
      phone: "Telefon",
      phonePlaceholder: "+421 9xx xxx xxx",
      optional: "nem kötelező",
      service: "Szolgáltatás",
      servicePlaceholder: "Válasszon…",
      serviceOther: "Egyéb / még nem tudom",
      size: "Alapterület",
      sizePlaceholder: "pl. 65 m², 3 szoba",
      city: "Település",
      cityPlaceholder: "pl. Dunaszerdahely",
      message: "Üzenet",
      messagePlaceholder: "Mikor, milyen gyakran, bármi, amit tudnunk kell…",
      consentBefore: "Elolvastam és elfogadom az ",
      consentLink: "adatkezelési tájékoztatót",
      consentAfter: ".",
      submit: "Ajánlatkérés küldése",
      sending: "Küldés…",
      successTitle: "Köszönjük, megkaptuk!",
      success: "Hamarosan jelentkezünk a megadott elérhetőségen. Ha addig kérdése van, hívjon nyugodtan.",
      again: "Új üzenet",
      mailInstead: "Elküldöm e-mailben",
      mailSubject: "Ajánlatkérés",
      errors: {
        summary: "Néhány mező hiányzik vagy hibás. Kérjük, javítsa a jelölt mezőket.",
        name: "Kérjük, adja meg a nevét.",
        email: "Kérjük, adja meg az e-mail címét.",
        emailInvalid: "Ez nem tűnik érvényes e-mail címnek.",
        phoneInvalid: "Ez nem tűnik érvényes telefonszámnak.",
        service: "Kérjük, válasszon szolgáltatást.",
        message: "Kérjük, írjon pár szót arról, mire van szüksége.",
        consent: "Az ajánlatkéréshez el kell fogadnia az adatkezelési tájékoztatót.",
        unavailable: "Az űrlap most nem elérhető. Küldje el e-mailben egy kattintással, vagy hívjon minket.",
        network: "Nem sikerült elküldeni. Próbálja újra, küldje el e-mailben, vagy hívjon minket.",
      },
    },
  },

  cookies: {
    title: "Sütiket használunk?",
    body: "Csak egyet, ami feltétlenül szükséges: ez jegyzi meg a választását. Statisztikai vagy marketing sütit csak az Ön engedélyével töltenénk be — jelenleg egyet sem használunk.",
    more: "Süti tájékoztató",
    necessaryOnly: "Csak a szükségesek",
    settings: "Beállítások",
    acceptAll: "Mindet elfogadom",
    save: "Választás mentése",
    reopen: "Süti beállítások",
    alwaysOn: "Mindig aktív",
    categories: [
      {
        id: "necessary",
        name: "Feltétlenül szükséges",
        desc: "A süti-választás megjegyzése. Nélküle a weboldal minden látogatáskor újra megkérdezné.",
        locked: true,
      },
      {
        id: "statistics",
        name: "Statisztika",
        desc: "Névtelen látogatottsági adatok, hogy lássuk, mi működik az oldalon. Jelenleg nem használunk ilyet.",
        locked: false,
      },
      {
        id: "marketing",
        name: "Marketing",
        desc: "Hirdetések méréséhez és személyre szabásához. Jelenleg nem használunk ilyet.",
        locked: false,
      },
    ],
  },

  footer: {
    nav: "Oldal",
    privacy: "Adatkezelési tájékoztató",
    cookies: "Süti tájékoztató",
    imprint: "Impresszum",
    rights: "Minden jog fenntartva.",
  },

  legal: {
    effective: "Hatályos",
    effectiveDate: "2026. október 25.",
    questions: "Kérdése van?",
    back: "Vissza a főoldalra",

    privacyTitle: "Adatkezelési tájékoztató",
    privacyLead:
      "Ez a tájékoztató leírja, milyen személyes adatokat kezelünk, amikor Ön a weboldalunkat használja vagy ajánlatot kér tőlünk, mire használjuk őket, meddig őrizzük, és milyen jogai vannak. Az Európai Parlament és a Tanács (EU) 2016/679 rendelete (GDPR) és a személyes adatok védelméről szóló 18/2018 Tt. szlovák törvény alapján készült.",
    privacySections: [
      {
        heading: "1. Az adatkezelő",
        body: [
          `${COMPANY.legalName} (székhely: ${COMPANY.seat}; IČO: ${COMPANY.ico}; bejegyezve: ${COMPANY.register}; e-mail: ${EMAIL}).`,
          "Adatvédelmi tisztviselő kinevezésére nem vagyunk kötelesek. Adatkezeléssel kapcsolatos kérdéseit a fenti e-mail címre küldheti.",
        ],
      },
      {
        heading: "2. Ajánlatkérés és kapcsolatfelvétel",
        body: ["Amikor kitölti az ajánlatkérő űrlapot, írásban vagy telefonon megkeres minket, az alábbi adatokat kezeljük:"],
        list: [
          "név, e-mail cím — kötelező, hogy válaszolni tudjunk;",
          "telefonszám — nem kötelező, ha telefonon is kereshetjük;",
          "a kért szolgáltatás, az alapterület és a település — az ár kiszámításához;",
          "az üzenet tartalma, valamint a beküldés időpontja.",
        ],
      },
      {
        heading: "3. Az adatkezelés célja és jogalapja",
        body: [
          "Cél: az ajánlatkérés megválaszolása, árajánlat adása, időpont egyeztetése, és ha megrendeli a szolgáltatást, annak teljesítése.",
          "Jogalap: a szerződés megkötését megelőző lépések megtétele az Ön kérésére, illetve a szerződés teljesítése (GDPR 6. cikk (1) bekezdés b) pont). Ha a megrendelésből számla készül, annak megőrzése jogi kötelezettség (GDPR 6. cikk (1) c) pont, a számvitelről szóló 431/2002 Tt. törvény).",
        ],
      },
      {
        heading: "4. Meddig őrizzük az adatokat",
        body: [
          `Ha az ajánlatkérésből nem lesz megrendelés, az adatokat legfeljebb ${RETENTION_MONTHS} hónapig őrizzük, utána töröljük. Ha megrendelés lesz, a szerződéshez kapcsolódó adatokat a szerződés megszűnésétől számított 4 évig (a polgári jogi elévülési idő), a könyvelési bizonylatokat a jogszabály szerint 10 évig őrizzük.`,
          "Kérésére az adatait korábban is töröljük, ha megőrzésüket jogszabály nem írja elő.",
        ],
      },
      {
        heading: "5. Kik férnek hozzá az adatokhoz",
        body: [
          "Az adatokhoz csak a munkatársaink férnek hozzá, akiknek az ajánlat elkészítéséhez vagy a munka elvégzéséhez szükségük van rá. Adatait nem adjuk el, és nem adjuk át harmadik félnek marketingcélra.",
          "A weboldal működéséhez az alábbi adatfeldolgozókat vesszük igénybe:",
        ],
        list: [
          `tárhely: ${HOSTING.name} (${HOSTING.address}) — a weboldal kiszolgálása; a szerver naplóiban a látogató IP-címe rövid ideig, biztonsági célból tárolódhat;`,
          "e-mail kézbesítés: Resend Inc. (USA) — az űrlap tartalmát e-mailben juttatja el hozzánk;",
          "e-mail fiók szolgáltatója — ahol a beérkezett leveleket fogadjuk.",
        ],
      },
      {
        heading: "6. Adattovábbítás az EU-n kívülre",
        body: [
          "A tárhely- és e-mail szolgáltatók egyesült államokbeli cégek. Az adattovábbítás az EU–USA adatvédelmi keretrendszer (Data Privacy Framework) szerinti megfelelőségi határozat, illetve az Európai Bizottság általános szerződési feltételei (GDPR 46. cikk) alapján történik.",
        ],
      },
      {
        heading: "7. Sütik",
        body: [
          `A weboldal egyetlen saját sütit használ (${CONSENT_COOKIE}), amely a süti-választását jegyzi meg. Statisztikai vagy marketing sütit csak az Ön kifejezett hozzájárulásával töltenénk be — jelenleg ilyet nem használunk. Részletek a süti tájékoztatóban.`,
        ],
      },
      {
        heading: "8. Az Ön jogai",
        body: ["Az adatkezeléssel kapcsolatban Önt az alábbi jogok illetik meg:"],
        list: [
          "hozzáférés: tájékoztatást kérhet arról, milyen adatát kezeljük, és másolatot kérhet róluk (GDPR 15. cikk);",
          "helyesbítés: kérheti a pontatlan adatok javítását (16. cikk);",
          "törlés: kérheti adatai törlését (17. cikk);",
          "korlátozás: kérheti az adatkezelés korlátozását (18. cikk);",
          "adathordozhatóság: kérheti adatai géppel olvasható formában való kiadását (20. cikk);",
          "tiltakozás: tiltakozhat az adatkezelés ellen (21. cikk).",
        ],
      },
      {
        heading: "9. Hogyan élhet a jogaival",
        body: [
          `Kérelmét a ${EMAIL} címre küldheti. Legfeljebb egy hónapon belül válaszolunk; ha a kérelem összetett, ez a határidő további két hónappal meghosszabbodhat, amiről értesítjük. A kérelem teljesítése díjmentes.`,
        ],
      },
      {
        heading: "10. Panasz és jogorvoslat",
        body: [
          `Ha úgy érzi, hogy megsértettük az adatvédelmi jogait, kérjük, először keressen minket — igyekszünk gyorsan rendezni. Panaszt tehet a felügyeleti hatóságnál is: ${AUTHORITY.name}, ${AUTHORITY.address}; ${AUTHORITY.web}; ${AUTHORITY.email}.`,
          "Jogai megsértése esetén bírósághoz is fordulhat.",
        ],
      },
      {
        heading: "11. Adatbiztonság",
        body: [
          "A weboldal titkosított (HTTPS) kapcsolaton keresztül érhető el, az űrlap adatai titkosítva jutnak el hozzánk. Az adatokhoz csak az fér hozzá, akinek a munkájához szükséges.",
        ],
      },
      {
        heading: "12. A tájékoztató módosítása",
        body: ["Ha az adatkezelésünk változik, ezt a tájékoztatót frissítjük. A mindenkori változat ezen az oldalon érhető el."],
      },
    ],

    cookiesTitle: "Süti (cookie) tájékoztató",
    cookiesLead:
      "A sütik kis szöveges fájlok, amelyeket a weboldal az Ön böngészőjében tárol. Ez az oldal a lehető legkevesebbet használ belőlük.",
    cookiesSections: [
      {
        heading: "Milyen sütiket használunk",
        body: [
          `Egyetlenegyet: a ${CONSENT_COOKIE} nevű sütit, amely azt jegyzi meg, hogy elfogadta-e a statisztikai és marketing sütiket. Feltétlenül szükséges, ezért hozzájárulás nélkül is beállítható (az elektronikus hírközlésről szóló 452/2021 Tt. szlovák törvény 109. § (8) bekezdése). Élettartama 6 hónap, utána újra megkérdezzük.`,
          "Nem tartalmaz személyes adatot — csak két számjegyet, a két választását.",
        ],
      },
      {
        heading: "Statisztikai és marketing sütik",
        body: [
          "Jelenleg nem használunk ilyet: nincs látogatottságmérés, nincs hirdetési követés, nincs közösségimédia-beágyazás. Ha a jövőben bevezetünk ilyet, csak akkor töltjük be, ha Ön a süti-beállításokban engedélyezi, és ezt a tájékoztatót is frissítjük.",
        ],
      },
      {
        heading: "Harmadik felek",
        body: [
          "A betűtípusokat a saját szerverünkről töltjük be, így a látogatása során nem kerül adat a Google-hoz vagy más külső szolgáltatóhoz.",
        ],
      },
      {
        heading: "Hogyan változtathat a döntésén",
        body: [
          "Bármikor megváltoztathatja a választását az oldal bal alsó sarkában lévő süti gombbal vagy a lábléc „Süti beállítások” linkjével. A sütiket a böngésző beállításaiban is törölheti.",
        ],
      },
    ],
    cookieTable: {
      name: "Név",
      type: "Típus",
      purpose: "Cél",
      lifetime: "Élettartam",
      typeValue: "Feltétlenül szükséges, saját",
      purposeValue: "A süti-választás megjegyzése",
      months: "hónap",
    },

    imprintTitle: "Impresszum",
    imprintLead: "A weboldal üzemeltetőjének és tárhelyszolgáltatójának adatai.",
    imprintOperator: "Üzemeltető",
    imprintHosting: "Tárhely",
    imprintLabels: {
      provider: "Szolgáltató",
      seat: "Székhely",
      register: "Nyilvántartás",
      representative: "Képviselő",
      email: "E-mail",
      phone: "Telefon",
      host: "Tárhelyszolgáltató",
      address: "Cím",
      web: "Web",
    },
  },

  notFound: {
    lead: "Ezt az oldalt már feltakarították. Vagy sosem létezett.",
    cta: "Vissza a főoldalra",
  },
} as const;

export type Dictionary = import("../types").Widen<typeof hu>;
export default hu;
