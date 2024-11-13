/*
 * The About Us Page
 * Introducing the founder, Qi Yang
 */

import Image from "next/image";
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from "next-intl/server";

export default function AboutUs({
  params: { locale },
}: Readonly<{ params: { locale: string } }>) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('AboutUs');
  return (
    <>
      {/* Main container */}
      <div className="w-full flex flex-col items-center">
        {/* Title section - Reduced top margin, increased bottom margin */}
        <div className="w-full text-center mb-20 mt-4">
          <h1 className="text-3xl md:text-4xl font-bold">杨淇</h1>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mt-4"></div>
        </div>

        {/* Main content container */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8 px-4">
          {/* Left side: Introduction text */}
          <div className="w-full md:w-1/2 text-center md:text-left order-2 md:order-1">
            <div className="mb-4">
              {['description-1', 'description-2', 'description-3', 'description-4', 'description-5', 'description-6', 'description-7'].map((key) => (
                <div key={key} className="grid grid-cols-[12px_1fr] gap-1 mb-2">
                  <span>·</span>
                  <span>{t(key)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side: Profile photo with yellow breathing effect circle */}
          <div className="w-full md:w-1/2 relative flex justify-center items-center mb-8 md:mb-0 order-1 md:order-2">
            <Image
              src="/.png"
              alt="Profile"
              width={240}
              height={240}
              className="relative z-10"
            />
          </div>
        </div>
      </div>
    </>
  );
}
