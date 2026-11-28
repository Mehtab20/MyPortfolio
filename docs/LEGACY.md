# Dormant legacy code

The site began as a SaaS template. Its private areas are **dormant**: the code is kept,
but nothing routes to it and it is not bundled into public pages.

| Area | Files | Depends on |
|---|---|---|
| Auth | `pages/auth/*`, `context/AuthContext.jsx`, `components/auth/*` | Supabase Auth |
| User dashboard | `pages/dashboard/*` (Dashboard, AI Chat, Profile, Settings, Subscription) | Supabase, Stripe placeholder |
| Admin + CMS | `pages/admin/*`, `pages/admin/cms/*`, `hooks/useCmsData.js`, `api/*` | Supabase tables + RLS |
| Old landing | `components/*.jsx` outside `components/site/` | Supabase CMS |

**Supabase is untouched:** the project, its data and the anon key in `src/supabase.js` remain.
The project is currently paused (INACTIVE).

Old URLs (`/login`, `/signup`, `/dashboard/*`, `/admin/*`) now show the 404 page.

To bring an area back: add its routes to `src/App.jsx` and restore `AuthProvider`
(see git history before the Phase 0 commit). Before re-enabling admin, audit the
`profiles` table policies so users cannot grant themselves the admin role.
