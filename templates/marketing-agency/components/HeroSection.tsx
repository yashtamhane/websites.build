'use client';

import { useState, useEffect, useRef } from 'react';

export default function HeroSection() {
  const [clients, setClients] = useState(0);
  const [roi, setRoi] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setClients(Math.floor(500 * progress));
      setRoi(Math.floor(300 * progress));
      setRevenue(Math.floor(50 * progress));

      if (currentStep >= steps) {
        clearInterval(timer);
        setClients(500);
        setRoi(300);
        setRevenue(50);
      }
    }, interval);
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50"
    >
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-12 py-32 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl font-black mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              Grow Your Brand
            </span>
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-8">
            Drive Real Results
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            We're not just a marketing agency. We're your growth partner.
            Data-driven strategies that deliver measurable ROI.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-6 mb-20">
            <a
              href="#contact"
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all">
                Start Growing Today
              </div>
            </a>
            <a
              href="#case-studies"
              className="px-10 py-4 border-2 border-purple-600 text-purple-600 rounded-full font-bold text-lg hover:bg-purple-50 transition-all"
            >
              View Case Studies
            </a>
          </div>

          {/* Animated Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/50">
              <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                {clients}+
              </div>
              <div className="text-gray-600 font-semibold">Brands Scaled</div>
            </div>
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/50">
              <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent mb-2">
                {roi}%
              </div>
              <div className="text-gray-600 font-semibold">Average ROI</div>
            </div>
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/50">
              <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent mb-2">
                ${revenue}M+
              </div>
              <div className="text-gray-600 font-semibold">Revenue Generated</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}
