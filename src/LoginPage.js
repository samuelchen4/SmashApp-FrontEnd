import React from 'react';
import LoginButton from './LoginButton';
import logo from './imgs/Gao-logo-1.png';
import backgroundImg from './imgs/loginBackgroundPhoto.jpg';
import smashlogo from './imgs/smashLogo.jpg';
import backgroundVideo from './imgs/Badminton Smash (man)_Trim.mp4';

const LoginPage = () => {
  return (
    <div className='loginMain'>
      <div className='loginOverlay'>
        {/* <img
          src={backgroundImg}
          alt='background Img'
          className='backgroundImg'
        /> */}
        <video
          src={backgroundVideo}
          autoPlay
          loop
          muted
          className='backgroundVideo'
        />
        <div className='loginText'>
          <div className=' loginPage'>
            {/* <img src={logo} alt='smashcity logo' width='150px' /> */}
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
        {/* <img
          src={logo}
          alt='smashcity logo'
          height='100px'
          // className='margin-right'
        /> */}
      </div>
    </div>
  );
};

export default LoginPage;
