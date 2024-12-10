import { Context } from "hono";
import prisma from "../../lib/db";
import getUser from "../../utils/user";

interface InfoUpdatePayload {
  mainRole?: string;
  moto?: string;
  word?: string;
  homeImageUrl?: string;
  aboutImageUrl?: string;
  aboutDescription?: string;
}

const updateInfo = async (c: Context) => {
  try {
    const data = await c.req.json();

    const user = await getUser(c);
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    let info = await prisma.info.findUnique({
      where: { userId: user.id },
    });

    if (!info) {
      info = await prisma.info.create({
        data: data,
      });
    } else {
      info = await prisma.info.update({
        where: { userId: user.id },
        data,
      });
    }
    return c.json(info, 200);
  } catch (err) {
    console.error("Error updating info:", err);
    return c.json({ error: "Internal server error" }, 500);
  }
};

export default updateInfo;
