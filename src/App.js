import React from 'react';
import Navbar from './Navbar';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from 'react-router-dom';

//Routes
import Main from './Main';
import LoginPage from './LoginPage';
import UsersScreen from './screens/UsersScreen';
import User from './User';
import Lessons from './Lessons';
import PrivateRoute from './PrivateRoute';
import Private from './Private';

// import Calendar from './AgendaCalendar';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <PrivateRoute>
              <Main />
            </PrivateRoute>
          }
        />
        <Route path='/login' element={<LoginPage />} />
        <Route
          path='/users'
          element={
            <PrivateRoute>
              <UsersScreen />
            </PrivateRoute>
          }
        />

        <Route
          path='/lessons'
          element={
            <PrivateRoute>
              <Lessons />
            </PrivateRoute>
          }
        />
        <Route
          path='/user/:id'
          element={
            <PrivateRoute>
              <User />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
