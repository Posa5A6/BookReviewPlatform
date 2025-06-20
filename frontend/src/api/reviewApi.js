import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // for session-based auth
});

// ⭐ Create a review for a specific book
export const createReview = async (bookId, reviewData) => {
  const response = await API.post(`/reviews/${bookId}`, reviewData);
  return response.data;
};

// 🔍 Get all reviews for a specific book
export const getReviewsForBook = async (bookId) => {
  const response = await API.get(`/reviews/${bookId}`);
  return response.data;
};

// 🛡️ (Admin only) Get all reviews in system
export const getAllReviews = async () => {
  const response = await API.get(`/admin/reviews`);
  return response.data;
};
