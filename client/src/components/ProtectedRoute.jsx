import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { user } = useAuth();

  // If there is no logged-in user, redirect them to the login page.
  // The 'replace' prop prevents the user from going "back" to the protected page.
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  // If there IS a logged-in user, render the child component(s).
  // The <Outlet /> is a placeholder for whatever nested route we are on.
  return <Outlet />;
};

export default ProtectedRoute;