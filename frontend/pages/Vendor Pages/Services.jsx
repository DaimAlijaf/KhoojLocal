// Services.jsx
// Vendor Services Management Component - Fully Responsive

import React, { useState, useEffect } from 'react';
import VendorSidebar from '../../components/VendorSidebar';

// Sample Services Data
const SAMPLE_SERVICES = [
  {
    id: 1,
    name: 'Deep Tissue Massage',
    category: 'Massage',
    duration: '60 min',
    price: 75.00,
    description: 'Therapeutic massage targeting deep muscle layers to relieve chronic pain and tension.',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop',
    bookings: 45,
  },
  {
    id: 2,
    name: 'Swedish Massage',
    category: 'Massage',
    duration: '60 min',
    price: 70.00,
    description: 'Gentle, relaxing massage using long strokes and kneading techniques.',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=400&h=300&fit=crop',
    bookings: 38,
  },
  {
    id: 3,
    name: 'Haircut & Styling',
    category: 'Hair',
    duration: '45 min',
    price: 40.00,
    description: 'Professional haircut with expert styling and finish.',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop',
    bookings: 62,
  },
  {
    id: 4,
    name: 'Hair Color & Highlights',
    category: 'Hair',
    duration: '120 min',
    price: 85.00,
    description: 'Premium hair coloring service with highlights and toning.',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
    bookings: 28,
  },
  {
    id: 5,
    name: 'Facial Treatment',
    category: 'Skincare',
    duration: '75 min',
    price: 95.00,
    description: 'Deep cleansing facial with extractions, masks, and moisturizing.',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop',
    bookings: 31,
  },
  {
    id: 6,
    name: 'Manicure & Pedicure',
    category: 'Nails',
    duration: '60 min',
    price: 45.00,
    description: 'Complete nail care with shaping, polish, and hand/foot massage.',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop',
    bookings: 52,
  },
  {
    id: 7,
    name: 'Personal Training',
    category: 'Fitness',
    duration: '60 min',
    price: 50.00,
    description: 'One-on-one fitness training tailored to your goals.',
    isActive: false,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    bookings: 15,
  },
  {
    id: 8,
    name: 'Yoga Class',
    category: 'Fitness',
    duration: '60 min',
    price: 30.00,
    description: 'Group yoga session for all skill levels.',
    isActive: false,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
    bookings: 22,
  },
];

