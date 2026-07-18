# 🤖 AI SaaS Starter Kit — Documentation

A complete, production-ready AI SaaS starter kit built with React 19, Vite 8, Tailwind CSS 4, and Supabase. Includes authentication, AI chat, subscription management, admin dashboard, analytics, and more.

---

## 📋 Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Folder Structure](#2-folder-structure)
3. [Getting Started](#3-getting-started)
4. [Environment Variables](#4-environment-variables)
5. [Supabase Setup](#5-supabase-setup)
6. [Authentication](#6-authentication)
7. [Routing & Pages](#7-routing--pages)
8. [Role-Based Access Control](#8-role-based-access-control)
9. [AI Chat Integration](#9-ai-chat-integration)
10. [Stripe Subscription](#10-stripe-subscription)
11. [Database Schema](#11-database-schema)
12. [Component Library](#12-component-library)
13. [Styling & Theme](#13-styling--theme)
14. [Deployment](#14-deployment)
15. [API Architecture](#15-api-architecture)

---

## 1. Architecture Overview

```
┌─────────────────────────────────────────────┐
│                  Browser                      │
├─────────────────────────────────────────────┤
│            React 19 SPA (Vite)              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ Portfolio │  │   Auth   │  │ Dashboard│  │
│  │  Landing  │  │  Pages   │  │  Pages   │  │
│  └──────────┘  └──────────┘  └──────────┘  │
│         │            │            │         │
│         ▼            ▼            ▼         │
│  ┌──────────────────────────────────────┐   │
│  │         Supabase JS Client           │   │
│  │   Auth │ Database │ Storage │ RLS   │   │
│  └──────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

**Key Technologies:**
- **React 19** — UI framework
- **Vite 8** — Build tool & dev server
- **Tailwind CSS 4** — Utility-first CSS
- **Supabase** — Auth, Database, and Backend
- **React Router 7** — Client-side routing
- **Recharts** — Analytics charts
- **Stripe** — Payment processing (placeholder)

---

## 2. Folder Structure

```
frontend/
├── public/                      # Static assets
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── api/                     # API helpers
│   │   ├── index.js             # Portfolio API (CV, projects, contact)
│   │   ├── auth.js              # User profile & admin API
│   │   └── stripe.js            # Stripe integration placeholders
│   ├── assets/                  # Images and media
│   ├── components/
│   │   ├── auth/                # Auth guards
│   │   │   ├── AuthGuard.jsx    # Protected route wrapper
│   │   │   └── AdminGuard.jsx   # Admin-only route wrapper
│   │   ├── layout/
│   │   │   └── DashboardLayout.jsx  # Dashboard sidebar layout
│   │   ├── portfolio/           # Original portfolio components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Education.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Footer.jsx
│   │   └── ui/                  # Reusable UI components
│   │       ├── Button.jsx       # Button with variants
│   │       ├── Input.jsx        # Form inputs & textarea
│   │       └── GlassCard.jsx    # Glassmorphic card
│   ├── context/                 # React contexts
│   │   ├── AuthContext.jsx      # Supabase auth & user state
│   │   └── ThemeContext.jsx     # Dark/light theme
│   ├── lib/
│   │   └── utils.js             # Utility functions
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── ForgotPassword.jsx
│   │   ├── dashboard/
│   │   │   ├── Dashboard.jsx       # Main dashboard
│   │   │   ├── AiChat.jsx          # AI chat interface
│   │   │   ├── Profile.jsx         # User profile
│   │   │   ├── Settings.jsx        # App settings
│   │   │   └── Subscription.jsx    # Pricing & plans
│   │   ├── admin/
│   │   │   ├── AdminDashboard.jsx  # Admin panel
│   │   │   └── Analytics.jsx       # Analytics with charts
│   │   └── Landing.jsx             # Enhanced portfolio landing
│   ├── App.jsx                 # Root with routing
│   ├── index.css               # Design system & theme
│   ├── main.jsx                # Entry point
│   └── supabase.js             # Supabase client
├── .env                        # Environment variables (gitignored)
├── .gitignore
├── DOCS.md                     # This documentation
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

---

## 3. Getting Started

### Prerequisites

- Node.js 18+ (recommended: 20+)
- npm (comes with Node.js)
- A Supabase account (free tier works)
- (Optional) A Stripe account for payments

### Installation

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

---

## 4. Environment Variables

Create a `frontend/.env` file with the following variables:

```env
# Supabase (Required)
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Stripe (Optional - for subscriptions)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
```

**How to get these values:**

1. **Supabase**: Go to your Supabase project → Settings → API
   - Copy the "Project URL" → `VITE_SUPABASE_URL`
   - Copy the "anon public" key → `VITE_SUPABASE_ANON_KEY`

2. **Stripe**: Go to Stripe Dashboard → Developers → API keys
   - Copy the "Publishable key" → `VITE_STRIPE_PUBLISHABLE_KEY`

---

## 5. Supabase Setup

### Database Tables

Run these SQL statements in your Supabase SQL Editor to create the required tables:

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

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
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

### Existing Portfolio Tables

The starter kit also includes the original portfolio database tables:

```sql
-- CV profile table
CREATE TABLE IF NOT EXISTS cv_profile (
  id SERIAL PRIMARY KEY,
  name TEXT,
  title TEXT,
  email TEXT,
  phone TEXT,
  location TEXT,
  portfolio TEXT,
  linkedin TEXT,
  github TEXT,
  summary TEXT
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title TEXT,
  description TEXT,
  tech TEXT[],
  github TEXT
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  subject TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Making Yourself an Admin

After signing up, run this SQL in your Supabase SQL Editor:

```sql
UPDATE profiles
SET role = 'admin'
WHERE email = 'your-email@example.com';
```

---

## 6. Authentication

The starter kit uses **Supabase Auth** for authentication. It supports:

- **Email/Password** — Standard sign-up and sign-in
- **Google OAuth** — One-click sign-in with Google
- **Password Reset** — Forgot password flow

### Auth Flow

1. User signs up → Email confirmation sent
2. User confirms email → Profile auto-created via Supabase trigger
3. User signs in → AuthContext updates global user state
4. Protected routes check authentication via AuthGuard

### Auth Components

| Component | Description |
|-----------|-------------|
| `Login.jsx` | Email/password + Google sign-in form |
| `Signup.jsx` | Registration form with email confirmation flow |
| `ForgotPassword.jsx` | Password reset email form |
| `AuthGuard.jsx` | Wraps protected routes, redirects to /login |
| `AdminGuard.jsx` | Wraps admin routes, redirects to /dashboard |

### AuthContext API

```jsx
import { useAuth } from '../context/AuthContext';

const {
  user,              // Supabase user object
  profile,           // Profile from profiles table
  session,           // Supabase auth session
  loading,           // Loading state during auth check
  isAdmin,           // Boolean: profile?.role === 'admin'
  isAuthenticated,   // Boolean: !!user
  signUp,            // (email, password, fullName) => Promise
  signIn,            // (email, password) => Promise
  signInWithGoogle,  // () => Promise
  signOut,           // () => Promise
  resetPassword,     // (email) => Promise
  updateProfile,     // (updates) => Promise
} = useAuth();
```

---

## 7. Routing & Pages

### Route Structure

| Path | Page | Access |
|------|------|--------|
| `/` | Landing (Portfolio + SaaS sections) | Public |
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

### Adding a New Route

```jsx
// In App.jsx
<Route
  path="/dashboard/your-new-page"
  element={
    <AuthGuard>
      <DashboardLayout>
        <YourNewPage />
      </DashboardLayout>
    </AuthGuard>
  }
/>
```

---

## 8. Role-Based Access Control

The starter kit includes a simple but effective RBAC system:

**User Roles:**
- `user` — Standard authenticated user
- `admin` — Administrator with elevated privileges

**Guards:**
- `AuthGuard` — Protects routes that require authentication
- `AdminGuard` — Protects routes that require admin role

**Usage:**
```jsx
// Protected route (any authenticated user)
<AuthGuard>
  <DashboardPage />
</AuthGuard>

// Admin-only route
<AdminGuard>
  <AdminPage />
</AdminGuard>
```

**Admin UI context:**
```jsx
const { isAdmin } = useAuth();

if (isAdmin) {
  // Show admin-specific UI elements
}
```

---

## 9. AI Chat Integration

The AI Chat page (`/dashboard/chat`) provides a chat interface ready to connect to any AI provider.

### Current Implementation

- Chat message list with user/assistant roles
- Message input with send button
- Loading states with animated dots
- Quick suggestion buttons
- Auto-scroll to latest messages

### Connecting to an AI Provider

1. **OpenAI Example:**

```jsx
// In pages/dashboard/AiChat.jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  // ... existing code ...

  // Replace the timeout simulation with:
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [...previousMessages, { role: 'user', content: userMessage }],
    }),
  });

  const data = await response.json();
  const aiResponse = data.choices[0].message.content;
  // Add aiResponse to messages
};
```

2. **Anthropic/Claude Example:**

```jsx
const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
    'anthropic-version': '2023-06-01',
  },
  body: JSON.stringify({
    model: 'claude-3-opus-20240229',
    max_tokens: 1024,
    messages: [{ role: 'user', content: userMessage }],
  }),
});
```

3. **Supabase Edge Function (Recommended for Production):**

```bash
# Create an Edge Function
supabase functions new ai-chat

# Call it from the frontend
const response = await supabase.functions.invoke('ai-chat', {
  body: { messages: chatHistory },
});
```

---

## 10. Stripe Subscription

The subscription page includes placeholder UI and Stripe integration stubs.

### Setup Steps

1. **Create a Stripe Account** at [stripe.com](https://stripe.com)

2. **Create Products & Prices** in the Stripe Dashboard:
   - AI SaaS Pro — Monthly ($29)
   - AI SaaS Pro — Yearly ($290)
   - AI SaaS Enterprise — Monthly ($99)
   - AI SaaS Enterprise — Yearly ($990)

3. **Update Price IDs** in `src/api/stripe.js`

4. **Create a Server Endpoint** (Edge Function or Express):
```js
// Example: Stripe Checkout Session Edge Function
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

Deno.serve(async (req) => {
  const { priceId, userId } = await req.json();

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${req.headers.get('origin')}/dashboard/subscription?success=true`,
    cancel_url: `${req.headers.get('origin')}/dashboard/subscription?canceled=true`,
    client_reference_id: userId,
  });

  return new Response(JSON.stringify({ url: session.url }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
```

5. **Handle Webhooks** for subscription lifecycle events

### Stripe Placeholder

The current implementation uses `alert()` as a placeholder. Update `Subscription.jsx` to call your actual checkout endpoint:

```jsx
const handleSubscribe = async (planName) => {
  const { url } = await createCheckoutSession(priceId, user.id);
  window.location.href = url;
};
```

---

## 11. Database Schema

### Core Tables

| Table | Purpose | Key Columns |
|-------|---------|-------------|
| `profiles` | User profiles & roles | id, email, full_name, avatar_url, role |
| `cv_profile` | Portfolio CV data | id, name, title, email, summary |
| `projects` | Portfolio projects | id, title, description, tech, github |
| `contacts` | Contact form submissions | id, full_name, email, subject, message |

### Future Tables (Ready for Extension)

| Table | Purpose | Suggested Columns |
|-------|---------|-------------------|
| `subscriptions` | User subscriptions | id, user_id, plan, status, stripe_customer_id, current_period_end |
| `ai_chats` | Chat history | id, user_id, role, content, created_at |
| `usage_logs` | API credit tracking | id, user_id, action, credits_used, created_at |

---

## 12. Component Library

### UI Components

| Component | Props | Description |
|-----------|-------|-------------|
| `Button` | variant, size, loading, disabled, href, onClick | Styled button with variants |
| `Input` | label, type, error, ...inputProps | Form input with label |
| `GlassCard` | className, hover, onClick | Glassmorphic card container |

### Button Variants

```jsx
<Button variant="primary">Primary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
```

### Button Sizes

```jsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

### Layout Components

| Component | Description |
|-----------|-------------|
| `DashboardLayout` | Sidebar + header + content area |
| `AuthGuard` | Authentication check wrapper |
| `AdminGuard` | Admin role check wrapper |

### Portfolio Components

| Component | Section |
|-----------|---------|
| `Navbar` | Fixed top navigation |
| `Hero` | Landing hero section |
| `About` | Bio + stats |
| `Skills` | Tabbed skill progress bars |
| `Projects` | Project cards grid |
| `Education` | Education details |
| `Contact` | Contact form + details |
| `Footer` | Site footer |

---

## 13. Styling & Theme

### Design System

- **Primary Color**: Golden Yellow (`#d4a522`)
- **Dark Theme**: Charcoal backgrounds (`#0a0a0f`)
- **Light Theme**: Warm off-white (`#f8f7f4`)
- **Typography**: Outfit (headings), Inter (body), Fira Code (mono)
- **Effects**: Glassmorphism, golden accents, smooth transitions

### Theme Toggle

The theme is controlled via `data-theme` attribute on `<html>`:
- `data-theme="dark"` — Dark mode (default)
- `data-theme="light"` — Light mode

### CSS Variables

```css
--theme-bg
--theme-surface
--theme-text
--theme-text-secondary
--theme-border
--theme-overlay
--theme-primary
```

### Utility Classes

| Class | Effect |
|-------|--------|
| `.glass` | Glassmorphism effect |
| `.glass-strong` | Stronger glass effect |
| `.card-surface` | Card background |
| `.gradient-text` | Golden gradient text |
| `.btn-primary` | Primary button |
| `.btn-outline` | Outline button |
| `.golden-border` | Golden border |
| `.golden-border-hover` | Golden border on hover |
| `.glow-sm` | Small golden glow |
| `.glow-md` | Medium golden glow |

---

## 14. Deployment

### Building for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

### Hosting Options

#### Vercel
1. Connect your GitHub repository
2. Vercel auto-detects Vite settings
3. Set environment variables in Vercel dashboard
4. Deploy

#### Netlify
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Set environment variables

#### Docker
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Supabase Production Checklist

- [ ] Enable Row Level Security on all tables
- [ ] Set up proper RLS policies
- [ ] Configure authentication providers
- [ ] Set up custom SMTP for emails
- [ ] Enable email confirmations
- [ ] Create a project for production (separate from development)

---

## 15. API Architecture

### Current API Layer

The frontend communicates with Supabase directly via the JS client:

```
Frontend → Supabase JS Client → Supabase REST API → PostgreSQL
```

### Extending with Backend

For operations requiring server-side logic (Stripe, AI calls, etc.):

#### Option A: Supabase Edge Functions
```bash
supabase functions new my-function
# Deploy: supabase functions deploy my-function
```

#### Option B: Express.js Backend
The existing `backend/` directory contains an Express server that can be extended:

```js
// backend/server.js
app.post('/api/create-checkout-session', async (req, res) => {
  const { priceId } = req.body;
  const session = await stripe.checkout.sessions.create({ ... });
  res.json({ url: session.url });
});
```

### Environment Variables Management

| Variable | Where | Required For |
|----------|-------|-------------|
| `VITE_SUPABASE_URL` | `.env` | Database access |
| `VITE_SUPABASE_ANON_KEY` | `.env` | Database access |
| `VITE_STRIPE_PUBLISHABLE_KEY` | `.env` | Stripe UI |
| `STRIPE_SECRET_KEY` | Server env | Stripe API |
| `OPENAI_API_KEY` | Server env | AI chat |

---

## 🚀 Quick Start Summary

```bash
# 1. Clone and install
cd frontend
npm install

# 2. Set up environment
cp .env.example .env
# Edit .env with your Supabase credentials

# 3. Set up database
# Run the SQL in Supabase SQL Editor (see Section 5)

# 4. Make yourself admin
# Run: UPDATE profiles SET role = 'admin' WHERE email = 'your-email';

# 5. Start developing
npm run dev
```

---

*Built with ❤️ using React 19, Vite 8, Tailwind CSS 4, and Supabase*
