import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  HandCoins,
  Handshake,
  Landmark,
  ReceiptText,
} from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import EligibilityForm from "@/app/components/EligibilityForm";
import FundingContactBox from "@/app/components/FundingContactBox";
import { Card, CardContent } from "@/app/components/ui/card";
import { Link } from "@/i18n.config";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Home.metaData" });
  return { title: t("title"), description: t("description") };
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
  const advantages = [
    { key: "matching", icon: Bot },
    { key: "review", icon: BadgeCheck },
    { key: "fees", icon: Handshake },
  ] as const;
  const faqItems = [
    "ai",
    "fees",
    "smallBusiness",
    "applicationProcess",
    "applicationImpact",
  ] as const;

  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <Image
          src="/handshake.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(13,148,136,0.3),_transparent_46%)]" />
        <div className="container relative mx-auto px-4 py-16 lg:px-8 lg:py-24">
          <div className="max-w-5xl">
            <p className="max-w-full break-words text-xs font-semibold uppercase tracking-[0.14em] text-teal-300 sm:text-sm sm:tracking-[0.22em]">
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
                className="rounded-lg bg-amber-400 px-5 py-3 text-center font-bold text-slate-950 transition hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {fundingT("hero.primaryCta")}
              </a>
              <Link
                href="/government-funding"
                className="rounded-lg border border-white/40 px-5 py-3 text-center font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {fundingT("hero.secondaryCta")}
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-300">
              {fundingT("hero.trustLine")}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
              {fundingT("services.eyebrow")}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-5xl">
              {fundingT("services.title")}
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              {fundingT("services.description")}
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {fundingServices.map(({ key, icon: Icon }) => (
              <Card key={key} className="border-slate-200 bg-white shadow-sm">
                <CardContent className="p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-2xl font-bold text-slate-900">
                    {fundingT(`services.${key}.title`)}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600">
                    {fundingT(`services.${key}.summary`)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/government-funding#funding-services"
              className="inline-flex items-center gap-2 font-bold text-teal-700 hover:text-teal-900"
            >
              {fundingT("services.detailsLink")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
              {fundingT("advantages.eyebrow")}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-5xl">
              {fundingT("advantages.title")}
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {advantages.map(({ key, icon: Icon }) => (
              <article
                key={key}
                className="rounded-2xl border border-slate-200 p-7"
              >
                <Icon className="h-9 w-9 text-teal-700" aria-hidden="true" />
                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {fundingT(`advantages.${key}.title`)}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {fundingT(`advantages.${key}.description`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-white md:py-24">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-300">
              {fundingT("faq.eyebrow")}
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-5xl">
              {fundingT("faq.title")}
            </h2>
            <p className="mt-5 leading-7 text-slate-300">
              {t("faqDescription")}
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-2 font-bold text-amber-300 hover:text-amber-200"
            >
              {t("contactCta")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="space-y-4">
            {faqItems.map((key) => (
              <details
                key={key}
                className="group rounded-xl border border-white/15 bg-white/5 p-5 open:bg-white/10"
              >
                <summary className="cursor-pointer list-none pr-8 text-lg font-bold marker:hidden">
                  {fundingT(`faq.items.${key}.question`)}
                </summary>
                <p className="mt-4 leading-7 text-slate-300">
                  {fundingT(`faq.items.${key}.answer`)}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-teal-950 py-16 text-white md:py-24">
        <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:px-8">
          <div className="min-w-0 lg:sticky lg:top-40">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-200">
              {fundingT("homeForm.eyebrow")}
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-5xl">
              {fundingT("homeForm.title")}
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-teal-50/80">
              {fundingT("homeForm.description")}
            </p>
            <div className="mt-8">
              <FundingContactBox />
            </div>
          </div>
          <EligibilityForm className="min-w-0" />
        </div>
      </section>
    </>
  );
}
