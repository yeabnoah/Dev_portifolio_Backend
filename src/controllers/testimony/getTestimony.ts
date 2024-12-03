import { Context } from "hono";
import prisma from "../../lib/prisma";

const getTestimony = async (c: Context) => {
  try {
    const userId = c.req.param("userid");

    if (!userId) {
      return c.json({ error: "User ID is required" }, 400);
    }

    const testimonials = await prisma.testimonial.findMany({
      where: {
        userId: userId,
      },
    });

    return c.json(testimonials, 200);
  } catch (err) {
    return c.json(
      {
        error: err,
      },
      500
    );
  }
};

export default getTestimony;
