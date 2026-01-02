export default function About() {
  return (
    <section id="about" className="py-20 px-6 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm font-semibold">
              About Us
            </div>
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Making Every Celebration
              <span className="text-pink-600"> Memorable</span>
            </h2>
            <p className="text-lg text-gray-700">
              For over a decade, we've been helping people celebrate life's special moments with thoughtful, unique gifts.
              Our carefully curated collection combines quality, creativity, and affordability.
            </p>
            <p className="text-lg text-gray-700">
              Whether you're celebrating a birthday, anniversary, wedding, or corporate milestone, our expert team
              is here to help you find the perfect gift that expresses exactly what you want to say.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-pink-600">10+</div>
                <div className="text-gray-600">Years of Experience</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-pink-600">50+</div>
                <div className="text-gray-600">Partner Brands</div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <a
                href="#contact"
                className="bg-pink-600 text-white px-8 py-3 rounded-full hover:bg-pink-700 transition-colors font-semibold"
              >
                Get in Touch
              </a>
              <a
                href="#categories"
                className="bg-white border-2 border-pink-600 text-pink-600 px-8 py-3 rounded-full hover:bg-pink-50 transition-colors font-semibold"
              >
                Shop Now
              </a>
            </div>
          </div>

          {/* Right - Visual */}
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-9xl mb-4">🎁</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Curated with Love</h3>
                <p className="text-gray-700">Every gift is handpicked for quality and uniqueness</p>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl">⭐</div>
                <div>
                  <div className="font-bold text-gray-900">4.9/5</div>
                  <div className="text-xs text-gray-600">Customer Rating</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl">🚚</div>
                <div>
                  <div className="font-bold text-gray-900">24hrs</div>
                  <div className="text-xs text-gray-600">Fast Delivery</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
