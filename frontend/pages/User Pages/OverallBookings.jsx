import React, { useState } from "react";
import { Calendar, Clock, MapPin, ChevronDown, ChevronUp, Search } from "lucide-react";
import Navbar from "../../components/Navbar";

/* ---------- Mock data ---------- */
const bookings = {
  upcoming: [
    {
      id: "b1",
      title: "Deep Tissue Massage",
      venue: "Serenity Spa",
      date: "Friday, Oct 27, 2024",
      time: "2:00 PM",
      status: "Confirmed",
      price: 95.0,
      icon: "💆",
    },
    {
      id: "b2",
      title: "Table for Two",
      venue: "The Gourmet Place",
      date: "Saturday, Oct 28, 2024",
      time: "7:30 PM",
      status: "Pending",
      price: 50.0,
      deposit: true,
      icon: "🍽️",
      location: "123 Culinary Lane, Foodie City, 10001",
      bookingId: "#BK-987654",
      notes: "Window seat requested, if possible.",
      payment: "Paid with Visa **** 1234",
    },
  ],
  past: [
    {
      id: "b3",
      title: "Men's Haircut",
      venue: "The Modern Barber",
      date: "Wednesday, Sep 18, 2024",
      time: "11:00 AM",
      status: "Completed",
      price: 40.0,
      icon: "✂️",
    },
  ],
};

/* Booking Card components */
function StatusBadge({ status }) {
  const map = {
    Confirmed: { bg: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
    Pending: { bg: "bg-amber-50 text-amber-700", dot: "bg-amber-500" },
    Completed: { bg: "bg-gray-100 text-gray-600", dot: "bg-gray-400" },
  };
  const cfg = map[status] || map.Pending;
  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 sm:px-3 py-1 text-xs sm:text-sm font-medium ${cfg.bg}`}>
      <span className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full ${cfg.dot}`} />
      {status}
    </div>
  );
}

