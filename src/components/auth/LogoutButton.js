import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { frontEndTestURL } from '../../utils/domains';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      onClick={() =>
        logout({
          // returnTo: 'http://localhost:3000/login',
          // returnTo: 'https://master.d2itr8wow24jd5.amplifyapp.com/login',
          returnTo: `${frontEndTestURL}/login`,
        })
      }
    >
      <i class='bx bx-log-out'></i>
    </button>
  );
};

export default LogoutButton;