import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

export default function FundingContactBox() {
  const t = useTranslations("Funding.contact");

  return (
    <aside className="rounded-2xl border border-white/15 bg-white/10 p-5 text-white backdrop-blur-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-200">
        {t("eyebrow")}
      </p>
      <h2 className="mt-2 text-xl font-bold">{t("title")}</h2>
      <div className="mt-4 space-y-3 text-sm text-slate-200">
        <a
          href="tel:+19493004828"
          className="flex items-start gap-2 hover:text-white"
        >
          <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          (949) 300-4828
        </a>
        <a
          href="mailto:info@jhaccounting.org"
          className="flex items-start gap-2 hover:text-white"
        >
          <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          info@jhaccounting.org
        </a>
        <p className="flex items-start gap-2">
          <Clock3 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {t("hours")}
        </p>
        <p className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {t("offices")}
        </p>
      </div>
    </aside>
  );
}
