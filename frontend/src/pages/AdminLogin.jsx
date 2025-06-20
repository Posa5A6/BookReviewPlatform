// src/pages/AdminLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import './AdminLogin.css';


const AdminLogin = () => {
  const navigate  = useNavigate();
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors]     = useState({});
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting]   = useState(false);

  // safer email regex (hyphen moved to the end)
  const emailRegex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,}$/;

  /* ---------- helpers ---------- */
  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'E‑mail is required';
    else if (!emailRegex.test(formData.email))
      newErrors.email = 'Enter a valid e‑mail';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /* ---------- submit ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setServerError('');
    setSubmitting(true);

    try {
      // ‼️  adjust the URL if your auth router differs
      const { data } = await axios.post('/auth/admin/login', formData);

      if (data?.user?.role !== 'admin') {
        throw new Error('Not authorised as admin');
      }

      /* Persist Basic‑Auth for future requests + refreshes */
      const basicAuth = btoa(`${formData.email}:${formData.password}`);

// ⬇️ Set Axios default header for all future requests
axios.defaults.headers.common.Authorization = `Basic ${basicAuth}`;

// ⬇️ Save it for restoring after refresh
localStorage.setItem('basicAuth', basicAuth);
localStorage.setItem('user', JSON.stringify(data.user));

      setUser(data.user);
      navigate('/admin/dashboard');
    } catch (err) {
      setServerError(
        err?.response?.data?.message || err?.message || 'Login failed'
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------- render ---------- */
  return (
    <div className="auth-container">
      <h2>Admin Login</h2>

      <form onSubmit={handleSubmit} noValidate>
        {/* email */}
        <div className="form-group">
          <label htmlFor="email">E‑mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="username"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        {/* password */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        {/* server error */}
        {serverError && <p className="error">{serverError}</p>}

        <button type="submit" disabled={submitting}>
          {submitting ? 'Signing in…' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
