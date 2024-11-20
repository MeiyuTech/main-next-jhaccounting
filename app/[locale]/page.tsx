/**
 * Home Page
 */

import { useTranslations } from "next-intl"
import { Card, CardContent } from "@/app/components/ui/card"
import { setRequestLocale } from "next-intl/server";
import Image from "next/image"

export default function Home() {
  const t = useTranslations('Home');
  const tFooter = useTranslations('Footer');

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[600px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/handshake.jpg"
            alt="Hero background"
            fill
            priority
            className="object-cover"
            quality={85}
          />
        </div>
        <div className="absolute inset-0 bg-black/50 z-10" /> {/* 暗色遮罩 */}
        <div className="container mx-auto px-4 h-full relative z-20"> {/* 增加 z-index 确保内容在最上层 */}
          <div className="flex flex-col justify-center h-full text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-amber-400">
              {t('hero-section.title')}
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl">
              {t('hero-section.description')}
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-xl">{tFooter('contact.phone-label')}</span>
                <a href={`tel:${tFooter('contact.phone')}`} className="text-xl hover:text-teal-400">
                  {tFooter('contact.phone')}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-xl">{tFooter('contact.email-label')}</span>
                <a href={`mailto:${tFooter('contact.email')}`} className="text-xl hover:text-teal-400">
                  {tFooter('contact.email')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="/consultation.png"
                alt="Financial consultation"
                width={800}
                height={600}
                className="rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-teal-600 mb-6">
                {t('consultation-section.title1')}
                <br />
                {t('consultation-section.title2')}
              </h2>
              <p className="mb-6 text-gray-700">
                {t('consultation-section.description1')}
              </p>
              <p className="mb-6 text-gray-700">
                {t('consultation-section.description2')}
              </p>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-teal-600">•</span>
                  {t('consultation-section.question1')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600">•</span>
                  {t('consultation-section.question2')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600">•</span>
                  {t('consultation-section.question3')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600">•</span>
                  {t('consultation-section.question4')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600">•</span>
                  {t('consultation-section.question5')}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-slate-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-6xl font-bold mb-4 text-amber-400">
            {t('process-section.title')}
          </h2>
          <p className="text-2xl mb-12 text-gray-300">
            {t('process-section.description')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              {
                step: 1,
                title: t('process-section.step1.title'),
                description: t('process-section.step1.description')
              },
              {
                step: 2,
                title: t('process-section.step2.title'),
                description: t('process-section.step2.description')
              },
              {
                step: 3,
                title: t('process-section.step3.title'),
                description: t('process-section.step3.description')
              },
              {
                step: 4,
                title: t('process-section.step4.title'),
                description: t('process-section.step4.description')
              },
              {
                step: 5,
                title: t('process-section.step5.title'),
                description: t('process-section.step5.description')
              }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white text-slate-800 flex items-center justify-center text-2xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-3xl font-bold mb-2 min-h-[4rem]">{item.title}</h3>
                <p className="text-xl text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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