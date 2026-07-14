# AI Project Context — Mehtab Akbar Portfolio

> **Working Rule:** Before making any changes, read this file. After completing any meaningful task, update this file. Never remove historical work logs. Treat this as the single source of truth.

---

## 1. Project Overview

| Field | Value |
| :--- | :--- |
| **Project Name** | Mehtab Akbar Portfolio |
| **Purpose** | Personal portfolio website displaying developer credentials, education, technical skills, and completed software projects. |
| **Target Audience** | Technical recruiters, hiring managers, software teams, and freelance clients. |
| **Completion** | ~80% |
| **Development Phase** | Supabase Integration & Frontend Dynamic Data Binding |

### Main Objectives
1. Highlight core strengths in Flutter, Cloud Computing, DevOps, and backend engineering.
2. Provide an interactive, responsive contact form that persists messages to Supabase.
3. Dynamically showcase projects & CV data fetched from Supabase PostgreSQL.
4. Dark / Light luxury theme with glassmorphism and golden accent palette.

---

## 2. Technology Stack

### Frontend

| Concern | Technology |
| :--- | :--- |
| Framework | React 19.2.6 |
| Language | JavaScript (ES6+ / ESM), JSX |
| CSS Framework | Tailwind CSS 4.3.1 via `@tailwindcss/vite` |
| Icons | Inline SVGs (no icon library) |
| Animations | CSS keyframes in `index.css`, custom `IntersectionObserver` scroll-reveal in `App.jsx` |
| State Management | React hooks (`useState`, `useCallback`, `useEffect`, `useRef`) |
| Routing | SPA — smooth anchor-scroll navigation (no React Router) |
| Forms | Custom controlled inputs via React state |
| Validation | HTML5 native `required`, `type="email"` |
| Charts | None |
| UI Components | Fully custom glassmorphic components |
| Build Tool | Vite 8.0.12 |
| Package Manager | npm |

### Backend / BaaS

| Concern | Technology |
| :--- | :--- |
| **Database** | **Supabase PostgreSQL** (cloud-hosted, sole database) |
| Backend Framework | Express.js 4.21.2 — optional REST proxy; primary data access is via Supabase JS client |
| Runtime | Node.js (ESM) |
| REST Endpoints | `/api/cv`, `/api/projects`, `/api/message` (Express) — **to be migrated to Supabase direct queries from frontend** |
| Auth | None (Supabase anon key for public reads/inserts) |
| ORM | None — Supabase JS client (`@supabase/supabase-js` v2) for frontend, raw SQL for Supabase migrations |
| Storage | Supabase Storage (planned) / local `assets/` directory currently |
| Email Service | None (N8N webhook trigger stubbed in `messageController.js`) |

### Database — Supabase PostgreSQL (Single Source of Truth)

| Detail | Value |
| :--- | :--- |
| Provider | Supabase |
| Project URL | `https://sizhxbwnjxtextnkyvlr.supabase.co` |
| Database Engine | PostgreSQL (Supabase managed) |
| Client Library | `@supabase/supabase-js` ^2.110.0 |
| Schema Location | `database/schema.sql` (PostgreSQL DDL) |
| Seed Data | `database/seed.sql` (PostgreSQL INSERT) |

#### Tables

| Table | Columns | Purpose |
| :--- | :--- | :--- |
| `cv_profile` | `id SERIAL PK`, `name`, `title`, `email`, `phone`, `location`, `portfolio`, `linkedin`, `github`, `summary` | Single-row profile / resume data |
| `projects` | `id SERIAL PK`, `title`, `description`, `tech TEXT[]`, `github` | Portfolio project entries |
| `messages` | `id SERIAL PK`, `name`, `email`, `message`, `created_at TIMESTAMP` | Contact form submissions |
| `contacts` | `full_name`, `email`, `subject`, `message` | Contact form submissions via Supabase client (referenced in `api/index.js`) |

