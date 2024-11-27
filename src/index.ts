import { Hono } from 'hono'
import { auth } from './lib/auth';

const app = new Hono()


app.get('/api/auth/*', (c) => auth.handler(c.req.raw));
app.post('/api/auth/*', (c) => auth.handler(c.req.raw));

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
