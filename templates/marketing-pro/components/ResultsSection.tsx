'use client';

import { useState, useEffect, useRef } from 'react';

export default function ResultsSection() {
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

  const results = [
    {
      size: 'large',
      client: 'TechVault',
      metric: '+1200%',
      label: 'Revenue Growth',
      subtitle: 'In 8 Months',
      bg: 'from-cyan-500 to-blue-600',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
    },
    {
      size: 'small',
      client: 'NexusApp',
      metric: '2.4M',
      label: 'Users Acquired',
      subtitle: 'Organic Growth',
      bg: 'from-blue-600 to-magenta-600',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop',
    },
    {
      size: 'small',
      client: 'FitPro',
      metric: '$8.2M',
      label: 'Ad Revenue',
      subtitle: 'From $200K Spend',
      bg: 'from-magenta-600 to-orange-500',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&auto=format&fit=crop',
    },
    {
      size: 'medium',
      client: 'EcoStore',
      metric: '4100%',
      label: 'ROAS',
      subtitle: 'Meta Ads',
      bg: 'from-orange-500 to-cyan-500',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=700&auto=format&fit=crop',
    },
    {
      size: 'medium',
      client: 'FinanceOS',
      metric: '850K',
      label: 'Qualified Leads',
      subtitle: 'In 6 Months',
      bg: 'from-cyan-600 to-blue-500',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=700&auto=format&fit=crop',
    },
  ];

  const getSizeClass = (size: string) => {
    switch (size) {
      case 'large':
        return 'md:col-span-2 md:row-span-2';
      case 'medium':
        return 'md:col-span-2';
      case 'small':
        return 'md:col-span-1';
      default:
        return '';
    }
  };

  return (
    <section id="work" className="py-32 px-12 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
            THE PROOF IS IN
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-magenta-500 bg-clip-text text-transparent">
              THE NUMBERS
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Real clients. Insane results. No BS.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-fr">
          {results.map((result, index) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              data-index={index}
              className={`${getSizeClass(result.size)} group transition-all duration-700 ${
                visibleCards.has(index) ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative h-full min-h-[300px] rounded-2xl overflow-hidden border-2 border-cyan-500/20 hover:border-cyan-500 transition-all">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={result.image}
                    alt={result.client}
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${result.bg} opacity-60`} />
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-8">
                  <div>
                    <div className="text-sm font-bold text-white/80 mb-2">{result.client}</div>
                  </div>
                  <div>
                    <div className="text-5xl md:text-6xl font-black text-white mb-2 group-hover:scale-110 transition-transform">
                      {result.metric}
                    </div>
                    <div className="text-xl font-bold text-white/90">{result.label}</div>
                    <div className="text-sm text-white/70 mt-1">{result.subtitle}</div>
                  </div>
                </div>

                {/* Neon Border Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className={`absolute inset-0 bg-gradient-to-br ${result.bg} blur-xl`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="#contact"
            className="inline-block relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-cyan-500 text-slate-950 px-10 py-4 rounded-lg font-black text-lg hover:bg-cyan-400 transition-all">
              GET RESULTS LIKE THESE
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
