import type {} from 'hono'

type Meta = { title?: string; url?: string; imageUrl?: string }

declare module 'hono' {
  interface Env {
    Variables: {}
    Bindings: {}
  }
  interface ContextRenderer {
    (content: string | Promise<string>, props?: { frontmatter?: Meta }): Response | Promise<Response>
  }
}
