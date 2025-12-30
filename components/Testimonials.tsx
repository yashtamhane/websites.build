'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      comment: 'Amazing work! Our new website has brought in so many new customers. Highly recommend!',
      name: 'Sarah Martinez',
      business: 'Fresh Bites Cafe',
    },
    {
      id: 2,
      comment: 'Professional, fast, and exactly what we needed. Our online presence has completely transformed.',
      name: 'Michael Chen',
      business: 'Chen Photography',
    },
    {
      id: 3,
      comment: 'The template options were great, and the final result exceeded our expectations. Worth every penny!',
      name: 'Jessica Thompson',
      business: 'Thompson Boutique',
    },
    {
      id: 4,
      comment: 'Responsive, creative, and easy to work with. Our sales have increased significantly since launch.',
      name: 'David Rodriguez',
      business: 'Rodriguez Landscaping',
    },
    {
      id: 5,
      comment: 'Beautiful design and smooth functionality. Our clients love the new booking system!',
      name: 'Amanda Lee',
      business: 'Serenity Spa',
    },
    {
      id: 6,
      comment: 'From concept to launch, the entire process was seamless. Couldn\'t be happier with our site!',
      name: 'Robert Williams',
      business: 'Williams Auto Repair',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 3 >= testimonials.length ? 0 : prev + 3));
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 3);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary text-center mb-12">
          What Our Clients Say
        </h2>

        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {visibleTestimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-background p-6 rounded-lg shadow-md border border-primary/10"
                >
                  <div className="text-accent mb-4">
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-primary mb-4 italic">{testimonial.comment}</p>
                  <div className="border-t border-primary/10 pt-4">
                    <p className="font-semibold text-primary">{testimonial.name}</p>
                    <p className="text-secondary text-sm">{testimonial.business}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * 3)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentIndex === index * 3
                    ? 'bg-accent w-8'
                    : 'bg-primary/20 hover:bg-primary/40'
                }`}
                aria-label={`Go to testimonial set ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
