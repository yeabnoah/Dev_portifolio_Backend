import prisma from "../../lib/prisma"
import { Context } from "hono"

const updateProject = async (c: Context) => {
    try {
        const id = Number(await c.req.param("id"))
        const updatedFields = await c.req.json()

        const updatedProject = await prisma.project.update({
            where: { id: id },
            data: updatedFields

        })
        return c.json(updatedProject, 200)
    } catch (err) {
        return c.json({ error: err }, 500)
    }
}

export default updateProject