# Design System — synax.me

> **This file is the single source of truth for all visual decisions.** If you change the
> look of the site, update this file first, then the code. Do not invent tokens in components.

## Concept

Personal portfolio for Ayush. A warm, editorial-dark take on a developer portfolio:
soft serif display type + a quiet grotesque body + mono accents. It should read like a
well-set personal site, not a template.

- **Reference (feel only — do not copy layout/content):** [yashiscool.vercel.app](https://yashiscool.vercel.app)
  — centered narrow content column (max-w ≈ 640px), small/restrained text, generous
  whitespace, subtle hover micro-transitions, minimal chrome.
- **Deliberate differences:** serif display font instead of a single sans; warm amber
  accent instead of a neon green; flat 1px-bordered cards instead of gradient/glassy
  treatments; mono uppercase "eyebrow" labels as the organizing device.

## Fonts

| Role          | Family          | Source                  | Usage                                    |
| ------------- | --------------- | ----------------------- | ---------------------------------------- |
| Display       | Fraunces        | Google Fonts (variable) | Name, page titles, project names. Serif, weight ~500–600, tight leading. Italic allowed for a single emphasized word in the hero. |
| Body / UI     | Geist Sans      | `geist` package         | Everything else (body copy, nav, buttons, form fields). |
| Mono          | Geist Mono      | `geist` package         | Eyebrow labels, tags, meta, small captions. Uppercase + wide tracking for labels. |

Utility classes: `font-display`, `font-sans`, `font-mono` (Tailwind theme aliases).

Rationale: dev portfolios in this space default to one sans + a neon accent. Serif
display + warm amber reads personal and editorial; mono eyebrows give it a technical
anchor. Fraunces optical sizing on.

## Color tokens

Dark by default. **No theme toggle** — it was evaluated and skipped (adds complexity,
no clear value for this site). All tokens live in `src/app/globals.css` as CSS vars.

### Base (dark)

| Token            | Value                              | Notes                            |
| ---------------- | ---------------------------------- | -------------------------------- |
| `--background`   | `#0c0a09` (stone-950)              | Warm near-black page base        |
| `--surface`      | `#131110`                          | Card / widget fill               |
| `--raised`       | `#1c1917` (stone-900)              | Hover fill, active states        |
| `--border`       | `rgba(231 229 228 / 0.08)`         | 1px hairlines only               |
| `--foreground`   | `#e7e5e4` (stone-200)              | Primary text                     |
| `--muted`        | `#a8a29e` (stone-400)              | Secondary text                   |
| `--faint`        | `#78716c` (stone-500)              | Captions, disabled               |

### Accent

| Token               | Value                    | Notes                                        |
| ------------------- | ------------------------ | -------------------------------------------- |
| `--accent`          | `#e8b34b` (warm amber)   | Links, active nav, eyebrows, focus rings     |
| `--accent-hover`    | `#f2c46e`                | Hover of accent elements                     |
| `--accent-soft`     | `rgba(232 179 75 / 0.09)`| Soft tint fills (active nav pill, tag bg)    |
| `--accent-ink`      | `#1c1917`                | Text on accent fills (primary button)        |

**Discipline:** accent is a seasoning, not a paint bucket — links, the active nav item,
the primary CTA, eyebrow labels, focus rings, tiny glyphs. Never large accent fills.

### Semantic (status dots only)

| Token          | Value    | Meaning               |
| -------------- | -------- | --------------------- |
| `--ok`         | `#4ade80`| GitHub / Discord online |
| `--idle`       | `#fbbf24`| Discord idle           |
| `--busy`       | `#f87171`| Discord DND            |
| `--offline`    | `#57534e`| Discord offline        |

## Spacing scale

Base unit **4px**. No custom spacing values outside this scale.

- Section rhythm: 96px desktop / 64px mobile
- Stack gaps: 8 / 12 / 16 / 24 / 32
- Content column: `max-w-[640px]`, horizontal padding `px-5` on mobile, `px-0` at ≥640px
- Widgets row: 3-up at `lg`, 2-up at `sm`, 1-up below; `gap-3`

## Type scale (deliberately restrained)

| Style          | Size / leading      | Weight | Family      | Notes                          |
| -------------- | ------------------- | ------ | ----------- | ------------------------------ |
| Hero name      | clamp(2.5rem, 8vw, 3.25rem) / 1.02 | 500 | Fraunces    | 1–2 words, no decoration      |
| Page title     | 1.75rem / 1.15      | 500    | Fraunces    | H1 on subpages                 |
| Section / card title | 1.0625rem / 1.3 | 600 | Fraunces    | Project names, card titles     |
| Body           | 0.9375rem / 1.7    | 400    | Geist Sans  | Bio, descriptions              |
| Meta           | 0.8125rem / 1.5    | 400    | Geist Sans  | Secondary copy                 |
| Eyebrow        | 0.6875rem, uppercase, tracking 0.16em | 500 | Geist Mono | Widget labels, section labels |
| Tag            | 0.6875rem          | 500    | Geist Mono  | Tech tags                      |

## Radius, borders, elevation

- Radius: 8px cards/buttons, 6px inputs — nothing rounder
- Elevation: flat. 1px borders (`--border`). No drop shadows.
- Card hover: border → `rgba(232 179 75 / 0.35)`, translateY(-1px), 150ms
- Focus visible: 2px accent ring, offset 2px

## Motion tokens

| Transition            | Duration | Easing                       | Properties              |
| --------------------- | -------- | ---------------------------- | ----------------------- |
| Route enter           | 280ms    | `cubic-bezier(0.22,1,0.36,1)`| opacity, y 12→0, blur 6→0 |
| Route exit            | 200ms    | `cubic-bezier(0.22,1,0.36,1)`| opacity→0, y→−8, blur 4 |
| Hover micro (links/cards/buttons) | 150ms | ease-out            | color, border, transform |
| Underline reveal      | 200ms    | ease-out                     | background-size slide-in |
| Stagger (hero stack)  | 60ms/el | —                            | opacity, y               |

**Reduced motion:** when `prefers-reduced-motion: reduce`, disable route transitions
entirely (plain container, no AnimatePresence) and make scroll-to-top instant.

The texts-reveal CSS ships its own `prefers-reduced-motion` guard — lines just
appear, no blur-rise.

### Text reveal — top-of-page entrance (from transitions-dev skill, 18-texts-reveal)

Installed verbatim from the `.agents` transitions-dev skill; markup driven by the
`Reveal` / `RevealLine` components (`src/components/reveal.tsx`), which flip
`.t-stagger.is-shown` on mount. Tokens below live in `globals.css` under `:root`.

| Token | Value | Notes |
| --- | --- | --- |
| `--stagger-dur` | `500ms` | line rise duration |
| `--stagger-distance` | `12px` | rise distance |
| `--stagger-stagger` | `40ms` | per-line offset (≤ 6 lines per stack) |
| `--stagger-blur` | `3px` | entrance blur |
| `--stagger-ease` | `cubic-bezier(0.22, 1, 0.36, 1)` | same curve as route transitions |

**Usage:** hero (home) and the page-title stacks on /projects and /contact only.
Lines start hidden (CSS) and reveal after hydration — don't wrap critical
above-the-fold copy in more than 6 lines.

## Component patterns

- **Nav (persistent):** top bar inside the 640px column. Wordmark left (Fraunces "Ayush"),
  links right. Active link: accent text. Inactive: muted → foreground on hover.
- **Eyebrow labels:** mono uppercase — every widget card and section starts with one.
- **Widget cards (home):** eyebrow label, one-line value, caption below; `min-h` to avoid
  layout shift; fixed width for status dots.
- **Spotlight cards (home "Now building"):** bordered tile with 16:9 cover image
  (`/public/projects/*.png` — swap for real screenshots), mono status eyebrow,
  Fraunces title, tagline, outbound links. Hover: -1px lift + accent border, image
  scales 1.03 (150ms). The tile is the trigger for Ayush's `r-hover-card` — hover
  or keyboard-focus opens a floating image-preview panel with description + links.
- **Stack chips (home, under the hero):** small bordered chips (`rounded-md`,
  `gap-2` row) with a skillicons.dev logo + mono uppercase label. Logos render
  grayscale/80% and colorize on chip hover (150ms) — the only "brand color"
  allowed on the page.
- **GitHub stats card (home, under "Now building"):** contribution calendar from
  Ayush's `contribution-graph.tsx`, inside a bordered `bg-surface` card.
  GitHub-green level ramp (level 0 = muted raised tone), month labels, rolling
  "last year" total + Less/More legend, horizontal scroll auto-pinned to the
  latest week. Entrance: grid fades in, colored blocks pop in level-by-level
  (see `LEVEL_REVEAL_*` in the component) — all disabled under reduced motion.
- **Buttons:** one primary (accent fill, `--accent-ink` text, 8px radius); everything
  else is a ghost/outline link-button.
- **Socials row:** icon-only 32px square buttons, border, hover: accent border + icon
  color. Placeholder links render as muted non-links (visually "coming soon").
- **Project cards:** bordered rows with eyebrow index (`01`…), Fraunces title, tagline,
  description, mono tag row, outbound links. No images — text-only keeps Lighthouse clean.
- **System pages (404 / loading / error):** same eyebrow → Fraunces title → muted
  body stack as the subpage titles, inside the same 640px column, so a failure
  still reads as the site. Primary action uses the accent Button, secondary is an
  outline Button. These deliberately skip `Reveal` — an error or 404 should paint
  immediately, not stagger in. The loading skeleton is `bg-raised` blocks with the
  standard `animate-pulse`, sized to the column so content doesn't reflow on swap.

## Performance rules

- Home spotlight covers are local PNGs (`/public/projects/`), `loading="lazy"`, with
  intrinsic width/height so there's no layout shift. Swap for compressed JPEG/WebP
  screenshots later if wanted.
- All live-data widgets are server components fetching with `next: { revalidate }`.
  The contribution graph is the exception: it fetches client-side (its data source
  is a render-function compound component) and shows a shimmer placeholder at the
  same footprint while loading.
- Skillicons logos load directly from `skillicons.dev` as plain `<img>` (20px,
  lazy) — no next/image remote config needed.
- Client JS is limited to: route transition wrapper, nav active state, Reveal
  (texts-reveal trigger), contact form, hover-card, contribution graph. No state
  library (Zustand skipped — no cross-component client state exists).