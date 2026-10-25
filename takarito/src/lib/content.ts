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
  title: "Kristály Takarítás — lakás-, iroda- és nagytakarítás",
  description:
    "Megbízható lakás-, iroda-, nagy- és költözéses takarítás fix áron. Kérjen ajánlatot, 24 órán belül válaszolunk.",
} as const;

export const NAV = [
  { href: "#szolgaltatasok", label: "Szolgáltatások" },
  { href: "#jatek", label: "Mini játék" },
  { href: "#arak", label: "Árak" },
  { href: "#miert-mi", label: "Miért mi" },
  { href: "#gyik", label: "GYIK" },
  { href: "#kapcsolat", label: "Kapcsolat" },
] as const;

export const HERO = {
  eyebrow: "Lakás · Iroda · Nagytakarítás",
  title: "Hazaér, és minden ragyog.",
  lead: "Mi kitakarítunk, Ön azzal tölti az idejét, amivel szeretné. Fix ár, pontos érkezés, és ugyanaz a megbízható csapat minden alkalommal.",
  primary: "Ajánlatot kérek",
  secondary: "Szolgáltatások",
} as const;

export const FACTS = [
  { value: "24 óra", label: "Ajánlat", note: "Ennyi időn belül pontos árat küldünk." },
  { value: "6 nap", label: "Egy héten", note: "Hétfőtől szombatig, reggel héttől." },
  { value: "1", label: "Kapcsolattartó", note: "Egy ember, aki ismeri az otthonát." },
  { value: "100%", label: "Garancia", note: "Ha valami nem tökéletes, ingyen visszamegyünk." },
] as const;

export type Service = {
  id: string;
  name: string;
  short: string;
  desc: string;
  includes: readonly string[];
  icon: "home" | "deep" | "office" | "move" | "renovation" | "window";
};

