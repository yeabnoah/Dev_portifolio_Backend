import { Hono } from "hono";
import createTestimony from "../controllers/testimony/createTestimony";
import updateTestimony from "../controllers/testimony/updateTestimony";
import deleteTestimony from "../controllers/testimony/deleteTestimony";

const testimonyRouter = new Hono()

testimonyRouter.post("/", createTestimony)
testimonyRouter.patch("/:id", updateTestimony)
testimonyRouter.delete("/:id", deleteTestimony)

export default testimonyRouter