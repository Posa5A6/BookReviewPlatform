// src/pages/Books.jsx
import React, { useEffect, useState } from 'react';
import { getBooks } from '../api/bookApi';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Books.css';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data.books);
      } catch (err) {
        setError('Failed to load books.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner-ball"></div>
        <p className="loading-text">Loading books...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="books-page"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="books-heading">📚 Explore Books</h2>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="books-grid">
          {books.map((book) => (
            <motion.div
              key={book._id}
              className="book-card"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              {book.description && <p>{book.description.slice(0, 80)}...</p>}
              <Link to={`/books/${book._id}`} className="details-link">
                View Details
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Books;
