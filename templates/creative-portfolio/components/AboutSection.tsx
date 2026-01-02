'use client';

import { useState, useEffect, useRef } from 'react';

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-32 px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1554844453-7ea2a562a6c8?w=800&auto=format&fit=crop"
                alt="Photographer"
                className="w-full aspect-[4/5] object-cover"
              />
              {/* Decorative Frame */}
              <div className="absolute -bottom-6 -right-6 w-full h-full border border-amber-600 -z-10" />
            </div>
          </div>

          {/* Content Side */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="mb-8">
              <h2 className="text-5xl md:text-6xl font-light tracking-widest mb-6">ABOUT</h2>
              <div className="w-24 h-px bg-black mb-8" />
            </div>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-lg">
                I'm a passionate photographer dedicated to capturing the essence of every moment,
                turning fleeting instances into timeless memories.
              </p>
              <p>
                With over 10 years of experience in portrait, wedding, and commercial photography,
                I bring a unique perspective to every project. My approach combines technical expertise
                with artistic vision to create images that tell compelling stories.
              </p>
              <p>
                Each photograph is crafted with attention to detail, capturing not just what you see,
                but what you feel. From the subtle play of light to the raw emotion in a candid moment,
                I strive to create work that resonates.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-gray-300">
              <div>
                <div className="text-4xl font-light mb-2">500+</div>
                <div className="text-sm tracking-wider text-gray-600">PROJECTS</div>
              </div>
              <div>
                <div className="text-4xl font-light mb-2">10+</div>
                <div className="text-sm tracking-wider text-gray-600">YEARS</div>
              </div>
              <div>
                <div className="text-4xl font-light mb-2">50+</div>
                <div className="text-sm tracking-wider text-gray-600">AWARDS</div>
              </div>
            </div>

            {/* Signature */}
            <div className="mt-12">
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='60' viewBox='0 0 200 60'%3E%3Cpath d='M10 30 Q 30 10, 50 30 T 90 30 Q 100 40, 110 30 T 150 30' stroke='%23000' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E"
                alt="Signature"
                className="h-12"
              />
              <p className="text-sm text-gray-600 mt-2">Creative Director & Photographer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
