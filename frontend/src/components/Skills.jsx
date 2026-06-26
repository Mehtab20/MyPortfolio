const skillCategories = [
  {
    title: 'Programming Languages',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    color: 'from-blue-500 to-cyan-400',
    colorLight: 'blue',
    skills: [
      { name: 'Dart', description: 'Primary language for Flutter development' },
      { name: 'Java', description: 'Object-oriented programming and application development' },
      { name: 'C++', description: 'Systems programming and performance-critical applications' },
      { name: 'SQL', description: 'Database querying and management' }
    ],
  },
  {
    title: 'Frameworks & Technologies',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-3.4a1.5 1.5 0 010-2.54l5.1-3.4a1.5 1.5 0 012.16 1.27v6.8a1.5 1.5 0 01-2.16 1.27zM19.42 15.17l-5.1-3.4a1.5 1.5 0 010-2.54l5.1-3.4a1.5 1.5 0 012.16 1.27v6.8a1.5 1.5 0 01-2.16 1.27z" />
      </svg>
    ),
    color: 'from-violet-500 to-purple-400',
    colorLight: 'violet',
    skills: [
      { name: 'Flutter', description: 'Cross-platform mobile application development' },
      { name: 'Tailwind CSS', description: 'Utility-first CSS framework for rapid UI development' },
      { name: 'React', description: 'JavaScript library for building user interfaces' },
      { name: 'REST APIs', description: 'Designing and consuming web services' }
    ],
  },
  {
    title: 'Databases & Design',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
    color: 'from-amber-500 to-orange-400',
    colorLight: 'amber',
    skills: [
      { name: 'MySQL', description: 'Relational database management' },
      { name: 'Oracle Database', description: 'Enterprise database systems' },
      { name: 'Database Design', description: 'ER Modeling and Normalization' }
    ],
  },
  {
    title: 'Software Engineering Concepts',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    color: 'from-emerald-500 to-teal-400',
    colorLight: 'emerald',
    skills: [
      { name: 'OOP & SDLC', description: 'Object-Oriented Programming and Software Development Life Cycle' },
      { name: 'Design Patterns', description: 'Reusable solutions to common software design problems' },
      { name: 'UI/UX & Agile', description: 'User-centered design principles and Agile methodologies' }
    ],
  },
];

function SkillCard({ skill, categoryColor }) {
  return (
    <div className="group relative rounded-2xl glass p-6 transition-all duration-500 hover:glow-border hover:-translate-y-1">
      {/* Hover gradient overlay */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${categoryColor} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500`} />

      <div className="relative">
        {/* Title */}
        <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:gradient-text-hover transition-all duration-300">
          {skill.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-text-muted leading-relaxed">
          {skill.description}
        </p>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32" aria-label="Skills section">
      {/* Background accents */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent-purple/5 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs font-medium text-primary-light tracking-wider uppercase mb-4">
            Technical Skills
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-text-primary">My </span>
            <span className="gradient-text">Expertise</span>
          </h2>
          <p className="max-w-lg mx-auto text-text-secondary text-base">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Skills by Category */}
        <div className="space-y-12">
          {skillCategories.map((category) => (
            <div key={category.title}>
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center text-white`}>
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-text-primary">{category.title}</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
              </div>

              {/* Skill Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.skills.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} categoryColor={category.color} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
