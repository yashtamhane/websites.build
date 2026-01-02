'use client';

import { useState, useEffect, useRef } from 'react';

export default function HeroSection() {
  const [glitchText, setGlitchText] = useState('TRANSFORM');
  const [isMounted, setIsMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Glitch effect on text
  useEffect(() => {
    const glitchChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    const originalText = 'TRANSFORM';
    let frame = 0;

    const interval = setInterval(() => {
      if (frame % 60 === 0) {
        // Glitch every 60 frames
        const glitched = originalText
          .split('')
          .map((char, i) => (Math.random() > 0.7 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char))
          .join('');
        setGlitchText(glitched);

        setTimeout(() => setGlitchText(originalText), 50);
      }
      frame++;
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(6, 182, 212) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(6, 182, 212) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Morphing Blobs */}
      {isMounted && (
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-magenta-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full px-12 py-32 text-center">
        <div className="max-w-6xl mx-auto">
          {/* Glitch Text */}
          <div className="mb-8">
            <h1 className="text-7xl md:text-9xl font-black mb-4 relative inline-block">
              <span className="relative text-white">
                {glitchText}
                <span className="absolute inset-0 text-cyan-500 opacity-70 blur-sm">{glitchText}</span>
                <span className="absolute inset-0 text-magenta-500 opacity-50 blur-md">{glitchText}</span>
              </span>
            </h1>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gray-400">Your Brand Into</span>{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-magenta-500 bg-clip-text text-transparent">
              Digital Domination
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            We don't do basic marketing. We architect viral campaigns, engineer explosive growth,
            and build unstoppable brands that dominate their markets.
          </p>

          {/* Neon CTAs */}
          <div className="flex flex-wrap justify-center gap-6 mb-20">
            <a
              href="#contact"
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-cyan-500 text-slate-950 px-10 py-4 rounded-lg font-black text-lg hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/50">
                START YOUR DOMINATION
              </div>
            </a>
            <a
              href="#work"
              className="relative px-10 py-4 border-2 border-cyan-500 text-cyan-400 rounded-lg font-bold text-lg hover:bg-cyan-500/10 transition-all group"
            >
              <span className="relative z-10">SEE THE PROOF</span>
              <div className="absolute inset-0 bg-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity rounded-lg" />
            </a>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { num: '847', label: 'Brands Scaled', color: 'cyan' },
              { num: '2.3M', label: 'Leads Generated', color: 'blue' },
              { num: '580%', label: 'Avg Growth', color: 'magenta' },
              { num: '$180M', label: 'Revenue Driven', color: 'orange' },
            ].map((stat, i) => (
              <div
                key={i}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-${stat.color}-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity`} />
                <div className="relative bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/50 transition-all">
                  <div className={`text-4xl font-black text-${stat.color}-400 mb-2`}>{stat.num}</div>
                  <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}
