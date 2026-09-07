# MANHATTAN STUDIO — website

Trilingual (HU / SK / EN) marketing site for MANHATTAN STUDIO, the language school
in Dunajská Streda, built as a statically-generated Next.js app.

**Design direction:** magenta on white and near-black. The accent is `#c2007a`,
lifted to `#e8479f` where it has to sit on ink and dropped to `#fce9f4` for pale
grounds; the dark is `#0b0710` rather than black. One accent, spent deliberately —
prices, the chosen language, a filled progress tick — and everything around it quiet.

**Type** is Poppins throughout, asked for three jobs through three tokens
(`--font-display`, `--font-sans`, `--font-mono`) so a component asks for a voice
rather than a family. `--font-mono` is a misnomer kept on purpose: it is the label
and figure voice, and renaming it would touch every component that sets a label.

**The signature** is the study scene: a long desk of people drawn from primitives,
each figure breathing on its own delay, one head nodding over a page, one hand
tracking a line of writing, and speech bubbles surfacing greetings in the seven
taught languages. It runs along the base of the hero, the figures band and the ink
section.

Sections deliberately avoid the usual shapes. The languages are a list beside a
globe that flies to whichever country is chosen; the level check is fifteen
gap-fill questions whose progress strip is also its scoreboard, ending on a course
you can buy where it is recommended; the price list separates the group courses
from the private-lesson ladder, because they are bought differently; the included
items hang in an alternating column rather than a grid of equal boxes.

The studio's Manhattan photograph runs full-bleed behind the hero, composited over
the magenta with `mix-blend-luminosity` so the picture joins the palette, and drifts
on a slow figure-eight so the frame reads as held from the air rather than still.
English and American landmarks drift faintly behind every section at six per cent.

---

## Getting started

