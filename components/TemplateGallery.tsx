'use client';

import { useState } from 'react';

export default function TemplateGallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const templates = [
    {
      id: 1,
      name: 'Online Store',
      category: 'ecommerce',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format&fit=crop',
      preview: 'https://html5up.net/massively',
    },
    {
      id: 2,
      name: 'Photography Portfolio',
      category: 'portfolio',
      image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&auto=format&fit=crop',
      preview: 'https://html5up.net/lens',
    },
    {
      id: 3,
      name: 'Fine Dining',
      category: 'dining',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop',
      preview: 'https://html5up.net/ethereal',
    },
    {
      id: 4,
      name: 'Fitness Studio',
      category: 'fitness',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop',
      preview: 'https://html5up.net/phantom',
    },
    {
      id: 5,
      name: 'Law Firm',
      category: 'professional',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop',
      preview: 'https://html5up.net/forty',
    },
    {
      id: 6,
      name: 'Real Estate Agency',
      category: 'realestate',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop',
      preview: 'https://html5up.net/landed',
    },
    {
      id: 7,
      name: 'Beauty Salon & Spa',
      category: 'beauty',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop',
      preview: 'https://html5up.net/stellar',
    },
    {
      id: 8,
      name: 'Medical Clinic',
      category: 'healthcare',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop',
      preview: 'https://html5up.net/alpha',
    },
    {
      id: 9,
      name: 'Tech Startup',
      category: 'technology',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop',
      preview: 'https://html5up.net/spectral',
    },
    {
      id: 10,
      name: 'Event Planning',
      category: 'events',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop',
      preview: 'https://html5up.net/paradigm',
    },
    {
      id: 11,
      name: 'Educational Academy',
      category: 'education',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop',
      preview: 'https://html5up.net/future-imperfect',
    },
    {
      id: 12,
      name: 'Creative Agency',
      category: 'portfolio',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop',
      preview: 'https://html5up.net/strata',
    },
    {
      id: 13,
      name: 'Coffee Shop',
      category: 'dining',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop',
      preview: 'https://html5up.net/ethereal',
    },
    {
      id: 14,
      name: 'Automotive Shop',
      category: 'automotive',
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&auto=format&fit=crop',
      preview: 'https://html5up.net/massively',
    },
    {
      id: 15,
      name: 'Construction Company',
      category: 'construction',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format&fit=crop',
      preview: 'https://html5up.net/forty',
    },
  ];

  const categories = [
    { id: 'all', name: 'All Templates' },
    { id: 'ecommerce', name: 'E-Commerce' },
    { id: 'portfolio', name: 'Portfolio' },
    { id: 'dining', name: 'Dining & Hospitality' },
    { id: 'fitness', name: 'Fitness & Wellness' },
    { id: 'professional', name: 'Professional Services' },
    { id: 'realestate', name: 'Real Estate' },
    { id: 'beauty', name: 'Beauty & Spa' },
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'technology', name: 'Technology' },
    { id: 'events', name: 'Events & Entertainment' },
    { id: 'education', name: 'Education' },
    { id: 'automotive', name: 'Automotive' },
    { id: 'construction', name: 'Construction' },
  ];

  const filteredTemplates =
    selectedCategory === 'all'
      ? templates
      : templates.filter((t) => t.category === selectedCategory);

  return (
    <section id="templates" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary text-center mb-4">
          Choose Your Style
        </h2>
        <p className="text-center text-secondary mb-8 max-w-2xl mx-auto">
          Select a template that fits your vision, or describe your own custom design below
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
            <div
              key={template.id}
              className="group bg-background rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-2">
                  {template.name}
                </h3>
                <div className="flex gap-2">
                  <a
                    href={template.preview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent/80 text-sm font-medium"
                  >
                    Preview →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
