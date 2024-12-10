import { Context } from "hono";
import prisma from "../../lib/db";
import getUser from "../../utils/user";

const updateLink = async (c: Context) => {
  try {
    const { github, linkedIn, x, telegram } = await c.req.json();
    const user = await getUser(c);

    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    let infoData = await prisma.info.findUnique({
      where: { userId: user.id },
    });

    if (!infoData) {
      infoData = await prisma.info.create({
        data: {
          userId: user.id,
          github: "https://github.com/yeabnoah",
          word: "Developer",
        },
      });
    }

    let linksData = await prisma.links.findUnique({
      where: { infoId: infoData.id },
    });

    if (!linksData) {
      return c.json(
        {
          message: "error happened",
        },
        500
      );
    }

    const linksDataFinal = await prisma.links.update({
      where: { infoId: infoData.id },
      data: {
        github: github,
        linkedIn: linkedIn,
        x: x,
        telegram: telegram,
      },
    });

    return c.json({ links: linksDataFinal }, 200);
  } catch (err) {
    console.error("Error updating links:", err);
    return c.json({ error: "Internal server error" }, 500);
  }
};

export default updateLink;
