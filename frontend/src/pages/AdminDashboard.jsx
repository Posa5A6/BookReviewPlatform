import React, { useEffect, useState } from 'react';
import { FaPlus, FaTrash, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import api from '../api/axios';
import './AdminDashboard.css'; // Enhanced styling included

const AddBookModal = ({ onClose, onSave }) => {
  const [form, setForm] = useState({
    title: '',
    author: '',
    description: '',
    coverImage: '',
  });
  const [err, setErr] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      await api.post('/admin/books', form);
      onSave();
      onClose();
    } catch (error) {
      setErr(error?.response?.data?.message || error?.message || 'Failed to add book');
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Add New Book</h3>
        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
          <input name="author" placeholder="Author" value={form.author} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
          <input name="coverImage" placeholder="Cover Image URL" value={form.coverImage} onChange={handleChange} />
          {err && <p className="error">{err}</p>}
          <button type="submit">Save</button>
          <button type="button" onClick={onClose} className="secondary">Cancel</button>
        </form>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showAddModal, setShowAddModal] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    setError('');
    try {
      const [booksRes, usersRes, reviewsRes] = await Promise.all([
        api.get('/admin/books'),
        api.get('/admin/users'),
        api.get('/admin/reviews'),
      ]);
      setBooks(booksRes.data);
      setUsers(usersRes.data);
      setReviews(reviewsRes.data);
      setStats({
        books: booksRes.data.length,
        users: usersRes.data.length,
        reviews: reviewsRes.data.length,
      });
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || err?.message || 'Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this book and its reviews?')) return;
    try {
      await api.delete(`/admin/books/${id}`);
      fetchAll();
    } catch (err) {
      alert(err?.response?.data?.message || err?.message || 'Could not delete');
    }
  };

  if (loading) return <div className="loader" />;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="dashboard-container">
      <h2>📚 Admin Dashboard</h2>

      <div className="stat-grid">
        <div className="card"><h3>{stats.books}</h3><p>Books</p></div>
        <div className="card"><h3>{stats.users}</h3><p>Users</p></div>
        <div className="card"><h3>{stats.reviews}</h3><p>Reviews</p></div>
      </div>

      <div className="section-header">
        <h3>Books</h3>
        <button onClick={() => setShowAddModal(true)}>
          <FaPlus /> Add Book
        </button>
      </div>

      <table className="book-table">
        <thead>
          <tr><th>Title</th><th>Author</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b._id}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>
                <button className="icon-btn danger" onClick={() => handleDelete(b._id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="collapsible" onClick={() => setShowUsers((p) => !p)}>
        <h3>Users ({stats.users})</h3>
        {showUsers ? <FaChevronUp className="chev" /> : <FaChevronDown className="chev" />}
      </div>
      {showUsers && (
        <ul className="list">
          {users.map((u) => (
            <li key={u._id}>{u.name} – {u.email}</li>
          ))}
        </ul>
      )}

      <div className="collapsible" onClick={() => setShowReviews((p) => !p)}>
        <h3>Reviews ({stats.reviews})</h3>
        {showReviews ? <FaChevronUp className="chev" /> : <FaChevronDown className="chev" />}
      </div>
      {showReviews && (
        <ul className="list">
          {reviews.map((r) => (
            <li key={r._id}><strong>{r.book.title}</strong> – {r.user.name}: {r.comment}</li>
          ))}
        </ul>
      )}

      {showAddModal && (
        <AddBookModal
          onClose={() => setShowAddModal(false)}
          onSave={fetchAll}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
