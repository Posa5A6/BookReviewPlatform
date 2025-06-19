import express from 'express';
const router = express.Router();

import {
  registerUser,
  loginUser,
  logoutUser,
  loginAdmin, // <-- import the new admin login controller
} from '../controllers/authController.js';

// USER ROUTES
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// ADMIN ROUTE
router.post('/admin/login', loginAdmin); // <-- add this route

export default router;
