# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

This is a **monorepo** with two deployable projects:

```
protsite/           ← Frontend (Next.js 16) — deployed as one Vercel project
  app/
  components/
  lib/
  backend/          ← Backend (Express + MongoDB) — deployed as a SEPARATE Vercel project
    api/
    src/
```

The backend is deployed by pointing its Vercel project root to `backend/`. The frontend is deployed from the repo root.

**Two separate `package.json` files.** The root `package.json` has its own copies of some backend libs (express 5, mongoose 9, bcryptjs, jsonwebtoken, multer, helmet, cors) — these are unused by the frontend and effectively dead weight. The backend uses **its own** `backend/package.json` (Express 4, Mongoose 8) when deployed and when running `npm run dev` inside `backend/`. Do not assume root deps reflect backend versions.

**`vercel.json` files** — root `vercel.json` configures the Next.js build (`framework: nextjs`, output `.next/`); `backend/vercel.json` rewrites everything to `api/index.js` so the Express app handles all routes as one serverless function.

---

## Commands

### Frontend (run from repo root)
```bash
npm run dev       # Next.js dev server (http://localhost:3000)
npm run build     # Production build to .next/
npm run start     # Run production build locally
npm run lint      # ESLint (next lint config)
npm install       # Install — required after adding @tanstack/react-query and jose
```

### Backend (run from backend/)
```bash
cd backend
npm install
npm run dev       # nodemon api/index.js (http://localhost:4000)
npm run seed      # Bootstrap admin user to MongoDB (run once)
```

No test framework is configured in either project.

---

## Frontend Architecture

Single-page Next.js 16 App Router portfolio. `app/page.jsx` is a `'use client'` component that renders all OS sections sequentially. Navigation uses anchor links to section IDs, not Next.js routing.

**Page composition** — `app/page.jsx` wraps everything in `BootSequence` (gated by `sessionStorage['rahyan-os-booted']` so it only plays on the first visit per tab session), then the OS shell (`SystemNav`, `StatusBar`, `OsFooter`) around the six section components. Shell components are global; sections are stacked inside `<main>` with a `xl:ml-52` sidebar offset.

**Key config:**
- `jsconfig.json` — `@/*` path alias pointing to the project root
- `tailwind.config.js` — class-based dark mode; `os-*` colors backed by CSS custom properties; accent `#f91460`; fonts `font-grotesk` (Space Grotesk) and `font-mono` (JetBrains Mono)
- `next.config.mjs` — allows remote images from `i.ibb.co`

**Critical CSS rule:** Tailwind opacity modifiers (`bg-os-bg/50`) do **not** work on CSS-variable-backed colors. Use hardcoded RGBA arbitrary values: `bg-[rgba(0,229,107,0.08)]`. The `accent` color (`#f91460`) is a plain hex and supports opacity modifiers normally.

**Typography:** `font-grotesk` for readable prose, `font-mono` for all system labels, terminal output, and identifiers.

### Data Layer

`ProjectLab.jsx` is now API-driven. All other sections still use hardcoded data at the top of their files.

- **`lib/api.js`** — central fetch wrapper; reads `rahyan-os-token` from `localStorage` and injects `Authorization: Bearer` on every request; base URL from `NEXT_PUBLIC_API_URL`; exports `api.get/post/put/delete`, `getSignedUploadUrl()`, and `uploadToCloudinary()` (client uploads directly to Cloudinary — no binary passes through the API server)
- **`lib/queryClient.js`** — TanStack Query singleton (`staleTime: 5min`, `retry: 1`, no window-focus refetch)
- **`components/Providers.jsx`** — wraps `QueryClientProvider` around the existing `ThemeContext` + `LenisContext` providers

**`initialData: FALLBACK` pattern** (used in `ProjectLab.jsx`): hardcoded data is passed as `initialData` to `useQuery` so there is zero loading flash. The API data silently replaces it when the fetch completes. Use this pattern for all sections when migrating them to API-driven data.

### Dashboard (`app/dashboard/`)

A full CMS built into the Next.js app, using the same RAHYAN-OS design system.

