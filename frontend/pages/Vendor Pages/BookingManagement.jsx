// BookingManagement.jsx
// Vendor Booking Management Component

import React, { useState, useEffect } from 'react';
import VendorSidebar from '../../components/VendorSidebar';

const SAMPLE = [
  // Pending Bookings
  {
    id: 1,
    name: 'Aisha Sharma',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZaQkPXZY79EfdQPN_lyxA7FAOquhyeWS8ri0zQEH2PVmI6Hrfi1Cdr0cAFu1v7JPNJRHn-n8flh4AhIQzrEvch3vm2Wi8xqDBo5KBuoQVhoEOojMsBOhmj3wv9oTRpIbiwDfw1yv_2zDmmEWeSk_dy2XODlvRFJUcr3kqd5kEtdUXUh0JNtpdz-IOE3TxUFSgWA2gbv9fNOSIVlaCRDYxiX4oB1rLdnmT-07L03aU1HJCaiH-TZS7QyJDTUXksIFD1MRmPP7gFQSs',
    service: 'Deep Tissue Massage - 60 min',
    date: 'Mon, Oct 28',
    time: '2:00 PM',
    price: '$75.00',
    notes: 'Looking forward to it! Please focus on my upper back and shoulders.',
    status: 'pending',
  },
  {
    id: 2,
    name: 'Rohan Patel',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCd2C-sB96G4XWqXleJJzfuMIH_rqbjTbmUEvKumafzWFDSxFfVp4vcWZ7ZXYkDXLGmtONOBks74LGUSgH2avqz94U35QBoWQzUt47O7pqR-sFZymOygb1zsqtsum9NxVzWsr-FRHCZX8Yr0ONmZI4CWSwEsTJzMiCKR-awMUN7TdU1nsU_fOY2qAv2-j4i7Mwd5I3ml1qgPpKvBs49ZQMYFg8YvThsaCyl8kT5nTYtIv-GflvOZIO7x3ScjFHwbIvXu8hfd-4ovttr',
    service: 'Haircut & Style',
    date: 'Mon, Oct 28',
    time: '4:30 PM',
    price: '$40.00',
    notes: '',
    status: 'pending',
  },
  {
    id: 3,
    name: 'Priya Kumar',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    service: 'Bridal Makeup',
    date: 'Tue, Oct 29',
    time: '10:00 AM',
    price: '$150.00',
    notes: 'Wedding on Nov 5th. Need a trial session first.',
    status: 'pending',
  },

  // Active Bookings
  {
    id: 4,
    name: 'Vikram Singh',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    service: 'Personal Training - 1 Hour',
    date: 'Wed, Oct 30',
    time: '6:00 AM',
    price: '$50.00',
    notes: 'Regular morning session. Focus on cardio today.',
    status: 'active',
  },
  {
    id: 5,
    name: 'Sneha Reddy',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    service: 'Spa Package - 90 min',
    date: 'Wed, Oct 30',
    time: '2:00 PM',
    price: '$120.00',
    notes: 'Anniversary gift. Please include aromatherapy.',
    status: 'active',
  },
  {
    id: 6,
    name: 'Arjun Mehta',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    service: 'Beard Trim & Styling',
    date: 'Thu, Oct 31',
    time: '11:00 AM',
    price: '$25.00',
    notes: '',
    status: 'active',
  },
  {
    id: 7,
    name: 'Meera Joshi',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop',
    service: 'Yoga Class - Group',
    date: 'Thu, Oct 31',
    time: '7:00 PM',
    price: '$30.00',
    notes: 'First time joining. Beginner level please.',
    status: 'active',
  },

  // Completed Bookings
  {
    id: 8,
    name: 'Rajesh Gupta',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop',
    service: 'Hair Color & Highlights',
    date: 'Sat, Oct 26',
    time: '3:00 PM',
    price: '$85.00',
    notes: 'Natural brown color with subtle highlights.',
    status: 'completed',
  },
  {
    id: 9,
    name: 'Kavya Nair',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
    service: 'Manicure & Pedicure',
    date: 'Sun, Oct 27',
    time: '12:00 PM',
    price: '$45.00',
    notes: 'Red nail polish, gel finish.',
    status: 'completed',
  },
  {
    id: 10,
    name: 'Amit Desai',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop',
    service: 'Swedish Massage - 60 min',
    date: 'Sun, Oct 27',
    time: '4:00 PM',
    price: '$70.00',
    notes: 'Medium pressure. Had a great experience!',
    status: 'completed',
  },
  {
    id: 11,
    name: 'Divya Shah',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
    service: 'Facial Treatment - Premium',
    date: 'Mon, Oct 28',
    time: '10:00 AM',
    price: '$95.00',
    notes: 'Skin looks amazing! Thank you!',
    status: 'completed',
  },

  // Canceled Bookings
  {
    id: 12,
    name: 'Karan Malhotra',
    avatar: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=150&h=150&fit=crop',
    service: 'Haircut & Shave',
    date: 'Fri, Oct 25',
    time: '5:00 PM',
    price: '$35.00',
    notes: 'Had to cancel due to emergency.',
    status: 'canceled',
  },
  {
    id: 13,
    name: 'Anjali Verma',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop',
    service: 'Hair Spa Treatment',
    date: 'Sat, Oct 26',
    time: '1:00 PM',
    price: '$60.00',
    notes: 'Rescheduling for next week.',
    status: 'canceled',
  },
  {
    id: 14,
    name: 'Sanjay Kumar',
    avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop',
    service: 'Body Massage - 90 min',
    date: 'Sun, Oct 27',
    time: '9:00 AM',
    price: '$100.00',
    notes: 'Changed plans for the weekend.',
    status: 'canceled',
  },
];

