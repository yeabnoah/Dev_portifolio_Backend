import { Hono } from 'hono'
import { auth } from './lib/auth';
import homeRouter from './constants/routes/home';
import userRouter from './constants/routes/user';
import aboutRouter from './constants/routes/about';
import projectRoute from './constants/routes/project';


const app = new Hono()

//better auth configration
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


export default app
