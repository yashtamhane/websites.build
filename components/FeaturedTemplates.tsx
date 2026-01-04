'use client';

import { useState } from 'react';

export default function FeaturedTemplates() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const featuredTemplates = [
    {
      id: 1,
      name: 'Developer Portfolio',
      category: 'portfolio',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop',
      preview: '/preview/developer-portfolio',
      description: 'Ideal for software developers and tech professionals showcasing their projects',
    },
    {
      id: 2,
      name: 'Marketing Agency',
      category: 'business',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
      preview: '/preview/marketing-agency',
      description: 'Built for marketing agencies and consultancies looking to attract clients',
    },
    {
      id: 3,
      name: 'Restaurant',
      category: 'business',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop',
      preview: '/preview/restaurant',
      description: 'Perfect for restaurants, cafes, and food businesses with menus and online reservations',
    },
  ];

  return (
    <section id="templates" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary text-center mb-4">
          Featured Templates
        </h2>
        <p className="text-center text-secondary mb-8 max-w-2xl mx-auto">
          Every template is handcrafted by our team. Choose one as a starting point or let us build something completely custom for you
        </p>

        {/* View Toggle - Mobile Only */}
        <div className="flex justify-center gap-2 mb-8 md:hidden">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all ${
              viewMode === 'grid'
                ? 'bg-accent text-background'
                : 'bg-background border border-primary/20 text-primary hover:border-accent'
            }`}
            aria-label="Grid view"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all ${
              viewMode === 'list'
                ? 'bg-accent text-background'
                : 'bg-background border border-primary/20 text-primary hover:border-accent'
            }`}
            aria-label="List view"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Desktop Grid - Always 3 columns */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {featuredTemplates.map((template) => (
            <a
              key={template.id}
              href={template.preview}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-background rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer block"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-3 right-3 bg-accent text-background px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  Created by websites.build
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-2">
                  {template.name}
                </h3>
                <p className="text-secondary text-sm mb-4">
                  {template.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-accent group-hover:text-accent/80 text-sm font-medium">
                    Preview →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Mobile Grid View - 2 columns, compact */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-2 gap-4 md:hidden">
            {featuredTemplates.map((template) => (
              <a
                key={template.id}
                href={template.preview}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-background rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer block"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-primary line-clamp-1">
                    {template.name}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Mobile List View - Full width, detailed */}
        {viewMode === 'list' && (
          <div className="grid grid-cols-1 gap-6 md:hidden">
            {featuredTemplates.map((template) => (
              <a
                key={template.id}
                href={template.preview}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-background rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer block"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-3 right-3 bg-accent text-background px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                    Created by websites.build
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    {template.name}
                  </h3>
                  <p className="text-secondary text-sm mb-3">
                    {template.description}
                  </p>
                  <div className="flex gap-2">
                    <span className="text-accent group-hover:text-accent/80 text-sm font-medium">
                      Preview →
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
