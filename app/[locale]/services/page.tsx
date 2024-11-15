import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/app/components/ui/card"
import { Link } from "@/i18n.config"
import { setRequestLocale } from "next-intl/server"
import { getTranslations } from 'next-intl/server';
import { getPosts } from '@/lib/posts'

const contentPath = '/posts/services'

export default async function ServicesPage({
  params: { locale },
}: Readonly<{ params: { locale: string } }>) {
  setRequestLocale(locale);
  const t = await getTranslations('Services');
  const servicesPosts = await getPosts(contentPath, locale)

  console.log(servicesPosts)
  return (
    <div className="container mx-auto px-4 py-8">
      {/* News header section */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          {t('title')}
        </h1>
        <div className="w-24 h-1 bg-yellow-400 mx-auto mt-4"></div>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          {t('description')}
        </p>
      </div>
      <hr />

      {/* TODO: Add Display order Feature */}
      <div className="mb-8">
        <br />
      </div>
      {/* Blog posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/services/${post.slug}`}
            className="transform transition duration-300 hover:-translate-y-1"
          >
            <Card className="h-full">
              <div className="relative h-48 w-full">
                <Image
                  src={post.frontmatter.coverImageSrc as string}
                  alt={post.frontmatter.title as string}
                  // the card img should be 480x190
                  width={480}
                  height={190}
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardHeader className="p-4">
                <h2 className="text-xl font-semibold line-clamp-2">
                  {post.frontmatter.title as string}
                </h2>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.frontmatter.description as string}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
