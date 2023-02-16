import { createReducer } from '@reduxjs/toolkit';
import {
  GET_LOGIN_REQUEST,
  GET_LOGIN_SUCCESS,
  GET_LOGIN_FAIL,
} from '../constants/recept';

export const receptReducer = createReducer({ receptInfo: {} }, (builder) => {
  builder
    .addCase(GET_LOGIN_REQUEST, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.receptInfo = {};
    })
    .addCase(GET_LOGIN_SUCCESS, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.receptInfo = action.payload;
    })
    .addCase(GET_LOGIN_FAIL, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.err = action.payload;
    });
});
