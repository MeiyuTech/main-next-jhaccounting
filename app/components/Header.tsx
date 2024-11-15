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

// Add these new types and data structures
type NavItem = {
  href: string;
  label: string;
  children?: NavItem[];
};

export default function Header() {
  const t = useTranslations('Header');
  const locale = useLocale() as Locale;

  // Define navigation structure
  const navItems: NavItem[] = [
    {
      href: '/services',
      label: t('services.title'),
      children: [
        { href: '/services/1-accounting-services', label: t('services.accounting') },
        { href: '/services/2-corporate-tax-planning-strategy', label: t('services.corporate-tax-planning-strategy') },
        { href: '/services/3-outsourcing-tax-and-accounting', label: t('services.outsourcing-tax-and-accounting') },
        {
          href: '/services/4-tax-credits', label: t('services.tax-credits.title'), children: [
            { href: '/services/4-tax-credits', label: t('services.tax-credits.rd-tax-credits') },
            { href: '/services/4-tax-credits', label: t('services.tax-credits.self-employed-tax-credits') },
          ]
        },
        { href: '/services/5-company-formation', label: t('services.company-formation') },
        { href: '/services/6-itin-application', label: t('services.itin-application') },
        { href: '/services/7-unclaimed-property-reporting-and-consulting', label: t('services.unclaimed-property-reporting-and-consulting') },
        { href: '/services/8-boi-reporting', label: t('services.boi-reporting') },
      ]
    },
    {
      href: '/news',
      label: t('news')
    },
    {
      href: '/contact-now',
      label: t('contact-now')
    },
    {
      href: '/recruitment',
      label: t('recruitment'),
    }
  ];

  // Component for rendering dropdown menu items
  const DropdownMenuItems = ({ items }: { items: NavItem[] }) => (
    <ul className="grid w-[200px] gap-3 p-4">
      {items.map((item) => (
        <li key={item.href}>
          <Link href={item.href}>
            <NavigationMenuLink className="block p-2 hover:bg-slate-100 rounded-md">
              {item.label}
            </NavigationMenuLink>
          </Link>
          {item.children && (
            <ul className="ml-4 mt-2">
              <DropdownMenuItems items={item.children} />
            </ul>
          )}
        </li>
      ))}
    </ul>
  );

  // 修改 MobileMenuItem 组件以支持递归渲染
  const MobileMenuItem = ({ item, depth = 0 }: { item: NavItem, depth?: number }) => (
    <div className="flex flex-col">
      <Link
        href={item.href}
        className={`text-xl font-medium py-0.5 hover:text-primary ${depth > 0 ? '' : ''}`}
      >
        {item.label}
      </Link>
      {item.children && (
        <div className="ml-4 flex flex-col gap-0.5">
          {item.children.map((child) => (
            <MobileMenuItem
              key={child.href}
              item={child}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      <header className="fixed top-0 left-0 right-0 border-b bg-white z-50">
        <div className="container mx-auto px-4 lg:px-8 py-4 lg:py-8 flex items-center">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/JH-logo-1.png"
              alt="JIAHUA US ACCOUNTING"
              width={300}
              height={100}
              className="h-16 lg:h-24 w-auto"
            />
          </Link>

          <div className="flex items-center gap-2 ml-auto">
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <NavigationMenu key={item.href} className="px-1">
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      {item.children ? (
                        <>
                          <NavigationMenuTrigger className="px-2">
                            <Link href={item.href} className="text-xl font-medium hover:text-primary">
                              {item.label}
                            </Link>
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <DropdownMenuItems items={item.children} />
                          </NavigationMenuContent>
                        </>
                      ) : (
                        /**
                         * TODO:
                         * "onClick" was passed to <Link> with `href` of `/zh-cn/news` 
                         * but "legacyBehavior" was set. 
                         * The legacy behavior requires onClick be set on the child of next/link
                         */
                        <Link href={item.href} legacyBehavior passHref>
                          <NavigationMenuLink className="text-xl font-medium p-2 hover:text-primary">
                            {item.label}
                          </NavigationMenuLink>
                        </Link>
                      )}
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              ))}
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
                    {navItems.map((item) => (
                      <MobileMenuItem key={item.href} item={item} />
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>

            <LocaleSwitcher locale={locale} />
          </div>
        </div>
      </header>
      <div className="h-[96px] lg:h-[144px]" />
    </>
  )
}