import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Utensils, Sparkles, Home as HomeIcon, ShoppingBag, Star } from 'lucide-react';
import Navbar from '../../components/Navbar';
import axios from 'axios';

export default function MainPage() {
  const navigate = useNavigate();
  const [recommendedVendors, setRecommendedVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendedVendors();
  }, []);

  useEffect(() => {
    filterVendorsByCategory();
  }, [selectedCategory, recommendedVendors]);

  const fetchRecommendedVendors = async () => {
    try {
      console.log('Fetching vendors from API...');
      const response = await axios.get('http://localhost:5000/api/vendors');
      console.log('API Response:', response.data);
      console.log('Total vendors received:', response.data.length);
      setRecommendedVendors(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recommended vendors:', error);
      console.error('Error details:', error.response?.data || error.message);
      setLoading(false);
    }
  };

  const filterVendorsByCategory = () => {
    if (selectedCategory === 'all') {
      setFilteredVendors(recommendedVendors.slice(0, 10));
    } else {
      const filtered = recommendedVendors.filter(v => v.category === selectedCategory);
      setFilteredVendors(filtered);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const categories = [
    { name: 'All Categories', value: 'all', icon: ShoppingBag, desc: 'Show all businesses' },
    { name: 'Restaurant', value: 'Restaurant', icon: Utensils, desc: 'Dining & food services' },
    { name: 'Bakery', value: 'Bakery', icon: Utensils, desc: 'Fresh baked goods' },
    { name: 'Salon', value: 'Salon', icon: Sparkles, desc: 'Hair & beauty services' },
    { name: 'Spa', value: 'Spa', icon: Sparkles, desc: 'Wellness & relaxation' },
    { name: 'Gym', value: 'Gym', icon: Sparkles, desc: 'Fitness & training' },
    { name: 'Florist', value: 'Florist', icon: ShoppingBag, desc: 'Flowers & arrangements' },
    { name: 'Mechanic', value: 'Mechanic', icon: HomeIcon, desc: 'Auto repair services' },
    { name: 'Other', value: 'Other', icon: HomeIcon, desc: 'Other services' },
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
                    onClick={() => handleCategoryClick(cat.value)}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border transition text-left ${
                      selectedCategory === cat.value
                        ? 'bg-indigo-50 border-indigo-500 shadow-md'
                        : 'bg-white border-gray-200 hover:border-indigo-500 hover:shadow-md'
                    }`}
                  >
                    <cat.icon className={`h-5 w-5 ${selectedCategory === cat.value ? 'text-indigo-600' : 'text-gray-600'}`} />
                    <div className="flex-1">
                      <h3 className={`text-sm font-semibold ${selectedCategory === cat.value ? 'text-indigo-700' : 'text-gray-800'}`}>
                        {cat.name}
                      </h3>
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
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  {selectedCategory === 'all' ? 'Recommended For You' : `${selectedCategory} Services`}
                </h2>
                <span className="text-sm text-gray-500">
                  {filteredVendors.length} {filteredVendors.length === 1 ? 'business' : 'businesses'}
                </span>
              </div>
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
              ) : filteredVendors.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
                  <p className="text-gray-500">
                    {selectedCategory === 'all' 
                      ? 'No approved vendors available yet.' 
                      : `No ${selectedCategory} businesses available yet.`}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredVendors.map((vendor, idx) => (
                    <div
                      key={vendor._id}
                      className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl border bg-white border-gray-200 hover:shadow-lg transition"
                    >
                      {vendor.images?.logo ? (
                        <img
                          src={vendor.images.logo}
                          alt={vendor.businessName}
                          className="w-full sm:w-32 h-32 object-cover rounded-xl"
                        />
                      ) : (
                        <div className="w-full sm:w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-4xl font-bold">
                          {vendor.businessName?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-xs text-indigo-600 font-medium uppercase mb-1">{vendor.category}</p>
                            <h3 className="text-lg font-bold">{vendor.businessName}</h3>
                            <p className="text-sm text-gray-600 mt-1">{vendor.description || 'Quality service provider'}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              <span className="text-sm font-medium">{vendor.rating || 4.5}</span>
                              <span className="text-xs text-gray-500">({vendor.reviewCount || 0} reviews)</span>
                            </div>
                            {vendor.address?.city && (
                              <span className="text-xs text-gray-500">{vendor.address.city}</span>
                            )}
                          </div>
                          <button 
                            onClick={() => navigate(`/business/${vendor._id}`, { state: { business: vendor } })}
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition active:scale-95"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
