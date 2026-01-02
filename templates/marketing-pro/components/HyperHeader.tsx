'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HyperHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/95 backdrop-blur-xl border-b border-cyan-500/20' : 'bg-transparent'
      }`}
    >
      <div className="w-full px-12 py-5">
        <div className="flex justify-between items-center">
          {/* Logo with Neon Glow */}
          <Link href="#home" className="group relative">
            <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/50">
                <div className="w-6 h-6 border-2 border-white rounded animate-pulse" />
              </div>
              <span className="text-2xl font-black tracking-tight">
                <span className="text-white">HYPER</span>
                <span className="text-cyan-400">.</span>
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {['Services', 'Work', 'Results', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative text-gray-300 hover:text-white transition-colors font-medium group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* CTA Button with Neon Border */}
          <a
            href="#contact"
            className="hidden md:block relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-magenta-600 opacity-75 blur group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-slate-900 border-2 border-cyan-500 px-6 py-2.5 rounded-lg font-bold text-white hover:bg-slate-800 transition-all">
              Let's Talk
            </div>
          </a>
        </div>
      </div>
    </header>
  );
}
