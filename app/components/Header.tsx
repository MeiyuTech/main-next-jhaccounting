import Image from "next/image"
import Link from "next/link"
import { Locale } from "@/i18n.config";
import { useLocale, useTranslations } from "next-intl";
import LocaleSwitcher from './LocaleSwitcher';
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

export default function Header() {
  // Retrieves the active locale
  const locale = useLocale() as Locale;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 border-b bg-white z-50">
        <div className="container mx-auto px-8 py-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/JH-logo-1.png"
              alt="JIAHUA US ACCOUNTING"
              width={400}
              height={133}
              className="h-24 w-auto"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-2">
            <nav className="flex items-center gap-1">
              <NavigationMenu className="px-1">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="px-2">
                      <Link href="/services" className="text-lg font-medium hover:text-primary">
                        服务
                      </Link>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-3 p-4">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link href="/services/accounting" className="block p-2 hover:bg-slate-100 rounded-md">
                              会计服务
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link href="/services/tax-planning" className="block p-2 hover:bg-slate-100 rounded-md">
                              公司税务筹划
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link href="/services/tax-outsourcing" className="block p-2 hover:bg-slate-100 rounded-md">
                              财税外包
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link href="/services/tax-reduction" className="block p-2 hover:bg-slate-100 rounded-md">
                              税务减免
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link href="/services/boi" className="block p-2 hover:bg-slate-100 rounded-md">
                              BOI申报
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link href="/services/company-registration" className="block p-2 hover:bg-slate-100 rounded-md">
                              公司注册
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link href="/services/itin" className="block p-2 hover:bg-slate-100 rounded-md">
                              ITIN注册
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      <Link href="/blog" className="text-lg font-medium p-2 hover:text-primary">
                        博客
                      </Link>
                    </NavigationMenuTrigger>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      <Link href="/about" className="text-lg font-medium p-2 hover:text-primary">
                        关于我们
                      </Link>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-3 p-4">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link href="/about" className="block p-2 hover:bg-slate-100 rounded-md">
                              现在联系
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link href="/recruitment" className="block p-2 hover:bg-slate-100 rounded-md">
                              招聘计划
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </nav>
            <LocaleSwitcher locale={locale} />
          </div>

          <div className="flex lg:hidden items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost">
                  <Menu className="h-6 w-8" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <div className="flex flex-col">
                    <Link href="/services" className="text-lg font-medium p-2 hover:text-primary">
                      服务
                    </Link>
                    <div className="ml-4 flex flex-col gap-2">
                      <Link href="/services/accounting" className="text-base p-2 hover:text-primary">
                        会计服务
                      </Link>
                      <Link href="/services/tax-planning" className="text-base p-2 hover:text-primary">
                        公司税务筹划
                      </Link>
                      <Link href="/services/tax-outsourcing" className="text-base p-2 hover:text-primary">
                        财税外包
                      </Link>
                      <Link href="/services/tax-reduction" className="text-base p-2 hover:text-primary">
                        税务减免
                      </Link>
                      <Link href="/services/boi" className="text-base p-2 hover:text-primary">
                        BOI申报
                      </Link>
                      <Link href="/services/company-registration" className="text-base p-2 hover:text-primary">
                        公司注册
                      </Link>
                      <Link href="/services/itin" className="text-base p-2 hover:text-primary">
                        ITIN注册
                      </Link>
                    </div>
                  </div>
                  <Link href="/blog" className="text-lg font-medium p-2 hover:text-primary">
                    博客
                  </Link>
                  <div className="flex flex-col">
                    <Link href="/about" className="text-lg font-medium p-2 hover:text-primary">
                      关于我们
                    </Link>
                    <div className="ml-4 flex flex-col gap-2">
                      <Link href="/about" className="text-base p-2 hover:text-primary">
                        现在联系
                      </Link>
                      <Link href="/recruitment" className="text-base p-2 hover:text-primary">
                        招聘计划
                      </Link>
                    </div>
                  </div>
                </nav>
                <div className="mt-4 border-t pt-4">
                  <LocaleSwitcher locale={locale} />
                </div>
              </SheetContent>

            </Sheet>
          </div>

        </div >
      </header >
      <div className="h-[144px]" />
    </>
  )
}