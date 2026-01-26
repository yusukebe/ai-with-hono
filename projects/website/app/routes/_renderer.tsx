import { jsxRenderer } from 'hono/jsx-renderer'
import { Link } from 'honox/server'

export default jsxRenderer(({ children, frontmatter }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <Link href="/app/style.css" rel="stylesheet" />
        <title>{frontmatter?.title || 'AI with Hono'}</title>
      </head>
      <body>{children}</body>
    </html>
  )
})
