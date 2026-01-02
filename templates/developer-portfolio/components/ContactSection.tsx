'use client';

import { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [focused, setFocused] = useState<string | null>(null);

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
    <section id="contact" className="py-20 px-12 bg-slate-900">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-emerald-400 font-mono">05.</span> Get In Touch
          </h2>
          <div className="h-0.5 w-32 bg-gradient-to-r from-emerald-400 to-transparent mx-auto" />
          <p className="text-gray-400 mt-6 text-lg">
            Have a question or want to work together? Drop me a message!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 font-mono">Let's Connect</h3>
              <p className="text-gray-400 mb-8">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>

            {/* Contact methods */}
            <div className="space-y-4">
              <a
                href="mailto:dev@example.com"
                className="group flex items-center gap-4 p-4 bg-slate-800 border border-emerald-400/20 rounded-lg hover:border-emerald-400/50 hover:bg-slate-700 transition-all"
              >
                <div className="w-12 h-12 bg-emerald-400/10 rounded-lg flex items-center justify-center group-hover:bg-emerald-400/20 transition-colors">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-400 font-mono">Email</div>
                  <div className="text-white font-semibold group-hover:text-emerald-400 transition-colors">dev@example.com</div>
                </div>
              </a>

              <a
                href="tel:+919999999999"
                className="group flex items-center gap-4 p-4 bg-slate-800 border border-emerald-400/20 rounded-lg hover:border-emerald-400/50 hover:bg-slate-700 transition-all"
              >
                <div className="w-12 h-12 bg-cyan-400/10 rounded-lg flex items-center justify-center group-hover:bg-cyan-400/20 transition-colors">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-400 font-mono">Phone</div>
                  <div className="text-white font-semibold group-hover:text-cyan-400 transition-colors">+91 99999 99999</div>
                </div>
              </a>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-white font-mono mb-4">Find me on</h4>
              <div className="flex gap-4">
                {[
                  { name: 'GitHub', icon: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' },
                  { name: 'LinkedIn', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                  { name: 'Twitter', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                ].map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    className="w-12 h-12 bg-slate-800 border border-emerald-400/20 rounded-lg flex items-center justify-center hover:border-emerald-400/50 hover:bg-emerald-400/10 transition-all group"
                  >
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-emerald-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  required
                  className="w-full bg-slate-800 border border-emerald-400/20 rounded-lg px-4 py-3 text-white font-mono focus:border-emerald-400/50 focus:outline-none transition-all peer"
                  placeholder=" "
                />
                <label
                  className={`absolute left-4 transition-all duration-200 pointer-events-none font-mono text-sm ${
                    focused === 'name' || formData.name
                      ? '-top-6 text-emerald-400'
                      : 'top-3 text-gray-400'
                  }`}
                >
                  Name
                </label>
              </div>

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  required
                  className="w-full bg-slate-800 border border-emerald-400/20 rounded-lg px-4 py-3 text-white font-mono focus:border-emerald-400/50 focus:outline-none transition-all"
                  placeholder=" "
                />
                <label
                  className={`absolute left-4 transition-all duration-200 pointer-events-none font-mono text-sm ${
                    focused === 'email' || formData.email
                      ? '-top-6 text-emerald-400'
                      : 'top-3 text-gray-400'
                  }`}
                >
                  Email
                </label>
              </div>

              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  required
                  rows={6}
                  className="w-full bg-slate-800 border border-emerald-400/20 rounded-lg px-4 py-3 text-white font-mono focus:border-emerald-400/50 focus:outline-none transition-all resize-none"
                  placeholder=" "
                />
                <label
                  className={`absolute left-4 transition-all duration-200 pointer-events-none font-mono text-sm ${
                    focused === 'message' || formData.message
                      ? '-top-6 text-emerald-400'
                      : 'top-3 text-gray-400'
                  }`}
                >
                  Message
                </label>
              </div>

              <button
                type="submit"
                className="group relative w-full px-8 py-4 bg-emerald-400 text-slate-900 font-mono font-bold rounded-lg overflow-hidden transition-all hover:shadow-lg hover:shadow-emerald-400/50"
              >
                <span className="relative z-10">Send Message</span>
                <div className="absolute inset-0 bg-emerald-300 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
