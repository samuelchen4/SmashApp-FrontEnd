import React from 'react';
import LoginButton from '../components/auth/LoginButton';
import backgroundVideo from '../imgs/Badminton Smash (man)_Trim.mp4';

const LoginScreen = () => {
  return (
    <div className='loginMain'>
      <div className='loginOverlay'>
        <video
          src={backgroundVideo}
          autoPlay
          loop
          muted
          className='backgroundVideo'
        />
        <div className='loginText'>
          <div className=' loginPage'>
            <div className='loginWords'>
              <div className='loginWordsTitle'>
                <h1>SmashCity Application</h1>
              </div>
              <p>Management and Database System</p>
              <div className='buttons'>
                <a href='https://www.gao-badminton.com/'>
                  <button className='loginPageButton margin-right'>
                    website
                  </button>
                </a>
                <LoginButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
