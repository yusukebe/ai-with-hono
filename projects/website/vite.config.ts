import devServer from '@hono/vite-dev-server'
import ssg from '@hono/vite-ssg'
import mdx from '@mdx-js/rollup'
import honox from 'honox/vite'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { defineConfig } from 'vite'

const entry = '/app/server.ts'

export default defineConfig(({ mode }) => {
  const isClient = mode === 'client'

  return {
    plugins: [
      honox({ client: { input: ['/app/style.css', '/app/client.ts'] } }),
      !isClient && devServer({ entry }),
      !isClient && ssg({ entry }),
      mdx({
        jsxImportSource: 'hono/jsx',
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
        rehypePlugins: [
          rehypeSlug,
          [rehypePrettyCode, { theme: 'github-dark' }]
        ]
      })
    ],
    build: {
      emptyOutDir: isClient
    }
  }
})
