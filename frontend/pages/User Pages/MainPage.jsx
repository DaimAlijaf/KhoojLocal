import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Utensils, Sparkles, Home as HomeIcon, ShoppingBag, Star } from 'lucide-react';
import Navbar from '../../components/Navbar';

export default function MainPage() {
  const navigate = useNavigate();

  const categories = [
    { name: 'Food & Drink', icon: Utensils, desc: 'Restaurants, cafes...' },
    { name: 'Health & Beauty', icon: Sparkles, desc: 'Salons, spas...' },
    { name: 'Home Services', icon: HomeIcon, desc: 'Plumbers, electricians...' },
    { name: 'Shopping', icon: ShoppingBag, desc: 'Boutiques, stores...' },
  ];

  const recommendedServices = [
    {
      id: 1,
      name: 'La Trattoria',
      category: 'Italian Restaurant',
      rating: 4.8,
      reviews: 120,
      distance: '0.5 km away',
      price: '₹₹₹',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
      description: 'Based on your interest in Italian food.',
    },
    {
      id: 2,
      name: 'The Daily Grind',
      category: 'Coffee Shop',
      rating: 4.8,
      reviews: 250,
      distance: '1.2 km away',
      price: '₹₹',
      image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400',
      description: 'Popular cafe near your location.',
    },
    {
      id: 3,
      name: 'Elite Fitness Studio',
      category: 'Gym & Fitness',
      rating: 4.9,
      reviews: 180,
      distance: '2.0 km away',
      price: '₹₹',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
      description: 'Top-rated fitness center with modern equipment.',
    },
    {
      id: 4,
      name: 'Glamour Hair Salon',
      category: 'Beauty & Spa',
      rating: 4.7,
      reviews: 95,
      distance: '1.5 km away',
      price: '₹₹',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400',
      description: 'Professional styling and beauty services.',
    },
    {
      id: 5,
      name: 'Quick Fix Repairs',
      category: 'Home Services',
      rating: 4.6,
      reviews: 210,
      distance: '3.5 km away',
      price: '₹',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400',
      description: 'Reliable plumbing and electrical repairs.',
    },
  ];

  const featuredServices = [
    {
      id: 6,
      name: "Artisan's Boutique",
      description: 'Unique handmade goods',
      category: 'Shopping',
      rating: 4.8,
      reviews: 85,
      distance: '1.0 km away',
      price: '₹₹',
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400',
      buttonText: 'View Store',
    },
    {
      id: 7,
      name: 'Burger Bliss',
      description: 'Gourmet burgers & fries',
      category: 'Restaurant',
      rating: 4.7,
      reviews: 320,
      distance: '0.8 km away',
      price: '₹₹',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
      buttonText: 'View Menu',
    },
    {
      id: 8,
      name: 'Serenity Spa',
      description: 'Massage and wellness',
      category: 'Health & Beauty',
      rating: 4.9,
      reviews: 145,
      distance: '2.2 km away',
      price: '₹₹₹',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400',
      buttonText: 'Book Now',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <aside className="lg:col-span-1 space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Categories</h2>
              <div className="space-y-3">
                {categories.map((cat, idx) => (
                  <button
                    key={idx}
                    className="w-full flex items-center gap-3 p-4 rounded-xl border bg-white border-gray-200 hover:border-indigo-500 hover:shadow-md transition text-left"
                  >
                    <cat.icon className="h-5 w-5 text-indigo-600" />
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold">{cat.name}</h3>
                      <p className="text-xs text-gray-500">{cat.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Promotional Banner */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-6 rounded-2xl">
              <h3 className="text-lg font-bold mb-2">Get 20% off your first order!</h3>
              <p className="text-sm mb-4 opacity-90">Find and book local services with our special discount. Limited time offer.</p>
              <button className="w-full bg-white text-indigo-600 py-2 px-4 rounded-lg font-medium hover:bg-gray-100 transition">
                Claim Offer
              </button>
            </div>
          </aside>

          {/* Content - Recommended & Featured */}
          <div className="lg:col-span-3 space-y-8">
            {/* Recommended For You */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Recommended For You</h2>
              <div className="space-y-4">
                {recommendedServices.map((service, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl border bg-white border-gray-200 hover:shadow-lg transition"
                  >
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full sm:w-32 h-32 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-xs text-indigo-600 font-medium uppercase mb-1">{service.category}</p>
                          <h3 className="text-lg font-bold">{service.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-medium">{service.rating}</span>
                          <span className="text-xs text-gray-500">({service.reviews} reviews)</span>
                        </div>
                        <button 
                          onClick={() => navigate(`/business/${service.id}`, { state: { business: service } })}
                          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition active:scale-95"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured This Week */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Featured This Week</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredServices.map((service, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border bg-white border-gray-200 overflow-hidden hover:shadow-lg transition"
                  >
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-5">
                      <h3 className="text-lg font-bold mb-1">{service.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                      <button 
                        onClick={() => navigate(`/business/${service.id}`, { state: { business: service } })}
                        className="w-full py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition active:scale-95"
                      >
                        {service.buttonText}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
