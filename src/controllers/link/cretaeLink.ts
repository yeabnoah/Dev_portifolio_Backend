import { Context } from "hono";
import LinkInterface from "../../interface/link_interface";
import prisma from "../../lib/db";
import getUser from "../../utils/user";

const createLink = async (c: Context) => {
  try {
    const body = <LinkInterface>await c.req.json();
    const user = await getUser(c);

    const info = await prisma.info.findUnique({
      where: { userId: user?.id },
    });

    const createdLink = await prisma.links.create({
      data: {
        linkedIn: body.linkedIn,
        x: body.x,
        github: body.github,
        telegram: body.telegram,
        website: body.website,
        info: {
          connect: {
            id: info?.id,
          },
        },
      },
    });

    return c.json(createdLink, 200);
  } catch (err) {
    return c.json(
      {
        error: err,
      },
      500
    );
  }
};

export default createLink;
