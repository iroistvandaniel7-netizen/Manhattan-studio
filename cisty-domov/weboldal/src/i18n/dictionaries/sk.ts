import { AUTHORITY, COMPANY, EMAIL, HOSTING, RETENTION_MONTHS } from "@/lib/site";
import { CONSENT_COOKIE } from "@/lib/consent";
import type { Dictionary } from "./hu";

/** Slovak. Typed against the Hungarian source, so every key has to be here. */
const sk: Dictionary = {
  meta: {
    title: "Čistý Domov — upratovanie v Dunajskej Strede",
    description:
      "Upratovanie bytov, veľké upratovanie, umývanie okien, upratovanie po sťahovaní a kancelárií za pevnú cenu v Dunajskej Strede a okolí. Spoľahlivý tím s vlastným vybavením. Na prvé upratovanie −20 %.",
  },

  ui: {
    skipToContent: "Preskočiť na obsah",
    mainNav: "Hlavná navigácia",
    mobileNav: "Mobilná navigácia",
    openMenu: "Otvoriť menu",
    closeMenu: "Zatvoriť menu",
    language: "Jazyk",
  },

  nav: [
    { href: "#services", label: "Služby" },
    { href: "#prices", label: "Ceny" },
    { href: "#office", label: "Pre firmy" },
    { href: "#game", label: "Hra" },
    { href: "#faq", label: "Otázky" },
    { href: "#contact", label: "Kontakt" },
  ],

  hero: {
    eyebrow: "Upratovanie domácností",
    title: "Čistý domov.",
    titleSoft: "Viac voľného času.",
    lead: "Spoľahlivý, overený tím. Prídeme s vlastným vybavením, vy sa len vrátite domov.",
    cta: "Chcem cenovú ponuku",
    boxLabel: "Vyžiadajte si ponuku",
  },

  video: {
    line: "Každý kút.",
    lineSoft: "Zakaždým.",
    caption: "Vlastné prostriedky, vlastné vybavenie, stále ten istý tím.",
    label: "Video: umývanie okna sťahovačkou",
  },


  services: {
    eyebrow: "Naše služby",
    title: "Všetko do čista.",
    intro: "Ponúkame",
    and: "a",
    outro: "Na všetko si prinesieme vlastné prostriedky a vybavenie.",
    hint: "Kliknite na službu a hneď si na ňu môžete vyžiadať ponuku.",
    items: [
      {
        id: "lakas",
        name: "Pravidelné upratovanie bytu",
        inSentence: "pravidelné upratovanie bytov",
        desc: "Stály termín, stály tím. Naučíme sa, ako to máte radi, a tak to urobíme zakaždým.",
      },
      {
        id: "nagy",
        name: "Veľké upratovanie",
        inSentence: "veľké upratovanie",
        desc: "Pri zmene ročného obdobia, pred sviatkami alebo jednoducho preto, že je čas. Posunieme všetko, čo sa dá posunúť.",
      },
      {
        id: "ablak",
        name: "Umývanie okien a skla",
        inSentence: "umývanie okien a skla",
        desc: "Sklo bez šmúh zvonku aj zvnútra, čisté rámy aj parapety. Samostatne alebo k akémukoľvek upratovaniu.",
      },
      {
        id: "koltozes",
        name: "Upratovanie po sťahovaní",
        inSentence: "upratovanie po sťahovaní",
        desc: "Pred odovzdaním, aby ste dostali späť zálohu — alebo pred nasťahovaním, aby ste sa už prvý večer cítili ako doma.",
      },
      {
        id: "iroda",
        name: "Upratovanie kancelárií",
        inSentence: "upratovanie kancelárií",
        desc: "Upratujeme po pracovnej dobe, aby sa váš tím nemusel vyhýbať nám. Ráno čistá kancelária.",
      },
    ],
  },

  prices: {
    eyebrow: "Úvodná ponuka",
    lead: "z prvého upratovania.",
    value: "−20",
    text: "Vyskúšajte nás bez rizika. Ak niečo nie je dokonalé, do 24 hodín sa bezplatne vrátime.",
    terms: "Ponuka platí pre nových zákazníkov na jedno upratovanie. Nedá sa kombinovať s inými zľavami.",
    cta: "Chcem cenovú ponuku",
    from: " od",
    note: "Ceny sú konečné, bez skrytých poplatkov.",
  },

  steps: {
    eyebrow: "Ako pracujeme",
    title: "Tri kroky",
    titleSoft: "k čistému bytu.",
    items: [
      { title: "Zavolajte alebo napíšte", desc: "Poviete nám, aký veľký je byt a čo potrebujete. Ešte v ten deň dostanete pevnú cenu." },
      { title: "Prídeme", desc: "V dohodnutom termíne, s vlastnými prostriedkami a vybavením. Môžeme si prevziať aj kľúč." },
      { title: "Vrátite sa domov", desc: "Čistý, svieži domov. Platíte až po upratovaní, v hotovosti alebo kartou." },
    ],
  },

  game: {
    eyebrow: "Minihra",
    title: "Umyte okno!",
    lead: "Prejdite myšou alebo prstom po špinavom skle. Máte dvadsať sekúnd — uvidíme, ako bude čisté.",
    start: "Štart",
    again: "Ešte raz",
    time: "Čas",
    clean: "Čisté",
    best: "Najlepšie",
    keyboardHint: "Klávesnicou: hubku posúvate šípkami.",
    canvasLabel: "Špinavé okno. Umyť ho môžete myšou, prstom alebo šípkami.",
    canvasText: "Umy ma!",
    noScript: "Hra potrebuje JavaScript. Dovtedy: umývanie okien pokojne nechajte na nás.",
    results: [
      { min: 0, title: "Toto radšej nechajte na nás.", text: "Nevadí — robíme to celý deň. Bez šmúh." },
      { min: 50, title: "Pekná práca!", text: "Takmer hotovo. Posledné šmuhy nechajte nám." },
      { min: 85, title: "Takmer do čista!", text: "Vážne: s týmto tempom by ste mohli robiť u nás." },
      { min: 97, title: "Krištáľovo čisté!", text: "Bezchybné. Doma to však pokojne nechajte na nás — robíme to presne takto." },
    ],
    cta: "Chcem ponuku",
  },

  office: {
    eyebrow: "Pre firmy a kancelárie",
    title: "Ráno",
    titleSoft: "čistá kancelária.",
    lead: "Upratujeme po pracovnej dobe, aby sa váš tím nemusel vyhýbať nám.",
    items: ["Flexibilná mesačná zmluva", "Stáli, zaškolení upratovači", "Faktúra, prehľadné ceny", "Dopĺňanie spotrebného materiálu"],
    cta: "Chcem ponuku pre kanceláriu",
  },

  gallery: {
    eyebrow: "Naša práca",
    title: "Pred a po.",
    before: "Pred",
    after: "Po",
  },

  faq: {
    eyebrow: "Otázky",
    title: "Máte otázku?",
    items: [
      {
        q: "Musím byť počas upratovania doma?",
        a: "Nie je to potrebné. Mnohí zákazníci nám odovzdajú kľúč alebo ho nechajú na vrátnici. Po upratovaní vám pošleme správu, že sme hotoví.",
      },
      {
        q: "Musím zabezpečiť čistiace prostriedky alebo vybavenie?",
        a: "Nie, všetko si prinesieme: prostriedky, vysávač, mop, rebrík. Ak máte obľúbený prostriedok, radi ho použijeme.",
      },
      {
        q: "Ako dlho trvá upratovanie?",
        a: "Závisí to od veľkosti bytu a rozsahu práce — predpokladaný čas uvedieme v ponuke.",
      },
      {
        q: "Ako môžem zaplatiť?",
        a: "Po upratovaní, v hotovosti alebo kartou. Firmám vystavujeme mesačnú faktúru.",
      },
      {
        q: "Čo ak s niečím nie som spokojný?",
        a: "Ozvite sa do 24 hodín a bezplatne sa vrátime všetko doupratať. To je naša záruka.",
      },
      {
        q: "Môžem termín zrušiť alebo zmeniť?",
        a: "Áno, bezplatne najneskôr 24 hodín pred dohodnutým termínom.",
      },
    ],
  },

  contact: {
    eyebrow: "Kontakt",
    title: "Vyžiadajte si ponuku.",
    lead: "Napíšte nám, čo potrebujete, a ešte v ten deň sa ozveme s pevnou cenou. Ak je to súrne, pokojne zavolajte.",
    area: "Dunajská Streda a okolie do 30 km",
    hours: "Pondelok–Sobota",
    form: {
      title: "Žiadosť o ponuku",
      name: "Meno",
      namePlaceholder: "Anna Kováčová",
      email: "E-mail",
      emailPlaceholder: "anna@priklad.sk",
      phone: "Telefón",
      phonePlaceholder: "+421 9xx xxx xxx",
      optional: "nepovinné",
      service: "Služba",
      servicePlaceholder: "Vyberte…",
      serviceOther: "Iné / ešte neviem",
      size: "Rozloha",
      sizePlaceholder: "napr. 65 m², 3 izby",
      city: "Obec",
      cityPlaceholder: "napr. Dunajská Streda",
      message: "Správa",
      messagePlaceholder: "Kedy, ako často, čokoľvek, čo by sme mali vedieť…",
      consentBefore: "Prečítal(a) som si a súhlasím so ",
      consentLink: "zásadami ochrany osobných údajov",
      consentAfter: ".",
      submit: "Odoslať žiadosť",
      sending: "Odosiela sa…",
      successTitle: "Ďakujeme, máme to!",
      success: "Čoskoro sa vám ozveme na uvedený kontakt. Ak máte medzitým otázku, pokojne zavolajte.",
      again: "Nová správa",
      mailInstead: "Poslať e-mailom",
      mailSubject: "Žiadosť o ponuku",
      errors: {
        summary: "Niektoré polia chýbajú alebo sú nesprávne. Opravte, prosím, označené polia.",
        name: "Zadajte, prosím, svoje meno.",
        email: "Zadajte, prosím, svoj e-mail.",
        emailInvalid: "Toto nevyzerá ako platná e-mailová adresa.",
        phoneInvalid: "Toto nevyzerá ako platné telefónne číslo.",
        service: "Vyberte, prosím, službu.",
        message: "Napíšte, prosím, pár slov o tom, čo potrebujete.",
        consent: "Na odoslanie žiadosti je potrebný súhlas so zásadami ochrany osobných údajov.",
        unavailable: "Formulár momentálne nie je dostupný. Pošlite správu e-mailom jedným kliknutím alebo nám zavolajte.",
        network: "Správu sa nepodarilo odoslať. Skúste to znova, pošlite ju e-mailom alebo nám zavolajte.",
      },
    },
  },

  cookies: {
    title: "Používame cookies?",
    body: "Len jeden, ktorý je nevyhnutný: zapamätá si vašu voľbu. Štatistické ani marketingové cookies by sme načítali iba s vaším súhlasom — momentálne nepoužívame žiadne.",
    more: "Zásady cookies",
    necessaryOnly: "Len nevyhnutné",
    settings: "Nastavenia",
    acceptAll: "Prijať všetky",
    save: "Uložiť voľbu",
    reopen: "Nastavenia cookies",
    alwaysOn: "Vždy aktívne",
    categories: [
      {
        id: "necessary",
        name: "Nevyhnutné",
        desc: "Zapamätanie vašej voľby cookies. Bez neho by sa stránka pýtala pri každej návšteve.",
        locked: true,
      },
      {
        id: "statistics",
        name: "Štatistika",
        desc: "Anonymné údaje o návštevnosti, aby sme videli, čo na stránke funguje. Momentálne nepoužívame.",
        locked: false,
      },
      {
        id: "marketing",
        name: "Marketing",
        desc: "Na meranie a prispôsobenie reklám. Momentálne nepoužívame.",
        locked: false,
      },
    ],
  },

  footer: {
    nav: "Stránka",
    privacy: "Ochrana osobných údajov",
    cookies: "Zásady cookies",
    imprint: "Prevádzkovateľ",
    rights: "Všetky práva vyhradené.",
  },

  legal: {
    effective: "Účinné od",
    effectiveDate: "25. 10. 2026",
    questions: "Máte otázku?",
    back: "Späť na hlavnú stránku",

    privacyTitle: "Ochrana osobných údajov",
    privacyLead:
      "Tieto informácie popisujú, aké osobné údaje spracúvame, keď používate našu stránku alebo si od nás vyžiadate ponuku, na čo ich používame, ako dlho ich uchovávame a aké máte práva. Vychádzajú z nariadenia Európskeho parlamentu a Rady (EÚ) 2016/679 (GDPR) a zákona č. 18/2018 Z. z. o ochrane osobných údajov.",
    privacySections: [
      {
        heading: "1. Prevádzkovateľ",
        body: [
          `${COMPANY.legalName} (sídlo: ${COMPANY.seat}; IČO: ${COMPANY.ico}; zapísaná: ${COMPANY.register}; e-mail: ${EMAIL}).`,
          "Nie sme povinní určiť zodpovednú osobu. Otázky k spracúvaniu údajov môžete posielať na uvedený e-mail.",
        ],
      },
      {
        heading: "2. Žiadosť o ponuku a kontakt",
        body: ["Keď vyplníte formulár, napíšete nám alebo zavoláte, spracúvame tieto údaje:"],
        list: [
          "meno a e-mail — povinné, aby sme vám mohli odpovedať;",
          "telefónne číslo — nepovinné, ak vás môžeme kontaktovať aj telefonicky;",
          "požadovanú službu, rozlohu a obec — na výpočet ceny;",
          "obsah správy a čas jej odoslania.",
        ],
      },
      {
        heading: "3. Účel a právny základ",
        body: [
          "Účel: odpoveď na žiadosť, cenová ponuka, dohodnutie termínu a ak si službu objednáte, jej poskytnutie.",
          "Právny základ: opatrenia pred uzavretím zmluvy na vašu žiadosť a plnenie zmluvy (čl. 6 ods. 1 písm. b) GDPR). Uchovávanie faktúr je zákonná povinnosť (čl. 6 ods. 1 písm. c) GDPR, zákon č. 431/2002 Z. z. o účtovníctve).",
        ],
      },
      {
        heading: "4. Ako dlho údaje uchovávame",
        body: [
          `Ak zo žiadosti nevznikne objednávka, údaje uchovávame najviac ${RETENTION_MONTHS} mesiacov a potom ich vymažeme. Pri objednávke uchovávame údaje súvisiace so zmluvou 4 roky od jej skončenia (premlčacia lehota) a účtovné doklady 10 rokov podľa zákona.`,
          "Na vašu žiadosť údaje vymažeme aj skôr, ak ich uchovávanie nevyžaduje zákon.",
        ],
      },
      {
        heading: "5. Kto má k údajom prístup",
        body: [
          "K údajom majú prístup len naši zamestnanci, ktorí ich potrebujú na prípravu ponuky alebo vykonanie práce. Vaše údaje nepredávame ani neposkytujeme tretím stranám na marketing.",
          "Na prevádzku stránky využívame týchto sprostredkovateľov:",
        ],
        list: [
          `hosting: ${HOSTING.name} (${HOSTING.address}) — prevádzka stránky; v záznamoch servera sa krátkodobo z bezpečnostných dôvodov môže uchovať IP adresa návštevníka;`,
          "doručovanie e-mailov: Resend Inc. (USA) — doručuje nám obsah formulára e-mailom;",
          "poskytovateľ e-mailovej schránky — kde prijímame správy.",
        ],
      },
      {
        heading: "6. Prenos mimo EÚ",
        body: [
          "Poskytovatelia hostingu a e-mailu sú spoločnosti z USA. Prenos prebieha na základe rozhodnutia o primeranosti podľa rámca EÚ – USA pre ochranu údajov (Data Privacy Framework) alebo štandardných zmluvných doložiek Európskej komisie (čl. 46 GDPR).",
        ],
      },
      {
        heading: "7. Cookies",
        body: [
          `Stránka používa jediný vlastný cookie (${CONSENT_COOKIE}), ktorý si pamätá vašu voľbu cookies. Štatistické ani marketingové cookies by sme načítali len s vaším výslovným súhlasom — momentálne nepoužívame žiadne. Podrobnosti v zásadách cookies.`,
        ],
      },
      {
        heading: "8. Vaše práva",
        body: ["V súvislosti so spracúvaním údajov máte tieto práva:"],
        list: [
          "prístup: môžete požiadať o informáciu, aké údaje spracúvame, a o ich kópiu (čl. 15 GDPR);",
          "oprava: môžete požiadať o opravu nesprávnych údajov (čl. 16);",
          "vymazanie: môžete požiadať o vymazanie údajov (čl. 17);",
          "obmedzenie: môžete požiadať o obmedzenie spracúvania (čl. 18);",
          "prenosnosť: môžete požiadať o údaje v strojovo čitateľnej forme (čl. 20);",
          "námietka: môžete namietať proti spracúvaniu (čl. 21).",
        ],
      },
      {
        heading: "9. Ako uplatniť svoje práva",
        body: [
          `Žiadosť pošlite na ${EMAIL}. Odpovieme najneskôr do jedného mesiaca; pri zložitej žiadosti sa lehota môže predĺžiť o ďalšie dva mesiace, o čom vás budeme informovať. Vybavenie je bezplatné.`,
        ],
      },
      {
        heading: "10. Sťažnosť",
        body: [
          `Ak máte pocit, že sme porušili vaše práva, ozvite sa nám najprv — pokúsime sa to rýchlo vyriešiť. Podať môžete aj návrh na začatie konania na dozornom orgáne: ${AUTHORITY.name}, ${AUTHORITY.address}; ${AUTHORITY.web}; ${AUTHORITY.email}.`,
          "Svoje práva si môžete uplatniť aj na súde.",
        ],
      },
      {
        heading: "11. Bezpečnosť",
        body: [
          "Stránka je dostupná cez šifrované spojenie (HTTPS) a údaje z formulára k nám prichádzajú šifrovane. Prístup majú len tí, ktorí ich potrebujú na svoju prácu.",
        ],
      },
      {
        heading: "12. Zmeny",
        body: ["Ak sa spracúvanie zmení, tieto informácie aktualizujeme. Aktuálna verzia je vždy na tejto stránke."],
      },
    ],

    cookiesTitle: "Zásady cookies",
    cookiesLead:
      "Cookies sú malé textové súbory, ktoré stránka ukladá vo vašom prehliadači. Táto stránka ich používa čo najmenej.",
    cookiesSections: [
      {
        heading: "Aké cookies používame",
        body: [
          `Jediný: ${CONSENT_COOKIE}, ktorý si pamätá, či ste prijali štatistické a marketingové cookies. Je nevyhnutný, preto sa môže uložiť aj bez súhlasu (§ 109 ods. 8 zákona č. 452/2021 Z. z. o elektronických komunikáciách). Platí 6 mesiacov, potom sa opýtame znova.`,
          "Neobsahuje osobné údaje — len dve číslice, vaše dve voľby.",
        ],
      },
      {
        heading: "Štatistické a marketingové cookies",
        body: [
          "Momentálne nepoužívame žiadne: žiadne meranie návštevnosti, žiadne sledovanie reklám, žiadne vložené sociálne siete. Ak ich v budúcnosti zavedieme, načítame ich len s vaším súhlasom v nastaveniach cookies a tieto zásady aktualizujeme.",
        ],
      },
      {
        heading: "Tretie strany",
        body: [
          "Písma načítavame z nášho vlastného servera, takže počas návštevy sa žiadne údaje nedostanú ku Googlu ani inému externému poskytovateľovi.",
        ],
      },
      {
        heading: "Ako zmeniť svoje rozhodnutie",
        body: [
          "Voľbu môžete kedykoľvek zmeniť tlačidlom cookies v ľavom dolnom rohu alebo odkazom „Nastavenia cookies” v pätičke. Cookies môžete vymazať aj v nastaveniach prehliadača.",
        ],
      },
    ],
    cookieTable: {
      name: "Názov",
      type: "Typ",
      purpose: "Účel",
      lifetime: "Platnosť",
      typeValue: "Nevyhnutný, vlastný",
      purposeValue: "Zapamätanie voľby cookies",
      months: "mesiacov",
    },

    imprintTitle: "Prevádzkovateľ",
    imprintLead: "Údaje o prevádzkovateľovi stránky a poskytovateľovi hostingu.",
    imprintOperator: "Prevádzkovateľ",
    imprintHosting: "Hosting",
    imprintLabels: {
      provider: "Obchodné meno",
      seat: "Sídlo",
      register: "Zápis",
      representative: "Konateľ",
      email: "E-mail",
      phone: "Telefón",
      host: "Poskytovateľ hostingu",
      address: "Adresa",
      web: "Web",
    },
  },

  notFound: {
    lead: "Túto stránku sme už upratali. Alebo nikdy neexistovala.",
    cta: "Späť na hlavnú stránku",
  },
};

export default sk;
