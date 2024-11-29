import { Hono } from "hono";
import createNewProject from "../controllers/project/createProject";
import deleteProject from "../controllers/project/deleteProject";
import getAllProjects from "../controllers/project/getAllProjects";
import getSingleProject from "../controllers/project/getSingleProject";
import updateProject from "../controllers/project/updateProject";
import middleware from "../middleware/middleware";

const projectRoute = new Hono()
projectRoute.use(middleware)

projectRoute.get("/:id", getAllProjects)
projectRoute.get("/project/:userId/:id", getSingleProject)
projectRoute.post("/", createNewProject)
projectRoute.patch("/:id", updateProject)
projectRoute.delete("/:id", deleteProject)

export default projectRoute

