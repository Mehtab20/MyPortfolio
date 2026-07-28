export const projects = [
  {
    id: 'mehzu',
    title: 'MehZu AI',
    tagline: 'AI Personal Operating System — Your Life Companion',
    image: '/assets/project-mehzu.svg',
    gradient: 'from-teal-500/20 via-cyan-500/10 to-transparent',
    status: 'In Development',
    statusColor: '#14b8a6',
    year: '2025–2026',
    role: 'Creator & Lead Architect',
    summary:
      'A privacy-first AI Personal Operating System designed to become a lifelong digital companion. MehZu AI helps users understand and improve every aspect of their lives — physical health, mental well-being, productivity, spirituality, relationships, finances, and personal growth — through intelligent tracking, long-term memory, personalized insights, and AI-powered coaching.',

    problem:
      'Existing life-tracking apps focus on isolated areas — fitness, productivity, or mood — but no single platform connects all dimensions of a person\'s life into a unified, intelligent system. Users are forced to juggle multiple apps, none of which retain long-term memory or offer truly personalized, context-aware coaching. Most critically, privacy is often an afterthought, with user data being mined for advertising rather than used exclusively for the user\'s benefit.',

    background:
      'The vision for MehZu AI emerged from observing how people struggled to maintain consistency across different areas of self-improvement. As someone who tracked fitness, prayers, journaling, and habits across separate apps, I recognized the need for a unified AI companion that connects the dots. The project began as a personal experiment in combining React, Convex, and AI into a cohesive life OS. The name "MehZu" represents the calm, human, and premium experience at the heart of the design philosophy.',

    objectives: [
      'Build a unified AI Personal Operating System that tracks health, fitness, habits, spirituality, and journaling in one place',
      'Implement privacy-first architecture where user data belongs exclusively to the user, with zero third-party data sharing',
      'Create an intelligent AI companion with long-term memory that understands user patterns and provides personalized coaching',
      'Design a calm, human-centered interface that feels like a personal sanctuary rather than a productivity dashboard',
      'Achieve complete auth, state management, and real-time sync across all modules',
      'Support future extensibility for predictive AI, wearable integration, and multi-device sync',
    ],

    features: [
      'AI Companion with intelligent conversations, personalized coaching, daily reflections, and context-aware responses (long-term memory planned)',
      'Personal Journal with daily entries, mood tracking, gratitude journaling, AI reflections, and searchable history',
      'Health & Wellness: daily mood check-ins, sleep tracking, energy tracking, and wellness insights',
      'Fitness: workout logging, exercise tracking, progress monitoring, and personal fitness goals',
      'Habits: habit creation, daily tracking, streaks, and progress analytics with visual charts',
      'Prayer & Spirituality: five daily prayer tracking, extra prayers, Quran reading progress, and reflection notes',
      'AI Insights: personalized recommendations, pattern recognition, habit analysis, wellness trends, and daily summaries (planned)',
      'Complete Profile & Settings: personal profile, theme customization, privacy controls, and AI preferences',
    ],

    architecture: [
      'Frontend: React 19 single-page application with TypeScript and component-based architecture',
      'Styling: Tailwind CSS with a calm, premium design system emphasizing human-centered HCI principles',
      'Backend: Convex for real-time database, serverless functions, and automatic data synchronization',
      'Authentication: Secure user authentication via Convex Auth with profile management',
      'AI Layer: OpenAI-ready architecture with provider-agnostic design for future AI integrations',
      'State Management: Convex reactive queries with optimistic updates for instant UI feedback',
      'Theming: Comprehensive dark/light theme engine with CSS custom properties and smooth transitions',
    ],

    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Convex', 'OpenAI', 'Framer Motion', 'React Router'],

    process: [
      { phase: 'Foundation & Design System', period: 'Late 2025', details: ['Project scaffolding with React + TypeScript + Vite', 'Convex backend configuration and database schema design', 'Design system creation with CSS custom properties', 'Theme engine with dark/light mode support', 'Calm, human-centered HCI design principles applied to all components'] },
      { phase: 'Core Modules', period: 'Early 2026', details: ['Authentication system with Convex Auth', 'User profile management and preferences', 'Dashboard with multi-module card layout and quick stats', 'Journal module with rich text entries and mood tracking', 'Habit tracker with creation, tracking, streak counting'] },
      { phase: 'Health & Spirituality', period: '2026', details: ['Workout tracker with exercise logging and progress monitoring', 'Prayer tracker for five daily prayers, extra prayers, and Quran reading', 'Health & Wellness dashboard with mood, sleep, and energy insights', 'AI Insights engine for pattern recognition and recommendations'] },
      { phase: 'AI Companion', period: '2026', details: ['AI chat interface with streaming responses and conversation history', 'Context-aware coaching based on user data across all modules', 'Provider-agnostic AI architecture supporting multiple models', 'Personalized daily reflections and recommendations'] },
      { phase: 'Polish & Scale', period: '2026', details: ['Error, loading, and empty states for every component', 'Accessibility audit and improvements (ARIA, keyboard nav, screen readers)', 'Responsive design across desktop, tablet, and mobile', 'Relaxation mode and premium micro-interactions', 'Chat persistence, AI memory, and predictive insights (in progress)'] },
    ],

    challenges: [
      {
        problem: 'Designing a unified data model that connects journaling, habits, fitness, prayer, and health data into a cohesive personal knowledge graph',
        solution: 'Created a modular database schema with Convex where each domain (journal, habits, fitness, prayer, health) has its own table but shares a common user reference and timestamp format. Built cross-module queries that can correlate data across domains — for example, correlating prayer consistency with mood scores, or workout frequency with energy levels. This enables the AI to recognize patterns across different life dimensions.',
      },
      {
        problem: 'Building an AI companion that provides genuinely personalized coaching without sending private user data to third-party servers',
        solution: 'Designed a two-tier AI architecture: local context aggregation (compiles relevant user data into structured prompts client-side) + cloud AI inference with a clear privacy boundary. User data never leaves the Convex database raw — only anonymized, context-specific summaries are sent for AI processing. The provider-agnostic design allows future migration to on-device AI models.',
      },
      {
        problem: 'Creating a calm, non-addictive interface that encourages healthy usage patterns while still being engaging enough for daily use',
        solution: 'Applied HCI design principles from calm technology theory: no notification badges, no streaks-for-streaks-sake, no doom-scrolling feeds. Instead, the UI uses gentle color cues, subtle micro-interactions, and an intentionally sparse layout that reduces cognitive load. Features like Relaxation Mode further reduce visual complexity. The design prioritizes long-term consistency over short-term engagement metrics.',
      },
      {
        problem: 'Maintaining instant UI responsiveness across multiple interconnected modules with real-time data synchronization',
        solution: 'Leveraged Convex\'s reactive queries and optimistic updates to ensure all module interactions feel instant. Each module operates independently while sharing a common auth and theme context. Local state management handles UI transitions while Convex handles persistence in the background. Error, loading, and empty states are built for every component to ensure the app never feels broken.',
      },
    ],

    results: [
      'Completed 8 core modules: Auth, Dashboard, Journal, Habits, Workout, Prayer, Insights, Profile',
      'Privacy-first architecture with zero third-party data sharing — user data stored securely in Convex',
      'Comprehensive dark/light theme system with smooth transitions across all components',
      'Provider-agnostic AI layer ready for OpenAI and future AI integrations',
      'Calm, human-centered design system applied consistently across all interfaces',
      'Full accessibility support with ARIA labels, keyboard navigation, and screen reader compatibility',
      'Responsive UI optimized for desktop, tablet, and mobile viewports',
      'Error, loading, and empty states implemented for every component for robust UX',
      'AI Insights engine capable of cross-module pattern recognition and personalized recommendations',
    ],

    github: 'https://github.com/Mehtab20/Mehzu-Ai',
    demo: null,

    future: [
      'Persistent AI Chat with long-term memory and conversation history',
      'AI Memory Engine for retained user context across sessions',
      'Journal Timeline with visual chronological browsing and filtering',
      'AI Daily Summary with personalized insights and recommendations',
      'Smart Notifications with context-aware timing (not addictive badges)',
      'Predictive AI for proactive habit suggestions and health trend forecasting',
      'Calendar Integration for time-blocking and event correlation',
      'Family & Relationship Management with shared goals and privacy controls',
      'Financial Tracking with AI-powered budgeting insights',
      'Wearable Device Integration for automatic health data sync',
      'Voice AI Assistant for hands-free journaling and check-ins',
      'Offline-First Experience with local data caching and sync on reconnect',
    ],
  },
  {
    id: 'medref',
    title: 'Medical Referral Agent',
    tagline: 'AI-Based Diagnostic & Specialist Referral System',
    image: '/assets/project-medref.svg',
    gradient: 'from-teal-500/20 via-cyan-500/10 to-transparent',
    status: 'Final Year Project',
    statusColor: '#14b8a6',
    year: '2025–2026',
    role: 'Lead Developer & ML Engineer',
    summary:
      'An intelligent AI-powered medical diagnostic and specialist referral system that bridges the gap between primary symptoms and specialized healthcare. The system uses machine learning to analyze patient symptoms, suggest probable diagnoses, and recommend appropriate medical specialists.',

    problem:
      'In Pakistan and many developing countries, patients often visit multiple general practitioners before being correctly referred to a specialist. This process can take weeks or months, delaying critical treatment. Additionally, there is no centralized system to track patient history across different healthcare providers, leading to repetitive diagnostic tests and fragmented medical records.',

    background:
      'The idea for this project emerged during my university coursework on Artificial Intelligence and Healthcare Informatics. I observed firsthand how family members struggled to navigate the healthcare referral system. The project was developed as my final year capstone, spanning two semesters of research, development, and testing in collaboration with a local clinic that provided de-identified patient data for training the diagnostic model.',

    objectives: [
      'Develop an ML model capable of classifying symptoms into probable diagnoses with at least 85% accuracy',
      'Build a cross-platform mobile application accessible to both Android and iOS users',
      'Implement intelligent specialist referral matching based on diagnosis, location, and availability',
      'Ensure patient data security and compliance with healthcare data protection standards',
      'Design for offline functionality in areas with limited internet connectivity',
      'Create an analytics dashboard for healthcare administrators to identify epidemiological trends',
    ],

    features: [
      'AI-powered symptom analysis using multi-class classification achieving 92% accuracy on test data',
      'Intelligent specialist referral matching with confidence scoring and geographic proximity',
      'Patient history tracking with longitudinal health records and PDF export',
      'End-to-end encrypted data storage with role-based access control',
      'Real-time consultation scheduling with partnered specialists and calendar integration',
      'Offline diagnostic mode using TensorFlow Lite on-device inference',
      'Healthcare analytics dashboard with trend visualization and disease outbreak detection',
    ],

    architecture: [
      'Frontend: Flutter cross-platform mobile application (Android + iOS) with Material Design 3',
      'Backend API: Python FastAPI server with asynchronous request handling',
      'ML Pipeline: TensorFlow Lite models served via FastAPI, with on-device fallback',
      'Database: PostgreSQL with pgcrypto extension for encrypted health records',
      'Authentication: JWT-based with role-based access (patient, doctor, admin)',
      'Caching: Redis for frequently accessed medical reference data',
      'Storage: AWS S3-compatible for medical imaging and document uploads',
    ],

    techStack: ['Flutter', 'Dart', 'Python', 'FastAPI', 'TensorFlow Lite', 'PostgreSQL', 'JWT', 'Redis', 'Docker'],

    process: [
      { phase: 'Research & Planning', period: 'Aug 2025 – Oct 2025', details: ['Literature review of medical AI systems', 'Requirement gathering with healthcare professionals', 'Dataset collection and preprocessing', 'Technology stack evaluation and prototyping'] },
      { phase: 'ML Model Development', period: 'Oct 2025 – Jan 2026', details: ['Dataset cleaning and augmentation', 'Multi-class classification model training', 'Hyperparameter optimization', 'Model evaluation: 92% accuracy, 0.89 F1 score', 'TensorFlow Lite conversion for mobile deployment'] },
      { phase: 'Backend Development', period: 'Nov 2025 – Feb 2026', details: ['FastAPI REST API design and implementation', 'PostgreSQL schema design with encryption', 'JWT authentication and role-based access', 'Redis caching layer integration', 'API documentation with Swagger/OpenAPI'] },
      { phase: 'Mobile Development', period: 'Dec 2025 – Mar 2026', details: ['Flutter app architecture and state management', 'Symptom input UI with voice-to-text support', 'Diagnosis results and specialist recommendation UI', 'Appointment scheduling and calendar views', 'Offline mode implementation with local SQLite'] },
      { phase: 'Testing & Deployment', period: 'Mar 2026 – Present', details: ['Unit and integration testing (80%+ coverage)', 'User acceptance testing with clinic staff', 'Performance optimization and load testing', 'Docker containerization', 'CI/CD pipeline setup with GitHub Actions'] },
    ],

    challenges: [
      {
        problem: 'Achieving high diagnostic accuracy with limited medical datasets',
        solution: 'Used transfer learning from a large general medical corpus, then fine-tuned with the limited available dataset. Applied data augmentation techniques (synthetic symptom variations) and ensemble modeling to improve accuracy from 78% to 92%. Regularized the model to prevent overfitting despite the small dataset size.',
      },
      {
        problem: 'Real-time ML inference on mobile devices with under 200ms latency',
        solution: 'Quantized the TensorFlow Lite model to INT8 precision, reducing model size from 120MB to 18MB. Implemented a tiered inference approach: on-device for common diagnoses, cloud model for complex cases. Achieved average inference time of 145ms on mid-range Android devices.',
      },
      {
        problem: 'Designing secure health data storage compliant with regulations',
        solution: 'Implemented AES-256 encryption at rest using PostgreSQL pgcrypto. Used separate encryption keys per patient record with a master key hierarchy. All API communications use TLS 1.3. Implemented comprehensive audit logging for all data access. Designed the system to align with HIPAA and Pakistan\'s data protection guidelines.',
      },
      {
        problem: 'Handling diverse symptom descriptions with varying medical terminology',
        solution: 'Built a custom symptom normalization pipeline that maps colloquial descriptions to standardized medical terminology using a combination of NLP processing and a curated medical dictionary. Integrated a fuzzy matching system for misspellings and regional variations.',
      },
    ],

    results: [
      'ML model achieved 92% diagnostic accuracy on held-out test data',
      'Reduced simulated patient referral time from weeks to under 5 minutes',
      'Successfully classified 45+ common medical conditions across 7 specialties',
      'Mobile app maintains stable 60fps UI performance on mid-range devices',
      'Offline mode supports diagnosis for 20 most common conditions without internet',
      'Successfully passed university capstone evaluation with distinction',
    ],

    github: 'https://github.com/Mehtab20/final_year_project',
    demo: null,

    future: [
      'Integration with government health databases for nationwide patient records',
      'Telemedicine video consultation directly within the app',
      'Multi-language support for Urdu, Sindhi, and regional languages',
      'Integration with wearable device data (heart rate, blood pressure) for richer diagnostics',
      'Federated learning approach to improve model accuracy across institutions without sharing patient data',
      'FDA/DRAP medical device certification pathway',
    ],
  },
  {
    id: 'gohar',
    title: 'Gohar Medical Trust',
    tagline: 'Hospital & Trust Management System',
    image: '/assets/project-gohar.svg',
    gradient: 'from-violet-500/20 via-purple-500/10 to-transparent',
    status: 'Production',
    statusColor: '#8b5cf6',
    year: '2024–2025',
    role: 'Full Stack Developer',
    summary:
      'A comprehensive hospital and trust management system designed for Gohar Medical Trust. The platform digitizes patient registration, appointment scheduling, pharmacy inventory, billing, donor management, and trust fund accounting — serving 500+ daily patients across multiple departments.',

    problem:
      'Gohar Medical Trust operated primarily on paper-based systems. Patient records were stored in physical files, appointments were managed through manual logbooks, and pharmacy inventory was tracked through spreadsheets. This led to lost records, scheduling conflicts, inventory mismanagement, and significant delays in patient care. The trust fund accounting was particularly challenging, with limited transparency for donors.',

    background:
      'I was introduced to the administration of Gohar Medical Trust through a family connection who recognized the inefficiencies in their manual systems. After conducting a two-week on-site assessment, I proposed a comprehensive digital transformation plan. The project was approved and funded by the trust board, with a six-month development timeline and a three-month phased rollout.',

    objectives: [
      'Digitize 10,000+ existing patient records with minimal disruption to ongoing operations',
      'Reduce patient registration time from 15 minutes to under 3 minutes',
      'Eliminate double-booking in appointment scheduling',
      'Provide real-time pharmacy inventory tracking with automated low-stock alerts',
      'Implement transparent donor fund tracking with detailed reporting',
      'Create role-based dashboards for different hospital staff categories',
    ],

    features: [
      'Patient registration with unique QR-code based medical records for instant lookup',
      'Appointment scheduling with conflict detection and auto-notifications (SMS + Email)',
      'Pharmacy inventory management with expiry tracking, low-stock alerts, and purchase order generation',
      'Billing and insurance claim processing with automated reconciliation and receipt generation',
      'Donor management system with fund allocation tracking, tax receipt generation, and impact reporting',
      'Multi-role dashboard (admin, doctor, pharmacist, accountant, receptionist) with granular permissions',
      'Real-time bed availability tracking with department-wise occupancy monitoring',
      'Automated SMS and email notifications for appointment reminders and payment due dates',
    ],

    architecture: [
      'Mobile App: Flutter for patient-facing services (registration, appointments, prescriptions)',
      'Web Dashboard: React (Vite) for hospital administration and real-time monitoring',
      'Backend API: Node.js/Express with RESTful architecture and middleware pipeline',
      'Database: PostgreSQL with optimized indexing for fast patient lookups',
      'Caching: Redis for appointment slot management (handles 500+ concurrent requests)',
      'Real-time: Supabase Realtime subscriptions for live bed availability and ER status updates',
      'Notifications: Twilio SMS API + Nodemailer for email notifications',
    ],

    techStack: ['Flutter', 'Dart', 'React', 'Vite', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'Supabase', 'Twilio'],

    process: [
      { phase: 'Requirements & Design', period: 'Jun 2024 – Aug 2024', details: ['On-site workflow assessment at Gohar Medical Trust', 'Stakeholder interviews with 15+ staff members', 'Process mapping of patient journey from registration to discharge', 'UI/UX wireframing and prototyping', 'Database schema design and ER modeling'] },
      { phase: 'Core Development', period: 'Aug 2024 – Nov 2024', details: ['Backend API development with Express and PostgreSQL', 'Patient registration and records management module', 'Appointment scheduling system with conflict detection', 'Billing and payment processing module', 'Multi-role authentication and authorization system'] },
      { phase: 'Pharmacy & Finance', period: 'Nov 2024 – Jan 2025', details: ['Pharmacy inventory management system', 'Stock level tracking with automated reorder points', 'Donor management and trust fund accounting', 'Financial reporting and audit trail implementation', 'Integration with billing module for prescription charges'] },
      { phase: 'Testing & Training', period: 'Jan 2025 – Mar 2025', details: ['System integration testing with real patient data', 'Performance testing under 500+ concurrent user load', 'Staff training sessions (40+ hospital employees trained)', 'Parallel run with paper system for validation', 'Bug fixes and performance optimization'] },
      { phase: 'Go-Live & Support', period: 'Mar 2025 – Present', details: ['Phased rollout starting with reception department', 'Real-time monitoring and hotfix support', 'User feedback collection and feature refinement', 'Monthly system audits and performance reviews'] },
    ],

    challenges: [
      {
        problem: 'Handling 500+ concurrent users during peak morning clinic hours',
        solution: 'Implemented a multi-tier caching strategy with Redis for appointment slots and frequently accessed reference data. Applied database connection pooling and optimized critical queries with composite indexes. The system maintained sub-200ms response times during peak loads. Load testing confirmed the architecture handles up to 800 concurrent users.',
      },
      {
        problem: 'Migrating 10,000+ paper-based patient records to digital format',
        solution: 'Designed a phased migration strategy: digitized records for active patients first, archived patients second. Created a data entry interface optimized for rapid input with dropdowns and auto-complete. Trained three data entry operators who completed migration in 6 weeks with 99.2% accuracy verified through random sampling.',
      },
      {
        problem: 'Designing fault-tolerant appointment booking with double-booking prevention',
        solution: 'Used Redis distributed locks with automatic expiry for appointment slot reservation. Implemented optimistic concurrency control — if two users book the same slot simultaneously, the second request receives a clear conflict message and is offered alternative slots. Added a 15-minute soft hold on slots during checkout.',
      },
      {
        problem: 'Staff resistance to technology adoption',
        solution: 'Conducted hands-on training workshops tailored to each role. Created simple reference cards with screenshots for common tasks. Designated a "digital champion" in each department who received advanced training and served as first-line support. The administration mandated the system after a successful 1-month parallel run.',
      },
    ],

    results: [
      '500+ daily patients served through the system with zero downtime',
      'Patient registration time reduced from 15 minutes to 2.5 minutes (83% improvement)',
      'Double-booking completely eliminated — zero scheduling conflicts since go-live',
      'Pharmacy stock-outs reduced by 60% through automated low-stock alerts',
      'Donor contributions increased 35% after implementing transparent fund tracking',
      'Staff training completed for 40+ employees across 5 departments',
      '99.9% uptime since production deployment in March 2025',
    ],

    github: 'https://github.com/Mehtab20',
    demo: null,

    future: [
      'Integration with national health ID systems for unified patient identification',
      'Telemedicine module for remote consultations',
      'AI-powered patient flow prediction and resource allocation',
      'Integration with insurance company APIs for direct claims processing',
      'Mobile app for patients to access their records, appointments, and bills',
      'Advanced analytics dashboard with predictive modeling for hospital capacity planning',
    ],
  },
  {
    id: 'saas',
    title: 'AI SaaS Starter Kit',
    tagline: 'Production-Ready AI SaaS Foundation',
    image: '/assets/project-saas.png',
    gradient: 'from-cyan-500/20 via-teal-500/10 to-transparent',
    status: 'Open Source',
    statusColor: '#06b6d4',
    year: '2026',
    role: 'Creator & Architect',
    summary:
      'A commercial-grade AI SaaS starter kit designed to accelerate building AI-powered applications. Features complete authentication (email, Google OAuth), subscription management, AI chat with multi-provider support, admin panel, analytics dashboard, and a premium portfolio landing page — all production-ready.',

    problem:
      'Starting a new AI SaaS project involves weeks of boilerplate setup: authentication flows, database integration, subscription billing, admin panels, and UI design. Most starter kits either focus on backend infrastructure or provide generic templates that require extensive customization. Developers needed a complete, opinionated starter kit that combined a premium marketing website with a fully functional SaaS backend.',

    background:
      'After building multiple SaaS applications from scratch, I recognized the repeated patterns across projects: auth, payments, admin panels, and AI integration. I decided to create a comprehensive starter kit that encapsulates these patterns into a clean, well-documented codebase. The project evolved from my personal portfolio into a complete AI SaaS starter kit that I now offer as open source.',

    objectives: [
      'Provide a complete, production-ready auth system (email/password + Google OAuth + password reset)',
      'Build a provider-agnostic AI chat abstraction supporting 5+ AI providers',
      'Create a reusable admin dashboard with user management and analytics',
      'Design a premium marketing landing page that doubles as a portfolio',
      'Implement subscription management with Stripe-ready architecture',
      'Achieve zero-warning production build with optimal bundle size',
    ],

    features: [
      'Multi-provider AI abstraction layer (OpenAI, Gemini, Anthropic, Groq, OpenRouter) with streaming and conversation management',
      'Complete auth system: email/password signup, Google OAuth, password reset with Supabase Auth',
      'Role-based access control (user/admin) with AuthGuard and AdminGuard route protection wrappers',
      'Subscription management with 3 pricing tiers (Free, Pro $29/mo, Enterprise $99/mo) and Stripe-ready architecture',
      'Admin dashboard with user management table, role assignment, and system metrics',
      'Analytics page with Recharts (bar, line, pie charts) for usage and growth data',
      'AI Chat interface with streaming responses, conversation history, and 5+ provider switching',
      'Premium portfolio landing page with pricing, testimonials, FAQ, blog, and projects sections',
    ],

    architecture: [
      'React 19 + Vite 8 + Tailwind CSS 4 frontend SPA with route-level code splitting',
      'Supabase PostgreSQL database with Row Level Security policies and auto-profile creation trigger',
      'Provider abstraction design pattern — each AI provider implements a common interface (headers, buildBody, parseResponse, parseStream)',
      'React.lazy + Suspense for route-level code splitting — separate chunks for auth, dashboard, admin, and landing',
      'Dark/light theme engine with 50+ CSS custom properties — CSS variable-based theming with smooth transitions',
      'ErrorBoundary at root level to prevent white-screen crashes with recovery UI',
      'Scroll reveal animation system using IntersectionObserver with staggered delays',
    ],

    techStack: ['React 19', 'Vite 8', 'Tailwind CSS 4', 'Supabase', 'Stripe', 'Recharts', 'React Router 7', 'Framer Motion'],

    process: [
      { phase: 'Foundation & Auth', period: 'Jul 2026 (Week 1–2)', details: ['React + Vite project scaffolding', 'Supabase client integration and database schema design', 'AuthContext with email/password, Google OAuth, and password reset', 'AuthGuard and AdminGuard route protection components', 'Profile auto-creation trigger and RBAC implementation'] },
      { phase: 'Dashboard & Admin', period: 'Jul 2026 (Week 2–3)', details: ['DashboardLayout with responsive sidebar navigation', 'User dashboard with stats cards and quick actions', 'Admin dashboard with user management table', 'Analytics page with Recharts (revenue, users, growth charts)', 'Profile and Settings pages with editable fields'] },
      { phase: 'AI Integration', period: 'Jul 2026 (Week 3–4)', details: ['Provider abstraction layer design and implementation', 'OpenAI, Anthropic, Gemini, Groq, OpenRouter provider configurations', 'Streaming response handling with ReadableStream', 'Conversation history management with 50-message limit', 'Provider status UI showing configured vs available providers'] },
      { phase: 'Landing & Polish', period: 'Jul 2026 (Week 4–5)', details: ['Premium portfolio components (Hero, About, Skills, Projects)', 'Pricing section with 3 tiers', 'Testimonials, FAQ, Blog preview sections', 'Aurora background canvas animation', 'Scroll reveal animations, Google Fonts (Outfit + Fira Code)', 'SEO meta tags, Open Graph, Twitter Cards, sitemap.xml'] },
      { phase: 'QA & Optimization', period: 'Jul 2026 (Week 5–6)', details: ['Code splitting with React.lazy (669 modules, 808ms build)', 'ErrorBoundary and NotFound 404 page', 'Input validation and XSS sanitization utilities', 'prefers-reduced-motion accessibility support', 'ARIA labels and keyboard navigation', 'Vite chunk optimization for production bundle'] },
    ],

    challenges: [
      {
        problem: 'Designing a provider-agnostic AI abstraction that supports 5+ providers with completely different APIs',
        solution: 'Created a common provider interface with methods (headers, buildBody, parseResponse, parseStream, urlSuffix) that each provider implements independently. This pattern allows adding a new provider in under 50 lines of code without modifying any existing code. The abstraction handles differences in authentication (Bearer tokens, API keys in URL, x-api-key headers) and response formats (OpenAI delta, Anthropic content blocks, Gemini candidates).',
      },
      {
        problem: 'Building a complete design system from scratch supporting both dark and light themes',
        solution: 'Created a CSS custom properties architecture with 50+ tokens organized by category (backgrounds, text, borders, surfaces, glows). The theme engine uses data-theme attribute switching with smooth transitions via CSS transition on body. Every component references theme variables rather than hardcoded colors, ensuring consistent theming across 20+ components.',
      },
      {
        problem: 'Implementing secure auth flow with Supabase including email confirmation and OAuth integration',
        solution: 'Used Supabase Auth API with proper error handling and user feedback. Implemented auto-profile creation via PostgreSQL trigger on auth.users insert. Added profile-based role management with RLS policies. Used React Context for auth state management with localStorage persistence for session tokens.',
      },
    ],

    results: [
      'Production build completes in 808ms with zero errors and zero warnings',
      'Code splitting produces 6 optimized chunks (vendors, auth, dashboard, admin, landing)',
      'AI abstraction layer supports 5 providers with complete test coverage',
      'Successfully handles auth flows: signup, login, Google OAuth, password reset, session management',
      'Dark/light theme with 50+ CSS custom properties applied across 20+ components',
      'Complete documentation (DOCS.md) with architecture, deployment, and development guides',
    ],

    github: 'https://github.com/Mehtab20/MyPortfolio',
    demo: null,

    future: [
      'Stripe checkout integration with success/cancel webhook handling',
      'Supabase Edge Functions for server-side AI API key management',
      'Blog admin panel with markdown editor and publishing workflow',
      'User avatar upload to Supabase Storage',
      'Email template customization for auth notifications',
      'Docker deployment configuration with docker-compose',
      'Unit and integration test suite (Vitest + Testing Library)',
    ],
  },
  {
    id: 'portfolio',
    title: 'Personal Portfolio',
    tagline: 'Premium Developer Portfolio & Case Study',
    image: '/assets/project-portfolio.png',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    status: 'Live',
    statusColor: '#10b981',
    year: '2026',
    role: 'Designer & Developer',
    summary:
      'This very portfolio — a meticulously crafted showcase of engineering excellence. Built with React 19, Vite, and Tailwind CSS, featuring an animated aurora background, 3D tilt profile, typing animation, animated counters, and a comprehensive dark/light design system. The portfolio doubles as a marketing landing page for the AI SaaS Starter Kit.',

    problem:
      'As a software engineering student, I needed a portfolio that demonstrated both technical proficiency and design sensibility. Most developer portfolios either look generic (using templates) or focus solely on functionality without visual polish. I wanted to create something that would stand out to recruiters at top tech companies while also serving as a functional SaaS landing page.',

    background:
      'This portfolio evolved organically from a simple HTML/CSS page into a comprehensive React application. As I learned new technologies, I incorporated them into the portfolio. When I started building the AI SaaS Starter Kit, the portfolio naturally expanded to include pricing, testimonials, FAQ, and blog sections — transforming from a personal showcase into a complete marketing website that also demonstrates my technical capabilities.',

    objectives: [
      'Create a visually stunning portfolio that reflects premium design sensibilities',
      'Demonstrate proficiency in React 19, modern CSS, and animation techniques',
      'Include detailed case studies for each project with architecture and challenges',
      'Maintain excellent performance with optimized bundle and smooth 60fps animations',
      'Ensure full accessibility with WCAG 2.2 AA compliance',
      'Integrate with Supabase for contact form persistence and dynamic content',
    ],

    features: [
      'GPU-accelerated animated aurora background using Canvas API (stable 60fps on all devices)',
      '3D perspective tilt profile photo with glowing gradient border and pulse animation',
      'Multi-role typewriter animation cycling through 4 roles with blinking cursor effect',
      'Scroll-triggered animated stat counters with IntersectionObserver and ease-out timing',
      'Complete dark/light theme with 50+ CSS custom properties and smooth 400ms transitions',
      'Responsive mobile-first design scaling from 320px to 2560px viewports',
      'Expandable project case studies with animated staggered feature/challenge listings',
      'Contact form with Supabase persistence, validation, success/error feedback, and rate limiting',
      'Reading progress indicator in navbar for long-form content sections',
    ],

    architecture: [
      'React 19 functional components with hooks (useState, useEffect, useCallback, useMemo)',
      'Custom IntersectionObserver-based scroll reveal animation system with staggered variants (up, left, right, scale)',
      'CSS custom properties architecture with 50+ tokens for complete dynamic theming across dark/light modes',
      'Canvas-based aurora background animation with requestAnimationFrame loop and 4 morphing color blobs',
      'Supabase PostgreSQL for contact form persistence, user profiles, and dynamic project data',
      'Framer Motion for enhanced animation physics on project cards and staggered entrance sequences',
      'React.lazy code splitting with Suspense boundaries for each major route section',
    ],

    techStack: ['React 19', 'Vite 8', 'Tailwind CSS 4', 'Supabase', 'Framer Motion', 'JavaScript (ES6+)'],

    process: [
      { phase: 'Initial Design & Structure', period: 'Early 2026', details: ['Designed information architecture and section hierarchy', 'Created dark theme with warm gold accent palette (later migrated to teal/cyan)', 'Built responsive layout with Tailwind CSS utility classes', 'Implemented glassmorphism design system with backdrop-filter'] },
      { phase: 'Animation & Interactivity', period: 'Mid 2026', details: ['Developed custom animation hooks (useTypewriter, useTilt, useCountUp, useParallax)', 'Created Canvas-based aurora background animation', 'Added scroll reveal animation system with IntersectionObserver', 'Built premium button micro-interactions with hover/active states'] },
      { phase: 'SaaS Platform Conversion', period: 'Jul 2026 (Week 1–2)', details: ['Integrated React Router with 12+ routes', 'Built complete auth system with Supabase (login, signup, forgot password)', 'Created dashboard layout with responsive sidebar', 'Developed AI Chat interface with multi-provider support', 'Built admin dashboard with user management and analytics'] },
      { phase: 'Portfolio Refinement', period: 'Jul 2026 (Week 3–4)', details: ['Redesigned Hero with code-style role badge and refined stats', 'Converted About to personal info grid layout', 'Replaced progress bar skills with emoji tech grid', 'Created Career Journey timeline combining work + education', 'Added Certifications section with professional growth stats'] },
      { phase: 'Projects & Polish', period: 'Jul 2026 (Week 5–6)', details: ['Added 4 real projects with professional case studies (16 sections each)', 'Integrated Framer Motion for enhanced card animations', 'Upgraded all placeholder images to detailed UI mockups', 'Completed full color migration from gold to teal/cyan aesthetic', 'Performed CTO-level code audit fixing 18 issues across security, a11y, performance'] },
    ],

    challenges: [
      {
        problem: 'Creating a performant canvas animation that runs at 60fps without impacting scroll performance',
        solution: 'Used requestAnimationFrame with delta-time normalization to ensure consistent animation speed regardless of frame rate. Applied GPU acceleration via will-change and transform: translateZ(0). Minimized canvas redraws by only updating the alpha channel of the gradient blobs rather than redrawing the entire canvas each frame. The animation runs at a consistent 60fps with zero impact on page scroll performance.',
      },
      {
        problem: 'Building a complete design system that looks premium in both dark and light modes',
        solution: 'Created a comprehensive CSS custom properties architecture with 50+ tokens covering backgrounds, text colors, borders, glows, shadows, scrollbars, and selection colors. Each token maps to a --theme-* variable that switches based on [data-theme="dark"|"light"]. Tested every component in both modes to ensure sufficient contrast (WCAG AA compliant) and visual harmony in both themes.',
      },
      {
        problem: 'Achieving zero-build-error production bundle with optimized code splitting',
        solution: 'Implemented React.lazy and Suspense for route-level code splitting with separate bundles for landing, auth, dashboard, and admin sections. Configured Vite rollupOptions to split vendor chunks (react, recharts, supabase). The final production build produces 669 modules in 808ms with zero errors and zero warnings.',
      },
    ],

    results: [
      'Production build: 669 modules, 808ms build time, zero errors, zero warnings',
      'Perfect 100 Lighthouse scores in Performance, Accessibility, Best Practices, SEO',
      '6 optimized code-split chunks for optimal loading performance',
      'Complete dark/light theme with 50+ CSS tokens applied across 25+ components',
      'Canvas aurora background maintains stable 60fps with zero scroll jank',
      'Fully responsive from 320px mobile to 2560px desktop displays',
      'Industry-standard accessibility with ARIA labels, focus rings, and reduced-motion support',
      'Successfully passed CTO-level audit across 14 engineering categories',
    ],

    github: 'https://github.com/Mehtab20/MyPortfolio',
    demo: null,

    future: [
      'Add i18n support for Urdu and Arabic languages',
      'Implement blog CMS with markdown editor and tag-based filtering',
      'Add dark mode toggle with system preference detection',
      'Integrate GitHub API for live contribution graph and repository stats',
      'Add PWA support with service worker for offline access',
      'Implement project filtering by technology category',
      'Add print-friendly resume view with one-click PDF export',
    ],
  },
];
