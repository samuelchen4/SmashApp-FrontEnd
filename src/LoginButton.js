import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GET_LOGIN_REQUEST } from './constants/recept';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      className='loginPageButton loginPageButton-light'
      onClick={() => loginWithRedirect()}
    >
      Log In
    </button>
  );
};

export default LoginButton;
