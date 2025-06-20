// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from '../api/axios';

const AuthContext = createContext();

// src/context/AuthContext.jsx

const savedAuth = localStorage.getItem('basicAuth');
if (savedAuth) {
  axios.defaults.headers.common.Authorization = `Basic ${savedAuth}`;
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ⬅️ Add loading state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/auth/me'); // Or /users/profile if session-based
        setUser(data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false); // ⬅️ Ensure loading is set to false
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
