# MANHATTAN STUDIO — website

Trilingual (HU / SK / EN) marketing site for MANHATTAN STUDIO, the language school
in Dunajská Streda, built as a statically-generated Next.js app.

**Design direction:** blue, white and black — nothing else. The blue is `#0039A6`,
the New York subway's A/C/E line blue: a flat, printed blue used as a solid fill,
never as a gradient. Neutrals are biased toward it rather than being pure grey, so
they read as chosen. Sharp corners, hairline rules, flat fills, no shadows.

The supplied Manhattan photograph runs full-bleed behind the hero, desaturated to
luminance and composited over the blue so the picture joins the palette instead of
fighting it. The seven languages are marked with round subway-bullet badges — the only
piece of New York iconography on the page, and it does real work: the code identifies
the language before the name is read.

Every section carries a faint decorative layer — a flag watermark, a pulsing ring or
a dot grid — behind the content at very low opacity, `pointer-events: none` and
`aria-hidden`. The flags are texture only: a flag stands for a country, not a
language, so the subway-bullet code is always what identifies a language.

The second section is the page's motion piece: panning diagonal stripes, a drifting
Union Jack and a pulsing ring, all CSS. It is not a video file — see below.

Type over the photograph and over flat colour carries `text-shadow-strong` /
`text-shadow-lift` so it never depends on the ground behind it.

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

Every fact on the site traces back to MANHATTAN STUDIO's own published information:
the seven languages, the three course formats, the normal-course terms (160 €, 10
weeks, 20 hours, 2 × 60 min per week), the 10 hours of communication training
included with English and German courses, the four-student minimum for a group, the
address, phone, email and the Monday–Sunday 09:00–20:00 opening hours.

Structured facts live in one place, `src/lib/site.ts`:

```ts
BRAND, PHONES, EMAIL, ADDRESS, HOURS, LANGUAGE_CODES, SITE_URL
```

### Read this before launch

**manhattanstudio.sk is blocked by this environment's network policy**, so the site
could not be read directly. The facts above were gathered from the studio's published
listings instead. Two consequences:

1. **Verify the price.** `160 €` for the normal course was reported consistently
   alongside the 10 weeks / 20 hours / 2 × 60 min terms, but it may not apply
   identically to every language. Check it per language before going live.
2. **Reconcile the rest.** Anything on the studio's site that isn't listed above —
   additional course types, discounts, teacher profiles, FAQ answers, testimonials —
   is simply missing here rather than wrong. It was left out rather than guessed.

Nothing on the page is invented. No prices, claims, slogans or testimonials were
written that could not be traced back to the studio.

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
- `LanguageSchool` JSON-LD with the real address, phone, email and opening hours.
- `sitemap.xml` and `robots.txt` generated from the locale list.

---

## Accessibility & motion

- Skip link, one `<h1>` per page, landmarks, and labelled sections.
- Mobile menu traps focus, closes on `Escape`, and locks page scroll.
- Form uses real `<label>`s, `aria-invalid`, `aria-describedby`, a focusable error
  summary, and `role="alert"` messages.
- Focus rings are visible everywhere and invert on blue and photographic grounds.
- **`prefers-reduced-motion: reduce` disables every animation** — the hero's drift,
  the marquee, the scroll cue — and resolves all scroll reveals to their final state,
  so no content can stay hidden.
- Text contrast was audited against WCAG AA across the palette.
- Scroll reveals are progressive: the hidden state is armed by a `data-js` attribute,
  so without JavaScript the full page renders normally.

Animation is hand-rolled (IntersectionObserver + CSS transitions) — no animation
library, so nothing is added to the bundle for it.

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
│   ├── sections/          Hero, Facts, Languages, Courses, Why, Contact,
│   │                      ContactForm
│   ├── ui/                Button, Eyebrow, Reveal, Marquee, NoBreak
│   └── graphics/          Icons
├── i18n/                  config, dictionaries, types
├── lib/site.ts            all studio facts
└── proxy.ts               locale redirect
```

The hero photograph (`public/manhattan-skyline-sunset.jpg`) was supplied by the
client. Confirm the usage rights before going live — it was not sourced or licensed
by this project.

### Using a real video in the second section

The second section's background is animated with CSS rather than a video, because no
video asset could be fetched in the environment this was built in. A CSS background
also costs nothing to download, scales to any width, and stops under
`prefers-reduced-motion` — none of which is true of an autoplaying video.

To swap one in, drop the file into `public/` and replace the decorative block in
`src/components/sections/Facts.tsx` with a `<video>`; the exact markup is written out
in a comment at the top of that file. Keep it muted, looping and low-opacity so the
figures stay legible, and keep the reduced-motion path in mind — an autoplaying video
should be paused when the user has asked for less motion.
