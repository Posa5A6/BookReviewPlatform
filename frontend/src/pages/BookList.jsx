// src/pages/BookList.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { fetchBooks as getBooks } from '../api/bookApi';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './BookList.css';

const PAGE_SIZE = 6;

const BookList = () => {
  const [books, setBooks]     = useState([]);
  const [page, setPage]       = useState(1);
  const [pages, setPages]     = useState(1);

  const [keyword, setKeyword]       = useState('');
  const [filterType, setFilterType] = useState('any'); // 'any' | 'title' | 'author'

  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  /* ───────── Fetch from API (only server pagination) ───────── */
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getBooks(page, PAGE_SIZE); // note: no keyword here
        setBooks(data.books);
        setPages(data.pages || 1);
      } catch {
        setError('Failed to load books.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [page]);

  /* ───────── Client‑side filter (instant) ───────── */
  const filteredBooks = useMemo(() => {
    if (!keyword.trim()) return books;

    const low = keyword.toLowerCase();
    return books.filter((b) => {
      if (filterType === 'title')   return b.title.toLowerCase().includes(low);
      if (filterType === 'author')  return b.author.toLowerCase().includes(low);
      /* 'any' */                   return (
        b.title.toLowerCase().includes(low) ||
        b.author.toLowerCase().includes(low)
      );
    });
  }, [books, keyword, filterType]);

  /* ───────── Handlers ───────── */
  const handleSearch = (e) => setKeyword(e.target.value);
  const handleFilter = (e) => setFilterType(e.target.value);

  /* ───────── Render ───────── */
  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner-ball" />
        <p className="loading-text">Loading books...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="book-list-container"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2>All Books</h2>

      {/* Search & filter controls */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search..."
          value={keyword}
          onChange={handleSearch}
          className="search-input"
        />

        <select value={filterType} onChange={handleFilter} className="filter-select">
          <option value="any">Any field</option>
          <option value="title">Title only</option>
          <option value="author">Author only</option>
        </select>
      </div>

      {error ? (
        <p className="error">{error}</p>
      ) : filteredBooks.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <>
          <div className="book-grid">
            {filteredBooks.map((book) => (
              <motion.div
                key={book._id}
                className="book-card"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <h3>{book.title}</h3>
                <p><strong>Author:</strong> {book.author}</p>
                <p>{book.description?.substring(0, 100)}...</p>
                <Link to={`/books/${book._id}`} className="view-link">
                  View Details
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button disabled={page === 1}   onClick={() => setPage(page - 1)}>⬅ Prev</button>
            <span>Page {page} of {pages}</span>
            <button disabled={page === pages} onClick={() => setPage(page + 1)}>Next ➡</button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default BookList;
