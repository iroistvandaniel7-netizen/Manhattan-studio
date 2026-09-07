import type { Dictionary } from "./hu";

const en: Dictionary = {
  meta: {
    title: "MANHATTAN STUDIO — Language school in Dunajská Streda",
    description:
      "English, German, Russian, Spanish, Italian, Slovak and Hungarian courses in the centre of Dunajská Streda. Normal, semi-intensive and intensive courses, open every day 9:00–20:00.",
    ogAlt: "MANHATTAN STUDIO — language school in Dunajská Streda",
    skipToContent: "Skip to content",
  },

  nav: {
    home: "Home",
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
    lead: "A language school in the centre of Dunajská Streda. Beginner to advanced, every day of the week — weekends included.",
    cta: "View the courses",
    photoAlt: "The Manhattan skyline at sunset, with the towers of Lower Manhattan.",
    scroll: "Scroll",
  },

  facts: {
    title: "In numbers",
    items: [
      { value: "7", label: "Languages", note: "Beginner to advanced" },
      { value: "€165", label: "10 private lessons", note: "In any language" },
      { value: "10", label: "Hours of training free", note: "With English and German courses" },
      { value: "7", label: "Days open", note: "Every day 9:00–20:00" },
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

    groupTitle: "Group courses",
    groupNote:
      "For group lessons in the other languages, ask at the studio — groups open to suit the levels of those enrolling.",
    groupEnquire: "Ask about group lessons",

    privateTitle: "Private lessons",
    privateLead:
      "Private lessons are good for all seven languages; you choose which one after buying the package.",

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
      {
        title: "10 hours of communication training",
        desc: "A gift with every English and German course.",
      },
      { title: "Small groups", desc: "Groups start with a minimum of four students." },
      { title: "Open every day", desc: "Monday to Sunday, from 9:00 to 20:00." },
      { title: "Weekend study", desc: "Weekend slots are available too." },
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
    hoursDays: "Monday – Sunday",
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
      errors: {
        name: "Please enter your name.",
        email: "Please enter your email address.",
        emailInvalid: "That email address doesn't look valid.",
        phoneInvalid: "That phone number doesn't look valid.",
        language: "Please choose a language.",
        message: "Please write a few words.",
        summary: "The form is incomplete. Please check the highlighted fields.",
        network: "We couldn't send your message just now. Please call us instead.",
        unavailable: "Online messaging isn't available at the moment. Please call us instead.",
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
  },

  people: {
    alt: "Five smiling people side by side against a light background",
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
    backHome: "Back to the home page",
    contactHeading: "A question about your data?",

    privacyLead:
      "This notice describes what this website asks you for, what happens to it, and what you can ask us to do about it.",
    privacyPending:
      "Two things are still missing from this notice, and only the studio can supply them: the company's registration details (IČO, DIČ) and how long we keep messages and orders. Until they are here, this page is kept out of search engines.",

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
          "The site sets no cookies of its own either. The cookie notice has the detail.",
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

    cookiesLead:
      "In short: this site uses no cookies. Below is the one thing your browser does store.",

    cookiesSections: [
      {
        heading: "We use no cookies",
        body: [
          "This site places no cookies in your browser — none of its own and none from third parties. That is also why there is no cookie consent banner: there is nothing to consent to.",
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
