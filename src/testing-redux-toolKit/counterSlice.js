//slice refers to a reducer and an action for a part of the application

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

//reducer takes in an action and a state and produces a new state based on the action
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

//constraints
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
