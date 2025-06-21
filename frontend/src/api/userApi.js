import axios from 'axios';

const API = axios.create({
baseURL:  'https://bookreviewplatform-3.onrender.com/api',
  withCredentials: true, // Required for session-based auth
});

// 👤 Get current logged-in user's profile
export const getUserProfile = async () => {
  const response = await API.get('/users/profile');
  return response.data;
};

// 🧑‍💼 Get a user by ID (optional — if needed for admin or profile display)
export const getUserById = async (userId) => {
  const response = await API.get(`/users/${userId}`);
  return response.data;
};

// ⚙️ Update user profile (if needed)
export const updateUserProfile = async (profileData) => {
  const response = await API.put('/users/profile', profileData);
  return response.data;
};

// 📋 (Admin only) Get all users
export const getAllUsers = async () => {
  const response = await API.get('/admin/users');
  return response.data;
};
