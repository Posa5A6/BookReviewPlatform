// backend/routes/adminRoutes.js

import express from 'express';
import {
  addBook,
  deleteBook,
  getAllBooks,
  getAllUsers,
  getAllReviews
} from '../controllers/adminController.js';

const router = express.Router();

// Admin routes – protected on frontend by checking localStorage role
router.post('/books', addBook);
router.delete('/books/:id', deleteBook);
router.get('/books', getAllBooks);
router.get('/users', getAllUsers);
router.get('/reviews', getAllReviews);
router.get('/dashboard', (req, res) => {
  res.json({ message: 'Welcome, admin' });
});

export default router;
