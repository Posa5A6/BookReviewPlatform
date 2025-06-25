// src/pages/ReviewForm.jsx
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import './ReviewForm.css';
import api from '../api/axios'; // Make sure this is the axios instance with withCredentials: true

const ReviewForm = () => {
  const { id: bookId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // If not logged in, prompt login
  if (!user) {
    return (
      <div className="review-login-prompt">
        <p>Please <Link to="/login">login</Link> to write a review.</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await api.post(`/reviews/${bookId}`, { rating, comment });
      setMessage('✅ Review submitted successfully!');
      setTimeout(() => navigate(`/books/${bookId}`), 1500);
    } catch (err) {
      console.error(err);
      setMessage(err?.response?.data?.message || '❌ Failed to submit review.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="review-form-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2>📝 Write a Review</h2>

      {message && <p className="info-message">{message}</p>}

      <form onSubmit={handleSubmit} className="review-form">
        <label>Rating:</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          required
        >
          {[5, 4, 3, 2, 1].map((star) => (
            <option key={star} value={star}>
              {'⭐'.repeat(star)} ({star})
            </option>
          ))}
        </select>

        <label>Comment:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="5"
          placeholder="Share your thoughts..."
          required
        />

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? <div className="spinner" /> : 'Submit Review'}
        </button>
      </form>
    </motion.div>
  );
};

export default ReviewForm;
