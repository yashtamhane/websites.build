'use client';

import { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Message sent! (This is a demo)');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="relative py-32 px-12 overflow-hidden bg-slate-950">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(6, 182, 212) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(6, 182, 212) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
          className="w-full h-full"
        />
      </div>

      {/* Glow Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-magenta-500 rounded-full blur-3xl opacity-10" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
            READY TO
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-magenta-500 bg-clip-text text-transparent">
              DOMINATE?
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            Let's architect your path to market domination
          </p>
        </div>

        {/* Form */}
        <div className="relative">
          {/* Neon Border Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-magenta-600 rounded-2xl blur-xl opacity-30" />

          <div className="relative bg-slate-900/80 backdrop-blur-xl border-2 border-cyan-500/30 rounded-2xl p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your Name"
                    className="w-full bg-slate-800/50 border-2 border-cyan-500/20 rounded-lg px-6 py-4 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Your Email"
                    className="w-full bg-slate-800/50 border-2 border-cyan-500/20 rounded-lg px-6 py-4 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company Name"
                    className="w-full bg-slate-800/50 border-2 border-cyan-500/20 rounded-lg px-6 py-4 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full bg-slate-800/50 border-2 border-cyan-500/20 rounded-lg px-6 py-4 text-white focus:border-cyan-500 focus:outline-none transition-all"
                  >
                    <option value="" className="text-gray-800">Monthly Budget</option>
                    <option value="10k-25k" className="text-gray-800">$10K - $25K</option>
                    <option value="25k-50k" className="text-gray-800">$25K - $50K</option>
                    <option value="50k-100k" className="text-gray-800">$50K - $100K</option>
                    <option value="100k+" className="text-gray-800">$100K+</option>
                  </select>
                </div>
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Tell us about your domination goals..."
                  className="w-full bg-slate-800/50 border-2 border-cyan-500/20 rounded-lg px-6 py-4 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="relative w-full group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-cyan-500 text-slate-950 py-5 rounded-lg font-black text-lg hover:bg-cyan-400 transition-all">
                  START DOMINATING NOW
                </div>
              </button>
            </form>

            {/* Contact Info */}
            <div className="mt-12 pt-12 border-t border-cyan-500/20">
              <div className="grid md:grid-cols-2 gap-8 text-center md:text-left">
                <div>
                  <div className="text-sm text-gray-500 mb-2">EMAIL</div>
                  <a href="mailto:dominate@hyper.agency" className="text-cyan-400 hover:text-cyan-300 transition-colors font-semibold">
                    dominate@hyper.agency
                  </a>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-2">PHONE</div>
                  <a href="tel:+919999999999" className="text-cyan-400 hover:text-cyan-300 transition-colors font-semibold">
                    +91 99999 99999
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
