const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  registerVendor,
  loginVendor,
  getVendorProfile,
  updateVendorProfile,
} = require('../controllers/vendorController');

// Public routes
router.post('/register', registerVendor);
router.post('/login', loginVendor);

// Protected routes
router.get('/profile', protect, getVendorProfile);
router.put('/profile', protect, updateVendorProfile);

module.exports = router;
