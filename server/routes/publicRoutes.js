const express = require('express');
const router = express.Router();
const {
  getApprovedVendors,
  getVendorById,
} = require('../controllers/publicController');

// Public routes
router.get('/', getApprovedVendors);
router.get('/:id', getVendorById);

module.exports = router;
