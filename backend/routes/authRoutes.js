// backend/routes/authRoutes.js
import express from 'express';
import {
  registerUser,
  loginUser,
  loginAdmin,
  logoutUser,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser); // user signup
router.post('/login',    loginUser);    // user login (session)
router.post('/admin',    loginAdmin);   // admin login (JWT)
router.post('/logout',   logoutUser);   // user logout (session destroy)

export default router;
