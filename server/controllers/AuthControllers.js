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
    if(data){
    return res.send({ email: email, name: data?.name });
    }
    else{
      return res.sendStatus(404)
    }
  } catch (err) {
    next(err);
  }
};
export const signup = async (req, res, next) => {
  try {
    const { email, name, userId, avatar, googlesignin } = req.body;
    console.log(email, name);
    if (!email || !name) {
      return res.sendStatus(404);
    } else {
      if (googlesignin) {
        const data = await prisma.user.findUnique({
          where: { email: email },
        });
        if (data) {
          return res.status(200);
        }
      }
      await prisma.user.create({
        data: {
          userId: userId,
          name: name,
          email: email,
          avatar: avatar,
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
        avatar: true,
      },
    });

    res.send(users);
  } catch (e) {
    console.log(e);
  }
};
