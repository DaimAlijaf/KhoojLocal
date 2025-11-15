// VendorReviews.jsx
// Vendor Reviews Management Component - Fully Responsive

import React, { useState } from 'react';
import VendorSidebar from '../../components/VendorSidebar';

// Sample Reviews Data
const SAMPLE_REVIEWS = [
  {
    id: 1,
    customerName: 'Sarah Johnson',
    customerAvatar: 'SJ',
    rating: 5,
    date: '2 days ago',
    service: 'Deep Tissue Massage',
    comment: 'Absolutely amazing experience! The therapist was very professional and knew exactly how to work out my tension. The atmosphere was relaxing and I felt so much better afterwards. Highly recommend!',
    helpful: 12,
    response: null,
  },
  {
    id: 2,
    customerName: 'Michael Chen',
    customerAvatar: 'MC',
    rating: 5,
    date: '5 days ago',
    service: 'Haircut & Styling',
    comment: 'Best haircut I\'ve had in years! The stylist listened to what I wanted and gave excellent suggestions. Very happy with the result.',
    helpful: 8,
    response: 'Thank you so much Michael! We\'re thrilled you loved your new look. Can\'t wait to see you again!',
  },
  {
    id: 3,
    customerName: 'Emily Rodriguez',
    customerAvatar: 'ER',
    rating: 4,
    date: '1 week ago',
    service: 'Facial Treatment',
    comment: 'Great service overall. My skin feels amazing! Only minor issue was the wait time, but the quality made up for it.',
    helpful: 5,
    response: 'Thanks for the feedback Emily! We apologize for the wait and are working on improving our scheduling. So glad you loved the results!',
  },
  {
    id: 4,
    customerName: 'David Kim',
    customerAvatar: 'DK',
    rating: 5,
    date: '1 week ago',
    service: 'Swedish Massage',
    comment: 'Incredibly relaxing session. The massage was perfect and I left feeling rejuvenated. Will definitely be back!',
    helpful: 15,
    response: null,
  },
  {
    id: 5,
    customerName: 'Jessica Taylor',
    customerAvatar: 'JT',
    rating: 4,
    date: '2 weeks ago',
    service: 'Manicure & Pedicure',
    comment: 'Very professional and clean environment. The nail technician did a fantastic job. Would give 5 stars but appointment was slightly delayed.',
    helpful: 6,
    response: 'Thank you Jessica! We appreciate your patience and are so happy you loved your nails. Working on better time management!',
  },
  {
    id: 6,
    customerName: 'Robert Martinez',
    customerAvatar: 'RM',
    rating: 5,
    date: '2 weeks ago',
    service: 'Personal Training',
    comment: 'Excellent trainer who really pushes you to meet your goals. I\'ve seen great results in just a few weeks!',
    helpful: 10,
    response: null,
  },
  {
    id: 7,
    customerName: 'Amanda White',
    customerAvatar: 'AW',
    rating: 3,
    date: '3 weeks ago',
    service: 'Hair Color & Highlights',
    comment: 'The color turned out nice but not exactly what I asked for. Staff was friendly though.',
    helpful: 3,
    response: null,
  },
  {
    id: 8,
    customerName: 'James Wilson',
    customerAvatar: 'JW',
    rating: 5,
    date: '3 weeks ago',
    service: 'Deep Tissue Massage',
    comment: 'Outstanding service! This place has become my go-to for massage therapy. Highly skilled therapists.',
    helpful: 9,
    response: 'Thank you James! We\'re honored to be your go-to spot. See you at your next appointment!',
  },
];

