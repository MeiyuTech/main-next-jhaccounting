import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
// TODO: Need to mover components to root folder, or lib to app folder
import H1 from '@/app/components/h1'

const newsContentPath = 'newsContent'

export function loadPost(slug, locale = 'en-us') {
  const filename = slug.endsWith('.mdx') ? slug : `${slug}.mdx`

  return fs.readFileSync(
    path.join(process.cwd(), newsContentPath, locale, filename)
  )
}

export async function getPost(slug, locale = 'en-us') {
  const source = loadPost(slug, locale)

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

export async function getPosts(locale = 'en-us') {
  const files = fs.readdirSync(
    path.join(
      process.cwd(), newsContentPath, locale
    )
  )

  const posts = await Promise.all(
    files.map(async filename => {
      const { frontmatter } = await getPost(filename, locale)

      return {
        frontmatter,
        slug: filename.replace('.mdx', '')
      }
    })
  )

  return posts
}