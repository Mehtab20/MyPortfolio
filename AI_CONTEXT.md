# AI Project Context — Mehtab Akbar Portfolio

> **Working Rule:** Before making any changes, read this file. After completing any meaningful task, update this file. Never remove historical work logs. Treat this as the single source of truth.

---

## 1. Project Overview

| Field | Value |
| :--- | :--- |
| **Project Name** | Mehtab Akbar Portfolio |
| **Purpose** | Premium software engineering portfolio showcasing real-world projects in AI/Healthcare, hospital management, SaaS platforms, and full-stack development. Includes Supabase auth, dashboard, admin panel, AI chat, and analytics. |
| **Target Audience** | Tech recruiters, engineering managers, startup founders, collaborators |
| **Completion** | ~98% |

### Main Objectives
1. Showcase 4 flagship projects with professional case studies (Medical Referral Agent, Gohar Medical Trust, AI SaaS Starter Kit, this portfolio)
2. Present an authentic, recruiter-focused professional identity
3. Provide Supabase Authentication (Login, Signup, Forgot Password, Google OAuth)
4. User Dashboard with AI Chat, Profile, Settings
5. Admin Dashboard with CMS (manage all portfolio content from UI) + Analytics
6. Role-based access control (user / admin)
7. Complete Portfolio CMS with Supabase CRUD, image uploads, and live preview

---

## 2. Technology Stack

### Frontend

| Concern | Technology |
| :--- | :--- |
| Framework | React 19 |
| Language | JavaScript (ES6+ / ESM), JSX |
| CSS Framework | Tailwind CSS 4 via `@tailwindcss/vite` |
| Routing | React Router DOM v7 |
| Icons | Inline SVGs (no icon library) |
| Animations | Framer Motion + CSS keyframes + custom `IntersectionObserver` |
| State Management | React hooks + React Context |
| Charts | Recharts (bar, line, pie) |
| UI Components | Custom glassmorphic components + reusable library |
| Build Tool | Vite 8 |
| Package Manager | npm |

### Backend / Database

| Concern | Technology |
| :--- | :--- |
| Database | Supabase PostgreSQL |
| Auth | Supabase Auth (email/password + Google OAuth) |
| Client Library | `@supabase/supabase-js` |

### Environment Variables

| Variable | Purpose |
| :--- | :--- |
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous/public API key |

---

## 3. Folder Structure

```
MyPortfolio/
├── AI_CONTEXT.md              # THIS FILE — persistent AI project memory
├── CHANGES.md
├── CHANGELOG.md
├── .gitignore
├── vercel.json
│
├── database/                  # SQL migration scripts
│   ├── schema.sql
│   ├── seed.sql
│   └── sqlite_*.sql
│
├── backend/                   # Express.js API server (optional)
│   └── ...
│
└── frontend/                  # React + Vite SPA
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── public/
    └── src/
        ├── api/               # API helpers
        ├── assets/            # Images (profile photo, project SVGs)
        ├── components/
        │   ├── auth/          # AuthGuard, AdminGuard
        │   ├── layout/        # DashboardLayout, PageTransition
        │   ├── ui/            # Button, Input, GlassCard
        │   └── portfolio/     # Hero, About, Skills, Projects, CareerJourney, Certifications, Contact, Footer, Navbar
        ├── context/           # ThemeContext, AuthContext
        ├── data/              # projects.js (project data & case studies)
        ├── lib/               # hooks.js, utils.js, validation.js
        ├── pages/
        │   ├── auth/          # Login, Signup, ForgotPassword
        │   ├── dashboard/     # Dashboard, AiChat, Profile, Settings
        │   ├── admin/         # AdminDashboard, Analytics
        │   ├── Landing.jsx    # Portfolio landing (no SaaS sections)
        │   └── NotFound.jsx
        ├── App.jsx
        ├── index.css
        ├── main.jsx
        └── supabase.js
```

---

## 4. Route Structure

