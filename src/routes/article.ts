import { Hono } from "hono";
import createArticle from "../controllers/article/cretaeArticle";
import getAllArticles from "../controllers/article/getAllArticles";
import getSingleArticle from "../controllers/article/getSingleArticle";
import updateArticle from "../controllers/article/updateArticle";
import deleteArticle from "../controllers/article/deleteArticle";

const articleRoute = new Hono()

articleRoute.get("/read/:userid", getAllArticles)
articleRoute.post("/create/", createArticle)
articleRoute.get("/article/userid/id", getSingleArticle)
articleRoute.patch("/update/:id", updateArticle)
articleRoute.delete("/delete/:id", deleteArticle)

export default articleRoute