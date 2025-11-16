import React from 'react';
import { Routes, Route } from 'react-router-dom';
// Import the Login page from pages/Login (file exists at pages/Login/Login.jsx)
import LoginPage from './pages/Login/Login';
import AdminLogin from './pages/Admin Pages/AdminLogin';
import AdminDashboard from './pages/Admin Pages/AdminDashboard';
import VendorApplicationReview from './pages/Admin Pages/VendorApplicationReview';
import AdminReviews from './pages/Admin Pages/AdminReviews';
import AdminUsers from './pages/Admin Pages/AdminUsers';
import AdminAnalysis from './pages/Admin Pages/AdminAnalysis';
import MainPage from './pages/User Pages/MainPage';
import SearchResults from './pages/User Pages/SearchResults';
import EndUserBusinessDetails from './pages/User Pages/EndUserBsinessDetails';
import UserBooking from './pages/User Pages/UserBooking';
import OverallBookings from './pages/User Pages/OverallBookings';
import UserMessages from './pages/User Pages/User-Messages';
import VendorReg from './pages/Vendor Pages/VendorReg.jsx';
import VendorDashboard from './pages/Vendor Pages/VendorDashboard.jsx';
import BookingManagement from './pages/Vendor Pages/BookingManagement.jsx';
import Services from './pages/Vendor Pages/Services.jsx';
import VendorMessages from './pages/Vendor Pages/VendorMessages.jsx';
import VendorReviews from './pages/Vendor Pages/VendorReviews.jsx';

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/admin/vendors" element={<VendorApplicationReview />} />
        <Route path="/admin/reviews" element={<AdminReviews />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/analytics" element={<AdminAnalysis />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/business/:id" element={<EndUserBusinessDetails />} />
        <Route path="/booking" element={<UserBooking />} />
        <Route path="/bookings" element={<OverallBookings />} />
        <Route path="/messages" element={<UserMessages />} />
        <Route path="/vendor-register" element={<VendorReg />} />
        <Route path="/vendor-dashboard" element={<VendorDashboard />} />
        <Route path="/vendor-bookings" element={<BookingManagement />} />
        <Route path="/vendor-services" element={<Services />} />
        <Route path="/vendor-messages" element={<VendorMessages />} />
        <Route path="/vendor-reviews" element={<VendorReviews />} />
      </Routes>
    </div>
  );
}

export default App;
