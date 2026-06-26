INSERT INTO cv_profile (name, title, email, phone, location, portfolio, linkedin, github, summary)
VALUES (
    'Mehtab Akbar',
    'Software Engineering Student | Flutter Developer | AI & Automation Enthusiast | Future Cloud & DevOps Engineer',
    'mehtab@example.com',
    '+92-000-0000000',
    'Rawalpindi, Pakistan',
    'https://mehtabakbar.dev',
    'https://linkedin.com/in/mehtabakbar',
    'https://github.com/mehtabakbar',
    'I am a passionate Software Engineering student with a focus on Flutter development, AI, and automation. I aspire to be a Cloud & DevOps Engineer. I love building scalable systems and finding efficient solutions to complex problems.'
) ON CONFLICT DO NOTHING;

INSERT INTO projects (title, description, tech, github)
VALUES 
    (
        'Portfolio System',
        'A full-stack, production-ready personal portfolio system with React, Express, and PostgreSQL.',
        ARRAY['React 19', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL'],
        'https://github.com/mehtabakbar/portfolio-system'
    ),
    (
        'Flutter E-Commerce App',
        'A modern cross-platform e-commerce application built with Flutter and Firebase.',
        ARRAY['Flutter', 'Dart', 'Firebase'],
        'https://github.com/mehtabakbar/flutter-ecommerce'
    ),
    (
        'AI Automation Bot',
        'An n8n automation bot connecting Telegram, Google Sheets, and OpenAI APIs.',
        ARRAY['n8n', 'Node.js', 'OpenAI API'],
        'https://github.com/mehtabakbar/ai-automation-bot'
    ) ON CONFLICT DO NOTHING;
