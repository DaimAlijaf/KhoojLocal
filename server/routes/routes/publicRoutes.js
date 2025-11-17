import express from "express";
const router = express.Router();
import {
  getApprovedVendors,
  getVendorById,
} from "../controllers/publicController.js";
import {
  getCategories,
  getNearbyBusinesses,
  searchBusinesses,
} from "../controllers/enhancedSearchController.js";
import {
  getBusinessContact,
  getBusinessDetails,
  getBusinessHours,
  getBusinessImages,
  getBusinessServices,
  getBusinessStats,
} from "../controllers/businessDetailsController.js";
import { checkAvailability } from "../controllers/bookingController.js";
import { handleStripeWebhook } from "../controllers/paymentController.js";

// Public routes
router.get("/", getApprovedVendors);
router.get("/:id", getVendorById);
router.get("/search/businesses", searchBusinesses);
router.get("/search/nearby", getNearbyBusinesses);
router.get("/search/categories", getCategories);
router.get("/vendors", getApprovedVendors);
router.get("/vendors/:id", getVendorById);

// Business Details (Public)
router.get("/businesses/:id/details", getBusinessDetails);
router.get("/businesses/:id/services", getBusinessServices);
router.get("/businesses/:id/contact", getBusinessContact);
router.get("/businesses/:id/images", getBusinessImages);
router.get("/businesses/:id/hours", getBusinessHours);
router.get("/businesses/:id/stats", getBusinessStats);

// Check Availability (Public)
router.get("/bookings/check-availability", checkAvailability);

// Stripe Webhook (Public - but verified internally)
router.post("/payments/webhook", handleStripeWebhook);

export default router;
