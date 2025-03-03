import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('jwtToken');
  const {role} = jwtDecode(token)
    console.log(role)
  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/home" />;
  }

  return children;
};

export default ProtectedRoute;
