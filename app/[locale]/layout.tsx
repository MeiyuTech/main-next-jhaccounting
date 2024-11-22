import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import "@/app/globals.css"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { type Locale, locales } from "@/i18n.config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/*
 * We pull in the current locale
 * generated from `generateStaticParms`
 * or the current request route.
*/
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({
    locale,
    namespace: "Layout.metaData",
  });

  return {
    title: {
      template: `%s | ${t("siteName")}`,
      default: t("siteName"),
    },
    description: t("description"),
  };
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return (
    <html lang={locale}>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}