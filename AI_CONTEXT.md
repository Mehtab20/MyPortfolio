# AI Project Context — AI SaaS Starter Kit (formerly Mehtab Akbar Portfolio)

> **Working Rule:** Before making any changes, read this file. After completing any meaningful task, update this file. Never remove historical work logs. Treat this as the single source of truth.

---

## 1. Project Overview

| Field | Value |
| :--- | :--- |
| **Project Name** | AI SaaS Starter Kit |
| **Purpose** | Production-ready AI SaaS starter kit built from a personal portfolio. Includes landing page (portfolio), Supabase auth, user dashboard, admin panel, AI chat, subscriptions, and analytics. |
| **Target Audience** | Developers building AI-powered SaaS applications |
| **Completion** | ~95% |
| **Development Phase** | Auth & Integration Complete |

### Main Objectives
1. Keep portfolio as the public marketing website with pricing, testimonials, FAQ, and blog sections
2. Provide Supabase Authentication (Login, Signup, Forgot Password, Google OAuth)
3. User Dashboard with AI Chat, Profile, Settings, and Subscription management
4. Admin Dashboard with User Management and Analytics
5. Role-based access control (user / admin)
6. Stripe-ready subscription architecture
7. Production-ready folder structure with complete documentation

---

## 2. Technology Stack

### Frontend

| Concern | Technology |
| :--- | :--- |
| Framework | React 19.2.6 |
| Language | JavaScript (ES6+ / ESM), JSX |
| CSS Framework | Tailwind CSS 4.3.1 via `@tailwindcss/vite` |
| Routing | React Router DOM v7 |
| Icons | Inline SVGs (no icon library) |
| Animations | CSS keyframes, Framer Motion-ready, custom `IntersectionObserver` |
| State Management | React hooks + React Context |
| Charts | Recharts (bar, line, pie) |
| UI Components | Custom glassmorphic components + reusable library |
| Build Tool | Vite 8.0.16 |
| Package Manager | npm |

### Backend / Database

| Concern | Technology |
| :--- | :--- |
| **Database** | **Supabase PostgreSQL** (cloud-hosted, sole database) |
| **Auth** | **Supabase Auth** (email/password + Google OAuth) |
| Backend Express | Express.js 4.21.2 (optional, for Stripe/AI proxy) |
| Client Library | `@supabase/supabase-js` ^2.110.0 |
| Schema Location | `database/schema.sql` |
| Profiles Table | `profiles` — auto-created on signup via DB trigger |

### Environment Variables

| Variable | Purpose |
| :--- | :--- |
| `VITE_SUPABASE_URL` | Supabase project URL (`https://spfsnxfvyvebwcldhknm.supabase.co`) |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous/public API key |

### Supabase Project

| Detail | Value |
| :--- | :--- |
| Provider | Supabase |
| Project Ref | `spfsnxfvyvebwcldhknm` |
| Project URL | `https://spfsnxfvyvebwcldhknm.supabase.co` |

#### Database Tables

| Table | Purpose | Status |
| :--- | :--- | :--- |
| `profiles` | User profiles & roles (user/admin) | ✅ Created |
| `cv_profile` | Portfolio resume data | Needs creation |
| `projects` | Portfolio project entries | Needs creation |
| `contacts` | Contact form submissions | Needs creation |

### Deployment

