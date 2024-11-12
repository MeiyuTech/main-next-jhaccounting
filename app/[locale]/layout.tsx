import { Header } from "@/app/components/Header"
import "@/app/globals.css"

export const metadata = {
  title: 'JIAHUA US ACCOUNTING',
  description: 'Professional accounting services in the US',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  )
}