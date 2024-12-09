import { Context } from "hono";
import { Links } from "@prisma/client";
import getUser from "../../utils/user";
import prisma from "../../lib/db";
import { connect } from "bun";

const updateLink = async (c: Context) => {
  try {
    const { github, linkedIn, x, website, telegram } = await c.req.json();
    const user = await getUser(c);
    const id = Number(await c.req.param("id"));

    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const infoData = await prisma.info.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!infoData) {
      return c.json({ error: "User info not found" }, 404);
    }

    const updatedLink: Links = await prisma.links.update({
      where: {
        id: id,
        infoId: infoData.id,
      },
      data: {
        github,
        linkedIn,
        x,
        website,
        telegram,
      },
    });

    return c.json(updatedLink, 200);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Internal server error" }, 500);
  }
};

export default updateLink;
