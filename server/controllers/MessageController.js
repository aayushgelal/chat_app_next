import { PrismaClient } from "@prisma/client";
import { renameSync } from "fs";
import { io } from "../routes/Socket.js";

export const addFileMessage = async (req, res, next) => {
  const { message, from, to } = req.body;

  try {
    if (req.file) {
      const date = Date.now();

      const prisma = new PrismaClient();
      if (from && to) {
        const { filename } = req.file;
        await prisma.messages.create({
          data: {
            sender: { connect: { email: from } },

            receiver: { connect: { email: to } },
            messageText: req.message,
            file: "/uploads/images/" + filename,
          },
        });
        const newMessage = {
          message: message,
          from: from,
          to: to,
          timestamp: Date.now(),
          imageurl: "/uploads/images/" + filename,
        };
        io.emit("received-image", newMessage);
      }
    }
  } catch (err) {
    console.log(err);
  }
};
export const getMessage = async (req, res, next) => {
  const from = req.query.from;
  const to = req.query.to;

  try {
    const prisma = new PrismaClient();
    if (from && to) {
      const NewMessage = await prisma.messages.findMany({
        where: {
          OR: [
            { senderEmail: from, receiverEmail: to },

            { senderEmail: to, receiverEmail: from },
          ],
        },
      });
      return res.status(201).send({ messages: NewMessage });
    }
    return res.status(404).send("From to Message not found");
  } catch (err) {
    next(err);
  }
};
