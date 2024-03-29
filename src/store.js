//getting up redux store and thunk middleware

import { configureStore } from '@reduxjs/toolkit';
import { studentListReducer } from './reducers/studentReducer';
import { lessonsReducer } from './reducers/lessonsReducer';
import { agendaReducer } from './reducers/agendaReducer';
import { receptReducer } from './reducers/receptReducer';
import { paytrackerReducer } from './reducers/paytrackerReducer';
import { studentInfoReducer } from './reducers/studentInfoReducer';
import { navbarUserInfoReducer } from './reducers/navbarReducer';

// configureStore applies redux-thunk
export const store = configureStore({
  reducer: {
    studentInfo: studentInfoReducer,
    students: studentListReducer,
    lessons: lessonsReducer,
    agenda: agendaReducer,
    paytracker: paytrackerReducer,
    recept: receptReducer,
    navbarUserInfo: navbarUserInfoReducer,
  },
});
