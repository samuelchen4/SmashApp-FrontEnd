import Axios from 'axios';
import { apiDomain } from '../utils/domains';
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
import { DateObject } from 'react-multi-date-picker';

export const getStudentInfo = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_STUDENT_INFO_REQUEST });

    // call api
    const { data } = await Axios.get(`${apiDomain}/user/${id}`);

    // send response object as payload
    dispatch({ type: GET_STUDENT_INFO_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: GET_STUDENT_INFO_FAIL, payload: err.message });
  }
};

export const updateStudentInfo =
  (id, newUserInfo, receptInitials) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_STUDENT_INFO_REQUEST });
      const {
        user_id,
        fn,
        ln,
        email,
        dob,
        phone,
        isCg,
        medicalDesc,
        credit, // credit to be displayed, passed in as string, idk why
      } = newUserInfo;

      console.log(newUserInfo);
      console.log(receptInitials);

      // calculate credit amount to be sent to db

      // get old credit amount

      const state = getState();
      const { credits } = state.studentInfo;
      const { credit: oldCredit } = credits;

      console.log(credit);
      console.log(oldCredit);
      const creditToDb = Number(credit) - Number(oldCredit);

      console.log(creditToDb);

      // userInfo and credits are on two different parts of state
      // but go together for API
      // make two seperate objects for Redux

      // get correct date format
      const dobFormatted = dob instanceof DateObject ? dob.format() : dob;

      const userOnly = {
        user_id,
        fn,
        ln,
        email,
        dob: dobFormatted,
        phone,
        isCg,
        medicalDesc,
      };

      // call api
      await Axios.put(`${apiDomain}/user/${id}`, {
        fn,
        ln,
        email,
        dob: dobFormatted,
        phone,
        cgStatus: isCg, // rename key because I named it cgStatus on api
        medicalDesc,
        creditChange: creditToDb,
        receptInitials,
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      // dispatch payload
      dispatch({
        type: UPDATE_STUDENT_INFO_SUCCESS,
        payload: userOnly,
        credit: credit,
      });
    } catch (err) {
      dispatch({ type: UPDATE_STUDENT_INFO_FAIL, payload: err.message });
    }
  };

export const savePurchaseLessons = (purchaseObj) => async (dispatch) => {
  try {
    dispatch({ type: SAVE_PURCHASE_STUDENT_REQUEST });
    // save info into state

    // have it in an action creator just incase there are operations I want to make on the state

    dispatch({ type: SAVE_PURCHASE_STUDENT_SUCCESS, payload: purchaseObj });
  } catch (err) {
    dispatch({ type: SAVE_PURCHASE_STUDENT_FAIL, payload: err.message });
  }
};

export const purchaseLessons = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: PURCHASE_STUDENT_LESSON_REQUEST });
    // getState everything from saved
    const state = getState();
    const { userInitials } = state.recept.receptInfo;
    const { purchase, unpaidLessons } = state.studentInfo;
    const {
      addedLesson,
      partnerArr,
      purchaseLessonDates,
      discountAmount,
      discountNotes,
      creditInput,
      payMethod,
      purchaseDate,
      invoiceNumber,
      priceWithDiscount,
      paidStatus,
      isUnpaidChecked,
    } = purchase;

    // decrement creditInput
    let credit = Number(creditInput);
    console.log(credit);

    // arr to push onto lessonHistory

    // post request to db,
    Promise.all(
      purchaseLessonDates.map(async (lessonDate) => {
        let postBody = {
          lessonId: addedLesson.value,
          discountAmount: Number(discountAmount) / 100,
          discountNotes,
          purchaseLessonDate: lessonDate,
          partnerArr,
          credit: priceWithDiscount,
          paidStatus: 1,
          lessonName: addedLesson.label,
          priceWithDiscountIncluded: priceWithDiscount,
          receptInitials: userInitials,
          payMethod: payMethod.value,
          purchaseDate,
          invoiceNumber,
        };

        if (credit > priceWithDiscount) {
          credit -= priceWithDiscount;
        } else {
          postBody.credit = credit;
        }
        await Axios.post(`${apiDomain}/user/${userId}/purchase`, postBody);
      })
    );

    // put request to db,
    if (isUnpaidChecked) {
      Promise.all(
        unpaidLessons.map(async (lesson) => {
          const putBody = {
            purchaseId: lesson.purchase_id,
            payMethod: payMethod.value,
            receptInitials: userInitials,
            newLessonPrice: priceWithDiscount,
            discountAmount: Number(discountAmount) / 100,
            discountNotes,
            purchaseDate,
            invoiceNumber,
          };
          await Axios.put(
            `${apiDomain}/user/${userId}/payUnpaidLessons`,
            putBody
          );
        })
      );
    }
    // send obj with values in it for front end
    dispatch({
      type: PURCHASE_STUDENT_LESSON_SUCCESS,
    });
  } catch (err) {
    dispatch({ type: PURCHASE_STUDENT_LESSON_FAIL, payload: err.message });
  }
};
