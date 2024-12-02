import { Hono } from "hono";
import createLink from "../controllers/link/cretaeLink";
import middleware from "../middleware/middleware";
import updateLink from "../controllers/link/updateLink";
import deleteLink from "../controllers/link/deleteLink";

const linkRoute = new Hono()
linkRoute.use(middleware)

linkRoute.post("/", createLink)
linkRoute.patch("/:id", updateLink)
linkRoute.delete("/:id", deleteLink)


export default linkRoute