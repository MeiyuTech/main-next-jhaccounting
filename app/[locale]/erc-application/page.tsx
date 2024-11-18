import Image from "next/image"
import { getTranslations } from 'next-intl/server';
import { Card, CardContent } from "@/app/components/ui/card"

export default async function ERCPage() {
  const t = await getTranslations('ERC-Application');

  return (
    <>
      {/* Introduction Section */}
      <div className="container mx-auto px-4 py-8">
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
              src="/erc.jpg"
              alt="ERC Banner"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-2 gap-16 mb-12">
          {/* Left Column - Experience */}
          <div>
            <h3 className="text-3xl font-bold mb-6">
              {t('introduction-section.title1')}
            </h3>
            <p className="text-gray-600 text-2xl leading-relaxed">
              {t('introduction-section.description1')}
            </p>
          </div>

          {/* Right Column - Payment Benefits */}
          <div className="pt-16">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex-shrink-0 relative w-12 h-12">
                <Image
                  src="/icon-dollar.png"
                  alt="Money icon"
                  fill
                  className="object-contain"
                />
              </div>
              <h4 className="text-3xl font-bold flex-1">
                {t('introduction-section.title2')}
              </h4>
            </div>
            <p className="text-gray-600 text-2xl leading-relaxed">
              {t('introduction-section.description2')}
            </p>
          </div>
        </div>
      </div>

      {/* Why Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-6xl font-bold mb-4 text-teal-600">
            {t('why-choose-us-section.title')}
          </h2>
          <p className="text-2xl mb-12 text-gray-400">
            {t('why-choose-us-section.description')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                image: "/icon-why-1.png",
                title: t('why-choose-us-section.part1.title'),
                description: t('why-choose-us-section.part1.description')
              },
              {
                image: "/icon-why-2.png",
                title: t('why-choose-us-section.part2.title'),
                description: t('why-choose-us-section.part2.description')
              },
              {
                image: "/icon-why-3.png",
                title: t('why-choose-us-section.part3.title'),
                description: t('why-choose-us-section.part3.description')
              }
            ].map((item, index) => (
              <Card key={index} className="bg-gray-50">
                <CardContent className="p-6">
                  <div className="relative w-16 h-16 mx-auto mb-4">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      loading="lazy"
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-3xl font-bold mb-2 min-h-[4rem]">{item.title}</h3>
                  <p className="text-xl text-gray-600 mb-4">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