| Route | Purpose |
|-------|---------|
| `/dashboard/login` | JWT auth; public route |
| `/dashboard` | Overview with live stats |
| `/dashboard/projects` | Full CRUD + Cloudinary image upload |
| `/dashboard/profile` | Bio, headline, openToWork toggle |
| `/dashboard/skills` | API-ready stub |
| `/dashboard/career` | Career log CRUD |

**Auth flow — two storage locations (both required):**
1. `localStorage['rahyan-os-token']` — read by `lib/api.js` to inject `Authorization: Bearer` on every API call
2. Cookie `rahyan-os-token` — set by `app/dashboard/login/page.jsx` via `document.cookie`; read by `middleware.ts` to protect routes at the Edge

**`middleware.ts`** (repo root) — Next.js Edge middleware; uses `jose` (`jwtVerify`) to verify the `rahyan-os-token` cookie. Unauthenticated requests to any `/dashboard/*` route (except `/dashboard/login`) are redirected to the login page. Uses `jose` not `jsonwebtoken` because this runs in the Edge Runtime which cannot load Node.js native modules.

**Logout** must clear both storage locations: `document.cookie = 'rahyan-os-token=; max-age=0'` and `localStorage.removeItem('rahyan-os-token')`.

### Non-Obvious Frontend Architecture

**Theme flash prevention** — two pieces that must stay in sync:
1. Inline `<Script strategy="beforeInteractive">` in `app/layout.jsx` — reads `localStorage.theme`, toggles `.dark` before hydration
2. `Providers.jsx` — reads the same `localStorage.theme` key on mount to reconcile React state

**Lenis smooth scroll** runs globally via `requestAnimationFrame` in `Providers.jsx`. `html { scroll-behavior: auto }` in `globals.css` disables native smooth scroll. No section component calls `useLenis()` directly — they use native `scrollIntoView`.

**Blog MDX pipeline** — `.mdx` files in `content/blog/` are processed as plain Markdown (remark only). JSX components inside posts will render as raw text. `lib/blog.js` is server-only (Node `fs`) and must not be imported in client components.

**Section dot grids** — applied in `globals.css` via direct ID selectors (`#system-overview { background-image: ... }`), not Tailwind classes. `MissionControl` uses the `.os-grid` class directly.

### OS Design System

Every section is an OS process. Section IDs are fixed:

| Section ID        | Component          |
|-------------------|--------------------|
| `mission-control` | MissionControl.jsx |
| `system-overview` | SystemOverview.jsx |
| `skills-matrix`   | SkillsMatrix.jsx   |
| `project-lab`     | ProjectLab.jsx     |
| `career-log`      | CareerLog.jsx      |
| `open-channel`    | OpenChannel.jsx    |

CSS tokens: `--os-bg`, `--os-panel`, `--os-border`, `--os-border-bright`, `--os-text`, `--os-text-muted`, `--os-text-dim`, `--os-green`, `--os-cyan`, `--os-violet`, `--os-amber`. Light/dark variants live in `globals.css` on `:root` and `.dark`. Glass utilities: `.os-glass-nav`, `.os-glass-bar`, `.os-glass-overlay`, `.os-glass-drawer`, `.os-glass-btn`. Panel utilities: `.os-panel`, `.os-panel-hover`, `.terminal`, `.terminal-titlebar`, `.label-mono`, `.section-id`. `.scan-shimmer` — 8s accent-tinted `::after` shimmer used on the hero photo card.

**Image assets in `public/`:**
- `/Code_Generated_Image.jpg` — headshot, used in `MissionControl.jsx` with `priority`
- `/Banner.png` — LinkedIn-style banner (1584×396), used in `SystemOverview.jsx` without `priority`
- `/project{1-4}/{1-5}.png` — project screenshots for `ProjectLab.jsx` fallback data

---

## Backend Architecture (`backend/`)

Express 4 + Mongoose 8 API deployed as a Vercel Serverless Function. CommonJS throughout (`require`/`module.exports`).

```
backend/
├── api/index.js          ← Express app; exports module.exports = app (Vercel entry point)
├── src/
│   ├── config/db.js      ← Mongoose connection with global cache
│   ├── middleware/
│   │   ├── auth.middleware.js    ← JWT Bearer guard (protect)
│   │   └── error.middleware.js   ← Global: ValidationError, CastError, duplicate key (11000)
│   └── modules/
│       ├── auth/         ← login, /me
│       ├── profile/      ← single-document upsert
│       ├── skills/       ← single-document upsert
│       ├── projects/     ← full CRUD
│       ├── careerLog/    ← full CRUD
│       └── upload/       ← Cloudinary signed URL generation only
└── vercel.json           ← catch-all route → api/index.js
```

