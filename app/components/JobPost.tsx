import Link from "next/link";

interface JobPostProps {
  title: string;
  location: string;
  duties: string[];
  requirements: string[];
}

export default function JobPost({ title, location, duties, requirements }: JobPostProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <p className="text-gray-600 mt-2">{location}</p>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-3">Job Duties and Responsibilities:</h4>
        <ul className="list-disc pl-5 space-y-2">
          {duties.map((duty, index) => (
            <li key={index} className="text-gray-700">{duty}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-3">Job Requirements:</h4>
        <ul className="list-disc pl-5 space-y-2">
          {requirements.map((requirement, index) => (
            <li key={index} className="text-gray-700">{requirement}</li>
          ))}
        </ul>
      </div>

      <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-6 rounded-lg transition-colors">
        <Link href="/contact-now">Contact Now</Link>
      </button>
    </div>
  );
} 