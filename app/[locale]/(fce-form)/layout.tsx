import Header from "@/app/[locale]/(fce-form)/components/Header"
import Footer from "@/app/[locale]/(fce-form)/components/Footer"
import "@/app/globals.css"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { type Locale, locales } from "@/i18n.config";
import Script from 'next/script'
import { Toaster } from "@/app/components/ui/toaster"

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: "Layout.metaData",
  });

  return (
    <html lang={locale}>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  )
}
