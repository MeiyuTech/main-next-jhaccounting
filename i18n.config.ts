import { createNavigation } from "next-intl/navigation";

export const locales = ["en-us", "zh-cn"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  "en-us": "English",
  "zh-cn": "简体中文",
};
/**
 * Create navigation for the app
 * Move to next-intl 3.22
 * https://next-intl-docs.vercel.app/blog/next-intl-3-22#create-navigation
 */
export const { Link, usePathname, useRouter } = createNavigation({ locales });
