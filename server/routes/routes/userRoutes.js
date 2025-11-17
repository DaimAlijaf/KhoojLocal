import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/userController.js";
import { getRecommendations } from "../controllers/enhancedSearchController.js";
import {
  cancelBooking,
  createBooking,
  getBookingById,
  getUserBookings,
} from "../controllers/bookingController.js";
import {
  cancelOrder,
  createOrder,
  getOrderById,
  getUserOrders,
  validateCart,
} from "../controllers/orderController.js";
import { getOrderStatusHistory } from "../controllers/statusController.js";
import {
  confirmPayment,
  createPaymentIntent,
  getPaymentById,
  getUserPayments,
} from "../controllers/paymentController.js";

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
// Protected routes
router.get("/profile", protect, getUserProfile);
router.get("/auth/user/profile", protect, getUserProfile);

// Personalized Recommendations
router.get("/search/recommendations", protect, getRecommendations);

// Booking Management (User)
router.post("/bookings", protect, createBooking);
router.get("/bookings/my-bookings", protect, getUserBookings);
router.get("/bookings/:id", protect, getBookingById);
router.put("/bookings/:id/cancel", protect, cancelBooking);

// Order Management (User)
router.post("/orders", protect, createOrder);
router.get("/orders/my-orders", protect, getUserOrders);
router.get("/orders/:id", protect, getOrderById);
router.put("/orders/:id/cancel", protect, cancelOrder);
router.post("/orders/validate-cart", protect, validateCart);

router.get("/orders/:id/history", protect, getOrderStatusHistory);

// Payment (User)
router.post("/payments/create-intent", protect, createPaymentIntent);
router.post("/payments/:id/confirm", protect, confirmPayment);
router.get("/payments/:id", protect, getPaymentById);
router.get("/payments/my-payments", protect, getUserPayments);

export default router;
