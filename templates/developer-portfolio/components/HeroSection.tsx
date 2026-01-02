'use client';

import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [isMounted, setIsMounted] = useState(false);

  const roles = ['Full Stack Developer', 'UI/UX Enthusiast', 'Problem Solver', 'Code Craftsman'];

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-slate-900">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(16, 185, 129, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {isMounted && [...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-12 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Greeting */}
          <div className="mb-6 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <span className="text-emerald-400 font-mono text-lg">Hi, my name is</span>
          </div>

          {/* Name */}
          <h1 className="text-6xl md:text-8xl font-bold mb-4 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <span className="bg-gradient-to-r from-white via-emerald-200 to-white bg-clip-text text-transparent">
              John Doe
            </span>
          </h1>

          {/* Typing effect role */}
          <div className="h-16 mb-8 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-400">
              I'm a <span className="text-cyan-400">{text}</span>
              <span className="inline-block w-0.5 h-8 md:h-12 bg-cyan-400 animate-pulse ml-1" />
            </h2>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            I build exceptional digital experiences. Specialized in creating robust, scalable applications
            with modern technologies and best practices.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-6 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            <a
              href="#projects"
              className="group relative px-8 py-4 bg-emerald-400 text-slate-900 font-mono font-bold rounded overflow-hidden transition-all hover:shadow-lg hover:shadow-emerald-400/50"
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-emerald-300 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
            <a
              href="#contact"
              className="group px-8 py-4 border-2 border-emerald-400 text-emerald-400 font-mono font-bold rounded hover:bg-emerald-400/10 transition-all"
            >
              Get In Touch
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            <div className="flex flex-col items-center gap-2">
              <span className="text-gray-500 text-sm font-mono">Scroll Down</span>
              <div className="w-6 h-10 border-2 border-emerald-400/50 rounded-full p-1">
                <div className="w-1 h-2 bg-emerald-400 rounded-full animate-bounce mx-auto" />
              </div>
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
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
      `}</style>
    </section>
  );
}
