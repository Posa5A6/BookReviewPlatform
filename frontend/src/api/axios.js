// src/api/axios.js  (central instance)
import axios from 'axios';

export default axios.create({
  baseURL: 'https://bookreviewplatform-3.onrender.com/api',
  withCredentials: true           // ✅ sends the cookie every time
});