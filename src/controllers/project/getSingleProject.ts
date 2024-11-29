import projectInterface from "../../interface/project_Interface"
import prisma from "../../lib/prisma"
import { Context } from "hono"

const getSingleProject = async (c: Context) => {
    try {
        const id = Number(await c.req.param("id"))
        const userId = await c.req.param("userId")

        const project = <projectInterface>await prisma.project.findUnique({
            where: { id: id, userId: userId }
        })
        return c.json(project, 200)
    } catch (err) {
        return c.json({ error: err }, 500)
    }
}

export default getSingleProject