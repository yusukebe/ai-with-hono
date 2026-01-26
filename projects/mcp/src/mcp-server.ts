import { McpServer } from '@modelcontextprotocol/server'
import * as z from 'zod/v4'

export const mcpServer = new McpServer({
  name: 'simple-server',
  version: '0.0.1'
})

mcpServer.registerTool(
  'add',
  {
    title: 'Add a to b',
    inputSchema: { a: z.number(), b: z.number() }
  },
  async ({ a, b }) => {
    return {
      content: [{ type: 'text', text: `${a + b}` }]
    }
  }
)
