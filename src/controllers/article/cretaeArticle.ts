import { Context } from "hono"
import prisma from "../../lib/prisma"

const createArticle = async (c: Context) => {
    try {
        // const { } = await c.req.json()
        const newArticleDone = await prisma.article.create({
            data: {
                title: "First Article",
                description: 'this is a trial',
                tags: ["code", "build"],
                userId: "EmR0RqlZ6Zjs38vMeuR8D"
            }
        })
        return c.json(newArticleDone, 500)
    } catch (err) {
        return c.json({ error: err }, 500)
    }
}

export default createArticle