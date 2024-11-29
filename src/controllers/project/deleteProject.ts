import prisma from "../../lib/prisma"
import { Context } from "hono"

const deleteProject = async (c: Context) => {
    try {
        const id = Number(await c.req.param("id"))
        const projectDeleted = await prisma.project.delete({
            where: { id: id }
        })
        return c.json(projectDeleted, 200)
    } catch (err) {
        return c.json({ error: err }, 500)
    }

}

export default deleteProject