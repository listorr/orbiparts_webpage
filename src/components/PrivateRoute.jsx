import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div></div>;
  }
  
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default PrivateRoute;