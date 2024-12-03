import { Context } from "hono";
import prisma from "../../lib/prisma";
import ArticleInterface from "../../interface/article_interface";
import getUser from "../../utils/user";

const createArticle = async (c: Context) => {
  try {
    const body =  <ArticleInterface>await c.req.json()
    const user = await getUser(c)

    const newArticleDone = await prisma.article.create({
      data: {
        title: body.title,
        description: body.description,
        tags: body.tags,
        userId: user.id,
      },
    });
    return c.json(newArticleDone, 500);
  } catch (err) {
    return c.json({ error: err }, 500);
  }
};

const message = () => {
  console.log("this is a typing test for my self ");
};

export default createArticle;
