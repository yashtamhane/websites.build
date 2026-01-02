'use client';

import { useState } from 'react';

export default function TemplateGallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const templates = [
    {
      id: 1,
      name: 'Specialty Gifts',
      category: 'gifts',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop',
      preview: '/preview/specialty-gifts',
      description: 'Perfect for gift shops, boutiques, and personalized gift services',
    },
    {
      id: 2,
      name: 'Developer Portfolio',
      category: 'portfolio',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop',
      preview: '/preview/developer-portfolio',
      description: 'Modern dark-themed portfolio with animations for developers and tech professionals',
    },
    {
      id: 3,
      name: 'Creative Portfolio',
      category: 'portfolio',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&auto=format&fit=crop',
      preview: '/preview/creative-portfolio',
      description: 'Elegant monochromatic portfolio for photographers and visual artists',
    },
    {
      id: 4,
      name: 'Marketing Agency',
      category: 'business',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
      preview: '/preview/marketing-agency',
      description: 'Bold gradient design with animated stats for marketing and growth agencies',
    },
    {
      id: 5,
      name: 'Marketing Pro',
      category: 'business',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
      preview: '/preview/marketing-pro',
      description: 'Ultra-premium dark theme with neon accents, glitch effects, and flip cards for cutting-edge agencies',
    },
    {
      id: 6,
      name: 'Restaurant',
      category: 'business',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop',
      preview: '/preview/restaurant',
      description: 'Modern vibrant multi-page template for restaurants, cafes, and eateries with menu, gallery, and reservations',
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

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
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

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                {/* Created by badge */}
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
      </div>
    </section>
  );
}
