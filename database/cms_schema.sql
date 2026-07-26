-- ============================================================
-- Portfolio CMS Database Schema
-- Run this in your Supabase SQL Editor to create all CMS tables
-- ============================================================

-- 1. Hero Section (single row)
CREATE TABLE IF NOT EXISTS cms_hero (
  id BIGINT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  first_name TEXT DEFAULT 'Mehtab',
  last_name TEXT DEFAULT 'Akbar',
  roles JSONB DEFAULT '["Full-Stack Software Engineer"]',
  tagline TEXT DEFAULT '',
  stats JSONB DEFAULT '[{"value":"4+","label":"Projects"},{"value":"3+","label":"Years Coding"},{"value":"8+","label":"Tech Stacks"},{"value":"10+","label":"Open Source"}]',
  cta_buttons JSONB DEFAULT '[{"label":"View Projects","href":"#projects","variant":"primary"},{"label":"View Resume","href":"/resume","variant":"outline"},{"label":"Hire Me","href":"#contact","variant":"ghost"}]',
  available_status BOOLEAN DEFAULT true,
  profile_image TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. About Section (single row)
CREATE TABLE IF NOT EXISTS cms_about (
  id BIGINT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  bio_paragraphs JSONB DEFAULT '[""]',
  personal_info JSONB DEFAULT '[{"label":"Experience","value":"3+ Years"},{"label":"Location","value":"Rawalpindi, Pakistan"},{"label":"Nationality","value":"Pakistani"},{"label":"Born","value":"2004"}]',
  tagline TEXT DEFAULT 'A passionate developer building exceptional digital experiences.',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Skills (multiple rows, ordered)
CREATE TABLE IF NOT EXISTS cms_skills (
  id BIGSERIAL PRIMARY KEY,
  category TEXT NOT NULL,
  category_key TEXT NOT NULL,
  context TEXT DEFAULT '',
  icon TEXT DEFAULT '⚡',
  skills JSONB DEFAULT '[]',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Projects with full case studies
CREATE TABLE IF NOT EXISTS cms_projects (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  tagline TEXT DEFAULT '',
  image TEXT DEFAULT '',
  gradient TEXT DEFAULT 'from-teal-500/20 via-cyan-500/10 to-transparent',
  status TEXT DEFAULT 'Draft',
  status_color TEXT DEFAULT '#14b8a6',
  year TEXT DEFAULT '',
  role_text TEXT DEFAULT '',
  summary TEXT DEFAULT '',
  problem TEXT DEFAULT '',
  background TEXT DEFAULT '',
  objectives JSONB DEFAULT '[]',
  features JSONB DEFAULT '[]',
  architecture JSONB DEFAULT '[]',
  tech_stack JSONB DEFAULT '[]',
  process JSONB DEFAULT '[]',
  challenges JSONB DEFAULT '[]',
  results JSONB DEFAULT '[]',
  github TEXT DEFAULT '',
  demo TEXT DEFAULT '',
  future JSONB DEFAULT '[]',
  published BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Blog posts
CREATE TABLE IF NOT EXISTS cms_blog (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  excerpt TEXT DEFAULT '',
  content TEXT DEFAULT '',
  tags JSONB DEFAULT '[]',
  image TEXT DEFAULT '',
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Contact info + social links (single row)
CREATE TABLE IF NOT EXISTS cms_contact (
  id BIGINT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  email TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  location TEXT DEFAULT '',
  portfolio_url TEXT DEFAULT '',
  social_links JSONB DEFAULT '[]',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Resume (single row)
CREATE TABLE IF NOT EXISTS cms_resume (
  id BIGINT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  pdf_url TEXT DEFAULT '',
  sections JSONB DEFAULT '[]',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. SEO metadata (single row)
CREATE TABLE IF NOT EXISTS cms_seo (
  id BIGINT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  site_title TEXT DEFAULT 'Mehtab Akbar - Software Engineer',
  site_description TEXT DEFAULT 'Full-Stack Software Engineer specializing in AI-powered healthcare systems',
  og_image TEXT DEFAULT '',
  keywords TEXT DEFAULT '',
  google_analytics_id TEXT DEFAULT '',
  favicon TEXT DEFAULT '/favicon.svg',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Site settings (single row)
CREATE TABLE IF NOT EXISTS cms_settings (
  id BIGINT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  site_name TEXT DEFAULT 'Mehtab Akbar',
  enable_animations BOOLEAN DEFAULT true,
  enable_blog BOOLEAN DEFAULT true,
  enable_contact_form BOOLEAN DEFAULT true,
  maintenance_mode BOOLEAN DEFAULT false,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Experience / Career Journey
CREATE TABLE IF NOT EXISTS cms_experience (
  id BIGSERIAL PRIMARY KEY,
  type TEXT NOT NULL DEFAULT 'work',
  title TEXT NOT NULL,
  organization TEXT DEFAULT '',
  period TEXT DEFAULT '',
  description TEXT DEFAULT '',
  highlights JSONB DEFAULT '[]',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Certifications
CREATE TABLE IF NOT EXISTS cms_certifications (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  issuer TEXT DEFAULT '',
  year TEXT DEFAULT '',
  icon TEXT DEFAULT '🏅',
  url TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE cms_hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_about ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_blog ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_contact ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_resume ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_seo ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_certifications ENABLE ROW LEVEL SECURITY;

-- Everyone can read (SELECT)
CREATE POLICY "Anyone can read cms_hero" ON cms_hero FOR SELECT USING (true);
CREATE POLICY "Anyone can read cms_about" ON cms_about FOR SELECT USING (true);
CREATE POLICY "Anyone can read cms_skills" ON cms_skills FOR SELECT USING (true);
CREATE POLICY "Anyone can read cms_projects" ON cms_projects FOR SELECT USING (true);
CREATE POLICY "Anyone can read published blog" ON cms_blog FOR SELECT USING (published = true OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Anyone can read cms_contact" ON cms_contact FOR SELECT USING (true);
CREATE POLICY "Anyone can read cms_resume" ON cms_resume FOR SELECT USING (true);
CREATE POLICY "Anyone can read cms_seo" ON cms_seo FOR SELECT USING (true);
CREATE POLICY "Anyone can read cms_settings" ON cms_settings FOR SELECT USING (true);
CREATE POLICY "Anyone can read cms_experience" ON cms_experience FOR SELECT USING (true);
CREATE POLICY "Anyone can read cms_certifications" ON cms_certifications FOR SELECT USING (true);

-- Only admins can write
CREATE POLICY "Admins can insert cms_hero" ON cms_hero FOR INSERT WITH CHECK ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Admins can update cms_hero" ON cms_hero FOR UPDATE USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Admins can delete cms_hero" ON cms_hero FOR DELETE USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admins can insert cms_about" ON cms_about FOR INSERT WITH CHECK ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Admins can update cms_about" ON cms_about FOR UPDATE USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Admins can delete cms_about" ON cms_about FOR DELETE USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admins can insert cms_skills" ON cms_skills FOR INSERT WITH CHECK ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Admins can update cms_skills" ON cms_skills FOR UPDATE USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Admins can delete cms_skills" ON cms_skills FOR DELETE USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admins can insert cms_projects" ON cms_projects FOR INSERT WITH CHECK ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Admins can update cms_projects" ON cms_projects FOR UPDATE USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Admins can delete cms_projects" ON cms_projects FOR DELETE USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admins can manage blog" ON cms_blog FOR INSERT WITH CHECK ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Admins can update blog" ON cms_blog FOR UPDATE USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Admins can delete blog" ON cms_blog FOR DELETE USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admins can insert cms_contact" ON cms_contact FOR INSERT WITH CHECK ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Admins can update cms_contact" ON cms_contact FOR UPDATE USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Admins can delete cms_contact" ON cms_contact FOR DELETE USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admins can insert cms_resume" ON cms_resume FOR INSERT WITH CHECK ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Admins can update cms_resume" ON cms_resume FOR UPDATE USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Admins can delete cms_resume" ON cms_resume FOR DELETE USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admins can manage seo" ON cms_seo FOR INSERT WITH CHECK ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Admins can update seo" ON cms_seo FOR UPDATE USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Admins can delete seo" ON cms_seo FOR DELETE USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admins can manage settings" ON cms_settings FOR INSERT WITH CHECK ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Admins can update settings" ON cms_settings FOR UPDATE USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Admins can delete settings" ON cms_settings FOR DELETE USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admins can insert experience" ON cms_experience FOR INSERT WITH CHECK ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Admins can update experience" ON cms_experience FOR UPDATE USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Admins can delete experience" ON cms_experience FOR DELETE USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admins can insert certifications" ON cms_certifications FOR INSERT WITH CHECK ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Admins can update certifications" ON cms_certifications FOR UPDATE USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Admins can delete certifications" ON cms_certifications FOR DELETE USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
