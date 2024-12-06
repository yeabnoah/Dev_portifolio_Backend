import { Context } from "hono";
import prisma from "../../lib/db";
import getUser from "../../utils/user";

const deleteArticle = async (c: Context) => {
  try {
    const id = Number(await c.req.param("id"));
    const user = await getUser(c);

    const deletedArticle = await prisma.article.delete({
      where: {
        id: id,
        userId: user.id,
      },
    });
    return c.json(deletedArticle, 200);
  } catch (err) {
    return c.json({ error: err }, 500);
  }
};

export default deleteArticle;
