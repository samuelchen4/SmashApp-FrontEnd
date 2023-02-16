import { createReducer } from '@reduxjs/toolkit';
import {
  GET_AGENDA_LESSONS_REQUEST,
  GET_AGENDA_LESSONS_SUCCESS,
  GET_AGENDA_LESSONS_FAIL,
} from '../constants/agenda';

export const agendaReducer = createReducer({ agendaLessons: [] }, (builder) => {
  builder
    .addCase(GET_AGENDA_LESSONS_REQUEST, (state) => {
      state.isLoading = true;
      state.agendaLessons = [];
    })
    .addCase(GET_AGENDA_LESSONS_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.agendaLessons = action.payload;
      state.date = action.date; // put the date into the action object
    })
    .addCase(GET_AGENDA_LESSONS_FAIL, (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    })
    .addDefaultCase((state) => state);
});