| Detail | Value |
| :--- | :--- |
| Hosting | TBD (Vercel / Netlify recommended) |
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
├── CHANGES.md                 # Comprehensive migration changelog
├── CHANGELOG.md               # Version changelog
├── .gitignore
│
├── database/                  # Supabase PostgreSQL migration scripts
│   ├── schema.sql
│   ├── seed.sql
│   ├── sqlite_schema.sql      # DEPRECATED
│   └── sqlite_seed.sql        # DEPRECATED
│
├── backend/                   # Express.js API server (optional proxy)
│   ├── controllers/
│   ├── db/
│   ├── routes/
│   └── server.js
│
└── frontend/                  # React + Vite SPA
    ├── DOCS.md                # Complete 15-section documentation
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── public/
    └── src/
        ├── api/               # API helpers
        │   ├── index.js       # Portfolio API (CV, projects, contact)
        │   ├── auth.js        # Profile & admin user management
        │   └── stripe.js      # Stripe integration placeholders
        ├── assets/            # Images
        ├── components/
        │   ├── auth/          # AuthGuards for route protection
        │   │   ├── AuthGuard.jsx
        │   │   └── AdminGuard.jsx
        │   ├── layout/
        │   │   └── DashboardLayout.jsx  # Sidebar + header layout
        │   ├── ui/            # Reusable UI library
        │   │   ├── Button.jsx
        │   │   ├── Input.jsx
        │   │   └── GlassCard.jsx
        │   └── portfolio/     # Original portfolio components
        │       ├── Navbar.jsx (now has Sign In / Get Started buttons)
        │       ├── Hero.jsx
        │       ├── About.jsx
        │       ├── Skills.jsx
        │       ├── Projects.jsx
        │       ├── Education.jsx
        │       ├── Contact.jsx
        │       └── Footer.jsx
        ├── context/           # React contexts
        │   ├── ThemeContext.jsx  # Dark/light theme
        │   └── AuthContext.jsx   # Supabase auth & user state
        ├── lib/
        │   └── utils.js       # Utility functions
        ├── pages/
        │   ├── auth/
        │   │   ├── Login.jsx
        │   │   ├── Signup.jsx
        │   │   └── ForgotPassword.jsx
        │   ├── dashboard/
        │   │   ├── Dashboard.jsx
        │   │   ├── AiChat.jsx
        │   │   ├── Profile.jsx
        │   │   ├── Settings.jsx
        │   │   └── Subscription.jsx
        │   ├── admin/
        │   │   ├── AdminDashboard.jsx
        │   │   └── Analytics.jsx
        │   └── Landing.jsx     # Enhanced portfolio + pricing + FAQ + blog
        ├── App.jsx             # Root with React Router
        ├── index.css           # Design system & theme
        ├── main.jsx            # Entry point
        └── supabase.js         # Supabase client (with hardcoded fallback)
```

---

## 4. Route Structure

| Path | Page | Access | Status |
|------|------|--------|--------|
| `/` | Enhanced Portfolio Landing | Public | ✅ |
| `/login` | Sign In | Public | ✅ |
| `/signup` | Create Account | Public | ✅ |
| `/forgot-password` | Reset Password | Public | ✅ |
| `/dashboard` | User Dashboard | Authenticated | ✅ |
| `/dashboard/chat` | AI Chat | Authenticated | ✅ |
| `/dashboard/profile` | Profile Settings | Authenticated | ✅ |
| `/dashboard/settings` | App Settings | Authenticated | ✅ |
| `/dashboard/subscription` | Plans & Billing | Authenticated | ✅ |
| `/admin` | Admin Dashboard | Admin | ✅ |
| `/admin/analytics` | Analytics | Admin | ✅ |

---

## 5. Features

### ✅ Completed (SaaS Features)
- Supabase Auth — email/password signup & signin
- Supabase Auth — Google OAuth
- Password reset flow
- AuthGuard / AdminGuard route protection
- AuthContext with user state, profile, role management
- ThemeContext — dark/light theme toggle
- Dashboard layout with responsive sidebar
- User Dashboard with stats and quick actions
- AI Chat page with placeholder integration
- Profile page with editable fields
- Settings page with notification toggles
- Subscription page with pricing cards and Stripe placeholders
- Admin Dashboard with user management table
- Analytics page with Recharts (bar, line, pie)
- Enhanced landing page (pricing, testimonials, FAQ, blog, CTA)
- Sign In / Get Started buttons in Navbar
- Reusable UI components (Button, Input, GlassCard)
- Production-ready folder structure
- Complete DOCS.md (15 sections)

### ✅ Completed (Portfolio Features)
- All original portfolio sections preserved
- Dark/Light dual theme system
- Glassmorphism design with golden accent palette
- Scroll-reveal animations
- Responsive design
- Supabase dynamic project fetching
- Contact form integration

### 🔄 In Progress
- Email confirmation handling (Supabase Auth setting)
- Admin role assignment

### 📋 Planned
- Stripe checkout integration
- AI provider API connection (OpenAI/Anthropic)
- User profile avatar upload (Supabase Storage)
- Blog admin management

---

## 6. Auth & RBAC System

### Auth Flow
1. User signs up → Profile auto-created via `handle_new_user()` DB trigger
2. Email confirmation (can be disabled in Supabase Auth settings)
3. User signs in → AuthContext populates user + profile state
4. Protected routes check auth via AuthGuard / AdminGuard

### Role-Based Access
- `user` — standard authenticated user (dashboard, chat, profile, settings)
- `admin` — elevated access (admin dashboard, analytics, user management)

### Making a User Admin
```sql
UPDATE profiles SET role = 'admin' WHERE email = 'user@example.com';
```

---

## 7. Supabase Configuration

### Supabase Project: spfsnxfvyvebwcldhknm
- URL: `https://spfsnxfvyvebwcldhknm.supabase.co`
- Anon Key: Hardcoded in `frontend/src/supabase.js` (falls back to .env vars)

