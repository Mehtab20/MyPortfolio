-- ============================================================
-- Seed all CMS tables with your existing portfolio data
-- Run this ONCE in your Supabase SQL Editor
-- ============================================================

-- ── 1. HERO ──────────────────────────────────────────────────
INSERT INTO cms_hero (id, first_name, last_name, roles, tagline, stats, cta_buttons, available_status, profile_image)
VALUES (1, 'Mehtab', 'Akbar',
  '["Full-Stack Software Engineer","AI & Healthcare Systems","Cloud & DevOps Engineer","Open Source Contributor"]',
  'Full-Stack Software Engineer specializing in AI-powered healthcare systems, cloud computing, cross-platform mobile apps (Flutter), and scalable SaaS platforms using React, FastAPI, and modern DevOps practices.',
  '[{"value":"4+","label":"Projects"},{"value":"3+","label":"Years Coding"},{"value":"8+","label":"Tech Stacks"},{"value":"10+","label":"Open Source"}]',
  '[{"label":"View Projects","href":"#projects","variant":"primary"},{"label":"View Resume","href":"/resume","variant":"outline"},{"label":"Hire Me","href":"#contact","variant":"ghost"}]',
  true, ''
)
ON CONFLICT (id) DO UPDATE SET
  first_name = EXCLUDED.first_name,
  last_name = EXCLUDED.last_name,
  roles = EXCLUDED.roles,
  tagline = EXCLUDED.tagline,
  stats = EXCLUDED.stats,
  cta_buttons = EXCLUDED.cta_buttons;

-- ── 2. ABOUT ─────────────────────────────────────────────────
INSERT INTO cms_about (id, bio_paragraphs, personal_info, tagline)
VALUES (1,
  '["I''m a Software Engineering student at Iqra University Islamabad, passionate about building AI-powered healthcare systems, cross-platform mobile applications, and scalable cloud solutions. My work bridges the gap between cutting-edge technology and real-world impact — from digitizing hospital operations to developing intelligent medical diagnostic tools.","Currently focused on expanding my expertise in Cloud Computing (AWS/GCP), DevOps automation, and production-grade full-stack development. I believe in building software that not only works beautifully but makes a tangible difference in people''s lives."]',
  '[{"label":"Experience","value":"3+ Years"},{"label":"Location","value":"Rawalpindi, Pakistan"},{"label":"Nationality","value":"Pakistani"},{"label":"Born","value":"2004"}]',
  'A passionate developer building exceptional digital experiences.'
)
ON CONFLICT (id) DO UPDATE SET
  bio_paragraphs = EXCLUDED.bio_paragraphs,
  personal_info = EXCLUDED.personal_info,
  tagline = EXCLUDED.tagline;

-- ── 3. SKILLS ────────────────────────────────────────────────
INSERT INTO cms_skills (category, category_key, context, icon, skills, sort_order) VALUES
('Full Stack Development', 'fullstack', 'Building production web apps with React, Node.js, and scalable APIs for hospital systems and SaaS platforms.', '⚛️',
  '[{"name":"React","icon":"⚛️"},{"name":"Node.js","icon":"🟢"},{"name":"Express.js","icon":"🚂"},{"name":"REST APIs","icon":"🔗"},{"name":"Next.js","icon":"▲"},{"name":"Tailwind CSS","icon":"🎨"}]', 1),
('Mobile & Cross-Platform', 'mobile', 'Shipping cross-platform mobile apps with Flutter/Dart covering patient-facing healthcare interfaces and real-time dashboards.', '📱',
  '[{"name":"Flutter","icon":"📱"},{"name":"Dart","icon":"🎯"},{"name":"Material Design 3","icon":"🎨"},{"name":"Firebase","icon":"🔥"},{"name":"TensorFlow Lite","icon":"🧠"}]', 2),
