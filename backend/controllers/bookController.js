// backend/controllers/bookController.js
// Public‑facing controller: list books + get single book details
// (No auth required — browse/read‑only)

import asyncHandler from 'express-async-handler';
import Book from '../models/bookModel.js';

/**
 * @desc   Get all books (search + filter + pagination)
 * @route  GET /api/books
 * @access Public
 * Query Params:
 *   - page      : page number (default 1)
 *   - pageSize  : items per page (default 10)
 *   - keyword   : search on title or author (case‑insensitive)
 */
const getBooks = asyncHandler(async (req, res) => {
  const page      = Number(req.query.page)     || 1;
  const pageSize  = Number(req.query.pageSize) || 10;
  const keyword   = req.query.keyword
    ? {
        $or: [
          { title:  { $regex: req.query.keyword, $options: 'i' } },
          { author: { $regex: req.query.keyword, $options: 'i' } },
        ],
      }
    : {};

  const count = await Book.countDocuments(keyword);
  const books = await Book.find(keyword)
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .sort({ createdAt: -1 });

  res.json({
    page,
    pageSize,
    pages: Math.ceil(count / pageSize),
    total: count,
    books,
  });
});

/**
 * @desc   Get a single book by ID
 * @route  GET /api/books/:id
 * @access Public
 */
const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    res.status(404);
    throw new Error('Book not found');
  }

  res.json(book);
});

export { getBooks, getBookById };
