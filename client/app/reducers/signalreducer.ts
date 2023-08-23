import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signal: null,
  from: null,
  name: null,
};

export const signalreducer = createSlice({
  initialState: initialState,
  name: "signal",
  reducers: {
    addSignal: (state, action) => {
      state.signal = action.payload.signal;
      state.name = action.payload.name;
      state.from = action.payload.from;
    },
    removeSignal: (state, action) => {
      return initialState;
    },
  },
});

export const { addSignal, removeSignal } = signalreducer.actions;
