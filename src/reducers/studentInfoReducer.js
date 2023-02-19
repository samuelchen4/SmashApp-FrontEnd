import { createReducer } from '@reduxjs/toolkit';
import {
  GET_STUDENT_INFO_REQUEST,
  GET_STUDENT_INFO_SUCCESS,
  GET_STUDENT_INFO_FAIL,
  UPDATE_STUDENT_INFO_REQUEST,
  UPDATE_STUDENT_INFO_SUCCESS,
  UPDATE_STUDENT_INFO_FAIL,
  PURCHASE_STUDENT_LESSON_REQUEST,
  PURCHASE_STUDENT_LESSON_SUCCESS,
  PURCHASE_STUDENT_LESSON_FAIL,
  SAVE_PURCHASE_STUDENT_FAIL,
  SAVE_PURCHASE_STUDENT_REQUEST,
  SAVE_PURCHASE_STUDENT_SUCCESS,
} from '../constants/student';

export const studentInfoReducer = createReducer(
  {
    userInfo: {},
    lessonHistory: [],
    unpaidLessons: [],
    credits: {},
    paidUnattendedLessons: [],
    purchase: {},
  },
  (builder) => {
    builder
      .addCase(GET_STUDENT_INFO_REQUEST, (state) => {
        state.isLoading = true;
      })
      .addCase(GET_STUDENT_INFO_SUCCESS, (state, action) => {
        const {
          userInfo,
          lessonHistory,
          unpaidLessons,
          credits,
          avaliableLessons,
        } = action.payload;
        state.isLoading = false;
        state.userInfo = userInfo;
        state.lessonHistory = lessonHistory;
        state.unpaidLessons = unpaidLessons;
        state.credits = credits;
        state.paidUnattendedLessons = avaliableLessons;
      })
      .addCase(GET_STUDENT_INFO_FAIL, (state, action) => {
        state.isLoading = false;
        state.err = action.payload;
      })
      .addCase(UPDATE_STUDENT_INFO_REQUEST, (state) => {
        state.isUserInfoUpdateLoading = true;
      })
      .addCase(UPDATE_STUDENT_INFO_SUCCESS, (state, action) => {
        state.isUserInfoUpdateLoading = false;
        state.userInfo = action.payload;
        state.credits.credit = action.credit;
      })
      .addCase(UPDATE_STUDENT_INFO_FAIL, (state, action) => {
        state.isUserInfoUpdateLoading = false;
        state.userInfoUpdateErr = action.payload;
      })
      .addCase(SAVE_PURCHASE_STUDENT_REQUEST, (state) => {
        state.isSavePurchaseLoading = true;
      })
      .addCase(SAVE_PURCHASE_STUDENT_SUCCESS, (state, action) => {
        state.isSavePurchaseLoading = false;
        state.purchase = action.payload;
      })
      .addCase(SAVE_PURCHASE_STUDENT_FAIL, (state, action) => {
        state.isSavePurhcaseLoading = true;
        state.savePurchaseErr = action.payload;
      })
      .addCase(PURCHASE_STUDENT_LESSON_REQUEST, (state) => {
        state.isPurchaseLoading = true;
      })
      .addCase(PURCHASE_STUDENT_LESSON_SUCCESS, (state) => {
        state.isPurchaseLoading = false;
      })
      .addCase(PURCHASE_STUDENT_LESSON_FAIL, (state, action) => {
        state.isPurchaseLoading = false;
        state.purchaseErr = action.payload;
      })
      .addDefaultCase((state) => state);
  }
);
