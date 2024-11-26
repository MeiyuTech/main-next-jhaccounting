import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import "@/app/globals.css"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { type Locale, locales } from "@/i18n.config";
import Script from 'next/script'
import { usePathname } from 'next/navigation'

type SchemaObject = {
  "@context": string;
  "@type": string;
  [key: string]: any;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/*
 * We pull in the current locale
 * generated from `generateStaticParms`
 * or the current request route.
*/
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({
    locale,
    namespace: "Layout.metaData",
  });

  const metadataBase = new URL(t("siteUrl"));
  return {
    metadataBase,
    title: {
      template: `%s | ${t("siteName")}`,
      default: t("siteName"),
    },
    description: t("description"),
    openGraph: {
      title: t("siteName"),
      description: t("description"),
      url: t("siteUrl"),
      siteName: t("siteName"),
      images: [t("socialBanner")],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("siteName"),
      images: [t("socialBanner")],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
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
  const pathname = usePathname();

  // Base organization schema that's shared across pages
  const baseSchema: SchemaObject = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "@id": t("siteUrl"),
    "name": t("siteName"),
    "description": t("description"),
    "url": t("siteUrl"),
    "logo": `${t("siteUrl")}${t("siteLogo")}`,
    "image": `${t("siteUrl")}${t("socialBanner")}`,
    "email": t("email"),
    "telephone": "+1 (949) 300-4828",
    "address": [{
      "@type": "PostalAddress",
      "addressLocality": "Burlingame",
      "addressRegion": "CA",
      "postalCode": "94010",
      "streetAddress": "851 Burlway Rd, Ste 605",
      "addressCountry": "US"
    }, {
      "@type": "PostalAddress",
      "addressLocality": "Palmetto Bay",
      "addressRegion": "FL",
      "postalCode": "33157",
      "streetAddress": "15321 South Dixie Highway, Suite 302B",
      "addressCountry": "US"
    }],
    "openingHours": "Mo-Fr 09:30-17:30",
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "sameAs": [
      "https://atlantistaxgroup.com/"
    ],
    "priceRange": "$$"
  };

  // Page-specific schemas
  let pageSchema = baseSchema;

  if (pathname.includes('/services')) {
    pageSchema = {
      ...baseSchema,
      "@type": "Service",
      "serviceType": [
        "Accounting Services",
        "Corporate Tax Planning",
        "Outsourcing Tax & Accounting",
        "Tax Credits",
        "R&D Tax Credits",
        "Self-Employed Tax Credits",
        "ERC Application",
        "Company Formation",
        "ITIN Application",
        "Unclaimed Property Reporting And Consulting",
        "Beneficial Ownership Information (BOI) Reporting"
      ]
    };
  } else if (pathname.includes('/news')) {
    pageSchema = {
      ...baseSchema,
      "@type": "Blog",
      "blogPost": {
        "@type": "BlogPosting",
        "headline": t("News.title"),
        "description": t("News.description"),
        "publisher": {
          "@type": "Organization",
          "name": t("siteName"),
          "logo": {
            "@type": "ImageObject",
            "url": `${t("siteUrl")}${t("siteLogo")}`
          }
        }
      }
    };
  } else if (pathname.includes('/contact-now')) {
    pageSchema = {
      ...baseSchema,
      "@type": "ContactPage",
      "mainEntity": {
        "@type": "ContactPoint",
        "telephone": "+1 (949) 300-4828",
        "email": t("email"),
        "contactType": "customer service",
        "availableLanguage": ["English", "Chinese"]
      }
    };
  } else if (pathname.includes('/recruitment')) {
    pageSchema = {
      ...baseSchema,
      "@type": "JobPosting",
      "title": "Multiple Positions Available",
      "hiringOrganization": {
        "@type": "Organization",
        "name": t("siteName")
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Burlingame",
          "addressRegion": "CA",
          "addressCountry": "US"
        }
      },
      "employmentType": "FULL_TIME",
      "workHours": "Mo-Fr 09:30-17:30"
    };
  } else if (pathname.includes('/erc-application')) {
    pageSchema = {
      ...baseSchema,
      "@type": "Service",
      "serviceType": "ERC Application",
      "offers": {
        "@type": "Offer",
        "description": "Employee Retention Credit Application Service",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      }
    };
  }

  return (
    <html lang={locale}>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(pageSchema)
          }}
        />
      </body>
    </html>
  )
}