import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      onClick={() =>
        logout({
          returnTo:
            'https://fzkytcnpth.execute-api.us-west-2.amazonaws.com/login',
        })
      }
    >
      <i class='bx bx-log-out'></i>
    </button>
  );
};

export default LogoutButton;
