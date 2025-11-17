import express from 'express';
const router = express.Router();
import { protect,adminOnly } from '../middleware/authMiddleware.js';
import {
  getAllUsers,
  getAllVendors,
  getPendingVendors,
  updateUserStatus,
  updateVendorStatus,
  deleteUser,
  deleteVendor,
} from '../controllers/adminManagementController.js';


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


export default router
