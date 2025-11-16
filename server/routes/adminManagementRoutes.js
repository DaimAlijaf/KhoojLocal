const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const {
  getAllUsers,
  getAllVendors,
  getPendingVendors,
  updateUserStatus,
  updateVendorStatus,
  deleteUser,
  deleteVendor,
} = require('../controllers/adminManagementController');

// All routes require admin authentication
router.use(protect, adminOnly);

// User management routes
router.get('/users', getAllUsers);
router.put('/users/:id', updateUserStatus);
router.delete('/users/:id', deleteUser);

// Vendor management routes
router.get('/vendors', getAllVendors);
router.get('/vendors/pending', getPendingVendors);
router.put('/vendors/:id', updateVendorStatus);
router.delete('/vendors/:id', deleteVendor);

module.exports = router;
