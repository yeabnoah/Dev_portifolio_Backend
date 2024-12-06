import { Context } from "hono";
import getUser from "../../utils/user";
import skillInterface from "../../interface/skill_interface";
import prisma from "../../lib/db";

const createSkill = async (c: Context) => {
  try {
    const body = <skillInterface>await c.req.json();
    const user = await getUser(c);

    const createdSkill = await prisma.skill.create({
      data: {
        name: body.name,
        imageUrl: body.imageUrl,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return c.json(createdSkill, 200);
  } catch (err) {
    return c.json(
      {
        error: err,
      },
      500
    );
  }
};

export default createSkill;
