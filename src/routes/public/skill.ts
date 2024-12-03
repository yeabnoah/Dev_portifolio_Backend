import { Hono } from "hono";

const publicSkill = new Hono()

publicSkill.get("/:userid")

export default publicSkill