// backend/controllers/adminController.js

import asyncHandler from 'express-async-handler';
import Book from '../models/bookModel.js';
import User from '../models/userModel.js';
import Review from '../models/reviewModel.js';

/**
 * @desc   Add a new book (admin only)
 * @route  POST /api/admin/books
 * @access Admin
 */
const addBook = asyncHandler(async (req, res) => {
  const { title, author, description, coverImage } = req.body;

  if (!title || !author) {
    res.status(400);
    throw new Error('Title and Author are required');
  }

  const book = await Book.create({ title, author, description, coverImage });
  res.status(201).json(book);
});

/**
 * @desc   Delete a book and its reviews (admin only)
 * @route  DELETE /api/admin/books/:id
 * @access Admin
 */
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    res.status(404);
    throw new Error('Book not found');
  }

  await Review.deleteMany({ book: book._id });
  await Book.deleteOne({ _id: book._id });

  res.json({ message: 'Book and related reviews deleted successfully' });
});

/**
 * @desc   List every registered user (admin only)
 * @route  GET /api/admin/users
 * @access Admin
 */
const getAllUsers = asyncHandler(async (_req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

/**
 * @desc   List every review in the system (admin only)
 * @route  GET /api/admin/reviews
 * @access Admin
 */
const getAllReviews = asyncHandler(async (_req, res) => {
  const reviews = await Review.find()
    .populate('user', 'name email')
    .populate('book', 'title');
  res.json(reviews);
});

export { addBook, deleteBook, getAllUsers, getAllReviews };
