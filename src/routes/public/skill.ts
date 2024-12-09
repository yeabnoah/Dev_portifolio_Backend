import { Hono } from "hono";
import getSkills from "../../controllers/skill/getSkill";

const publicSkill = new Hono();

publicSkill.get("/:userid", getSkills);

export default publicSkill;
