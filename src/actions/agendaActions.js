import Axios from 'axios';
import { apiDomain } from '../utils/domains';
import {
  GET_AGENDA_LESSONS_REQUEST,
  GET_AGENDA_LESSONS_SUCCESS,
  GET_AGENDA_LESSONS_FAIL,
  ATTEND_AGENDA_LESSONS_REQUEST,
  ATTEND_AGENDA_LESSONS_SUCCESS,
  ATTEND_AGENDA_LESSONS_FAIL,
  UNATTEND_AGENDA_LESSONS_REQUEST,
  UNATTEND_AGENDA_LESSONS_SUCCESS,
  UNATTEND_AGENDA_LESSONS_FAIL,
  TOCREDIT_AGENDA_LESSONS_REQUEST,
  TOCREDIT_AGENDA_LESSONS_SUCCESS,
  TOCREDIT_AGENDA_LESSONS_FAIL,
} from '../constants/agenda';

// method: GET
// desc: get lessons on the given date
export const getAgendaLessons = (date) => async (dispatch) => {
  try {
    dispatch({ type: GET_AGENDA_LESSONS_REQUEST });
    console.log(apiDomain);

    const { data } = await Axios.get(`${apiDomain}/agenda/${date}`);

    let partnerArr = [];
    // go through data
    // if lessonName includes Semi create partner Array for semiprivate component
    const newData = await Promise.all(
      data.map(async (student) => {
        const {
          lessonName,
          partner1_id: partner1Id,
          partner2_id: partner2Id,
          partner3_id: partner3Id,
        } = student;

        if (lessonName.toLowerCase().includes('semi')) {
          const { data: partnerData } = await Axios.get(
            `${apiDomain}/agenda/private/partnerInfo/${partner1Id}/${partner2Id}/${partner3Id}`
          );
          partnerArr = partnerData;
        }

        //return a new object
        return { ...student, partnerArr };
      })
    );

    dispatch({ type: GET_AGENDA_LESSONS_SUCCESS, payload: newData, date });
  } catch (err) {
    dispatch({ type: GET_AGENDA_LESSONS_FAIL, payload: err.message });
  }
};

// method: PUT
// desc: marks that purchase as attended
export const attendLesson =
  (id, lessonPrice, userInitials) => async (dispatch, getState) => {
    try {
      dispatch({ type: ATTEND_AGENDA_LESSONS_REQUEST });
      // get index
      const state = getState();
      const { agendaLessons } = state.agenda;
      const index = agendaLessons.findIndex(
        (purchase) => purchase.purchase_id === id
      );

      await Axios.put(`${apiDomain}/agenda/private/${id}/attended`, {
        attended: 1,
        lessonPrice,
        receptInitials: userInitials,
      });

      dispatch({
        type: ATTEND_AGENDA_LESSONS_SUCCESS,
        payload: index,
        userInitials,
      });
    } catch (err) {
      dispatch({ type: ATTEND_AGENDA_LESSONS_FAIL, payload: err.message });
    }
  };

// method: PUT
// desc: marks that purchase as unattended
export const unattendLesson = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: UNATTEND_AGENDA_LESSONS_REQUEST });
    // get index
    const state = getState();
    const { agendaLessons } = state.agenda;
    const index = agendaLessons.findIndex(
      (purchase) => purchase.purchase_id === id
    );

    await Axios.put(`${apiDomain}/agenda/private/${id}/undoSale`);

    dispatch({ type: UNATTEND_AGENDA_LESSONS_SUCCESS, payload: index });
  } catch (err) {
    dispatch({ type: UNATTEND_AGENDA_LESSONS_FAIL, payload: err.message });
  }
};

export const lessonToCredit =
  (id, creditValue, userInitials) => async (dispatch, getState) => {
    try {
      dispatch({ type: TOCREDIT_AGENDA_LESSONS_REQUEST });
      const state = getState();
      const { agendaLessons } = state.agenda;
      const index = agendaLessons.findIndex(
        (purchase) => purchase.purchase_id === id
      );

      await Axios.put(`${apiDomain}/agenda/private/${id}/toCredit`, {
        lessonPrice: creditValue,
        receptInitials: userInitials,
      });

      dispatch({ type: TOCREDIT_AGENDA_LESSONS_SUCCESS, payload: index });
    } catch (err) {
      dispatch({ type: TOCREDIT_AGENDA_LESSONS_FAIL, payload: err.message });
    }
  };
