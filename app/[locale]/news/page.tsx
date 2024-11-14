import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader } from "@/app/components/ui/card"
import Image from "next/image"
import { Link } from "@/i18n.config"
import { unstable_setRequestLocale } from "next-intl/server"

// TODO: In production, this data should come from a database or CMS
const newsPosts = [
  {
    id: 1,
    title: "AICPA to Congress: Delay needed in BOI reporting deadline",
    date: "2024-11-13",
    views: 4120,
    slug: "aicpa-to-congress-delay-needed-in-boi-reporting-deadline",
    excerpt: "The American Institute of CPAs (AICPA) has urged Congress to delay the deadline for beneficial ownership information reporting under the U.S. Beneficial Ownership Information Registry (BOI).",
    coverImage: "/news/image.png"
  },
  {
    id: 2,
    title: "U.S. Beneficial Ownership Information Registry Now Accepting Reports",
    date: "2024-01-01",
    views: 3274,
    slug: "us-beneficial-ownership-information-registry-now-accepting-reports",
    excerpt: "The U.S. Beneficial Ownership Information Registry (BOI) is now accepting reports from entities required to file under the new beneficial ownership information reporting requirements.",
    coverImage: "/news/treasury.png"
  }
]

export default function NewsPage({
  params: { locale },
}: Readonly<{ params: { locale: string } }>) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('News');

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

      {/* News posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsPosts.map((post) => (
          <Link
            key={post.id}
            href={`/news/${post.slug}`}
            className="transform transition duration-300 hover:-translate-y-1"
          >
            <Card className="h-full">
              <div className="relative h-48 w-full">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  // the card img should be 480x190
                  width={480}
                  height={190}
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardHeader className="p-4">
                <h2 className="text-xl font-semibold line-clamp-2">
                  {post.title}
                </h2>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{post.date}</span>
                  <span>{t('views', { count: post.views })}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
