'use client';

export default function ExperienceSection() {
  const experiences = [
    {
      role: 'Senior Full Stack Developer',
      company: 'Tech Corp',
      period: '2022 - Present',
      description: 'Leading development of scalable web applications using modern tech stack. Mentoring junior developers and implementing best practices.',
      achievements: [
        'Improved application performance by 40%',
        'Led team of 5 developers',
        'Implemented CI/CD pipeline',
      ],
    },
    {
      role: 'Full Stack Developer',
      company: 'StartupXYZ',
      period: '2020 - 2022',
      description: 'Developed and maintained multiple client projects. Collaborated with cross-functional teams to deliver high-quality solutions.',
      achievements: [
        'Built 10+ client projects',
        'Reduced load time by 50%',
        'Introduced testing framework',
      ],
    },
    {
      role: 'Junior Developer',
      company: 'Web Agency',
      period: '2018 - 2020',
      description: 'Started my professional journey building responsive websites and learning industry best practices.',
      achievements: [
        'Completed 20+ projects',
        'Learned modern frameworks',
        'Collaborated with designers',
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 px-12 bg-slate-800">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-emerald-400 font-mono">04.</span> Experience
          </h2>
          <div className="h-0.5 w-32 bg-gradient-to-r from-emerald-400 to-transparent" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-emerald-400/20" />

          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`relative mb-16 ${
                index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto md:text-left'
              } md:w-1/2`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-auto md:right-0 md:translate-x-1/2 w-4 h-4 bg-emerald-400 rounded-full border-4 border-slate-800 z-10"
                style={{
                  left: index % 2 === 0 ? 'auto' : '-8px',
                  right: index % 2 === 0 ? '-8px' : 'auto',
                }}
              />

              {/* Content card */}
              <div
                className="group ml-8 md:ml-0 bg-slate-900 border border-emerald-400/20 rounded-lg p-6 hover:border-emerald-400/50 hover:shadow-lg hover:shadow-emerald-400/10 transition-all duration-300"
                style={{
                  animation: `fadeInUp 0.8s ease-out ${index * 0.2}s forwards`,
                  opacity: 0,
                }}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="text-xl font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors">
                      {exp.role}
                    </h3>
                    <span className="text-sm font-mono text-cyan-400">{exp.period}</span>
                  </div>
                  <div className="text-white font-semibold">{exp.company}</div>
                  <p className="text-gray-400">{exp.description}</p>
                  <ul className="space-y-2 mt-4">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                        <span className="text-emerald-400 mt-1">▹</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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
      `}</style>
    </section>
  );
}
