import { Context } from "hono";
import prisma from "../../lib/db";
import getUser from "../../utils/user";

const updateProject = async (c: Context) => {
  try {
    const id = Number(await c.req.param("id"));
    const updatedFields = await c.req.json();
    const user = await getUser(c);

    const updatedProject = await prisma.project.update({
      where: { id: id, userId: user?.id },
      data: updatedFields,
    });
    return c.json(updatedProject, 200);
  } catch (err) {
    return c.json({ error: err }, 500);
  }
};

export default updateProject;
