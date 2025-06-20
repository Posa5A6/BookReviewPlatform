// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Home.css';

const featuredBooks = [
  {
    id: 1,
    title: 'Atomic Habits',
    author: 'James Clear',
    image: 'https://images-na.ssl-images-amazon.com/images/I/91bYsX41DVL.jpg',
  },
  {
    id: 2,
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    image: 'https://images-na.ssl-images-amazon.com/images/I/71aFt4+OTOL.jpg',
  },
  {
    id: 3,
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    image: 'https://images-na.ssl-images-amazon.com/images/I/713jIoMO3UL.jpg',
  },
];

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner-ball"></div>
        <p className="loading-text">Loading Home...</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      <motion.div
        className="hero"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="hero-title">📚 Welcome to BookReviewHub</h1>
        <p className="hero-subtitle">Discover, review, and share your favorite books with the world.</p>
        <Link to="/books">
          <motion.button
            className="explore-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Books
          </motion.button>
        </Link>
      </motion.div>

      <motion.div
        className="featured-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <h2 className="section-heading">🔥 Featured Books</h2>
        <div className="featured-books">
          {featuredBooks.map((book) => (
            <motion.div
              key={book.id}
              className="book-card"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img src={book.image} alt={book.title} className="book-image" />
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">by {book.author}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
