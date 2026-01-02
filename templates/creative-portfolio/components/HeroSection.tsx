'use client';

import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const images = [
    'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&auto=format&fit=crop',
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-black">
      {/* Image Slider */}
      <div className="absolute inset-0">
        {isMounted && images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentImage === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white px-6">
          <div className="overflow-hidden mb-6">
            <h1 className="text-6xl md:text-8xl font-light tracking-widest animate-fadeInUp">
              CAPTURING
            </h1>
          </div>
          <div className="overflow-hidden mb-8">
            <h2 className="text-6xl md:text-8xl font-light tracking-widest animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              MOMENTS
            </h2>
          </div>
          <div className="overflow-hidden">
            <p className="text-sm md:text-base tracking-[0.3em] text-gray-300 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              TIMELESS PHOTOGRAPHY
            </p>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="flex flex-col items-center gap-2">
              <span className="text-white text-xs tracking-widest">SCROLL</span>
              <div className="w-px h-12 bg-white/50" />
            </div>
          </div>
        </div>
      </div>

      {/* Image Counter */}
      {isMounted && (
        <div className="absolute bottom-12 right-12 z-20 text-white">
          <div className="flex items-center gap-3">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-8 h-px transition-all duration-300 ${
                  currentImage === index ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}
