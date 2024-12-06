import { Context } from "hono";
import prisma from "../../lib/db";
import getUser from "../../utils/user";

const updateArticle = async (c: Context) => {
  try {
    // Get and validate the article ID
    const id = Number(c.req.param("id"));
    if (isNaN(id)) {
      return c.json({ error: "Invalid article ID" }, 400);
    }

    // Get the user
    const user = await getUser(c);
    if (!user || !user.id) {
      return c.json({ error: "Unauthorized access" }, 401);
    }

    // Check if the article exists and belongs to the user
    const existingArticle = await prisma.article.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });
    if (!existingArticle) {
      return c.json({ error: "Article not found or unauthorized access" }, 404);
    }

    // Get and validate the fields to update
    const updatedFields = await c.req.json();
    if (!updatedFields || typeof updatedFields !== "object") {
      return c.json({ error: "Invalid request body" }, 400);
    }

    // Update the article
    const updatedArticle = await prisma.article.update({
      where: { id },
      data: updatedFields,
    });

    return c.json(updatedArticle, 200);
  } catch (err: any) {
    console.error("Error:", err);
    return c.json(
      { error: err.message || "An unexpected error occurred" },
      500
    );
  }
};

export default updateArticle;