> **Note:** The `contacts` table is referenced in the frontend Supabase client code (`api/index.js`). The `messages` table is referenced in the Express backend (`messageController.js`). These should be unified into a single table. Decision pending — see §15 AI Notes.

### Environment Variables

| Variable | Location | Purpose |
| :--- | :--- | :--- |
| `VITE_SUPABASE_URL` | `frontend/.env` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | `frontend/.env` | Supabase anonymous/public API key |
| `PORT` | `backend/.env` | Express server port (default `5000`) |

> **Important:** No SQLite is used. The backend `.env.example` still contains legacy PostgreSQL connection params (`DB_USER`, `DB_HOST`, etc.) from an earlier design. These are unused — the active database connection is exclusively via the Supabase JS client in the frontend.

### Deployment

| Detail | Value |
| :--- | :--- |
| Hosting | TBD |
| Domain | TBD |
| Build Command | `npm run build` (Vite) |
| Output Directory | `frontend/dist` |

### Version Control

| Detail | Value |
| :--- | :--- |
| Git Provider | GitHub — `Mehtab20/MyPortfolio` |
| Branch Strategy | Direct main branch commits |

---

## 3. Folder Structure

```
MyPortfolio/
├── AI_CONTEXT.md              # THIS FILE — persistent AI project memory
├── .git/                      # Git version control
├── .gitignore                 # Ignored files
│
├── database/                  # Supabase PostgreSQL migration scripts
│   ├── schema.sql             # PostgreSQL DDL (CREATE TABLE)
│   ├── seed.sql               # PostgreSQL seed data (INSERT)
│   ├── sqlite_schema.sql      # DEPRECATED — SQLite schema (to be removed)
│   └── sqlite_seed.sql        # DEPRECATED — SQLite seed (to be removed)
│
├── backend/                   # Express.js API server (optional proxy layer)
│   ├── controllers/
│   │   ├── cvController.js       # GET /api/cv — returns cv_profile row
│   │   ├── messageController.js  # POST /api/message — inserts into messages
│   │   └── projectController.js  # GET /api/projects — returns all projects
│   ├── db/
│   │   └── index.js              # DB pool wrapper (currently SQLite — TO BE REPLACED with Supabase or removed)
│   ├── routes/
│   │   └── api.js                # Express router (/api/cv, /api/projects, /api/message)
│   ├── package.json
│   ├── portfolio.sqlite       # DEPRECATED — to be deleted
│   └── server.js              # Express entry point
│
└── frontend/                  # React + Vite SPA
    ├── .env                   # VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
    ├── index.html             # HTML shell with SEO meta tags & Google Fonts
    ├── package.json
    ├── vite.config.js
    ├── public/                # Static assets (favicon)
    ├── dist/                  # Production build output
    └── src/
        ├── main.jsx           # React DOM bootstrap
        ├── App.jsx            # Root component — theme state, scroll-reveal, layout
        ├── index.css          # Design system — Tailwind theme, custom utilities, keyframes
        ├── supabase.js        # Supabase client initialization
        ├── api/
        │   └── index.js       # API helpers — fetchCV, fetchProjects, submitContactMessage
        ├── assets/            # Images — profile photo, project screenshots, bg wallpaper
        └── components/
            ├── Navbar.jsx     # Fixed top nav, active section tracking, theme toggle
            ├── Hero.jsx       # Landing section — name, titles, CTA buttons, profile photo
            ├── About.jsx      # Bio text & stats grid
            ├── Skills.jsx     # Tabbed skill categories with animated progress bars
            ├── Projects.jsx   # Project cards grid (currently hardcoded data)
            ├── Education.jsx  # Degree info & coursework list
            ├── Contact.jsx    # Contact info cards + message form
            └── Footer.jsx     # Footer with links, expertise, newsletter form
```

---

## 4. Component Inventory

