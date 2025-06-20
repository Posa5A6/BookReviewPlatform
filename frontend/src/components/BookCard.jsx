import React from 'react';
import { Link } from 'react-router-dom';
import './BookCard.css'; // optional: for styling if needed

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <Link to={`/books/${book._id}`} className="book-link">
        <div className="book-thumbnail">
          {book.coverImage ? (
            <img src={book.coverImage} alt={book.title} />
          ) : (
            <div className="no-cover">No Image</div>
          )}
        </div>
        <div className="book-info">
          <h3>{book.title}</h3>
          <p><strong>Author:</strong> {book.author}</p>
          {book.description && (
            <p className="description">
              {book.description.substring(0, 100)}...
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default BookCard;
