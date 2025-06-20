import express from 'express';
const router = express.Router();

import {
  addBook,
  deleteBook,
  getAllBooks,       // ✅ Consolidated import
  getAllUsers,
  getAllReviews
} from '../controllers/adminController.js';

import adminBasicAuth from '../middleware/adminBasicAuth.js';

// ─────────────────────────────
// Books Management (Admin Only)
// ─────────────────────────────
router.post('/books', adminBasicAuth, addBook);
router.delete('/books/:id', adminBasicAuth, deleteBook);
router.get('/books', adminBasicAuth, getAllBooks);  // ✅ Route for getting all books

// ─────────────────────────────
// Users & Reviews (Admin Only)
// ─────────────────────────────
router.get('/users', adminBasicAuth, getAllUsers);
router.get('/reviews', adminBasicAuth, getAllReviews);

// ─────────────────────────────
// Dashboard Welcome Message
// ─────────────────────────────
router.get('/dashboard', adminBasicAuth, (req, res) => {
  res.json({ message: 'Welcome, admin' });
});

export default router;
