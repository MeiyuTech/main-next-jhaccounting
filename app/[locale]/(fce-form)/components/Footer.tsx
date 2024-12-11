/**
 * Footer Component
 *
 * A responsive website footer that provides:
 * - Bilingual support (English/Chinese) with language switcher
 * - Social media icons
 * - Copyright
 *
 * Used as the main footer for all pages in the application.
 */

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-[#2B3A4D] text-white py-12 px-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information Column */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-amber-400">{t('contact.title')}</h3>
          <div className="space-y-3 text-xl">
            <p>{t('contact.sf-office')}</p>
            <p>{t('contact.miami-office')}</p>
            <p>{t('contact.office-hours')}</p>
            <div className="flex items-center gap-2">
              <span>{t('contact.phone-label')}</span>
              <a href={`tel:${t('contact.phone')}`} className="hover:text-teal-400">
                {t('contact.phone')}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span>{t('contact.email-label')}</span>
              <a href={`mailto:${t('contact.email')}`} className="hover:text-teal-400">
                {t('contact.email')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
