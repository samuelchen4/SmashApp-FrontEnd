import Navbar from './Navbar';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from 'react-router-dom';

//Routes
import Main from './Main';
import Users from './Users';
import User from './User';
import Lessons from './Lessons';

// import Calendar from './AgendaCalendar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/users' element={<Users />} />

        <Route path='/lessons' element={<Lessons />} />
        <Route path='/user/:id' element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;
