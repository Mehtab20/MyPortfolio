INSERT INTO cv_profile (id, name, title, email, phone, location, portfolio, linkedin, github, summary)
VALUES (
    1,
    'Mehtab Akbar',
    'Software Engineering Student | Flutter Developer | Future DevOps Engineer',
    'mehtabakbar5656@gmail.com',
    '+92-000-0000000',
    'Rawalpindi, Punjab, Pakistan',
    'https://mehtabakbar.com',
    'https://linkedin.com/in/mehtab-akbar-385024267',
    'https://github.com/Mehtab20',
    'I am a Software Engineering student at Iqra University Islamabad Campus with hands-on experience in Flutter mobile application development, database systems, and software engineering fundamentals. I enjoy building user-friendly applications, designing clean interfaces, and solving real-world problems through technology. My current focus is expanding my knowledge in Cloud Computing, DevOps, and modern software architecture while continuously improving my development skills.'
) ON CONFLICT(id) DO UPDATE SET
    name = excluded.name,
    title = excluded.title,
    email = excluded.email,
    location = excluded.location,
    portfolio = excluded.portfolio,
    linkedin = excluded.linkedin,
    github = excluded.github,
    summary = excluded.summary;

-- Clear old projects to ensure we insert new ones cleanly, or just handle conflict.
DELETE FROM projects;

INSERT INTO projects (id, title, description, tech, github)
VALUES 
    (
        1,
        'Food Delivery Mobile App',
        'Built a Flutter-based food ordering application featuring food browsing interface, shopping cart functionality, checkout workflow, and responsive UI design.',
        '["Flutter", "Dart", "Firebase"]',
        'https://github.com/Mehtab20'
    ),
    (
        2,
        'Task Management App',
        'Developed a task management application with Create, Update and Delete Tasks, Search Functionality, Organized User Interface, and Basic State Management.',
        '["Flutter", "Dart", "State Management"]',
        'https://github.com/Mehtab20'
    ),
    (
        3,
        'University Complaint System',
        'Database Management System project including ER Diagram Design, Relational Database Modeling, SQL Query Implementation, and Database Normalization.',
        '["MySQL", "Database Design", "SQL"]',
        'https://github.com/Mehtab20'
    ),
    (
        4,
        'MedRef AI',
        'An AI-powered medical reference and assistance platform. Focuses on intelligent medical information assistance, structured medical data management, and decision support functionalities.',
        '["Flutter", "AI", "Python", "Cloud"]',
        'https://github.com/Mehtab20'
    );
