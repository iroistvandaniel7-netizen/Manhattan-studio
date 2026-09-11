import type { Dictionary } from "./hu";

const en: Dictionary = {
  meta: {
    title: "MANHATTAN STUDIO — Language school in Dunajská Streda",
    description:
      "English, German, Russian, Spanish, Italian, Slovak and Hungarian courses in the centre of Dunajská Streda. Normal, semi-intensive and intensive courses, open weekdays 9:00–20:00.",
    ogAlt: "MANHATTAN STUDIO — language school in Dunajská Streda",
    skipToContent: "Skip to content",
  },

  nav: {
    home: "Home",
    about: "About",
    languages: "Languages",
    quiz: "Level check",
    gallery: "Gallery",
    courses: "Courses",
    why: "What's included",
    contact: "Contact",
    cta: "Apply now",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageLabel: "Choose language",
    backToTop: "Back to top",
  },

  hero: {
    eyebrow: "Dunajská Streda · Korzo Bélu Bartóka",
    title: "Seven languages. One studio.",
    lead: "A language school in the centre of Dunajská Streda. Beginner to advanced, weekdays from morning to evening.",
    cta: "View the courses",
    photoAlt: "The Manhattan skyline at sunset, with the towers of Lower Manhattan.",
    scroll: "Scroll",
  },

  facts: {
    title: "In numbers",
    items: [
      { value: "7", label: "Languages", note: "Beginner to advanced" },
      { value: "€165", label: "10 private lessons", note: "In any language" },
      { value: "20+", label: "English Club", note: "Every other week, all school year" },
      { value: "4–99", label: "Years old", note: "Everyone's welcome" },
    ],
  },

  languages: {
    eyebrow: "Languages",
    title: "What we teach",
    lead: "Seven languages, from beginner to advanced.",
    map: {
      spokenIn: "Where it's spoken",
    },
    regions: {
      gb: "United Kingdom",
      ie: "Ireland",
      us: "United States",
      ca: "Canada",
      au: "Australia",
      nz: "New Zealand",
      za: "South Africa",
      in: "India",
      de: "Germany",
      at: "Austria",
      ch: "Switzerland",
      ru: "Russia",
      by: "Belarus",
      kz: "Kazakhstan",
      es: "Spain",
      mx: "Mexico",
      co: "Colombia",
      pe: "Peru",
      cl: "Chile",
      ar: "Argentina",
      it: "Italy",
      sk: "Slovakia",
      hu: "Hungary",
    },
    items: [
      { code: "EN", name: "English" },
      { code: "DE", name: "German" },
      { code: "RU", name: "Russian" },
      { code: "ES", name: "Spanish" },
      { code: "IT", name: "Italian" },
      { code: "SK", name: "Slovak" },
      { code: "HU", name: "Hungarian" },
    ],
  },

  courses: {
    eyebrow: "Courses",
    title: "Prices",
    lead: "Group English courses at published prices, and private lessons in every language.",

    priceNote: "Prices are final: nothing is added to the amount shown.",

    groupTitle: "Group courses",
    groupNote:
      "For group lessons in the other languages, ask at the studio — groups open to suit the levels of those enrolling.",
    groupEnquire: "Ask about group lessons",

    privateTitle: "Private lessons",
    privateLead:
      "Private lessons are good for all seven languages; you choose which one after buying the package.",

    privateValidity: "Bought lessons do not expire: they stay valid until you have used them.",

    hours: "hours",
    lesson: "lesson",
    lessons: "lessons",

    items: {
      "cambridge-30": {
        name: "Cambridge preparation",
        note: "Preparation for the Cambridge exam.",
      },
      "english-a1a2-20": {
        name: "English A1–A2",
        note: "Beginner and returning learners, in a group.",
      },
      "english-b1b2-20": {
        name: "English B1–B2",
        note: "Intermediate level, in a group.",
      },
      "private-1": { name: "1 private lesson", note: "" },
      "private-5": { name: "5 private lessons", note: "" },
      "private-10": { name: "10 private lessons", note: "" },
    },

    groupBadge: "English",
    privateBadge: "Any language",
    railPrevious: "Previous",
    railNext: "Next",

    soldOut: "Full",
    soldOutNote: "This group is full. Write to us and we'll let you know when the next one opens.",
    soldOutAsk: "Let me know",

    add: "Add to basket",
    added: "In your basket",
  },

  shop: {
    cartTitle: "Basket",
    open: "Basket",
    empty: "Your basket is empty.",
    emptyNote: "Choose a course or a package of private lessons.",
    remove: "Remove",
    quantity: "Quantity",
    increase: "More",
    decrease: "Fewer",
    total: "Total",
    checkout: "Continue to order",
    continue: "Keep browsing",
    itemCount: "items",

    checkoutTitle: "Your order",
    checkoutLead: "Leave your details and we will get in touch.",
    summary: "Your order",
    name: "Name",
    email: "Email",
    phone: "Phone number",
    note: "Note",
    notePlaceholder: "Which language would you learn, and when are you free?",
    optional: "optional",
    submit: "Send order",
    sending: "Sending…",

    payNow:
      "Payment happens in the next step, on Stripe's secure page. You pay by card and get confirmation right away.",
    submitPay: "Continue to payment",

    payLater:
      "Payment is not online yet: after you order we will contact you, and you settle at the studio or by bank transfer.",

    termsNote: "Sending the order means you accept our terms:",
    termsLink: "Terms of sale",

    mailSubject: "MANHATTAN STUDIO — order confirmation",
    mailIntro: "Thank you for your order. This is what we received:",
    mailPaidNext: "Your payment went through. We will be in touch shortly with times.",
    mailUnpaidNext:
      "Payment has not been taken yet: we will contact you, and you settle at the studio or by bank transfer.",
    mailOutro: "If you have any questions, reply to this email or give us a call.",

    doneTitle: "We have your order",
    doneLead: "We will be in touch shortly with the details.",
    orderRef: "Order reference",

    errorTitle: "The order could not be sent",
    errorLead: "Give us a call and we will take the order by phone.",
    required: "Required field",
    invalidEmail: "Enter a valid email address",
  },

  why: {
    eyebrow: "What's included",
    title: "This comes with it",
    items: [
      { title: "English Club", desc: "We meet every other week, all school year." },
      { title: "Small groups", desc: "We open groups with smaller numbers too." },
      { title: "In the town centre", desc: "The studio is in the centre of Dunajská Streda." },
      { title: "Exam preparation", desc: "We prepare you for a successful language exam." },
    ],
  },

  contact: {
    eyebrow: "Contact",
    title: "Get in touch",
    lead: "Call us, send an email, or use the form.",
    addressTitle: "Address",
    city: "Dunajská Streda",
    openMap: "Map",
    phoneTitle: "Phone",
    emailTitle: "Email",
    hoursTitle: "Opening hours",
    hoursDays: "Monday – Friday",
    hoursTime: "9:00 – 20:00",
    form: {
      title: "Send us a message",
      name: "Name",
      namePlaceholder: "Anna Kovács",
      email: "Email",
      emailPlaceholder: "anna@example.com",
      phone: "Phone number",
      phonePlaceholder: "0948 172 288",
      language: "Which language are you interested in?",
      languagePlaceholder: "Choose a language",
      languageOther: "Not sure yet",
      message: "Message",
      messagePlaceholder: "Tell us briefly what you need.",
      optional: "optional",
      submit: "Send message",
      sending: "Sending…",
      successTitle: "Thank you!",
      success: "We've received your message.",
      again: "New message",
      mailInstead: "Send by email",
      errors: {
        name: "Please enter your name.",
        email: "Please enter your email address.",
        emailInvalid: "That email address doesn't look valid.",
        phoneInvalid: "That phone number doesn't look valid.",
        language: "Please choose a language.",
        message: "Please write a few words.",
        summary: "The form is incomplete. Please check the highlighted fields.",
        network: "We couldn't send your message just now. Send it by email, or call us.",
        unavailable: "Online messaging isn't available at the moment. Send your message by email, or call us.",
      },
    },
  },

  footer: {
    navTitle: "Sitemap",
    contactTitle: "Contact",
    langTitle: "Language",
    rights: "All rights reserved.",
    privacy: "Privacy",
    cookies: "Cookies",
    terms: "Terms",
  },

  people: {
    alt: "A young couple on Times Square, with yellow cabs and billboards behind them",
  },

  cookieBanner: {
    title: "Cookies on this site",
    body: "We use one cookie: the one that remembers this answer of yours. We set no tracking or advertising cookies. If you allow it, we may measure anonymous visitor numbers in future — everything works the same either way.",
    more: "Cookie notice",
    reopen: "Cookie settings",
    accept: "Accept",
    necessary: "Necessary only",
  },

  about: {
    eyebrow: "About us",
    title: "The language you finally dare to speak",
    metaDescription:
      "MANHATTAN language studio in Dunajská Streda: modern methods, experienced teachers and lessons in a good atmosphere — matched to your level and your goals.",

    lead: "Want to learn a new language? Build on what you already know? Or finally speak up in English — or another language — with confidence?",
    leadStrong: "We'll help you get there.",
    leadMore:
      "At MANHATTAN language studio you learn with modern methods, experienced teachers and lessons in a good atmosphere — matched to your level and your goals.",

    whyTitle: "Why MANHATTAN?",
    whyItems: [
      {
        title: "Your goal, your pace",
        desc: "Whether you need the language for work, are preparing for an exam, are moving abroad, or simply want to communicate more confidently — we'll help you find the route that fits you.",
      },
      {
        title: "Experienced teachers",
        desc: "Our qualified, well-prepared teachers help you not just learn the language, but dare to use it.",
      },
      {
        title: "Visible progress",
        desc: "We work with effective methods and well-built courses, so the time you spend learning is really about your progress.",
      },
      {
        title: "Lessons in a good atmosphere",
        desc: "Learning a language can be enjoyable. Here you learn in a supportive, easy-going setting where questions and mistakes are a natural part of getting better.",
      },
    ],

    coursesTitle: "Find the course that fits you",
    coursesLead:
      "Whether you're meeting the language for the first time or already know some, you'll find the right level and the right format here.",
    coursesItems: [
      {
        title: "Intensive course",
        desc: "For getting better quickly, and reaching your goal in a shorter time.",
      },
      {
        title: "Semi-intensive course",
        desc: "For steady progress when you need a more flexible pace.",
      },
      {
        title: "Regular course",
        desc: "For learning alongside work or study, at a more comfortable pace.",
      },
      {
        title: "Beginner to advanced",
        desc: "We'll help you find the next step up from wherever you are now.",
      },
    ],

    chartAxis: { time: "Time", level: "Level" },
    chartNote: "The same goal, at three paces.",

    closing:
      "Learning a language does not have to take years — with the right method, the right pace and the right support you get there far more efficiently.",

    ctaCourses: "See the courses",
    ctaContact: "A question? Write to us",
  },

  quiz: {
    eyebrow: "Level check",
    title: "How good is your English?",
    lead: "Fifteen questions, about two minutes. At the end you'll see your score and which course to start with.",

    questionLabel: "Question",
    progressLabel: "Progress",
    tiers: {
      basic: "Elementary",
      mid: "Intermediate",
      high: "Advanced",
    },

    correct: "Correct",
    wrong: "Not quite",
    solution: "The answer is:",

    scoreTitle: "Your score",
    recommendTitle: "We'd recommend this course",
    seeAll: "All courses and prices",
    again: "Take it again",

    bands: {
      starter: {
        title: "Beginner and returning",
        desc: "Worth starting with the foundations: tenses, sentence structure, everyday vocabulary.",
      },
      core: {
        title: "Intermediate",
        desc: "The basics are there. The next step is using them with confidence.",
      },
      advanced: {
        title: "Advanced",
        desc: "A strong base. From here it's worth aiming at the exam.",
      },
    },

    disclaimer:
      "This is an indicative test, not an official placement — we'll go through your exact level at the studio.",
    bare: "The test needs JavaScript. In the meantime, have a look at the courses and prices.",
  },

  gallery: {
    eyebrow: "Gallery",
    title: "The studio",
    lead: "Photographs of the studio in Dunajská Streda — from the door to the classrooms.",
    metaDescription:
      "Photographs of MANHATTAN STUDIO in Dunajská Streda: the entrance, the classrooms, lessons.",

    bannerAlt: "Times Square in New York: billboards, a yellow cab and people on the street.",
    bannerCaption: "Times Square, New York",

    inside: "Inside the studio",

    photos: {
      entrance:
        "The studio entrance with the MANHATTAN language studio sign; two people on the steps holding coursebooks.",
      board:
        "A classroom: someone writing on the whiteboard, grammar and vocabulary charts on the walls.",
      teacher:
        "A classroom with the whiteboard and posters; a coursebook, notes and picture cards on the table.",
      kids: "An adult and a child playing with picture cards on a rug, in a room set up with toys.",
    },

    open: "Enlarge",
    close: "Close",
    previous: "Previous photo",
    next: "Next photo",
  },

  contactPage: {
    title: "Contact",
    lead: "Come to the studio, give us a call, or tell us what you need — we'll get back to you.",
    metaDescription:
      "MANHATTAN STUDIO language school in Dunajská Streda: address, phone, email and opening hours.",
    findUs: "Contact details",
    complaintsTitle: "Complaints",
    complaintsNote: "If you have a complaint about the service, write here — we handle complaints within the period the law sets.",
  },

  thanks: {
    eyebrow: "Order",
    title: "Thank you for your order!",
    lead: "Your payment went through. We have your order and will be in touch shortly with times.",
    next: "Keep your order reference — quote it if you have any questions. If something looks wrong, just give us a call.",
    metaDescription: "Thank you for your order at MANHATTAN STUDIO.",
  },
  legal: {
    privacyTitle: "Privacy notice",
    cookiesTitle: "Cookie notice",
    termsTitle: "Terms of sale",
    backHome: "Back to the home page",
    contactHeading: "A question about your data?",
    termsContactHeading: "A question about your order?",
    controllerHeading: "Who processes your data",
    sellerHeading: "Who you are buying from",
    vatNote:
      "The company has been registered for VAT under §4 of the Slovak VAT Act since 2 November 2023.",

    privacyLead:
      "This notice describes what this website asks you for, what happens to it, and what you can ask us to do about it.",
    privacyPending:
      "This notice covers data processing. The rules for ordering, paying and withdrawing are in the terms of sale — the link is in the footer.",

    privacySections: [
      {
        heading: "What we ask for",
        body: [
          "Only what you type in. The site collects nothing about you on its own.",
        ],
        list: [
          "Contact form: name, email address, phone number (optional), the language you are interested in, and your message.",
          "Order: name, email address, phone number (optional), a note (optional), and which course or package you chose.",
        ],
      },
      {
        heading: "What happens to it",
        body: [
          "What you send through the form or as an order reaches the studio, so that we can get back to you and start the course. We do not sell it and do not pass it to anyone for marketing.",
          "For card payments, the payment is handled by Stripe on its own page. The studio never sees or stores your card number — Stripe reports only that a payment was made, and for how much.",
        ],
      },
      {
        heading: "We do not track you",
        body: [
          "There is no Google Analytics on this site, no Facebook pixel, and no other measurement or advertising code. We do not build a profile of you and do not record what you looked at.",
          "We set one cookie: the one that remembers your answer to the cookie banner. The cookie notice has the detail.",
        ],
      },
      {
        heading: "How long we keep it",
        body: [
          "One year from the end of the course. After that it is deleted, except for anything accounting or tax law requires us to keep for longer — invoices, for instance, are kept for the period the law sets.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          "You can ask at any time what data we hold about you, ask us to correct or delete it, or ask us to stop using it. An email to the address below is enough; we have to satisfy ourselves that it really is you.",
          "If you believe we are handling your data wrongly, you can complain to the Slovak data protection authority (Úrad na ochranu osobných údajov Slovenskej republiky).",
        ],
      },
    ],

    termsLead:
      "This page sets out what you are buying, how an order is made, how you pay, and what you can do if you change your mind.",
    termsPending:
      "These terms are based on what the studio has supplied. They go to a lawyer before they become binding — until then this page is for information.",

    termsSections: [
      {
        heading: "What you are buying",
        body: [
          "The studio sells language teaching: advertised group courses, and private lessons sold in packages. Every course and package says how many teaching hours it includes.",
          "The prices shown are final. They include VAT, and nothing is added to the amount shown.",
        ],
      },
      {
        heading: "How an order is made",
        body: [
          "You put a course or a package in the basket, give your name and email address — phone and note are optional — and send the order.",
          "The order gets a reference in the form MS-2609-ABCDE. Quote it whenever you ask about the order: it is how we find it.",
          "The contract is made when the payment has arrived and we have confirmed the order by email. Until then the order is an offer.",
        ],
      },
      {
        heading: "Payment",
        body: [
          "Payment happens on Stripe's payment page, in euros. From there you come back to this site.",
          "The studio never sees or stores your card details — Stripe handles those. All the studio gets back is that the payment went through, and for how much.",
          "Exactly what you can pay with is shown on the payment page: it lists only the methods your card and your device both support.",
        ],
      },
      {
        heading: "The course runs",
        body: [
          "An advertised course goes ahead even if fewer people enrol than expected. Your place does not depend on the group filling up.",
        ],
      },
      {
        heading: "If a lesson does not happen",
        body: [
          "If a lesson has to be put off for a reason on the studio's side, we move it to another time. The lesson is not lost and you do not pay for it twice.",
          "If it is you who cannot make a private lesson, tell us at least four days before the agreed time and we will find another.",
        ],
      },
      {
        heading: "How long what you bought stays valid",
        body: [
          "Private packages do not expire. Bought lessons stay valid until you have used them — there is no deadline on them.",
          "Group courses run at the advertised time, at the address given, for the number of hours stated.",
        ],
      },
      {
        heading: "If you change your mind",
        body: [
          "As a consumer ordering online you may withdraw within 14 days of the order, without giving a reason. An email to the address below with your order reference is enough.",
          "If teaching began at your request before the 14 days were up, the withdrawal is settled pro rata: we deduct the price of the lessons already taught and return the rest.",
          "If teaching has not started, the whole amount is returned. The money goes back the way you paid.",
        ],
      },
      {
        heading: "Supervisory authority",
        body: [
          "If a complaint is not resolved with us, you can take it to the Slovak Trade Inspection (Slovenská obchodná inšpekcia, SOI). Its contact details are at www.soi.sk.",
        ],
      },
      {
        heading: "Which law applies",
        body: [
          "The contract is governed by Slovak law. That does not affect the protection given to you as a consumer by the mandatory rules of the country you live in — this clause does not take those away.",
        ],
      },
    ],

    termsComplaintsHeading: "Complaints",
    termsComplaintsBody: [
      "If you are not happy with what you got, write to us. Give your order reference and say what the problem is.",
      "We take the complaint and answer it within the period the law sets.",
    ],

    cookiesLead:
      "In short: this site uses one cookie, and only to remember your answer. There is no tracking.",

    cookiesSections: [
      {
        heading: "We use one cookie",
        body: [
          "The one that remembers what you answered in the cookie banner. Without storing your answer we would have to ask again on every page load.",
          "We set no tracking, analytics or advertising cookies — none of our own and none from third parties. Today there is no difference in what the site does between “Necessary only” and “Accept”; the difference takes effect only if we start measuring visits in future, and that is tied to your answer in advance.",
        ],
        list: [
          "Name: ms-consent — Contents: “all” or “necessary” — Lifetime: 6 months",
        ],
      },
      {
        heading: "Changed your mind?",
        body: [
          "You can bring the question back at any time with the “Cookie settings” button in the footer. After six months we ask again anyway.",
        ],
      },
      {
        heading: "Your basket stays in your own browser",
        body: [
          "When you put a course in the basket, your browser remembers what is in it so it survives a page refresh. This is not a cookie: it never leaves your computer and we do not send it anywhere. It reaches us only when you send the order yourself.",
          "You can clear it at any time: empty the basket, or clear the site's data in your browser settings.",
        ],
      },
      {
        heading: "When you pay",
        body: [
          "Card payment happens on Stripe's page. Stripe uses its own cookies there, under its own policy — this notice does not cover that page.",
        ],
      },
    ],
  },

  notFound: {
    title: "Page not found",
    lead: "The page you're looking for doesn't exist.",
    cta: "Back to the homepage",
  },
};

export default en;
