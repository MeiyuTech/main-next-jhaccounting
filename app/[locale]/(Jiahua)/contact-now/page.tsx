import Image from "next/image";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import ContactForm from "@/app/components/ContactForm";
import { getContactFormTranslations } from "@/lib/translations/form";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "ContactNow" });
  return { title: t("title"), description: t("description") };
}

export default async function ContactNowPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations("ContactNow");
  const formT = await getTranslations("ContactForm");
  const fundingT = await getTranslations("Funding");
  const contactFormTranslations = await getContactFormTranslations();

  const offices = [
    {
      key: "miami",
      title: t("miami-office-title"),
      address: t("miami-office"),
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.308721601592!2d-80.34370852375291!3d25.627877377436235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9c69fb4299d93%3A0xb454cb3e5515c4c9!2s15321%20S%20Dixie%20Hwy%20%23302b%2C%20Palmetto%20Bay%2C%20FL%2033157!5e0!3m2!1sen!2sus!4v1731711168671!5m2!1sen!2sus",
    },
    {
      key: "irvine",
      title: t("la-office-title"),
      address: t("la-office"),
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3320.9893541738743!2d-117.86467612450893!3d33.67088487330263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcde7d53063f25%3A0xe539462589574d75!2s19800%20MacArthur%20Blvd%20STE%20570%2C%20Irvine%2C%20CA%2092612!5e0!3m2!1sen!2sus!4v1731711168671!5m2!1sen!2sus",
    },
  ];

  return (
    <>
      <section className="bg-slate-950 text-white">
        <div className="container mx-auto grid gap-8 px-4 py-14 md:grid-cols-[1fr_0.8fr] md:items-center lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-300">
              Jiahua US Accounting
            </p>
            <h1 className="mt-3 text-4xl font-bold md:text-6xl">
              {t("title")}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              {t("description")}
            </p>
            <div className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
              <a
                href="tel:+19493004828"
                className="flex items-center gap-2 hover:text-teal-300"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                (949) 300-4828
              </a>
              <a
                href={`mailto:${t("email")}`}
                className="flex items-center gap-2 hover:text-teal-300"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {t("email")}
              </a>
              <p className="flex items-center gap-2 sm:col-span-2">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {t("office-hours")}
              </p>
            </div>
          </div>
          <div className="relative hidden min-h-72 overflow-hidden rounded-2xl md:block">
            <Image
              src="/contact-now.jpg"
              alt="Jiahua Accounting offices"
              fill
              priority
              sizes="(min-width: 768px) 44vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container mx-auto grid gap-7 px-4 md:grid-cols-2 lg:px-8">
          {offices.map((office) => (
            <article
              key={office.key}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-teal-700">
                  {office.title}
                </p>
                <h2 className="mt-2 flex items-start gap-2 text-xl font-bold text-slate-900">
                  <MapPin
                    className="mt-0.5 h-5 w-5 shrink-0 text-amber-500"
                    aria-hidden="true"
                  />
                  {office.address}
                </h2>
              </div>
              <iframe
                src={office.map}
                width="100%"
                height="320"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${office.title} Google Map`}
              />
            </article>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[0.55fr_1.45fr] lg:px-8">
          <aside className="rounded-2xl bg-slate-950 p-7 text-center text-white">
            <h2 className="text-2xl font-bold">{fundingT("wechat.title")}</h2>
            <p className="mt-2 text-slate-300">
              {fundingT("wechat.description")}
            </p>
            <Image
              src="/QR-code.png"
              alt={fundingT("wechat.title")}
              width={220}
              height={220}
              className="mx-auto mt-6 rounded-xl bg-white p-2"
            />
          </aside>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-3xl font-bold text-slate-900">
              {formT("title")}
            </h2>
            <p className="mb-8 mt-2 text-slate-600">{formT("description")}</p>
            <ContactForm translations={contactFormTranslations} />
          </div>
        </div>
      </section>
    </>
  );
}
