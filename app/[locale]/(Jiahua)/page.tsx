/**
 * Home Page
 */
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Card, CardContent } from "@/app/components/ui/card";
import { HandCoins, Landmark, ReceiptText } from "lucide-react";
import EligibilityForm from "@/app/components/EligibilityForm";
import { Link } from "@/i18n.config";

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
    namespace: "Home.metaData",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations("Home");
  const fundingT = await getTranslations("Funding");

  const fundingServices = [
    { key: "grants", icon: Landmark },
    { key: "taxCredits", icon: ReceiptText },
    { key: "loans", icon: HandCoins },
  ] as const;

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
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
        <div className="absolute inset-0 z-10 bg-slate-950/80" />
        <div className="container relative z-20 mx-auto grid gap-10 px-4 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8 lg:py-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-300">
              {fundingT("hero.eyebrow")}
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-white md:text-6xl">
              {fundingT("hero.title")}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              {fundingT("hero.description")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#eligibility-form"
                className="rounded-lg bg-amber-400 px-5 py-3 text-center font-bold text-slate-950 hover:bg-amber-300"
              >
                {fundingT("hero.primaryCta")}
              </a>
              <Link
                href="/government-funding"
                className="rounded-lg border border-white/40 px-5 py-3 text-center font-semibold text-white hover:bg-white/10"
              >
                {fundingT("hero.secondaryCta")}
              </Link>
            </div>
          </div>
          <EligibilityForm />
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
              {fundingT("services.eyebrow")}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-5xl">
              {fundingT("services.title")}
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {fundingServices.map(({ key, icon: Icon }) => (
              <Card key={key} className="border-slate-200 bg-white">
                <CardContent className="p-7">
                  <Icon className="h-9 w-9 text-teal-700" aria-hidden="true" />
                  <h3 className="mt-5 text-2xl font-bold text-slate-900">
                    {fundingT(`services.${key}.title`)}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600">
                    {fundingT(`services.${key}.description`)}
                  </p>
                </CardContent>
              </Card>
            ))}
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
                {t("consultation-section.title1")}
                <br />
                {t("consultation-section.title2")}
              </h2>
              <p className="mb-6 text-gray-700">
                {t("consultation-section.description1")}
              </p>
              <p className="mb-6 text-gray-700">
                {t("consultation-section.description2")}
              </p>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-teal-600">•</span>
                  {t("consultation-section.question1")}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600">•</span>
                  {t("consultation-section.question2")}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600">•</span>
                  {t("consultation-section.question3")}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600">•</span>
                  {t("consultation-section.question4")}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600">•</span>
                  {t("consultation-section.question5")}
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
            {t("process-section.title")}
          </h2>
          <p className="text-2xl mb-12 text-gray-300">
            {t("process-section.description")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              {
                step: 1,
                title: t("process-section.step1.title"),
                description: t("process-section.step1.description"),
              },
              {
                step: 2,
                title: t("process-section.step2.title"),
                description: t("process-section.step2.description"),
              },
              {
                step: 3,
                title: t("process-section.step3.title"),
                description: t("process-section.step3.description"),
              },
              {
                step: 4,
                title: t("process-section.step4.title"),
                description: t("process-section.step4.description"),
              },
              {
                step: 5,
                title: t("process-section.step5.title"),
                description: t("process-section.step5.description"),
              },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white text-slate-800 flex items-center justify-center text-2xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-3xl font-bold mb-2 min-h-[4rem]">
                  {item.title}
                </h3>
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
            {t("why-choose-us-section.title")}
          </h2>
          <p className="text-2xl mb-12 text-gray-400">
            {t("why-choose-us-section.description")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                image: "/icon-why-1.png",
                title: t("why-choose-us-section.part1.title"),
                description: t("why-choose-us-section.part1.description"),
              },
              {
                image: "/icon-why-2.png",
                title: t("why-choose-us-section.part2.title"),
                description: t("why-choose-us-section.part2.description"),
              },
              {
                image: "/icon-why-3.png",
                title: t("why-choose-us-section.part3.title"),
                description: t("why-choose-us-section.part3.description"),
              },
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
                  <h3 className="text-3xl font-bold mb-2 min-h-[4rem]">
                    {item.title}
                  </h3>
                  <p className="text-xl text-gray-600 mb-4">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
