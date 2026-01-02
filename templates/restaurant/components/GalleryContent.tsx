'use client';

import { useState, useEffect, useRef } from 'react';

export default function GalleryContent() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set());
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

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
      { threshold: 0.1 }
    );

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [selectedCategory]);

  const categories = [
    { id: 'all', name: 'All Photos' },
    { id: 'dishes', name: 'Our Dishes' },
    { id: 'ambiance', name: 'Ambiance' },
    { id: 'events', name: 'Events' },
  ];

  const gallery = [
    {
      category: 'dishes',
      image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&fit=crop',
      title: 'Gourmet Pancakes',
      aspectRatio: '4/3',
      cols: 2,
    },
    {
      category: 'dishes',
      image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&auto=format&fit=crop',
      title: 'Truffle Risotto',
      aspectRatio: '3/4',
      cols: 1,
    },
    {
      category: 'ambiance',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop',
      title: 'Dining Area',
      aspectRatio: '16/9',
      cols: 2,
    },
    {
      category: 'dishes',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&auto=format&fit=crop',
      title: 'Grilled Salmon',
      aspectRatio: '4/3',
      cols: 1,
    },
    {
      category: 'ambiance',
      image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&auto=format&fit=crop',
      title: 'Cozy Corner',
      aspectRatio: '5/4',
      cols: 2,
    },
    {
      category: 'dishes',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&auto=format&fit=crop',
      title: 'Wagyu Burger',
      aspectRatio: '4/5',
      cols: 1,
    },
    {
      category: 'events',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=700&auto=format&fit=crop',
      title: 'Private Events',
      aspectRatio: '3/4',
      cols: 1,
    },
    {
      category: 'dishes',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop',
      title: 'Wood-Fired Pizza',
      aspectRatio: '16/9',
      cols: 2,
    },
    {
      category: 'ambiance',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&auto=format&fit=crop',
      title: 'Bar Area',
      aspectRatio: '4/3',
      cols: 1,
    },
    {
      category: 'dishes',
      image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&auto=format&fit=crop',
      title: 'Sushi Platter',
      aspectRatio: '9/16',
      cols: 1,
    },
    {
      category: 'events',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop',
      title: 'Chef\'s Table',
      aspectRatio: '5/4',
      cols: 2,
    },
    {
      category: 'dishes',
      image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&auto=format&fit=crop',
      title: 'Dessert Selection',
      aspectRatio: '4/5',
      cols: 1,
    },
  ];

  const filteredGallery =
    selectedCategory === 'all'
      ? gallery
      : gallery.filter((item) => item.category === selectedCategory);

  return (
    <section className="py-10 px-4 bg-white">
      <div className="max-w-[1600px] mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-6">
            PHOTO
            <span className="block bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 bg-clip-text text-transparent">
              GALLERY
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A visual journey through our culinary creations and vibrant atmosphere
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setVisibleImages(new Set());
              }}
              className={`px-6 py-3 rounded-full font-bold transition-all ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-600'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {filteredGallery.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                imageRefs.current[index] = el;
              }}
              data-index={index}
              className={`md:col-span-${item.cols} group transition-all duration-700 ${
                visibleImages.has(index) ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className={`relative aspect-[${item.aspectRatio}] rounded-xl overflow-hidden border-2 border-orange-200 hover:border-orange-500 hover:shadow-xl transition-all cursor-pointer`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-black text-white">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <p className="text-gray-600 mb-6 text-lg">
            Come experience it yourself!
          </p>
          <a
            href="/preview/restaurant/reservations"
            className="inline-block group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-10 py-5 rounded-full font-black text-lg hover:scale-105 transition-transform">
                RESERVE YOUR SPOT
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
