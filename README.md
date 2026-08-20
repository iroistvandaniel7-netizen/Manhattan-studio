# Manhattan Nyelvstúdió — website

Trilingual (HU / SK / EN) marketing site for Manhattan Nyelvstúdió, built as a
statically-generated Next.js app.

**Design direction:** editorial, monochrome, New York. Pure black-and-white with a
single micro-accent, oversized Poppins display type, hairline rules, sharp corners,
and hand-drawn Manhattan line-art (skyline, Brooklyn Bridge, street grid) layered
into the backgrounds.

---

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000 → redirects to /hu
```

| Script              | Does                                        |
| ------------------- | ------------------------------------------- |
| `npm run dev`       | Development server                          |
| `npm run build`     | Production build (prerenders all 3 locales) |
| `npm start`         | Serve the production build                  |
| `npm run lint`      | ESLint                                      |
| `npm run typecheck` | `tsc --noEmit`                              |

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 ·
`next/font` (Poppins, `latin` + `latin-ext`).

---

## Contact form delivery

The form validates on the client **and** on the server, then hands the submission to
whatever endpoint you configure:

```bash
# .env.local
CONTACT_WEBHOOK_URL=https://…    # any endpoint accepting a JSON POST
```

The route posts JSON — `name`, `email`, `phone`, `language`, `message`, `locale`,
`receivedAt` — so an email service, a CRM, or a Zapier/Make hook all work.

Behaviour when `CONTACT_WEBHOOK_URL` is **not** set:

- **development** — the submission is logged to the server console and the form
  reports success, so the flow stays testable;
- **production** — the route answers `503` and the form shows the studio's phone
  numbers instead. It deliberately never reports a success it could not deliver.

A hidden honeypot field silently absorbs bot submissions.

---

## Content provenance

Every fact on the site — addresses, phone numbers, fax, opening hours, languages,
course formats, exam systems, and the free placement test / trial lesson / childcare /
exam guarantee claims — comes from Manhattan Nyelvstúdió's own published information.
Nothing was invented. Copy was rewritten to be shorter and more direct, but no claim,
figure, or contact detail was added that could not be verified.

Structured facts live in one place, `src/lib/site.ts`, so they are edited once:

```ts
PHONES, FAX, LOCATIONS, EXAMS, SITE_URL, BRAND
```

### Two things are deliberately not final

1. **No email address.** None could be verified, so none is shown. The form plus two
   phone numbers cover contact. To add one, put it in `src/lib/site.ts` and render it
   in `src/components/sections/Contact.tsx`.

2. **No student testimonials.** No verifiable reviews were available, so rather than
   invent quotes the carousel section (`#method`, "Amiben hiszünk") presents the
   studio's own teaching principles. The component already supports real, attributed
   testimonials — each quote takes an optional `author`:

   ```ts
   // src/i18n/dictionaries/*.ts → method.quotes
   { text: "…", author: "Kovács Anna", role: "Angol B2" }
   ```

   With `author` set the slide renders the attribution line; with `author: null` it
   shows the source label only. No code change needed. Consider renaming the section
   heading (`method.title`) once real reviews are in.

The `/adatvedelem` and `/cookie` pages are intentionally `noindex` and carry no
invented legal text — they state that the final wording comes from the studio.

---

## Translations

`src/i18n/dictionaries/hu.ts` is the source of truth for **shape**. It is exported as
a `Dictionary` type, and `sk.ts` / `en.ts` are typed against it — so a missing or
misspelled key in any locale is a **build error**, not a silent English fallback.

Everything user-visible is translated: headings, body copy, buttons, form labels,
placeholders, validation messages, `aria-label`s, and per-locale SEO metadata.

Adding a locale:

1. add the code to `locales` in `src/i18n/config.ts` (plus `htmlLang`, `localeLabel`,
   `localeName`);
2. add `src/i18n/dictionaries/<code>.ts` typed as `Dictionary`;
3. register it in `src/i18n/index.ts`.

Routing, `hreflang`, the sitemap, and the language switcher all derive from `locales`.

---

## Routing & SEO

- `/hu`, `/sk`, `/en` — all statically prerendered.
- `src/proxy.ts` redirects un-prefixed URLs, honouring `Accept-Language` and falling
  back to Hungarian.
- Per-locale `title`, `description`, canonical, `hreflang` (incl. `x-default`),
  OpenGraph and Twitter tags.
- Generated per-locale OG images (`opengraph-image.tsx`).
- `LanguageSchool` JSON-LD with the real addresses, phones and opening hours.
- `sitemap.xml` and `robots.txt` generated from the locale list.

---

## Accessibility & motion

- Skip link, one `<h1>` per page, landmarks, and labelled sections.
- Mobile menu traps focus, closes on `Escape`, and locks page scroll.
- Form uses real `<label>`s, `aria-invalid`, `aria-describedby`, a focusable error
  summary, and `role="alert"` messages.
- Carousel is keyboard-operable (←/→), swipeable, pauses on hover/focus/tab-away, and
  announces position via `aria-live`.
- Focus rings are visible everywhere and invert on dark sections.
- **`prefers-reduced-motion: reduce` disables every animation** and resolves all
  scroll-reveals to their final state, so no content can stay hidden.
- Scroll reveals are progressive: the hidden state is armed by a `data-js` attribute,
  so without JavaScript the full page renders normally.

Animation is hand-rolled (IntersectionObserver + CSS transitions, `rAF` parallax) —
no animation library, so nothing is added to the bundle for it.

---

## Structure

```
src/
├── app/
│   ├── [locale]/          layout (root), page, legal pages, 404, OG image
│   ├── api/contact/       form endpoint
│   ├── globals.css        design tokens, utilities, reduced-motion rules
│   ├── robots.ts, sitemap.ts
│   └── icon.svg
├── components/
│   ├── layout/            Header, Footer, LanguageSwitcher, LegalPage
│   ├── sections/          Hero, TrustBar, Courses, Benefits, ManhattanSection,
│   │                      Process, Testimonials, CTA, Contact, ContactForm
│   ├── ui/                Button, Eyebrow, Reveal, Parallax, Counter,
│   │                      Marquee, NoBreak
│   └── graphics/          Skyline, BridgeLines, GridMap, Icons
├── i18n/                  config, dictionaries, types
├── lib/site.ts            all studio facts
└── proxy.ts               locale redirect
```

All Manhattan artwork is hand-built SVG in `components/graphics` — no stock imagery
and no third-party assets, so there is nothing to license.
