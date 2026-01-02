'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function FeaturedDishes() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const dishes = [
    {
      name: 'Truffle Mushroom Risotto',
      category: 'Chef Special',
      price: '₹1,299',
      image: 'https://images.unsplash.com/photo-1476124369491-c4a9e619e608?w=800&auto=format&fit=crop',
      description: 'Creamy arborio rice with wild mushrooms and black truffle oil',
      badge: 'Most Popular',
    },
    {
      name: 'Grilled Salmon Supreme',
      category: 'Signature',
      price: '₹1,599',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&auto=format&fit=crop',
      description: 'Atlantic salmon with lemon butter sauce and seasonal vegetables',
      badge: 'Chef Recommended',
    },
    {
      name: 'Wagyu Beef Burger',
      category: 'Grill',
      price: '₹1,899',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop',
      description: 'Premium wagyu patty with truffle aioli and caramelized onions',
      badge: 'Bestseller',
    },
    {
      name: 'Mediterranean Mezze Platter',
      category: 'Appetizer',
      price: '₹899',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop',
      description: 'Hummus, falafel, tzatziki, olives, and fresh pita bread',
      badge: 'Sharing',
    },
  ];

  return (
    <section className="py-10 px-4 bg-white">
      <div className="max-w-[1600px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-orange-100 text-orange-600 px-3 py-1.5 rounded-full text-xs font-bold mb-2">
            OUR SPECIALTIES
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
            FEATURED
            <span className="block bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 bg-clip-text text-transparent">
              DISHES
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Handpicked by our chefs, these signature dishes showcase the best of our culinary artistry
          </p>
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
          {dishes.map((dish, index) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              data-index={index}
              className={`group transition-all duration-700 ${
                visibleCards.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl overflow-hidden border-2 border-orange-200 hover:border-orange-500 hover:shadow-xl transition-all h-full flex flex-col">
                {/* Badge */}
                <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                  {dish.badge}
                </div>

                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  <div className="text-xs font-bold text-orange-600 mb-1 uppercase tracking-wider">
                    {dish.category}
                  </div>
                  <h3 className="text-lg font-black text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {dish.name}
                  </h3>
                  <p className="text-gray-600 mb-3 leading-snug text-sm flex-1">
                    {dish.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-black bg-gradient-to-r from-orange-500 to-yellow-600 bg-clip-text text-transparent">
                      {dish.price}
                    </span>
                    <button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-1.5 rounded-full font-bold text-xs hover:shadow-lg hover:scale-105 transition-all">
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Menu CTA */}
        <div className="text-center">
          <Link
            href="/preview/restaurant/menu"
            className="inline-block group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative border-3 border-orange-500 text-orange-600 px-10 py-5 rounded-full font-black text-lg hover:bg-orange-500 hover:text-white transition-all bg-white">
                VIEW FULL MENU →
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
