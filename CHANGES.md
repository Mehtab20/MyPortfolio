# 🚀 AI SaaS Starter Kit — Migration Guide

This document details all changes made to convert the portfolio into a complete AI SaaS starter kit, along with steps you need to complete manually.

---

## 📋 What Was Changed

### New Dependencies Installed
- `react-router-dom` — Client-side routing for auth/dashboard pages
- `@stripe/stripe-js` — Stripe payment integration (placeholder ready)
- `recharts` — Analytics charts (bar, line, pie)

### New Files Created

| File | Purpose |
|------|---------|
| `frontend/src/context/ThemeContext.jsx` | Dark/light theme provider |
| `frontend/src/context/AuthContext.jsx` | Supabase auth, user state, RBAC |
| `frontend/src/components/ui/Button.jsx` | Reusable button (primary/outline/ghost/danger) |
| `frontend/src/components/ui/Input.jsx` | Reusable form input & textarea |
| `frontend/src/components/ui/GlassCard.jsx` | Reusable glassmorphic card |
| `frontend/src/components/auth/AuthGuard.jsx` | Protected route wrapper |
| `frontend/src/components/auth/AdminGuard.jsx` | Admin-only route wrapper |
| `frontend/src/components/layout/DashboardLayout.jsx` | Dashboard sidebar + header layout |
| `frontend/src/pages/auth/Login.jsx` | Login page (email/password + Google) |
| `frontend/src/pages/auth/Signup.jsx` | Signup page with email confirmation |
| `frontend/src/pages/auth/ForgotPassword.jsx` | Password reset flow |
| `frontend/src/pages/dashboard/Dashboard.jsx` | User dashboard with stats |
| `frontend/src/pages/dashboard/AiChat.jsx` | AI chat interface |
| `frontend/src/pages/dashboard/Profile.jsx` | User profile management |
| `frontend/src/pages/dashboard/Settings.jsx` | App settings & notifications |
| `frontend/src/pages/dashboard/Subscription.jsx` | Pricing plans & Stripe |
| `frontend/src/pages/admin/AdminDashboard.jsx` | Admin panel |
| `frontend/src/pages/admin/Analytics.jsx` | Analytics with Recharts |
| `frontend/src/pages/Landing.jsx` | Enhanced landing (portfolio + pricing + FAQ + blog + CTA) |
| `frontend/src/api/auth.js` | Profile/role API helpers |
| `frontend/src/api/stripe.js` | Stripe integration stubs |
| `frontend/src/lib/utils.js` | Utility functions |
| `frontend/DOCS.md` | Complete 15-section documentation |
| `CHANGES.md` | This file |

### Files Modified

| File | What Changed |
|------|-------------|
| `frontend/src/App.jsx` | Replaced single-page portfolio with React Router, all new routes |
| `frontend/vite.config.js` | Added `server.host: '0.0.0.0'` for preview |
| `frontend/package.json` | Added react-router-dom, @stripe/stripe-js, recharts |

### Files Preserved (Not Changed)
All existing portfolio components (Navbar, Hero, About, Skills, Projects, Education, Contact, Footer) remain unchanged. The landing page wraps them all.

---

## 🔧 Manual Steps You Must Complete

### Step 1: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and sign in (or create a free account)
2. Create a new project
3. Once created, go to **Project Settings → API**
4. Copy your **Project URL** and **anon public key**

### Step 2: Add Environment Variables

In the Freebuff UI, go to the **Keys/API Keys** tab and add:

| Key | Value |
|-----|-------|
| `VITE_SUPABASE_URL` | `https://your-project-id.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `your-anon-public-key-here` |

### Step 3: Create the Database Tables

Open your Supabase project's **SQL Editor** and run:

```sql
-- User profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role = 'admin'
    )
  );

CREATE POLICY "Admins can update any profile"
  ON profiles FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT id FROM profiles WHERE role = 'admin'
    )
  );

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'full_name',
    'user'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### Step 4: Make Yourself an Admin

After signing up through the app, run this in Supabase SQL Editor:

```sql
UPDATE profiles
SET role = 'admin'
WHERE email = 'your-email@example.com';
```

### Step 5: (Optional) Set Up Stripe

1. Create a [Stripe account](https://stripe.com)
2. Create Products & Prices in Stripe Dashboard
3. Add `VITE_STRIPE_PUBLISHABLE_KEY` to Freebuff API Keys
4. Create a Supabase Edge Function for checkout sessions (see `frontend/DOCS.md`)

### Step 6: (Optional) Connect AI Chat

1. Get an API key from OpenAI, Anthropic, or another provider
2. Update `frontend/src/pages/dashboard/AiChat.jsx` to call the AI API
3. Add the API key as an environment variable

---

## 📝 Route Map

| Path | Page | Description |
|------|------|-------------|
| `/` | Enhanced Portfolio Landing | Portfolio + Pricing + FAQ + Blog + CTA |
| `/login` | Sign In | Email/password + Google OAuth |
| `/signup` | Create Account | Registration with email confirmation |
| `/forgot-password` | Reset Password | Password reset flow |
| `/dashboard` | User Dashboard | Stats, quick actions, activity |
| `/dashboard/chat` | AI Chat | Conversational AI interface |
| `/dashboard/profile` | Profile | Edit name, bio, view account details |
| `/dashboard/settings` | Settings | Notifications, API keys, danger zone |
| `/dashboard/subscription` | Subscription | Pricing plans, upgrade, billing |
| `/admin` | Admin Dashboard | User management, system metrics |
| `/admin/analytics` | Analytics | Charts and usage data |

---

*For full documentation, see `frontend/DOCS.md`*
