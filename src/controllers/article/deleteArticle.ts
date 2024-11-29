import { Context } from "hono";
import prisma from "../../lib/prisma";

const deleteArticle = async (c: Context) => {
    try {
        const id = Number(await c.req.param("id"))
        const deletedArticle = await prisma.article.delete({
            where: {
                id: id
            }
        })
        return c.json(deletedArticle, 200)
    } catch (err) {
        return c.json({ error: err }, 500)
    }
}
export default deleteArticle