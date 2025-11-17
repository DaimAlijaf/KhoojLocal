const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');

const { loginAdmin,
  getAdminProfile,
  getDashboardStats } = require('../controllers/adminController');

// Public routes
router.post('/login', loginAdmin);

// Protected routes (Admin only)
router.get('/profile', protect, adminOnly, getAdminProfile);
router.get('/dashboard-stats', protect, adminOnly, getDashboardStats);


module.exports = router;
