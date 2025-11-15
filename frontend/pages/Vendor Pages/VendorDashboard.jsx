// VendorDashboard.jsx
// Vendor Dashboard Main Component

import React from "react";
import VendorSidebar from "../../components/VendorSidebar";

export default function VendorDashboard() {
  const stats = [
    { label: "Pending Requests", value: 12, meta: "+5% from last month", color: "green" },
    { label: "Active Orders", value: 8, meta: "-2% from last month", color: "red" },
    { label: "Average Rating", value: "4.8", meta: "+0.1 from last month", color: "green", showStar: true },
    { label: "Total Revenue", value: "$3,450", meta: "+12% from last month", color: "green" },
  ];

  const actions = [
    { label: "Add New Service", icon: PlusCircleIcon, primary: true },
    { label: "View Bookings", icon: CalendarIcon },
    { label: "Manage Services", icon: ListIcon },
    { label: "Reply to Messages", icon: ReplyIcon },
  ];

  const activity = [
    { title: "New booking from Jane D.", subtitle: "Haircut & Style", time: "2 hours ago", icon: BookingIcon },
    { title: "Order #1122 completed", subtitle: "Manicure service for John S.", time: "Yesterday", icon: CheckIcon },
    { title: "New 5-star review", subtitle: "From Emily R.", time: "2 days ago", icon: StarIcon },
    { title: "New message from Mark T.", subtitle: '"Can I reschedule my appointment?"', time: "3 days ago", icon: MessageIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <VendorSidebar activePage="Dashboard" />

          {/* Main content */}
          <main className="flex-1 w-full lg:w-auto mt-16 lg:mt-0">
            <div className="flex items-center justify-between mb-6 flex-col sm:flex-row gap-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
              <div className="inline-flex items-center gap-2 bg-white shadow-sm rounded-lg px-4 py-2 border border-gray-200">
                <CalendarSmallIcon />
                <span className="text-sm text-gray-600">Last 30 Days</span>
                <ChevronDownIcon />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {stats.map((s) => (
                    <div key={s.label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                      <div className="text-sm text-gray-500 mb-2">{s.label}</div>
                      <div className="flex items-baseline gap-2">
                        <div className="text-3xl font-bold text-gray-900">{s.value}</div>
                        {s.showStar && <span className="text-2xl">⭐</span>}
                      </div>
                      <div className={`mt-3 text-sm flex items-center gap-1 ${s.color === 'green' ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {s.color === 'green' ? <TrendUpIcon /> : <TrendDownIcon />}
                        <span>{s.meta}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-lg mb-4 text-gray-900">Recent Activity</h3>
                  <div className="space-y-3">
                    {activity.map((a, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${getActivityIconBg(idx)}`}>
                            {a.icon && <a.icon />}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{a.title}</div>
                            <div className="text-sm text-gray-500">{a.subtitle}</div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-400">{a.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <aside className="lg:col-span-4">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>

                  <div className="space-y-3">
                    {actions.map((it, i) => (
                      it.primary ? (
                        <button key={i} className="w-full inline-flex items-center justify-center gap-2 p-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md shadow-indigo-200 transition-all">
                          <it.icon />
                          <span>{it.label}</span>
                        </button>
                      ) : (
                        <button key={i} className="w-full p-3 bg-white border border-gray-200 rounded-xl flex items-center gap-3 hover:bg-gray-50 hover:border-gray-300 transition-all">
                          <span className="flex items-center justify-center text-gray-600">
                            <it.icon />
                          </span>
                          <span className="text-sm text-gray-700 font-medium">{it.label}</span>
                        </button>
                      )
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

/* ----- Helper function for activity icon backgrounds ----- */
function getActivityIconBg(idx) {
  const colors = [
    'bg-indigo-100 text-indigo-600',
    'bg-emerald-100 text-emerald-600',
    'bg-amber-100 text-amber-600',
    'bg-blue-100 text-blue-600'
  ];
  return colors[idx % colors.length];
}

/* ----- Icons ----- */

/* Header Icons */
function CalendarSmallIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="6" width="18" height="15" rx="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M8 3V7M16 3V7M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* Trend Icons */
function TrendUpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23 6l-9.5 9.5-5-5L1 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17 6h6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function TrendDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23 18l-9.5-9.5-5 5L1 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17 18h6v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* Quick Action Icons */
function PlusCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 8v8m-4-4h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="6" width="18" height="15" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 3V7M16 3V7M3 10H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
function ListIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 6H21M8 12H21M8 18H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="4" cy="6" r="1" fill="currentColor"/>
      <circle cx="4" cy="12" r="1" fill="currentColor"/>
      <circle cx="4" cy="18" r="1" fill="currentColor"/>
    </svg>
  );
}

function ReplyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 17l-5-5 5-5M4 12h12a4 4 0 0 1 4 4v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* Activity Icons */
function BookingIcon() { 
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="6" width="18" height="15" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 3V7M16 3V7M3 10H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ); 
}

function CheckIcon() { 
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ); 
}

function StarIcon() { 
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ); 
}

function MessageIcon() { 
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ); 
}

/* End of file */
