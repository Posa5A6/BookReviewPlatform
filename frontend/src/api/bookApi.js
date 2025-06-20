import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // allows sending cookies for session-based auth
});

// 📚 Get all books (supports pagination and search)
export const fetchBooks = async (page = 1, pageSize = 10, keyword = '') => {
  const response = await API.get(`/books?page=${page}&pageSize=${pageSize}&keyword=${keyword}`);
  return response.data;
};

// 📖 Get a single book by ID
export const fetchBookById = async (bookId) => {
  const response = await API.get(`/books/${bookId}`);
  return response.data;
};

// ➕ Add a new book (admin only)
export const addBook = async (bookData) => {
  const response = await API.post(`/admin/books`, bookData); // Only admins allowed
  return response.data;
};

// ❌ Delete a book by ID (admin only)
export const deleteBook = async (bookId) => {
  const response = await API.delete(`/admin/books/${bookId}`); // Only admins allowed
  return response.data;
};