function UpcomingCard({ b }) {
  const [expanded, setExpanded] = useState(false);
  const hasDetails = !!(b.location || b.bookingId || b.notes || b.payment);

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between gap-3 sm:gap-4">
          <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
            <div className="hidden sm:flex items-center justify-center rounded-lg p-3 bg-violet-50 text-2xl flex-shrink-0">
              {b.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-base sm:text-lg text-gray-900">{b.title}</h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">at {b.venue}</p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2 text-xs sm:text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span>{b.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span>{b.time}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <StatusBadge status={b.status} />
            <p className="font-bold text-base sm:text-lg text-gray-900">${b.price.toFixed(2)}{b.deposit ? " (Deposit)" : ""}</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap gap-2 sm:gap-3 justify-end">
          <button className="rounded-lg h-9 sm:h-10 px-3 sm:px-4 bg-gray-100 text-gray-700 text-xs sm:text-sm font-medium hover:bg-gray-200 transition">
            Cancel
          </button>
          <button className="rounded-lg h-9 sm:h-10 px-3 sm:px-4 bg-violet-600 text-white text-xs sm:text-sm font-semibold hover:bg-violet-700 transition">
            {hasDetails ? "Contact Venue" : "Reschedule"}
          </button>
          {hasDetails && (
            <button 
              onClick={() => setExpanded(!expanded)}
              className="rounded-lg h-9 sm:h-10 w-9 sm:w-10 bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
            >
              {expanded ? <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5" /> : <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />}
            </button>
          )}
        </div>

        {expanded && hasDetails && (
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm">
            {b.location && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Location</h4>
                <p className="text-gray-600">{b.location}</p>
                <a href="#" className="text-violet-600 font-medium hover:underline mt-1 inline-block">View on map</a>
              </div>
            )}
            {b.bookingId && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Booking ID</h4>
                <p className="text-gray-600">{b.bookingId}</p>
              </div>
            )}
            {b.notes && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Special Notes</h4>
                <p className="text-gray-600">{b.notes}</p>
              </div>
            )}
            {b.payment && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Payment Method</h4>
                <p className="text-gray-600">{b.payment}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function PastCard({ b }) {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between gap-3 sm:gap-4">
          <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
            <div className="hidden sm:flex items-center justify-center rounded-lg p-3 bg-gray-100 text-2xl flex-shrink-0">
              {b.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-base sm:text-lg text-gray-900">{b.title}</h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">at {b.venue}</p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2 text-xs sm:text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span>{b.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span>{b.time}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <StatusBadge status={b.status} />
            <p className="font-bold text-base sm:text-lg text-gray-900">${b.price.toFixed(2)}</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap gap-2 sm:gap-3 justify-end">
          <button className="rounded-lg h-9 sm:h-10 px-3 sm:px-4 bg-gray-100 text-gray-700 text-xs sm:text-sm font-medium hover:bg-gray-200 transition">
            View Receipt
          </button>
          <button className="rounded-lg h-9 sm:h-10 px-3 sm:px-4 bg-violet-600 text-white text-xs sm:text-sm font-semibold hover:bg-violet-700 transition">
            Book Again
          </button>
        </div>
      </div>
    </div>
  );
}

/* Empty State */
function EmptyState() {
  return (
    <div className="text-center border-2 border-dashed border-gray-300 rounded-2xl p-8 sm:p-12 mt-6 sm:mt-8">
      <div className="flex justify-center text-gray-300">
        <Calendar className="h-16 w-16 sm:h-20 sm:w-20" />
      </div>
      <h3 className="mt-4 text-lg sm:text-xl font-bold text-gray-900">No bookings yet</h3>
      <p className="mt-2 text-sm sm:text-base text-gray-500">When you book a service, it will appear here.</p>
      <button className="mt-6 rounded-lg h-10 sm:h-11 px-4 sm:px-6 bg-violet-600 text-white text-sm sm:text-base font-semibold hover:bg-violet-700 transition">
        Explore Services
      </button>
    </div>
  );
}

/* Timeline View Components */
function TimelineBookingCard({ b, isPast }) {
  return (
    <div className="relative pl-8 sm:pl-12 pb-8 sm:pb-12">
      {/* Timeline dot and line */}
      <div className="absolute left-0 top-0">
        <div className={`h-4 w-4 sm:h-5 sm:w-5 rounded-full border-4 ${isPast ? 'bg-gray-400 border-gray-200' : 'bg-violet-600 border-violet-200'}`} />
        <div className="absolute left-1/2 top-4 sm:top-5 -translate-x-1/2 w-0.5 h-full bg-gray-200" />
      </div>

      {/* Date label */}
      <div className="mb-3">
        <p className="text-xs sm:text-sm font-semibold text-violet-600">{b.date}</p>
      </div>

      {/* Card content */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="hidden sm:flex items-center justify-center rounded-lg p-2.5 bg-violet-50 text-xl flex-shrink-0">
                {b.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base sm:text-lg text-gray-900">{b.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">at {b.venue}</p>
                <div className="flex items-center gap-2 mt-2 text-xs sm:text-sm text-gray-500">
                  <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span>{b.time}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              <StatusBadge status={b.status} />
              <p className="font-bold text-sm sm:text-base text-gray-900">${b.price.toFixed(2)}{b.deposit ? " (Deposit)" : ""}</p>
            </div>
          </div>

          {!isPast && (
            <div className="flex flex-wrap gap-2 justify-end pt-3 border-t border-gray-100">
              <button className="rounded-lg h-8 sm:h-9 px-3 bg-gray-100 text-gray-700 text-xs sm:text-sm font-medium hover:bg-gray-200 transition">
                Cancel
              </button>
              <button className="rounded-lg h-8 sm:h-9 px-3 bg-violet-600 text-white text-xs sm:text-sm font-semibold hover:bg-violet-700 transition">
                {b.location ? "Contact" : "Reschedule"}
              </button>
            </div>
          )}

          {isPast && (
            <div className="flex flex-wrap gap-2 justify-end pt-3 border-t border-gray-100">
              <button className="rounded-lg h-8 sm:h-9 px-3 bg-gray-100 text-gray-700 text-xs sm:text-sm font-medium hover:bg-gray-200 transition">
                View Receipt
              </button>
              <button className="rounded-lg h-8 sm:h-9 px-3 bg-violet-600 text-white text-xs sm:text-sm font-semibold hover:bg-violet-700 transition">
                Book Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TimelineView({ upcoming, past }) {
  const allBookings = [
    ...upcoming.map(b => ({ ...b, isPast: false })),
    ...past.map(b => ({ ...b, isPast: true }))
  ];

  return (
    <div className="relative">
      <div className="space-y-0">
        {allBookings.map((b, idx) => (
          <TimelineBookingCard key={b.id} b={b} isPast={b.isPast} />
        ))}
      </div>
    </div>
  );
}

/* ---------- Main Component ---------- */
export default function OverallBookings() {
  const { upcoming, past } = bookings;
  const [view, setView] = useState('list');
  const noBookings = upcoming.length === 0 && past.length === 0;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col gap-6 sm:gap-8">
          {/* Header / Controls */}
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black">My Bookings & Orders</h1>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  <input 
                    className="w-full rounded-lg pl-10 sm:pl-11 pr-4 h-10 sm:h-11 border border-gray-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent" 
                    placeholder="Search by service, date, status..." 
                  />
                </div>
              </div>

              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setView('list')}
                  className={`flex-1 sm:flex-none px-4 sm:px-6 h-9 rounded-md text-xs sm:text-sm font-medium transition ${view === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'}`}
                >
                  List View
                </button>
                <button
                  onClick={() => setView('timeline')}
                  className={`flex-1 sm:flex-none px-4 sm:px-6 h-9 rounded-md text-xs sm:text-sm font-medium transition ${view === 'timeline' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'}`}
                >
                  Timeline View
                </button>
              </div>
            </div>
          </div>

          {noBookings ? (
            <EmptyState />
          ) : view === 'timeline' ? (
            <TimelineView upcoming={upcoming} past={past} />
          ) : (
            <>
              {/* Upcoming */}
              {upcoming.length > 0 && (
                <section>
                  <h2 className="text-xl sm:text-2xl font-bold pb-3 sm:pb-4">Upcoming</h2>
                  <div className="flex flex-col gap-4 sm:gap-6">
                    {upcoming.map(b => <UpcomingCard key={b.id} b={b} />)}
                  </div>
                </section>
              )}

              {/* Past */}
              {past.length > 0 && (
                <section>
                  <h2 className="text-xl sm:text-2xl font-bold pt-6 sm:pt-8 pb-3 sm:pb-4">Past</h2>
                  <div className="flex flex-col gap-4 sm:gap-6">
                    {past.map(b => <PastCard key={b.id} b={b} />)}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
