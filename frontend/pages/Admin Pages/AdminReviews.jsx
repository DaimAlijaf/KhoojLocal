import React, { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';

export default function AdminReviews() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Status');
  const [flagIssueFilter, setFlagIssueFilter] = useState('Flag Issues');
  const [selectedReview, setSelectedReview] = useState(null);
  const [moderationNote, setModerationNote] = useState('');

  // Sample review data
  const reviews = [
    {
      id: 1,
      business: 'The Artisan Bakery',
      user: 'Emily Carter',
      memberSince: 'Member since Jan 2022',
      totalReviews: 23,
      followers: 12,
      rating: 4,
      postedDate: 'September 21, 2023',
      reviewText: '"The croissants were stale and the coffee tasted burnt. Definitely not worth the price. I\'ve had better from a gas station. The service was also incredibly slow, it felt like they completely forgot about our order. I don\'t understand how this place has such high ratings, it was a total letdown. Avoid this ****hole."',
      excerpt: 'The croissants were stale and the coffee tasted burnt. Definitely not worth the price...',
      flagType: 'Profanity',
      flagSeverity: 'high',
      flagReason: 'The review was automatically flagged for containing profanity that violates our community guidelines. The system detected these flagged terms.',
      status: 'Profanity',
    },
    {
      id: 2,
      business: 'QuickFix Auto Repair',
      user: 'John Doe',
      memberSince: 'Member since Mar 2021',
      totalReviews: 45,
      followers: 28,
      rating: 1,
      postedDate: 'October 10, 2023',
      reviewText: 'BUY CHEAP V1AGRA an d C1ALIS HERE!!! best prices guaranteed visit my site...',
      excerpt: 'BUY CHEAP V1AGRA an d C1ALIS HERE!!! best prices guaranteed visit my site...',
      flagType: 'Potential Spam',
      flagSeverity: 'medium',
      flagReason: 'This review appears to contain promotional content and spam links that violate our posting policies.',
      status: 'Potential Spam',
    },
  ];

  // Filter reviews based on search query
  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.business.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.user.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'Status' || 
      review.status === statusFilter;
    
    const matchesFlagIssue = 
      flagIssueFilter === 'Flag Issues' || 
      review.flagType === flagIssueFilter;
    
    return matchesSearch && matchesStatus && matchesFlagIssue;
  });

  const handleApprove = () => {
    alert(`Review for ${selectedReview.business} has been approved`);
  };

  const handleReject = () => {
    alert(`Review for ${selectedReview.business} has been rejected`);
  };

  const handleEdit = () => {
    alert(`Opening editor for ${selectedReview.business} review`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />

      <main className="lg:ml-64">
        <div className="p-3 sm:p-4 md:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Flagged Reviews Moderation</h1>
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium self-start sm:self-auto">
              View Moderation Policies
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Left Section - Reviews List */}
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
                        placeholder="Search reviews..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 flex items-center gap-1"
                    >
                      <option>Status</option>
                      <option value="Profanity">Profanity</option>
                      <option value="Potential Spam">Potential Spam</option>
                      <option value="Harassment">Harassment</option>
                    </select>

                    <select
                      value={flagIssueFilter}
                      onChange={(e) => setFlagIssueFilter(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
                    >
                      <option>Flag Issues</option>
                      <option value="Profanity">Profanity</option>
                      <option value="Potential Spam">Spam</option>
                      <option value="Harassment">Harassment</option>
                    </select>

                    <button className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm hover:bg-purple-700 transition-colors font-medium">
                      Apply Filters
                    </button>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="divide-y divide-gray-200">
                  {filteredReviews.map((review) => (
                    <div
                      key={review.id}
                      onClick={() => setSelectedReview(review)}
                      className={`p-4 cursor-pointer transition-colors ${
                        selectedReview?.id === review.id
                          ? 'bg-purple-50 border-l-4 border-purple-600'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {/* Business Name and Stars */}
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{review.business}</h3>
                        <div className="flex items-center gap-0.5 ml-2 flex-shrink-0">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`w-3 h-3 sm:w-4 sm:h-4 ${
                                star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>

                      {/* User Name */}
                      <p className="text-xs sm:text-sm text-gray-600 mb-2">{review.user}</p>

                      {/* Review Excerpt */}
                      <p className="text-xs sm:text-sm text-gray-700 mb-3 line-clamp-2">{review.excerpt}</p>

                      {/* Flag Badge */}
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
                          review.flagSeverity === 'high'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-orange-100 text-orange-700'
                        }`}
                      >
                        {review.flagType}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Section - Review Details */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm lg:sticky lg:top-6">
                {selectedReview ? (
                  <>
                    {/* Flag Alert Box */}
                    <div className="p-4 bg-red-50 border-b border-red-100">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-red-600 font-bold text-lg">!</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-bold text-red-900 mb-1">
                            AI Flag: {selectedReview.flagType}
                          </h3>
                          <p className="text-xs text-red-800 mb-2">{selectedReview.flagReason}</p>
                          <button className="text-xs text-red-600 hover:text-red-700 font-medium underline">
                            View flagged terms
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                          {selectedReview.user.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-sm">{selectedReview.user}</h3>
                          <p className="text-xs text-gray-500">{selectedReview.memberSince}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
                            <span className="font-medium">{selectedReview.totalReviews} Total Reviews</span>
                            <span>{selectedReview.followers} Followers</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Review Content */}
                    <div className="p-4 border-b border-gray-200">
                      <div className="mb-3">
                        <h4 className="text-sm font-semibold text-gray-900 mb-1">
                          Review for {selectedReview.business}
                        </h4>
                        <p className="text-xs text-gray-500">Posted on {selectedReview.postedDate}</p>
                      </div>

                      {/* Star Rating */}
                      <div className="flex items-center gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-4 h-4 ${
                              star <= selectedReview.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>

                      {/* Review Text */}
                      <p className="text-sm text-gray-700 leading-relaxed">{selectedReview.reviewText}</p>
                    </div>

                    {/* Moderation Actions */}
                    <div className="p-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Moderation Actions</h4>
                      
                      <textarea
                        placeholder="Add an optional note (visible to user)..."
                        value={moderationNote}
                        onChange={(e) => setModerationNote(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 mb-3 resize-none"
                        rows="3"
                      />

                      {/* Action Buttons */}
                      <div className="space-y-2">
                        <button
                          onClick={handleEdit}
                          className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                          Edit & Approve
                        </button>
                        <button
                          onClick={handleApprove}
                          className="w-full px-4 py-2.5 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                        >
                          Approve As-Is
                        </button>
                        <button
                          onClick={handleReject}
                          className="w-full px-4 py-2.5 border border-red-300 text-red-600 rounded-md text-sm font-medium hover:bg-red-50 transition-colors"
                        >
                          Reject & Remove
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-8 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                    <p className="mt-4 text-sm text-gray-500">Select a review to moderate</p>
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
