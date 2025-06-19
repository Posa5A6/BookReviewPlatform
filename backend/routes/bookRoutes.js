// backend/routes/bookRoutes.js

import express from 'express';
import { getBooks, getBookById } from '../controllers/bookController.js';

const router = express.Router();

// @route   GET /api/books
// @desc    Get all books (search, filter, pagination)
// @access  Public
router.get('/', getBooks);

// @route   GET /api/books/:id
// @desc    Get single book by ID
// @access  Public
router.get('/:id', getBookById);

export default router;
