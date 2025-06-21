import axios from 'axios';

const API = axios.create({
  baseURL: 'https://bookreviewplatform-3.onrender.com/api',
  withCredentials: true, // ✅ session-based auth
});

// ⭐ Create a review for a specific book
export const createReview = async (bookId, reviewData) => {
  const response = await API.post(`/reviews/${bookId}`, reviewData); // ✅ Fixed here
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
