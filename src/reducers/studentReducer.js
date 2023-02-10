//reducer takes an action and a state and creates a new state based on the action
import { createReducer } from '@reduxjs/toolkit';
import {
  GET_STUDENTS_REQUEST,
  GET_STUDENTS_SUCCESS,
  GET_STUDENTS_FAIL,
  ADD_STUDENTS_REQUEST,
  ADD_STUDENTS_SUCCESS,
  ADD_STUDENTS_FAIL,
} from '../constants/student';

export const studentListReducer = createReducer({ list: [] }, (builder) => {
  builder
    .addCase(GET_STUDENTS_REQUEST, (state) => {
      state.list = [];
      state.isLoading = true;
      state.isSuccess = false;
    })
    .addCase(GET_STUDENTS_SUCCESS, (state, action) => {
      state.list = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    })
    .addCase(GET_STUDENTS_FAIL, (state, action) => {
      state.err = action.payload;
      state.isLoading = false;
      state.isSuccess = false;
    })
    .addCase(ADD_STUDENTS_REQUEST, (state) => {
      state.isAddLoading = true;
    })
    .addCase(ADD_STUDENTS_SUCCESS, (state, action) => {
      state.isAddLoading = false;
      state.list.push(action.payload);
    })
    .addCase(ADD_STUDENTS_FAIL, (state, action) => {
      state.isAddLoading = false;
      state.addErr = action.payload;
    })
    .addDefaultCase((state) => state);
}); //defining default values
