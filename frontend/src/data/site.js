/*
 * Content for the public site.
 *
 * Everything here is written from what the project repositories actually
 * contain (code, READMEs, architecture docs). No invented metrics, clients,
 * users or results. If something is planned rather than built, it says so.
 */

export const profile = {
  name: 'Mehtab Akbar',
  positioning: ['Software Engineer', 'AI Product Builder', 'Full-Stack Developer'],
  location: 'Rawalpindi, Pakistan',
  timeZone: 'Asia/Karachi',
  email: 'mehtabakbar5656@gmail.com',
  phone: '+92 340 8575834',
  github: 'https://github.com/Mehtab20',
  linkedin: 'https://linkedin.com/in/mehtab-akbar-385024267',
  resume: '/resume',
  education: 'BS Software Engineering, Iqra University',
  nowBuilding: { label: 'MehZu AI', href: '/work/mehzu-ai' },
  tagline: 'I build AI-native products and full-stack systems, from the data model to the screen.',
};

export const glance = [
  { icon: 'pin', k: 'Based in', v: 'Rawalpindi, Pakistan (UTC+5)' },
  { icon: 'graduation', k: 'Education', v: 'BS Software Engineering, Iqra University' },
  { icon: 'target', k: 'Focus', v: 'AI-native products and healthcare software' },
  { icon: 'rocket', k: 'Now building', v: 'MehZu AI', href: '/work/mehzu-ai' },
  { icon: 'file', k: 'Working style', v: 'Documentation-first, AI-assisted' },
];

export const services = [
  {
    emoji: '💻',
    title: 'Full-Stack Web Apps',
    body: 'Web applications built from the data model up, with React and TypeScript on the front and Convex, FastAPI or Node behind it.',
    points: ['Responsive React + TypeScript interfaces', 'REST APIs and real-time backends', 'Database design with roles and permissions', 'Deployment on Vercel or Docker'],
  },
  {
    emoji: '🤖',
    title: 'AI Product Features',
    body: 'LLM features that work from your users’ own data instead of generic chat, plus classic ML where it fits better.',
    points: ['LLM integration across providers', 'Context assembly and long-term memory', 'Vision and text models (CNN, NLP)', 'Fallbacks when a model is unavailable'],
  },
  {
    emoji: '📱',
    title: 'Cross-Platform Mobile',
    body: 'Flutter apps for Android, web and desktop that connect to your API and handle real-world input like the camera.',
    points: ['Flutter + Dart clients', 'Auth and role-based flows', 'Camera and image upload', 'Environment-aware API configuration'],
  },
  {
    emoji: '🏥',
    title: 'Systems for Real Operations',
    body: 'Software for clinics, hospitals and small businesses that replaces paper registers with records people can actually find.',
    points: ['Workflow and requirements mapping', 'Role-based access for staff', 'Records, scheduling and inventory modules', 'Phased delivery with documentation'],
  },
];

export const education = [
  {
    degree: 'BS Software Engineering',
    school: 'Iqra University, Islamabad',
    when: '2022 – 2026',
    where: 'Islamabad, Pakistan',
    body: 'Software engineering degree. Final year project: MedRef, an AI-assisted diagnosis and specialist-referral system.',
    courses: ['Data Structures', 'Databases', 'Human-Computer Interaction', 'Software Architecture', 'Design Patterns'],
  },
  {
    degree: 'Intermediate in Computer Science (ICS)',
    school: 'Punjab College',
    when: '2020 – 2022',
    where: 'Rawalpindi, Pakistan',
    body: 'Where I wrote my first programs and decided to study software engineering.',
    courses: [],
  },
];

