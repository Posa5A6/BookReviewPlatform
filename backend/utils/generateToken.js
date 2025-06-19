// backend/routes/userRoutes.js

import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';

import sessionProtect from '../middleware/sessionAuth.js';

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get current user's profile
// @access  Session (user)
router.get('/profile', sessionProtect, getUserProfile);

// @route   PUT /api/users/profile
// @desc    Update current user's profile
// @access  Session (user)
router.put('/profile', sessionProtect, updateUserProfile);

export default router;
