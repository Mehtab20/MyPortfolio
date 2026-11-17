import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SiteLayout from '../components/site/SiteLayout';
import Hero from '../components/site/Hero';
import Work from '../components/site/Work';
import About from '../components/site/About';
import Toolkit from '../components/site/Toolkit';
import Journey from '../components/site/Journey';
import Contact from '../components/site/Contact';
import { useReveal, usePageMeta } from '../components/site/hooks';

export default function Landing() {
  const { hash } = useLocation();

  usePageMeta({
    title: 'Mehtab Akbar — Software Engineer, AI Product Builder, Full-Stack Developer',
    description:
      'Mehtab Akbar is a software engineer in Pakistan who builds AI-native products and full-stack systems: MehZu AI, the MedRef referral system and a hospital management system for Gohar Medical Trust.',
    path: '/',
  });
  useReveal([]);

  // Arriving from another page with /#section: scroll there once rendered.
  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    const t = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <SiteLayout>
      <Hero />
      <Work />
      <About />
      <Toolkit />
      <Journey />
      <Contact />
    </SiteLayout>
  );
}
