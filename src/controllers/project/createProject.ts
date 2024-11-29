import projectInterface from "../../interface/project_Interface"
import prisma from "../../lib/prisma"
import { Context } from "hono"

const createNewProject = async (c: Context) => {
    try {
        const bodyInput = <projectInterface>await c.req.json()
        const newProject = await prisma.project.create({
            data: bodyInput
        })
        return c.json(newProject, 200)
    } catch (err) {
        return c.json({ error: err }, 500)
    }
}

export default createNewProject