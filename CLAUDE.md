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

Single-page Next.js 14 portfolio using the App Router. All sections render sequentially on the index route (`app/page.jsx`). Navigation uses anchor links (`#section-id`), not Next.js routing — React Router is gone.

**Key config:**
- `jsconfig.json` defines `@/*` path alias pointing to the project root
- `tailwind.config.js` uses class-based dark mode; custom accent color `#f91460`
- `next.config.mjs` allows remote images from `i.ibb.co`
- Vercel deployment via `vercel.json`

**App directory:**
- `app/layout.jsx` — root layout with metadata, Poppins font, `<Providers>`, icon CDN links (Boxicons, Unicons), and a theme-init script that runs before hydration to prevent dark mode flash
- `app/page.jsx` — imports and renders all 13 section components in order
- `app/globals.css` — Tailwind directives + custom utilities (`.gradient-text`, `.card`, `.glass`, `.section-padding`, `.container-custom`) and keyframes (`shine`, `float`, `blob`)
- `app/opengraph-image.jsx`, `app/robots.js`, `app/sitemap.js` — SEO assets

**Section components** (`components/`):
- `Hero.jsx` — typewriter effect, floating profile image with mouse-follow 3D perspective, social links
- `About.jsx`, `Skills.jsx`, `Qualification.jsx`, `LookingFor.jsx`, `Testimonials.jsx`, `Contact.jsx` — content sections
- `Projects.jsx` — filterable project grid with modal detail view; project data (techStack, features, challenges, snapshots, links) is hardcoded in component state

**UI/UX components:**
- `Providers.jsx` — exports `ThemeContext` (dark/light + localStorage) and `LenisContext` (smooth scroll, 1.2s duration); consumed via `useTheme()` and `useLenis()` hooks
- `Header.jsx` — sticky nav with IntersectionObserver for active section highlighting, mobile menu, theme toggle, CommandPalette trigger
- `CommandPalette.jsx` — Cmd+K palette with fuzzy search and keyboard navigation
- `CustomCursor.jsx`, `CursorSpotlight.jsx`, `ScrollProgress.jsx`, `ScrollUp.jsx`, `HireMeBar.jsx`, `EasterEgg.jsx`, `Preloader.jsx`

**Styling:** Tailwind CSS throughout. No component-scoped CSS files. Custom properties defined via Tailwind theme config. Animation library is Framer Motion.

**External services:**
- EmailJS (`@emailjs/browser`) in `Contact.jsx` — service ID, template ID, and public key are hardcoded in the component; confetti plays on successful submission
- Boxicons 2.1.4 and Unicons 4.0.8 loaded via `<link>` CDN in `app/layout.jsx`

All content (projects, skills, bio, testimonials, qualifications) is static data hardcoded in each component — no API or database.

## Additional pages

- **`/blog`** — Static blog listing (`app/blog/page.jsx`); posts live in `content/blog/*.mdx` with frontmatter (title, date, description, tags, readTime). Rendered with `next-mdx-remote/rsc` + `gray-matter`. All posts are statically generated at build time via `generateStaticParams`.
- **`/blog/[slug]`** — Individual post page (`app/blog/[slug]/page.jsx`). Uses `compileMDX` from `next-mdx-remote/rsc`. Styled with `@tailwindcss/typography` (`prose prose-zinc dark:prose-invert`).
- **`/uses`** — Static tools/stack page (`app/uses/page.jsx`). All content is hardcoded in the file.
- **`lib/blog.js`** — Two helpers: `getAllPosts()` reads all `.mdx` files from `content/blog/`, parses frontmatter, and returns sorted by date. `getRawPost(slug)` returns the raw file string for a given slug.

## Environment variables

EmailJS keys live in `.env.local` (gitignored). See `.env.local.example` for the required variable names:
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

## Analytics

Vercel Analytics is wired up via `<Analytics />` in `app/layout.jsx` (from `@vercel/analytics/react`). Active only on Vercel deployments — no-ops in dev.
