export default function GiftHero() {
  return (
    <section id="home" className="relative bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Find the Perfect Gift for
              <span className="text-pink-600"> Every Occasion</span>
            </h1>
            <p className="text-xl text-gray-700">
              Discover unique, thoughtful gifts that create lasting memories. From birthdays to corporate events, we have something special for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#categories"
                className="bg-pink-600 text-white px-8 py-4 rounded-full hover:bg-pink-700 transition-colors font-semibold text-center text-lg"
              >
                Browse Gifts
              </a>
              <a
                href="#contact"
                className="bg-white border-2 border-pink-600 text-pink-600 px-8 py-4 rounded-full hover:bg-pink-50 transition-colors font-semibold text-center text-lg"
              >
                Custom Orders
              </a>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600">500+</div>
                <div className="text-sm text-gray-600">Gift Items</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600">1000+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600">24hr</div>
                <div className="text-sm text-gray-600">Fast Delivery</div>
              </div>
            </div>
          </div>

          {/* Right Content - Visual Element */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-pink-200 to-purple-200 rounded-3xl flex items-center justify-center">
              <div className="text-center text-gray-600">
                <svg className="w-64 h-64 mx-auto text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 7h-4V5l-2-2h-4L8 5v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 5h4v2h-4V5zm10 15H4V9h16v11zm-8-9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
                <p className="mt-4 text-xl font-semibold text-pink-600">Beautiful Gift Packaging</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