export const SERVICES = {
  eyebrow: "Szolgáltatások",
  title: "Minden, ami tiszta.",
  lead: "Válassza ki, mire van szüksége — vagy írja meg, és összerakjuk a csomagot.",
  cta: "Erre kérek ajánlatot",
  items: [
    {
      id: "lakas",
      name: "Rendszeres lakástakarítás",
      short: "Hetente vagy kéthetente",
      desc: "Állandó időpont, állandó csapat. Megtanuljuk, hogyan szereti, és minden alkalommal úgy csináljuk.",
      includes: ["Portalanítás és felmosás", "Konyha és fürdőszoba", "Ágyneműcsere, rendrakás", "Szemetek levitele"],
      icon: "home",
    },
    {
      id: "nagy",
      name: "Nagytakarítás",
      short: "A sarkoktól a radiátorig",
      desc: "Évszakváltáskor, ünnepek előtt vagy egyszerűen azért, mert ideje volt. Mindent elmozdítunk, ami elmozdítható.",
      includes: ["Bútorok mögött és alatt", "Konyhagépek kívül-belül", "Vízkőoldás, fugatisztítás", "Ablakok és keretek"],
      icon: "deep",
    },
    {
      id: "iroda",
      name: "Irodatakarítás",
      short: "Munkaidő után",
      desc: "Este dolgozunk, hogy a csapata reggel tiszta asztalhoz, friss konyhához és rendes mosdóhoz érkezzen.",
      includes: ["Asztalok, képernyők", "Konyha, kávégép", "Mosdók, fogyóeszközök", "Rugalmas szerződés"],
      icon: "office",
    },
    {
      id: "koltozes",
      name: "Költözéses takarítás",
      short: "Ki- és beköltözéshez",
      desc: "Átadás előtt, hogy visszakapja a kauciót — vagy beköltözés előtt, hogy már az első este otthon érezze magát.",
      includes: ["Üres lakás teljes takarítása", "Szekrények belül", "Konyha és fürdő fertőtlenítése", "Átadásra kész állapot"],
      icon: "move",
    },
    {
      id: "felujitas",
      name: "Felújítás utáni takarítás",
      short: "Építési por nélkül",
      desc: "A festők elmentek, a por maradt. Eltüntetjük a finom port, a festék- és ragasztófoltokat, a fugákból is.",
      includes: ["Építési por eltávolítása", "Festék- és gipszfoltok", "Nyílászárók, párkányok", "Padló mélytisztítása"],
      icon: "renovation",
    },
    {
      id: "ablak",
      name: "Ablak- és kárpittisztítás",
      short: "Csíkmentesen",
      desc: "Ragyogó üveg kívül-belül, friss kanapé és fotel. Külön is kérhető, vagy bármelyik takarítás mellé.",
      includes: ["Ablak, keret, párkány", "Üvegfalak, kirakatok", "Kanapé, fotel, szék", "Matrac, szőnyeg"],
      icon: "window",
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
  lead: "Minden otthon más, ezért egyedi ajánlatot adunk. Írja meg, mit és mekkora területen takarítsunk, és 24 órán belül pontos árat küldünk — kötelezettség nélkül.",
  pendingTitle: "Egyedi ajánlat",
  pendingItems: ["Ingyenes, kötelezettség nélküli ajánlat", "A kiszállás az árban van", "Saját takarítószerekkel és eszközökkel", "A megbeszélt ár a végső ár"],
  cta: "Ajánlatot kérek",
  unit: "",
  note: "Az árak bruttó árak.",
} as const;

export const WHY = {
  eyebrow: "Miért mi",
  title: "Amire számíthat.",
  items: [
    { title: "Pontos érkezés", desc: "Ha 8-at mondunk, 8-kor csengetünk. Ha bármi közbejön, előre szólunk." },
    { title: "Ugyanaz a csapat", desc: "Nem idegenek jönnek minden alkalommal. Megismerjük az otthonát és a kéréseit." },
    { title: "Saját eszközök és szerek", desc: "Mindent hozunk. Kérésre illatmentes, környezetbarát szerekkel dolgozunk." },
    { title: "Fix, előre megbeszélt ár", desc: "Az ajánlatban szereplő összeg a végső összeg. Nincs utólagos tétel." },
    { title: "Garancia", desc: "Ha valami nem úgy sikerült, ahogy kellett, 24 órán belül visszamegyünk és pótoljuk — díjmentesen." },
  ],
} as const;

export const STEPS = {
  eyebrow: "Így működik",
  title: "Négy lépés a tiszta otthonig.",
  items: [
    { title: "Ajánlatkérés", desc: "Kitölti az űrlapot vagy felhív minket. Két perc." },
    { title: "Pontos ár", desc: "24 órán belül fix árajánlatot küldünk, és egyeztetünk időpontot." },
    { title: "Takarítás", desc: "Pontosan érkezünk, mindent hozunk, Önnek nem kell itthon lennie." },
    { title: "Átvétel", desc: "Átnézi, és ha bármi hiányzik, pótoljuk. Csak utána fizet." },
  ],
} as const;

export const FAQ = {
  eyebrow: "GYIK",
  title: "Gyakori kérdések.",
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
      a: "Egy átlagos, 60 m²-es lakás rendszeres takarítása 3–4 óra, a nagytakarítás ennek nagyjából a duplája. Az ajánlatban pontos időt is írunk.",
    },
    {
      q: "Hogyan fizethetek?",
      a: "A takarítás után, az átvételt követően — készpénzzel vagy átutalással. Cégeknek havi számlát állítunk ki.",
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
  lead: "Írja meg, mire van szüksége, és 24 órán belül jelentkezünk pontos árral. Ha sürgős, hívjon nyugodtan.",
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
    phonePlaceholder: "+36 30 123 4567",
    optional: "nem kötelező",
    service: "Szolgáltatás",
    servicePlaceholder: "Válasszon…",
    serviceOther: "Egyéb / még nem tudom",
    size: "Alapterület",
    sizePlaceholder: "pl. 65 m²",
    city: "Település",
    cityPlaceholder: "pl. Budapest, XI. ker.",
    message: "Üzenet",
    messagePlaceholder: "Mikor, milyen gyakran, bármi, amit tudnunk kell…",
    consentBefore: "Elolvastam és elfogadom az ",
    consentLink: "adatkezelési tájékoztatót",
    consentAfter: ".",
    submit: "Ajánlatkérés küldése",
    sending: "Küldés…",
    successTitle: "Köszönjük, megkaptuk!",
    success: "24 órán belül jelentkezünk a megadott elérhetőségen. Ha addig kérdése van, hívjon nyugodtan.",
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
