import { Hono } from "hono";
import AboutDummy from "../constants/about";

const aboutRouter = new Hono()

aboutRouter.get("/", (c) => {
    return c.json(AboutDummy)
})


export default aboutRouter