export const experience = [
  {
    title: 'Creator & Engineer',
    org: 'MehZu AI, independent product',
    when: '2025 – Present',
    where: 'Rawalpindi, Pakistan',
    body: 'Designing and building an AI-native life-management system end to end: product docs, design system, Convex backend and an AI layer with context assembly, memory and a daily briefing.',
    tags: ['React 19', 'TypeScript', 'Convex', 'LLM integration', 'Tailwind CSS'],
    href: '/work/mehzu-ai',
  },
  {
    title: 'Full-Stack Developer',
    org: 'Gohar Medical Trust HMS',
    when: '2026',
    where: 'Buner, Khyber Pakhtunkhwa',
    body: 'Building a phased hospital management system: a 21-table Convex schema, role-based access for 9 staff roles, and modules for patients, appointments, admissions, medical records and the lab.',
    tags: ['React', 'TypeScript', 'Convex', 'RBAC', 'shadcn/ui'],
    href: '/work/gohar-hms',
  },
  {
    title: 'Final Year Project: MedRef',
    org: 'Iqra University',
    when: '2025 – 2026',
    where: 'Islamabad, Pakistan',
    body: 'An AI-assisted diagnosis and specialist-referral system: FastAPI backend, NLP and CNN models with graceful fallbacks, and a Flutter client with patient, doctor and admin roles.',
    tags: ['Flutter', 'FastAPI', 'TensorFlow', 'scikit-learn', 'PostgreSQL'],
    href: '/work/medref',
  },
  {
    title: 'Freelance Full-Stack Developer',
    org: 'Self-directed',
    when: '2024 – Present',
    where: 'Rawalpindi, Pakistan',
    body: 'Web and mobile work outside coursework, including business and inventory software for small organisations.',
    tags: ['React', 'Node.js', 'Express', 'Supabase', 'Flutter'],
  },
];

export const about = {
  paragraphs: [
    "I'm a software engineer from Rawalpindi, Pakistan. I studied Software Engineering at Iqra University in Islamabad, and most of what I know comes from building complete systems: a hospital management system, an AI-assisted medical referral app, and an AI companion for everyday life.",
    'I care about the part of software that comes before the screens. That means understanding the domain, modelling the data and roles properly, and then deciding where AI actually helps. I build across the stack with React, Flutter, FastAPI and Convex, and I write the architecture down as I go.',
    'I work with AI coding tools every day and treat them as a fast collaborator. The product decisions, the architecture and the review stay with me.',
  ],
  principles: [
    {
      title: 'Model the domain first',
      body: 'Schemas, roles and workflows come before UI. Most product bugs are really modelling bugs.',
      proof: 'Gohar HMS: 21-table schema, 9 roles × 13 modules',
    },
    {
      title: 'Ground the AI in real data',
      body: 'AI features should work from the user’s actual data, checked for ownership, not from generic prompts.',
      proof: 'MehZu AI: context assembly + memory layer',
    },
    {
      title: 'Degrade gracefully',
      body: 'When a model file or an API key is missing, the product should still work at a lower level instead of failing.',
      proof: 'MedRef: keyword NLP when trained models are absent',
    },
    {
      title: 'Write it down',
      body: 'Architecture notes, decision logs and roadmaps live next to the code, for teammates and for AI tools.',
      proof: 'MehZu AI: 24 design & architecture documents',
    },
  ],
};

export const toolkit = [
  {
    name: 'Frontend Development', icon: 'code',
    note: 'Web apps with design systems, accessible components and motion where it helps.',
    items: ['React 19', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'shadcn/ui', 'Framer Motion', 'Vite', 'React Router'],
  },
  {
    name: 'Mobile Development', icon: 'smartphone',
    note: 'Cross-platform clients for Android, web and desktop.',
    items: ['Flutter', 'Dart'],
  },
  {
    name: 'Backend & Data', icon: 'server',
    note: 'APIs, real-time backends, auth and role-based access.',
    items: ['Convex', 'Python', 'FastAPI', 'Node.js', 'Express', 'PostgreSQL', 'SQLite', 'SQLAlchemy', 'Supabase', 'JWT auth'],
  },
  {
    name: 'AI & ML', icon: 'brain',
    note: 'LLM features grounded in user data, plus classic ML for vision and text.',
    items: ['LLM integration (OpenAI, Gemini, Groq, OpenRouter)', 'Context & memory design', 'TensorFlow / Keras CNNs', 'scikit-learn', 'spaCy NLP', 'Hugging Face Inference'],
  },
  {
    name: 'Tools & Workflow', icon: 'wrench',
    note: 'How the work gets shipped and maintained.',
    items: ['Git & GitHub', 'Docker', 'Vercel', 'Bun / npm', 'Architecture docs', 'AI-assisted development'],
  },
  {
    name: 'Currently Learning', icon: 'rocket',
    note: 'Where I’m deliberately going deeper.',
    items: ['Cloud (AWS)', 'DevOps & CI/CD', 'Monitoring'],
    learning: true,
  },
];

