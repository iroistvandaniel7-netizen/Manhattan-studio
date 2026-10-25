import { AUTHORITY, COMPANY, EMAIL, HOSTING, RETENTION_MONTHS } from "@/lib/site";
import { CONSENT_COOKIE } from "@/lib/consent";
import type { Dictionary } from "./hu";

/** English. Typed against the Hungarian source, so every key has to be here. */
const en: Dictionary = {
  meta: {
    title: "Čistý Domov — cleaning in Dunajská Streda",
    description:
      "Home, deep, window, move-out and office cleaning at a fixed price in Dunajská Streda and nearby. A reliable team that brings its own equipment. 20% off your first clean.",
  },

  ui: {
    skipToContent: "Skip to content",
    mainNav: "Main navigation",
    mobileNav: "Mobile navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
  },

  nav: [
    { href: "#services", label: "Services" },
    { href: "#prices", label: "Prices" },
    { href: "#office", label: "For offices" },
    { href: "#game", label: "Game" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
  ],

  hero: {
    eyebrow: "Home cleaning",
    title: "A clean home.",
    titleSoft: "More free time.",
    lead: "A reliable, vetted team. We bring our own equipment; you just come home.",
    cta: "Get a quote",
    boxLabel: "Ask for a quote",
  },

  video: {
    line: "Every corner.",
    lineSoft: "Every time.",
    caption: "Our own products, our own equipment, the same team every time.",
    label: "Video: a window being cleaned with a squeegee",
  },

  marquee: ["Home cleaning", "Deep cleaning", "Window cleaning", "Move-out cleaning", "Office cleaning", "Stairwells"],

  services: {
    eyebrow: "Our services",
    title: "Everything clean.",
    intro: "We do",
    and: "and",
    outro: "We bring our own products and equipment for all of it.",
    hint: "Tap a service to ask for a quote on it straight away.",
    items: [
      {
        id: "lakas",
        name: "Regular home cleaning",
        inSentence: "regular home cleaning",
        desc: "A fixed slot and the same team. We learn how you like it and do it that way every time.",
      },
      {
        id: "nagy",
        name: "Deep cleaning",
        inSentence: "deep cleaning",
        desc: "When the seasons change, before the holidays, or simply because it is time. We move everything that can be moved.",
      },
      {
        id: "ablak",
        name: "Window and glass cleaning",
        inSentence: "window and glass cleaning",
        desc: "Streak-free glass inside and out, clean frames and sills. On its own or added to any clean.",
      },
      {
        id: "koltozes",
        name: "Move-out cleaning",
        inSentence: "move-out cleaning",
        desc: "Before you hand over the keys, so you get your deposit back — or before you move in, so it feels like home on the first night.",
      },
      {
        id: "iroda",
        name: "Office cleaning",
        inSentence: "office cleaning",
        desc: "We clean after hours, so your team never has to work around us. A clean office every morning.",
      },
    ],
  },

  prices: {
    eyebrow: "Introductory offer",
    lead: "off your first clean.",
    value: "−20",
    text: "Try us without risk. If anything is not right, we come back within 24 hours and fix it free of charge.",
    terms: "For new customers, for one clean. Cannot be combined with other discounts.",
    cta: "Get a quote",
    from: " from",
    note: "Prices are final, with no hidden fees.",
  },

  steps: {
    eyebrow: "How we work",
    title: "Three steps",
    titleSoft: "to a clean home.",
    items: [
      { title: "Call or write", desc: "Tell us how big the place is and what you need. You get a fixed price the same day." },
      { title: "We arrive", desc: "At the agreed time, with our own products and equipment. We can collect a key, too." },
      { title: "You come home", desc: "A clean, fresh home. You pay after the clean, in cash or by card." },
    ],
  },

  game: {
    eyebrow: "Mini game",
    title: "Clean the window!",
    lead: "Drag your mouse or finger across the dirty glass. You have twenty seconds — let’s see how clean it gets.",
    start: "Start",
    again: "Play again",
    time: "Time",
    clean: "Clean",
    best: "Best",
    keyboardHint: "With a keyboard: move the sponge with the arrow keys.",
    canvasLabel: "A dirty window. Clean it with the mouse, a finger or the arrow keys.",
    canvasText: "Wash me!",
    noScript: "The game needs JavaScript. In the meantime, leave the windows to us.",
    results: [
      { min: 0, title: "Maybe leave this one to us.", text: "No problem — we do this all day. Streak-free." },
      { min: 50, title: "Nice work!", text: "Nearly there. Leave the last streaks to us." },
      { min: 85, title: "Almost spotless!", text: "Honestly, at that pace you could work for us." },
      { min: 97, title: "Crystal clear!", text: "Flawless. At home, though, feel free to leave it to us — we do it exactly like this." },
    ],
    cta: "Get a quote",
  },

  office: {
    eyebrow: "For companies and offices",
    title: "A clean office",
    titleSoft: "by morning.",
    lead: "We clean after hours, so your team never has to work around us.",
    items: ["Flexible monthly contract", "The same trained cleaners", "Invoices, clear pricing", "Supplies kept topped up"],
    cta: "Get an office quote",
  },

  gallery: {
    eyebrow: "Our work",
    title: "Before and after.",
    before: "Before",
    after: "After",
  },

  faq: {
    eyebrow: "FAQ",
    title: "Questions?",
    items: [
      {
        q: "Do I need to be home during the clean?",
        a: "No. Many customers hand us a key or leave it with the porter. We send you a message when we are done.",
      },
      {
        q: "Do I need to provide cleaning products or equipment?",
        a: "No, we bring everything: products, vacuum, mop, ladder. If you have a favourite product, we are happy to use it.",
      },
      {
        q: "How long does a clean take?",
        a: "It depends on the size of the place and the job — we include the expected time in the quote.",
      },
      {
        q: "How can I pay?",
        a: "After the clean, in cash or by card. Companies receive a monthly invoice.",
      },
      {
        q: "What if I am not happy with something?",
        a: "Tell us within 24 hours and we come back to put it right, free of charge. That is our guarantee.",
      },
      {
        q: "Can I cancel or change the appointment?",
        a: "Yes, free of charge up to 24 hours before the agreed time.",
      },
    ],
  },

  contact: {
    eyebrow: "Contact",
    title: "Ask for a quote.",
    lead: "Tell us what you need and we get back to you with a fixed price the same day. If it is urgent, just call.",
    area: "Dunajská Streda and 30 km around",
    hours: "Monday–Saturday",
    form: {
      title: "Quote request",
      name: "Name",
      namePlaceholder: "Anna Kovács",
      email: "Email",
      emailPlaceholder: "anna@example.com",
      phone: "Phone",
      phonePlaceholder: "+421 9xx xxx xxx",
      optional: "optional",
      service: "Service",
      servicePlaceholder: "Choose…",
      serviceOther: "Other / not sure yet",
      size: "Floor area",
      sizePlaceholder: "e.g. 65 m², 3 rooms",
      city: "Town",
      cityPlaceholder: "e.g. Dunajská Streda",
      message: "Message",
      messagePlaceholder: "When, how often, anything we should know…",
      consentBefore: "I have read and accept the ",
      consentLink: "privacy notice",
      consentAfter: ".",
      submit: "Send request",
      sending: "Sending…",
      successTitle: "Thank you, we have it!",
      success: "We will get back to you soon at the contact you gave. If you have a question in the meantime, just call.",
      again: "New message",
      mailInstead: "Send by email instead",
      mailSubject: "Quote request",
      errors: {
        summary: "Some fields are missing or incorrect. Please fix the marked fields.",
        name: "Please enter your name.",
        email: "Please enter your email address.",
        emailInvalid: "This does not look like a valid email address.",
        phoneInvalid: "This does not look like a valid phone number.",
        service: "Please choose a service.",
        message: "Please write a few words about what you need.",
        consent: "To send a request, please accept the privacy notice.",
        unavailable: "The form is unavailable right now. Send it by email in one click, or give us a call.",
        network: "It could not be sent. Try again, send it by email, or give us a call.",
      },
    },
  },

  cookies: {
    title: "Do we use cookies?",
    body: "Just one, and it is strictly necessary: it remembers your choice. We would only load statistics or marketing cookies with your permission — right now we use none.",
    more: "Cookie policy",
    necessaryOnly: "Necessary only",
    settings: "Settings",
    acceptAll: "Accept all",
    save: "Save choice",
    reopen: "Cookie settings",
    alwaysOn: "Always on",
    categories: [
      {
        id: "necessary",
        name: "Strictly necessary",
        desc: "Remembers your cookie choice. Without it the site would ask again on every visit.",
        locked: true,
      },
      {
        id: "statistics",
        name: "Statistics",
        desc: "Anonymous visit data, so we can see what works on the site. Not used at the moment.",
        locked: false,
      },
      {
        id: "marketing",
        name: "Marketing",
        desc: "For measuring and personalising adverts. Not used at the moment.",
        locked: false,
      },
    ],
  },

  footer: {
    nav: "Site",
    privacy: "Privacy notice",
    cookies: "Cookie policy",
    imprint: "Legal notice",
    rights: "All rights reserved.",
  },

  legal: {
    effective: "Effective from",
    effectiveDate: "25 October 2026",
    questions: "Questions?",
    back: "Back to the home page",

    privacyTitle: "Privacy notice",
    privacyLead:
      "This notice explains which personal data we process when you use our website or ask us for a quote, what we use it for, how long we keep it and what your rights are. It is based on Regulation (EU) 2016/679 (GDPR) and Slovak Act No. 18/2018 Coll. on the protection of personal data.",
    privacySections: [
      {
        heading: "1. Controller",
        body: [
          `${COMPANY.legalName} (registered office: ${COMPANY.seat}; company ID (IČO): ${COMPANY.ico}; registered: ${COMPANY.register}; email: ${EMAIL}).`,
          "We are not required to appoint a data protection officer. Send any questions about your data to the email above.",
        ],
      },
      {
        heading: "2. Quote requests and contact",
        body: ["When you fill in the quote form, write to us or call us, we process:"],
        list: [
          "your name and email — required, so we can reply;",
          "your phone number — optional, if we may call you;",
          "the service you want, the floor area and the town — to work out the price;",
          "the content of your message and when it was sent.",
        ],
      },
      {
        heading: "3. Purpose and legal basis",
        body: [
          "Purpose: answering your request, giving a quote, agreeing a date and, if you book, providing the service.",
          "Legal basis: steps taken at your request before entering into a contract, and performance of the contract (Art. 6(1)(b) GDPR). Keeping invoices is a legal obligation (Art. 6(1)(c) GDPR, Slovak Act No. 431/2002 Coll. on accounting).",
        ],
      },
      {
        heading: "4. How long we keep data",
        body: [
          `If a request does not become a booking, we keep the data for at most ${RETENTION_MONTHS} months and then delete it. For bookings, we keep contract-related data for 4 years after the contract ends (the limitation period) and accounting records for 10 years, as the law requires.`,
          "On request we delete your data sooner, unless the law requires us to keep it.",
        ],
      },
      {
        heading: "5. Who can access the data",
        body: [
          "Only staff who need it to prepare a quote or do the work. We do not sell your data or pass it to third parties for marketing.",
          "We use these processors to run the website:",
        ],
        list: [
          `hosting: ${HOSTING.name} (${HOSTING.address}) — serving the website; visitors’ IP addresses may be kept briefly in server logs for security;`,
          "email delivery: Resend Inc. (USA) — delivers the form content to us by email;",
          "our email provider — where we receive messages.",
        ],
      },
      {
        heading: "6. Transfers outside the EU",
        body: [
          "Our hosting and email providers are US companies. Transfers rely on the adequacy decision under the EU–US Data Privacy Framework or on the European Commission’s standard contractual clauses (Art. 46 GDPR).",
        ],
      },
      {
        heading: "7. Cookies",
        body: [
          `The site sets a single cookie of its own (${CONSENT_COOKIE}), which remembers your cookie choice. We would only load statistics or marketing cookies with your explicit consent — we use none at the moment. See the cookie policy for details.`,
        ],
      },
      {
        heading: "8. Your rights",
        body: ["You have the right to:"],
        list: [
          "access: ask what data we hold about you and for a copy (Art. 15 GDPR);",
          "rectification: ask us to correct inaccurate data (Art. 16);",
          "erasure: ask us to delete your data (Art. 17);",
          "restriction: ask us to restrict processing (Art. 18);",
          "portability: ask for your data in a machine-readable format (Art. 20);",
          "objection: object to processing (Art. 21).",
        ],
      },
      {
        heading: "9. How to exercise your rights",
        body: [
          `Send your request to ${EMAIL}. We reply within one month; for complex requests this may be extended by two further months, and we will tell you if so. It is free of charge.`,
        ],
      },
      {
        heading: "10. Complaints",
        body: [
          `If you think we have breached your data protection rights, please contact us first — we will try to put it right quickly. You can also complain to the supervisory authority: ${AUTHORITY.name}, ${AUTHORITY.address}; ${AUTHORITY.web}; ${AUTHORITY.email}.`,
          "You may also take legal action in court.",
        ],
      },
      {
        heading: "11. Security",
        body: [
          "The site is served over an encrypted (HTTPS) connection and form data reaches us encrypted. Only people who need the data for their work can access it.",
        ],
      },
      {
        heading: "12. Changes",
        body: ["If our processing changes, we update this notice. The current version is always on this page."],
      },
    ],

    cookiesTitle: "Cookie policy",
    cookiesLead: "Cookies are small text files a website stores in your browser. This site uses as few as possible.",
    cookiesSections: [
      {
        heading: "Which cookies we use",
        body: [
          `Exactly one: ${CONSENT_COOKIE}, which remembers whether you accepted statistics and marketing cookies. It is strictly necessary, so it may be set without consent (Section 109(8) of Slovak Act No. 452/2021 Coll. on electronic communications). It lasts 6 months, after which we ask again.`,
          "It holds no personal data — just two digits, your two choices.",
        ],
      },
      {
        heading: "Statistics and marketing cookies",
        body: [
          "We use none at the moment: no analytics, no ad tracking, no social media embeds. If we add any, we will only load them once you allow them in the cookie settings, and we will update this policy.",
        ],
      },
      {
        heading: "Third parties",
        body: ["Fonts are served from our own server, so no data reaches Google or any other outside provider during your visit."],
      },
      {
        heading: "How to change your mind",
        body: [
          "You can change your choice at any time with the cookie button in the bottom-left corner or the “Cookie settings” link in the footer. You can also delete cookies in your browser settings.",
        ],
      },
    ],
    cookieTable: {
      name: "Name",
      type: "Type",
      purpose: "Purpose",
      lifetime: "Lifetime",
      typeValue: "Strictly necessary, first-party",
      purposeValue: "Remembers your cookie choice",
      months: "months",
    },

    imprintTitle: "Legal notice",
    imprintLead: "Details of the website operator and hosting provider.",
    imprintOperator: "Operator",
    imprintHosting: "Hosting",
    imprintLabels: {
      provider: "Company",
      seat: "Registered office",
      register: "Registration",
      representative: "Managing director",
      email: "Email",
      phone: "Phone",
      host: "Hosting provider",
      address: "Address",
      web: "Web",
    },
  },

  notFound: {
    lead: "We already cleaned this page away. Or it never existed.",
    cta: "Back to the home page",
  },
};

export default en;
