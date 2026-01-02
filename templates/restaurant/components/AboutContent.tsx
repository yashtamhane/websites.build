'use client';

import { useState, useEffect, useRef } from 'react';

export default function AboutContent() {
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleSections((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const team = [
    {
      name: 'Chef Marco Rodriguez',
      role: 'Head Chef & Co-Founder',
      image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=600&auto=format&fit=crop',
      bio: '25 years of culinary excellence across Michelin-starred kitchens',
    },
    {
      name: 'Sarah Chen',
      role: 'Pastry Chef',
      image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=600&auto=format&fit=crop',
      bio: 'Award-winning pastry artist with a passion for innovation',
    },
    {
      name: 'James Anderson',
      role: 'Sous Chef',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&auto=format&fit=crop',
      bio: 'Specialist in fusion cuisine and locally-sourced ingredients',
    },
    {
      name: 'Nina Patel',
      role: 'Restaurant Manager',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop',
      bio: 'Dedicated to creating unforgettable dining experiences',
    },
  ];

  const values = [
    {
      icon: '🌿',
      title: 'Sustainability',
      description: 'We partner with local farms and prioritize sustainable sourcing for all our ingredients.',
    },
    {
      icon: '❤️',
      title: 'Passion',
      description: 'Every dish is crafted with genuine love and attention to detail by our dedicated team.',
    },
    {
      icon: '✨',
      title: 'Innovation',
      description: 'We continuously evolve our menu, blending traditional techniques with modern creativity.',
    },
    {
      icon: '🤝',
      title: 'Community',
      description: 'We believe in building connections through food and giving back to our community.',
    },
  ];

  return (
    <section className="py-10 px-4 bg-white">
      <div className="max-w-[1600px] mx-auto">
        {/* Page Header */}
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-6">
            ABOUT
            <span className="block bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 bg-clip-text text-transparent">
              US
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The story behind the flavors that bring people together
          </p>
        </div>

        {/* Story Section */}
        <div
          ref={(el) => {
            sectionRefs.current[0] = el;
          }}
          data-index={0}
          className={`grid md:grid-cols-2 gap-12 items-center mb-32 transition-all duration-700 ${
            visibleSections.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="relative h-[500px] rounded-3xl overflow-hidden border-2 border-orange-200">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop"
              alt="Restaurant interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-orange-500/30 to-transparent" />
          </div>
          <div>
            <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-bold mb-6">
              OUR STORY
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Where It All
              <span className="block text-orange-500">Began</span>
            </h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                Founded in 2010, FLAVORHAUS started with a simple dream: to create a space where exceptional food meets genuine hospitality. What began as a small family-owned restaurant has grown into a beloved culinary destination.
              </p>
              <p>
                Our founders, Chef Marco and his wife Nina, combined their passion for cooking with a vision to serve dishes that tell stories. Every recipe is a celebration of flavors from around the world, reimagined with locally-sourced ingredients.
              </p>
              <p>
                Today, we continue to honor that original vision by staying true to quality, innovation, and the warm, welcoming atmosphere that makes FLAVORHAUS feel like home.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div
          ref={(el) => {
            sectionRefs.current[1] = el;
          }}
          data-index={1}
          className={`mb-32 transition-all duration-700 ${
            visibleSections.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-16">
            <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-bold mb-4">
              OUR VALUES
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              What We
              <span className="block text-orange-500">Stand For</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-8 border-2 border-orange-200 hover:border-orange-500 hover:shadow-xl transition-all text-center"
              >
                <div className="text-6xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-black text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div
          ref={(el) => {
            sectionRefs.current[2] = el;
          }}
          data-index={2}
          className={`transition-all duration-700 ${
            visibleSections.has(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-16">
            <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-bold mb-4">
              MEET THE TEAM
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              The People Behind
              <span className="block text-orange-500">Your Experience</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our talented team brings passion, expertise, and creativity to every dish
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl overflow-hidden border-2 border-orange-200 hover:border-orange-500 hover:shadow-2xl transition-all"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-black mb-1">{member.name}</h3>
                    <p className="text-sm text-orange-300 font-semibold">{member.role}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <p className="text-gray-600 mb-6 text-lg">
            Ready to taste the passion?
          </p>
          <a
            href="/preview/restaurant/reservations"
            className="inline-block group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-10 py-5 rounded-full font-black text-lg hover:scale-105 transition-transform">
                BOOK A TABLE NOW
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
