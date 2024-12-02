import ContactDialog from '@/app/components/ContactDialog'
import { getContactFormTranslations } from '@/lib/translations/form'

interface JobPostProps {
  title: string;
  location: string;
  duties_title: string;
  duties: string[];
  requirements_title: string;
  requirements: string[];
  contact_now_button: string;
}

export default async function JobPost({ title, location, duties_title, duties, requirements_title, requirements, contact_now_button }: JobPostProps) {
  const contactFormTranslations = await getContactFormTranslations()

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <p className="text-gray-600 mt-2">{location}</p>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-3">{duties_title}</h4>
        <ul className="list-disc pl-5 space-y-2">
          {duties.map((duty, index) => (
            <li key={index} className="text-gray-700">{duty}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-3">{duties_title}</h4>
        <ul className="list-disc pl-5 space-y-2">
          {requirements.map((requirement, index) => (
            <li key={index} className="text-gray-700">{requirement}</li>
          ))}
        </ul>
      </div>
      <ContactDialog formTranslations={contactFormTranslations} buttonText={contact_now_button} />
    </div>
  );
} 