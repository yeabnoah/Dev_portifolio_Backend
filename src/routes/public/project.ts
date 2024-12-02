import { Hono } from "hono";
import getAllProjects from "../../controllers/project/getAllProjects";
import getSingleProject from "../../controllers/project/getSingleProject";

const publicProject = new Hono()

publicProject.get("/:id", getAllProjects)
publicProject.get("/:userId/:id", getSingleProject)

export default publicProject