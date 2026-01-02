export default function HyperFooter() {
  return (
    <footer className="bg-slate-950 border-t border-cyan-500/20 py-12 px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/50">
                <div className="w-6 h-6 border-2 border-white rounded" />
              </div>
              <span className="text-2xl font-black text-white">
                HYPER<span className="text-cyan-400">.</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              We don't do basic marketing. We architect market domination.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Performance Marketing</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Growth Hacking</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Brand Strategy</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Social Domination</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#work" className="hover:text-cyan-400 transition-colors">Case Studies</a></li>
              <li><a href="#results" className="hover:text-cyan-400 transition-colors">Results</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Get In Touch</h3>
            <div className="space-y-3 text-gray-400 text-sm">
              <div>
                <a href="mailto:dominate@hyper.agency" className="hover:text-cyan-400 transition-colors">
                  dominate@hyper.agency
                </a>
              </div>
              <div>
                <a href="tel:+919999999999" className="hover:text-cyan-400 transition-colors">
                  +91 99999 99999
                </a>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              {['IN', 'TW', 'IG'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-slate-800 border border-cyan-500/20 rounded-lg flex items-center justify-center hover:border-cyan-500 hover:bg-cyan-500/10 transition-all text-cyan-400 font-bold text-xs"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-cyan-500/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© {new Date().getFullYear()} HYPER. All rights reserved.</p>
            <p>
              Crafted with <span className="text-red-500">♥</span> by{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-medium">
                websites.build
              </span>
              {/* <a
                href="https://websites.build"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-medium hover:opacity-80 transition-opacity"
              >
                websites.build
              </a> */}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
