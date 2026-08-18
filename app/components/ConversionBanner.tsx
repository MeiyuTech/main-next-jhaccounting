import { useTranslations } from "next-intl";

import { Link } from "@/i18n.config";

export default function ConversionBanner() {
  const t = useTranslations("Funding.conversion");

  return (
    <aside className="not-prose my-12 rounded-2xl bg-slate-950 px-6 py-8 text-center text-white shadow-lg md:px-10">
      <h2 className="text-2xl font-bold md:text-3xl">{t("title")}</h2>
      <p className="mx-auto mt-3 max-w-2xl text-slate-300">
        {t("description")}
      </p>
      <Link
        href="/government-funding#eligibility-form"
        className="mt-6 inline-flex rounded-lg bg-amber-400 px-5 py-3 font-bold text-slate-950 no-underline hover:bg-amber-300"
      >
        {t("button")}
      </Link>
    </aside>
  );
}
