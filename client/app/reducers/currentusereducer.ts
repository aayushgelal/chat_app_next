import { createSlice } from "@reduxjs/toolkit";

interface CurrentUser_Type {
  id: number | null;
  name: String | null;
  email: String | null;
}
const initialState: CurrentUser_Type = {
  id: null,
  name: null,
  email: null,
};
export const CurrentUser = createSlice({
  initialState: initialState,
  name: "Current User",
  reducers: {
    add_current_user: (state: CurrentUser_Type, action) => {
      console.log(action.payload);
      const { id, name, email } = action.payload;
      state.id = id;
      state.email = email;
      state.name = name;
    },
  },
});
export const { add_current_user } = CurrentUser.actions;
