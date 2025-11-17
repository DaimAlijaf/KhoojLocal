
import express from 'express';
const router = express.Router();
import { protect,adminOnly } from '../middleware/authMiddleware.js';

import { loginAdmin,
  getAdminProfile,
  getDashboardStats, } from '../controllers/adminController.js';

// Public routes
router.post('/login', loginAdmin);

// Protected routes (Admin only)
router.get('/profile', protect, adminOnly, getAdminProfile);
router.get('/dashboard-stats', protect, adminOnly, getDashboardStats);


export default router