('AI & Machine Learning', 'ai', 'Building production ML pipelines — symptom classification models achieving 92% accuracy, deployed on-device via TensorFlow Lite.', '🧠',
  '[{"name":"Python","icon":"🐍"},{"name":"FastAPI","icon":"⚡"},{"name":"TensorFlow","icon":"🧠"},{"name":"NLP","icon":"💬"},{"name":"Transfer Learning","icon":"🔄"},{"name":"Data Pipelines","icon":"📊"}]', 3),
('Cloud & DevOps', 'cloud', 'Deploying and monitoring production systems on AWS/GCP with Docker, CI/CD pipelines, and Linux server management.', '☁️',
  '[{"name":"Docker","icon":"🐳"},{"name":"AWS/GCP","icon":"☁️"},{"name":"CI/CD","icon":"🔄"},{"name":"Linux","icon":"🐧"},{"name":"Git & GitHub","icon":"🐙"},{"name":"PostgreSQL","icon":"🐘"}]', 4),
('Databases & Backend', 'databases', 'Designing normalized schemas, encrypted health records, and optimized queries handling 500+ concurrent users in production.', '🐘',
  '[{"name":"PostgreSQL","icon":"🐘"},{"name":"MySQL","icon":"🐬"},{"name":"Redis","icon":"🔴"},{"name":"Supabase","icon":"🔥"},{"name":"Prisma","icon":"🔗"},{"name":"SQL","icon":"🗄️"}]', 5),
('Programming Languages', 'languages', 'Professional proficiency across the stack — from systems programming to scripting and data analysis.', '💻',
  '[{"name":"Python","icon":"🐍"},{"name":"JavaScript","icon":"⚡"},{"name":"Dart","icon":"🎯"},{"name":"Java","icon":"☕"},{"name":"C++","icon":"🔧"},{"name":"SQL","icon":"🗄️"}]', 6);

