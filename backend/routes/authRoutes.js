// backend/routes/authRoutes.js
import express from 'express';
import {
  registerUser,
  loginUser,
  adminLogin,
  logoutUser,
  getMe ,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser); // user signup
router.post('/login',    loginUser);    // user login (session)
router.post('/logout',   logoutUser);   // user logout (session destroy)
router.get('/me', getMe); // In authRoutes.js
router.post('/admin/login', adminLogin); 
export default router;
