// backend/routes/reviewRoutes.js

import express from 'express';
import {
  createReview,
  getReviewsForBook,
} from '../controllers/reviewController.js';

const router = express.Router();

// Public: Get all reviews for a specific book
router.get('/:bookId', getReviewsForBook);

// Submit review (auth enforced on frontend via localStorage)
router.post('/:bookId', createReview);

export default router;