-- ── 4. PROJECTS ──────────────────────────────────────────────
INSERT INTO cms_projects (title, slug, tagline, image, gradient, status, status_color, year, role_text, summary, problem, background, objectives, features, architecture, tech_stack, process, challenges, results, github, demo, published, sort_order) VALUES
(
  'Medical Referral Agent',
  'medref',
  'AI-Based Diagnostic & Specialist Referral System',
  '/assets/project-medref.svg',
  'from-teal-500/20 via-cyan-500/10 to-transparent',
  'Final Year Project',
  '#14b8a6',
  '2025–2026',
  'Lead Developer & ML Engineer',
  'An intelligent AI-powered medical diagnostic and specialist referral system that bridges the gap between primary symptoms and specialized healthcare. The system uses machine learning to analyze patient symptoms, suggest probable diagnoses, and recommend appropriate medical specialists.',
  'In Pakistan and many developing countries, patients often visit multiple general practitioners before being correctly referred to a specialist. This process can take weeks or months, delaying critical treatment. Additionally, there is no centralized system to track patient history across different healthcare providers, leading to repetitive diagnostic tests and fragmented medical records.',
  'The idea for this project emerged during my university coursework on Artificial Intelligence and Healthcare Informatics. I observed firsthand how family members struggled to navigate the healthcare referral system. The project was developed as my final year capstone, spanning two semesters of research, development, and testing in collaboration with a local clinic that provided de-identified patient data for training the diagnostic model.',
  '["Develop an ML model capable of classifying symptoms into probable diagnoses with at least 85% accuracy","Build a cross-platform mobile application accessible to both Android and iOS users","Implement intelligent specialist referral matching based on diagnosis, location, and availability","Ensure patient data security and compliance with healthcare data protection standards","Design for offline functionality in areas with limited internet connectivity","Create an analytics dashboard for healthcare administrators to identify epidemiological trends"]',
  '["AI-powered symptom analysis using multi-class classification achieving 92% accuracy on test data","Intelligent specialist referral matching with confidence scoring and geographic proximity","Patient history tracking with longitudinal health records and PDF export","End-to-end encrypted data storage with role-based access control","Real-time consultation scheduling with partnered specialists and calendar integration","Offline diagnostic mode using TensorFlow Lite on-device inference","Healthcare analytics dashboard with trend visualization and disease outbreak detection"]',
  '["Frontend: Flutter cross-platform mobile application (Android + iOS) with Material Design 3","Backend API: Python FastAPI server with asynchronous request handling","ML Pipeline: TensorFlow Lite models served via FastAPI, with on-device fallback","Database: PostgreSQL with pgcrypto extension for encrypted health records","Authentication: JWT-based with role-based access (patient, doctor, admin)","Caching: Redis for frequently accessed medical reference data","Storage: AWS S3-compatible for medical imaging and document uploads"]',
  '["Flutter","Dart","Python","FastAPI","TensorFlow Lite","PostgreSQL","JWT","Redis","Docker"]',
  '[{"phase":"Research & Planning","period":"Aug 2025 – Oct 2025","details":["Literature review of medical AI systems","Requirement gathering with healthcare professionals","Dataset collection and preprocessing","Technology stack evaluation and prototyping"]},{"phase":"ML Model Development","period":"Oct 2025 – Jan 2026","details":["Dataset cleaning and augmentation","Multi-class classification model training","Hyperparameter optimization","Model evaluation: 92% accuracy, 0.89 F1 score","TensorFlow Lite conversion for mobile deployment"]},{"phase":"Backend Development","period":"Nov 2025 – Feb 2026","details":["FastAPI REST API design and implementation","PostgreSQL schema design with encryption","JWT authentication and role-based access","Redis caching layer integration","API documentation with Swagger/OpenAPI"]},{"phase":"Mobile Development","period":"Dec 2025 – Mar 2026","details":["Flutter app architecture and state management","Symptom input UI with voice-to-text support","Diagnosis results and specialist recommendation UI","Appointment scheduling and calendar views","Offline mode implementation with local SQLite"]},{"phase":"Testing & Deployment","period":"Mar 2026 – Present","details":["Unit and integration testing (80%+ coverage)","User acceptance testing with clinic staff","Performance optimization and load testing","Docker containerization","CI/CD pipeline setup with GitHub Actions"]}]',
  '[{"problem":"Achieving high diagnostic accuracy with limited medical datasets","solution":"Used transfer learning from a large general medical corpus, then fine-tuned with the limited available dataset. Applied data augmentation techniques (synthetic symptom variations) and ensemble modeling to improve accuracy from 78% to 92%."},{"problem":"Real-time ML inference on mobile devices with under 200ms latency","solution":"Quantized the TensorFlow Lite model to INT8 precision, reducing model size from 120MB to 18MB. Implemented a tiered inference approach: on-device for common diagnoses, cloud model for complex cases."},{"problem":"Designing secure health data storage compliant with regulations","solution":"Implemented AES-256 encryption at rest using PostgreSQL pgcrypto. Used separate encryption keys per patient record with a master key hierarchy. All API communications use TLS 1.3."},{"problem":"Handling diverse symptom descriptions with varying medical terminology","solution":"Built a custom symptom normalization pipeline that maps colloquial descriptions to standardized medical terminology using a combination of NLP processing and a curated medical dictionary."}]',
  '["ML model achieved 92% diagnostic accuracy on held-out test data","Reduced simulated patient referral time from weeks to under 5 minutes","Successfully classified 45+ common medical conditions across 7 specialties","Mobile app maintains stable 60fps UI performance on mid-range devices","Offline mode supports diagnosis for 20 most common conditions without internet","Successfully passed university capstone evaluation with distinction"]',
  'https://github.com/Mehtab20/final_year_project',
  null,
  true, 1
),
(
  'Gohar Medical Trust',
  'gohar',
  'Hospital & Trust Management System',
  '/assets/project-gohar.svg',
  'from-violet-500/20 via-purple-500/10 to-transparent',
  'Production',
  '#8b5cf6',
  '2024–2025',
  'Full Stack Developer',
  'A comprehensive hospital and trust management system designed for Gohar Medical Trust. The platform digitizes patient registration, appointment scheduling, pharmacy inventory, billing, donor management, and trust fund accounting — serving 500+ daily patients across multiple departments.',
  'Gohar Medical Trust operated primarily on paper-based systems. Patient records were stored in physical files, appointments were managed through manual logbooks, and pharmacy inventory was tracked through spreadsheets. This led to lost records, scheduling conflicts, inventory mismanagement, and significant delays in patient care.',
  'I was introduced to the administration of Gohar Medical Trust through a family connection who recognized the inefficiencies in their manual systems. After conducting a two-week on-site assessment, I proposed a comprehensive digital transformation plan. The project was approved and funded by the trust board, with a six-month development timeline and a three-month phased rollout.',
  '["Digitize 10,000+ existing patient records with minimal disruption to ongoing operations","Reduce patient registration time from 15 minutes to under 3 minutes","Eliminate double-booking in appointment scheduling","Provide real-time pharmacy inventory tracking with automated low-stock alerts","Implement transparent donor fund tracking with detailed reporting","Create role-based dashboards for different hospital staff categories"]',
  '["Patient registration with unique QR-code based medical records for instant lookup","Appointment scheduling with conflict detection and auto-notifications (SMS + Email)","Pharmacy inventory management with expiry tracking, low-stock alerts, and purchase order generation","Billing and insurance claim processing with automated reconciliation and receipt generation","Donor management system with fund allocation tracking, tax receipt generation, and impact reporting","Multi-role dashboard (admin, doctor, pharmacist, accountant, receptionist) with granular permissions","Real-time bed availability tracking with department-wise occupancy monitoring","Automated SMS and email notifications for appointment reminders and payment due dates"]',
  '["Mobile App: Flutter for patient-facing services (registration, appointments, prescriptions)","Web Dashboard: React (Vite) for hospital administration and real-time monitoring","Backend API: Node.js/Express with RESTful architecture and middleware pipeline","Database: PostgreSQL with optimized indexing for fast patient lookups","Caching: Redis for appointment slot management (handles 500+ concurrent requests)","Real-time: Supabase Realtime subscriptions for live bed availability and ER status updates","Notifications: Twilio SMS API + Nodemailer for email notifications"]',
  '["Flutter","Dart","React","Vite","Node.js","Express","PostgreSQL","Redis","Supabase","Twilio"]',
  '[{"phase":"Requirements & Design","period":"Jun 2024 – Aug 2024","details":["On-site workflow assessment at Gohar Medical Trust","Stakeholder interviews with 15+ staff members","Process mapping of patient journey from registration to discharge","UI/UX wireframing and prototyping","Database schema design and ER modeling"]},{"phase":"Core Development","period":"Aug 2024 – Nov 2024","details":["Backend API development with Express and PostgreSQL","Patient registration and records management module","Appointment scheduling system with conflict detection","Billing and payment processing module","Multi-role authentication and authorization system"]},{"phase":"Pharmacy & Finance","period":"Nov 2024 – Jan 2025","details":["Pharmacy inventory management system","Stock level tracking with automated reorder points","Donor management and trust fund accounting","Financial reporting and audit trail implementation","Integration with billing module for prescription charges"]},{"phase":"Testing & Training","period":"Jan 2025 – Mar 2025","details":["System integration testing with real patient data","Performance testing under 500+ concurrent user load","Staff training sessions (40+ hospital employees trained)","Parallel run with paper system for validation","Bug fixes and performance optimization"]},{"phase":"Go-Live & Support","period":"Mar 2025 – Present","details":["Phased rollout starting with reception department","Real-time monitoring and hotfix support","User feedback collection and feature refinement","Monthly system audits and performance reviews"]}]',
  '[{"problem":"Handling 500+ concurrent users during peak morning clinic hours","solution":"Implemented a multi-tier caching strategy with Redis for appointment slots and frequently accessed reference data. The system maintained sub-200ms response times during peak loads."},{"problem":"Migrating 10,000+ paper-based patient records to digital format","solution":"Designed a phased migration strategy. Created a data entry interface optimized for rapid input. Completed migration in 6 weeks with 99.2% accuracy."},{"problem":"Designing fault-tolerant appointment booking with double-booking prevention","solution":"Used Redis distributed locks with automatic expiry for appointment slot reservation. Implemented optimistic concurrency control with clear conflict messaging."},{"problem":"Staff resistance to technology adoption","solution":"Conducted hands-on training workshops tailored to each role. Designated a digital champion in each department for first-line support."}]',
  '["500+ daily patients served through the system with zero downtime","Patient registration time reduced from 15 minutes to 2.5 minutes (83% improvement)","Double-booking completely eliminated — zero scheduling conflicts since go-live","Pharmacy stock-outs reduced by 60% through automated low-stock alerts","Donor contributions increased 35% after implementing transparent fund tracking","99.9% uptime since production deployment in March 2025"]',
  'https://github.com/Mehtab20',
  null,
  true, 2
),
(
  'AI SaaS Starter Kit',
  'saas',
  'Production-Ready AI SaaS Foundation',
  '/assets/project-saas.png',
  'from-cyan-500/20 via-teal-500/10 to-transparent',
  'Open Source',
  '#06b6d4',
  '2026',
  'Creator & Architect',
  'A commercial-grade AI SaaS starter kit designed to accelerate building AI-powered applications. Features complete authentication (email, Google OAuth), subscription management, AI chat with multi-provider support, admin panel, analytics dashboard, and a premium portfolio landing page — all production-ready.',
  'Starting a new AI SaaS project involves weeks of boilerplate setup: authentication flows, database integration, subscription billing, admin panels, and UI design. Most starter kits either focus on backend infrastructure or provide generic templates that require extensive customization.',
  'After building multiple SaaS applications from scratch, I recognized the repeated patterns across projects: auth, payments, admin panels, and AI integration. I decided to create a comprehensive starter kit that encapsulates these patterns into a clean, well-documented codebase.',
  '["Provide a complete, production-ready auth system (email/password + Google OAuth + password reset)","Build a provider-agnostic AI chat abstraction supporting 5+ AI providers","Create a reusable admin dashboard with user management and analytics","Design a premium marketing landing page that doubles as a portfolio","Implement subscription management with Stripe-ready architecture","Achieve zero-warning production build with optimal bundle size"]',
  '["Multi-provider AI abstraction layer (OpenAI, Gemini, Anthropic, Groq, OpenRouter) with streaming and conversation management","Complete auth system: email/password signup, Google OAuth, password reset with Supabase Auth","Role-based access control (user/admin) with AuthGuard and AdminGuard route protection wrappers","Subscription management with 3 pricing tiers (Free, Pro $29/mo, Enterprise $99/mo) and Stripe-ready architecture","Admin dashboard with user management table, role assignment, and system metrics","Analytics page with Recharts (bar, line, pie charts) for usage and growth data","AI Chat interface with streaming responses, conversation history, and 5+ provider switching","Premium portfolio landing page with pricing, testimonials, FAQ, blog, and projects sections"]',
  '["React 19 + Vite 8 + Tailwind CSS 4 frontend SPA with route-level code splitting","Supabase PostgreSQL database with Row Level Security policies and auto-profile creation trigger","Provider abstraction design pattern — each AI provider implements a common interface","React.lazy + Suspense for route-level code splitting — separate chunks for auth, dashboard, admin, and landing","Dark/light theme engine with 50+ CSS custom properties — CSS variable-based theming with smooth transitions","ErrorBoundary at root level to prevent white-screen crashes with recovery UI","Scroll reveal animation system using IntersectionObserver with staggered delays"]',
  '["React 19","Vite 8","Tailwind CSS 4","Supabase","Stripe","Recharts","React Router 7","Framer Motion"]',
  '[{"phase":"Foundation & Auth","period":"Jul 2026 (Week 1–2)","details":["React + Vite project scaffolding","Supabase client integration and database schema design","AuthContext with email/password, Google OAuth, and password reset","AuthGuard and AdminGuard route protection components","Profile auto-creation trigger and RBAC implementation"]},{"phase":"Dashboard & Admin","period":"Jul 2026 (Week 2–3)","details":["DashboardLayout with responsive sidebar navigation","User dashboard with stats cards and quick actions","Admin dashboard with user management table","Analytics page with Recharts (revenue, users, growth charts)","Profile and Settings pages with editable fields"]},{"phase":"AI Integration","period":"Jul 2026 (Week 3–4)","details":["Provider abstraction layer design and implementation","OpenAI, Anthropic, Gemini, Groq, OpenRouter provider configurations","Streaming response handling with ReadableStream","Conversation history management with 50-message limit","Provider status UI showing configured vs available providers"]},{"phase":"Landing & Polish","period":"Jul 2026 (Week 4–5)","details":["Premium portfolio components (Hero, About, Skills, Projects)","Pricing section with 3 tiers","Testimonials, FAQ, Blog preview sections","Aurora background canvas animation","Scroll reveal animations, Google Fonts (Outfit + Fira Code)","SEO meta tags, Open Graph, Twitter Cards, sitemap.xml"]},{"phase":"QA & Optimization","period":"Jul 2026 (Week 5–6)","details":["Code splitting with React.lazy (669 modules, 808ms build)","ErrorBoundary and NotFound 404 page","Input validation and XSS sanitization utilities","prefers-reduced-motion accessibility support","ARIA labels and keyboard navigation","Vite chunk optimization for production bundle"]}]',
  '[{"problem":"Designing a provider-agnostic AI abstraction that supports 5+ providers with completely different APIs","solution":"Created a common provider interface with methods (headers, buildBody, parseResponse, parseStream, urlSuffix) that each provider implements independently. This pattern allows adding a new provider in under 50 lines of code."},{"problem":"Building a complete design system from scratch supporting both dark and light themes","solution":"Created a CSS custom properties architecture with 50+ tokens organized by category (backgrounds, text, borders, surfaces, glows). Every component references theme variables rather than hardcoded colors."},{"problem":"Implementing secure auth flow with Supabase including email confirmation and OAuth integration","solution":"Used Supabase Auth API with proper error handling and user feedback. Implemented auto-profile creation via PostgreSQL trigger on auth.users insert."}]',
  '["Production build completes in 808ms with zero errors and zero warnings","Code splitting produces 6 optimized chunks (vendors, auth, dashboard, admin, landing)","AI abstraction layer supports 5 providers with complete test coverage","Successfully handles auth flows: signup, login, Google OAuth, password reset, session management","Dark/light theme with 50+ CSS custom properties applied across 20+ components","Complete documentation (DOCS.md) with architecture, deployment, and development guides"]',
  'https://github.com/Mehtab20/MyPortfolio',
  null,
  true, 3
),
(
  'Personal Portfolio',
  'portfolio',
  'Premium Developer Portfolio & Case Study',
  '/assets/project-portfolio.png',
  'from-emerald-500/20 via-teal-500/10 to-transparent',
  'Live',
  '#10b981',
  '2026',
  'Designer & Developer',
  'This very portfolio — a meticulously crafted showcase of engineering excellence. Built with React 19, Vite, and Tailwind CSS, featuring an animated aurora background, 3D tilt profile, typing animation, animated counters, and a comprehensive dark/light design system.',
  'As a software engineering student, I needed a portfolio that demonstrated both technical proficiency and design sensibility. Most developer portfolios either look generic (using templates) or focus solely on functionality without visual polish.',
  'This portfolio evolved organically from a simple HTML/CSS page into a comprehensive React application. As I learned new technologies, I incorporated them into the portfolio. When I started building the AI SaaS Starter Kit, the portfolio naturally expanded to include more sections.',
  '["Create a visually stunning portfolio that reflects premium design sensibilities","Demonstrate proficiency in React 19, modern CSS, and animation techniques","Include detailed case studies for each project with architecture and challenges","Maintain excellent performance with optimized bundle and smooth 60fps animations","Ensure full accessibility with WCAG 2.2 AA compliance","Integrate with Supabase for contact form persistence and dynamic content"]',
  '["GPU-accelerated animated aurora background using Canvas API (stable 60fps on all devices)","3D perspective tilt profile photo with glowing gradient border and pulse animation","Multi-role typewriter animation cycling through 4 roles with blinking cursor effect","Scroll-triggered animated stat counters with IntersectionObserver and ease-out timing","Complete dark/light theme with 50+ CSS custom properties and smooth 400ms transitions","Responsive mobile-first design scaling from 320px to 2560px viewports","Expandable project case studies with animated staggered feature/challenge listings","Contact form with Supabase persistence, validation, success/error feedback, and rate limiting"]',
  '["React 19 functional components with hooks (useState, useEffect, useCallback, useMemo)","Custom IntersectionObserver-based scroll reveal animation system with staggered variants","CSS custom properties architecture with 50+ tokens for complete dynamic theming","Canvas-based aurora background animation with requestAnimationFrame loop","Supabase PostgreSQL for contact form persistence, user profiles, and dynamic project data","Framer Motion for enhanced animation physics on project cards","React.lazy code splitting with Suspense boundaries for each major route section"]',
  '["React 19","Vite 8","Tailwind CSS 4","Supabase","Framer Motion","JavaScript (ES6+)"]',
  '[{"phase":"Initial Design & Structure","period":"Early 2026","details":["Designed information architecture and section hierarchy","Created dark theme with warm gold accent palette (later migrated to teal/cyan)","Built responsive layout with Tailwind CSS utility classes","Implemented glassmorphism design system with backdrop-filter"]},{"phase":"Animation & Interactivity","period":"Mid 2026","details":["Developed custom animation hooks (useTypewriter, useTilt, useCountUp)","Created Canvas-based aurora background animation","Added scroll reveal animation system with IntersectionObserver","Built premium button micro-interactions with hover/active states"]},{"phase":"SaaS Platform Conversion","period":"Jul 2026 (Week 1–2)","details":["Integrated React Router with 12+ routes","Built complete auth system with Supabase (login, signup, forgot password)","Created dashboard layout with responsive sidebar","Developed AI Chat interface with multi-provider support","Built admin dashboard with user management and analytics"]},{"phase":"Portfolio Refinement","period":"Jul 2026 (Week 3–4)","details":["Redesigned Hero with code-style role badge and refined stats","Converted About to personal info grid layout","Replaced progress bar skills with emoji tech grid","Created Career Journey timeline combining work + education","Added Certifications section with professional growth stats"]},{"phase":"Projects & Polish","period":"Jul 2026 (Week 5–6)","details":["Added 4 real projects with professional case studies (16 sections each)","Integrated Framer Motion for enhanced card animations","Upgraded all placeholder images to detailed UI mockups","Completed full color migration from gold to teal/cyan aesthetic","Performed CTO-level code audit fixing 18 issues"]}]',
  '[{"problem":"Creating a performant canvas animation that runs at 60fps without impacting scroll performance","solution":"Used requestAnimationFrame with delta-time normalization. Applied GPU acceleration via will-change and transform: translateZ(0). Minimized canvas redraws by only updating the alpha channel."},{"problem":"Building a complete design system that looks premium in both dark and light modes","solution":"Created a comprehensive CSS custom properties architecture with 50+ tokens covering backgrounds, text colors, borders, glows, shadows, scrollbars, and selection colors."},{"problem":"Achieving zero-build-error production bundle with optimized code splitting","solution":"Implemented React.lazy and Suspense for route-level code splitting with separate bundles for landing, auth, dashboard, and admin sections."}]',
  '["Production build: 669 modules, 808ms build time, zero errors, zero warnings","Perfect 100 Lighthouse scores in Performance, Accessibility, Best Practices, SEO","6 optimized code-split chunks for optimal loading performance","Complete dark/light theme with 50+ CSS tokens applied across 25+ components","Canvas aurora background maintains stable 60fps with zero scroll jank","Fully responsive from 320px mobile to 2560px desktop displays"]',
  'https://github.com/Mehtab20/MyPortfolio',
  null,
  true, 4
);

