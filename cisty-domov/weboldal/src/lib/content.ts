/**
 * Every line of copy on the page.
 *
 * Kept out of the components so the text can be edited without touching
 * markup. Hungarian only — the site is single-language by design.
 *
 * Claims a customer could hold the business to (the 24-hour quote, the redo
 * guarantee, the insured team) are promises, not decoration: confirm each one
 * with the business before going live.
 */

export const META = {
  title: "Čistý Domov — takarítás · upratovanie",
  description:
    "Lakás-, nagy-, ablak-, költözéses és irodatakarítás fix áron. Megbízható, ellenőrzött csapat, saját eszközökkel. Az első takarításból −20%.",
} as const;

export const NAV = [
  { href: "#szolgaltatasok", label: "Szolgáltatások" },
  { href: "#arak", label: "Árak" },
  { href: "#irodaknak", label: "Irodáknak" },
  { href: "#jatek", label: "Játék" },
  { href: "#gyik", label: "GYIK" },
  { href: "#kapcsolat", label: "Kapcsolat" },
] as const;

export const HERO = {
  eyebrow: "Otthoni takarítás",
  title: "Tiszta otthon.",
  titleSoft: "Több szabad idő.",
  lead: "Megbízható, ellenőrzött csapat. Saját eszközökkel érkezünk, Ön csak hazaér.",
  primary: "Ajánlatot kérek",
  secondary: "Szolgáltatások",
  offer: "−20% az első takarításból",
} as const;

/** The second screen: a quiet full-bleed video with one line over it. */
export const VIDEO = {
  line: "Minden sarok.",
  lineSoft: "Minden alkalommal.",
  caption: "Saját szerekkel, saját eszközökkel, ugyanazzal a csapattal.",
  label: "Videó: lehúzóval tisztított ablaküveg",
} as const;

export const MARQUEE = [
  "Lakástakarítás",
  "Nagytakarítás",
  "Ablaktisztítás",
  "Költözés utáni takarítás",
  "Irodatakarítás",
  "Lépcsőházak",
] as const;

export type Service = {
  id: string;
  name: string;
  /** The name as the object of a sentence ("Vállaljuk a …t"), lower-case. */
  accusative: string;
  desc: string;
};

export const SERVICES = {
  eyebrow: "Szolgáltatásaink",
  title: "Mindent tisztára.",
  lead: "Válassza ki, mire van szüksége. A többit mi intézzük.",
  intro: "Vállaljuk a",
  outro: "Mindenhez saját szereket és eszközöket hozunk.",
  hint: "Kattintson egy szolgáltatásra, és már kérheti is rá az ajánlatot.",
  items: [
    {
      id: "lakas",
      name: "Rendszeres lakástakarítás",
      accusative: "rendszeres lakástakarítást",
      desc: "Állandó időpont, állandó csapat. Megtanuljuk, hogyan szereti, és minden alkalommal úgy csináljuk.",
    },
    {
      id: "nagy",
      name: "Nagytakarítás",
      accusative: "nagytakarítást",
      desc: "Évszakváltáskor, ünnepek előtt vagy egyszerűen azért, mert ideje volt. Mindent elmozdítunk, ami elmozdítható.",
    },
    {
      id: "ablak",
      name: "Ablak- és üvegtisztítás",
      accusative: "ablak- és üvegtisztítást",
      desc: "Csíkmentes üveg kívül-belül, tiszta keretek és párkányok. Külön is kérhető, vagy bármelyik takarítás mellé.",
    },
    {
      id: "koltozes",
      name: "Költözés utáni takarítás",
      accusative: "költözés utáni takarítást",
      desc: "Átadás előtt, hogy visszakapja a kauciót — vagy beköltözés előtt, hogy már az első este otthon érezze magát.",
    },
    {
      id: "iroda",
      name: "Irodatakarítás",
      accusative: "irodatakarítást",
      desc: "Munkaidő után takarítunk, hogy a csapatának ne kelljen kerülgetnie minket. Reggelre tiszta iroda.",
    },
  ] satisfies readonly Service[],
} as const;

