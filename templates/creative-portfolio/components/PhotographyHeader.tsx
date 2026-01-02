'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PhotographyHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Portfolio', 'About', 'Services', 'Contact'];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="w-full px-12 py-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="#home" className="group">
            <h1 className="text-2xl font-light tracking-wider text-black">
              LENS
              <span className="inline-block w-1 h-1 bg-amber-600 rounded-full ml-1 group-hover:w-3 transition-all duration-300" />
            </h1>
            <p className="text-xs text-gray-500 tracking-widest mt-0.5">PHOTOGRAPHY</p>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm tracking-wider text-gray-700 hover:text-amber-600 transition-colors relative group"
              >
                {item.toUpperCase()}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-600 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Contact Button */}
          <a
            href="#contact"
            className="hidden md:block px-6 py-2 border border-black text-black text-sm tracking-wider hover:bg-black hover:text-white transition-all duration-300"
          >
            GET IN TOUCH
          </a>
        </div>
      </div>
    </header>
  );
}
