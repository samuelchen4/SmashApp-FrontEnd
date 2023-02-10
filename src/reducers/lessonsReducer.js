import { createReducer } from '@reduxjs/toolkit';
import {
  GET_LESSONS_REQUEST,
  GET_LESSONS_SUCCESS,
  GET_LESSONS_FAIL,
  ADD_LESSON_REQUEST,
  ADD_LESSON_SUCCESS,
  ADD_LESSON_FAIL,
  UPDATE_LESSON_REQUEST,
  UPDATE_LESSON_SUCCESS,
  UPDATE_LESSON_FAIL,
} from '../constants/lessons';

export const lessonsReducer = createReducer({ lessonsList: [] }, (builder) => {
  builder
    .addCase(GET_LESSONS_REQUEST, (state) => {
      state.lessonsList = [];
      state.isLoading = true;
      state.isSuccess = false;
    })
    .addCase(GET_LESSONS_SUCCESS, (state, action) => {
      state.lessonsList = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    })
    .addCase(GET_LESSONS_FAIL, (state, action) => {
      state.err = action.payload;
      state.isLoading = true;
      state.isSuccess = false;
    })
    .addCase(ADD_LESSON_REQUEST, (state) => {
      state.isAddLoading = true;
    })
    .addCase(ADD_LESSON_SUCCESS, (state, action) => {
      state.isAddLoading = false;
      state.lessonsList.push(action.payload);
    })
    .addCase(ADD_LESSON_FAIL, (state, action) => {
      state.isAddLoading = false;
      state.addErr = action.payload;
    })
    .addCase(UPDATE_LESSON_REQUEST, (state) => {
      state.isUpdateLoading = true;
    })
    .addCase(UPDATE_LESSON_SUCCESS, (state, action) => {
      state.isUpdateLoading = false;
      state.lessonsList[action.index] = action.payload;
    })
    .addCase(UPDATE_LESSON_FAIL, (state, action) => {
      state.isUpdateLoading = false;
      state.updateErr = action.payload;
    })
    .addDefaultCase((state) => state);
});
