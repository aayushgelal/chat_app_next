import { PrismaClient } from "@prisma/client";
export const addMessage = (req, res, next) => {
  try {
    const prisma = new PrismaClient();
    const { message, from, to } = req.body;
    const getUser = onlineUsers.get(to);
    if (message && from && to) {
      const NewMessage = prisma.messages.create({
        data: {
          sender: { connect: { id: parseInt(from) } },
          messageText: message,
          receiver: { connect: { id: parseInt(to) } },
          messageStatus: getUser ?? "delivered",
        },
        include: {
          sender: true,
          receiver: true,
        },
      });
      return res.status(201).send({ message: NewMessage });
    }
    return res.status(404).send("From to Message not found");
  } catch (err) {
    next(err);
  }
};
