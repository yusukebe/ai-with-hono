import { Hono } from 'hono'

const app = new Hono<{
  Bindings: CloudflareBindings
}>()

app.get('/', async (c) => {
  const stream = await c.env.AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
    messages: [
      { role: 'system', content: 'You are a ramen master' },
      {
        role: 'user',
        content: 'What is the tonkotsu ramen?'
      }
    ],
    stream: true
  })
  return c.body(stream, 200, {
    'Content-Type': 'text/event-stream'
  })
})

export default app
