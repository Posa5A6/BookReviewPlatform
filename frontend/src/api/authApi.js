import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // for session handling via cookies
});

// REGISTER user
export const registerUser = async (userData) => {
  const response = await API.post('/auth/register', userData);
  return response.data;
};

// LOGIN user
export const loginUser = async (userData) => {
  const response = await API.post('/auth/login', userData);
  return response.data;
};

// LOGIN admin
export const loginAdmin = async (adminData) => {
  const response = await API.post('/auth/adminLogin', adminData);
  return response.data;
};

// LOGOUT (clears session)
export const logoutUser = async () => {
  const response = await API.post('/auth/logout');
  return response.data;
};

// GET user profile
export const getUserProfile = async (userId) => {
  const response = await API.get(`/users/${userId}`);
  return response.data;
};

// UPDATE user profile
export const updateUserProfile = async (userId, updatedData) => {
  const response = await API.put(`/users/${userId}`, updatedData);
  return response.data;
};
