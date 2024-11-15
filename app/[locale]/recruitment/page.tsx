import Image from "next/image"
import { getTranslations } from 'next-intl/server';
import JobPost from '@/app/components/JobPost';



export default async function RecruitmentPage() {
  const t = await getTranslations('Recruitment');

  const jobs = [
    {
      title: t('accountant.title'),
      location: t('accountant.location'),
      duties: [
        t('accountant.duties.1'),
        t('accountant.duties.2'),
        t('accountant.duties.3'),
        t('accountant.duties.4'),
        t('accountant.duties.5'),
        t('accountant.duties.6'),
        t('accountant.duties.7'),
        t('accountant.duties.8')
      ],
      requirements: [
        t('accountant.requirements.1'),
        t('accountant.requirements.2'),
        t('accountant.requirements.3'),
        t('accountant.requirements.4'),
        t('accountant.requirements.5'),
        t('accountant.requirements.6'),
        t('accountant.requirements.7'),
        t('accountant.requirements.8')
      ]
    },
    {
      title: t('office-assistant.title'),
      location: t('office-assistant.location'),
      duties: [
        t('office-assistant.duties.1'),
        t('office-assistant.duties.2'),
        t('office-assistant.duties.3'),
        t('office-assistant.duties.4'),
        t('office-assistant.duties.5'),
        t('office-assistant.duties.6')
      ],
      requirements: [
        t('office-assistant.requirements.1'),
        t('office-assistant.requirements.2'),
        t('office-assistant.requirements.3'),
        t('office-assistant.requirements.4'),
        t('office-assistant.requirements.5'),
        t('office-assistant.requirements.6')
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header section */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex-1">
          <h2 className="text-8xl font-bold text-teal-600">{t('title')}</h2>
          <div className="w-20 h-1 bg-amber-400 mt-2"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>
        <div className="relative w-1/2 h-[420px]">
          <Image
            src="/recruitment.png"
            alt="Recruitment Banner"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Jobs section */}
      <div className="mt-12">
        {jobs.map((job, index) => (
          <JobPost key={index} {...job} />
        ))}
      </div>
    </div>
  )
}
