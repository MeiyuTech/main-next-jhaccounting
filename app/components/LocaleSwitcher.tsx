"use client";

import {
  localeNames,
  locales,
  usePathname,
  useRouter,
  type Locale,
} from "@/i18n.config";

export default function LocaleSwitcher({
  locale,
}: {
  locale: Locale;
}) {
  /* `pathname` will contain the current
   * route without the locale e.g. `/about`...
   */
  const pathname = usePathname();
  const router = useRouter();

  const changeLocale = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newLocale = event.target.value as Locale;
    /* ...if the user chose Arabic ("ar-eg"),
     * router.replace() will prefix the pathname
     * with this `newLocale`, effectively changing
     * languages by navigating to `/ar-eg/about`.   
     */
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div>
      <select
        value={locale}
        onChange={changeLocale}
        className="p-0 hover:bg-gray-100"
      >
        {locales.map((loc) => (
          <option key={loc} value={loc}>
            {localeNames[loc]}
          </option>
        ))}
      </select>
    </div>
  );
}