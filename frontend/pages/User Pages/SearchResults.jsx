import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, MapPin, Star, ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import Navbar from '../../components/Navbar';

const BUSINESSES = [
  {
    id: 1,
    name: "The Daily Grind",
    rating: 4.8,
    distance: "1.2 km away",
    distanceKm: 1.2,
    price: "₹₹",
    priceValue: 250,
    category: 'Coffee Shops',
    isOpen: true,
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400",
  },
  {
    id: 2,
    name: "Aroma Mocha Cafe",
    rating: 4.5,
    distance: "2.5 km away",
    distanceKm: 2.5,
    price: "₹₹₹",
    priceValue: 450,
    category: 'Coffee Shops',
    isOpen: false,
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400",
  },
  {
    id: 3,
    name: "The Cozy Bean",
    rating: 4.9,
    distance: "0.8 km away",
    distanceKm: 0.8,
    price: "₹₹",
    priceValue: 300,
    category: 'Coffee Shops',
    isOpen: true,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
  },
  {
    id: 4,
    name: "Brew & Bites",
    rating: 4.7,
    distance: "1.5 km away",
    distanceKm: 1.5,
    price: "₹₹",
    priceValue: 220,
    category: 'Coffee Shops',
    isOpen: true,
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400",
  },
  {
    id: 5,
    name: "Java Junction",
    rating: 4.6,
    distance: "3.0 km away",
    distanceKm: 3.0,
    price: "₹",
    priceValue: 120,
    category: 'Coffee Shops',
    isOpen: false,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400",
  },
  {
    id: 6,
    name: "Espresso Express",
    rating: 4.8,
    distance: "1.8 km away",
    distanceKm: 1.8,
    price: "₹₹₹",
    priceValue: 500,
    category: 'Coffee Shops',
    isOpen: true,
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400",
  },
];

