import { createReducer } from '@reduxjs/toolkit';
import {
  GET_AGENDA_LESSONS_REQUEST,
  GET_AGENDA_LESSONS_SUCCESS,
  GET_AGENDA_LESSONS_FAIL,
  UNATTEND_AGENDA_LESSONS_REQUEST,
  UNATTEND_AGENDA_LESSONS_SUCCESS,
  UNATTEND_AGENDA_LESSONS_FAIL,
  ATTEND_AGENDA_LESSONS_REQUEST,
  ATTEND_AGENDA_LESSONS_SUCCESS,
  ATTEND_AGENDA_LESSONS_FAIL,
  TOCREDIT_AGENDA_LESSONS_REQUEST,
  TOCREDIT_AGENDA_LESSONS_SUCCESS,
  TOCREDIT_AGENDA_LESSONS_FAIL,
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
    .addCase(ATTEND_AGENDA_LESSONS_REQUEST, (state) => {
      state.isAttendLoading = true;
    })
    .addCase(ATTEND_AGENDA_LESSONS_SUCCESS, (state, action) => {
      state.isAttendLoading = false;
      state.agendaLessons[action.payload].attended = 1;
      state.agendaLessons[action.payload].purchaseHandled = 1;
      state.agendaLessons[action.payload].receptInitial_sale =
        action.userInitials;
    })
    .addCase(ATTEND_AGENDA_LESSONS_FAIL, (state, action) => {
      state.isAttendLoading = false;
      state.isAttendErr = action.payload;
    })
    .addCase(UNATTEND_AGENDA_LESSONS_REQUEST, (state) => {
      state.isUnattendLoading = true;
    })
    .addCase(UNATTEND_AGENDA_LESSONS_SUCCESS, (state, action) => {
      state.isUnattendLoading = false;
      state.agendaLessons[action.payload].attended = 0;
      state.agendaLessons[action.payload].purchaseHandled = 0;
      state.agendaLessons[action.payload].receptInitial_sale = '';
    })
    .addCase(UNATTEND_AGENDA_LESSONS_FAIL, (state, action) => {
      state.isUnattendLoading = false;
      state.isUnattendErr = action.payload;
    })
    .addCase(TOCREDIT_AGENDA_LESSONS_REQUEST, (state) => {
      state.isToCreditLoading = true;
    })
    .addCase(TOCREDIT_AGENDA_LESSONS_SUCCESS, (state, action) => {
      state.isToCreditLoading = false;
      state.agendaLessons[action.payload].attended = 1;
      state.agendaLessons[action.payload].purchaseHandled = 1;
      state.agendaLessons[action.payload].receptInitial_sale =
        action.userInitials;
    })
    .addCase(TOCREDIT_AGENDA_LESSONS_FAIL, (state, action) => {
      state.isToCreditLoading = false;
      state.toCreditErr = action.payload;
    })
    .addDefaultCase((state) => state);
});
