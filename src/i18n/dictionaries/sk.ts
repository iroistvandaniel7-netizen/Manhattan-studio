import type { Dictionary } from "./hu";

const sk: Dictionary = {
  meta: {
    title: "MANHATTAN STUDIO — Jazyková škola v Dunajskej Strede",
    description:
      "Kurzy angličtiny, nemčiny, ruštiny, španielčiny, taliančiny, slovenčiny a maďarčiny v centre Dunajskej Stredy. Normálne, polointenzívne a intenzívne kurzy, každý deň 9:00 – 20:00.",
    ogAlt: "MANHATTAN STUDIO — jazyková škola v Dunajskej Strede",
    skipToContent: "Preskočiť na obsah",
  },

  nav: {
    home: "Úvod",
    languages: "Jazyky",
    courses: "Kurzy",
    why: "Čo získate",
    contact: "Kontakt",
    cta: "Prihlásiť sa",
    openMenu: "Otvoriť menu",
    closeMenu: "Zavrieť menu",
    languageLabel: "Výber jazyka",
    backToTop: "Späť nahor",
  },

  hero: {
    eyebrow: "Dunajská Streda · Korzo Bélu Bartóka",
    title: "Sedem jazykov. Jedno štúdio.",
    lead: "Jazyková škola v centre Dunajskej Stredy. Od začiatočníkov po pokročilých, každý deň v týždni — aj cez víkend.",
    cta: "Pozrieť kurzy",
    photoAlt: "Panoráma Manhattanu pri západe slnka s mrakodrapmi Dolného Manhattanu.",
    scroll: "Posúvaj",
  },

  facts: {
    title: "V číslach",
    items: [
      { value: "7", label: "Jazykov", note: "Od začiatočníkov po pokročilých" },
      { value: "160 €", label: "Normálny kurz", note: "10 týždňov, 20 hodín" },
      { value: "10", label: "Hodín tréningu zdarma", note: "Ku kurzom angličtiny a nemčiny" },
      { value: "7", label: "Dní otvorené", note: "Každý deň 9:00 – 20:00" },
    ],
  },

  languages: {
    eyebrow: "Jazyky",
    title: "Čo učíme",
    lead: "Sedem jazykov, od začiatočníkov po pokročilých.",
    map: {
      caption: "Sedem jazykov na mape sveta, z pohľadu Dunajskej Stredy",
      drag: "Potiahnite zemeguľu",
      spokenIn: "Kde sa ním hovorí",
    },
    regions: {
      gb: "Spojené kráľovstvo",
      ie: "Írsko",
      us: "Spojené štáty",
      ca: "Kanada",
      au: "Austrália",
      nz: "Nový Zéland",
      za: "Južná Afrika",
      in: "India",
      de: "Nemecko",
      at: "Rakúsko",
      ch: "Švajčiarsko",
      ru: "Rusko",
      by: "Bielorusko",
      kz: "Kazachstan",
      es: "Španielsko",
      mx: "Mexiko",
      co: "Kolumbia",
      pe: "Peru",
      cl: "Čile",
      ar: "Argentína",
      it: "Taliansko",
      sk: "Slovensko",
      hu: "Maďarsko",
    },
    items: [
      { code: "EN", name: "Angličtina" },
      { code: "DE", name: "Nemčina" },
      { code: "RU", name: "Ruština" },
      { code: "ES", name: "Španielčina" },
      { code: "IT", name: "Taliančina" },
      { code: "SK", name: "Slovenčina" },
      { code: "HU", name: "Maďarčina" },
    ],
  },

  courses: {
    eyebrow: "Kurzy",
    title: "Tri tempá",
    lead: "Každý jazyk sa dá študovať v troch formách. Vyberte si tú, ktorá sadne vášmu rozvrhu.",
    formats: [
      { name: "Normálny", note: "Dvakrát týždenne, pohodlným tempom." },
      { name: "Polointenzívny", note: "Rýchlejší postup, hustejší rozvrh." },
      { name: "Intenzívny", note: "Najrýchlejšia cesta k požadovanej úrovni." },
    ],
    planTitle: "Normálny kurz",
    planPrice: "160 €",
    planRows: [
      { k: "Trvanie", v: "10 týždňov" },
      { k: "Počet hodín", v: "20 hodín" },
      { k: "Rozvrh", v: "2 × 60 minút týždenne" },
    ],
    planCta: "Mám záujem",
  },

  why: {
    eyebrow: "Čo získate",
    title: "Toto je v cene",
    items: [
      {
        title: "10 hodín komunikačného tréningu",
        desc: "Ku kurzom angličtiny a nemčiny ho dávame ako darček.",
      },
      { title: "Malé skupiny", desc: "Skupiny otvárame minimálne so štyrmi študentmi." },
      { title: "Otvorené každý deň", desc: "Od pondelka do nedele, od 9:00 do 20:00." },
      { title: "Študovať sa dá aj cez víkend", desc: "Vybrať si môžete aj víkendové termíny." },
      { title: "V centre mesta", desc: "Štúdio sídli v centre Dunajskej Stredy." },
      { title: "Príprava na skúšku", desc: "Pripravíme vás na úspešnú jazykovú skúšku." },
    ],
  },

  contact: {
    eyebrow: "Kontakt",
    title: "Kontaktné údaje",
    lead: "Zavolajte, napíšte e-mail alebo vyplňte formulár.",
    addressTitle: "Adresa",
    city: "Dunajská Streda",
    openMap: "Mapa",
    phoneTitle: "Telefón",
    emailTitle: "E-mail",
    hoursTitle: "Otváracie hodiny",
    hoursDays: "Pondelok – Nedeľa",
    hoursTime: "9:00 – 20:00",
    form: {
      title: "Napíšte nám",
      name: "Meno",
      namePlaceholder: "Anna Kováčová",
      email: "E-mail",
      emailPlaceholder: "anna@example.com",
      phone: "Telefónne číslo",
      phonePlaceholder: "0948 172 288",
      language: "Ktorý jazyk vás zaujíma?",
      languagePlaceholder: "Vyberte jazyk",
      languageOther: "Zatiaľ neviem",
      message: "Správa",
      messagePlaceholder: "Napíšte krátko, čo potrebujete.",
      optional: "nepovinné",
      submit: "Odoslať správu",
      sending: "Odosiela sa…",
      successTitle: "Ďakujeme!",
      success: "Vašu správu sme dostali.",
      again: "Nová správa",
      errors: {
        name: "Zadajte prosím svoje meno.",
        email: "Zadajte prosím svoju e-mailovú adresu.",
        emailInvalid: "Táto e-mailová adresa nevyzerá platne.",
        phoneInvalid: "Toto telefónne číslo nevyzerá platne.",
        language: "Vyberte prosím jazyk.",
        message: "Napíšte prosím pár slov.",
        summary: "Formulár nie je úplný. Skontrolujte označené polia.",
        network: "Správu sa teraz nepodarilo odoslať. Zavolajte nám prosím.",
        unavailable: "Online odosielanie správ momentálne nie je dostupné. Zavolajte nám prosím.",
      },
    },
  },

  footer: {
    navTitle: "Mapa stránky",
    contactTitle: "Kontakt",
    langTitle: "Jazyk",
    rights: "Všetky práva vyhradené.",
    privacy: "Ochrana údajov",
    cookies: "Cookies",
  },

  legal: {
    privacyTitle: "Zásady ochrany osobných údajov",
    cookiesTitle: "Informácie o cookies",
    backHome: "Späť na úvodnú stránku",
    placeholderNote:
      "Konečné právne znenie tejto stránky poskytuje MANHATTAN STUDIO. Dovtedy sa s akoukoľvek otázkou týkajúcou sa spracovania údajov obráťte na nás telefonicky alebo e-mailom.",
  },

  notFound: {
    title: "Stránka sa nenašla",
    lead: "Hľadaná stránka neexistuje.",
    cta: "Späť na úvodnú stránku",
  },
};

export default sk;
