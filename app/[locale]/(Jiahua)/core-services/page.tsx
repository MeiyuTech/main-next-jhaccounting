import {
  Building2,
  Calculator,
  ChartNoAxesCombined,
  ClipboardList,
} from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n.config";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "CoreServices" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function CoreServicesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations("CoreServices");
  const services = [
    { key: "bookkeeping", icon: ClipboardList },
    { key: "formation", icon: Building2 },
    { key: "tax", icon: Calculator },
    { key: "planning", icon: ChartNoAxesCombined },
  ] as const;

  return (
    <>
      <section className="bg-slate-950 py-16 text-white md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-300">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold md:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            {t("description")}
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container mx-auto grid gap-6 px-4 md:grid-cols-2 lg:px-8">
          {services.map(({ key, icon: Icon }) => (
            <article
              key={key}
              className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
            >
              <Icon className="h-9 w-9 text-teal-700" aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-bold text-slate-900">
                {t(`items.${key}.title`)}
              </h2>
              <p className="mt-3 leading-7 text-slate-600">
                {t(`items.${key}.description`)}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-14 text-center">
        <h2 className="text-3xl font-bold text-slate-900">{t("ctaTitle")}</h2>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/about"
            className="rounded-lg bg-teal-700 px-5 py-3 font-bold text-white hover:bg-teal-800"
          >
            {t("contactCta")}
          </Link>
          <Link
            href="/services"
            className="rounded-lg border border-slate-300 px-5 py-3 font-bold text-slate-800 hover:bg-slate-50"
          >
            {t("allServicesCta")}
          </Link>
        </div>
      </section>
    </>
  );
}
