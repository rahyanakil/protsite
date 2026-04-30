# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # Build to dist/
npm run preview   # Preview production build
npm run lint      # ESLint (zero max-warnings policy)
```

No test framework is configured.

## Architecture

Single-page React 18 portfolio with Vite. One route (`/`) renders all sections sequentially in `App.jsx`. Navigation uses in-page anchor links, not React Router routes (React Router is only used for the error boundary).

**Section components** (each paired with a `.css` in its own folder):
- `Header` — sticky nav with scroll detection and mobile toggle
- `Home` — hero with TSParticles background; sub-components: `Social`, `Data`, `ScrollDown`
- `About` — expandable description with stats (`Info`)
- `Skills` — frontend/backend skill lists (`FrontEnd`, `BackEnd`)
- `Projects` — project grid with modal detail view; project data is hardcoded in component state
- `Qualification` — education/experience timeline
- `Contact` — EmailJS form + contact cards

**Styling:** Component-scoped CSS files (no CSS-in-JS, no Tailwind). CSS custom properties are used for theming (`--container-color`, etc.).

**External services:**
- EmailJS (`@emailjs/browser`) in `Contact.jsx` — service ID, template ID, and public key are hardcoded in the component.
- Boxicons and Unicons loaded via CDN in `index.html`.

**Particles:** `Particle.jsx` wraps `react-tsparticles` with interactive hover/click modes; rendered inside the `Home` section.

All content (projects, skills, bio) is static data hardcoded directly in the relevant components — there is no API or database.