export default function VendorReviews() {
  const [reviews, setReviews] = useState(SAMPLE_REVIEWS);
  const [filterRating, setFilterRating] = useState('all');
  const [selectedReview, setSelectedReview] = useState(null);
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [toast, setToast] = useState(null);

  // Calculate statistics
  const stats = {
    totalReviews: reviews.length,
    averageRating: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1),
    fiveStars: reviews.filter(r => r.rating === 5).length,
    fourStars: reviews.filter(r => r.rating === 4).length,
    threeStars: reviews.filter(r => r.rating === 3).length,
    twoStars: reviews.filter(r => r.rating === 2).length,
    oneStar: reviews.filter(r => r.rating === 1).length,
    responseRate: ((reviews.filter(r => r.response).length / reviews.length) * 100).toFixed(0),
  };

  // Filter reviews by rating
  const filteredReviews = filterRating === 'all' 
    ? reviews 
    : reviews.filter(r => r.rating === parseInt(filterRating));

  // Show toast notification
  React.useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  function openResponseModal(review) {
    setSelectedReview(review);
    setResponseText(review.response || '');
    setIsResponseModalOpen(true);
  }

  function closeResponseModal() {
    setIsResponseModalOpen(false);
    setSelectedReview(null);
    setResponseText('');
  }

  function handleSaveResponse() {
    if (!responseText.trim()) {
      setToast({ type: 'error', message: 'Please enter a response' });
      return;
    }

    setReviews(reviews.map(r => 
      r.id === selectedReview.id ? { ...r, response: responseText } : r
    ));
    
    setToast({ type: 'success', message: 'Response saved successfully!' });
    closeResponseModal();
  }

  function handleDeleteResponse(reviewId) {
    if (window.confirm('Are you sure you want to delete this response?')) {
      setReviews(reviews.map(r => 
        r.id === reviewId ? { ...r, response: null } : r
      ));
      setToast({ type: 'success', message: 'Response deleted' });
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <VendorSidebar activePage="Reviews" />

          {/* Main Content */}
          <main className="flex-1 w-full lg:w-auto mt-16 lg:mt-0">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Reviews</h1>
              <p className="text-sm text-gray-500 mt-1">Manage customer feedback and ratings</p>
            </div>

            {/* Statistics Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs sm:text-sm text-gray-500 mb-1">Average Rating</div>
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.averageRating}</div>
                  </div>
                  <div className="text-yellow-500">
                    <StarIcon size={32} filled />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <StarIcon key={star} size={16} filled={star <= Math.round(stats.averageRating)} />
                  ))}
                </div>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="text-xs sm:text-sm text-gray-500 mb-1">Total Reviews</div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.totalReviews}</div>
                <div className="text-xs text-emerald-600 mt-2">↑ 12% from last month</div>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="text-xs sm:text-sm text-gray-500 mb-1">5-Star Reviews</div>
                <div className="text-2xl sm:text-3xl font-bold text-yellow-500">{stats.fiveStars}</div>
                <div className="text-xs text-gray-500 mt-2">{((stats.fiveStars / stats.totalReviews) * 100).toFixed(0)}% of total</div>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="text-xs sm:text-sm text-gray-500 mb-1">Response Rate</div>
                <div className="text-2xl sm:text-3xl font-bold text-indigo-600">{stats.responseRate}%</div>
                <div className="text-xs text-gray-500 mt-2">{reviews.filter(r => r.response).length} responses</div>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
              <h2 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">Rating Distribution</h2>
              <div className="space-y-2 sm:space-y-3">
                {[5, 4, 3, 2, 1].map(rating => {
                  const count = rating === 5 ? stats.fiveStars : rating === 4 ? stats.fourStars : rating === 3 ? stats.threeStars : rating === 2 ? stats.twoStars : stats.oneStar;
                  const percentage = (count / stats.totalReviews) * 100;
                  return (
                    <div key={rating} className="flex items-center gap-2 sm:gap-3">
                      <div className="flex items-center gap-1 w-16 sm:w-20">
                        <span className="text-xs sm:text-sm font-medium text-gray-700">{rating}</span>
                        <StarIcon size={14} filled className="text-yellow-500" />
                      </div>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-500 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-xs sm:text-sm text-gray-600 w-8 sm:w-12 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              <button
                onClick={() => setFilterRating('all')}
                className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                  filterRating === 'all' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                All Reviews ({reviews.length})
              </button>
              {[5, 4, 3, 2, 1].map(rating => {
                const count = reviews.filter(r => r.rating === rating).length;
                if (count === 0) return null;
                return (
                  <button
                    key={rating}
                    onClick={() => setFilterRating(rating.toString())}
                    className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors flex items-center gap-1 ${
                      filterRating === rating.toString() ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <span>{rating}</span>
                    <StarIcon size={14} filled className={filterRating === rating.toString() ? 'text-yellow-300' : 'text-yellow-500'} />
                    <span>({count})</span>
                  </button>
                );
              })}
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {filteredReviews.map(review => (
                <div key={review.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                  {/* Review Header */}
                  <div className="flex items-start gap-3 sm:gap-4 mb-4">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                      {review.customerAvatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{review.customerName}</h3>
                          <p className="text-xs text-gray-500">{review.date}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map(star => (
                            <StarIcon key={star} size={16} filled={star <= review.rating} />
                          ))}
                        </div>
                      </div>
                      <div className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                        {review.service}
                      </div>
                    </div>
                  </div>

                  {/* Review Comment */}
                  <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">{review.comment}</p>

                  {/* Helpful Counter */}
                  <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
                    <button className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 hover:text-indigo-600 transition-colors">
                      <ThumbsUpIcon />
                      <span>Helpful ({review.helpful})</span>
                    </button>
                  </div>

                  {/* Vendor Response */}
                  {review.response ? (
                    <div className="bg-indigo-50 rounded-lg p-3 sm:p-4 mb-3">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div className="mt-0.5">
                          <ReplyIcon />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-indigo-900 mb-1">Your Response</p>
                          <p className="text-xs sm:text-sm text-gray-700">{review.response}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => openResponseModal(review)}
                          className="text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteResponse(review.id)}
                          className="text-xs font-medium text-red-600 hover:text-red-700 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => openResponseModal(review)}
                      className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                    >
                      <ReplyIcon />
                      <span>Respond to review</span>
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredReviews.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
                <div className="text-gray-400 mb-4 flex justify-center">
                  <ReviewsEmptyIcon />
                </div>
                <p className="text-gray-500 font-medium mb-1">No reviews found</p>
                <p className="text-gray-400 text-sm">Try adjusting your filters</p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Response Modal */}
      {isResponseModalOpen && selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4" onClick={closeResponseModal}>
          <div className="w-full max-w-2xl bg-white rounded-xl sm:rounded-2xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  {selectedReview.response ? 'Edit Response' : 'Respond to Review'}
                </h2>
                <button onClick={closeResponseModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <CloseIcon />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6">
              {/* Original Review */}
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold text-xs">
                    {selectedReview.customerAvatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{selectedReview.customerName}</p>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <StarIcon key={star} size={12} filled={star <= selectedReview.rating} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-700">{selectedReview.comment}</p>
              </div>

              {/* Response Textarea */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Response</label>
                <textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  rows="5"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm resize-none"
                  placeholder="Write a professional and friendly response to this review..."
                />
                <p className="text-xs text-gray-500 mt-2">{responseText.length} characters</p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200 flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3">
              <button
                onClick={closeResponseModal}
                className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveResponse}
                className="px-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md transition-colors"
              >
                {selectedReview.response ? 'Update Response' : 'Post Response'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-3 sm:bottom-5 right-3 sm:right-5 left-3 sm:left-auto z-50 animate-slide-in">
          <div className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl shadow-lg sm:min-w-[300px] ${
            toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
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
function StarIcon({ size = 20, filled = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} xmlns="http://www.w3.org/2000/svg" className={filled ? "text-yellow-500" : "text-gray-300"}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={filled ? "currentColor" : "none"} stroke={filled ? "none" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ThumbsUpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ReplyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-indigo-600">
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CloseIcon() {
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

function ReviewsEmptyIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
