'use client';

import { useState } from 'react';

export default function TemplateGallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const templates = [
    {
      id: 1,
      name: 'Specialty Gifts',
      category: 'gifts',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop',
      preview: '/preview/specialty-gifts',
      description: 'Perfect for gift shops and boutiques selling personalized products',
    },
    {
      id: 2,
      name: 'Developer Portfolio',
      category: 'portfolio',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop',
      preview: '/preview/developer-portfolio',
      description: 'Ideal for software developers and tech professionals showcasing their projects',
    },
    {
      id: 3,
      name: 'Creative Portfolio',
      category: 'portfolio',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&auto=format&fit=crop',
      preview: '/preview/creative-portfolio',
      description: 'Great for photographers, designers, and visual artists displaying their work',
    },
    {
      id: 4,
      name: 'Marketing Agency',
      category: 'business',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
      preview: '/preview/marketing-agency',
      description: 'Built for marketing agencies and consultancies looking to attract clients',
    },
    {
      id: 5,
      name: 'Marketing Pro',
      category: 'business',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
      preview: '/preview/marketing-pro',
      description: 'Premium option for established agencies wanting to stand out from competitors',
    },
    {
      id: 6,
      name: 'Restaurant',
      category: 'business',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop',
      preview: '/preview/restaurant',
      description: 'Perfect for restaurants, cafes, and food businesses with menus and online reservations',
    },
  ];

  const categories = [
    { id: 'all', name: 'All Templates' },
    { id: 'business', name: 'Business' },
    { id: 'portfolio', name: 'Portfolio' },
  ];

  const filteredTemplates =
    selectedCategory === 'all'
      ? templates
      : templates.filter((t) => t.category === selectedCategory);

  return (
    <section id="templates" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary text-center mb-4">
          Our Custom-Built Templates
        </h2>
        <p className="text-center text-secondary mb-8 max-w-2xl mx-auto">
          Every template is handcrafted by our team at websites.build. Select one that fits your vision, or describe your own custom design below
        </p>

        {/* Category Filter and View Toggle */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedCategory === category.id
                    ? 'bg-accent text-background'
                    : 'bg-background border border-primary/20 text-primary hover:border-accent'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* View Toggle - Mobile Only */}
          <div className="flex gap-2 md:hidden">
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
        </div>

        {/* Template Grid - Desktop (always 3 columns) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
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
                <div className="flex gap-2">
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
            {filteredTemplates.map((template) => (
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
            {filteredTemplates.map((template) => (
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

        {/* Jump to Form CTA */}
        <div className="mt-12 text-center">
          <p className="text-secondary mb-4">
            Don't see what you're looking for? Describe your custom design.
          </p>
          <a
            href="/get-started"
            className="inline-block bg-accent text-background px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent/90 transition-all transform hover:scale-105"
          >
            Get Started →
          </a>
        </div>
      </div>
    </section>
  );
}
