import { Context } from "hono";
import prisma from "../../lib/db";

const getSingleArticle = async (c: Context) => {
  try {
    const id = Number(await c.req.param("id"));
    const userId = await c.req.param("userid");

    const foundArticle = await prisma.article.findUnique({
      where: { id: id, userId: userId },
    });

    return c.json(foundArticle, 200);
  } catch (err) {
    return c.json({ error: err }, 500);
  }
};

export default getSingleArticle;
