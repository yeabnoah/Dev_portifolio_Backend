import { Hono } from "hono";
import homeDummy from "../constants/home";
import middleware from "../middleware/middleware";

const homeRouter = new Hono()
homeRouter.use(middleware)

homeRouter.patch("/", async (c) => {
    const { github, name, mainRole, moto, homeImageUrl} = await c.req.json()
})


export default homeRouter