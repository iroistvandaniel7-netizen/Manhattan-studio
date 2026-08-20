import type { Dictionary } from "./hu";

const sk: Dictionary = {
  meta: {
    title: "Manhattan Nyelvstúdió — Jazykové kurzy v Budapešti",
    description:
      "Kurzy angličtiny, nemčiny, francúzštiny, taliančiny a španielčiny v malých skupinách na dvoch miestach v Budapešti. Akreditované skúškové centrum. Rozraďovací test a ukážková hodina zdarma.",
    ogAlt: "Manhattan Nyelvstúdió — jazykové kurzy v Budapešti",
    skipToContent: "Preskočiť na obsah",
  },

  nav: {
    home: "Úvod",
    languages: "Jazyky",
    courses: "Kurzy",
    why: "Čo získate",
    exams: "Skúšky",
    contact: "Kontakt",
    cta: "Prihlásiť sa",
    openMenu: "Otvoriť menu",
    closeMenu: "Zavrieť menu",
    languageLabel: "Výber jazyka",
    backToTop: "Späť nahor",
  },

  hero: {
    eyebrow: "Budapešť · Örs vezér tere a Óbuda",
    title: "Päť jazykov. Malé skupiny.",
    lead: "Kurzy angličtiny, nemčiny, francúzštiny, taliančiny a španielčiny od začiatočníkov po pokročilých. Akreditované skúškové centrum.",
    cta: "Pozrieť kurzy",
    photoAlt: "Panoráma Manhattanu pri západe slnka s mrakodrapmi Dolného Manhattanu.",
    scroll: "Posúvaj",
  },

  facts: {
    title: "V číslach",
    items: [
      { value: "5", label: "Jazykov" },
      { value: "6", label: "Skúškových systémov" },
      { value: "2", label: "Miesta v Budapešti" },
      { value: "0 €", label: "Rozraďovací test" },
    ],
  },

  languages: {
    eyebrow: "Jazyky",
    title: "Čo učíme",
    lead: "Každý jazyk od začiatočníkov po pokročilých, v malých skupinách.",
    levels: "Od začiatočníkov po pokročilých",
    items: [
      { code: "EN", name: "Angličtina" },
      { code: "DE", name: "Nemčina" },
      { code: "FR", name: "Francúzština" },
      { code: "IT", name: "Taliančina" },
      { code: "ES", name: "Španielčina" },
    ],
  },

  courses: {
    eyebrow: "Kurzy",
    title: "Typy kurzov",
    lead: "Ten istý jazyk, viac foriem.",
    items: [
      "Všeobecný jazykový kurz",
      "Príprava na jazykovú skúšku",
      "Letný intenzívny kurz",
      "Konverzačné turné s rodeným hovoriacim",
      "Jazykový balíček na cestovanie",
      "Kurz pre deti a mládež",
      "Individuálna výučba",
      "Tréning na pracovný pohovor",
      "Odborná jazyková výučba",
      "Kurz pre budúce mamičky",
      "Firemná výučba priamo u vás",
    ],
  },

  why: {
    eyebrow: "Čo získate",
    title: "Toto je v cene",
    items: [
      { title: "Malé skupiny", desc: "Učíte sa v skupinách s nízkym počtom študentov." },
      { title: "Kvalifikovaní lektori", desc: "Hodiny vedú odborne pripravení lektori." },
      { title: "Veľa konverzácie", desc: "Hodiny stoja na hovorení, v uvoľnenej atmosfére." },
      { title: "Rozraďovací test zdarma", desc: "Rozraďovací test je bezplatný." },
      { title: "Ukážková hodina zdarma", desc: "Pred prihlásením si môžete sadnúť na hodinu." },
      { title: "Skúška nanečisto zdarma", desc: "Skúška nanečisto je tiež bezplatná." },
      { title: "Garancia jazykovej skúšky", desc: "K príprave patrí garancia jazykovej skúšky." },
      { title: "Stráženie detí zdarma", desc: "Počas doobedňajších kurzov postrážime dieťa." },
    ],
  },

  exams: {
    eyebrow: "Skúšky",
    title: "Akreditované skúškové centrum",
    lead: "Sme skúškovým centrom pre tieto skúškové systémy.",
  },

  contact: {
    eyebrow: "Kontakt",
    title: "Kontaktné údaje",
    lead: "Zavolajte nám alebo napíšte cez formulár.",
    locationsTitle: "Miesta",
    locations: {
      ors: { name: "Örs vezér tere", note: "Árkád Irodaház, 2. poschodie" },
      obuda: { name: "Óbuda", note: "Manhattan Nyelvstúdió Buda" },
    },
    openMap: "Mapa",
    phoneTitle: "Telefón",
    faxTitle: "Fax",
    hoursTitle: "Otváracie hodiny",
    hours: [
      { d: "Pondelok – Piatok", h: "10:00 – 18:30" },
      { d: "Sobota", h: "09:00 – 12:00" },
      { d: "Nedeľa", h: "Zatvorené" },
    ],
    form: {
      title: "Napíšte nám",
      name: "Meno",
      namePlaceholder: "Anna Kováčová",
      email: "E-mail",
      emailPlaceholder: "anna@example.com",
      phone: "Telefónne číslo",
      phonePlaceholder: "+421 900 123 456",
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
      "Konečné právne znenie tejto stránky poskytuje Manhattan Nyelvstúdió. Dovtedy sa s akoukoľvek otázkou týkajúcou sa spracovania údajov obráťte na nás telefonicky.",
  },

  notFound: {
    title: "Stránka sa nenašla",
    lead: "Hľadaná stránka neexistuje.",
    cta: "Späť na úvodnú stránku",
  },
};

export default sk;
