import express from "express";
const router = express.Router();

import { protect } from "../middleware/authMiddleware.js";

import {
  registerVendor,
  loginVendor,
  getVendorProfile,
  updateVendorProfile,
} from "../controllers/vendorController.js";
import { acceptBooking, acceptOrder, getPendingBookings, getPendingOrders, getVendorBookings, getVendorOrders, rejectBooking, rejectOrder, rescheduleBooking } from "../controllers/vendorRequestController.js";
import { getActiveBookings, getActiveOrders, updateBookingStatus, updateDeliveryTime, updateOrderStatus } from "../controllers/statusController.js";
import { getVendorPayments, processRefund } from "../controllers/paymentController.js";

// Public routes
router.post("/register", registerVendor);
router.post("/login", loginVendor);

// Protected routes
router.get("/profile", protect, getVendorProfile);
router.put("/profile", protect, updateVendorProfile);

// Vendor Booking Management
router.get("/vendor/bookings", protect, getVendorBookings);
router.get("/vendor/bookings/pending", protect, getPendingBookings);
router.get("/vendor/bookings/active", protect, getActiveBookings);
router.put("/vendor/bookings/:id/accept", protect, acceptBooking);
router.put("/vendor/bookings/:id/reject", protect, rejectBooking);
router.put("/vendor/bookings/:id/reschedule", protect, rescheduleBooking);
router.put("/vendor/bookings/:id/status", protect, updateBookingStatus);

// Vendor Order Management
router.get("/vendor/orders", protect, getVendorOrders);
router.get("/vendor/orders/pending", protect, getPendingOrders);
router.get("/vendor/orders/active", protect, getActiveOrders);
router.put("/vendor/orders/:id/accept", protect, acceptOrder);
router.put("/vendor/orders/:id/reject", protect, rejectOrder);
router.put("/vendor/orders/:id/status", protect, updateOrderStatus);
router.put("/vendor/orders/:id/delivery-time", protect, updateDeliveryTime);

// Vendor Payment Management
router.get("/vendor/payments", protect, getVendorPayments);
router.post("/payments/:id/refund", protect, processRefund);
export default router;
