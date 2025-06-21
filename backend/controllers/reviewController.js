// backend/controllers/reviewController.js

import asyncHandler from 'express-async-handler';
import Review from '../models/reviewModel.js';
import Book from '../models/bookModel.js';

/**
 * @desc   Create a new review for a book
 * @route  POST /api/reviews/:bookId
 * @access User (session)
 */
/* ------------------------------------------------------------------ */
/*  CREATE REVIEW  – POST /api/reviews/:bookId                        */
/* ------------------------------------------------------------------ */
const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const bookId = req.params.bookId;

  /* 🔑 1.  Get the logged‑in user from the session */
  const userId = req.session.userId;
  if (!userId) {
    res.status(401);
    throw new Error('Not authenticated');
  }

  /* 2. Validate inputs */
  if (!rating || !comment) {
    res.status(400);
    throw new Error('Rating and comment are required');
  }

  /* 3. Verify the book exists */
  const book = await Book.findById(bookId);
  if (!book) {
    res.status(404);
    throw new Error('Book not found');
  }

  /* 4. Prevent duplicate reviews */
  const existingReview = await Review.findOne({ user: userId, book: bookId });
  if (existingReview) {
    res.status(400);
    throw new Error('You have already reviewed this book');
  }

  /* 5. Create the review */
  const review = await Review.create({
    book: bookId,
    user: userId,
    rating,
    comment,
  });

  res.status(201).json(review);
});

/**
 * @desc   Get all reviews for a specific book
 * @route  GET /api/reviews/:bookId
 * @access Public
 */
const getReviewsForBook = asyncHandler(async (req, res) => {
  const bookId = req.params.bookId;

  const reviews = await Review.find({ book: bookId })
    .populate('user', 'name')
    .sort({ createdAt: -1 });

  res.json(reviews);
});

export { createReview, getReviewsForBook };
