import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

interface CurrentUser_Type {
  id: number | null;
  name: string | null;
  email: string | null;
  avatar:string | null
}
const initialState: CurrentUser_Type = {
  id: null,
  name: null,
  email: null,
  avatar:null
};
export const CurrentUser = createSlice({
  initialState: initialState,
  name: "Current User",
  reducers: {
    add_current_user: (state: CurrentUser_Type, action) => {
      const { id, name, email,avatar } = action.payload;
      state.id = id;
      state.email = email;
      state.name = name;
      state.avatar=avatar;
    },
  },
});
export const { add_current_user } = CurrentUser.actions;
