import React, { useState } from 'react';
import axios from '../api/axios';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [form, setForm]       = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const { data } = await axios.post('/auth/register', form);
      setMessage(data.message);
      setTimeout(() => navigate('/login'), 1500); // brief success pause
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="register-container"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="register-title">📝 Create an Account</h2>

      {message && <p className="info-message">{message}</p>}

      <form onSubmit={handleSubmit} className="register-form">
        <input
          name="name"
          placeholder="👤 Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="📧 Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="🔑 Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="register-button" disabled={loading}>
          {loading ? <div className="spinner" /> : 'Register'}
        </button>
      </form>

      <p className="login-link">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </motion.div>
  );
};

export default Register;
