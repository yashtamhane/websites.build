'use client';

import { useState } from 'react';

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    alert('Message sent! We\'ll get back to you soon. (This is a demo)');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="py-10 px-4 bg-white">
      <div className="max-w-[1600px] mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-6">
            GET IN
            <span className="block bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 bg-clip-text text-transparent">
              TOUCH
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Contact Form */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 rounded-3xl blur-xl opacity-20" />

            <div className="relative bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-3xl p-10">
              <h2 className="text-3xl font-black text-gray-900 mb-6">Send Us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full bg-white border-2 border-orange-200 rounded-xl px-5 py-4 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none transition-all"
                  />
                </div>

                {/* Email and Phone */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full bg-white border-2 border-orange-200 rounded-xl px-5 py-4 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 99999 99999"
                      className="w-full bg-white border-2 border-orange-200 rounded-xl px-5 py-4 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border-2 border-orange-200 rounded-xl px-5 py-4 text-gray-900 focus:border-orange-500 focus:outline-none transition-all"
                  >
                    <option value="">Select a subject</option>
                    <option value="reservation">Reservation Inquiry</option>
                    <option value="event">Private Event</option>
                    <option value="feedback">Feedback</option>
                    <option value="catering">Catering Services</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell us what's on your mind..."
                    className="w-full bg-white border-2 border-orange-200 rounded-xl px-5 py-4 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity" />
                  <div className="relative bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-5 rounded-xl font-black text-lg hover:scale-105 transition-transform">
                    SEND MESSAGE
                  </div>
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Address */}
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-3xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center text-white text-2xl">
                  📍
                </div>
                <h3 className="text-2xl font-black text-gray-900">Visit Us</h3>
              </div>
              <div className="text-gray-700 leading-relaxed">
                <p className="font-semibold text-lg mb-2">FLAVORHAUS</p>
                <p>123 Culinary Street</p>
                <p>Food District, FC 12345</p>
                <p className="mt-4 text-sm">
                  Located in the heart of the food district, easily accessible by metro and car parking available.
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-3xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center text-white text-2xl">
                  📞
                </div>
                <h3 className="text-2xl font-black text-gray-900">Call Us</h3>
              </div>
              <div className="space-y-3 text-gray-700">
                <div>
                  <p className="font-bold text-orange-600 mb-1">Main Line</p>
                  <a href="tel:+919999999999" className="text-lg hover:text-orange-500 transition-colors">
                    +91 99999 99999
                  </a>
                </div>
                <div>
                  <p className="font-bold text-orange-600 mb-1">Reservations</p>
                  <a href="tel:+919999999999" className="text-lg hover:text-orange-500 transition-colors">
                    +91 99999 99999
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-3xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center text-white text-2xl">
                  ✉️
                </div>
                <h3 className="text-2xl font-black text-gray-900">Email Us</h3>
              </div>
              <div className="space-y-3 text-gray-700">
                <div>
                  <p className="font-bold text-orange-600 mb-1">General Inquiries</p>
                  <a href="mailto:hello@flavorhaus.com" className="hover:text-orange-500 transition-colors">
                    hello@flavorhaus.com
                  </a>
                </div>
                <div>
                  <p className="font-bold text-orange-600 mb-1">Private Events</p>
                  <a href="mailto:events@flavorhaus.com" className="hover:text-orange-500 transition-colors">
                    events@flavorhaus.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 rounded-3xl blur-xl opacity-20" />

          <div className="relative bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-3xl p-8">
            <h2 className="text-3xl font-black text-gray-900 mb-6 text-center">Find Us on the Map</h2>
            <div className="relative h-96 bg-gray-200 rounded-2xl overflow-hidden">
              {/* Placeholder for map - in a real implementation, you'd use Google Maps or similar */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <div className="text-6xl mb-4">🗺️</div>
                  <p className="font-semibold">Interactive map would go here</p>
                  <p className="text-sm">(Google Maps, Mapbox, etc.)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6 text-lg">
            Prefer to make a reservation instead?
          </p>
          <a
            href="/preview/restaurant/reservations"
            className="inline-block group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative border-3 border-orange-500 text-orange-600 px-10 py-5 rounded-full font-black text-lg hover:bg-orange-500 hover:text-white transition-all bg-white">
                BOOK A TABLE →
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
