import { Hono } from "hono";
import createSkill from "../controllers/skill/createSkill";
import updateSkill from "../controllers/skill/updateSkill";
import deleteSkill from "../controllers/skill/deleteSkill";

const skillRoute = new Hono();

skillRoute.post("/", createSkill);
skillRoute.patch("/:id", updateSkill);
skillRoute.delete("/:id", deleteSkill);

export default skillRoute;
