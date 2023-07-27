import { createSlice } from "@reduxjs/toolkit";
import { State } from "../types";
import { stat } from "fs";
const initialState: State = {
  user: null,
  token: null,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
});
export const { setCredentials, logOut } = AuthSlice.actions;
