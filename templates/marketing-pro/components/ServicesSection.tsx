'use client';

import { useState } from 'react';

export default function ServicesSection() {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  const services = [
    {
      icon: '⚡',
      title: 'Performance Marketing',
      front: 'Data-driven campaigns that print money',
      back: 'Advanced funnel optimization, A/B testing, and conversion rate optimization that turns clicks into customers.',
      color: 'cyan',
    },
    {
      icon: '🚀',
      title: 'Growth Hacking',
      front: 'Explosive growth strategies that scale fast',
      back: 'Viral loops, referral systems, and growth experiments that 10x your user base in weeks, not years.',
      color: 'blue',
    },
    {
      icon: '🎯',
      title: 'Brand Strategy',
      front: 'Stand out or fade out in the market',
      back: 'Positioning, messaging, and visual identity that makes your brand impossible to ignore or forget.',
      color: 'magenta',
    },
    {
      icon: '📱',
      title: 'Social Domination',
      front: 'Own every platform where your audience lives',
      back: 'Viral content strategies, influencer partnerships, and community building that creates raving fans.',
      color: 'orange',
    },
    {
      icon: '💰',
      title: 'Paid Acquisition',
      front: 'Turn ad spend into profit machines',
      back: 'Meta, Google, TikTok, LinkedIn ads optimized for maximum ROI with predictable, scalable results.',
      color: 'cyan',
    },
    {
      icon: '📊',
      title: 'Analytics & Attribution',
      front: 'Know exactly what drives revenue',
      back: 'Multi-touch attribution, predictive analytics, and dashboards that show you where every dollar goes.',
      color: 'blue',
    },
  ];

  return (
    <section id="services" className="py-32 px-12 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
            SERVICES THAT
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-magenta-500 bg-clip-text text-transparent">
              DEMOLISH COMPETITION
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Click any card to see how we'll transform your business
          </p>
        </div>

        {/* Flip Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="h-80 perspective-1000"
              onMouseEnter={() => setFlippedCard(index)}
              onMouseLeave={() => setFlippedCard(null)}
            >
              <div
                className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
                  flippedCard === index ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front */}
                <div className="absolute inset-0 backface-hidden">
                  <div className={`relative h-full bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-${service.color}-500/30 rounded-2xl p-8 hover:border-${service.color}-500 transition-all group`}>
                    {/* Glow */}
                    <div className={`absolute inset-0 bg-${service.color}-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity`} />

                    {/* Content */}
                    <div className="relative h-full flex flex-col justify-between">
                      <div>
                        <div className="text-6xl mb-6">{service.icon}</div>
                        <h3 className="text-2xl font-black text-white mb-4">{service.title}</h3>
                        <p className="text-gray-400 leading-relaxed">{service.front}</p>
                      </div>
                      <div className={`flex items-center gap-2 text-${service.color}-400 font-bold`}>
                        <span>FLIP TO LEARN MORE</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 backface-hidden rotate-y-180">
                  <div className={`relative h-full bg-gradient-to-br from-${service.color}-500 to-${service.color}-700 rounded-2xl p-8 shadow-2xl shadow-${service.color}-500/50`}>
                    <div className="h-full flex flex-col justify-between">
                      <div>
                        <h3 className="text-2xl font-black text-white mb-6">{service.title}</h3>
                        <p className="text-white/90 leading-relaxed text-lg">{service.back}</p>
                      </div>
                      <div className="flex items-center gap-2 text-white font-bold">
                        <span>GET STARTED</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
}
