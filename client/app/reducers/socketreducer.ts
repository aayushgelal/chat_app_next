import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Socket, io } from "socket.io-client";

interface initialState {
  socket: Socket;
}
const initialState: initialState = {
  socket: io(),
};
export const socketreducer = createSlice({
  initialState: initialState,
  name: "Socket",
  reducers: {
    add_socket: (state, action) => {
      state.socket = action.payload.socket;
    },
    remove_socket: (state, action) => {},
  },
});
export const { add_socket, remove_socket } = socketreducer.actions;
