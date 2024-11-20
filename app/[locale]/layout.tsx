import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import "@/app/globals.css"
import { type Locale, locales } from "@/i18n.config";
import { setRequestLocale, getTranslations } from "next-intl/server";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: 'JIAHUA US ACCOUNTING',
  description: 'Professional accounting services in the US',
}

export default function RootLayout({
  children,
  params: {
    locale
  }
}: {
  children: React.ReactNode
  params: {
    locale: Locale
  }
}) {
  setRequestLocale(locale);

  return (
    <html lang="zh">
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