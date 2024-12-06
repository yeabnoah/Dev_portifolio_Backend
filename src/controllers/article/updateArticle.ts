import { Context } from "hono";
import prisma from "../../lib/db";
import getUser from "../../utils/user";

const updateArticle = async (c: Context) => {
  try {
    const id = Number(await c.req.param("id"));
    const user = await getUser(c);

    const updatedFields = await c.req.json();
    const updatedArticle = await prisma.article.update({
      where: {
        id: id,
        userId: user.id,
      },
      data: updatedFields,
    });

    return c.json(updatedArticle, 200);
  } catch (err) {
    return c.json({ error: err }, 500);
  }
};

export default updateArticle;
