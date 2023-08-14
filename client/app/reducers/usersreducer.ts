import { Action, createSlice } from "@reduxjs/toolkit";
import { userState } from "../types";

interface initialState {
  users: userState[];
  filtereduser: userState[];
}

const initialState: initialState = {
  users: [],
  filtereduser: [],
};
export const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUsers: (state: initialState, action) => {
      const Users: userState[] = action.payload;
      return { users: Users, filtereduser: Users };
    },
    removeUsers: (state: initialState, action) => {
      return { users: [], filtereduser: [] };
    },
    filteredUsers: (state: initialState, action) => {
      const Users: userState[] = action.payload;
      return { ...state, filtereduser: Users };
    },
  },
});

export const { addUsers, removeUsers, filteredUsers } = UserSlice.actions;
