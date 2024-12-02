import { Context } from "hono";
import prisma from "../../lib/prisma";
import getUser from "../../utils/user";

const deleteLink = async (c: Context) => {
  try {
    const linkId = Number(c.req.param("id"));

    if (isNaN(linkId)) {
      return c.json({ error: "Invalid link ID" }, 400);
    }

    const user = await getUser(c);

    const linkToDelete = await prisma.links.findUnique({
      where: { id: linkId },
      include : {
          info : {
            select : {userId : true}
          }
      }
    });

    if (!linkToDelete) {
      return c.json({ error: "Link not found" }, 404);
    }

    if (linkToDelete.info.userId !== user.id) {
      return c.json({ error: "Unauthorized to delete this link" }, 403);
    }

    const deletedLink = await prisma.links.delete({
      where: { id: linkId },
    });

    return c.json({ message: "Link deleted successfully", deletedLink }, 200);
  } catch (err) {
    return c.json(
      {
        error: err,
      },
      500
    );
  }
};

export default deleteLink;
