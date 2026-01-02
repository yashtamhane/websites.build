'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DevHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg shadow-emerald-500/10' : 'bg-transparent'
      }`}
    >
      <div className="w-full px-12 py-4">
        <div className="flex justify-between items-center">
          {/* Logo with typing cursor effect */}
          <Link href="#home" className="group flex items-center gap-2">
            <span className="text-2xl font-mono font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors">
              {'<'}
              <span className="text-white">DevName</span>
              {' />'}
            </span>
            <span className="w-0.5 h-6 bg-emerald-400 animate-pulse" />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setActiveSection(item.id)}
                className="relative group"
              >
                <span className="text-gray-300 hover:text-emerald-400 transition-colors font-mono text-sm">
                  {item.label}
                </span>
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-400 transition-all duration-300 ${
                    activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            ))}
          </nav>

          {/* CTA Button with glow effect */}
          <a
            href="#contact"
            className="relative hidden md:block px-6 py-2 font-mono text-sm text-emerald-400 border border-emerald-400 rounded hover:bg-emerald-400/10 transition-all group overflow-hidden"
          >
            <span className="relative z-10">Hire Me</span>
            <div className="absolute inset-0 bg-emerald-400/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </header>
  );
}
