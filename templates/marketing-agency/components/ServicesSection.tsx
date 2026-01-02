'use client';

import { useState } from 'react';

export default function ServicesSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const services = [
    {
      icon: '📊',
      title: 'Social Media Marketing',
      description: 'Build engaged communities and drive conversions across all major platforms.',
      gradient: 'from-purple-600 to-pink-600',
    },
    {
      icon: '🎯',
      title: 'Performance Marketing',
      description: 'Data-driven campaigns optimized for maximum ROI and conversions.',
      gradient: 'from-pink-600 to-orange-500',
    },
    {
      icon: '✨',
      title: 'Brand Strategy',
      description: 'Create a powerful brand identity that resonates with your audience.',
      gradient: 'from-orange-500 to-purple-600',
    },
    {
      icon: '📱',
      title: 'Content Creation',
      description: 'Compelling content that engages, educates, and converts.',
      gradient: 'from-purple-600 to-pink-500',
    },
    {
      icon: '🚀',
      title: 'Growth Hacking',
      description: 'Innovative strategies to scale your business rapidly.',
      gradient: 'from-pink-500 to-orange-600',
    },
    {
      icon: '📈',
      title: 'Analytics & Insights',
      description: 'Turn data into actionable strategies for continuous growth.',
      gradient: 'from-orange-600 to-purple-500',
    },
  ];

  return (
    <section id="services" className="py-32 px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              Our Services
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive marketing solutions designed to accelerate your growth
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative"
            >
              {/* Glow Effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
              />

              {/* Card */}
              <div
                className={`relative bg-white border-2 border-gray-100 rounded-3xl p-8 transition-all duration-300 ${
                  hoveredCard === index ? 'transform -translate-y-2 shadow-2xl' : 'shadow-lg'
                }`}
              >
                {/* Icon */}
                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Hover Arrow */}
                <div
                  className={`mt-6 flex items-center gap-2 font-semibold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                >
                  Learn More
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-2 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
