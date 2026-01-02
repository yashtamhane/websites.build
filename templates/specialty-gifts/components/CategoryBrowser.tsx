export default function CategoryBrowser() {
  const occasions = [
    { name: 'Birthday', icon: '🎂', color: 'from-yellow-400 to-orange-400' },
    { name: 'Anniversary', icon: '💐', color: 'from-red-400 to-pink-400' },
    { name: 'Wedding', icon: '💍', color: 'from-purple-400 to-pink-400' },
    { name: 'Corporate', icon: '💼', color: 'from-blue-400 to-indigo-400' },
    { name: 'Baby Shower', icon: '👶', color: 'from-green-400 to-teal-400' },
    { name: 'Graduation', icon: '🎓', color: 'from-indigo-400 to-purple-400' },
  ];

  const priceRanges = [
    { range: 'Under ₹500', description: 'Budget-friendly gifts' },
    { range: '₹500 - ₹1500', description: 'Mid-range selection' },
    { range: '₹1500 - ₹3000', description: 'Premium gifts' },
    { range: 'Above ₹3000', description: 'Luxury items' },
  ];

  return (
    <section id="categories" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Browse by Occasion */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Browse by Occasion</h2>
            <p className="text-xl text-gray-600">Find the perfect gift for any celebration</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {occasions.map((occasion) => (
              <button
                key={occasion.name}
                className="group p-6 rounded-2xl bg-white border-2 border-gray-200 hover:border-pink-400 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${occasion.color} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}>
                  {occasion.icon}
                </div>
                <h3 className="text-sm font-semibold text-gray-800 group-hover:text-pink-600 transition-colors">
                  {occasion.name}
                </h3>
              </button>
            ))}
          </div>
        </div>

        {/* Browse by Price */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Browse by Price</h2>
            <p className="text-xl text-gray-600">Gifts for every budget</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {priceRanges.map((item) => (
              <button
                key={item.range}
                className="p-8 rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-transparent hover:border-pink-400 hover:shadow-xl transition-all duration-300 text-left group"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                    {item.range}
                  </h3>
                  <svg className="w-6 h-6 text-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <p className="text-gray-600">{item.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
