import { createSlice } from "@reduxjs/toolkit";

interface initialState {
  image: File | null;
  imageUrl: string;
}
const initialState: initialState = {
  image: null,
  imageUrl: "",
};
export const imagereducer = createSlice({
  initialState: initialState,
  name: "Image",
  reducers: {
    addImage: (state: initialState, action) => {
      state.imageUrl = action.payload.imageUrl;
      state.image = action.payload.image;
    },
    removeImage: (state: initialState, action) => {
      state.image = null;
      state.imageUrl = "";
    },
  },
});
export const { addImage, removeImage } = imagereducer.actions;