export const journey = [
  {
    when: '2025 — Now',
    what: 'MehZu AI',
    org: 'Independent product',
    detail: 'Designing and building an AI-native life-management system end to end, from product docs to the Convex backend and the AI layer.',
    href: '/work/mehzu-ai',
  },
  {
    when: '2026',
    what: 'Gohar Medical Trust HMS',
    org: 'Gohar Hospital & Trust, Buner',
    detail: 'Building a phased hospital management system that covers patients, scheduling, admissions, records and lab.',
    href: '/work/gohar-hms',
  },
  {
    when: '2025 — 2026',
    what: 'Final year project: MedRef',
    org: 'Iqra University',
    detail: 'An AI-assisted diagnosis and specialist-referral system with a Flutter client, a FastAPI backend and trained CNN and NLP models.',
    href: '/work/medref',
  },
  {
    when: '2024 — Now',
    what: 'Freelance & independent projects',
    org: 'Self-directed',
    detail: 'Full-stack web and mobile work outside coursework, including business software for small organisations.',
  },
  {
    when: '2022 — 2026',
    what: 'BS Software Engineering',
    org: 'Iqra University, Islamabad',
    detail: 'Data structures, databases, HCI, software architecture and design patterns.',
  },
  {
    when: '2020 — 2022',
    what: 'Intermediate, Computer Science',
    org: 'Punjab College, Rawalpindi',
    detail: 'Where I wrote my first programs.',
  },
];

