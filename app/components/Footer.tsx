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

import { FaTiktok, FaYoutube, FaWeixin } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="flex flex-col md:flex-row justify-between items-center p-4 space-y-12 md:space-y-0">
      <div className="flex space-x-4 order-1">
        {/* <a href="https://www.tiktok.com/@youraccount" target="_blank" rel="noopener noreferrer"> */}
        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
          <FaTiktok className="text-white" size={16} />
        </div>
        {/* </a> */}
        {/* <a href="https://example.com/wechat" target="_blank" rel="noopener noreferrer"> */}
        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
          <FaWeixin className="text-white" size={16} />
        </div>
        {/* </a> */}
        {/* <a href="https://youtube.com/c/yourchannel" target="_blank" rel="noopener noreferrer"> */}
        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
          <FaYoutube className="text-white" size={16} />
        </div>
        {/* </a> */}
      </div>
      <div className="order-2">
        &copy; {new Date().getFullYear()}
        {` `}
        {t('companyName')}.
        {` `}
        {t('copyright')}.
      </div>
    </footer>
  );
}
