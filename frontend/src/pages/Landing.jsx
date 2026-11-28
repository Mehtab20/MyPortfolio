import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SiteLayout from '../components/site/SiteLayout';
import Hero from '../components/site/Hero';
import Work from '../components/site/Work';
import About from '../components/site/About';
import Capabilities from '../components/site/Capabilities';
import Path from '../components/site/Path';
import Contact from '../components/site/Contact';
import { useReveal, usePageMeta } from '../components/site/hooks';

// Section ids from the previous design, so old links still land somewhere sensible.
const OLD_HASHES = { projects: 'work', services: 'capabilities', skills: 'capabilities', experience: 'path', education: 'path' };

export default function Landing() {
  const { hash } = useLocation();

  usePageMeta({
    title: 'Mehtab Akbar — Software Engineer, Flutter Developer, Full-Stack Developer',
    description:
      'Mehtab Akbar is a software engineer in Pakistan who builds Flutter apps and full-stack systems: MehZu AI, the MedRef referral system and a hospital management system for Gohar Medical Trust.',
    path: '/',
  });
  useReveal([]);

  // Arriving from another page with /#section: scroll there once rendered.
  useEffect(() => {
    if (!hash) return undefined;
    const id = OLD_HASHES[hash.slice(1)] || hash.slice(1);
    const t = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <SiteLayout>
      <Hero />
      <Work />
      <About />
      <Capabilities />
      <Path />
      <Contact />
    </SiteLayout>
  );
}
