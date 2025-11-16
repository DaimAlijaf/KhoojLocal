import React, { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';

export default function VendorApplicationReview() {
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [activeTab, setActiveTab] = useState('details');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDate, setFilterDate] = useState('Filter by Date');
  const [filterCategory, setFilterCategory] = useState('Filter by Category');

  const vendors = [
    {
      id: 1,
      name: 'The Gourmet Kitchen',
      category: 'Restaurant',
      submitted: 'Oct 26, 2023',
      status: 'Pending',
      owner: 'Jane Doe',
      email: 'jane.doe@gourmet.com',
      phone: '0500 123-4567',
      address: '123 Culinary Lane, Foodie City, FC 98765',
      description: 'A fine dining establishment offering modern European cuisine with a focus on local, seasonal ingredients.',
    },
    {
      id: 2,
      name: 'Artisan Breads Co.',
      category: 'Bakery',
      submitted: 'Oct 25, 2023',
      status: 'Pending',
      owner: 'John Smith',
      email: 'john@artisanbread.com',
      phone: '0500 123-4567',
      address: '456 Baker Street, Bread Town, BT 12345',
      description: 'Handcrafted artisan breads and pastries made fresh daily.',
    },
    {
      id: 3,
      name: 'City Blooms Florist',
      category: 'Florist',
      submitted: 'Oct 25, 2023',
      status: 'Pending',
      owner: 'Mary Johnson',
      email: 'mary@cityblooms.com',
      phone: '0500 123-4567',
      address: '789 Flower Ave, Garden City, GC 67890',
      description: 'Beautiful floral arrangements for all occasions.',
    },
    {
      id: 4,
      name: 'Quick Fix Auto',
      category: 'Mechanic',
      submitted: 'Oct 24, 2023',
      status: 'Pending',
      owner: 'Bob Wilson',
      email: 'bob@quickfixauto.com',
      phone: '0500 123-4567',
      address: '321 Auto Lane, Motor City, MC 54321',
      description: 'Fast and reliable auto repair services.',
    },
  ];

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vendor.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      filterCategory === 'Filter by Category' || 
      vendor.category.toLowerCase() === filterCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  const handleApprove = () => {
    alert(`Approved ${selectedVendor.name}`);
  };

  const handleReject = () => {
    alert(`Rejected ${selectedVendor.name}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      <AdminSidebar />

      <main className="flex-1 overflow-auto">
        <div className="p-3 sm:p-4 md:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Vendor Application Review</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Left Section - Vendor List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                {/* Search and Filters */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row gap-3 mb-3">
                    <div className="flex-1 relative">
                      <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        type="text"
                        placeholder="Search by name, category..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <select
                      value={filterDate}
                      onChange={(e) => setFilterDate(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
                    >
                      <option>Filter by Date</option>
                      <option value="today">Today</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                    </select>

                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
                    >
                      <option>Filter by Category</option>
                      <option value="Restaurant">Restaurant</option>
                      <option value="Bakery">Bakery</option>
                      <option value="Florist">Florist</option>
                      <option value="Mechanic">Mechanic</option>
                    </select>

                    <button className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors text-gray-700 flex items-center gap-1">
                      Bulk Actions
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Table - Desktop View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredVendors.map((vendor) => (
                        <tr
                          key={vendor.id}
                          onClick={() => setSelectedVendor(vendor)}
                          className={`cursor-pointer transition-colors ${
                            selectedVendor?.id === vendor.id
                              ? 'bg-purple-50'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{vendor.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-700">{vendor.category}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-700">{vendor.submitted}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-600">
                              {vendor.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Card View - Mobile */}
                <div className="md:hidden divide-y divide-gray-200">
                  {filteredVendors.map((vendor) => (
                    <div
                      key={vendor.id}
                      onClick={() => setSelectedVendor(vendor)}
                      className={`p-4 cursor-pointer transition-colors ${
                        selectedVendor?.id === vendor.id
                          ? 'bg-indigo-50'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-gray-900 text-sm">{vendor.name}</h3>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          {vendor.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
                        <span className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          {vendor.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {vendor.submitted}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between bg-gray-50">
                  <button className="text-sm text-gray-600 hover:text-gray-900">
                    Previous
                  </button>
                  <span className="text-sm text-gray-600">Page 1 of 10</span>
                  <button className="text-sm text-gray-600 hover:text-gray-900">
                    Next
                  </button>
                </div>
              </div>
            </div>

            {/* Right Section - Application Details */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm lg:sticky lg:top-6">
                {selectedVendor ? (
                  <>
                    {/* Vendor Name Header */}
                    <div className="p-6 border-b border-gray-200 bg-gray-50">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h2 className="text-xl font-bold text-gray-900">{selectedVendor.name}</h2>
                          <p className="text-sm text-gray-600 mt-1">Application Details</p>
                        </div>
                        <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-600 flex-shrink-0">
                          {selectedVendor.status}
                        </span>
                      </div>
                    </div>

                    {/* Tabs */}
                    <div className="border-b border-gray-200 bg-white">
                      <div className="flex">
                        <button
                          onClick={() => setActiveTab('details')}
                          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                            activeTab === 'details'
                              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                          }`}
                        >
                          Details
                        </button>
                        <button
                          onClick={() => setActiveTab('documents')}
                          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                            activeTab === 'documents'
                              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                          }`}
                        >
                          Documents
                        </button>
                        <button
                          onClick={() => setActiveTab('location')}
                          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                            activeTab === 'location'
                              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                          }`}
                        >
                          Location
                        </button>
                      </div>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                      {activeTab === 'details' && (
                        <div className="space-y-5">
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Owner Name</label>
                            <p className="text-sm text-gray-900">{selectedVendor.owner}</p>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Contact Email</label>
                            <p className="text-sm text-gray-900 break-all">{selectedVendor.email}</p>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Contact Phone</label>
                            <p className="text-sm text-gray-900">{selectedVendor.phone}</p>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Category</label>
                            <p className="text-sm text-gray-900">{selectedVendor.category}</p>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Business Address</label>
                            <p className="text-sm text-gray-900">{selectedVendor.address}</p>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                            <p className="text-sm text-gray-700 leading-relaxed">{selectedVendor.description}</p>
                          </div>
                        </div>
                      )}

                      {activeTab === 'documents' && (
                        <div className="space-y-3">
                          <p className="text-sm text-gray-500">No documents uploaded yet.</p>
                        </div>
                      )}

                      {activeTab === 'location' && (
                        <div className="space-y-3">
                          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                            <p className="text-sm text-gray-500">Map view coming soon</p>
                          </div>
                        </div>
                      )}

                      {/* Rejection Reason */}
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <label className="block text-xs font-medium text-gray-700 mb-2">Rejection Reason (optional)</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700">
                          <option>Select a reason...</option>
                          <option>Incomplete information</option>
                          <option>Invalid documents</option>
                          <option>Does not meet criteria</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="p-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleReject}
                        className="flex-1 px-4 py-2.5 border border-red-300 text-red-600 rounded-md font-medium hover:bg-red-50 transition-colors text-sm"
                      >
                        Reject
                      </button>
                      <button
                        onClick={handleApprove}
                        className="flex-1 px-4 py-2.5 bg-purple-600 text-white rounded-md font-medium hover:bg-purple-700 transition-colors text-sm"
                      >
                        Approve
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="p-6 sm:p-8 text-center">
                    <svg className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500">Select a vendor to view details</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
