import { Hono } from "hono";
import getTestimony from "../../controllers/testimony/getTestimony";

const publicTestimony = new Hono()

publicTestimony.get("/:userid", getTestimony)

export default publicTestimony