import { Hono } from "hono";
import createArticle from "../controllers/article/cretaeArticle";
import getAllArticles from "../controllers/article/getAllArticles";
import getSingleArticle from "../controllers/article/getSingleArticle";
import updateArticle from "../controllers/article/updateArticle";
import deleteArticle from "../controllers/article/deleteArticle";
import middleware from "../middleware/middleware";

const articleRoute = new Hono()
articleRoute.use(middleware)

articleRoute.post("/", createArticle)
articleRoute.patch("/:id", updateArticle)
articleRoute.delete("/:id", deleteArticle)

export default articleRoute