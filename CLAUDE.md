# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Next.js dev server
npm run build     # Build to .next/
npm run start     # Run production build locally
npm run lint      # ESLint (next lint config)
```

No test framework is configured.

## Architecture

Single-page Next.js 16 portfolio using the App Router. `app/page.jsx` is a client component (`'use client'`) that imports and renders all OS sections sequentially. Navigation uses anchor links to section IDs (`#mission-control`, `#system-overview`, etc.), not Next.js routing.

**Key config:**
- `jsconfig.json` defines `@/*` path alias pointing to the project root
- `tailwind.config.js` — class-based dark mode; `os-*` colors map to CSS custom properties (e.g. `bg-os-bg` → `background-color: var(--os-bg)`); fonts extend with `font-grotesk` (Space Grotesk) and `font-mono` (JetBrains Mono); accent `#f91460`
- `next.config.mjs` allows remote images from `i.ibb.co`; local project screenshots live in `public/project{1-4}/`
- Vercel deployment via `vercel.json`

**App directory:**
- `app/layout.jsx` — root layout with metadata; loads Space Grotesk (`--font-grotesk`), JetBrains Mono (`--font-mono`), and Poppins (`--font-poppins`) via `next/font/google`; `<Providers>`; theme-init script prevents dark mode flash
- `app/page.jsx` — client component; renders BootSequence (gated by `booted` state + sessionStorage), SystemNav, StatusBar, and the six content sections
- `app/globals.css` — full OS design token system via CSS custom properties on `:root` (light) and `.dark` (dark); glass utility classes (`.os-glass-nav`, `.os-glass-bar`, `.os-glass-overlay`, `.os-glass-drawer`, `.os-glass-btn`); `.os-panel`, `.terminal`, `.terminal-titlebar`, `.label-mono`, `.section-id` utilities
- `app/not-found.jsx` — custom 404 page
- `app/opengraph-image.jsx`, `app/robots.js`, `app/sitemap.js` — SEO assets

## OS Design System

**"RAHYAN-OS" concept:** every section is named as an OS process. Section IDs and nav labels are fixed:

| Section ID         | Component           | Nav Label          |
|--------------------|---------------------|--------------------|
| `mission-control`  | MissionControl.jsx  | MISSION CONTROL    |
| `system-overview`  | SystemOverview.jsx  | SYSTEM OVERVIEW    |
| `skills-matrix`    | SkillsMatrix.jsx    | SKILLS MATRIX      |
| `project-lab`      | ProjectLab.jsx      | PROJECT LAB        |
| `career-log`       | CareerLog.jsx       | CAREER LOG         |
| `open-channel`     | OpenChannel.jsx     | OPEN CHANNEL       |

**CSS token approach:** theme colors live in `globals.css` as CSS custom properties (`--os-bg`, `--os-panel`, `--os-border`, `--os-text`, `--os-text-muted`, `--os-text-dim`, `--os-green`, `--os-cyan`, `--os-violet`, `--os-amber`). Tailwind references them in `tailwind.config.js` via `'os-bg': 'var(--os-bg)'`. **Important:** Tailwind opacity modifiers (`bg-os-bg/50`) do not work on CSS-variable colors. Use hardcoded RGBA arbitrary values for opacity: `bg-[rgba(0,229,107,0.08)]`. The `accent` color (`#f91460`) is a plain hex and supports opacity modifiers normally.

**Typography:** `font-grotesk` for readable content, `font-mono` for all system identifiers, terminal output, and labels.

## OS Chrome Components (`components/`)

- `BootSequence.jsx` — terminal boot animation; runs once per session (sessionStorage key `rahyan-os-booted`); skippable via button or Enter/Escape; calls `onComplete` prop when dismissed
- `SystemNav.jsx` — fixed 208px left sidebar on xl screens with IntersectionObserver active section tracking; mobile: slide-out drawer triggered by hamburger; consumes `useTheme()` from Providers
- `StatusBar.jsx` — fixed 28px bottom bar; uses IntersectionObserver to reflect active section; shows Dhaka location + "Open to Work" status

## Section Components (`components/`)

All section components use Framer Motion (`useInView` for scroll-triggered entry animations) and follow the same structure: `section-id` label → h2 heading → content.

- `MissionControl.jsx` — hero; terminal `$ identify --verbose` block + headline + CTAs; right column: stat grid + active process cards (SkillBridge, SmartRetail AI)
- `SystemOverview.jsx` — about; `$ cat /proc/rahyan/identity` terminal + bio text + operating principles grid + stack layers panel + currently-building card
- `SkillsMatrix.jsx` — skills as interactive stack layers (APPLICATION / SERVICE / DATA / INFRA); below: six expandable expertise domain cards; all data hardcoded at top of file
- `ProjectLab.jsx` — tab-selected project case studies (PRJ-001 to PRJ-004); each shows PROBLEM / SOLUTION / key architecture decisions / challenges / outcome / stack / screenshots; screenshot images from `public/project{n}/{n}.png`
- `CareerLog.jsx` — career as `git log` output; entries have commit hash, type badge (WORK / EDUCATION / CERTIFICATE), and `│`-indented commit log; data hardcoded in `LOG` array
- `OpenChannel.jsx` — three subsections: "What I'm Looking For" cards + code snippet, "Field Reports" testimonials, contact form (EmailJS) + protocol cards; form uses `@emailjs/browser`
- `OsFooter.jsx` — minimal OS footer with GitHub/LinkedIn/Resume links

**Providers.jsx** — exports `ThemeContext` (`useTheme()`) and `LenisContext` (`useLenis()`); dark/light toggle persisted in localStorage; Lenis smooth scroll (1.2s duration).

## Additional Pages

- **`/blog`** — Static listing (`app/blog/page.jsx`); posts in `content/blog/*.mdx` with frontmatter (title, date, description, tags, readTime); processed via `gray-matter`
- **`/blog/[slug]`** — MDX rendered to HTML via `remark` + `remark-gfm` + `remark-html`; styled with `@tailwindcss/typography`
- **`/uses`** — Static tools page (`app/uses/page.jsx`); all content hardcoded
- **`lib/blog.js`** — `getAllPosts()` and `getPost(slug)` helpers

## Environment Variables

EmailJS keys in `.env.local` (gitignored). See `.env.local.example`:
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

## Analytics

Vercel Analytics (`<Analytics />` in `app/layout.jsx`) — no-ops in dev, active on Vercel deployments only.

## Legacy Components

The old section components (`Hero.jsx`, `About.jsx`, `Skills.jsx`, `Expertise.jsx`, `Projects.jsx`, `Qualification.jsx`, `LookingFor.jsx`, `Testimonials.jsx`, `Contact.jsx`, `Header.jsx`, `SectionNav.jsx`, `CommandPalette.jsx`, `Preloader.jsx`, `Footer.jsx`, `CustomCursor.jsx`, `CursorSpotlight.jsx`, `ScrollProgress.jsx`, `ScrollUp.jsx`, `HireMeBar.jsx`, `EasterEgg.jsx`) are still present in `components/` but are **not imported** by `app/page.jsx`. They can be safely deleted or kept for reference.
