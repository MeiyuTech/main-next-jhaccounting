import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/i18n.config";
/**
 * Get the request config for the current locale
 * @returns The request config for the current locale
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  if (!locale || !locales.includes(locale as Locale)) {
    return notFound();
  }
  return {
    locale,
    messages: (await import(`./locales/${locale}.json`))
      .default,
  };
});
