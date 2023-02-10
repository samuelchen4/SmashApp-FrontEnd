//getting up redux store and thunk middleware

import { configureStore } from '@reduxjs/toolkit';
import { studentListReducer } from './reducers/studentReducer';
import { lessonsReducer, lessonsAddReducer } from './reducers/lessonsReducer';

// configureStore applies redux-thunk
export const store = configureStore({
  reducer: {
    students: studentListReducer,
    lessons: lessonsReducer,
    // lessonsAdd: lessonsAddReducer,
    //this root reducer can have multiple reducers inside, configureStore
    //automatically combines reducers
    //eg/ agenda: agendaReducer,
  },
});
