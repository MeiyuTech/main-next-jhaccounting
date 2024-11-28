import Image from "next/image"
import { getTranslations, setRequestLocale } from 'next-intl/server';
import ContactForm from '@/app/components/ContactForm'

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
    namespace: "ContactNow",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ContactNowPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('ContactNow')
  const formT = await getTranslations('Form')

  // Pass translation content to client component via props
  const translations = {
    name: formT('name.label'),
    email: formT('email.label'),
    phone: formT('phone.label'),
    wechat: formT('wechat.label'),
    address: formT('address.label'),
    message: formT('message.label'),
    submit: formT('submit'),
    submitting: formT('submitting')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header section */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex-1">
          <h2 className="text-8xl font-bold text-teal-600">{t('title')}</h2>
          <div className="w-20 h-1 bg-amber-400 mt-2"></div>
          <div className="mt-4 text-gray-600 max-w-2xl mx-auto">
            <div className="flex items-center gap-2">
              <span className="text-xl">{t('office-hours')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">{t('phone-label')}</span>
              <a href={`tel:${t('phone')}`} className="text-xl hover:text-teal-400">
                {t('phone')}
              </a>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xl">{t('email-label')}</span>
              <a href={`mailto:${t('email')}`} className="text-xl hover:text-teal-400">
                {t('email')}
              </a>
            </div>
          </div>

        </div>
        <div className="relative w-1/2 h-[420px]">
          <Image
            src="/contact-now.jpg"
            alt="Contact Now Banner"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Contact information with map and form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-6">{t('sf-office-title')}</h3>
          <h3 className="text-2xl font-semibold mb-6 h-[4rem]">{t('sf-office')}</h3>
          {/* Add an embedded map here */}
          <div className="h-[300px] bg-gray-100 rounded-lg mb-6 overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3161.3037456101515!2d-122.3689848233769!3d37.595009772031176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f762d9dc55555%3A0x3c741222537f6a6e!2s851%20Burlway%20Rd%20Ste%20605%2C%20Burlingame%2C%20CA%2094010!5e0!3m2!1sen!2sus!4v1731711023360!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          {/* Office details with icons */}
          <div className="space-y-4">
            {/* Add office locations with icons */}
          </div>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-6">{t('miami-office-title')}</h3>
          <h3 className="text-2xl font-semibold mb-6 h-[4rem]">{t('miami-office')}</h3>
          {/* Add an embedded map here */}
          <div className="h-[300px] bg-gray-100 rounded-lg mb-6 overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.308721601592!2d-80.34370852375291!3d25.627877377436235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9c69fb4299d93%3A0xb454cb3e5515c4c9!2s15321%20S%20Dixie%20Hwy%20%23302b%2C%20Palmetto%20Bay%2C%20FL%2033157!5e0!3m2!1sen!2sus!4v1731711168671!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          {/* Office details with icons */}
          <div className="space-y-4">
            {/* Add office locations with icons */}
          </div>
        </div>
      </div>

      {/* Contact Form section */}
      <div className="mt-16">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold mb-6">{formT('title')}</h3>
          <p className="text-gray-600 mb-8">{formT('description')}</p>
          <ContactForm translations={translations} />
        </div>
      </div>
    </div>
  )
}
