export default function GiftFooter() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex flex-col mb-4">
              <span className="text-2xl font-bold text-pink-400">The Gift Gallery</span>
              <span className="text-sm text-gray-400">
                Perfect Gifts for Every Occasion
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Your one-stop destination for thoughtful, unique gifts that create lasting memories.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#home" className="hover:text-pink-400 transition-colors">Home</a></li>
              <li><a href="#categories" className="hover:text-pink-400 transition-colors">Browse Gifts</a></li>
              <li><a href="#featured" className="hover:text-pink-400 transition-colors">Featured</a></li>
              <li><a href="#services" className="hover:text-pink-400 transition-colors">Services</a></li>
              <li><a href="#about" className="hover:text-pink-400 transition-colors">About Us</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Shop by Occasion</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-pink-400 transition-colors">Birthday Gifts</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Anniversary</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Wedding</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Corporate Gifts</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Baby Shower</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Get In Touch</h3>
            <div className="space-y-3 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+919999999999" className="hover:text-pink-400 transition-colors">
                  +91 99999 99999
                </a>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@giftgallery.com" className="hover:text-pink-400 transition-colors">
                  info@giftgallery.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>123 Gift Street, Shopping Plaza,<br />Mumbai, MH 400001</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm mb-4">
            <p>&copy; {new Date().getFullYear()} The Gift Gallery. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-pink-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-pink-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-pink-400 transition-colors">Return Policy</a>
            </div>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-xs">
              Crafted with <span className="text-red-500">♥</span> by{' '}
              <span className="text-pink-400 font-medium">
                websites.build
              </span>
              {/* <a
                href="https://websites.build"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 hover:text-pink-500 font-medium transition-colors"
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
