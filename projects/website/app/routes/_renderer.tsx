import { jsxRenderer } from 'hono/jsx-renderer'
import { Link } from 'honox/server'

export default jsxRenderer(({ children, frontmatter }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:image" content={frontmatter?.imageUrl} />
        <meta property="og:title" content={frontmatter?.title} />
        <meta property="og:description" content={frontmatter?.description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@yusukebe" />
        <meta name="twitter:image:src" content={frontmatter?.imageUrl} />
        <meta name="twitter:description" content={frontmatter?.description} />
        <link rel="icon" href="/favicon.ico" />
        <Link href="/app/style.css" rel="stylesheet" />
        <title>{frontmatter?.title || 'AI with Hono'}</title>
      </head>
      <body>{children}</body>
    </html>
  )
})
