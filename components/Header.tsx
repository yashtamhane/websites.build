'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [logoError, setLogoError] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-primary/10">
      <div className="w-full">
        <div className="flex justify-between items-center py-4 px-20">
          {/* Logo - Left aligned */}
          <Link href="/" className="flex items-center">
            {!logoError ? (
              <div className="relative">
                <Image
                  src="/logo.jpg"
                  alt="websites.build"
                  width={280}
                  height={84}
                  className="h-16 w-auto"
                  onError={() => setLogoError(true)}
                  priority
                />
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-primary">websites</span>
                  <span className="text-3xl font-bold text-accent">.build</span>
                </div>
                <span className="text-sm text-secondary -mt-1">
                  Grow your business online
                </span>
              </div>
            )}
          </Link>

          {/* Navigation - Right aligned */}
          <nav className="hidden md:flex items-center space-x-8 ml-auto">
            <Link
              href="#templates"
              className="text-primary hover:text-accent transition-colors font-medium"
            >
              Templates
            </Link>
            <Link
              href="#faq"
              className="text-primary hover:text-accent transition-colors font-medium"
            >
              FAQ
            </Link>
            <Link
              href="#contact"
              className="text-primary hover:text-accent transition-colors font-medium"
            >
              Contact
            </Link>
            <Link
              href="#form"
              className="bg-accent text-background px-6 py-2 rounded-full hover:bg-accent/90 transition-colors font-medium"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden text-primary">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
