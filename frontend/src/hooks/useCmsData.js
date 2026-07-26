import { useState, useEffect } from 'react';
import {
  getHero, getAbout, getSkills, getContact,
  getResumeData, getSEO, getSettings,
  getExperience, getCertifications
} from '../api/cms';
import { supabase } from '../supabase';

// ─── Reusable async data hook ────────────────────────────────
function useCmsData(fetchFn, defaultValue = null) {
  const [data, setData] = useState(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const result = await fetchFn();
        if (!cancelled) setData(result);
      } catch (err) {
        if (!cancelled) setError(err);
      }
      if (!cancelled) setLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  return { data, loading, error };
}

// ─── Hero ────────────────────────────────────────────────────
export function useHero() {
  return useCmsData(getHero, {
    first_name: 'Mehtab',
    last_name: 'Akbar',
    roles: ['Full-Stack Software Engineer'],
    tagline: 'Full-Stack Software Engineer specializing in AI-powered healthcare systems, cloud computing, cross-platform mobile apps (Flutter), and scalable SaaS platforms using React, FastAPI, and modern DevOps practices.',
    stats: [
      { value: '4+', label: 'Projects' },
      { value: '3+', label: 'Years Coding' },
      { value: '8+', label: 'Tech Stacks' },
      { value: '10+', label: 'Open Source' },
    ],
    cta_buttons: [
      { label: 'View Projects', href: '#projects', variant: 'primary' },
      { label: 'View Resume', href: '/resume', variant: 'outline' },
      { label: 'Hire Me', href: '#contact', variant: 'ghost' },
    ],
    available_status: true,
    profile_image: '',
  });
}

// ─── About ───────────────────────────────────────────────────
export function useAbout() {
  return useCmsData(getAbout, {
    bio_paragraphs: [
      "I'm a Software Engineering student at Iqra University Islamabad, passionate about building AI-powered healthcare systems, cross-platform mobile applications, and scalable cloud solutions. My work bridges the gap between cutting-edge technology and real-world impact — from digitizing hospital operations to developing intelligent medical diagnostic tools.",
      "Currently focused on expanding my expertise in Cloud Computing (AWS/GCP), DevOps automation, and production-grade full-stack development. I believe in building software that not only works beautifully but makes a tangible difference in people's lives.",
    ],
    personal_info: [
      { label: 'Experience', value: '3+ Years' },
      { label: 'Location', value: 'Rawalpindi, Pakistan' },
      { label: 'Nationality', value: 'Pakistani' },
      { label: 'Born', value: '2004' },
    ],
    tagline: 'A passionate developer building exceptional digital experiences.',
  });
}

// ─── Skills ──────────────────────────────────────────────────
export function useSkills() {
  const { data, loading, error } = useCmsData(getSkills, []);
  return { data, loading, error };
}

// ─── Projects ────────────────────────────────────────────────
export function useProjects() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data: projects } = await supabase.from('cms_projects').select('*').eq('published', true).order('sort_order', { ascending: true });
        if (!cancelled) setData(projects || []);
      } catch { /* use fallback */ }
      if (!cancelled) setLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  return { data, loading };
}

// ─── Blog Posts ──────────────────────────────────────────────
export function useBlogPosts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data: posts } = await supabase.from('cms_blog').select('*').eq('published', true).order('created_at', { ascending: false });
        if (!cancelled) setData(posts || []);
      } catch { /* ignore */ }
      if (!cancelled) setLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  return { data, loading };
}

// ─── Contact ─────────────────────────────────────────────────
export function useContact() {
  return useCmsData(getContact, {
    email: 'mehtabakbar5656@gmail.com',
    phone: '+92 340 8575834',
    location: 'Rawalpindi, Punjab, Pakistan',
    portfolio_url: 'https://mehtabakbar.com',
    social_links: [
      { label: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com/in/mehtab-akbar-385024267' },
      { label: 'GitHub', icon: 'github', url: 'https://github.com/Mehtab20' },
    ],
  });
}

// ─── Experience ──────────────────────────────────────────────
export function useExperience() {
  return useCmsData(getExperience, [
    {
      type: 'work', title: 'Freelance Full Stack Developer', organization: 'Self-Employed',
      period: '2024 – Present', description: 'Building web and mobile applications for clients using React, Flutter, Node.js, and cloud deployment.',
      highlights: ['Delivered 5+ production applications', 'Cloud deployment on Vercel & Netlify', 'Full-stack architecture & API design'],
    },
    {
      type: 'education', title: 'B.Sc. Software Engineering', organization: 'Iqra University, Islamabad Campus',
      period: '2022 – Present (Expected 2026)', description: 'Pursuing a degree in Software Engineering with a focus on cloud computing, HCI, and modern software architecture.',
      highlights: ['8+ CGPA Maintained', 'Active in tech community & events', 'Relevant coursework: DSA, DBMS, HCI, Design Patterns'],
    },
    {
      type: 'education', title: 'Intermediate in Computer Science', organization: 'Punjab College, Rawalpindi',
      period: '2020 – 2022', description: 'Completed intermediate education with a focus on computer science fundamentals.',
      highlights: ['Strong foundation in programming', 'Developed interest in software development', 'Built first programming projects'],
    },
  ]);
}

// ─── Certifications ──────────────────────────────────────────
export function useCertifications() {
  return useCmsData(getCertifications, [
    { title: 'Google Cloud Digital Leader', issuer: 'Google Cloud', year: '2025', icon: '☁️' },
    { title: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', year: '2025', icon: '📘' },
    { title: 'Meta Front-End Developer', issuer: 'Meta (Coursera)', year: '2024', icon: '⚛️' },
    { title: 'GitHub Actions & CI/CD', issuer: 'GitHub', year: '2024', icon: '🔄' },
  ]);
}

// ─── Resume ──────────────────────────────────────────────────
export function useResume() {
  return useCmsData(getResumeData, { pdf_url: '/resume.pdf', sections: [] });
}

// ─── SEO ─────────────────────────────────────────────────────
export function useSEO() {
  return useCmsData(getSEO, {
    site_title: 'Mehtab Akbar - Software Engineer',
    site_description: 'Full-Stack Software Engineer specializing in AI-powered healthcare systems',
    og_image: '', keywords: '', google_analytics_id: '', favicon: '/favicon.svg',
  });
}

// ─── Settings ────────────────────────────────────────────────
export function useSettings() {
  return useCmsData(getSettings, { site_name: 'Mehtab Akbar', enable_animations: true, enable_blog: true, enable_contact_form: true, maintenance_mode: false });
}
