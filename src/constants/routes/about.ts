import { Hono } from "hono";
import AboutDummy from "../about";

const aboutRouter = new Hono()

aboutRouter.get("/", (c) => {
    return c.json(AboutDummy)
})


export default aboutRouter