| Component | Purpose | Status | Key Dependencies | Notes | Next Steps |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [App.jsx](file:///d:/BSSE-36101/9th%20semester/MyPortfolio/frontend/src/App.jsx) | Root shell — theme state (dark/light via `data-theme`), `ScrollToTop` button, `useScrollReveal` hook, background wallpaper overlay | ✅ Done | All components, `bg-wallpaper.png` | Theme persisted to `localStorage` | — |
| [Navbar.jsx](file:///d:/BSSE-36101/9th%20semester/MyPortfolio/frontend/src/components/Navbar.jsx) | Fixed nav — scroll shadow, active section highlight, mobile hamburger, theme toggle, "Download Resume" link | ✅ Done | React | Glass effect on scroll | Download Resume link is `#` placeholder |
| [Hero.jsx](file:///d:/BSSE-36101/9th%20semester/MyPortfolio/frontend/src/components/Hero.jsx) | Full-height landing — greeting, name, subtitle, description, CTA buttons, profile photo with golden ring | ✅ Done | `profile-photo.png` | Staggered fade-in-up animations | Consider typing animation for subtitle |
| [About.jsx](file:///d:/BSSE-36101/9th%20semester/MyPortfolio/frontend/src/components/About.jsx) | Bio paragraph + 4 stat cards (CGPA, Cloud & DevOps, Projects count, JS stack) | ✅ Done | — | Cards hover-lift with golden underline | Could fetch stats dynamically from Supabase |
| [Skills.jsx](file:///d:/BSSE-36101/9th%20semester/MyPortfolio/frontend/src/components/Skills.jsx) | 5 category tabs (Languages, Frameworks, DBs, DevOps, AI/ML) with animated progress bars | ✅ Done | React, `IntersectionObserver` | Progress bars animate on viewport entry & tab switch | Could load skill data from Supabase |
| [Projects.jsx](file:///d:/BSSE-36101/9th%20semester/MyPortfolio/frontend/src/components/Projects.jsx) | Lists portfolio works inside cards with GitHub/demo links and badge labels. | ✅ Done | React, `api/index.js`, custom project image assets | Fetches projects dynamically from Supabase database; falls back to static projects list. | — |
| [Education.jsx](file:///d:/BSSE-36101/9th%20semester/MyPortfolio/frontend/src/components/Education.jsx) | BSE degree card with institution, date range, coursework list | ✅ Done | None | Single education entry | Could support multiple entries from DB |
| [Contact.jsx](file:///d:/BSSE-36101/9th%20semester/MyPortfolio/frontend/src/components/Contact.jsx) | 6 contact-info cards + 4-field form (name, email, subject, message) | ✅ Done | React, `api/index.js` | Submits message to the unified `contacts` table on Supabase PostgreSQL. | — |
| [Footer.jsx](file:///d:/BSSE-36101/9th%20semester/MyPortfolio/frontend/src/components/Footer.jsx) | 4-column footer — branding, quick links, expertise list, newsletter form | ✅ Done | — | Newsletter form is non-functional (no backend) | Hook up newsletter or remove |

---

## 5. Features

### ✅ Completed
- Dark / Light dual theme system via `data-theme` attribute on `<html>`
- Luxury dark charcoal + golden accent design palette with glassmorphism
- Scroll-reveal animations (IntersectionObserver-based)
- Responsive design (mobile hamburger menu, grid breakpoints)
- SEO meta tags in `index.html` (description, keywords, author, title)
- Google Fonts integration (Outfit, Inter, Fira Code)
- Custom scrollbar styling
- Express.js REST API with 3 endpoints (cv, projects, message)
- PostgreSQL schema & seed scripts for Supabase
- Supabase JS client initialization (`supabase.js`)
- Frontend API client layer (`api/index.js`) connecting to Supabase PostgreSQL tables
- Dynamic project fetching and mapping inside `Projects.jsx`
- Contact form integration directly with the unified `contacts` table

### 🔄 In Progress
- Final validation and testing of Supabase API triggers

### 📋 Planned
- Download Resume functionality (PDF upload to Supabase Storage)
- N8N webhook notification on new contact messages
- Newsletter subscription backend
- Lighthouse performance optimization pass

### 💡 Future Ideas
- Blog / articles section
- Testimonials section
- Admin dashboard for managing projects/content
- Analytics integration
- PWA support

---

## 6. UI / UX Design System

### Color Palette

| Token | Dark Mode | Light Mode |
| :--- | :--- | :--- |
| Primary | `#d4a522` (Golden Yellow) | `#a17700` (Dark Gold — WCAG AA) |
| Primary Light | `#e8b92e` | `#b8860b` |
| Primary Dark | `#b8901a` | `#7a5a00` |
| Background | `#0a0a0f` | `#f8f7f4` |
| Surface | `#111119` | `#ffffff` |
| Surface Light | `#1a1a2e` | `#f1f0ed` |
| Surface Card | `#16162a` | `#ffffff` |
| Text Primary | `#f1f5f9` | `#1a1a2e` |
| Text Secondary | `#94a3b8` | `#4a4a5a` |
| Text Muted | `#64748b` | `#7a7a8a` |
| Border | `rgba(212,165,34,0.12)` | `rgba(161,119,0,0.18)` |
| Overlay | `rgba(10,10,15,0.82)` | `rgba(248,247,244,0.78)` |

### Typography
- **Primary Font**: Outfit (headings & body)
- **Secondary Font**: Inter (fallback)
- **Monospace**: Fira Code (skill percentages)
- **Weights**: 300–900

### Spacing & Layout
- Section padding: `py-24 sm:py-32`
- Max content width: `max-w-6xl` (1152px)
- Card padding: `p-5 sm:p-6`
- Grid gaps: `gap-4 sm:gap-6`

### Border Radius
- Cards: `rounded-2xl` (16px)
- Buttons: `rounded-xl` (12px)
- Inputs: `rounded-xl` (12px)
- Badges: `rounded-full`

### Shadows & Effects
- `.glass` — `blur(16px)` backdrop, border, semi-transparent bg
- `.glass-strong` — `blur(24px)` backdrop, stronger opacity
- `.glow-sm` / `.glow-md` — golden box-shadow glow
- `.golden-border-hover` — border color intensifies on hover

### Button Styles
- `.btn-primary` — golden gradient bg, dark text, hover lift + shadow
- `.btn-outline` — transparent bg, golden border, hover fill + lift

### Animations
- `float` — 6s ease-in-out translateY loop
- `pulse-glow` — 4s opacity breathing
- `fade-in-up` — 0.8s entry with stagger delays (0.1–0.4s)
- `.reveal` → `.revealed` — IntersectionObserver scroll transition (translateY 40px → 0)
- `.progress-fill` — 1.2s width transition

### Responsive Breakpoints
- `sm`: 640px
- `md`: 768px (mobile menu breakpoint)
- `lg`: 1024px

### Accessibility
- `aria-label` on all interactive elements
- `role="navigation"` on navbar
- `role="contentinfo"` on footer
- Keyboard-accessible theme toggle

---

## 7. Coding Standards

| Area | Convention |
| :--- | :--- |
| Component files | PascalCase (`Navbar.jsx`) |
| Helper functions | camelCase (`toggleTheme`, `handleScroll`) |
| CSS classes | kebab-case (`btn-outline`, `gradient-text`, `card-surface`) |
| Component structure | Functional components only |
| Hooks | Explicit dependency arrays in `useEffect`, `useCallback` |
| Styling | Tailwind utilities + CSS custom properties via `var(--theme-*)` |
| Database queries | Supabase JS client (`.from().select()`, `.insert()`) — no raw SQL from frontend |
| Comments | Block comments for section dividers (`/* ── Section ── */`) |
| Error handling | try/catch with `console.error` + user-facing error state |

---

## 8. Performance

| Area | Status |
| :--- | :--- |
| Lighthouse Score | Not yet measured |
| Image Loading | `loading="lazy"` on project images; `loading="eager"` on hero profile photo |
| Font Loading | `preconnect` to `fonts.googleapis.com` and `fonts.gstatic.com` |
| Code Splitting | Default Vite chunk splitting (no manual splits yet) |
| Bundle Size | Not yet optimized — single-page, no tree-shaking review done |

---

## 9. Security

| Area | Implementation |
| :--- | :--- |
| Database Access | Supabase Row Level Security (RLS) — **must be configured on Supabase dashboard** |
| API Keys | `VITE_SUPABASE_ANON_KEY` exposed to client (acceptable — anon key is public by design; RLS enforces access) |
| XSS Protection | React's default JSX escaping; no `dangerouslySetInnerHTML` usage |
| Credentials | `.env` files are in `.gitignore` |
| CORS | Express uses `cors()` middleware (wide open — tighten for production) |

---

## 10. SEO

| Element | Status |
| :--- | :--- |
| `<title>` | ✅ `Mehtab Akbar \| Software Engineer` |
| `<meta description>` | ✅ Present |
| `<meta keywords>` | ✅ Present |
| `<meta author>` | ✅ Present |
| Open Graph tags | ❌ Missing |
| Twitter Card tags | ❌ Missing |
| Structured data (JSON-LD) | ❌ Missing |
| Sitemap | ❌ N/A (SPA) |
| `robots.txt` | ❌ Missing |
| Canonical URL | ❌ Missing |
| Semantic HTML | ✅ `<section>`, `<nav>`, `<main>`, `<footer>` with aria labels |
| Single `<h1>` | ✅ Hero section only |

---

## 11. Known Bugs

| # | Bug | Severity | Status | Fix |
| :--- | :--- | :--- | :--- | :--- |
| 1 | **`supabase.js` is empty** | 🔴 High | ✅ Fixed | Initialized Supabase client with Vite env vars. |
| 2 | **`fetchCV()` returns `null`** | 🟡 Medium | ✅ Fixed | Implemented dynamic fetch using Supabase client. |
| 3 | **`fetchProjects()` returns `[]`** | 🟡 Medium | ✅ Fixed | Implemented dynamic fetch from `projects` table using Supabase client. |
| 4 | **Contact form references mismatched `contacts` vs `messages` tables** | 🟡 Medium | ✅ Fixed | Unified all schemas, helpers, and controllers under a single `contacts` table schema. |
| 5 | **Download Resume link is `href="#"`** — no actual PDF available. | 🟢 Low | Open | Upload resume PDF to Supabase Storage and link to public URL. |
| 6 | **Newsletter form is non-functional** — `onSubmit` only calls `e.preventDefault()`. | 🟢 Low | Open | Implement or remove. |

---

## 12. Technical Debt

| Item | Description | Priority |
| :--- | :--- | :--- |
| Remove SQLite artifacts | Delete `database/sqlite_schema.sql`, `database/sqlite_seed.sql`, `backend/portfolio.sqlite`, and refactor `backend/db/index.js` to remove SQLite imports. | High |
| Unify contact table naming | `api/index.js` references `contacts` table; Express controller references `messages` table. Pick one. | ✅ Resolved |
| Clean backend `.env.example` | Remove legacy `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`, `DB_NAME` variables that are no longer used. | Medium |
| Decide Express vs. Supabase-only | The Express backend duplicates what Supabase client can do directly. Either remove Express entirely (frontend-only architecture) or use Express as a Supabase proxy with server-side `service_role` key for admin operations. | Medium |
| Projects.jsx uses hardcoded data | Replace static `projects` array with dynamic Supabase fetch. | ✅ Resolved |
| Remove unused npm packages | `pg`, `sqlite`, `sqlite3` in backend `package.json` are unused if going Supabase-only. | Low |

---

## 13. Work Log

| Date | Files Modified | Summary | Reason | Outcome |
| :--- | :--- | :--- | :--- | :--- |
| 2026-07-14 | `AI_CONTEXT.md` | Created initial AI_CONTEXT.md | Establish persistent AI memory for project continuity. | Document created with full audit of codebase. |
| 2026-07-14 | `AI_CONTEXT.md` | **Major rewrite** — declared Supabase PostgreSQL as the sole database. Removed all SQLite-as-primary references. Updated every section. | User directive: "Supabase PostgreSQL only". | Document now accurately reflects architecture: Supabase is the single DB, SQLite files are marked DEPRECATED. |
| 2026-07-14 | `supabase.js`, `api/index.js`, `schema.sql`, `sqlite_schema.sql`, `messageController.js`, `Projects.jsx`, `CHANGELOG.md` | Initialized Supabase client, unified schemas to use `contacts` table, implemented API helpers, updated message controllers, connected Projects component dynamically, and created CHANGELOG.md. | Connect frontend/backend systems to PostgreSQL Supabase directly and resolve mismatched table schema naming conflicts. | The frontend can now pull projects dynamically from Supabase database and post user requests directly to the unified contacts schema. |

---

## 14. Current Project State

| Field | Value |
| :--- | :--- |
| **Last Completed Task** | Unified database schema, initialized Supabase client, and bound UI components dynamically. |
| **Current Focus** | Deployment setup, testing RLS rules, and clean up. |
| **Blockers** | None |

### Next Recommended Tasks (Priority Order)

1. **Delete deprecated SQLite files** — `sqlite_schema.sql`, `sqlite_seed.sql`, `portfolio.sqlite` and backend SQLite dependencies (`sqlite`, `sqlite3` from package.json) to complete the database transition.
2. **Test / Set up Row Level Security (RLS) policies** on the Supabase console.
3. **Configure resume download functionality** by uploading the resume PDF to Supabase Storage and linking the asset.

### Files To Edit Next
- [package.json](file:///d:/BSSE-36101/9th%20semester/MyPortfolio/backend/package.json) — clean up unused packages
- [Navbar.jsx](file:///d:/BSSE-36101/9th%20semester/MyPortfolio/frontend/src/components/Navbar.jsx) — update CV/Resume download links

---

## 15. AI Notes — Architecture Decisions & Rationale

### Decision: Supabase PostgreSQL as sole database (2026-07-14)
- **Context**: Project had a hybrid setup — SQLite locally via Express backend, Supabase credentials in frontend `.env`, and `@supabase/supabase-js` in `package.json`.
- **Decision**: User directed that all database operations go through **Supabase PostgreSQL only**. No SQLite.
- **Rationale**: Supabase provides hosted Postgres, auto-generated REST APIs, auth, storage, and real-time — eliminating the need for a separate Express+SQLite backend for basic CRUD.
- **Impact**: Express backend becomes optional (can be kept as a proxy for server-side operations or removed entirely). All frontend data operations should use the Supabase JS client directly.

### Decision: Keep Express backend for now
- **Rationale**: The Express layer is already built and could serve as a proxy for operations requiring the `service_role` key (admin-only mutations, webhook triggers). It can be removed later once all operations are confirmed working via Supabase client.

### Assumption: Supabase RLS policies
- The anon key is safe to expose in the frontend. **Row Level Security (RLS) must be properly configured** on each Supabase table to prevent unauthorized access. Currently assumed:
  - `cv_profile` — public `SELECT` allowed
  - `projects` — public `SELECT` allowed
  - `contacts` / `messages` — public `INSERT` allowed, `SELECT` restricted

### Design Pattern: Theme system
- Theme is managed via `data-theme` attribute on `<html>`, not Tailwind's `dark:` prefix. This allows full CSS variable control and smooth transitions on all themed properties simultaneously.

### Design Pattern: Overlay architecture
- Background wallpaper is a fixed full-screen `<img>` with a theme-colored overlay div on top. This avoids re-rendering the image on theme switch — only the overlay color transitions.
