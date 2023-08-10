import { PrismaClient } from "@prisma/client";
import { renameSync } from "fs";
import { io } from "../routes/Socket.js";
export const addFileMessage = async (req, res, next) => {
  const { message, from, to } = req.body;
  try {
    if (req.file) {
      const date = Date.now();
      const new_name = "uploads/images/" + date + req.file.originalname;
      renameSync(req.file.path, new_name);
      const prisma = new PrismaClient();
      if (from && to) {
        // await prisma.messages.create({
        //   data: {
        //     senderEmail: { connect: { email: from } },

        //     receiverEmail: { connect: { email: to } },
        //     messageText: req.message,
        //     file: { filename: new_name },
        //   },
        // });
        console.log(new_name);
        const newMessage = {
          message: message,
          from: from,
          to: to,
          timestamp: Date.now(),
          imageurl: new_name,
        };
        io.emit("received-image", message);
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
