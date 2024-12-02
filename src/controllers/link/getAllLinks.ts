import { Context } from "hono";
import prisma from "../../lib/prisma";

const getAllLinks = async (c: Context) => {
  try {
    const id = c.req.param("userid");

    if (!id) {
      return c.json({ error: "User ID is required" }, 400);
    }

    const userData = await prisma.user.findUnique({
      where: { id },
      include: {
        Info: {
          include: {
            Links: true,
          },
        },
      },
    });

    if (!userData) {
      return c.json({ error: "User not found" }, 404);
    }

    const { email, Info } = userData;
    const github = Info?.github || null;
    const links = Info?.Links || null;

    const userLinks = {
      github,
      email,
      links,
    };

    return c.json(userLinks, 200);
  } catch (err) {
    return c.json({ error: err }, 500);
  }
};

export default getAllLinks;
