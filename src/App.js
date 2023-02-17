import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//Routes
import MainScreen from './screens/MainScreen';
import LoginPage from './LoginPage';
import UsersScreen from './screens/UsersScreen';
import UserScreen from './screens/UserScreen';
import LessonsScreen from './screens/LessonsScreen';
import PrivateRoute from './PrivateRoute';

// import Calendar from './AgendaCalendar';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <PrivateRoute>
              <MainScreen />
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
              <LessonsScreen />
            </PrivateRoute>
          }
        />
        <Route
          path='/user/:id'
          element={
            <PrivateRoute>
              <UserScreen />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
