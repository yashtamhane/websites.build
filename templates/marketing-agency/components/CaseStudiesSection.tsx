'use client';

import { useState, useEffect, useRef } from 'react';

export default function CaseStudiesSection() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const caseStudies = [
    {
      client: 'TechStart Inc.',
      industry: 'SaaS',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
      metric: 'Revenue',
      before: '$50K/mo',
      after: '$250K/mo',
      growth: '+400%',
      gradient: 'from-purple-600 to-pink-600',
    },
    {
      client: 'FashionHub',
      industry: 'E-commerce',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop',
      metric: 'Conversion Rate',
      before: '1.2%',
      after: '4.8%',
      growth: '+300%',
      gradient: 'from-pink-600 to-orange-500',
    },
    {
      client: 'FitLife App',
      industry: 'Health & Fitness',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop',
      metric: 'User Acquisition',
      before: '5K users',
      after: '50K users',
      growth: '+900%',
      gradient: 'from-orange-500 to-purple-600',
    },
  ];

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

  return (
    <section id="case-studies" className="py-32 px-12 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              Success Stories
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real clients. Real results. See how we've transformed businesses.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              data-index={index}
              className={`transition-all duration-700 ${
                visibleCards.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.client}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${study.gradient} opacity-40`} />
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{study.client}</h3>
                  <p className="text-sm text-gray-500 mb-6">{study.industry}</p>

                  {/* Metrics */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-2">{study.metric}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500">Before</p>
                          <p className="text-lg font-bold text-gray-700">{study.before}</p>
                        </div>
                        <svg
                          className={`w-8 h-8 bg-gradient-to-r ${study.gradient} bg-clip-text text-transparent`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div>
                          <p className="text-xs text-gray-500">After</p>
                          <p className={`text-lg font-bold bg-gradient-to-r ${study.gradient} bg-clip-text text-transparent`}>
                            {study.after}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Growth Badge */}
                    <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${study.gradient} text-white font-bold text-sm`}>
                      {study.growth} Growth
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="#contact"
            className="inline-block px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-lg hover:shadow-xl transition-all"
          >
            Get Similar Results
          </a>
        </div>
      </div>
    </section>
  );
}
