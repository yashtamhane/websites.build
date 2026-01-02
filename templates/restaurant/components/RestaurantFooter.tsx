import Link from 'next/link';

export default function RestaurantFooter() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 via-yellow-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <span className="text-xl font-black">
                FLAVOR<span className="text-orange-500">HAUS</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Experience the finest flavors crafted with passion and served with love.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-orange-400">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/preview/restaurant" className="hover:text-orange-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/preview/restaurant/menu" className="hover:text-orange-400 transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/preview/restaurant/gallery" className="hover:text-orange-400 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/preview/restaurant/about" className="hover:text-orange-400 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-orange-400">Opening Hours</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Monday - Thursday: 11am - 10pm</li>
              <li>Friday - Saturday: 11am - 11pm</li>
              <li>Sunday: 10am - 9pm</li>
              <li className="text-green-400 font-semibold pt-2">Open Now!</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-orange-400">Get In Touch</h3>
            <div className="space-y-3 text-gray-400 text-sm">
              <div>
                <a
                  href="mailto:hello@flavorhaus.com"
                  className="hover:text-orange-400 transition-colors"
                >
                  hello@flavorhaus.com
                </a>
              </div>
              <div>
                <a href="tel:+919999999999" className="hover:text-orange-400 transition-colors">
                  +91 99999 99999
                </a>
              </div>
              <div className="text-gray-400">123 Culinary Street, Food District</div>
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              {['FB', 'IG', 'TW'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-gray-800 border border-orange-500/30 rounded-lg flex items-center justify-center hover:border-orange-500 hover:bg-orange-500/10 transition-all text-orange-400 font-bold text-xs"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© {new Date().getFullYear()} FLAVORHAUS. All rights reserved.</p>
            <p>
              Crafted with <span className="text-red-500">♥</span> by{' '}
              <span className="text-orange-400 font-medium">websites.build</span>
              {/* <a
                href="https://websites.build"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 font-medium hover:opacity-80 transition-opacity"
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
