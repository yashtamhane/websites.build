'use client';

import { useState, useEffect, useRef } from 'react';

export default function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      title: 'Portrait',
      description: 'Capturing personality and emotion in timeless portraits',
      image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&auto=format&fit=crop',
    },
    {
      title: 'Wedding',
      description: 'Documenting your special day with elegance and authenticity',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop',
    },
    {
      title: 'Commercial',
      description: 'Professional imagery that elevates your brand',
      image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&auto=format&fit=crop',
    },
    {
      title: 'Events',
      description: 'Preserving the energy and atmosphere of your events',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&auto=format&fit=crop',
    },
  ];

  return (
    <section id="services" ref={sectionRef} className="py-32 px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-24 text-center">
          <h2 className="text-5xl md:text-7xl font-light tracking-widest mb-6">SERVICES</h2>
          <div className="w-24 h-px bg-black mx-auto mb-6" />
          <p className="text-gray-600 tracking-wider text-sm">WHAT I OFFER</p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-16">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative overflow-hidden aspect-[4/3] mb-6">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
              </div>
              <div className="space-y-3">
                <h3 className="text-3xl font-light tracking-wider">{service.title}</h3>
                <div className="w-12 h-px bg-amber-600" />
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-24">
          <p className="text-gray-600 mb-8 tracking-wide">
            Interested in working together?
          </p>
          <a
            href="#contact"
            className="inline-block px-12 py-4 bg-black text-white text-sm tracking-widest hover:bg-amber-600 transition-all duration-300"
          >
            LET'S TALK
          </a>
        </div>
      </div>
    </section>
  );
}