function SidebarFilters({
  distance,
  setDistance,
  selectedCategory,
  setSelectedCategory,
  rating,
  setRating,
  maxPrice,
  setMaxPrice,
  openNow,
  setOpenNow,
  onReset,
  isMobileOpen,
  onMobileClose,
}) {

  const FilterContent = () => (
    <>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Filters</h3>
        {isMobileOpen && (
          <button onClick={onMobileClose} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Distance */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-gray-900">Distance</p>
          <p className="text-sm text-gray-600">{distance}km</p>
        </div>
        <input
          type="range"
          min="0"
          max="50"
          value={distance}
          onChange={(e) => setDistance(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
        />
      </div>

      {/* Category */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Category</h4>
        <div className="space-y-2">
          {['Coffee Shops', 'Restaurants', 'Salons', 'Gyms'].map((category) => (
            <label key={category} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategory === category}
                onChange={() => setSelectedCategory(category)}
                className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Rating</h4>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              onClick={() => setRating(star)}
              className={`h-6 w-6 cursor-pointer ${
                star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              }`}
              aria-label={`${star} star`}
              role="img"
            />
          ))}
        </div>
      </div>

      {/* Price filter (slider) */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-gray-900">Price</h4>
          <p className="text-sm text-gray-700 font-semibold">₹0 – ₹{maxPrice}</p>
        </div>
        <input
          type="range"
          min="0"
          max="1500"
          step="50"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
          aria-label="Max price"
        />
        <div className="mt-2 flex justify-between text-xs text-gray-500">
          <span>₹0</span>
          <span>₹500</span>
          <span>₹1,000</span>
          <span>₹1,500</span>
        </div>
      </div>

      {/* Open Now */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-gray-900">Open Now</h4>
          <button
            onClick={() => setOpenNow(!openNow)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
              openNow ? 'bg-violet-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                openNow ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Apply Filters Button */}
      <button 
        onClick={onMobileClose}
        className="w-full bg-violet-600 text-white py-3 rounded-lg font-semibold hover:bg-violet-700 transition mb-2"
      >
        Apply Filters
      </button>

      {/* Reset Button */}
      <button
        onClick={() => {
          onReset();
          onMobileClose && onMobileClose();
        }}
        className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
      >
        Reset
      </button>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block lg:col-span-1">
        <div className="sticky top-20 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
          <FilterContent />
        </div>
      </aside>

      {/* Mobile Filter Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={onMobileClose} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-[85vh] overflow-y-auto">
            <FilterContent />
          </div>
        </div>
      )}
    </>
  );
}

function BusinessCard({ business }) {
  const navigate = useNavigate();
  return (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
      <img
        src={business.image}
        alt={business.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 sm:p-5">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">{business.name}</h3>
        
        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium text-gray-900">{business.rating}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{business.distance}</span>
          </div>
          
          <div className="flex items-center">
            <span className="font-semibold text-gray-900">{business.price}</span>
          </div>
        </div>

        <button
          className="w-full bg-violet-600 text-white py-3 rounded-lg font-medium hover:bg-violet-700 transition active:scale-95"
          onClick={() => navigate(`/business/${business.id}`, { state: { business } })}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-200" />
      <div className="p-5">
        <div className="h-6 w-3/4 bg-gray-200 rounded mb-3" />
        <div className="flex items-center gap-4 mb-4">
          <div className="h-4 w-16 bg-gray-200 rounded" />
          <div className="h-4 w-20 bg-gray-200 rounded" />
          <div className="h-4 w-8 bg-gray-200 rounded" />
        </div>
        <div className="h-10 w-full bg-gray-200 rounded-lg" />
      </div>
    </div>
  );
}

export default function SearchResults() {
  const location = useLocation();
  const [businesses] = useState(BUSINESSES);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // URL query (?q=)
  const params = new URLSearchParams(location.search);
  const initialQuery = params.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  // Filters state
  const [distance, setDistance] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState('Coffee Shops');
  const [rating, setRating] = useState(4);
  const [maxPrice, setMaxPrice] = useState(1500);
  const [openNow, setOpenNow] = useState(false);

  const resetFilters = () => {
    setDistance(10);
    setSelectedCategory('Coffee Shops');
    setRating(4);
    setMaxPrice(1500);
    setOpenNow(false);
  };

  // Derived filtered list
  const filtered = useMemo(() => {
    return businesses.filter((b) => {
      const matchesQuery = query
        ? b.name.toLowerCase().includes(query.toLowerCase())
        : true;
      const matchesCategory = selectedCategory ? b.category === selectedCategory : true;
      const matchesRating = b.rating >= rating;
      const withinDistance = typeof b.distanceKm === 'number' ? b.distanceKm <= distance : true;
      const withinPrice = typeof b.priceValue === 'number' ? b.priceValue <= maxPrice : true;
      const matchesOpen = openNow ? b.isOpen : true;
      return matchesQuery && matchesCategory && matchesRating && withinDistance && withinPrice && matchesOpen;
    });
  }, [businesses, query, selectedCategory, rating, distance, maxPrice, openNow]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          <SidebarFilters
            distance={distance}
            setDistance={setDistance}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            rating={rating}
            setRating={setRating}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            openNow={openNow}
            setOpenNow={setOpenNow}
            onReset={resetFilters}
            isMobileOpen={mobileFiltersOpen}
            onMobileClose={() => setMobileFiltersOpen(false)}
          />

          <section className="lg:col-span-3">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="flex items-center gap-2 w-full sm:w-auto px-4 py-3 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                <SlidersHorizontal className="h-5 w-5" />
                <span>Filters</span>
              </button>
            </div>

            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {`Showing results for '${query || selectedCategory}'`}
              </h1>
              <p className="text-gray-600">{`Found ${filtered.length} businesses near you`}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {filtered.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
              
              {/* Loading placeholders */}
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>

            {/* Loading indicator */}
            <div className="flex justify-center items-center gap-2 mt-8 text-gray-600">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-violet-600"></div>
              <span className="text-sm sm:text-base">Loading more...</span>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
