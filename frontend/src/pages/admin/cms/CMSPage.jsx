import { useState } from 'react';
import AdminCMS, { CMSSetup } from './AdminCMS';
import CMSHero from './CMSHero';
import CMSAbout from './CMSAbout';
import CMSSkills from './CMSSkills';
import CMSProjects from './CMSProjects';
import CMSBlog from './CMSBlog';
import CMSContact from './CMSContact';
import CMSResume from './CMSResume';
import CMSSEO from './CMSSEO';
import CMSSettings from './CMSSettings';
import CMSExperience from './CMSExperience';
import CMSCertifications from './CMSCertifications';

export default function CMSPage() {
  const [activeSection, setActiveSection] = useState('hero');

  const renderSection = () => {
    switch (activeSection) {
      case 'hero': return <CMSHero />;
      case 'about': return <CMSAbout />;
      case 'skills': return <CMSSkills />;
      case 'experience': return <CMSExperience />;
      case 'certifications': return <CMSCertifications />;
      case 'projects': return <CMSProjects />;
      case 'blog': return <CMSBlog />;
      case 'contact': return <CMSContact />;
      case 'resume': return <CMSResume />;
      case 'seo': return <CMSSEO />;
      case 'settings': return <CMSSettings />;
      default: return <CMSSetup />;
    }
  };

  return (
    <AdminCMS activeSection={activeSection} onNavigate={setActiveSection}>
      {renderSection()}
    </AdminCMS>
  );
}
