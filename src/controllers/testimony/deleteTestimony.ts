import { Context } from "hono";
import getUser from "../../utils/user";
import prisma from "../../lib/db";

const deleteTestimony = async (c: Context) => {
  try {
    const id = Number(await c.req.param("id"));
    const user = await getUser(c);

    const testimonyDeleted = await prisma.testimonial.delete({
      where: {
        id: id,
        userId: user?.id,
      },
    });
    return c.json(testimonyDeleted, 200);
  } catch (err) {
    return c.json(
      {
        error: err,
      },
      500
    );
  }
};

export default deleteTestimony;
