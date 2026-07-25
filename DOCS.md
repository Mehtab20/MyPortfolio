# Mehtab Akbar Portfolio — Documentation

## Overview

A premium software engineering portfolio built with React 19, Vite 8, Tailwind CSS 4, and Supabase. Features an animated aurora background, complete auth system, user dashboard, admin panel, AI chat interface, and 4 professional project case studies.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Build | Vite 8 |
| Styling | Tailwind CSS 4 |
| Routing | React Router DOM v7 |
| Animations | Framer Motion + CSS + Canvas |
| Backend/Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (Email/Password + Google OAuth) |
| Charts | Recharts |
| Icons | Inline SVGs |
| Hosting | Vercel |

## Getting Started

### Prerequisites
- Node.js v18+
- npm v9+

### Installation

```bash
cd frontend
npm install
```

### Environment Variables

Create `.env.local` in the `frontend/` directory:

```
VITE_SUPABASE_URL=https://spfsnxfvyvebwcldhknm.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Development

```bash
cd frontend
npm run dev
```

### Production Build

```bash
cd frontend
npm run build
```

The output is in `frontend/dist/` and is ready for deployment.

## Project Structure

```
frontend/
├── public/
│   ├── assets/          # Project images (PNG/SVG)
│   ├── resume.pdf       # Downloadable resume
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
└── src/
    ├── api/             # Supabase API helpers
    ├── assets/          # Static images (profile photo)
    ├── components/
    │   ├── auth/        # AuthGuard, AdminGuard
    │   ├── layout/      # DashboardLayout, PageTransition
    │   ├── ui/          # Button, Input, GlassCard
    │   └── portfolio/   # Hero, About, Skills, Projects, etc.
    ├── context/         # AuthContext, ThemeContext
    ├── data/            # Project case studies
    ├── lib/             # Utilities, hooks, validation
    ├── pages/
    │   ├── auth/        # Login, Signup, ForgotPassword
    │   ├── dashboard/   # Dashboard, AiChat, Profile, Settings
    │   ├── admin/       # AdminDashboard, Analytics
    │   └── Landing.jsx, Resume.jsx, NotFound.jsx
    ├── App.jsx
    ├── main.jsx
    ├── index.css
    └── supabase.js
```

## Routes

| Path | Page | Auth Required |
|------|------|--------------|
| `/` | Portfolio Landing | No |
| `/login` | Sign In | No |
| `/signup` | Create Account | No |
| `/forgot-password` | Reset Password | No |
| `/resume` | Resume Page | No |
| `/dashboard` | User Dashboard | Yes |
| `/dashboard/chat` | AI Chat | Yes |
| `/dashboard/profile` | Profile Settings | Yes |
| `/dashboard/settings` | App Settings | Yes |
| `/dashboard/subscription` | Subscription | Yes |
| `/admin` | Admin Dashboard | Admin |
| `/admin/analytics` | Analytics | Admin |
| `*` | 404 Not Found | No |

## Supabase Database

Tables:
- `profiles` — User profiles (id, email, full_name, avatar_url, bio, role, created_at, updated_at)
- `contacts` — Contact form submissions (id, full_name, email, subject, message, created_at)
- `projects` — Project data (id, title, description, tech, github, image)
- `cv_profile` — CV/profile data (id, name, title, email, phone, location, summary, etc.)

## Design System

- **Primary Color**: Teal (#14b8a6)
- **Background**: Dark (#030712) / Light (#f8fafc)
- **Fonts**: Outfit (sans), Fira Code (mono)
- **Components**: Glassmorphism cards, gradient buttons, scroll-reveal animations

## Deployment

The project is configured for Vercel deployment via `vercel.json`:

```json
{
  "rootDirectory": "frontend",
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

## Known Setup Steps

1. **Google OAuth**: Enable Google provider in Supabase dashboard → Authentication → Providers → Google. Add redirect URI.
2. **Database Tables**: The SQL schema is in `database/schema.sql`. Run in Supabase SQL Editor if recreating.
3. **Environment Variables**: Must be set in Vercel project settings for production.
