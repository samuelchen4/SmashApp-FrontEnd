import { createReducer } from '@reduxjs/toolkit';
import {
  GET_PAYTRACKER_REQUEST,
  GET_PAYTRACKER_SUCCESS,
  GET_PAYTRACKER_FAIL,
  UPDATE_PAYTRACKER_CONTACTED_REQUEST,
  UPDATE_PAYTRACKER_CONTACTED_SUCCESS,
  UPDATE_PAYTRACKER_CONTACTED_FAIL,
  PAYLESSONS_PAYTRACKER_FAIL,
  PAYLESSONS_PAYTRACKER_SUCCESS,
  PAYLESSONS_PAYTRACKER_REQUEST,
} from '../constants/paytracker';

export const paytrackerReducer = createReducer(
  { paytrackerList: [] },
  (builder) => {
    builder
      .addCase(GET_PAYTRACKER_REQUEST, (state) => {
        state.paytrackerList = [];
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(GET_PAYTRACKER_SUCCESS, (state, action) => {
        state.paytrackerList = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(GET_PAYTRACKER_FAIL, (state, action) => {
        state.err = action.payload;
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(UPDATE_PAYTRACKER_CONTACTED_REQUEST, (state) => {
        state.isContactedLoading = true;
        state.isContactedSuccess = false;
      })
      .addCase(UPDATE_PAYTRACKER_CONTACTED_SUCCESS, (state, action) => {
        state.paytrackerList[action.index].contacted = action.payload;
        state.paytrackerList[action.index].contactedBy = action.contactedBy;
        state.isContactedLoading = false;
        state.isContactedSuccess = true;
      })
      .addCase(UPDATE_PAYTRACKER_CONTACTED_FAIL, (state, action) => {
        state.isContactedErr = action.payload;
        state.isContactedLoading = false;
        state.isContactedSuccess = false;
      })
      .addCase(PAYLESSONS_PAYTRACKER_REQUEST, (state) => {
        state.isPaidLoading = true;
      })
      .addCase(PAYLESSONS_PAYTRACKER_SUCCESS, (state, action) => {
        state.isPaidLoading = false;
        state.paytrackerList.splice(action.payload, 1);
      })
      .addCase(PAYLESSONS_PAYTRACKER_FAIL, (state, action) => {
        state.isPaidLoading = false;
        state.err = action.payload;
      })
      .addDefaultCase((state) => state);
  }
);
