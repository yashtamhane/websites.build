'use client';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'CEO, TechStart Inc.',
      company: 'TechStart',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop',
      quote: 'Pulse Marketing transformed our entire go-to-market strategy. Revenue increased 400% in just 6 months.',
      metric: '+400% Revenue',
      gradient: 'from-purple-600 to-pink-600',
    },
    {
      name: 'Michael Torres',
      role: 'Founder, FashionHub',
      company: 'FashionHub',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop',
      quote: 'The ROI has been incredible. Every dollar spent with Pulse returns 10x. Best marketing investment we\'ve made.',
      metric: '10x ROI',
      gradient: 'from-pink-600 to-orange-500',
    },
    {
      name: 'Emily Rodriguez',
      role: 'CMO, FitLife App',
      company: 'FitLife',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop',
      quote: 'From 5K to 50K users in 4 months. The growth has been exponential and sustainable.',
      metric: '+900% Users',
      gradient: 'from-orange-500 to-purple-600',
    },
  ];

  return (
    <section id="testimonials" className="py-32 px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              What Our Clients Say
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - hear from the brands we've helped scale
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Gradient Border Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${testimonial.gradient} rounded-3xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300`} />

              {/* Content */}
              <div className="relative">
                {/* Quote Icon */}
                <div className={`text-6xl bg-gradient-to-r ${testimonial.gradient} bg-clip-text text-transparent mb-4 opacity-30`}>
                  "
                </div>

                {/* Quote */}
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {testimonial.quote}
                </p>

                {/* Metric Badge */}
                <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${testimonial.gradient} text-white font-bold text-sm mb-6`}>
                  {testimonial.metric}
                </div>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-white shadow-lg"
                  />
                  <div>
                    <div className="font-bold text-gray-800">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Client Logos */}
        <div className="mt-20">
          <p className="text-center text-gray-500 text-sm font-semibold mb-8 uppercase tracking-wider">
            Trusted by Leading Brands
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-40">
            {['TechStart', 'FashionHub', 'FitLife', 'GrowCo', 'ScaleUp'].map((logo, i) => (
              <div key={i} className="text-2xl font-black text-gray-800">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
