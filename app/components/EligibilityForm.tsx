"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { createContactSubmission } from "@/lib/actions";
import { buildFundingLeadMessage, type FundingLead } from "@/lib/funding";
import { cn } from "@/lib/utils";

const industryOptions = [
  "hospitality",
  "logistics",
  "manufacturing",
  "retail",
  "healthcare",
  "other",
] as const;
const stateOptions = ["CA", "MO", "TX", "NY", "other"] as const;
const needOptions = ["grants", "taxCredits", "loans"] as const;

type SubmissionState = "idle" | "submitting" | "success" | "error";

export default function EligibilityForm({ className }: { className?: string }) {
  const t = useTranslations("Funding.form");
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const primaryNeeds = formData.getAll("primaryNeeds").map(String);

    setSubmissionState("submitting");

    const lead: FundingLead = {
      businessName: String(formData.get("businessName") ?? ""),
      contactName: String(formData.get("contactName") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      state: String(formData.get("state") ?? ""),
      industry: String(formData.get("industry") ?? ""),
      primaryNeeds,
    };

    try {
      await createContactSubmission({
        name: lead.contactName,
        email: lead.email,
        phone: lead.phone,
        wechat: "",
        address: lead.state,
        message: buildFundingLeadMessage(lead),
      });
      form.reset();
      setSubmissionState("success");
    } catch (error) {
      console.error(error);
      setSubmissionState("error");
    }
  }

  const selectClassName =
    "flex h-10 min-w-0 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2";

  return (
    <form
      id="eligibility-form"
      onSubmit={handleSubmit}
      className={cn(
        "scroll-mt-40 rounded-2xl bg-white p-5 text-slate-900 shadow-2xl md:p-7",
        className,
      )}
    >
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
          {t("eyebrow")}
        </p>
        <h2 className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
          {t("title")}
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          {t("description")}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="businessName">{t("businessName")}</Label>
          <Input
            id="businessName"
            name="businessName"
            autoComplete="organization"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contactName">{t("contactName")}</Label>
          <Input
            id="contactName"
            name="contactName"
            autoComplete="name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t("email")}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">{t("phone")}</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">{t("state")}</Label>
          <select
            id="state"
            name="state"
            className={selectClassName}
            defaultValue=""
          >
            <option value="" disabled>
              {t("selectPlaceholder")}
            </option>
            {stateOptions.map((option) => (
              <option
                key={option}
                value={option === "other" ? t("stateOptions.other") : option}
              >
                {t(`stateOptions.${option}`)}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="industry">{t("industry")}</Label>
          <select
            id="industry"
            name="industry"
            className={selectClassName}
            defaultValue=""
          >
            <option value="" disabled>
              {t("selectPlaceholder")}
            </option>
            {industryOptions.map((option) => (
              <option key={option} value={t(`industryOptions.${option}`)}>
                {t(`industryOptions.${option}`)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <fieldset className="mt-5">
        <legend className="text-sm font-medium">{t("primaryNeed")}</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {needOptions.map((option) => (
            <label
              key={option}
              className="flex cursor-pointer items-start gap-2 rounded-lg border border-slate-200 p-3 text-sm hover:border-teal-500"
            >
              <input
                type="checkbox"
                name="primaryNeeds"
                value={t(`needOptions.${option}`)}
                className="mt-0.5 h-4 w-4 accent-teal-700"
              />
              <span>{t(`needOptions.${option}`)}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <Button
        type="submit"
        disabled={submissionState === "submitting"}
        className="mt-6 h-auto w-full bg-amber-400 px-5 py-3 text-base font-bold text-slate-950 hover:bg-amber-300"
      >
        {submissionState === "submitting" ? t("submitting") : t("submit")}
      </Button>

      <div className="mt-3 min-h-6 text-center text-sm" aria-live="polite">
        {submissionState === "success" && (
          <p className="text-teal-700">{t("success")}</p>
        )}
        {submissionState === "error" && (
          <p className="text-red-600">{t("error")}</p>
        )}
      </div>
    </form>
  );
}
