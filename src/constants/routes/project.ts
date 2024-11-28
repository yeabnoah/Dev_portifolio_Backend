import { Hono } from "hono";
import prisma from "../../lib/prisma";
import projectInterface from "../../interface/project_Interface";
import middleware from "../../middleware/middleware";

const projectRoute = new Hono()
projectRoute.use(middleware)

projectRoute.get("/:id", async (c) => {
    try {
        const id: string = await c.req.param("id")
        const project = <projectInterface[]>await prisma.project.findMany({
            where: { userId: id }
        })
        return c.json(project, 200)
    } catch (err) {
        return c.json({ error: err }, 500)
    }
})

projectRoute.get("/project/:userId/:id", async (c) => {
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
})


projectRoute.post("/", async (c) => {
    try {
        const bodyInput = <projectInterface>await c.req.json()
        const newProject = await prisma.project.create({
            data: bodyInput
        })
        return c.json(newProject, 200)
    } catch (err) {
        return c.json({ error: err }, 500)
    }
})

projectRoute.patch("/:id", async (c) => {
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
})

projectRoute.delete("/:id", async (c) => {
    try {
        const id = Number(await c.req.param("id"))
        const projectDeleted = await prisma.project.delete({
            where: { id: id }
        })
        return c.json(projectDeleted, 200)
    } catch (err) {
        return c.json({ error: err }, 500)
    }

})

export default projectRoute

