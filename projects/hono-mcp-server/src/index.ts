import { Hono } from 'hono'
import { z } from 'zod'
import { mcp, registerTool } from 'hono-mcp-server'

const app = new Hono()

app.get('/', (c) => {
  return c.json({ message: 'Hello, MCP Server!' })
})
app.post(
  '/hello',
  registerTool({
    description: 'Say hello',
    inputSchema: {
      name: z.string().describe('Your name')
    }
  }),
  (c) => {
    const { name } = c.req.valid('json') // Typed!
    return c.json({ message: `Hello ${name}!` })
  }
)

export default mcp(app, {
  name: 'Simple MCP',
  version: '1.0.0'
})
