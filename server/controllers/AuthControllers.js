import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const checkUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.send({ msg: "USER not Found" });
    }
    const data = await prisma.user.findUnique({
      where: { email: email },
    });
    return res.send({ email: email, name: data?.name });
  } catch (err) {
    next(err);
  }
};
export const signup = async (req, res, next) => {
  try {
    const { email, name, userId } = req.body;
    console.log(email, name);
    if (!email || !name) {
      return res.sendStatus(404);
    } else {
      await prisma.user.create({
        data: {
          userId: userId,
          name: name,
          email: email,
        },
      });
      return res.sendStatus(200);
    }
  } catch (e) {
    next(e);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    const usersGroupedByInitialLetter = {};
    users.forEach((usr) => {
      const initialLetter = usr.name.charAt(0).toUpperCase();
      if (!usersGroupedByInitialLetter[initialLetter]) {
        usersGroupedByInitialLetter[initialLetter] = [];
      }
      usersGroupedByInitialLetter[initialLetter].push(usr);
    });
    res.send(users);
  } catch (e) {
    console.log(e);
  }
};
