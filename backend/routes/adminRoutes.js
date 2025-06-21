import express from 'express';
import {
  addBook,
  deleteBook,
  getAllBooks,
  getAllUsers,
  getAllReviews
} from '../controllers/adminController.js';

import adminSessionProtect from '../middleware/adminBasicAuth.js';

const router = express.Router();

// Admin routes (all protected via session-based admin middleware)
router.post('/books', adminSessionProtect, addBook);
router.delete('/books/:id', adminSessionProtect, deleteBook);
router.get('/books', adminSessionProtect, getAllBooks);
router.get('/users', adminSessionProtect, getAllUsers);
router.get('/reviews', adminSessionProtect, getAllReviews);
router.get('/dashboard', adminSessionProtect, (req, res) => {
  res.json({ message: 'Welcome, admin' });
});

export default router;
