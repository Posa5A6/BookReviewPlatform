// backend/routes/authRoutes.js
import express from 'express';
import {
  registerUser,
  loginUser,
  adminLogin,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser); // user signup
router.post('/login', loginUser);       // user login (returns user object)
router.post('/adminLogin', adminLogin); // admin login (same format)

// Note: logout and /me are now handled in the frontend using localStorage

export default router;
