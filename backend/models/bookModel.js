// backend/models/bookModel.js
import mongoose from 'mongoose';

/**
 * Book Schema
 * ----------
 * title        : Book title (required)
 * author       : Primary author name (required)
 * description  : Short description or synopsis
 * coverImage   : URL of cover image
 * avgRating    : Aggregate rating (computed client‑side / with aggregation)
 * numReviews   : Total number of reviews (kept in sync via hooks or aggregation)
 */
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Please add an author'],
      trim: true,
    },
    description: {
      type: String,
    },
    coverImage: {
      type: String,
      default:
        'https://res.cloudinary.com/demo/image/upload/v1690000000/default-book-cover.png',
    },
    avgRating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Book', bookSchema);
