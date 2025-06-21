// src/pages/AdminLogin.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import './AdminLogin.css';
import api from '../api/axios';

const AdminLogin = () => {
  const navigate  = useNavigate();
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors]     = useState({});
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting]   = useState(false);

  const emailRegex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,}$/;

  // 🚫 Prevent already-logged-in admins from accessing login
useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (storedUser?.role === 'admin') {
    navigate('/admin/dashboard');
  }
}, [navigate]);

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
      const { data } = await api.post('/auth/adminLogin', formData);
      if (data?.user?.role !== 'admin') {
        throw new Error('Not authorised as admin');
      }

      const basicAuth = btoa(`${formData.email}:${formData.password}`);
      axios.defaults.headers.common.Authorization = `Basic ${basicAuth}`;
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

  return (
    <div className="auth-container">
      <h2>Admin Login</h2>

      <form onSubmit={handleSubmit} noValidate>
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

        {serverError && <p className="error">{serverError}</p>}

        <button type="submit" disabled={submitting}>
          {submitting ? 'Signing in…' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
