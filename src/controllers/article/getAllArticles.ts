import { Context } from "hono"
import prisma from "../../lib/prisma"

const getAllArticles = async (c: Context) => {
    try {
        const id = await c.req.param("userid")
        const allArticles = await prisma.article.findMany({
            where: { userId: id }
        })

        return c.json(allArticles, 200)
    } catch (err) {
        return c.json({ error: err }, 500)
    }

}

export default getAllArticles