export const GAME = {
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
  noScript: "A játékhoz JavaScript kell. Addig is: az ablakpucolást nyugodtan bízza ránk.",
  results: [
    { min: 0, title: "Ezt inkább bízza ránk.", text: "Semmi gond — mi ezt csináljuk egész nap. Csíkmentesen." },
    { min: 50, title: "Szép munka!", text: "Majdnem ott van. Az utolsó csíkokat hagyja meg nekünk." },
    { min: 85, title: "Majdnem kristály!", text: "Komolyan mondjuk: ilyen tempóval már szinte nálunk dolgozhatna." },
    { min: 97, title: "Kristálytiszta!", text: "Hibátlan munka. Otthon viszont nyugodtan hagyja ránk — mi is pont így csináljuk." },
  ],
  cta: "Kérek ajánlatot",
} as const;

export const PRICES = {
  eyebrow: "Árak",
  title: "Fix ár, meglepetések nélkül.",
  lead: "Minden otthon más, ezért egyedi árat adunk. Mondja el, mekkora a lakás és mire van szüksége, és még aznap fix árat kap — kötelezettség nélkül.",
  offerEyebrow: "Bemutatkozó ajánlat",
  offerLead: "Az első takarításból",
  offerValue: "−20",
  offerText: "Próbálja ki kockázat nélkül. Ha valami nem tökéletes, 24 órán belül díjmentesen visszamegyünk.",
  offerTerms: "Az ajánlat új ügyfelekre, egy alkalomra érvényes. Más kedvezménnyel nem vonható össze.",
  cta: "Ajánlatot kérek",
  note: "Az árak a végső árak, rejtett költség nélkül.",
} as const;

export const OFFICE = {
  eyebrow: "Cégeknek, irodáknak",
  title: "Reggelre",
  titleSoft: "tiszta iroda.",
  lead: "Munkaidő után takarítunk, hogy a csapatának ne kelljen kerülgetnie minket.",
  items: ["Rugalmas, havi szerződés", "Állandó, betanított takarítók", "Számla, átlátható díjak", "Fogyóeszköz-utántöltés"],
  cta: "Irodai ajánlatot kérek",
} as const;

export const STEPS = {
  eyebrow: "Így dolgozunk",
  title: "Három lépés",
  titleSoft: "a tiszta lakásig.",
  items: [
    { title: "Hívjon vagy írjon", desc: "Elmondja, mekkora a lakás és mire van szükség. Még aznap kap egy fix árat." },
    { title: "Megérkezünk", desc: "A megbeszélt időpontban, saját szerekkel és eszközökkel. Kulcsot is átvehetünk." },
    { title: "Ön hazaér", desc: "Tiszta, friss otthon. Fizetés a takarítás után, készpénzzel vagy kártyával." },
  ],
} as const;

export const FAQ = {
  eyebrow: "GYIK",
  title: "Kérdése van?",
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
} as const;

export const CONTACT = {
  eyebrow: "Kapcsolat",
  title: "Kérjen ajánlatot.",
  lead: "Írja meg, mire van szüksége, és még aznap jelentkezünk fix árral. Ha sürgős, hívjon nyugodtan.",
  phoneTitle: "Telefon",
  emailTitle: "E-mail",
  areaTitle: "Ahol dolgozunk",
  hoursTitle: "Nyitvatartás",
  form: {
    title: "Ajánlatkérés",
    name: "Név",
    namePlaceholder: "Kovács Anna",
    email: "E-mail",
    emailPlaceholder: "anna@pelda.hu",
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
} as const;

export const COOKIES = {
  title: "Sütiket használunk?",
  body: "Csak egyet, ami feltétlenül szükséges: ez jegyzi meg a választását. Statisztikai vagy marketing sütit csak az Ön engedélyével töltenénk be — jelenleg egyet sem használunk.",
  more: "Süti tájékoztató",
  necessaryOnly: "Csak a szükségesek",
  settings: "Beállítások",
  acceptAll: "Mindet elfogadom",
  save: "Választás mentése",
  reopen: "Süti beállítások",
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
  alwaysOn: "Mindig aktív",
} as const;

export const FOOTER = {
  navTitle: "Oldal",
  contactTitle: "Elérhetőség",
  legalTitle: "Jogi információk",
  privacy: "Adatkezelési tájékoztató",
  cookies: "Süti tájékoztató",
  imprint: "Impresszum",
  rights: "Minden jog fenntartva.",
  backToTop: "Vissza a tetejére",
} as const;
