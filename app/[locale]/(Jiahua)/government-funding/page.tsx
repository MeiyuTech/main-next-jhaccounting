import { HandCoins, Landmark, ReceiptText, SearchCheck } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import EligibilityForm from "@/app/components/EligibilityForm";
import { Link } from "@/i18n.config";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Funding.metaData" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function GovernmentFundingPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations("Funding");

  const services = [
    { key: "grants", icon: Landmark },
    { key: "taxCredits", icon: ReceiptText },
    { key: "loans", icon: HandCoins },
  ] as const;

  const faqItems = ["ai", "fees", "retired"] as const;

  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(13,148,136,0.28),_transparent_42%),radial-gradient(circle_at_bottom_right,_rgba(251,191,36,0.16),_transparent_40%)]" />
        <div className="container relative mx-auto grid gap-10 px-4 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-300">
              {t("hero.eyebrow")}
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-white md:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              {t("hero.description")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#eligibility-form"
                className="rounded-lg bg-amber-400 px-5 py-3 text-center font-bold text-slate-950 transition hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {t("hero.primaryCta")}
              </a>
              <a
                href="#funding-services"
                className="rounded-lg border border-white/40 px-5 py-3 text-center font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {t("hero.secondaryCta")}
              </a>
            </div>
            <p className="mt-6 flex items-start gap-2 text-sm text-slate-300">
              <SearchCheck
                className="mt-0.5 h-5 w-5 shrink-0 text-teal-300"
                aria-hidden="true"
              />
              {t("hero.trustLine")}
            </p>
          </div>
          <EligibilityForm />
        </div>
      </section>

      <section
        id="funding-services"
        className="scroll-mt-40 bg-slate-50 py-16 md:py-24"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
              {t("services.eyebrow")}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-5xl">
              {t("services.title")}
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {services.map(({ key, icon: Icon }) => (
              <article
                key={key}
                className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-2xl font-bold text-slate-900">
                  {t(`services.${key}.title`)}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {t(`services.${key}.description`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
              {t("faq.eyebrow")}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-5xl">
              {t("faq.title")}
            </h2>
            <Link
              href="/contact-now"
              className="mt-6 inline-flex font-semibold text-teal-700 underline-offset-4 hover:underline"
            >
              info@jhaccounting.org
            </Link>
          </div>
          <div className="space-y-4">
            {faqItems.map((key) => (
              <details
                key={key}
                className="group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm"
              >
                <summary className="cursor-pointer list-none pr-8 text-lg font-bold text-slate-900 marker:hidden">
                  {t(`faq.items.${key}.question`)}
                </summary>
                <p className="mt-4 leading-7 text-slate-600">
                  {t(`faq.items.${key}.answer`)}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
