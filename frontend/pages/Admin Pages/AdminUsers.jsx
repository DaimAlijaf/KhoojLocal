import React, { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';

export default function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Status: All');
  const [roleFilter, setRoleFilter] = useState('Type: All');
  const [selectedUser, setSelectedUser] = useState(null);

  // Sample user data
  const users = [
    {
      id: 1,
      name: 'Olivia Martinez',
      email: 'olivia.m@example.com',
      role: 'Vendor',
      status: 'Active',
      joined: '14th Feb 2023',
      lastLogin: '2 hours ago',
      phone: '+1 (555) 123-4567',
      avatar: 'OM',
      totalBookings: 45,
      totalReviews: 28,
    },
    {
      id: 2,
      name: 'Ben Carter',
      email: 'ben.carter@example.com',
      role: 'User',
      status: 'Suspended',
      joined: '1st Jan 2022',
      lastLogin: '3 days ago',
      phone: '+1 (555) 234-5678',
      avatar: 'BC',
      totalBookings: 12,
      totalReviews: 8,
    },
    {
      id: 3,
      name: 'Aisha Khan',
      email: 'aisha.k@example.com',
      role: 'Vendor',
      status: 'Active',
      joined: '3rd Mar 2023',
      lastLogin: '1 hour ago',
      phone: '+1 (555) 345-6789',
      avatar: 'AK',
      totalBookings: 67,
      totalReviews: 42,
    },
    {
      id: 4,
      name: 'Liam Evans',
      email: 'liam.evans@example.com',
      role: 'User',
      status: 'Active',
      joined: '18th Apr 2022',
      lastLogin: '5 hours ago',
      phone: '+1 (555) 456-7890',
      avatar: 'LE',
      totalBookings: 23,
      totalReviews: 15,
    },
  ];

  // Filter users based on search query, status, and role
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'Status: All' || 
      user.status === statusFilter.replace('Status: ', '');
    
    const matchesRole = 
      roleFilter === 'Type: All' || 
      user.role === roleFilter.replace('Type: ', '');
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleImpersonate = () => {
    alert(`Impersonating ${selectedUser.name}`);
  };

  const handleSuspend = () => {
    alert(`Account status toggled for ${selectedUser.name}`);
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${selectedUser.name}'s account?`)) {
      alert(`Account deleted for ${selectedUser.name}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      <AdminSidebar />

      <main className="flex-1 overflow-auto">
        <div className="p-3 sm:p-4 md:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">User & Vendor Management</h1>
            <p className="text-sm text-gray-600 mt-1">Search, filter, and manage user and vendor accounts.</p>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by name, email, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm bg-white"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-700"
              >
                <option>Status: All</option>
                <option>Status: Active</option>
                <option>Status: Suspended</option>
                <option>Status: Inactive</option>
              </select>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-700"
              >
                <option>Type: All</option>
                <option>Type: User</option>
                <option>Type: Vendor</option>
              </select>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Left Section - Users List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-base font-semibold text-gray-900">
                    All Accounts ({filteredUsers.length})
                  </h3>
                </div>
                
                <div className="divide-y divide-gray-200 max-h-[calc(100vh-400px)] overflow-y-auto">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      onClick={() => setSelectedUser(user)}
                      className={`p-4 cursor-pointer transition-colors ${
                        selectedUser?.id === user.id
                          ? 'bg-purple-50 border-l-4 border-purple-600'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                          {user.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-sm truncate">{user.name}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              user.status === 'Active'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {user.status}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">{user.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Section - User Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm lg:sticky lg:top-6">
                {selectedUser ? (
                  <>
                    {/* User Info Header */}
                    <div className="p-4 sm:p-6 border-b border-gray-200">
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-2xl sm:text-3xl flex-shrink-0">
                          {selectedUser.avatar}
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{selectedUser.name}</h2>
                          <p className="text-sm text-gray-600">{selectedUser.email}</p>
                          <p className="text-xs text-gray-500 mt-1">Joined: {selectedUser.joined}</p>
                          <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                            <span
                              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                                selectedUser.status === 'Active'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}
                            >
                              {selectedUser.status}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                              {selectedUser.role}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* User Details */}
                    <div className="p-4 sm:p-6 border-b border-gray-200">
                      <h3 className="text-base font-semibold text-gray-900 mb-4">Profile Details</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Full Name</label>
                          <p className="text-sm text-gray-900">{selectedUser.name}</p>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Account Type</label>
                          <p className="text-sm text-gray-900">{selectedUser.role}</p>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Contact Number</label>
                          <p className="text-sm text-gray-900">{selectedUser.phone}</p>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Last Login</label>
                          <p className="text-sm text-gray-900">{selectedUser.lastLogin}</p>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Total Bookings</label>
                          <p className="text-sm text-gray-900">{selectedUser.totalBookings}</p>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Total Reviews</label>
                          <p className="text-sm text-gray-900">{selectedUser.totalReviews}</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="p-4 sm:p-6">
                      <h3 className="text-base font-semibold text-gray-900 mb-4">Account Actions</h3>
                      <div className="flex flex-col sm:flex-row gap-3">
                        {selectedUser.role === 'Vendor' && (
                          <button
                            onClick={handleImpersonate}
                            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg font-medium hover:from-purple-700 hover:to-purple-600 transition-all flex items-center justify-center gap-2 text-sm shadow-md"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Impersonate Vendor
                          </button>
                        )}
                        <button
                          onClick={handleSuspend}
                          className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm ${
                            selectedUser.status === 'Active'
                              ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                              : 'bg-green-50 text-green-700 hover:bg-green-100'
                          }`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {selectedUser.status === 'Active' ? 'Suspend Account' : 'Activate Account'}
                        </button>
                        <button
                          onClick={handleDelete}
                          className="px-4 py-2.5 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors flex items-center justify-center gap-2 text-sm"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-8 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <p className="mt-4 text-sm text-gray-500">Select a user to view details</p>
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
