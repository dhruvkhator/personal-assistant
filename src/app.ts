import { Hono } from 'hono'
import telegram from './telegram.js'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/telegram', telegram)

export default app
