import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import H1 from '@/app/components/h1'
import React from 'react'

export function loadPost(contentPath: string, locale: string, slug: string) {
  const filename = slug.endsWith('.mdx') ? slug : `${slug}.mdx`

  return fs.readFileSync(
    path.join(process.cwd(), contentPath, locale, filename)
  )
}

export async function getPost(contentPath: string, locale: string, slug: string) {
  const source = loadPost(contentPath, locale, slug)

  return await compileMDX({
    source,
    components: {
      h1: (props: any) => React.createElement(H1, props)
    },
    options: {
      parseFrontmatter: true
    }
  })
}

export async function getPosts(contentPath: string, locale: string = 'en-us') {
  if (!contentPath || !locale) {
    throw new Error(`Invalid arguments: contentPath=${contentPath}, locale=${locale}`);
  }

  const postsDirectory = path.join(process.cwd(), contentPath, locale);

  // Check if directory exists
  if (!fs.existsSync(postsDirectory)) {
    console.warn(`Directory not found: ${postsDirectory}`);
    return [];
  }

  const files = fs.readdirSync(postsDirectory);

  const posts = await Promise.all(
    files.map(async filename => {
      const { frontmatter } = await getPost(contentPath, locale, filename)
      return {
        frontmatter,
        slug: filename.replace('.mdx', '')
      }
    })
  )
  return posts
}