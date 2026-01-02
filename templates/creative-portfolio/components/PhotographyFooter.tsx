export default function PhotographyFooter() {
  return (
    <footer className="bg-white py-12 px-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-light tracking-wider text-black mb-1">
              LENS
              <span className="inline-block w-1 h-1 bg-amber-600 rounded-full ml-1" />
            </h3>
            <p className="text-xs text-gray-500 tracking-widest">PHOTOGRAPHY</p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap justify-center gap-8">
            {['Portfolio', 'About', 'Services', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm tracking-wider text-gray-700 hover:text-amber-600 transition-colors"
              >
                {item.toUpperCase()}
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex gap-6">
            {['Instagram', 'Facebook', 'Pinterest'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs tracking-wider text-gray-600 hover:text-amber-600 transition-colors"
              >
                {social.toUpperCase()}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
            <p>© {new Date().getFullYear()} LENS PHOTOGRAPHY. ALL RIGHTS RESERVED.</p>
            <p className="text-gray-500">
              Crafted with <span className="text-red-500">♥</span> by{' '}
              <span className="text-amber-600 font-medium">
                websites.build
              </span>
              {/* <a
                href="https://websites.build"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
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
