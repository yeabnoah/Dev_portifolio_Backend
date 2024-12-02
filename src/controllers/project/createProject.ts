import { Context } from "hono";
import projectInterface from "../../interface/project_Interface";
import prisma from "../../lib/prisma";
import getUser from "../../utils/user";

const createNewProject = async (c: Context) => {
  try {
    const bodyInput = <projectInterface>await c.req.json();
    const user = await getUser(c)
   

    const newProject = await prisma.project.create({
      data: {
        name: bodyInput.name,
        imageUrl: bodyInput.imageUrl,
        description: bodyInput.description,
        githubUrl: bodyInput.githubUrl,
        liveLink: bodyInput.liveLink,
        tags: bodyInput.tags,
        userId: user.id,
      },
    });

    return c.json(newProject, 200);
  } catch (err) {
    return c.json({ error: err }, 500);
  }
};

export default createNewProject;
