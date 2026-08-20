import type { Dictionary } from "./hu";

const en: Dictionary = {
  meta: {
    title: "Manhattan Nyelvstúdió — Language courses in Budapest",
    description:
      "English, German, French, Italian and Spanish courses in small groups at two locations in Budapest. Accredited exam centre. Free placement test and trial lesson.",
    ogAlt: "Manhattan Nyelvstúdió — language courses in Budapest",
    skipToContent: "Skip to content",
  },

  nav: {
    home: "Home",
    languages: "Languages",
    courses: "Courses",
    why: "What's included",
    exams: "Exams",
    contact: "Contact",
    cta: "Apply now",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageLabel: "Choose language",
    backToTop: "Back to top",
  },

  hero: {
    eyebrow: "Budapest · Örs vezér tere and Óbuda",
    title: "Five languages. Small groups.",
    lead: "English, German, French, Italian and Spanish courses from beginner to advanced. An accredited exam centre.",
    cta: "View the courses",
    photoAlt: "The Manhattan skyline at sunset, with the towers of Lower Manhattan.",
    scroll: "Scroll",
  },

  facts: {
    title: "In numbers",
    items: [
      { value: "5", label: "Languages" },
      { value: "6", label: "Exam systems" },
      { value: "2", label: "Budapest locations" },
      { value: "0 €", label: "Placement test" },
    ],
  },

  languages: {
    eyebrow: "Languages",
    title: "What we teach",
    lead: "Every language from beginner to advanced, in small groups.",
    levels: "Beginner to advanced",
    items: [
      { code: "EN", name: "English" },
      { code: "DE", name: "German" },
      { code: "FR", name: "French" },
      { code: "IT", name: "Italian" },
      { code: "ES", name: "Spanish" },
    ],
  },

  courses: {
    eyebrow: "Courses",
    title: "Course formats",
    lead: "The same language, in several formats.",
    items: [
      "General language course",
      "Exam preparation course",
      "Summer intensive course",
      "Conversation tour with a native speaker",
      "Survival language pack for travelling",
      "Junior course",
      "One-to-one tuition",
      "Job interview preparation training",
      "Professional and technical language training",
      "Course for expectant mothers",
      "On-site corporate training",
    ],
  },

  why: {
    eyebrow: "What's included",
    title: "This comes with it",
    items: [
      { title: "Small groups", desc: "You study in groups with a low headcount." },
      { title: "Qualified teachers", desc: "Lessons are led by professionally trained teachers." },
      { title: "Plenty of conversation", desc: "Lessons are built on speaking, in a relaxed atmosphere." },
      { title: "Free placement test", desc: "The placement test costs nothing." },
      { title: "Free trial lesson", desc: "You can sit in on a lesson before enrolling." },
      { title: "Free mock exam", desc: "The mock language exam is free too." },
      { title: "Exam guarantee", desc: "Exam preparation comes with a language exam guarantee." },
      { title: "Free childcare", desc: "We look after your child during morning courses." },
    ],
  },

  exams: {
    eyebrow: "Exams",
    title: "Accredited exam centre",
    lead: "We are an exam centre for the following exam systems.",
  },

  contact: {
    eyebrow: "Contact",
    title: "Get in touch",
    lead: "Call us, or write using the form.",
    locationsTitle: "Locations",
    locations: {
      ors: { name: "Örs vezér tere", note: "Árkád Office Building, 2nd floor" },
      obuda: { name: "Óbuda", note: "Manhattan Nyelvstúdió Buda" },
    },
    openMap: "Map",
    phoneTitle: "Phone",
    faxTitle: "Fax",
    hoursTitle: "Opening hours",
    hours: [
      { d: "Monday – Friday", h: "10:00 – 18:30" },
      { d: "Saturday", h: "09:00 – 12:00" },
      { d: "Sunday", h: "Closed" },
    ],
    form: {
      title: "Send us a message",
      name: "Name",
      namePlaceholder: "Anna Kovács",
      email: "Email",
      emailPlaceholder: "anna@example.com",
      phone: "Phone number",
      phonePlaceholder: "+36 20 123 4567",
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
      "The final legal text for this page is provided by Manhattan Nyelvstúdió. In the meantime, please contact us by phone with any question about data handling.",
  },

  notFound: {
    title: "Page not found",
    lead: "The page you're looking for doesn't exist.",
    cta: "Back to the homepage",
  },
};

export default en;
