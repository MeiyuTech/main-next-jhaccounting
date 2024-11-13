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
import Link from 'next/link';
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-[#2B3A4D] text-white py-12 px-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information Column */}
        <div>
          <h3 className="text-xl mb-4">联系我们</h3>
          <div className="space-y-2">
            <p>旧金山办公室：851 Burlway Rd, Ste 605, Burlingame, CA 94010</p>
            <p>迈阿密办公室：15321 South Dixie Highway, Suite 302B, Palmetto Bay, FL 33157</p>
            <p>太平洋时间：上午9：30 - 下午5：30</p>
            <div className="flex items-center gap-2">
              <span className="text-xl">电话：</span>
              <a href="tel:+19493004828" className="text-xl hover:text-teal-400">
                +1 (949) 300-4828
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">邮箱：</span>
              <a href="mailto:info@jhaccounting.org" className="text-xl hover:text-teal-400">
                info@jhaccounting.org
              </a>
            </div>
          </div>
        </div>

        {/* QR Code Column */}
        <div className="flex justify-center md:justify-end">
          <img
            src="/QR-code.png"
            alt="QR Code"
            className="w-40 h-40"
          />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto mt-8 pt-8 border-t border-gray-600">
        <div className="text-sm">
          Copyright © 2022 JIAHUA Accounting Services
        </div>
      </div>
    </footer>
  );
}
