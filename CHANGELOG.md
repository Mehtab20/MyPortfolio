# Changelog

## 2026-11-18 — Editorial redesign of the public site (branch `redesign/editorial-portfolio`)

### Added
- New public-site design system in `frontend/src/styles/site.css` (scoped to `.site`; dashboard/admin styling untouched): warm ink/paper palette, single accent (#ff6a3d dark / #d9481c light), Inter + Instrument Serif + JetBrains Mono, 12-column editorial grid, light/dark themes, reduced-motion support.
- `frontend/src/components/site/*`: SiteLayout, SiteNav (scroll-aware, active section, accessible mobile menu), SiteFooter, Hero, Work, About, Toolkit, Journey, Contact, ProjectDiagram (SVG architecture schematics with a mobile layout), hooks.
- Case study pages at `/work/:slug` (MehZu AI, MedRef, Gohar Medical Trust HMS): problem, approach, architecture, engineering decisions, contribution, built vs next.
- `frontend/src/data/site.js`: all public content, written from the project repositories.
- PNG social image (`public/og-image.png`), WebP portrait, updated sitemap.

### Changed
- `Landing.jsx` rebuilt on the new components; `NotFound.jsx` restyled; `/work/:slug` route added in `App.jsx`.
- `index.html`: new title/description/OG tags, fonts, theme-color, and the no-flash theme script now reads the same `portfolio-theme` key as ThemeContext (it read `theme` before, so the saved theme flashed).

### Removed from the public page
- Unverifiable metrics (e.g. "92% accuracy", "500+ daily patients", "35% donor increase", "99.9% uptime"), placeholder blog posts with no articles, hero stat counters, the AI SaaS Starter Kit card, Login/Sign-up buttons in the public nav. Certifications are hidden until confirmed.
- Old landing components (Hero.jsx, Projects.jsx, etc.) are no longer used by the landing page but are left in place.

## 2026-07-24 — Portfolio Refactor: Removed SaaS Template Content

### Removed
- Removed Pricing section (Free/Pro/Enterprise tiers)
- Removed Testimonials section (fake names: Alex Chen, Sarah Johnson, Marcus Williams)
- Removed FAQ section (AI SaaS starter kit questions)
- Removed CTA Banner ("Ready to Build Your AI SaaS?")
- Removed BlogPreview section (generic SaaS blog posts)
- Removed fake SaaS landing content from Landing.jsx
- Cleaned up unused imports (Link, useState) from Landing.jsx

### Updated
- **Hero.jsx**: Updated role titles to reflect authentic identity ("Full-Stack Software Engineer", "AI & Healthcare Systems", "Cloud & DevOps Engineer", "Open Source Contributor")
- **Hero.jsx**: Rewrote tagline to accurately describe specialization (healthcare AI, cloud computing, Flutter, React, FastAPI, DevOps)
- **About.jsx**: Rewrote bio with authentic background (Iqra University Islamabad, specific project types, real career focus)
- **Landing.jsx Blog**: Replaced generic SaaS blog posts with 3 real technical articles based on actual projects (Medical Referral Agent architecture, Gohar Medical Trust case study, AI SaaS Starter Kit lessons)
- **AI_CONTEXT.md**: Rewritten to position as portfolio first, not SaaS starter kit

### Preserved
- All portfolio components (Hero, About, Skills, Projects, CareerJourney, Certifications, Contact, Footer, Navbar)
- All case study data with 4 real projects
- Auth system, dashboard, admin panel — kept as demonstrable skills
- Design system, animations, aurora background
- All SEO/metadata

## 2026-07-24 — Production Readiness Audit

### Fixed
- **vite.config.js**: Merged duplicate `build:` keys — `assetsInlineLimit: 0` was being overwritten by the second build config block
- **Hero.jsx**: Changed "Revenue Saved" stat (₹0) to "Open Source" (10+)
- **src/assets/**: Removed 5 unused placeholder files (project-complaint.png, project-food.png, project-library.png, react.svg, vite.svg, bg-wallpaper.png, hero.png)

### Verified
- ✅ Frontend build passes (zero errors, zero warnings)
- ✅ Supabase connectivity: all 4 tables (profiles, contacts, projects, cv_profile)
- ✅ All 5 project images render correctly (verified via Playwright browser testing)
- ✅ All 10 landing sections present and functional
- ✅ All 12+ routes defined with lazy loading
- ✅ Auth flow (signup, login, Google OAuth, password reset) properly implemented
- ✅ Contact form submits to Supabase contacts table
- ✅ Resume page + PDF at /resume.pdf
- ✅ ErrorBoundary, 404 page, ScrollToTop button

### Known (Low-Risk)
- 2 high-severity npm audit advisories in react-router — affect server-side rendering, not client-side SPA usage. Patched to latest safe version (7.11.0).
- Google OAuth requires Supabase dashboard configuration (provider toggle + redirect URI) — code is ready.
