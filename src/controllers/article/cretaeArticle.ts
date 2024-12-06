import { Context } from "hono";
import ArticleInterface from "../../interface/article_interface";
import getUser from "../../utils/user";
import prisma from "../../lib/db";

const createArticle = async (c: Context) => {
  try {
    const body = <{ data: ArticleInterface }>await c.req.json();
    console.log("Request Body:", body);

    // Validate input
    const { title, description, tags } = body.data;

    if (!title || !description || !tags || !Array.isArray(tags)) {
      return c.json(
        { error: `Missing or invalid fields in request body ${title}` },
        400
      );
    }

    const user = await getUser(c);
    console.log("User:", user);

    if (!user || !user.id) {
      return c.json({ error: "Invalid or missing user session" }, 401);
    }

    // Create the article
    const newArticleDone = await prisma.article.create({
      data: {
        title,
        description,
        tags,
        userId: user.id,
      },
    });

    return c.json(newArticleDone, 200);
  } catch (err: any) {
    console.error("Error:", err);
    return c.json({ error: err.message || "Something went wrong" }, 500);
  }
};

export default createArticle;
