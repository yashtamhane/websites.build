'use client';

import { useState } from 'react';

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState('new');

  const products = {
    new: [
      { name: 'Personalized Photo Frame', price: '₹899', category: 'Home Decor', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&auto=format&fit=crop' },
      { name: 'Luxury Spa Gift Set', price: '₹1,499', category: 'Wellness', image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&auto=format&fit=crop' },
      { name: 'Handcrafted Jewelry Box', price: '₹1,299', category: 'Accessories', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&auto=format&fit=crop' },
      { name: 'Gourmet Chocolate Box', price: '₹699', category: 'Food', image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400&auto=format&fit=crop' },
    ],
    popular: [
      { name: 'Custom Mug Set', price: '₹599', category: 'Kitchen', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&auto=format&fit=crop' },
      { name: 'Scented Candle Collection', price: '₹799', category: 'Home', image: 'https://images.unsplash.com/photo-1602874801007-10e0c87d0d51?w=400&auto=format&fit=crop' },
      { name: 'Leather Wallet', price: '₹1,199', category: 'Accessories', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&auto=format&fit=crop' },
      { name: 'Gift Hamper Deluxe', price: '₹2,499', category: 'Hampers', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&auto=format&fit=crop' },
    ],
    premium: [
      { name: 'Designer Watch', price: '₹4,999', category: 'Luxury', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&auto=format&fit=crop' },
      { name: 'Crystal Decanter Set', price: '₹3,499', category: 'Barware', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&auto=format&fit=crop' },
      { name: 'Premium Leather Bag', price: '₹5,499', category: 'Fashion', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&auto=format&fit=crop' },
      { name: 'Executive Pen Set', price: '₹2,999', category: 'Stationery', image: 'https://images.unsplash.com/photo-1586943101559-4cdcf86a6f87?w=400&auto=format&fit=crop' },
    ],
  };

  return (
    <section id="featured" className="py-20 px-6 bg-gradient-to-br from-gray-50 to-pink-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Collections</h2>
          <p className="text-xl text-gray-600">Handpicked gifts that make a statement</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12 gap-4 flex-wrap">
          <button
            onClick={() => setActiveTab('new')}
            className={`px-8 py-3 rounded-full font-semibold transition-all ${
              activeTab === 'new'
                ? 'bg-pink-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-pink-50'
            }`}
          >
            New Arrivals
          </button>
          <button
            onClick={() => setActiveTab('popular')}
            className={`px-8 py-3 rounded-full font-semibold transition-all ${
              activeTab === 'popular'
                ? 'bg-pink-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-pink-50'
            }`}
          >
            Most Popular
          </button>
          <button
            onClick={() => setActiveTab('premium')}
            className={`px-8 py-3 rounded-full font-semibold transition-all ${
              activeTab === 'premium'
                ? 'bg-pink-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-pink-50'
            }`}
          >
            Premium Gifts
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products[activeTab as keyof typeof products].map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="text-xs font-semibold text-pink-600 mb-2">{product.category}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-pink-600">{product.price}</span>
                  <button className="bg-pink-600 text-white p-2 rounded-full hover:bg-pink-700 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
