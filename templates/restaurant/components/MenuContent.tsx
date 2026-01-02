'use client';

import { useState } from 'react';

export default function MenuContent() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Items', icon: '🍽️' },
    { id: 'appetizers', name: 'Appetizers', icon: '🥗' },
    { id: 'mains', name: 'Main Course', icon: '🍖' },
    { id: 'pasta', name: 'Pasta & Risotto', icon: '🍝' },
    { id: 'seafood', name: 'Seafood', icon: '🦞' },
    { id: 'desserts', name: 'Desserts', icon: '🍰' },
    { id: 'beverages', name: 'Beverages', icon: '🍹' },
  ];

  const menuItems = [
    // Appetizers
    {
      category: 'appetizers',
      name: 'Crispy Calamari',
      description: 'Lightly battered squid rings with spicy aioli and lemon',
      price: '₹649',
      tags: ['Seafood', 'Spicy'],
      dietary: '🌶️',
    },
    {
      category: 'appetizers',
      name: 'Mediterranean Mezze Platter',
      description: 'Hummus, tzatziki, falafel, olives, and fresh pita',
      price: '₹899',
      tags: ['Vegetarian', 'Sharing'],
      dietary: '🌱',
    },
    {
      category: 'appetizers',
      name: 'Buffalo Wings',
      description: '10 pieces with celery sticks and blue cheese dip',
      price: '₹749',
      tags: ['Spicy', 'Popular'],
      dietary: '🌶️',
    },
    {
      category: 'appetizers',
      name: 'Bruschetta Trio',
      description: 'Tomato basil, mushroom truffle, and roasted pepper',
      price: '₹599',
      tags: ['Vegetarian'],
      dietary: '🌱',
    },

    // Mains
    {
      category: 'mains',
      name: 'Wagyu Beef Burger',
      description: 'Premium wagyu patty, truffle aioli, caramelized onions, brioche bun',
      price: '₹1,899',
      tags: ['Signature', 'Bestseller'],
      dietary: '⭐',
    },
    {
      category: 'mains',
      name: 'Herb Roasted Chicken',
      description: 'Free-range chicken with rosemary, garlic mash, seasonal vegetables',
      price: '₹1,399',
      tags: ['Gluten-Free'],
      dietary: '✓',
    },
    {
      category: 'mains',
      name: 'BBQ Pork Ribs',
      description: 'Slow-cooked ribs with house BBQ sauce and coleslaw',
      price: '₹1,599',
      tags: ['Popular'],
      dietary: '',
    },
    {
      category: 'mains',
      name: 'Grilled Vegetable Stack',
      description: 'Zucchini, eggplant, peppers, halloumi, balsamic glaze',
      price: '₹1,099',
      tags: ['Vegetarian'],
      dietary: '🌱',
    },

    // Pasta & Risotto
    {
      category: 'pasta',
      name: 'Truffle Mushroom Risotto',
      description: 'Creamy arborio rice with wild mushrooms and black truffle oil',
      price: '₹1,299',
      tags: ['Chef Special', 'Vegetarian'],
      dietary: '⭐🌱',
    },
    {
      category: 'pasta',
      name: 'Lobster Ravioli',
      description: 'Handmade pasta filled with lobster in champagne cream sauce',
      price: '₹1,799',
      tags: ['Premium', 'Seafood'],
      dietary: '⭐',
    },
    {
      category: 'pasta',
      name: 'Spaghetti Carbonara',
      description: 'Classic Roman style with pancetta, egg, parmesan',
      price: '₹999',
      tags: ['Traditional'],
      dietary: '',
    },
    {
      category: 'pasta',
      name: 'Pesto Linguine',
      description: 'Fresh basil pesto, pine nuts, cherry tomatoes, parmesan',
      price: '₹899',
      tags: ['Vegetarian'],
      dietary: '🌱',
    },

    // Seafood
    {
      category: 'seafood',
      name: 'Grilled Salmon Supreme',
      description: 'Atlantic salmon with lemon butter sauce and asparagus',
      price: '₹1,599',
      tags: ['Chef Recommended', 'Healthy'],
      dietary: '⭐',
    },
    {
      category: 'seafood',
      name: 'Pan-Seared Sea Bass',
      description: 'Mediterranean-style with olives, capers, and tomato',
      price: '₹1,699',
      tags: ['Premium'],
      dietary: '',
    },
    {
      category: 'seafood',
      name: 'Grilled Prawns',
      description: 'Jumbo prawns with garlic herb butter',
      price: '₹1,499',
      tags: ['Popular'],
      dietary: '',
    },

    // Desserts
    {
      category: 'desserts',
      name: 'Chocolate Lava Cake',
      description: 'Warm molten chocolate cake with vanilla ice cream',
      price: '₹499',
      tags: ['Bestseller'],
      dietary: '',
    },
    {
      category: 'desserts',
      name: 'Tiramisu',
      description: 'Classic Italian coffee-soaked ladyfingers with mascarpone',
      price: '₹549',
      tags: ['Traditional'],
      dietary: '',
    },
    {
      category: 'desserts',
      name: 'Crème Brûlée',
      description: 'Vanilla custard with caramelized sugar crust',
      price: '₹449',
      tags: ['Classic'],
      dietary: '✓',
    },
    {
      category: 'desserts',
      name: 'Cheesecake Trio',
      description: 'New York, berry, and chocolate cheesecake',
      price: '₹599',
      tags: ['Sharing'],
      dietary: '',
    },

    // Beverages
    {
      category: 'beverages',
      name: 'Fresh Juice Selection',
      description: 'Orange, watermelon, pomegranate, or mixed berry',
      price: '₹249',
      tags: ['Healthy'],
      dietary: '🌱',
    },
    {
      category: 'beverages',
      name: 'Signature Mojito',
      description: 'Fresh mint, lime, and soda (Classic or Fruity)',
      price: '₹349',
      tags: ['Popular'],
      dietary: '',
    },
    {
      category: 'beverages',
      name: 'Iced Coffee',
      description: 'Cold brew with your choice of milk',
      price: '₹299',
      tags: [],
      dietary: '',
    },
    {
      category: 'beverages',
      name: 'Smoothie Bowl',
      description: 'Acai or mango with granola and fresh fruits',
      price: '₹399',
      tags: ['Healthy'],
      dietary: '🌱',
    },
  ];

  const filteredItems =
    selectedCategory === 'all'
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <section className="py-10 px-4 bg-white">
      <div className="max-w-[1600px] mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-6">
            OUR
            <span className="block bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 bg-clip-text text-transparent">
              MENU
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated selection of dishes made with love and the finest ingredients
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-bold transition-all flex items-center gap-2 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-600'
              }`}
            >
              <span className="text-xl">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-4 border-2 border-orange-200 hover:border-orange-500 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-black text-gray-900 group-hover:text-orange-600 transition-colors flex-1">
                  {item.name}
                </h3>
                {item.dietary && <span className="text-sm">{item.dietary}</span>}
              </div>
              <div className="text-xs font-bold text-orange-600 mb-1.5 uppercase tracking-wider">
                {item.category}
              </div>
              <p className="text-gray-600 leading-snug mb-2 text-sm">
                {item.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="text-xl font-black bg-gradient-to-r from-orange-500 to-yellow-600 bg-clip-text text-transparent">
                  {item.price}
                </div>
                {item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-0.5 bg-white border border-orange-300 text-orange-600 rounded-full text-xs font-bold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6 text-lg">
            Ready to experience these flavors?
          </p>
          <a
            href="/preview/restaurant/reservations"
            className="inline-block group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-10 py-5 rounded-full font-black text-lg hover:scale-105 transition-transform">
                BOOK YOUR TABLE NOW
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
