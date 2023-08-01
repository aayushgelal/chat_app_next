import express from "express";

import http from "http";
import { Server } from "socket.io";

export const app = express();
export const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
    credentials: true,
  },
  allowEIO3: true,
});
io.on("connection", (socket) => {
  socket.on("send-message", (message) => {
    io.emit("recieve-message",message);
 
  });
});
