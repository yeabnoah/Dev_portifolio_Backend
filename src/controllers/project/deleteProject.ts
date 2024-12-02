import { Context } from "hono"
import prisma from "../../lib/prisma"
import getUser from "../../utils/user"

const deleteProject = async (c: Context) => {
    try {
        const id = Number(await c.req.param("id"))
        const user = await getUser(c)
        const projectDeleted = await prisma.project.delete({
            where: { id: id, userId : user.id }
        })
        return c.json(projectDeleted, 200)
    } catch (err) {
        return c.json({ error: err }, 500)
    }

}

export default deleteProject