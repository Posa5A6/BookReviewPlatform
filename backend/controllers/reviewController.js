// backend/controllers/reviewController.js

import asyncHandler from 'express-async-handler';
import Review from '../models/reviewModel.js';
import Book from '../models/bookModel.js';

/**
 * @desc   Create a new review for a book
 * @route  POST /api/reviews/:bookId
 * @access User (session)
 */
const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const bookId = req.params.bookId;

  // Validate inputs
  if (!rating || !comment) {
    res.status(400);
    throw new Error('Rating and comment are required');
  }

  const book = await Book.findById(bookId);
  if (!book) {
    res.status(404);
    throw new Error('Book not found');
  }

  // Check if user already reviewed this book
  const existingReview = await Review.findOne({
    user: req.user._id,
    book: bookId,
  });

  if (existingReview) {
    res.status(400);
    throw new Error('You have already reviewed this book');
  }

  const review = await Review.create({
    book: bookId,
    user: req.user._id,
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