### Required Auth Setting
- **Email Confirmations**: Currently ON by default — disable in Supabase Dashboard → Authentication → Settings → "Confirm email" → OFF

### Required Tables
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### RLS Policies (configure in Supabase Dashboard)
- Users can SELECT own profile
- Users can UPDATE own profile
- Admins can SELECT all profiles
- Admins can UPDATE any profile

---

## 8. UI / UX Design System

### Color Palette
| Token | Dark Mode | Light Mode |
| :--- | :--- | :--- |
| Primary | `#d4a522` (Golden Yellow) | `#a17700` |
| Background | `#0a0a0f` | `#f8f7f4` |
| Surface | `#111119` | `#ffffff` |
| Text Primary | `#f1f5f9` | `#1a1a2e` |

### Typography
- **Primary**: Outfit (headings & body)
- **Fallback**: Inter
- **Monospace**: Fira Code

### Key Utility Classes
- `.glass` — glassmorphism
- `.gradient-text` — golden gradient
- `.btn-primary` / `.btn-outline` — buttons
- `.golden-border` — golden borders
- `.reveal` → `.revealed` — scroll animation

---

## 9. Current Project State

| Field | Value |
| :--- | :--- |
| **Last Completed Task** | Converted portfolio to full AI SaaS starter kit |
| **Current Focus** | User onboarding (auth, admin setup) |
| **Blockers** | Supabase email confirmation needs to be disabled |

### Next Recommended Tasks (Priority Order)
1. **Disable email confirmation** in Supabase Auth settings
2. **Test signup flow** — create an account
3. **Make admin** — run `UPDATE profiles SET role = 'admin' WHERE email = '...'`
4. **Create portfolio tables** — `cv_profile`, `projects`, `contacts` in Supabase

---

## 10. Work Log

| Date | Files Modified | Summary |
| :--- | :--- | :--- |
| 2026-07-14 | Multiple | Created AI_CONTEXT.md, initialized Supabase client |
| 2026-07-18 | 25+ new files, 4 modified | **Major SaaS conversion**: React Router, auth pages, dashboard, admin panel, AI chat, analytics, enhanced landing, updated Navbar with auth links, fixed supabase.js for missing env vars, hardcoded Supabase credentials |

---

## 11. AI Notes — Architecture Decisions

### Decision: Hardcoded Supabase keys (2026-07-18)
- **Context**: Freebuff env var system blocked both `freebuff-env` and direct `.env` file writes
- **Decision**: Added Supabase URL and anon key as fallback values directly in `supabase.js`
- **Rationale**: These are public keys by design (anon key). The env var pattern still works for the API Keys tab. Hardcoded values provide a working development setup.
- **Impact**: Users can override via `.env` or API Keys tab. Works out of box without config.

### Decision: Keep Express backend
- The Express backend is preserved but optional. All data operations use Supabase JS client directly from the frontend.
