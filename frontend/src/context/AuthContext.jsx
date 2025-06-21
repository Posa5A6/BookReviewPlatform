// src/context/AuthContext.jsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';
import api from '../api/axios';      // axios.create({ baseURL, withCredentials: true })
//const { data } = await api.get('/auth/me');
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);   // ⏳ for splash / spinner

  /* --------------------------------------------------------------- */
  /*  On first mount → ask the server who I am (if anyone)           */
  /* --------------------------------------------------------------- */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get('/auth/me'); // sends cookie automatically
        setUser(data);                              // ✔️ logged‑in user
      } catch (err) {
        // 401/403 simply mean "not authenticated" – don't treat as error
        const status = err.response?.status;
        if (status !== 401 && status !== 403) {
          console.error(
            'Auth check failed:',
            err.response?.data?.message || err.message
          );
        }
        setUser(null);                              // 🚫 guest
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  /* --------------------------------------------------------------- */
  /*  Logout helper                                                  */
  /* --------------------------------------------------------------- */
  const logout = async () => {
    try {
      await api.post('/auth/logout');               // backend destroys session
    } catch (err) {
      console.error(
        'Logout failed:',
        err.response?.data?.message || err.message
      );
    } finally {
      setUser(null);
    }
  };

  /* --------------------------------------------------------------- */
  /*  Memoized helpers to avoid unnecessary re‑renders               */
  /* --------------------------------------------------------------- */
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
