import { Hono } from 'hono'
import { auth } from './lib/auth';
import homeRouter from './routes/home';
import userRouter from './routes/user';
import aboutRouter from './routes/about';
import projectRoute from './routes/project';
import articleRoute from './routes/article';
import publicProject from './routes/public/project';
import publicArticle from './routes/public/article';
import linkRoute from './routes/links';
import publicLink from './routes/public/link';
import testimonyRouter from './routes/testimony';
import publicTestimony from './routes/public/testimony';


const app = new Hono()

app.get('/api/auth/*', (c) => auth.handler(c.req.raw));
app.post('/api/auth/*', (c) => auth.handler(c.req.raw));



// base test api
app.get('/', (c) => {
  return c.text('Hello Hono!')
})


app.route("/home", homeRouter)
app.route("/user", userRouter)
app.route("/about", aboutRouter)
app.route("/projects", projectRoute)
app.route("/article", articleRoute)
app.route("/links", linkRoute)
app.route("/testimony", testimonyRouter)

//public api's
app.route("/public/projects", publicProject)
app.route("/public/articles", publicArticle)
app.route("/public/links", publicLink)
app.route("/public/testimony", publicTestimony)

export default app
