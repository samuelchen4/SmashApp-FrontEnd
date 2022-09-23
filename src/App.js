import React from 'react';
import Navbar from './Navbar';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

//Routes
import Main from './Main';
import LoginPage from './LoginPage';
import Users from './Users';
import User from './User';
import Lessons from './Lessons';
import PrivateRoute from './PrivateRoute';
import Private from './Private';

// import Calendar from './AgendaCalendar';
const { user, isAuthenticated } = useAuth0();

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Main />
            </PrivateRoute>
          }
        />
        <Route path='/login' element={<LoginPage />} />
        <Route
          path='/users'
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Users />
            </PrivateRoute>
          }
        />

        <Route
          path='/lessons'
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Lessons />
            </PrivateRoute>
          }
        />
        <Route
          path='/user/:id'
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <User />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
