'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function GiftHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="w-full px-12 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="#" className="flex items-center">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-pink-600">The Gift Gallery</span>
              <span className="text-xs text-gray-600">Perfect Gifts for Every Occasion</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#home" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
              Home
            </Link>
            <Link href="#categories" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
              Browse
            </Link>
            <Link href="#featured" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
              Featured
            </Link>
            <Link href="#services" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
              Services
            </Link>
            <Link href="#about" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">
              About
            </Link>
            <Link
              href="#contact"
              className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition-colors font-medium"
            >
              Contact Us
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-3">
            <Link href="#home" className="block text-gray-700 hover:text-pink-600 transition-colors font-medium">
              Home
            </Link>
            <Link href="#categories" className="block text-gray-700 hover:text-pink-600 transition-colors font-medium">
              Browse
            </Link>
            <Link href="#featured" className="block text-gray-700 hover:text-pink-600 transition-colors font-medium">
              Featured
            </Link>
            <Link href="#services" className="block text-gray-700 hover:text-pink-600 transition-colors font-medium">
              Services
            </Link>
            <Link href="#about" className="block text-gray-700 hover:text-pink-600 transition-colors font-medium">
              About
            </Link>
            <Link
              href="#contact"
              className="block bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition-colors font-medium text-center"
            >
              Contact Us
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
