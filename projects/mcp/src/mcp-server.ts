import { McpServer } from '@modelcontextprotocol/server'
import * as z from 'zod/v4'

export const server = new McpServer({
  name: 'simple-server',
  version: '0.0.1',
})

server.registerTool(
  'add',
  {
    title: 'Add a to b',
    inputSchema: { a: z.number(), b: z.number() },
  },
  async ({ a, b }) => {
    return {
      content: [{ type: 'text', text: `${a + b}` }],
    }
  }
)
