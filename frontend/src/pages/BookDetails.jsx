import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import './BookDetails.css';

const urlRegex = /(https?:\/\/[^\s]+)/i;

const BookDetails = () => {
  const { id }   = useParams();
  const { user } = useAuth();

  const [book, setBook]       = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  /* ---------- fetch data ---------- */
  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const [bookRes, reviewsRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/books/${id}`),
          axios.get(`http://localhost:5000/api/reviews/${id}`)
        ]);
        setBook(bookRes.data);
        setReviews(reviewsRes.data);
      } catch {
        setError('Could not load book details.');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [id]);

  /* ---------- loading / error ---------- */
  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner-ball" />
        <p className="loading-text">Loading book details…</p>
      </div>
    );
  }
  if (error)  return <p className="error">{error}</p>;
  if (!book)  return <p>No book found.</p>;

  /* ---------- link from description ---------- */
  const foundLink  = book.description?.match?.(urlRegex)?.[0] || '';
  const visitLink  = foundLink ? (
    <a href={foundLink} target="_blank" rel="noopener noreferrer" className="visit-link">
      Visit resource ↗
    </a>
  ) : (
    <span className="visit-link muted">Link will be updated soon</span>
  );

  return (
    <motion.div
      className="book-details"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Price:</strong> Free</p>

      {book.coverImage ? (
        <img src={book.coverImage} alt={book.title} className="cover-img" />
      ) : (
        <div className="cover-placeholder"><span>{book.title}</span></div>
      )}

      <p className="desc-label"><strong>Description:</strong></p>
      <p className="description">{book.description || 'No description available.'}</p>

      {/* external link */}
      {visitLink}

      {/* review button – admins blocked */}
      {user && user.role !== 'admin' ? (
        <Link to={`/books/${book._id}/review`} className="btn">
          Write a Review
        </Link>
      ) : user ? (
        <p className="muted">Admins cannot write reviews.</p>
      ) : (
        <p><Link to="/login">Login</Link> to write a review.</p>
      )}

      {/* ---------- reviews ---------- */}
      <div className="reviews-section">
        <h3>📖 Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <div className="reviews-grid">
            {reviews.map((rev) => (
              <div className="review-card" key={rev._id}>
                <div className="review-header">
                  <strong>{rev.user?.name || 'Anonymous'}</strong>
                  <span className="stars">{'⭐'.repeat(rev.rating)}</span>
                </div>
                <p className="review-comment">{rev.comment}</p>
                <p className="review-date">
                  {new Date(rev.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BookDetails;
