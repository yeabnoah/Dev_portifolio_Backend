import { Hono } from "hono";
import getInfo from "../../controllers/info/getInfo";

const publicInfo = new Hono();

publicInfo.get("/:id", getInfo);

export default publicInfo;
