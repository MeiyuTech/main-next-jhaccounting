import Link from "next/link"
import Image from "next/image"
import { Button } from "@/app/components/ui/button"

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/placeholder.svg"
            alt="JIAHUA US ACCOUNTING"
            width={150}
            height={50}
            className="h-12 w-auto"
          />
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary">
            主页
          </Link>
          <Link href="/services" className="text-sm font-medium hover:text-primary">
            服务
          </Link>
          <Link href="/process" className="text-sm font-medium hover:text-primary">
            流程
          </Link>
          <Link href="/faq" className="text-sm font-medium hover:text-primary">
            FAQ
          </Link>
          <Link href="/news" className="text-sm font-medium hover:text-primary">
            新闻
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary">
            关于我们
          </Link>
          <Button className="bg-teal-500 hover:bg-teal-600">开始咨询</Button>
        </nav>
      </div>
    </header>
  )
}