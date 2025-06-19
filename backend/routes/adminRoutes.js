import express from 'express';
import {
  addBook,
  deleteBook,
  getAllUsers,
  getAllReviews,
} from '../controllers/adminController.js';

const router = express.Router();

router.post('/books', addBook);       // POST /api/admin/books
router.delete('/books/:id', deleteBook);
router.get('/users', getAllUsers);
router.get('/reviews', getAllReviews);

export default router;
