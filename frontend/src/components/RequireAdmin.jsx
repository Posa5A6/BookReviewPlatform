import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RequireAdmin = () => {
  const { user, loading } = useAuth();
  if (loading) return null;

  if (!user)               return <Navigate to="/login" replace />;
  if (user.role !== 'admin') return <Navigate to="/" replace />;

  return <Outlet />;
};

export default RequireAdmin;
