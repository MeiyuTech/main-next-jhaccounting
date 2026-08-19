"use client";

import Image from "next/image";
import { Mail, Menu, MessageCircle, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/app/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import { Link, type Locale } from "@/i18n.config";

import LocaleSwitcher from "./LocaleSwitcher";

type NavItem = {
  href: string;
  label: string;
  children?: NavItem[];
};

export default function Header() {
  const t = useTranslations("Header");
  const fundingT = useTranslations("Funding");
  const locale = useLocale() as Locale;

  const navItems: NavItem[] = [
    { href: "/government-funding", label: t("government-funding") },
    {
      href: "/core-services",
      label: t("core-services"),
      children: [
        {
          href: "/services/1-accounting-services",
          label: t("services.accounting"),
        },
        {
          href: "/services/2-corporate-tax-planning-strategy",
          label: t("services.corporate-tax-planning-strategy"),
        },
        {
          href: "/services/3-outsourcing-tax-and-accounting",
          label: t("services.outsourcing-tax-and-accounting"),
        },
        {
          href: "/services/4-tax-credits",
          label: t("services.tax-credits.title"),
        },
        {
          href: "/services/5-company-formation",
          label: t("services.company-formation"),
        },
        {
          href: "/services/6-itin-application",
          label: t("services.itin-application"),
        },
        {
          href: "/services/7-unclaimed-property-reporting-and-consulting",
          label: t("services.unclaimed-property-reporting-and-consulting"),
        },
        {
          href: "/services/8-boi-reporting",
          label: t("services.boi-reporting"),
        },
      ],
    },
    { href: "/news", label: t("news") },
    { href: "/about", label: t("about") },
    { href: "/recruitment", label: t("recruitment") },
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
        <div className="bg-slate-950 text-white">
          <div className="container mx-auto flex min-h-10 items-center justify-between gap-3 px-4 text-xs lg:px-8 lg:text-sm">
            <div className="flex min-w-0 items-center gap-3 sm:gap-5">
              <a
                href="tel:+19493004828"
                className="flex items-center gap-1.5 whitespace-nowrap hover:text-teal-300"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                <span>(949) 300-4828</span>
              </a>
              <a
                href="mailto:info@jhaccounting.org"
                className="flex items-center gap-1.5 hover:text-teal-300"
                aria-label="info@jhaccounting.org"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">info@jhaccounting.org</span>
              </a>
            </div>
            <div className="flex items-center gap-1 sm:gap-3">
              <Popover>
                <PopoverTrigger asChild>
                  <button className="flex items-center gap-1.5 rounded px-2 py-1 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300">
                    <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{t("wechat")}</span>
                  </button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-64 text-center">
                  <p className="font-bold">{fundingT("wechat.title")}</p>
                  <p className="mt-1 text-sm text-slate-600">
                    {fundingT("wechat.description")}
                  </p>
                  <Image
                    src="/QR-code.png"
                    alt={fundingT("wechat.title")}
                    width={180}
                    height={180}
                    className="mx-auto mt-3"
                  />
                </PopoverContent>
              </Popover>
              <LocaleSwitcher locale={locale} />
            </div>
          </div>
        </div>

        <div className="container mx-auto flex h-[88px] items-center px-4 lg:h-[104px] lg:px-8">
          <Link
            href="/"
            className="shrink-0"
            aria-label="Jiahua US Accounting home"
          >
            <Image
              src="/JH-logo-1.png"
              alt="Jiahua US Accounting"
              width={302}
              height={91}
              className="h-auto w-[190px] lg:w-[260px]"
              style={{ height: "auto" }}
              priority
            />
          </Link>

          <div className="ml-auto flex items-center gap-3">
            <nav
              className="hidden items-center gap-1 xl:flex"
              aria-label="Primary navigation"
            >
              {navItems.map((item) =>
                item.children ? (
                  <div key={item.href} className="group relative">
                    <Link
                      href={item.href}
                      className="inline-flex rounded-md px-3 py-2 text-base font-semibold text-slate-700 hover:bg-slate-100 hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                    >
                      {item.label}
                    </Link>
                    <div className="invisible absolute left-0 top-full z-50 w-80 translate-y-2 rounded-xl border border-slate-200 bg-white p-3 opacity-0 shadow-xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-800"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-md px-3 py-2 text-base font-semibold text-slate-700 hover:bg-slate-100 hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>

            <Button
              asChild
              className="hidden h-auto bg-amber-400 px-4 py-3 font-bold text-slate-950 hover:bg-amber-300 lg:inline-flex"
            >
              <Link href="/government-funding#eligibility-form">
                {t("assessment-cta")}
              </Link>
            </Button>

            <div className="xl:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" aria-label={t("menu")}>
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[320px] overflow-y-auto pt-12"
                >
                  <SheetTitle className="text-2xl font-bold text-teal-800">
                    {t("menu")}
                  </SheetTitle>
                  <SheetDescription className="sr-only">
                    {t("menu-description")}
                  </SheetDescription>
                  <nav
                    className="mt-5 flex flex-col"
                    aria-label="Mobile navigation"
                  >
                    {navItems.map((item) => (
                      <div
                        key={item.href}
                        className="border-b border-slate-100 py-2"
                      >
                        <SheetClose asChild>
                          <Link
                            href={item.href}
                            className="block py-2 text-lg font-bold text-slate-900"
                          >
                            {item.label}
                          </Link>
                        </SheetClose>
                        {item.children && (
                          <div className="border-l-2 border-teal-100 pl-3">
                            {item.children.map((child) => (
                              <SheetClose asChild key={child.href}>
                                <Link
                                  href={child.href}
                                  className="block py-1.5 text-sm text-slate-600"
                                >
                                  {child.label}
                                </Link>
                              </SheetClose>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    <SheetClose asChild>
                      <Link
                        href="/government-funding#eligibility-form"
                        className="mt-6 rounded-lg bg-amber-400 px-4 py-3 text-center font-bold text-slate-950"
                      >
                        {t("assessment-cta")}
                      </Link>
                    </SheetClose>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
      <div className="h-[128px] lg:h-[144px]" />
    </>
  );
}
