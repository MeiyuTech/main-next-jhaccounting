import Image from "next/image"
import { Link, Locale } from "@/i18n.config";
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
  const t = useTranslations('Header');
  // Retrieves the active locale
  const locale = useLocale() as Locale;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 border-b bg-white z-50">
        <div className="container mx-auto px-8 py-8 flex items-center">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/JH-logo-1.png"
              alt="JIAHUA US ACCOUNTING"
              width={300}
              height={100}
              className="h-24 w-auto"
            />
          </Link>

          <div className="flex items-center gap-2 ml-auto">
            <nav className="hidden lg:flex items-center gap-1">
              <NavigationMenu className="px-1">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="px-2">
                      <Link href="/services" className="text-lg font-medium hover:text-primary">
                        {t('services.title')}
                      </Link>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-3 p-4">
                        <li>
                          <Link href="/services/accounting">
                            <NavigationMenuLink className="block p-2 hover:bg-slate-100 rounded-md">
                              {t('services.accounting')}
                            </NavigationMenuLink>
                          </Link>
                        </li>
                        <li>
                          <Link href="/services/corporate-tax-planning-strategy">
                            <NavigationMenuLink className="block p-2 hover:bg-slate-100 rounded-md">
                              {t('services.corporate-tax-planning-strategy')}
                            </NavigationMenuLink>
                          </Link>
                        </li>
                        <li>
                          <Link href="/services/outsourcing-tax-and-accounting">
                            <NavigationMenuLink className="block p-2 hover:bg-slate-100 rounded-md">
                              {t('services.outsourcing-tax-and-accounting')}
                            </NavigationMenuLink>
                          </Link>
                        </li>
                        <li>
                          <Link href="/services/tax-credit">
                            <NavigationMenuLink className="block p-2 hover:bg-slate-100 rounded-md">
                              {t('services.tax-credit')}
                            </NavigationMenuLink>
                          </Link>
                        </li>
                        <li>
                          <Link href="/services/company-formation">
                            <NavigationMenuLink className="block p-2 hover:bg-slate-100 rounded-md">
                              {t('services.company-formation')}
                            </NavigationMenuLink>
                          </Link>
                        </li>
                        <li>
                          <Link href="/services/itin-application">
                            <NavigationMenuLink className="block p-2 hover:bg-slate-100 rounded-md">
                              {t('services.itin-application')}
                            </NavigationMenuLink>
                          </Link>
                        </li>
                        <li>
                          <Link href="/services/unclaimed-property-reporting-and-consulting">
                            <NavigationMenuLink className="block p-2 hover:bg-slate-100 rounded-md">
                              {t('services.unclaimed-property-reporting-and-consulting')}
                            </NavigationMenuLink>
                          </Link>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    {/* 
                      * Using legacyBehavior and passHref to handle custom Link wrapping:
                      *  - legacyBehavior: Enables old Link behavior where Link expects a single child component
                      *  - passHref: Forces Link to pass the href prop to its child component (NavigationMenuLink)
                      *
                      * This combination is necessary when:
                      *  1. Wrapping custom components (like NavigationMenuLink) with Next.js Link
                      *  2. Preventing hydration errors by ensuring consistent server/client rendering
                      *  3. Maintaining proper HTML semantics and SEO
                      */}
                    <Link href="/blog" legacyBehavior passHref>
                      <NavigationMenuLink className="text-lg font-medium p-2 hover:text-primary">
                        {t('blog')}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      <Link href="/about" className="text-lg font-medium hover:text-primary">
                        {t('about.title')}
                      </Link>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-3 p-4">
                        <li>
                          <Link href="/about/contact-now">
                            <NavigationMenuLink className="block p-2 hover:bg-slate-100 rounded-md">
                              {t('about.contact-now')}
                            </NavigationMenuLink>
                          </Link>
                        </li>
                        <li>
                          <Link href="/about/recruitment">
                            <NavigationMenuLink className="block p-2 hover:bg-slate-100 rounded-md">
                              {t('about.recruitment')}
                            </NavigationMenuLink>
                          </Link>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </nav>

            <div className="lg:hidden">
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
                        {t('services.title')}
                      </Link>
                      <div className="ml-4 flex flex-col gap-2">
                        <Link href="/services/accounting" className="text-base p-2 hover:text-primary">
                          {t('services.accounting')}
                        </Link>
                        <Link href="/services/corporate-tax-planning-strategy" className="text-base p-2 hover:text-primary">
                          {t('services.corporate-tax-planning-strategy')}
                        </Link>
                        <Link href="/services/outsourcing-tax-and-accounting" className="text-base p-2 hover:text-primary">
                          {t('services.outsourcing-tax-and-accounting')}
                        </Link>
                        <Link href="/services/tax-credit" className="text-base p-2 hover:text-primary">
                          {t('services.tax-credit')}
                        </Link>
                        <Link href="/services/company-formation" className="text-base p-2 hover:text-primary">
                          {t('services.company-formation')}
                        </Link>
                        <Link href="/services/itin-application" className="text-base p-2 hover:text-primary">
                          {t('services.itin-application')}
                        </Link>
                        <Link href="/services/unclaimed-property-reporting-and-consulting" className="text-base p-2 hover:text-primary">
                          {t('services.unclaimed-property-reporting-and-consulting')}
                        </Link>
                      </div>
                    </div>
                    <Link href="/blog" className="text-lg font-medium p-2 hover:text-primary">
                      {t('blog')}
                    </Link>
                    <div className="flex flex-col">
                      <Link href="/about" className="text-lg font-medium p-2 hover:text-primary">
                        {t('about.title')}
                      </Link>
                      <div className="ml-4 flex flex-col gap-2">
                        <Link href="/about/contact-now" className="text-base p-2 hover:text-primary">
                          {t('about.contact-now')}
                        </Link>
                        <Link href="/about/recruitment" className="text-base p-2 hover:text-primary">
                          {t('about.recruitment')}
                        </Link>
                      </div>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>

            <LocaleSwitcher locale={locale} />
          </div>
        </div>
      </header>
      <div className="h-[144px]" />
    </>
  )
}