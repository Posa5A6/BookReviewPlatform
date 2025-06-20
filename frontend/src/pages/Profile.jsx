import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';
import { motion } from 'framer-motion';
import './Profile.css';

const Profile = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Redirect if not logged in
  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/users/profile');
        setProfile(data);
        setForm({ name: data.name, email: data.email, password: '' });
      } catch {
        setMessage('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const { data } = await axios.put('/users/profile', form);
      setProfile(data);
      setUser(data); // update global state
      setMessage('Profile updated successfully!');
      setEditMode(false);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- Render States --------------- */
  if (loading)
    return (
      <div className="spinner-container">
        <div className="spinner-ball"></div>
        <p className="loading-text">Loading profile…</p>
      </div>
    );

  if (!profile) return <p className="error">Unable to load profile.</p>;

  /* ---------------- MAIN PAGE ------------------- */
  return (
    <motion.div
      className="profile-wrapper"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="profile-title">👤 My Profile</h2>

      {message && <p className="info-msg">{message}</p>}

      {!editMode ? (
        <>
          <div className="profile-card">
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Role:</strong> {profile.role}</p>
          </div>
          <button onClick={() => setEditMode(true)} className="edit-btn">
            Edit Profile
          </button>
        </>
      ) : (
        <form className="profile-form" onSubmit={handleUpdate}>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="New Password (optional)"
          />
          <button type="submit" className="save-btn" disabled={saving}>
            {saving ? <div className="spinner-small" /> : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={() => setEditMode(false)}
            className="cancel-btn"
          >
            Cancel
          </button>
        </form>
      )}
    </motion.div>
  );
};

export default Profile;