export const work = [
  {
    slug: 'mehzu-ai',
    featured: true,
    index: '01',
    title: 'MehZu AI',
    kind: 'An AI-native personal life-management system',
    year: '2025 — Now',
    status: { label: 'In active development', tone: 'live' },
    role: 'Creator: product, design & engineering',
    summary:
      'Journaling, mood, habits, prayer, workouts and goals in one place, with an AI companion that reads that context before it answers, so its advice is specific to you rather than generic.',
    stack: ['React 19', 'TypeScript', 'Convex', 'Convex Auth', 'Tailwind CSS v4', 'shadcn/ui', 'Framer Motion', 'LLM providers'],
    links: [{ label: 'Public repository', href: 'https://github.com/Mehtab20/Mehzu-Ai' }],
    diagram: {
      caption: 'Context-grounded AI',
      columns: [
        { label: 'Life data', nodes: [{ t: 'Journal & mood' }, { t: 'Habits' }, { t: 'Prayer & Quran' }, { t: 'Workouts' }, { t: 'Goals' }] },
        { label: 'Convex', nodes: [{ t: 'Context assembly', s: 'owner-checked, bounded', hot: true }, { t: 'AI memories', s: 'importance threshold' }] },
        { label: 'AI layer', nodes: [{ t: 'Provider resolver', s: '4 providers, one path', hot: true }] },
        { label: 'Experience', nodes: [{ t: 'Companion chat' }, { t: 'Daily briefing' }, { t: 'Insights' }] },
      ],
    },
    caseStudy: {
      problem: [
        'Self-improvement data usually lives in separate apps: a journal in one, a habit tracker in another, prayer and workouts somewhere else. None of them share context.',
        'So an “AI coach” built on top of any one of them sees only a small part of the person, and it falls back on generic advice.',
      ],
      approach: [
        'MehZu puts the main areas of daily life into one data model that the user owns, then builds the AI on top of it. Before it responds, the companion assembles a bounded, user-scoped summary of recent journal entries, moods, habits, prayers, workouts and goals, and it keeps a small memory of facts worth remembering.',
        'The interface is deliberately calm. There are no badges or streak pressure designed to pull you back. The aim is a tool you return to because it helps.',
      ],
      architecture: [
        { layer: 'Client', detail: 'React 19 + TypeScript SPA with lazy-loaded routes, shadcn/ui on Tailwind CSS v4, Framer Motion and React Router v7.' },
        { layer: 'Backend', detail: 'Convex queries, mutations and actions over 13 tables: users, preferences, journal entries, habits and logs, prayer and Quran logs, workout sessions and sets, goals, conversations, messages and AI memories.' },
        { layer: 'Auth', detail: 'Convex Auth with email one-time passcodes and a protected-route pattern that returns users to the page they asked for.' },
        { layer: 'AI', detail: 'A provider resolver picks the configured LLM (Groq, OpenRouter, Gemini or OpenAI), so chat and the daily briefing share one code path and switching models is a configuration change.' },
        { layer: 'Context', detail: 'A central context builder gathers recent user data with ownership checks and bounded result sets, then hands a structured context to the prompt.' },
      ],
      decisions: [
        { title: 'Provider-agnostic from day one', body: 'Provider selection lives in one module with no Convex imports, so every AI feature reuses it. The briefing gives reasoning models a larger token budget, because they spend hidden tokens before returning JSON.' },
        { title: 'Insights only from real data', body: 'The insights module only reports on data the user has actually logged. It doesn’t invent trends to fill an empty dashboard.' },
        { title: 'Memory with a threshold', body: 'Facts pulled from conversations carry an importance score, and only those above a minimum score are used as context. The parsing helpers are pure functions, so they can be tested without an API key.' },
        { title: 'Docs as part of the product', body: 'Product vision, requirements, UX system, database and AI architecture, decision log and launch checklist all live in the repository, alongside the code.' },
      ],
      contribution: [
        'Product definition, requirements and roadmap',
        'Design system and every screen: onboarding, dashboard, journal, habits, prayer, workouts, goals, insights, chat, profile and settings',
        'Convex schema, queries, mutations and actions',
        'AI layer: provider resolution, context assembly, memory extraction and daily briefing',
      ],
      built: [
        'Authentication and onboarding',
        'Journal with history and detail views',
        'Habits, prayer & Quran, workouts (sessions and sets) and goals',
        'AI chat with saved conversations and a memory layer',
        'Daily briefing and data-based insights',
      ],
      next: [
        'Working through the production launch checklist',
        'Deeper long-term memory and more proactive suggestions',
      ],
    },
  },
  {
    slug: 'medref',
    featured: true,
    index: '02',
    title: 'MedRef',
    kind: 'AI-assisted diagnosis and specialist referral',
    year: '2025 — 2026',
    status: { label: 'Final year project', tone: 'done' },
    role: 'Final year project: backend, ML pipeline & mobile app',
    summary:
      'Patients describe symptoms in text or upload a skin or chest image. NLP and CNN models analyse the input, and the app suggests which kind of specialist to see, with nearby options and a saved history.',
    stack: ['Flutter', 'Dart', 'Python', 'FastAPI', 'SQLAlchemy', 'TensorFlow / Keras', 'scikit-learn', 'spaCy', 'PostgreSQL', 'Docker'],
    links: [{ label: 'Repository', href: 'https://github.com/Mehtab20/final_year_project' }],
    diagram: {
      caption: 'Two-stage inference',
      columns: [
        { label: 'Flutter app', nodes: [{ t: 'Symptom text' }, { t: 'Skin / chest image' }] },
        { label: 'FastAPI', nodes: [{ t: 'NLP service', s: 'spaCy + classifier' }, { t: 'Image pipeline', s: 'local CNN → HF fallback', hot: true }] },
        { label: 'Routing', nodes: [{ t: 'Specialist service', s: 'department + distance', hot: true }] },
        { label: 'Result', nodes: [{ t: 'Risk-aware report' }, { t: 'Nearby specialists' }, { t: 'Saved history' }] },
      ],
    },
    caseStudy: {
      problem: [
        'Patients often don’t know which specialist they need. They lose time going through general consultations before they reach the right doctor.',
        'MedRef targets that first step: describe what’s wrong, or photograph it, and get a clear suggestion of which kind of specialist to see.',
      ],
      approach: [
        'There are two input paths. Text symptoms go through an NLP service and a trained referral classifier. Images go through a two-stage pipeline: locally trained skin and chest CNNs run first, and the Hugging Face Inference API is used as a fallback. Both paths return a structured report that names a specialist, for example a dermatologist or a pulmonologist.',
        'A specialist service then matches by department and distance, and every analysis is saved to the user’s history. A second iteration, MedRef AI, rebuilt the client in Flutter with patient, doctor and admin roles, so doctors can review and claim high-risk cases.',
      ],
      architecture: [
        { layer: 'Client', detail: 'Flutter app for Android, web and desktop. It handles login, symptom input, image upload from camera or gallery, results and history, and detects the right API base URL for emulator, web or physical device.' },
        { layer: 'API', detail: 'FastAPI REST service: /auth (JWT), /analyze/text, /analyze/image and /history, with uploaded images served from /uploads.' },
        { layer: 'Models', detail: 'Skin and chest CNNs (Keras .h5) and a scikit-learn referral classifier (.joblib), trained in a Colab notebook and loaded at startup.' },
        { layer: 'Data', detail: 'SQLAlchemy models for users, referrals and feedback, on SQLite in the first version and PostgreSQL in the MedRef AI rebuild. The backend has a Dockerfile.' },
      ],
      decisions: [
        { title: 'Degrade, don’t fail', body: 'If the trained model files are missing, the backend falls back to keyword NLP and heuristic image routing, so the app still runs end to end in development and demos.' },
        { title: 'Local first, cloud as backup', body: 'Image analysis tries the local CNNs before calling the Hugging Face Inference API. That keeps routine requests on the server, and it still returns an answer when a local model fails.' },
        { title: 'Every analysis is persisted', body: 'Analyses are saved even for users who aren’t logged in, so every response has an ID. That fixed a class of 500 errors in the results flow.' },
        { title: 'Roles that mirror a clinic', body: 'In MedRef AI, patients, doctors and admins get separate flows. High-risk cases surface to doctors, who can claim them, and admins see system analytics.' },
      ],
      contribution: [
        'FastAPI backend: auth, analysis endpoints, history and uploads',
        'NLP and image-analysis services, plus the specialist-matching logic',
        'Model training notebook and model loading',
        'Flutter client, including the role-based MedRef AI rebuild',
      ],
      built: [
        'Text and image analysis with structured, specialist-tagged reports',
        'JWT authentication and per-user history',
        'Specialist matching by department and distance',
        'Patient, doctor and admin roles in the Flutter rebuild',
      ],
      next: [
        'Clinical validation. The models haven’t been evaluated in a clinical setting, so their output is guidance, not a diagnosis',
      ],
      note: 'MedRef is an academic project. Its suggestions are not medical advice.',
    },
  },
  {
    slug: 'gohar-hms',
    featured: true,
    index: '03',
    title: 'Gohar Medical Trust HMS',
    kind: 'Hospital management for a community hospital',
    year: '2026',
    status: { label: 'In development: phase 3', tone: 'live' },
    role: 'Full-stack developer',
    summary:
      'A hospital management system for Gohar Hospital & Trust, a 24/7 community hospital in District Buner, Khyber Pakhtunkhwa. It replaces paper workflows with patient records, scheduling, admissions, medical records and a lab system on a real-time backend.',
    stack: ['React', 'TypeScript', 'Vite', 'Convex', 'Convex Auth', 'shadcn/ui', 'Tailwind CSS', 'Framer Motion', 'Bun'],
    links: [{ label: 'Repository', href: 'https://github.com/Mehtab20/Gohar-Medical-Trust' }],
    diagram: {
      caption: 'Phased clinical modules',
      columns: [
        { label: 'Staff', nodes: [{ t: 'Reception' }, { t: 'Doctors & nurses' }, { t: 'Lab' }, { t: 'Admin' }] },
        { label: 'Access', nodes: [{ t: 'RBAC matrix', s: '9 roles × 13 modules', hot: true }] },
        { label: 'Modules', nodes: [{ t: 'Patients', s: 'MRN GMT-YYYY-XXXXX' }, { t: 'Appointments' }, { t: 'ADT workflow' }, { t: 'Medical records' }, { t: 'Lab system', hot: true }] },
        { label: 'Convex', nodes: [{ t: '21 tables', s: 'indexed, validated', hot: true }] },
      ],
    },
    caseStudy: {
      problem: [
        'Gohar Hospital & Trust runs much of its work on paper. Records are slow to find, handwriting is hard to read, patient history isn’t available remotely, and there’s no central view of beds or hospital-wide figures.',
        'Each group of staff has its own pain points: reception, clinicians, nurses and administration. A system that fits only one of them wouldn’t be used.',
      ],
      approach: [
        'I modelled the hospital before building screens. That meant a Convex schema with indexes and validation, and a role-based permission matrix of 9 staff roles across 13 modules.',
        'Delivery follows the clinical flow in phases: foundation, then patients, departments and rooms, appointments, admission/discharge/transfer, medical records and the lab system. Each phase is documented and finished before the next one starts.',
      ],
      architecture: [
        { layer: 'Client', detail: 'React + TypeScript on Vite, with shadcn/ui and Tailwind. A responsive app shell has a fixed desktop sidebar and a mobile drawer, plus route guards with return-to redirects.' },
        { layer: 'Backend', detail: 'Convex serverless functions over a 21-table schema with indexes and validation.' },
        { layer: 'Access', detail: 'Convex Auth plus an RBAC permission matrix that checks every module against the user’s role.' },
        { layer: 'UI kit', detail: 'Reusable DataTable (sortable and filterable), debounced SearchInput, StatusBadge and EmptyState components shared across modules.' },
      ],
      decisions: [
        { title: 'Readable, collision-safe MRNs', body: 'Patient numbers follow a GMT-YYYY-XXXXX format and retry on collision, so staff can read them aloud and they stay unique.' },
        { title: 'Permissions as data', body: 'Access is defined as a roles × modules matrix rather than scattered checks, which makes it easy to audit and to extend when new staff roles appear.' },
        { title: 'Build in clinical order', body: 'Modules ship in the order a patient moves through the hospital, so each phase builds on real, working data from the one before.' },
        { title: 'Documented as it grows', body: 'ARCHITECTURE.md and a living context document record the schema, personas, UX decisions and phase status.' },
      ],
      contribution: [
        'Requirements, personas and phased roadmap',
        'Convex schema, functions and RBAC system',
        'Every module built so far, from the app shell to the lab system',
      ],
      built: [
        'Foundation: auth, RBAC, user management, app shell and dashboard',
        'Patient registration, search, detail and editing with MRN generation',
        'Departments, rooms and appointment scheduling',
        'Admission / discharge / transfer and medical records',
        'Lab information system',
      ],
      next: [
        'Radiology and imaging (phase 3.2)',
        'Pharmacy, billing and finance, HR and reporting',
        'AI-assisted features once the core workflows are in daily use',
      ],
    },
  },
  {
    slug: 'imad-block-factory',
    index: '04',
    title: 'Imad Block Factory',
    kind: 'Business & inventory management',
    year: null,
    status: { label: 'Case study coming soon', tone: 'idle' },
    role: 'Developer',
    summary:
      'Business and inventory management software for Imad Block Factory, a block manufacturing business. A full write-up is on the way.',
    stack: [],
    links: [],
    diagram: null,
    caseStudy: null,
  },
];

export const getProject = (slug) => work.find((p) => p.slug === slug);
