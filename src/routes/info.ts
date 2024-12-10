import { Hono } from "hono";
import homeDummy from "../constants/home";
import middleware from "../middleware/middleware";
import updateInfo from "../controllers/info/updateInfo";

const infoRouter = new Hono();
infoRouter.use(middleware);

infoRouter.patch("/", updateInfo);

export default infoRouter;
