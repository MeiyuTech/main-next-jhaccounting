import Link from "next/link"
import Image from "next/image"
import { Button } from "@/app/components/ui/button"
import NavigationMenuDemo from "@/app/components/ui/menu"

export function Header() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 border-b bg-white z-50">
        <div className="container mx-auto px-8 py-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/JH-logo-1.png"
              alt="JIAHUA US ACCOUNTING"
              width={300}
              height={100}
              className="h-24 w-auto"
            />
          </Link>
          <nav className="hidden md:flex items-center gap-12">
            <NavigationMenuDemo />
            <Link href="/" className="text-lg font-medium hover:text-primary">
              主页
            </Link>
            <Link href="/services" className="text-lg font-medium hover:text-primary">
              服务
            </Link>
            <Link href="/process" className="text-lg font-medium hover:text-primary">
              流程
            </Link>
            <Link href="/faq" className="text-lg font-medium hover:text-primary">
              FAQ
            </Link>
            <Link href="/news" className="text-lg font-medium hover:text-primary">
              新闻
            </Link>
            <Link href="/about" className="text-lg font-medium hover:text-primary">
              关于我们
            </Link>
            <Button className="bg-teal-500 hover:bg-teal-600 text-lg px-8 py-3">开始咨询</Button>
          </nav>
        </div>
      </header>
      <div className="h-[144px]" />
    </>
  )
}