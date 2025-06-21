// src/api/userApi.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://bookreviewplatform-3.onrender.com/api',
  withCredentials: true, // ✅ Required to send session cookies
});

// 👤 Get current logged-in user's profile (session-based)
export const getUserProfile = async () => {
  const response = await API.get('/users/profile');
  return response.data;
};

// ⚙️ Update user profile (session-based)
export const updateUserProfile = async (profileData) => {
  const response = await API.put('/users/profile', profileData);
  return response.data;
};

// 📋 (Admin only) Get all users
export const getAllUsers = async () => {
  const response = await API.get('/admin/users');
  return response.data;
};
