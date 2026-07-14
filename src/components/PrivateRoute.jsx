import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * PrivateRoute — wraps admin routes.
 * Redirects to /admin/login if no token found in localStorage.
 */
function PrivateRoute({ children }) {
  const token = localStorage.getItem('admin_token');
  const location = useLocation();

  if (!token) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}

export default PrivateRoute;
