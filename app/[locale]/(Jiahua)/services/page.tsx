import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/app/components/ui/card"
import { Link } from "@/i18n.config"
import { setRequestLocale, getTranslations } from "next-intl/server"
import { getPosts } from '@/lib/posts'

const contentPath = '/posts/services'

/*
 * We pull in the current locale
 * generated from `generateStaticParms`
 * or the current request route.
*/
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({
    locale,
    namespace: "Services",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ServicesPage({
  params: { locale },
}: Readonly<{ params: { locale: string } }>) {
  setRequestLocale(locale);
  const t = await getTranslations('Services');
  const tHeader = await getTranslations('Header');
  const servicesPosts = await getPosts(contentPath, locale)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* News header section */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex-1">
          <h2 className="text-8xl font-bold text-teal-600">{t('title')}</h2>
          <div className="w-20 h-1 bg-amber-400 mt-2"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>
        <div className="relative w-1/2 h-[420px]">
          <Image
            src="/services.png"
            alt="Services Banner"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Blog posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/services/${post.slug}`}
            className="transform transition duration-300 hover:-translate-y-1"
          >
            <Card className="h-full flex flex-col">
              <CardHeader className="p-4">
                <h2 className="text-xl font-semibold h-[4rem] line-clamp-2">
                  {post.frontmatter.title as string}
                </h2>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex-1 flex flex-col">
                <p className="text-gray-600 text-sm mb-4 h-[6rem] line-clamp-4">
                  {post.frontmatter.description as string}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}

        {/* Add the ERC Application card */}
        <Link href="/erc-application" className="transform transition duration-300 hover:-translate-y-1">
          <Card className="h-full flex flex-col">
            <CardHeader className="p-4">
              <h2 className="text-xl font-semibold h-[4rem] line-clamp-2">
                {tHeader('services.tax-credits.erc-application-card.title')}
              </h2>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-1 flex flex-col">
              <p className="text-gray-600 text-sm mb-4 h-[6rem] line-clamp-4">
                {tHeader('services.tax-credits.erc-application-card.description')}
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

