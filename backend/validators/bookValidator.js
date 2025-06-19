// backend/validators/bookValidator.js

import { body } from 'express-validator';

const bookValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Book title is required'),

  body('author')
    .trim()
    .notEmpty()
    .withMessage('Author name is required'),

  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Description should not exceed 500 characters'),

  body('coverImage')
    .optional()
    .isURL()
    .withMessage('Cover image must be a valid URL'),

  // Optional: avgRating and numReviews should not be provided by client
];

export default bookValidator;
