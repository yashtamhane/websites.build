'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-primary/10">
      <div className="w-full">
        <div className="flex justify-between items-center py-4 px-4 sm:px-6 lg:px-20">
          {/* Logo - Left aligned */}
          <Link
            href="/"
            className="flex items-center cursor-pointer"
          >
            <div className="flex flex-col">
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-primary">websites</span>
                <span className="text-2xl font-bold text-accent">.build</span>
              </div>
              <span className="text-sm text-secondary -mt-1">
                Grow your business online
              </span>
            </div>
          </Link>

          {/* Navigation - Right aligned */}
          <nav className="hidden md:flex items-center space-x-8 ml-auto">
            <Link
              href="/"
              className="text-primary hover:text-accent transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/templates"
              className="text-primary hover:text-accent transition-colors font-medium"
            >
              Templates
            </Link>
            <Link
              href="/team"
              className="text-primary hover:text-accent transition-colors font-medium"
            >
              Our Team
            </Link>
            <Link
              href="/faq"
              className="text-primary hover:text-accent transition-colors font-medium"
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className="text-primary hover:text-accent transition-colors font-medium"
            >
              Contact
            </Link>
            <Link
              href="/get-started"
              className="bg-accent text-background px-6 py-2 rounded-full hover:bg-accent/90 transition-colors font-medium"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-primary/10 bg-background">
            <div className="px-4 py-4 space-y-3">
              <Link
                href="/"
                className="block text-primary hover:text-accent transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/templates"
                className="block text-primary hover:text-accent transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Templates
              </Link>
              <Link
                href="/team"
                className="block text-primary hover:text-accent transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Our Team
              </Link>
              <Link
                href="/faq"
                className="block text-primary hover:text-accent transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="/contact"
                className="block text-primary hover:text-accent transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/get-started"
                className="block bg-accent text-background px-6 py-2 rounded-full hover:bg-accent/90 transition-colors font-medium text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
