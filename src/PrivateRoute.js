import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const PrivateRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated == false) {
      <Navigate to='/login' />;
    }
  }, [isAuthenticated]);

  //   return isAuthenticated ? children : <Navigate to='/login' />;
  return children;
};

export default PrivateRoute;
