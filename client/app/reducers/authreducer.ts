import { Action, createSlice } from "@reduxjs/toolkit";
import { State } from "../types";
const initialState: State = {
  user: null,
  token: null,
  name: null,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state: State, action) => {
      const { user, accessToken, name } = action.payload;
      state.user = user;
      state.token = accessToken;
      state.name = name;
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
      state.name = null;
    },
  },
});
export const { setCredentials, logOut } = AuthSlice.actions;
