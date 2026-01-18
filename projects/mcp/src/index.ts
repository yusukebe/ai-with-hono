import { Hono } from 'hono'
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/server'
import { server } from './mcp-server'

const app = new Hono()

const transport = new WebStandardStreamableHTTPServerTransport()

app.all('/mcp', async (c) => {
  if (!server.isConnected()) {
    await server.connect(transport)
  }
  return transport.handleRequest(c.req.raw)
})

export default app
