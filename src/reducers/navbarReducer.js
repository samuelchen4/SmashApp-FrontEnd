import { createReducer } from '@reduxjs/toolkit';
import {
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAIL,
  ADD_USER_LESSON_REQUEST,
  ADD_USER_LESSON_SUCCESS,
  ADD_USER_LESSON_FAIL,
  UPDATE_USER_LESSON_REQUEST,
  UPDATE_USER_LESSON_SUCCESS,
  UPDATE_USER_LESSON_FAIL,
} from '../constants/navbar';

export const navbarUserInfoReducer = createReducer(
  {
    changeLesson: { lessonChanged: { unattendedLessons: [] } },
    addedLessons: [],
  },
  (builder) => {
    builder
      .addCase(GET_USER_INFO_REQUEST, (state) => {
        state.changeLesson.isLoading = true;
      })
      .addCase(GET_USER_INFO_SUCCESS, (state, action) => {
        state.changeLesson.isLoading = false;
        state.changeLesson.lessonChanged.unattendedLessons = action.payload;
      })
      .addCase(GET_USER_INFO_FAIL, (state, action) => {
        state.changeLesson.isloading = false;
        state.changeLesson.err = action.payload;
      })
      .addCase(ADD_USER_LESSON_REQUEST, (state) => {
        state.isAddLessonLoading = true;
      })
      .addCase(ADD_USER_LESSON_SUCCESS, (state, action) => {
        state.isAddLessonLoading = false;
        state.addedLessons = action.payload;
      })
      .addCase(ADD_USER_LESSON_FAIL, (state, action) => {
        state.isAddLessonLoading = false;
        state.isAddLessonErr = action.payload;
      })
      .addCase(UPDATE_USER_LESSON_REQUEST, (state) => {
        state.changeLesson.updateLoading = true;
      })
      .addCase(UPDATE_USER_LESSON_SUCCESS, (state, action) => {
        state.changeLesson.updateLoading = false;
        state.changeLesson.lessonChanged = action.payload;
      })
      .addCase(UPDATE_USER_LESSON_FAIL, (state, action) => {
        state.changeLesson.updateLoading = false;
        state.changeLesson.updateErr = action.payload;
      });
  }
);
