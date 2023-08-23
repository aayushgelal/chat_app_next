import { Action, createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../types";
const initialState: AuthState = {
  user: null,
  token: null,
  name: null,
  email: null,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state: AuthState, action) => {
      const { user, accessToken, name, email } = action.payload;
      state.user = user;
      state.token = accessToken;
      state.name = name;
      state.email = email;
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
      state.name = null;
      state.email = null;
    },
  },
});

export const { setCredentials, logOut } = AuthSlice.actions;
