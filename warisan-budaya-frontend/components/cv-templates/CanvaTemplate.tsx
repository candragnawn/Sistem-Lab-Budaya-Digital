import React, { forwardRef } from 'react';

// Definisi Interface untuk Type Safety
export interface PersonalInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  institution: string;
  faculty: string;
  major: string;
}

export interface CVItem {
  title: string;
  organization?: string;
  period: string;
  description?: string[];
}

export interface CVDynamicData {
  ai_summary: string;
  profile: PersonalInfo;
  educations: CVItem[];
  research: CVItem[];
  publications: CVItem[];
  community_services: CVItem[];
}

interface CanvaTemplateProps {
  data: CVDynamicData | null;
}

// Gunakan forwardRef agar react-to-print bisa me-render komponen ini
const CanvaTemplate = forwardRef<HTMLDivElement, CanvaTemplateProps>(({ data }, ref) => {
  if (!data) return null;

  const { profile, ai_summary, educations, research, publications, community_services } = data;

  return (
    <div ref={ref} className="max-w-4xl mx-auto p-12 bg-white text-black font-sans antialiased">
      
      {/* Header / Kontak */}
      <header className="mb-6">
        <h1 className="text-4xl font-bold tracking-tight mb-2 uppercase text-gray-900">
          {profile.name}
        </h1>
        <p className="text-sm text-gray-700 font-medium">
          {profile.phone} | {profile.email} | {profile.institution} | {profile.faculty}, {profile.major}
        </p>
      </header>

      {/* Section: Executive Summary (AI Generated) */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-1 text-gray-900 uppercase">Professional Summary</h2>
        <hr className="border-t-2 border-black mb-3" />
        <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
          {ai_summary || <span className="italic text-gray-500">Summary belum tersedia.</span>}
        </div>
      </section>

      {/* Section: Pendidikan */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-1 text-gray-900 uppercase">Education</h2>
        <hr className="border-t-2 border-black mb-4" />
        {educations && educations.length > 0 ? (
          <div className="space-y-4">
            {educations.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-700">{item.organization}</p>
                </div>
                <div className="text-sm font-medium text-gray-600 whitespace-nowrap ml-4">
                  {item.period}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-500 italic">Belum ada data riwayat pendidikan.</div>
        )}
      </section>

      {/* Section: Research Experience */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-1 text-gray-900 uppercase">Research Experience</h2>
        <hr className="border-t-2 border-black mb-4" />
        {research && research.length > 0 ? (
          <div className="space-y-4">
            {research.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start">
                <div className="pr-4">
                  <h3 className="font-bold text-gray-900 text-sm">{item.title}</h3>
                  <p className="text-sm text-gray-700">{item.organization}</p>
                </div>
                <div className="text-sm font-medium text-gray-600 whitespace-nowrap flex-shrink-0">
                  {item.period}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-500 italic">Belum ada data pengalaman penelitian.</div>
        )}
      </section>

      {/* Section: Publikasi */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-1 text-gray-900 uppercase">Publications</h2>
        <hr className="border-t-2 border-black mb-4" />
        {publications && publications.length > 0 ? (
          <div className="space-y-4">
            {publications.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start">
                <div className="pr-4">
                  <h3 className="font-bold text-gray-900 text-sm">{item.title}</h3>
                  <p className="text-sm text-gray-700">{item.organization}</p>
                </div>
                <div className="text-sm font-medium text-gray-600 whitespace-nowrap flex-shrink-0">
                  {item.period}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-500 italic">Belum ada data publikasi.</div>
        )}
      </section>

      {/* Section: Pengabdian Masyarakat */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-1 text-gray-900 uppercase">Community Service</h2>
        <hr className="border-t-2 border-black mb-4" />
        {community_services && community_services.length > 0 ? (
          <div className="space-y-4">
            {community_services.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start">
                <div className="pr-4">
                  <h3 className="font-bold text-gray-900 text-sm">{item.title}</h3>
                  <p className="text-sm text-gray-700">{item.organization}</p>
                </div>
                <div className="text-sm font-medium text-gray-600 whitespace-nowrap flex-shrink-0">
                  {item.period}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-500 italic">Belum ada data pengabdian masyarakat.</div>
        )}
      </section>

    </div>
  );
});

CanvaTemplate.displayName = 'CanvaTemplate';
export default CanvaTemplate;