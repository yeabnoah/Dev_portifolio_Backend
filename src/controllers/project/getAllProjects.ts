import projectInterface from "../../interface/project_Interface"
import prisma from "../../lib/prisma"
import { Context } from "hono"


const getAllProjects = async (c: Context) => {
    try {
        const id: string = await c.req.param("id")
        const project = <projectInterface[]>await prisma.project.findMany({
            where: { userId: id }
        })
        return c.json(project, 200)
    } catch (err) {
        return c.json({ error: err }, 500)
    }
}

export default getAllProjects