-- ── 5. EXPERIENCE ────────────────────────────────────────────
INSERT INTO cms_experience (type, title, organization, period, description, highlights, sort_order) VALUES
('work', 'Freelance Full Stack Developer', 'Self-Employed', '2024 – Present',
  'Building web and mobile applications for clients using React, Flutter, Node.js, and cloud deployment.',
  '["Delivered 5+ production applications","Cloud deployment on Vercel & Netlify","Full-stack architecture & API design"]', 1),
('education', 'B.Sc. Software Engineering', 'Iqra University, Islamabad Campus', '2022 – Present (Expected 2026)',
  'Pursuing a degree in Software Engineering with a focus on cloud computing, HCI, and modern software architecture.',
  '["8+ CGPA Maintained","Active in tech community & events","Relevant coursework: DSA, DBMS, HCI, Design Patterns"]', 2),
('education', 'Intermediate in Computer Science', 'Punjab College, Rawalpindi', '2020 – 2022',
  'Completed intermediate education with a focus on computer science fundamentals.',
  '["Strong foundation in programming","Developed interest in software development","Built first programming projects"]', 3);

-- ── 6. CERTIFICATIONS ────────────────────────────────────────
INSERT INTO cms_certifications (title, issuer, year, icon, sort_order) VALUES
('Google Cloud Digital Leader', 'Google Cloud', '2025', '☁️', 1),
('AWS Cloud Practitioner', 'Amazon Web Services', '2025', '📘', 2),
('Meta Front-End Developer', 'Meta (Coursera)', '2024', '⚛️', 3),
('GitHub Actions & CI/CD', 'GitHub', '2024', '🔄', 4);

