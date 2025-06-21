// backend/routes/reviewRoutes.js

import express from 'express';
import {
  createReview,
  getReviewsForBook,
} from '../controllers/reviewController.js';

import sessionProtect from '../middleware/sessionAuth.js'; // Make sure this is the correct middleware name

const router = express.Router();

// @route   GET /api/reviews/:bookId
// @desc    Get all reviews for a specific book
// @access  Public
router.get('/:bookId', getReviewsForBook);

// @route   POST /api/reviews/:bookId
// @desc    Submit a review for a specific book
// @access  User (session-based)
router.post('/:bookId', sessionProtect, createReview);

export default router;
