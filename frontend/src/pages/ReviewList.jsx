import React, { useEffect, useState } from 'react';
import { getAllReviews } from '../api/reviewApi';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ReviewList.css';

const ROWS_PER_PAGE = 8;

const ReviewList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [page, setPage]       = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  // redirect if not admin
  useEffect(() => {
    if (user && user.role !== 'admin') navigate('/');
    if (!user) navigate('/login');
  }, [user, navigate]);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getAllReviews();
        setReviews(data);
      } catch {
        setError('Failed to load reviews.');
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const pages = Math.ceil(reviews.length / ROWS_PER_PAGE);
  const start = (page - 1) * ROWS_PER_PAGE;
  const visible = reviews.slice(start, start + ROWS_PER_PAGE);

  /* ------------ RENDER ------------- */
  if (loading)
    return (
      <div className="spinner-container">
        <div className="spinner-ball"></div>
        <p className="loading-text">Loading reviews…</p>
      </div>
    );

  return (
    <motion.div
      className="review-list-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2>📝 All Reviews</h2>

      {error ? (
        <p className="error">{error}</p>
      ) : reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Book</th>
                <th>User</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((r) => (
                <tr key={r._id}>
                  <td>{r.book?.title}</td>
                  <td>{r.user?.name}</td>
                  <td>{'⭐'.repeat(r.rating)}</td>
                  <td>{r.comment}</td>
                  <td>{new Date(r.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              ⬅ Prev
            </button>
            <span>
              Page {page} of {pages}
            </span>
            <button disabled={page === pages} onClick={() => setPage(page + 1)}>
              Next ➡
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default ReviewList;
