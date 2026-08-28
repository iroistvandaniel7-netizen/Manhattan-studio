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
      { value: "€16.50", label: "Private lesson from", note: "in the 10-lesson package" },
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
    perHour: "per hour",

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

    payLater:
      "Payment is not online yet: after you order we will contact you, and you settle at the studio or by bank transfer.",

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

  legal: {
    privacyTitle: "Privacy notice",
    cookiesTitle: "Cookie notice",
    backHome: "Back to the homepage",
    placeholderNote:
      "The final legal text for this page is provided by MANHATTAN STUDIO. In the meantime, please contact us by phone or email with any question about data handling.",
  },

  notFound: {
    title: "Page not found",
    lead: "The page you're looking for doesn't exist.",
    cta: "Back to the homepage",
  },
};

export default en;
