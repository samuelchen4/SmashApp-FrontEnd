import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth0 } from '@auth0/auth0-react';

const PrivateRoute = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  //   const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //loading screen
    console.log(isLoading);
    console.log(isAuthenticated);
    console.log(`changed authenticated`);
  }, [isAuthenticated]);

  //   const changeLoading = setTimeout(setIsLoading(false), '1000');

  const navigate = useNavigate();
  //   const routeChange = () => {
  //     const path = '/login';
  //     navigate(path);
  //   };

  if (!isLoading && isAuthenticated) {
    return children;
  } else if (!isLoading && !isAuthenticated) {
    navigate('/login');
  } else {
    <h1>Is Loading</h1>;
  }

  //   if (!isAuthenticated) {
  //     return (
  //       <>
  //         <div>
  //           <h4>Redirect to login:</h4>
  //           <button onClick={routeChange}>Redirect</button>
  //         </div>
  //       </>
  //     );
  //   } else {
  //     return children;
  //   }
  //   setTimeout(() => {
  //     return isAuthenticated ? children : <Navigate to='/login' />;
  //   }, '1000');
  return children;
};

export default PrivateRoute;
