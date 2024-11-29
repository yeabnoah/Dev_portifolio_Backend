import { Context } from "hono"
import prisma from "../../lib/prisma"

const updateArticle = async (c: Context) => {
    try {
        const id = Number(await c.req.param("id"))
        const updatedFields = await c.req.json()
        const updatedArticle = await prisma.article.update({
            where: {
                id: id
            },
            data: updatedFields
        })

        return c.json(updateArticle, 200)
    } catch (err) {
        return c.json({ error: err }, 500)
    }
}

export default updateArticle