//getting up redux store and thunk middleware

import { configureStore } from '@reduxjs/toolkit';
import { studentListReducer } from './reducers/studentReducer';

// configureStore applies redux-thunk
export const store = configureStore({
  reducer: {
    students: studentListReducer,
    //this root reducer can have multiple reducers inside, configureStore
    //automatically combines reducers
    //eg/ agenda: agendaReducer,
  },
});
