import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from "next-intl/server"
import { notFound } from 'next/navigation'
import { getPost as getPostNotCached, getPosts } from '@/lib/posts'
import { cache } from 'react'
import { Link } from '@/i18n.config'

const getPost = cache(
  async (slug: string, locale: string) => await getPostNotCached(slug, locale)
)

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map(post => ({
    slug: post.slug
  }))
}

export async function generateMetadata({ params }: { params: { slug: string, locale: string } }) {
  try {
    const { frontmatter } = await getPost(params.slug, params.locale)
    return frontmatter
  } catch (e) {
    return {
      title: 'Not Found'
    }
  }
}

export default async function NewsPost({
  params: { locale, slug },
}: Readonly<{ params: { locale: string; slug: string } }>) {
  setRequestLocale(locale);
  const t = await getTranslations('News');

  let postContent
  try {
    postContent = await getPost(slug, locale)
  } catch (e) {
    notFound()
  }
  return (
    <article className="prose container mx-auto px-4 py-8 max-w-4xl">
      {/* Back button */}
      <Link
        href="/news"
        className="inline-flex items-center mb-6 text-gray-600 hover:text-gray-900 no-underline"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {t('backToNews')}
      </Link>

      {/* Article header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {postContent.frontmatter.title as string}
        </h1>
        <div className="flex items-center gap-4 text-gray-600 mb-8">
          <span>{postContent.frontmatter.author as string}</span>
          <span>•</span>
          <span>{postContent.frontmatter.date as string}</span>
          <span>•</span>
          <span>{t('views', { count: postContent.frontmatter.viewCount as number })}</span>
        </div>
      </div>

      {/* Article content */}
      <div className="prose prose-lg max-w-none">
        {postContent.content}
      </div>
    </article>
  )
} 