import axios from 'axios';


// Create a custom axios instance
const API = axios.create({
  baseURL: "https://bookreviewplatform-3.onrender.com/api",
  withCredentials: true, // ⬅️ Required to send session cookies
});

// 👤 LOGIN USER
export const loginUser = async (formData) => {
  const response = await API.post("/auth/login", formData);
  return response.data;
};

// 👤 REGISTER USER
export const registerUser = async (formData) => {
  const response = await API.post("/auth/register", formData);
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
