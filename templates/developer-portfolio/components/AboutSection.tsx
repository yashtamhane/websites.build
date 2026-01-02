'use client';

import { useState } from 'react';

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState('bio');

  return (
    <section id="about" className="py-20 px-12 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-emerald-400 font-mono">01.</span> About Me
          </h2>
          <div className="h-0.5 w-32 bg-gradient-to-r from-emerald-400 to-transparent" />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Terminal-style bio */}
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-lg overflow-hidden shadow-2xl border border-emerald-400/20">
              {/* Terminal header */}
              <div className="bg-slate-700 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-gray-400 text-sm font-mono ml-4">about-me.sh</span>
              </div>

              {/* Terminal content */}
              <div className="p-6 font-mono text-sm">
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <span className="text-emerald-400">$</span>
                    <span className="text-gray-300">cat introduction.txt</span>
                  </div>
                  <div className="ml-4 text-gray-400 space-y-2">
                    <p>
                      Hello! I'm a passionate developer who loves building things for the web.
                      My interest in development started back in 2018 when I decided to try
                      creating my first website.
                    </p>
                    <p className="mt-4">
                      Fast-forward to today, and I've had the privilege of working on various
                      projects ranging from startups to large-scale applications. I enjoy
                      creating things that live on the internet, whether that be websites,
                      applications, or anything in between.
                    </p>
                  </div>
                  <div className="flex gap-2 mt-6">
                    <span className="text-emerald-400">$</span>
                    <span className="text-gray-300">node interests.js</span>
                  </div>
                  <div className="ml-4 space-y-1 text-cyan-400">
                    <div>→ Building scalable web applications</div>
                    <div>→ Learning new technologies</div>
                    <div>→ Open source contributions</div>
                    <div>→ Teaching and mentoring</div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <span className="text-emerald-400">$</span>
                    <span className="text-white animate-pulse">_</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image and stats */}
          <div className="space-y-6">
            {/* Profile image placeholder with glow effect */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300" />
              <div className="relative aspect-square bg-slate-800 rounded-lg overflow-hidden border border-emerald-400/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-32 h-32 text-emerald-400/20 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                    </svg>
                    <p className="text-gray-500 font-mono text-sm">Profile Image</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: '50+', label: 'Projects Completed', color: 'emerald' },
                { number: '3+', label: 'Years Experience', color: 'cyan' },
                { number: '100+', label: 'GitHub Repos', color: 'purple' },
                { number: '20+', label: 'Technologies', color: 'blue' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-slate-800 border border-emerald-400/20 rounded-lg p-6 hover:border-emerald-400/50 transition-all group"
                  style={{
                    animation: `fadeInUp 0.8s ease-out ${i * 0.1}s forwards`,
                    opacity: 0,
                  }}
                >
                  <div className={`text-3xl font-bold text-${stat.color}-400 mb-2 group-hover:scale-110 transition-transform`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm font-mono">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
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
