import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
// TODO: Need to mover components to root folder, or lib to app folder
import H1 from '@/app/components/h1'

export function loadPost(slug) {
  const filename = slug.endsWith('.mdx') ? slug : `${slug}.mdx`

  return fs.readFileSync(
    path.join(process.cwd(), 'content', filename)
  )
}

export async function getPost(slug) {
  const source = loadPost(slug)

  return await compileMDX({
    source,
    components: {
      h1: (props) => <H1 {...props} />
    },
    options: {
      parseFrontmatter: true
    }
  })
}

export async function getPosts() {
  const files = fs.readdirSync(
    path.join(
      process.cwd(), 'content'
    )
  )

  const posts = await Promise.all(
    files.map(async filename => {
      const { frontmatter } = await getPost(filename)

      return {
        frontmatter,
        slug: filename.replace('.mdx', '')
      }
    })
  )

  return posts
}