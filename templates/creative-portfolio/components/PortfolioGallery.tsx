'use client';

import { useState, useEffect, useRef } from 'react';

export default function PortfolioGallery() {
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set());
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const portfolioImages = [
    {
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop',
      title: 'Urban Stories',
      category: 'Street',
      size: 'large', // Full width
    },
    {
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop',
      title: 'Golden Hour',
      category: 'Portrait',
      size: 'medium', // 2/3 width
    },
    {
      url: 'https://images.unsplash.com/photo-1502945015378-0e284ca1a5be?w=400&auto=format&fit=crop',
      title: 'Silent Beauty',
      category: 'Nature',
      size: 'small', // 1/3 width
    },
    {
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&auto=format&fit=crop',
      title: 'Timeless Elegance',
      category: 'Wedding',
      size: 'small',
    },
    {
      url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=700&auto=format&fit=crop',
      title: 'Moments',
      category: 'Portrait',
      size: 'medium',
    },
    {
      url: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&auto=format&fit=crop',
      title: 'City Lights',
      category: 'Urban',
      size: 'large',
    },
    {
      url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop',
      title: 'Natural Light',
      category: 'Portrait',
      size: 'medium',
    },
    {
      url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&auto=format&fit=crop',
      title: 'Wilderness',
      category: 'Landscape',
      size: 'small',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleImages((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2 }
    );

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const getSizeClass = (size: string) => {
    switch (size) {
      case 'large':
        return 'col-span-full';
      case 'medium':
        return 'col-span-full md:col-span-2';
      case 'small':
        return 'col-span-full md:col-span-1';
      default:
        return 'col-span-full';
    }
  };

  const getAspectClass = (size: string) => {
    switch (size) {
      case 'large':
        return 'aspect-[16/9]';
      case 'medium':
        return 'aspect-[4/5]';
      case 'small':
        return 'aspect-square';
      default:
        return 'aspect-[4/3]';
    }
  };

  return (
    <section id="portfolio" className="py-32 px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-24 text-center">
          <h2 className="text-5xl md:text-7xl font-light tracking-widest mb-6">PORTFOLIO</h2>
          <div className="w-24 h-px bg-black mx-auto mb-6" />
          <p className="text-gray-600 tracking-wider text-sm">SELECTED WORKS</p>
        </div>

        {/* Staggered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {portfolioImages.map((image, index) => (
            <div
              key={index}
              ref={(el) => {
                imageRefs.current[index] = el;
              }}
              data-index={index}
              className={`group ${getSizeClass(image.size)} transition-all duration-700 ${
                visibleImages.has(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${(index % 3) * 100}ms` }}
            >
              <div className={`relative ${getAspectClass(image.size)} overflow-hidden bg-gray-100`}>
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-xs tracking-widest text-amber-500 mb-2">{image.category.toUpperCase()}</p>
                    <h3 className="text-2xl font-light tracking-wider">{image.title}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-24">
          <a
            href="#contact"
            className="inline-block px-12 py-4 border border-black text-black text-sm tracking-widest hover:bg-black hover:text-white transition-all duration-300"
          >
            VIEW MORE WORK
          </a>
        </div>
      </div>
    </section>
  );
}
