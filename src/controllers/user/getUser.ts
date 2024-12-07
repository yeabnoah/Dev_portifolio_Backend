import { Context } from "hono";
import prisma from "../../lib/db";
import getUser from "../../utils/user";

const getUserData = async (c: Context) => {
  try {
    const user = await getUser(c);

    const getUserInfo = await prisma.user.findUnique({
      where: {
        id: user?.id,
      },
    });

    return c.json(getUserInfo, 200);
  } catch (err) {
    return c.json(
      {
        error: err,
      },
      500
    );
  }
};

export default getUserData;
