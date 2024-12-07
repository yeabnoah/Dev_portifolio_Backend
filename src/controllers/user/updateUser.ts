import { Context } from "hono";
import prisma from "../../lib/db";
import getUser from "../../utils/user";

const updateUser = async (c: Context) => {
  try {
    const userDataUpdated = await c.req.json();
    const user = await getUser(c);

    const updatedUser = await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: userDataUpdated,
    });

    return c.json(updatedUser, 200);
  } catch (err) {
    return c.json({ error: err }, 500);
  }
};

export default updateUser;
