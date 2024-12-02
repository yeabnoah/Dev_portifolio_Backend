import { Hono } from "hono";
import getAllLinks from "../../controllers/link/getAllLinks";

const publicLink = new Hono()

publicLink.get("/:userid", getAllLinks)

export default publicLink