'use client';

import { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Message sent! (This is a demo)');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="relative py-32 px-12 bg-black text-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1600&auto=format&fit=crop"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Title */}
        <div className="mb-20 text-center">
          <h2 className="text-5xl md:text-7xl font-light tracking-widest mb-6">GET IN TOUCH</h2>
          <div className="w-24 h-px bg-white mx-auto mb-6" />
          <p className="text-gray-400 tracking-wider text-sm">LET'S CREATE SOMETHING BEAUTIFUL</p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-light tracking-wider mb-8">Contact Information</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-xs tracking-widest text-gray-400 mb-2">EMAIL</p>
                  <a href="mailto:hello@lens.com" className="text-lg hover:text-amber-600 transition-colors">
                    hello@lens.com
                  </a>
                </div>
                <div>
                  <p className="text-xs tracking-widest text-gray-400 mb-2">PHONE</p>
                  <a href="tel:+919999999999" className="text-lg hover:text-amber-600 transition-colors">
                    +91 99999 99999
                  </a>
                </div>
                <div>
                  <p className="text-xs tracking-widest text-gray-400 mb-2">LOCATION</p>
                  <p className="text-lg">Mumbai, Maharashtra</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-xs tracking-widest text-gray-400 mb-6">FOLLOW</p>
              <div className="flex gap-6">
                {['Instagram', 'Facebook', 'Pinterest'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-sm tracking-wider hover:text-amber-600 transition-colors"
                  >
                    {social.toUpperCase()}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="YOUR NAME"
                  className="w-full bg-transparent border-b border-gray-600 py-3 text-white placeholder-gray-500 focus:border-amber-600 focus:outline-none transition-colors text-sm tracking-wider"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="YOUR EMAIL"
                  className="w-full bg-transparent border-b border-gray-600 py-3 text-white placeholder-gray-500 focus:border-amber-600 focus:outline-none transition-colors text-sm tracking-wider"
                />
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="YOUR PHONE"
                  className="w-full bg-transparent border-b border-gray-600 py-3 text-white placeholder-gray-500 focus:border-amber-600 focus:outline-none transition-colors text-sm tracking-wider"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="YOUR MESSAGE"
                  className="w-full bg-transparent border-b border-gray-600 py-3 text-white placeholder-gray-500 focus:border-amber-600 focus:outline-none transition-colors resize-none text-sm tracking-wider"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 border border-white text-white text-sm tracking-widest hover:bg-white hover:text-black transition-all duration-300"
              >
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
