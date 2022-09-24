import React from 'react';
import LoginButton from './LoginButton';
import logo from './imgs/smashcity logo.webp';
import smashlogo from './imgs/smashLogo.jpg';

const LoginPage = () => {
  return (
    <>
      <div className='loginOverlay'>
        <div className='modal userSection'>
          <div className=' loginPage'>
            <img src={logo} alt='smashcity logo' width='150px' />
            <div className='loginWords'>
              <h1>SmashCity Scheduler Login</h1>
              <LoginButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
