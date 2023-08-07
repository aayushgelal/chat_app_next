import { PrismaClient } from "@prisma/client";
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
