import { Hono } from "hono";
import getAllArticles from "../../controllers/article/getAllArticles";
import getSingleArticle from "../../controllers/article/getSingleArticle";

const publicArticle = new Hono()


publicArticle.get("/:userid", getAllArticles)
publicArticle.get("/:userid/:id", getSingleArticle)

export default publicArticle