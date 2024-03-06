import { Hono } from 'hono'
import Route from './routes/route'
import { cors } from 'hono/cors'


const app = new Hono<{
	Bindings: {
		DATABASE_URL: string
	}
}>()

app.use(cors())

app.get('/', (c) => {
  return c.json({
    msg : "this is blog app"
  })
})

app.route('/api/v1', Route);

export default app
