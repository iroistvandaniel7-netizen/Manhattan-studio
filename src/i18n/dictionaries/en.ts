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
      { value: "160 €", label: "Normal course", note: "10 weeks, 20 hours" },
      { value: "10", label: "Hours of training free", note: "With English and German courses" },
      { value: "7", label: "Days open", note: "Every day 9:00–20:00" },
    ],
  },

  languages: {
    eyebrow: "Languages",
    title: "What we teach",
    lead: "Seven languages, from beginner to advanced.",
    levels: "Beginner to advanced",
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
    title: "Three tempos",
    lead: "Every language comes in three formats. Choose the one that fits your schedule.",
    formats: [
      { name: "Normal", note: "Twice a week, at a comfortable pace." },
      { name: "Semi-intensive", note: "Faster progress, with a denser timetable." },
      { name: "Intensive", note: "The quickest route to the level you need." },
    ],
    planTitle: "Normal course",
    planPrice: "160 €",
    planRows: [
      { k: "Duration", v: "10 weeks" },
      { k: "Hours", v: "20 hours" },
      { k: "Schedule", v: "2 × 60 minutes per week" },
    ],
    planCta: "I'm interested",
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
