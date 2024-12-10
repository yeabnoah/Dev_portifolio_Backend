import { Context } from "hono";
import prisma from "../../lib/db";

const getInfo = async (c: Context) => {
  try {
    const userId = c.req.param("id");

    if (!userId) {
      return c.json({ error: "User ID is required" }, 400);
    }
    const foundInfo = await prisma.info.findUnique({
      where: {
        userId,
      },
    });

    if (!foundInfo) {
      return c.json({ error: "Info not found for the provided user ID" }, 404);
    }

    return c.json(foundInfo, 200);
  } catch (err) {
    console.error("Error fetching info:", err);
    return c.json({ error: "Internal server error" }, 500);
  }
};

export default getInfo;
