import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './react-select-search.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain='dev-t83j6kje.us.auth0.com'
    clientId='F6qPzgi8Z4an0WbeYlNYSOPCo4wnIDVS'
    redirectUri={'https://master.d2itr8wow24jd5.amplifyapp.com/'}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
