// VendorSidebar.jsx
// Vendor Dashboard Sidebar Component - Mobile Responsive

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VendorSidebar({ activePage = "Dashboard" }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (page, route) => {
    navigate(route);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button - Only visible on mobile */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky lg:top-6 top-0 left-0 h-screen lg:h-auto
        w-64 lg:self-start z-40 lg:z-auto
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="bg-white shadow-sm rounded-none lg:rounded-2xl p-4 h-full lg:h-auto overflow-y-auto">
          <div className="flex items-center gap-3 p-2 mb-2">
            <div className="h-10 w-10 rounded-full bg-teal-700 flex items-center justify-center text-white font-bold text-lg">K</div>
            <div>
              <div className="font-semibold text-gray-900">KhojLocal</div>
              <div className="text-xs text-gray-500">Vendor Dashboard</div>
            </div>
          </div>

          <nav className="mt-6 space-y-1">
            <NavItem label="Dashboard" icon={DashboardIcon} active={activePage === "Dashboard"} onClick={() => handleNavigation("Dashboard", "/vendor-dashboard")} />
            <NavItem label="Bookings" icon={CalendarNavIcon} active={activePage === "Bookings"} onClick={() => handleNavigation("Bookings", "/vendor-bookings")} />
            <NavItem label="Services" icon={ServicesIcon} active={activePage === "Services"} onClick={() => handleNavigation("Services", "/vendor-services")} />
            <NavItem label="Messages" icon={MessagesIcon} active={activePage === "Messages"} onClick={() => handleNavigation("Messages", "/vendor-messages")} />
            <NavItem label="Reviews" icon={ReviewsIcon} active={activePage === "Reviews"} onClick={() => handleNavigation("Reviews", "/vendor-reviews")} />
          </nav>

          <div className="mt-6 border-t pt-4 space-y-1">
            <button className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-gray-50 text-gray-600 text-sm">
              <SettingsIcon />
              <span>Settings</span>
            </button>
            <button className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-gray-50 text-gray-600 text-sm">
              <HelpIcon />
              <span>Help</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

/* ----- Helper Components ----- */
function NavItem({ label, icon: Icon, active, onClick }) {
  return (
    <div 
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${active ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
      onClick={onClick}
    >
      {Icon && <Icon />}
      <span className="text-sm">{label}</span>
    </div>
  );
}

/* ----- Sidebar Navigation Icons ----- */
function DashboardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
      <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
      <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
      <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}

function CalendarNavIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="6" width="18" height="15" rx="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M3 10H21" stroke="currentColor" strokeWidth="2"/>
      <path d="M8 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M16 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function ServicesIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
      <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
      <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
      <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}

function MessagesIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ReviewsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 1v6m0 6v6M23 12h-6m-6 0H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3m.08 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

/* Mobile Menu Icons */
function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
