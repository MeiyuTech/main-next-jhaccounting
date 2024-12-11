import Image from "next/image"
import { Link, Locale } from "@/i18n.config";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/app/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/app/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet"
import { Menu } from "lucide-react"

// Add these new types and data structures
type NavItem = {
  href: string;
  label: string;
  children?: NavItem[];
};

export default function Header() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 border-b bg-white z-50">
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <div className="container mx-auto px-4 lg:px-8 py-4 lg:py-8 flex items-center">
          <Link href="/next-fce-form" className="flex-shrink-0">
            <Image
              src="/AET-logo.png"
              alt="AET"
              width={300}
              height={100}
              className="h-16 lg:h-24 w-auto"
              priority={true}
            />
          </Link>
        </div>
      </header>
      <div className="h-[96px] lg:h-[144px]" />
    </>
  )
}
