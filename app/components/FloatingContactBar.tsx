"use client";

import Image from "next/image";
import { ArrowUp, ClipboardCheck, MessageCircle, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { Link } from "@/i18n.config";

export default function FloatingContactBar() {
  const t = useTranslations("Funding");

  const itemClassName =
    "flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2";

  return (
    <aside
      className="fixed bottom-4 right-3 z-40 flex items-center gap-2 md:bottom-auto md:right-4 md:top-1/2 md:-translate-y-1/2 md:flex-col"
      aria-label="Quick contact actions"
    >
      <a
        href="tel:+19493004828"
        className={itemClassName}
        aria-label={t("floating.phone")}
        title={t("floating.phone")}
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
      </a>

      <Popover>
        <PopoverTrigger asChild>
          <button
            className={itemClassName}
            aria-label={t("floating.wechat")}
            title={t("floating.wechat")}
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
          </button>
        </PopoverTrigger>
        <PopoverContent side="left" className="w-64 text-center">
          <p className="font-bold">{t("wechat.title")}</p>
          <p className="mt-1 text-sm text-slate-600">
            {t("wechat.description")}
          </p>
          <Image
            src="/QR-code.png"
            alt={t("wechat.title")}
            width={180}
            height={180}
            className="mx-auto mt-3"
          />
        </PopoverContent>
      </Popover>

      <Link
        href="/government-funding#eligibility-form"
        className={itemClassName}
        aria-label={t("floating.assessment")}
        title={t("floating.assessment")}
      >
        <ClipboardCheck className="h-5 w-5" aria-hidden="true" />
      </Link>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={itemClassName}
        aria-label={t("floating.top")}
        title={t("floating.top")}
      >
        <ArrowUp className="h-5 w-5" aria-hidden="true" />
      </button>
    </aside>
  );
}
