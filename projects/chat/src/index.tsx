import { Hono } from 'hono'
import { renderer } from './renderer'
import * as z from 'zod'
import { zValidator } from '@hono/zod-validator'

const app = new Hono<{ Bindings: CloudflareBindings }>()

app.use(renderer)

const schema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['system', 'user', 'assistant']),
      content: z.string()
    })
  )
})

app.post('/stream', zValidator('json', schema), async (c) => {
  const data = c.req.valid('json')
  const stream = await c.env.AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
    messages: data.messages,
    stream: true
  })
  return c.body(stream, 200, {
    'Content-Type': 'text/event-stream'
  })
})

export default app
