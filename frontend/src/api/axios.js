// src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bookreviewplatform-3.onrender.com/api',
  withCredentials: true, // ✅ crucial for cookies/session
});

export default api;
