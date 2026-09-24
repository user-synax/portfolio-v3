# synax.me — Ayush's portfolio

Personal portfolio for Ayush ([@user-synax](https://github.com/user-synax)),
deployed on [synax.me](https://synax.me).

Stack: **Next.js (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui ·
Framer Motion · Bun**.

## Design

All visual decisions — fonts, color tokens, spacing scale, motion timings —
live in **[design.md](./design.md)**. It is the single source of truth: change
the design there first, then the code.

## Getting started

```bash
bun install
bun run dev       # http://localhost:3000
bun run build     # production build (typechecks)
bun run lint
```

## Configuration

See [.env.example](./.env.example):

- `NEXT_PUBLIC_DISCORD_ID` — enables the Discord status widget on the home
  page via the [Lanyard API](https://lanyard.rest). Unset → widget hidden.
- `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO` — power the contact form.
  The form POSTs to [`src/app/api/contact/route.ts`](./src/app/api/contact/route.ts),
  which validates + sends via [Resend](https://resend.com). Until
  `RESEND_API_KEY` is set the route answers 503 and the form shows a
  friendly "not set up yet" note.

## TODO for Ayush

- [ ] Real repo URLs in [`src/lib/projects.ts`](./src/lib/projects.ts) as repos go public
- [ ] Add a `RESEND_API_KEY` and verify the sending domain in Resend so the
      contact form actually delivers (see `.env.example`)
- [ ] Swap `/api/contact`'s in-process rate limiter for Upstash Ratelimit /
      Vercel KV once it gets traffic (see [`src/lib/rate-limit.ts`](./src/lib/rate-limit.ts)
      — in-process state resets on every cold start)

## Structure

```
src/
  app/                  # routes: /, /projects, /contact (+ root layout)
    not-found.tsx       # 404 — caught by the root layout, on-brand
    loading.tsx         # streaming fallback matching the 640px column
    error.tsx           # route error boundary (retry + back home)
  components/
    site-header.tsx     # persistent nav (stays mounted across routes)
    site-footer.tsx     # persistent footer + socials
    page-transition.tsx # AnimatePresence route transitions (reduced-motion aware)
    widgets/            # server components: GitHub, weather, Discord (Lanyard)
    contact-form.tsx    # validated form → POST /api/contact (Resend)
    github-stats.tsx    # contribution calendar (client-fetched)
    stack-section.tsx   # skillicons.dev stack chips
  app/api/contact/      # Resend route handler (validation, honeypot, rate limit)
  lib/                  # socials, projects data, time helpers, rate limiter
```