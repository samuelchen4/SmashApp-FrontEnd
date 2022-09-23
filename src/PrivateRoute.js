import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth0 } from '@auth0/auth0-react';

const PrivateRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuth0();

  const navigate = useNavigate();
  const routeChange = () => {
    const path = '/login';
    navigate(path);
  };

  if (!isAuthenticated) {
    return (
      <>
        <div>
          <h4>Redirect to login:</h4>
          <button onClick={routeChange}>Redirect</button>
        </div>
      </>
    );
  } else {
    return children;
  }
  //   setTimeout(() => {
  //     return isAuthenticated ? children : <Navigate to='/login' />;
  //   }, '1000');
};

export default PrivateRoute;
