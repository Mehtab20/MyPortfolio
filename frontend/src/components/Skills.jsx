import { useState, useEffect, useRef } from 'react';

const skillCategories = [
  {
    key: 'languages',
    label: 'Languages',
    skills: [
      { name: 'Python', level: 85 },
      { name: 'Java', level: 80 },
      { name: 'JavaScript', level: 78 },
      { name: 'C++', level: 72 },
      { name: 'Dart', level: 82 },
      { name: 'SQL', level: 78 },
    ],
  },
  {
    key: 'frameworks',
    label: 'Frameworks',
    skills: [
      { name: 'Flutter', level: 88 },
      { name: 'React', level: 75 },
      { name: 'Tailwind CSS', level: 82 },
      { name: 'REST APIs', level: 80 },
      { name: 'Node.js', level: 65 },
      { name: 'Express.js', level: 62 },
    ],
  },
  {
    key: 'databases',
    label: 'Databases',
    skills: [
      { name: 'MySQL', level: 82 },
      { name: 'Oracle Database', level: 72 },
      { name: 'Firebase', level: 85 },
      { name: 'MongoDB', level: 65 },
    ],
  },
  {
    key: 'devops',
    label: 'DevOps',
    skills: [
      { name: 'Git & GitHub', level: 85 },
      { name: 'Docker', level: 60 },
      { name: 'Linux', level: 65 },
      { name: 'CI/CD', level: 55 },
    ],
  },
  {
    key: 'aiml',
    label: 'AI/ML',
    skills: [
      { name: 'Machine Learning', level: 55 },
      { name: 'Data Analysis', level: 60 },
      { name: 'NumPy / Pandas', level: 58 },
    ],
  },
];

function ProgressBar({ level, animate }) {
  return (
    <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--theme-surface-lighter)' }}>
      <div
        className="h-full rounded-full progress-fill"
        style={{
          width: animate ? `${level}%` : '0%',
          background: 'linear-gradient(90deg, #d4a522, #e8b92e)',
        }}
      />
    </div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState('languages');
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef(null);

  // Trigger progress bar animation when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimate(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Re-trigger animation on tab change
  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const activeCategory = skillCategories.find((c) => c.key === activeTab);

  return (
    <section id="skills" ref={sectionRef} className="relative py-24 sm:py-32" aria-label="Skills section">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span style={{ color: 'var(--theme-text)' }}>My </span>
            <span className="gradient-text">Skills</span>
          </h2>
          <p className="max-w-lg mx-auto text-base" style={{ color: 'var(--theme-text-secondary)' }}>
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Tab Bar */}
        <div className="reveal flex flex-wrap justify-center gap-2 mb-10">
          {skillCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                setAnimate(false);
                setActiveTab(cat.key);
              }}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === cat.key
                  ? 'btn-primary'
                  : ''
              }`}
              style={
                activeTab !== cat.key
                  ? {
                      color: 'var(--theme-text-secondary)',
                      border: '1px solid var(--theme-border)',
                      background: 'var(--theme-glass-bg)',
                    }
                  : undefined
              }
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skill Cards Grid */}
        <div className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {activeCategory?.skills.map((skill) => (
            <div
              key={skill.name}
              className="group card-surface rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 golden-border-hover"
            >
              {/* Skill Name & Level */}
              <div className="flex items-center justify-between mb-3">
                <h3
                  className="text-base font-semibold"
                  style={{ color: 'var(--theme-text)' }}
                >
                  {skill.name}
                </h3>
                <span
                  className="text-sm font-mono font-medium"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {skill.level}%
                </span>
              </div>

              {/* Progress Bar */}
              <ProgressBar level={skill.level} animate={animate} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
