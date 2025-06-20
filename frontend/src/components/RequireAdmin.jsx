// src/components/RequireAdmin.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RequireAdmin = () => {
  const { user, loading } = useAuth();
  if (loading) return null;                        // wait for auth check
  return user && user.role === 'admin'
    ? <Outlet />                                   // render nested route
    : <Navigate to="/admin-login" replace />;
};

export default RequireAdmin;
