'use client';

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-orange-300 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-yellow-300 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Food Icons Pattern */}
      <div className="absolute inset-0 opacity-10 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl">🍕</div>
        <div className="absolute top-32 right-20 text-5xl">🍔</div>
        <div className="absolute top-64 left-1/4 text-7xl">🍝</div>
        <div className="absolute top-96 right-1/3 text-6xl">🍷</div>
        <div className="absolute bottom-32 left-1/3 text-5xl">🥗</div>
        <div className="absolute bottom-64 right-10 text-7xl">🍰</div>
        <div className="absolute top-1/2 left-10 text-6xl">☕</div>
        <div className="absolute top-1/3 right-1/4 text-5xl">🥘</div>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 py-20 text-center">
        {/* Main Content */}
        <div className="mb-6">
          <div className="inline-block bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-1.5 rounded-full text-xs font-bold mb-4 shadow-lg">
            ✨ Now Accepting Reservations
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-5 leading-tight">
            WHERE FLAVOR
            <span className="block bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 bg-clip-text text-transparent">
              MEETS PASSION
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Experience culinary excellence with locally sourced ingredients, crafted by award-winning chefs in a vibrant atmosphere.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/preview/restaurant/reservations"
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-3.5 rounded-full font-black text-base hover:scale-105 transition-transform shadow-xl">
                BOOK YOUR TABLE
              </div>
            </Link>

            <Link
              href="/preview/restaurant/menu"
              className="group bg-white border-3 border-orange-500 text-orange-600 px-4 py-3.5 rounded-full font-black text-base hover:bg-orange-500 hover:text-white transition-all shadow-lg"
            >
              VIEW MENU
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          {[
            {
              icon: '🍽️',
              title: 'Chef Specials',
              description: 'Signature dishes curated by our master chefs',
            },
            {
              icon: '🌿',
              title: 'Farm Fresh',
              description: 'Locally sourced organic ingredients',
            },
            {
              icon: '⭐',
              title: 'Award Winning',
              description: 'Recognized for culinary excellence',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm border-2 border-orange-200 rounded-xl p-6 hover:border-orange-500 hover:shadow-xl transition-all group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1.5">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-8 h-8 text-orange-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