| Path | Page | Access |
|------|------|--------|
| `/` | Portfolio Landing | Public |
| `/login` | Sign In | Public |
| `/signup` | Create Account | Public |
| `/forgot-password` | Reset Password | Public |
| `/dashboard` | User Dashboard | Authenticated |
| `/dashboard/chat` | AI Chat | Authenticated |
| `/dashboard/profile` | Profile Settings | Authenticated |
| `/dashboard/settings` | App Settings | Authenticated |
| `/dashboard/subscription` | Plans & Billing | Authenticated |
| `/admin` | Admin Dashboard | Admin |
| `/admin/analytics` | Analytics | Admin |
| `/admin/cms` | Portfolio CMS (Hero, About, Skills, Projects, Blog, Contact, Resume, SEO, Settings, Experience, Certifications) | Admin |
| `*` | 404 Not Found | Public |

---

## 5. Featured Projects

| Project | Type | Status | Tech Stack |
|---------|------|--------|------------|
| **Medical Referral Agent** | AI-Based Diagnostic & Specialist Referral System (FYP) | Final Year Project | Flutter, Python, FastAPI, TensorFlow Lite, PostgreSQL |
| **Gohar Medical Trust** | Hospital & Trust Management System | Production | Flutter, React, Node.js, Express, PostgreSQL, Redis, Twilio |
| **AI SaaS Starter Kit** | Production-Ready SaaS Foundation | Open Source | React 19, Vite 8, Supabase, Stripe, Recharts |
| **Personal Portfolio** | This website — premium dev portfolio | Live | React 19, Vite, Tailwind CSS, Framer Motion, Supabase |

Each project includes a full case study modal with: Problem, Background, Objectives, Features, Architecture, Tech Stack, Development Process, Challenges & Solutions, Results, Future Improvements.

---

## 6. Auth & RBAC System

### Auth Flow
1. User signs up → Profile auto-created via `handle_new_user()` DB trigger
2. User signs in → AuthContext populates user + profile state
3. Protected routes check auth via AuthGuard / AdminGuard

### Role-Based Access
- `user` — standard authenticated user (dashboard, chat, profile, settings)
- `admin` — elevated access (admin dashboard, analytics, user management)

---

## 7. Design System

### Color Palette
| Token | Dark Mode | Light Mode |
| :--- | :--- | :--- |
| Primary | `#14b8a6` (Teal) | `#0d9488` |
| Background | `#030712` | `#f8fafc` |
| Surface | `#0a0f1a` | `#ffffff` |
| Text Primary | `#f3f4f6` | `#111827` |

### Typography
- **Primary**: Outfit (headings & body)
- **Monospace**: Fira Code

### Key UX Upgrades
- Canvas-based aurora background animation (GPU-accelerated)
- Custom animation hooks: typewriter, 3D tilt, count-up, parallax, scroll-reveal
- Premium button micro-interactions (::before overlay, scale on press)
- Full reduced-motion support for accessibility
- Responsive from 320px to 2560px

---

## 8. Work Log

| Date | Summary |
| :--- | :--- |
| 2026-07-14 | Created AI_CONTEXT.md, initialized Supabase |
| 2026-07-18 | SaaS conversion: React Router, auth, dashboard, admin, AI chat, analytics |
| 2026-07-18 | Premium UX: aurora background, animation hooks, redesigned hero |
| 2026-07-18 | AI provider system + SEO + admin CMS |
| 2026-07-18 | Security, validation, code-splitting, performance optimization |
| 2026-07-18 | Portfolio refinement (fawadiqbal.dev style) |
| 2026-07-18 | CTO audit — 18 issues fixed |
| 2026-07-22 | Projects redesign with 4 real projects + case studies |
| 2026-07-22 | UX polish: micro-interactions, scroll effects, loading states |
| **2026-07-24** | **Portfolio refactor: removed SaaS template content (pricing, testimonials, FAQ, fake blog). Updated Hero/About. Replaced generic blog with real technical articles.** |
| **2026-07-24** | **Production readiness audit: Fixed duplicate `build:` key in vite.config.js, removed old placeholder assets, fixed ₹0 stat → Open Source, cleaned src/assets/, verified all images/routes/auth/DB. Updated DOCS.md, CHANGELOG.md. 2 low-risk npm audit vulns noted.** |
| **2026-07-28** | **Built complete Portfolio CMS: 11 database tables with RLS, 10 admin management pages (Hero, About, Skills, Projects, Blog, Contact, Resume, SEO, Settings, Experience, Certifications) with full CRUD, image upload via Supabase Storage, draft/publish workflow. Route at /admin/cms. Build passes 1.08s zero errors.** |
