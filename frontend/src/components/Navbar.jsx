import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  if (loading) return null;

  const handleLogout = async () => {
    try {
      await axios.post('/auth/logout');
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('basicAuth'); // if using Basic Auth
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err.response?.data?.message || err.message);
    }
  };

  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <div className="navbar-left">
        <Link to="/" className="logo">📚 BookReview</Link>
      </div>

      {/* Middle: Username */}
      <div className="navbar-middle">
        {user && (
          <span className="navbar-username">
            Hi, {user.name ?? user.username ?? user.email}
          </span>
        )}
      </div>

      {/* Right: Nav Links */}
      <div className={`navbar-right ${menuOpen ? 'open' : ''}`}>
        <Link to="/books" onClick={() => setMenuOpen(false)}>Books</Link>

        {user ? (
          user.role === 'admin' ? (
            <>
              <Link to="/admin/dashboard" onClick={() => setMenuOpen(false)}>Admin Dashboard</Link>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </>
          )
        ) : (
          <>
            <Link to="/login" onClick={() => setMenuOpen(false)}>User Login</Link>
            <Link to="/admin-login" onClick={() => setMenuOpen(false)}>Admin Login</Link>
            <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
          </>
        )}
      </div>

      {/* Hamburger Toggle (Mobile) */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span />
        <span />
        <span />
      </div>
    </nav>
  );
};

export default Navbar;
