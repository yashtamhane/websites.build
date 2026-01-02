'use client';

import { useState, useEffect, useRef } from 'react';

export default function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skills = {
    frontend: [
      { name: 'React / Next.js', level: 90, color: 'emerald' },
      { name: 'TypeScript', level: 85, color: 'cyan' },
      { name: 'Tailwind CSS', level: 95, color: 'purple' },
      { name: 'JavaScript (ES6+)', level: 90, color: 'blue' },
    ],
    backend: [
      { name: 'Node.js', level: 85, color: 'emerald' },
      { name: 'Python', level: 80, color: 'cyan' },
      { name: 'SQL / PostgreSQL', level: 75, color: 'purple' },
      { name: 'REST APIs', level: 90, color: 'blue' },
    ],
    tools: [
      { name: 'Git / GitHub', level: 95, color: 'emerald' },
      { name: 'Docker', level: 70, color: 'cyan' },
      { name: 'VS Code', level: 100, color: 'purple' },
      { name: 'Figma', level: 75, color: 'blue' },
    ],
  };

  const techStack = [
    { name: 'React', icon: '⚛️' },
    { name: 'Next.js', icon: '▲' },
    { name: 'TypeScript', icon: 'TS' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Python', icon: '🐍' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'Docker', icon: '🐳' },
    { name: 'AWS', icon: '☁️' },
    { name: 'Git', icon: '📦' },
  ];

  return (
    <section ref={sectionRef} id="skills" className="py-20 px-12 bg-slate-800">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-emerald-400 font-mono">02.</span> Skills & Technologies
          </h2>
          <div className="h-0.5 w-32 bg-gradient-to-r from-emerald-400 to-transparent" />
        </div>

        {/* Tech Stack Icons */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 font-mono">Tech Stack</h3>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-6">
            {techStack.map((tech, i) => (
              <div
                key={i}
                className="group relative"
                style={{
                  animation: isVisible ? `popIn 0.5s ease-out ${i * 0.05}s forwards` : 'none',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'scale(1)' : 'scale(0)',
                }}
              >
                <div className="bg-slate-700 rounded-lg p-4 border border-emerald-400/20 hover:border-emerald-400/50 transition-all hover:scale-110 hover:shadow-lg hover:shadow-emerald-400/20 cursor-pointer">
                  <div className="text-4xl text-center">{tech.icon}</div>
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-mono text-gray-400 whitespace-nowrap">{tech.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Bars */}
        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, skillList], catIndex) => (
            <div
              key={category}
              className="bg-slate-900 rounded-lg p-6 border border-emerald-400/20"
              style={{
                animation: isVisible ? `fadeInUp 0.8s ease-out ${catIndex * 0.2}s forwards` : 'none',
                opacity: isVisible ? 1 : 0,
              }}
            >
              <h3 className="text-xl font-bold text-emerald-400 mb-6 font-mono capitalize">
                {category}
              </h3>
              <div className="space-y-6">
                {skillList.map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 text-sm font-mono">{skill.name}</span>
                      <span className="text-cyan-400 text-sm font-mono">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r from-${skill.color}-400 to-${skill.color}-600 rounded-full transition-all duration-1000 ease-out`}
                        style={{
                          width: isVisible ? `${skill.level}%` : '0%',
                          transitionDelay: `${(catIndex * 0.2) + (i * 0.1)}s`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
}