-- ── 7. CONTACT ───────────────────────────────────────────────
INSERT INTO cms_contact (id, email, phone, location, portfolio_url, social_links)
VALUES (1,
  'mehtabakbar5656@gmail.com',
  '+92 340 8575834',
  'Rawalpindi, Punjab, Pakistan',
  'https://mehtabakbar.com',
  '[{"label":"LinkedIn","icon":"linkedin","url":"https://linkedin.com/in/mehtab-akbar-385024267"},{"label":"GitHub","icon":"github","url":"https://github.com/Mehtab20"}]'
)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  phone = EXCLUDED.phone,
  location = EXCLUDED.location,
  portfolio_url = EXCLUDED.portfolio_url,
  social_links = EXCLUDED.social_links;

-- ── 8. SEO ───────────────────────────────────────────────────
INSERT INTO cms_seo (id, site_title, site_description, keywords, favicon)
VALUES (1,
  'Mehtab Akbar - Software Engineer',
  'Full-Stack Software Engineer specializing in AI-powered healthcare systems, cloud computing, and scalable SaaS platforms. Explore projects, certifications, and get in touch.',
  'software engineer, react developer, flutter, AI healthcare, cloud computing, portfolio, Mehtab Akbar',
  '/favicon.svg'
)
ON CONFLICT (id) DO UPDATE SET
  site_title = EXCLUDED.site_title,
  site_description = EXCLUDED.site_description,
  keywords = EXCLUDED.keywords;

-- ── 9. SETTINGS ──────────────────────────────────────────────
INSERT INTO cms_settings (id, site_name, enable_animations, enable_blog, enable_contact_form, maintenance_mode)
VALUES (1, 'Mehtab Akbar', true, false, true, false)
ON CONFLICT (id) DO UPDATE SET
  site_name = EXCLUDED.site_name,
  enable_animations = EXCLUDED.enable_animations,
  enable_blog = EXCLUDED.enable_blog,
  enable_contact_form = EXCLUDED.enable_contact_form;

-- ── 10. RESUME ───────────────────────────────────────────────
INSERT INTO cms_resume (id, pdf_url, sections)
VALUES (1, '/resume.pdf', '[]')
ON CONFLICT (id) DO UPDATE SET
  pdf_url = EXCLUDED.pdf_url;
