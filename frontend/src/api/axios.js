import axios from 'axios';

export default axios.create({
  baseURL: 'https://bookreviewplatform-3.onrender.com/api',
  withCredentials: true, // MUST be true to send cookies
});
