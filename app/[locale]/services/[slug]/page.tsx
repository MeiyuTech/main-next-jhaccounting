import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from "next-intl/server"
import { notFound } from 'next/navigation'
import { getPost as getPostNotCached, getPosts } from '@/lib/posts'
import { cache } from 'react'
import { Link } from '@/i18n.config'

const contentPath = '/posts/services'

const getPost = cache(
  async (contentPath: string, locale: string, slug: string) => await getPostNotCached(contentPath, locale, slug)
)

// TODO: The locale is undefined here, need to be specified later
export async function generateStaticParams({ params }: { params: { locale: string } }) {
  const posts = await getPosts(contentPath, params.locale)
  return posts.map(post => ({
    slug: post.slug
  }))
}

export async function generateMetadata({ params }: { params: { slug: string, locale: string } }) {
  setRequestLocale(params.locale);
  try {
    const { frontmatter } = await getPost(contentPath, params.locale, params.slug)
    return frontmatter
  } catch (e) {
    return {
      title: 'Not Found'
    }
  }
}

export default async function ServicePost({
  params: { locale, slug },
}: Readonly<{ params: { locale: string; slug: string } }>) {
  setRequestLocale(locale);
  const t = await getTranslations('Services');

  let postContent
  try {
    postContent = await getPost(contentPath, locale, slug)
  } catch (e) {
    notFound()
  }
  return (
    <article className="prose container mx-auto px-4 py-8 max-w-4xl">
      {/* Back button */}
      <Link
        href="/services"
        className="inline-flex items-center mb-6 text-gray-600 hover:text-gray-900 no-underline"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {t('backToServices')}
      </Link>

      {/* Article header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {postContent.frontmatter.title as string}
        </h1>
      </div>

      {/* Article content */}
      <div className="prose prose-lg max-w-none">
        {postContent.content}
      </div>
    </article>
  )
} 