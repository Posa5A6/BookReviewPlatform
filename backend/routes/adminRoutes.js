// backend/routes/adminRoutes.js

import express from 'express';
import {
  addBook,
  deleteBook,
  getAllUsers,
  getAllReviews,
} from '../controllers/adminController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes are protected by JWT and role === 'admin'

router.post('/books', protect, admin, addBook);          // Add book
router.delete('/books/:id', protect, admin, deleteBook); // Delete book

router.get('/users', protect, admin, getAllUsers);       // Get all users
router.get('/reviews', protect, admin, getAllReviews);   // Get all reviews

export default router;
