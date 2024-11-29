import { Hono } from "hono";
import homeDummy from "../constants/home";

const homeRouter = new Hono()

homeRouter.get("/", (c) => {
    return c.json(homeDummy)
})

homeRouter.post("/", async (c) => {
    const { } = await c.req.json()
})


export default homeRouter