Each module follows the pattern: `<name>.model.js` → `<name>.controller.js` → `<name>.routes.js`.

**Serverless connection caching** (`src/config/db.js`): uses `global._mongooseCache` to store the Mongoose connection across warm invocations. This is critical — without it, each serverless call opens a new connection and exhausts the MongoDB connection pool. Never remove or bypass this cache.

**Cloudinary upload architecture**: The client calls `POST /api/v1/admin/upload/sign` to get a signed payload, then uploads the file **directly to Cloudinary** from the browser. The API server never receives binary data. This avoids Vercel's 4.5MB serverless body limit.

**Rate limiting caveat**: `express-rate-limit` uses an in-memory store. Each Vercel serverless instance has its own memory, so rate limits apply per-instance, not globally. For global rate limiting at scale, replace with `@upstash/ratelimit` + Upstash Redis.

### API Route Map

| Method | Path | Auth | Notes |
|--------|------|------|-------|
| `GET` | `/api/health` | — | Uptime check |
| `POST` | `/api/v1/auth/login` | — | Returns JWT |
| `GET` | `/api/v1/auth/me` | ✓ | Token verification |
| `GET` | `/api/v1/profile` | — | |
| `PUT` | `/api/v1/profile/admin` | ✓ | Upserts single document |
| `GET` | `/api/v1/skills` | — | |
| `PUT` | `/api/v1/skills/admin` | ✓ | Upserts single document |
| `GET` | `/api/v1/projects` | — | Filtered by `published: true`, sorted by `order` |
| `GET` | `/api/v1/projects/:id` | — | |
| `POST` | `/api/v1/projects/admin` | ✓ | |
| `PUT` | `/api/v1/projects/admin/:id` | ✓ | |
| `DELETE` | `/api/v1/projects/admin/:id` | ✓ | |
| `GET` | `/api/v1/career` | — | Sorted by `order`, then `startDate` desc |
| `POST/PUT/DELETE` | `/api/v1/career/admin/*` | ✓ | |
| `POST` | `/api/v1/admin/upload/sign` | ✓ | Returns Cloudinary signed params |
| `DELETE` | `/api/v1/admin/upload/delete` | ✓ | Deletes by `public_id` |

Protected routes require `Authorization: Bearer <token>` header. The `protect` middleware is in `src/middleware/auth.middleware.js`.

---

## Environment Variables

### Frontend (`.env.local`)
```
NEXT_PUBLIC_API_URL=https://your-backend.vercel.app
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
JWT_SECRET=                          # same value as backend — used by middleware.ts (Edge)
```

### Backend (`backend/.env`)
```
MONGODB_URI=
JWT_SECRET=
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
FRONTEND_URL=https://rahyanakil.vercel.app
```

`JWT_SECRET` must be identical in both `.env.local` (frontend middleware) and `backend/.env` (token signing). If they diverge, `middleware.ts` will reject all dashboard sessions.

---

## Additional Pages

- **`/blog`** — Static listing; posts in `content/blog/*.mdx`; processed via `gray-matter`
- **`/blog/[slug]`** — Markdown via `remark` + `remark-gfm` + `remark-html`; styled with `@tailwindcss/typography`
- **`/uses`** — Static page, all content hardcoded in `app/uses/page.jsx`

---

## Analytics

Vercel Analytics (`<Analytics />` in `app/layout.jsx`) — no-ops in dev, active on Vercel only.

---

## Legacy Components

`components/` contains files from the pre-RAHYAN-OS portfolio that `app/page.jsx` no longer imports — anything not referenced from `app/page.jsx` or the dashboard is dead code. Grep `app/` for an import before assuming a component is wired up; the orphan set includes the old hero/about/skills/projects/contact stack and the old shell (`Header`, `SectionNav`, `Footer`, `Preloader`, `CommandPalette`, custom cursors, scroll utilities, `HireMeBar`, `EasterEgg`).
