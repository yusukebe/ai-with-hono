import { Hono } from 'hono'
import Replicate from 'replicate'

const app = new Hono()

app.get('/', async (c) => {
  const replicate = new Replicate()
  const output = await replicate.run('google/imagen-4', {
    input: {
      prompt: 'A mascot of Hono framework flying in the sky'
    }
  })
  return c.body(output as ReadableStream)
})

export default app
