import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["en-us", "zh-cn"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  "en-us": "English",
  "zh-cn": "简体中文（中国大陆）",
};

export const { Link, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });
