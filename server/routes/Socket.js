import express from "express";
import http from "http";
import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const app = express();
export const server = http.createServer(app);

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
  });
 

  socket.on("add-message", async (data, from, to) => {
    try {
      const newMessage = {
        message: data,
        from: from,
        to: to,
        timestamp: Date.now(),
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
        },
      });
    } catch (err) {
      console.log(err);
    }
  });
});
