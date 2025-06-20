import axios from 'axios';

// One Axios instance for the whole app
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // ← adjust if different
  withCredentials: true,
});

// 🔑 Interceptor: before every request, inject Basic‑Auth if present
api.interceptors.request.use((config) => {
  const basicAuth = localStorage.getItem('basicAuth');
  if (basicAuth && !config.headers.Authorization) {
    config.headers.Authorization = `Basic ${basicAuth}`;
  }
  return config;
});

export default api;
