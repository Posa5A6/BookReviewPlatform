// src/context/AuthContext.jsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';
import api from '../api/axios'; // axios.create({ baseURL, withCredentials: true })

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // used for splash/loading state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get('/auth/me'); // ✅ checks session login
        setUser(data); // ✅ sets the user if logged in
      } catch (err) {
        const status = err.response?.status;
        if (status !== 401 && status !== 403) {
          console.error(
            'Auth check failed:',
            err.response?.data?.message || err.message
          );
        }
        setUser(null); // not authenticated
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await api.post('/auth/logout'); // ✅ clears server session
    } catch (err) {
      console.error(
        'Logout failed:',
        err.response?.data?.message || err.message
      );
    } finally {
      setUser(null); // ✅ clear user from state
    }
  };

  const value = useMemo(
    () => ({
      user,
      setUser,
      loading,
      logout,
      isAuthenticated: !!user,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