export default function BookingManagement() {
  const [bookings] = useState(SAMPLE);
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [activeTab, setActiveTab] = useState('pending');

  // Filter bookings based on active tab
  const filteredBookings = bookings.filter(booking => booking.status === activeTab);

  // Get counts for each status
  const statusCounts = {
    pending: bookings.filter(b => b.status === 'pending').length,
    active: bookings.filter(b => b.status === 'active').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    canceled: bookings.filter(b => b.status === 'canceled').length,
  };

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  function openDetails(booking) {
    setSelected(booking);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setSelected(null);
  }

  function acceptBooking() {
    setToast({ type: 'success', message: 'Booking successfully accepted.' });
    closeModal();
  }

  function rejectBooking() {
    setToast({ type: 'error', message: 'Booking rejected.' });
    closeModal();
  }

  function rescheduleBooking() {
    setToast({ type: 'info', message: 'Open reschedule flow (not implemented).' });
    closeModal();
  }

  function getStatusBadgeColor(status) {
    const colors = {
      pending: 'bg-amber-100 text-amber-700',
      active: 'bg-blue-100 text-blue-700',
      completed: 'bg-emerald-100 text-emerald-700',
      canceled: 'bg-red-100 text-red-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <VendorSidebar activePage="Bookings" />

          {/* Main content */}
          <main className="flex-1 w-full lg:w-auto mt-16 lg:mt-0">
            <div className="flex items-center justify-between mb-6 flex-col sm:flex-row gap-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Bookings & Orders</h1>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-md transition-colors">
                <PlusIcon />
                <span>Create Booking</span>
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-x-auto">
              <div className="flex gap-4 sm:gap-8 px-4 sm:px-6 min-w-max">
                <button 
                  onClick={() => setActiveTab('pending')}
                  className={`py-3 sm:py-4 font-semibold transition-colors border-b-2 flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base ${activeTab === 'pending' ? 'text-indigo-600 border-indigo-600' : 'text-gray-500 border-transparent hover:text-gray-700'}`}
                >
                  Pending
                  <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-xs ${activeTab === 'pending' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'}`}>
                    {statusCounts.pending}
                  </span>
                </button>
                <button 
                  onClick={() => setActiveTab('active')}
                  className={`py-3 sm:py-4 font-semibold transition-colors border-b-2 flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base ${activeTab === 'active' ? 'text-indigo-600 border-indigo-600' : 'text-gray-500 border-transparent hover:text-gray-700'}`}
                >
                  Active
                  <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-xs ${activeTab === 'active' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'}`}>
                    {statusCounts.active}
                  </span>
                </button>
                <button 
                  onClick={() => setActiveTab('completed')}
                  className={`py-3 sm:py-4 font-semibold transition-colors border-b-2 flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base ${activeTab === 'completed' ? 'text-indigo-600 border-indigo-600' : 'text-gray-500 border-transparent hover:text-gray-700'}`}
                >
                  Completed
                  <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-xs ${activeTab === 'completed' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'}`}>
                    {statusCounts.completed}
                  </span>
                </button>
                <button 
                  onClick={() => setActiveTab('canceled')}
                  className={`py-3 sm:py-4 font-semibold transition-colors border-b-2 flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base ${activeTab === 'canceled' ? 'text-indigo-600 border-indigo-600' : 'text-gray-500 border-transparent hover:text-gray-700'}`}
                >
                  Canceled
                  <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-xs ${activeTab === 'canceled' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'}`}>
                    {statusCounts.canceled}
                  </span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {filteredBookings.map((b) => (
                <article key={b.id} className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url(${b.avatar})` }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 truncate text-sm sm:text-base">{b.name}</h3>
                        <span className={`inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${getStatusBadgeColor(b.status)}`}>
                          {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-1">{b.service}</p>
                    </div>
                  </div>

                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                      <div className="flex items-center gap-1 sm:gap-1.5">
                        <CalendarIcon />
                        <span className="truncate">{b.date}</span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-1.5">
                        <ClockIcon />
                        <span>{b.time}</span>
                      </div>
                      <div className="font-bold text-gray-900 ml-auto text-sm sm:text-base">{b.price}</div>
                    </div>
                    <button onClick={() => openDetails(b)} className="text-indigo-600 font-semibold text-xs sm:text-sm hover:text-indigo-700 transition-colors">
                      View Details →
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Empty state */}
            {filteredBookings.length === 0 && (
              <div className="mt-16 text-center py-12 bg-white rounded-2xl border border-gray-200">
                <div className="text-gray-400 mb-4 flex justify-center">
                  <CalendarIcon />
                </div>
                <p className="text-gray-500 font-medium mb-1">No {activeTab} bookings</p>
                <p className="text-gray-400 text-sm">Check other tabs or create a new booking</p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4" onClick={closeModal}>
          <div className="w-full max-w-lg bg-white rounded-xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in max-h-[90vh] sm:max-h-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url(${selected.avatar})` }} />
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-gray-900">Booking Request</h2>
                    <p className="text-xs sm:text-sm text-gray-500">{selected.name}</p>
                  </div>
                </div>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 -mr-1">
                  <CloseIconModal />
                </button>
              </div>
              <p className="text-xs sm:text-sm text-gray-700 font-medium">{selected.service}</p>
            </div>

            <div className="p-4 sm:p-6 flex-1 space-y-4 sm:space-y-6 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-gray-500 text-xs sm:text-sm mb-1">
                    <CalendarIcon />
                    <span>Date & Time</span>
                  </div>
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">{selected.date}</p>
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">{selected.time}</p>
                </div>
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-gray-500 text-xs sm:text-sm mb-1">
                    <DollarIcon />
                    <span>Total Cost</span>
                  </div>
                  <p className="font-bold text-gray-900 text-lg sm:text-xl">{selected.price}</p>
                </div>
              </div>

              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Customer Notes</p>
                <div className="p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs sm:text-sm text-gray-700">{selected.notes || 'No notes provided'}</p>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row justify-end items-stretch sm:items-center gap-2 sm:gap-3">
              <button onClick={rejectBooking} className="px-4 sm:px-5 py-2 sm:py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors order-3 sm:order-1">
                Reject
              </button>
              <button onClick={rescheduleBooking} className="px-4 sm:px-5 py-2 sm:py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors order-2 sm:order-2">
                Reschedule
              </button>
              <button onClick={acceptBooking} className="px-5 sm:px-6 py-2 sm:py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md transition-colors order-1 sm:order-3">
                Accept Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-3 sm:bottom-5 right-3 sm:right-5 left-3 sm:left-auto z-50 animate-slide-in">
          <div className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl shadow-lg sm:min-w-[300px] ${
            toast.type === 'success' ? 'bg-emerald-500 text-white' : 
            toast.type === 'error' ? 'bg-rose-500 text-white' : 
            'bg-blue-500 text-white'
          }`}>
            <div className="flex-shrink-0">
              {toast.type === 'success' ? <CheckCircleIcon /> : 
               toast.type === 'error' ? <ErrorIcon /> : 
               <InfoIcon />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-xs sm:text-sm">
                {toast.type === 'success' ? 'Success!' : 
                 toast.type === 'error' ? 'Error' : 
                 'Notice'}
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

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="6" width="18" height="15" rx="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M8 3V7M16 3V7M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
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

function DollarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 1v22M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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

function InfoIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 16v-4m0-4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

