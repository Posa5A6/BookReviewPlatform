// backend/routes/userRoutes.js

import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';

const router = express.Router();

// GET user profile (auth enforced on frontend)
router.get('/profile', getUserProfile);

// PUT update profile (auth enforced on frontend)
router.put('/profile', updateUserProfile);

export default router;
