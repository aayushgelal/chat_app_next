import { Action, createSlice } from "@reduxjs/toolkit";
import { UsersState } from "../types";

const initialState: UsersState[] = [];
export const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUsers: (state: UsersState[], action) => {
      const Users: UsersState[] = action.payload;
      return Users;
    },
    removeUsers: (state: UsersState[], action) => {
      return [];
    },
  },
});
export const { addUsers, removeUsers } = UserSlice.actions;