export default function Services() {
  const [services, setServices] = useState(SAMPLE_SERVICES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [toast, setToast] = useState(null);

  // Get unique categories
  const categories = ['all', ...new Set(services.map(s => s.category))];

  // Filter services
  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get statistics
  const stats = {
    total: services.length,
    active: services.filter(s => s.isActive).length,
    inactive: services.filter(s => !s.isActive).length,
    totalBookings: services.reduce((sum, s) => sum + s.bookings, 0),
  };

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  function openAddModal() {
    setIsAddMode(true);
    setSelectedService({
      name: '',
      category: '',
      duration: '',
      price: '',
      description: '',
      isActive: true,
      image: '',
    });
    setIsModalOpen(true);
  }

  function openEditModal(service) {
    setIsAddMode(false);
    setSelectedService({ ...service });
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedService(null);
    setIsAddMode(false);
  }

  function handleSaveService() {
    if (isAddMode) {
      const newService = {
        ...selectedService,
        id: services.length + 1,
        bookings: 0,
      };
      setServices([...services, newService]);
      setToast({ type: 'success', message: 'Service added successfully!' });
    } else {
      setServices(services.map(s => s.id === selectedService.id ? selectedService : s));
      setToast({ type: 'success', message: 'Service updated successfully!' });
    }
    closeModal();
  }

  function handleDeleteService(id) {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(s => s.id !== id));
      setToast({ type: 'success', message: 'Service deleted successfully!' });
      closeModal();
    }
  }

  function toggleServiceStatus(id) {
    setServices(services.map(s => 
      s.id === id ? { ...s, isActive: !s.isActive } : s
    ));
    const service = services.find(s => s.id === id);
    setToast({ 
      type: 'success', 
      message: `Service ${service.isActive ? 'deactivated' : 'activated'} successfully!` 
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <VendorSidebar activePage="Services" />

          {/* Main content */}
          <main className="flex-1 w-full lg:w-auto mt-16 lg:mt-0">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4 flex-col sm:flex-row gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Services</h1>
                  <p className="text-sm text-gray-500 mt-1">Manage your service offerings</p>
                </div>
                <button 
                  onClick={openAddModal}
                  className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-md transition-colors w-full sm:w-auto justify-center"
                >
                  <PlusIcon />
                  <span>Add Service</span>
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="text-xs sm:text-sm text-gray-500 mb-1">Total Services</div>
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">{stats.total}</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="text-xs sm:text-sm text-gray-500 mb-1">Active</div>
                  <div className="text-xl sm:text-2xl font-bold text-emerald-600">{stats.active}</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="text-xs sm:text-sm text-gray-500 mb-1">Inactive</div>
                  <div className="text-xl sm:text-2xl font-bold text-gray-400">{stats.inactive}</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="text-xs sm:text-sm text-gray-500 mb-1">Total Bookings</div>
                  <div className="text-xl sm:text-2xl font-bold text-indigo-600">{stats.totalBookings}</div>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-1 relative">
                  <SearchIcon />
                  <input
                    type="text"
                    placeholder="Search services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                        selectedCategory === cat
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Service Image */}
                  <div className="relative h-40 sm:h-48 bg-gray-200">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        service.isActive
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gray-400 text-white'
                      }`}>
                        {service.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>

                  {/* Service Details */}
                  <div className="p-4 sm:p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{service.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-500">{service.category}</p>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-2">{service.description}</p>

                    <div className="flex items-center justify-between mb-4 text-xs sm:text-sm">
                      <div className="flex items-center gap-1 text-gray-600">
                        <ClockIcon />
                        <span>{service.duration}</span>
                      </div>
                      <div className="font-bold text-indigo-600 text-base sm:text-lg">${service.price.toFixed(2)}</div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="text-xs sm:text-sm text-gray-500">
                        {service.bookings} bookings
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleServiceStatus(service.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            service.isActive
                              ? 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                              : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-600'
                          }`}
                          title={service.isActive ? 'Deactivate' : 'Activate'}
                        >
                          {service.isActive ? <EyeOffIcon /> : <EyeIcon />}
                        </button>
                        <button
                          onClick={() => openEditModal(service)}
                          className="p-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-600 rounded-lg transition-colors"
                          title="Edit service"
                        >
                          <EditIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredServices.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
                <div className="text-gray-400 mb-4 flex justify-center">
                  <ServicesEmptyIcon />
                </div>
                <p className="text-gray-500 font-medium mb-1">No services found</p>
                <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Add/Edit Service Modal */}
      {isModalOpen && selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4 overflow-y-auto" onClick={closeModal}>
          <div className="w-full max-w-2xl bg-white rounded-xl sm:rounded-2xl shadow-2xl flex flex-col my-8" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  {isAddMode ? 'Add New Service' : 'Edit Service'}
                </h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <CloseIconModal />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Name *</label>
                  <input
                    type="text"
                    value={selectedService.name}
                    onChange={(e) => setSelectedService({ ...selectedService, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                    placeholder="e.g., Deep Tissue Massage"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <input
                    type="text"
                    value={selectedService.category}
                    onChange={(e) => setSelectedService({ ...selectedService, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                    placeholder="e.g., Massage"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration *</label>
                  <input
                    type="text"
                    value={selectedService.duration}
                    onChange={(e) => setSelectedService({ ...selectedService, duration: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                    placeholder="e.g., 60 min"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={selectedService.price}
                    onChange={(e) => setSelectedService({ ...selectedService, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  value={selectedService.description}
                  onChange={(e) => setSelectedService({ ...selectedService, description: e.target.value })}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm resize-none"
                  placeholder="Describe your service..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="text"
                  value={selectedService.image}
                  onChange={(e) => setSelectedService({ ...selectedService, image: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={selectedService.isActive}
                  onChange={(e) => setSelectedService({ ...selectedService, isActive: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                  Service is active and available for booking
                </label>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200 flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-3">
              <div>
                {!isAddMode && (
                  <button
                    onClick={() => handleDeleteService(selectedService.id)}
                    className="px-4 py-2 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors w-full sm:w-auto"
                  >
                    Delete Service
                  </button>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={closeModal}
                  className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveService}
                  className="px-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md transition-colors"
                >
                  {isAddMode ? 'Add Service' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-3 sm:bottom-5 right-3 sm:right-5 left-3 sm:left-auto z-50 animate-slide-in">
          <div className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl shadow-lg sm:min-w-[300px] ${
            toast.type === 'success' ? 'bg-emerald-500 text-white' : 
            toast.type === 'error' ? 'bg-rose-500 text-white' : 
            'bg-blue-500 text-white'
          }`}>
            <div className="flex-shrink-0">
              {toast.type === 'success' ? <CheckCircleIcon /> : <ErrorIcon />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-xs sm:text-sm">
                {toast.type === 'success' ? 'Success!' : 'Error'}
              </p>
              <p className="text-xs sm:text-sm opacity-90 truncate">{toast.message}</p>
            </div>
            <button onClick={() => setToast(null)} className="text-white/80 hover:text-white transition-colors flex-shrink-0">
              <CloseIconSmall />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ----- Icon Components ----- */
function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
      <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1 1l22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CloseIconModal() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CloseIconSmall() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ServicesEmptyIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
      <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}
