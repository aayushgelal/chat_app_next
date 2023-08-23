import express from "express";
import http from "http";
import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const app = express();
export const server = http.createServer(app);

const onlineUsers = {}; // To store online users

export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    transports: ["websocket"],
    credentials: true,
  },
  allowEIO3: true,
});
io.on("connection", (socket) => {
  socket.on("join", (useremail) => {
    socket.join(useremail);
    onlineUsers[useremail] = socket.id;
    io.emit("updateOnlineUsers", Object.keys(onlineUsers));
  });
  socket.on("disconnect", () => {
    const userId = Object.keys(onlineUsers).find(
      (key) => onlineUsers[key] === socket.id
    );
    if (userId) {
      delete onlineUsers[userId];
      io.emit("updateOnlineUsers", Object.keys(onlineUsers));
    }
  });
  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });
  socket.on("answerCall", ({ from, signal }) => {
    console.log(from, signal, "callaccepted");
    io.to(from).emit("callAccepted", signal);
  });

  socket.on("add-message", async (data, from, to) => {
    try {
      const newMessage = {
        message: data,
        from: from,
        to: to,
        timestamp: Date.now(),
        status: "sent",
      };
      io.to(to).to(from).emit("receive-message", newMessage);

      await prisma.messages.create({
        data: {
          messageText: data,
          sender: {
            connect: { email: from }, // Assuming you have the sender's user email
          },
          receiver: {
            connect: { email: to }, // Assuming you have the receiver's user email
          },
          messageStatus: "delivered", // Mark the message as delivered
        },
      });
    } catch (err) {
      console.log(err);
    }
  });
});