Needs [Node.js 20 or newer](https://nodejs.org) (built on 22) and Git.

```bash
git clone https://github.com/iroistvandaniel7-netizen/Manhattan-studio.git
cd Manhattan-studio
git checkout claude/manhattan-language-studio-site-s4cjha
npm install
cp .env.example .env.local     # optional; the site runs without it
npm run dev                    # http://localhost:3000 → redirects to /hu
```

### In VS Code

Open the folder and accept the two recommended extensions when prompted —
**ESLint** and **Tailwind CSS IntelliSense**. The second is the one that matters
here: it completes and previews the utility classes every component is built from.

`F5` starts the dev server with the debugger attached, so breakpoints work in server
components, route handlers and `src/lib`. The second launch configuration attaches to
the browser for client components — the globe, the level check, the basket.

Format on save is **off** on purpose (`.vscode/settings.json` says why): this code
predates any Prettier config and 41 files differ from Prettier's defaults, so turning
it on would rewrite whole files on first edit and bury real changes in whitespace.
Match the surrounding style by hand, or reformat the repository in one deliberate
commit and switch it on afterwards.

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

## The shop

The price list is a shop: each course and package can be put in a basket, and the
basket is ordered through `POST /api/checkout`.

**The browser sends product ids and quantities. It never sends prices.** Every
amount is recomputed on the server from `src/lib/catalogue.ts`, because a basket
that posts its own figures is a basket a customer can rewrite. Quantities are
clamped and unknown ids are dropped.

```bash
# .env.local
STRIPE_SECRET_KEY=      # sk_live_… — turns on card payment
STRIPE_WEBHOOK_SECRET=  # whsec_… — how a paid order is confirmed
ORDER_WEBHOOK_URL=      # where orders are delivered, paid or not
NEXT_PUBLIC_SITE_URL=   # where Stripe returns the customer
```

Which path runs depends on what is configured, not on a flag:

- **Both Stripe variables set** — the customer goes to Stripe's hosted page and pays
  by card. The line amounts come from the catalogue; the names come from the request
  so the payment page reads in the customer's own language.
- **Neither set** — the order is delivered straight to `ORDER_WEBHOOK_URL` (falling
  back to `CONTACT_WEBHOOK_URL`), the customer is given an order reference, and the
  basket says plainly that payment is arranged with the studio afterwards. It never
  claims a payment it did not take.
- **Only `STRIPE_SECRET_KEY` set** — a half-configured state. Payment works but
  nothing can confirm it, so checkout logs a warning and delivers the order
  immediately marked `paid: false, awaitingPayment: true`. Better than a shop that
  takes money and tells nobody what for. Set the signing secret.

### What confirms an order

Not the customer coming back. `success_url` is a redirect the browser follows, and a
browser can be sent anywhere by anyone; a customer who pays and closes the tab never
follows it at all. So the thank-you page thanks, and **`POST /api/stripe/webhook`**
is what tells the studio an order is real.

That endpoint is the one place on this site where an unauthenticated request makes
the studio act, so it verifies before it does anything: an HMAC-SHA256 signature over
the exact bytes received, compared in constant time, inside a five-minute window so a
captured request cannot be replayed later. Unverified events get a `400` and change
nothing.

Stripe retries until it gets a `200`, so the endpoint answers `200` to events it does
not handle — an error would have Stripe retry forever and eventually disable the
endpoint for the events that matter. Repeat deliveries of the same session are
recognised and dropped; a delivery that fails answers `500` so Stripe retries it.

To connect it: **Dashboard → Developers → Webhooks → Add endpoint**, pointed at
`https://your-site/api/stripe/webhook`, subscribed to `checkout.session.completed`
and `checkout.session.async_payment_succeeded`. Copy the signing secret into
`STRIPE_WEBHOOK_SECRET`.

### A course that has filled up

Add `soldOut: true` to a product's line in `src/lib/catalogue.ts` and that course
closes: the card shows it as full and its buy button becomes an enquiry link, the
level check stops recommending a place in it, the basket refuses to hold it, and
the checkout drops it from any order — including one restored from a basket saved
before it filled. Remove the flag to open it again.

A switch, not a seat count. A count would need somewhere to live, something to
decrement on every payment and something to put back on every refund, and each of
those is a way to sell a ninth place in a group of eight. The studio knows when a
group is full; this is that knowledge written down.

### The customer's confirmation

Optional, and inert until `RESEND_API_KEY` and `ORDER_FROM_EMAIL` are set. When
they are, the customer gets a plain-text email naming the courses, the total and
the reference, in their own language — sent after the order has been delivered to
the studio, and never able to fail the checkout. For paid orders, Stripe's own
receipt (Dashboard → Settings → Customer emails) is the document for the payment;
this one is what names the courses.

### What is not handled


**VAT and invoicing.** Stripe Tax is not configured and the catalogue's figures are
charged as they stand. Whether those figures are gross or net, and whether the studio
needs a Slovak invoicing system behind this, are questions for its accountant — the
site should not decide them.

**Refunds** happen in Stripe's dashboard; nothing here reverses an order.

**Legal review of the terms.** `/[locale]/aszf` now carries real terms of sale —
prices final, the course runs whatever the numbers, packages that never expire,
14-day withdrawal settled pro rata, the nominated complaints address and the
supervisory authority — all of it from what the studio stated or what the code
demonstrably does. What it does not carry is a rule for lessons the studio has to
call off, a notice period for rescheduling a private lesson, or a choice-of-law
clause: the studio has not stated any of those, and an invented term is worse than
a missing one. The page and the two notices stay `noindex`, and out of
`sitemap.ts`, until a lawyer has read them.

### Testing it

`STRIPE_API_BASE` points the checkout at a stand-in, so the whole path — session,
signed webhook, delivery — runs locally without keys. Set it nowhere but a test.
Verify against Stripe's own test keys before taking real money.

Baskets are kept in the browser's own `localStorage`, read through
`useSyncExternalStore` so the server renders an empty basket and the two never
disagree. Storage is treated as untrusted: ids are checked against the catalogue and
quantities clamped on the way back in.

---

## Content provenance

Every fact on the site traces back to MANHATTAN STUDIO's own published information:
the seven languages, the address, phone, email and the Monday–Sunday 09:00–20:00
opening hours, the 10 hours of communication training included with English and
German courses, and the four-student minimum for a group.

Structured facts live in one place, `src/lib/site.ts`:

```ts
BRAND, PHONES, EMAIL, ADDRESS, HOURS, LANGUAGE_CODES, SITE_URL
```

**Prices live in `src/lib/catalogue.ts`** and are the studio's own, given in August
2026 — three group English courses and a ladder of private-lesson packages. That
file is the only place a price is written down: the shop reads it, and so does the
checkout endpoint, which re-prices every order from it rather than trusting what the
browser sends.

Two deliberate absences, both because the studio has not quoted a figure:

1. **Group courses in the other six languages.** The section says to ask at the
   studio rather than showing a number nobody gave. Add them to `GROUP_COURSES`
   when there is a price to add.
2. **Tax.** The prices are shown and charged exactly as given, with no VAT line.
   If the studio has to show tax separately, that belongs in the catalogue and the
   checkout together, not in one of them.

Anything else on the studio's site that isn't here — additional course types,
discounts, teacher profiles, FAQ answers, testimonials — is missing rather than
wrong. It was left out rather than guessed.

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
- The sticky header is transparent only at the top of the home page, a state React
  drives on scroll. Without JavaScript that state can never change, so `globals.css`
  forces the solid treatment whenever the document is missing `data-js` — otherwise
  white type would be left sitting on the white sections below.
- **`prefers-reduced-motion: reduce` disables every animation** — the hero's drift,
  the marquee, the scroll cue — and resolves all scroll reveals to their final state,
  so no content can stay hidden.
- Text contrast was audited against WCAG AA across the palette.
- The speech bubbles spend most of their cycle at opacity 0, so reduced motion pins
  them visible rather than leaving the scene empty.
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
