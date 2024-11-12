/*
 * The Inner Page
 * Introducing SinoYoga and related courses
 */
import Image from "next/image";
import Ripple from '@/app/components/ui/ripple';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from "next-intl/server";

export default function InnerPage({
  params: { locale },
}: Readonly<{ params: { locale: string } }>) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('InnerPage');
  return (
    <>
      {/* Main container */}
      <div className="w-full flex flex-col items-center">
        {/* Title section - Reduced top margin, increased bottom margin */}
        <div className="w-full text-center mb-20 mt-4">
          <h1 className="text-3xl md:text-4xl font-bold">{t('title')}</h1>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mt-4"></div>
        </div>

        {/* Main content container */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8 px-4">
          {/* Left side: Introduction text */}
          <div className="w-full md:w-1/2 text-center md:text-left order-2 md:order-1">
            <div className="mb-4">
              {t('subtitle')}
              <br />
              {['description-1', 'description-2', 'description-3', 'description-4', 'description-5'].map((key) => (
                <div key={key} className="grid grid-cols-[12px_1fr] gap-1 mb-2">
                  <span>·</span>
                  <span>{t(key)}</span>
                </div>
              ))}
              ......<br />
              <br />
              {t('summary')}
            </div>
          </div>

          {/* Right side: Profile photo with yellow breathing effect circle */}
          <div className="w-full md:w-1/2 relative flex justify-center items-center mb-8 md:mb-0 order-1 md:order-2">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full absolute overflow-hidden">
              <Ripple
                mainCircleSize={320}
                numCircles={3}
                startColor="rgba(255, 255, 0, 0.2)"
                endColor="rgba(255, 200, 0, 0.8)"
              />
            </div>
            <Image
              src="/qy-3.1.png"
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
