import { Context } from "hono";
import getUser from "../../utils/user";
import prisma from "../../lib/db";

const updateSkill = async (c: Context) => {
  try {
    const id = Number(await c.req.param("id"));
    const updatedFields = await c.req.json();
    const user = await getUser(c);

    const updatedSkill = await prisma.skill.update({
      where: {
        id: id,
        userId: user.id,
      },
      data: updatedFields,
    });

    return c.json(updatedSkill, 200);
  } catch (err) {
    return c.json(
      {
        error: err,
      },
      500
    );
  }
};

export default updateSkill;
