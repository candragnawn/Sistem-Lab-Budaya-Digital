"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  MapPin, GraduationCap, User, BarChart2, TrendingUp,
  FileText, ChevronRight, ArrowUpDown, Eye, EyeOff,
  BookOpen, Settings,
} from "lucide-react";

import Loading from "./loading";
import type { TabType, SortType, Category, ProfileData } from "./types";
import { mapLecturerToCategories, mapLecturerToProfileData } from "./data";
import ProfileTable from "./_components/ProfileTable";
import PublicationCard from "./_components/PublicationCard";
import { DosenSidebar } from "./_components/DosenSidebar";
import PublicationTrendChart from "./_components/PublicationTrendChart";
import ResearchBarChart from "./_components/ResearchBarChart";
import api from "@/lib/axios";

export default function DosenProfilePage() {
  const params = useParams();
  const router = useRouter();
  const _id = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [sortBy, setSortBy] = useState<SortType>("year-desc");
  const [categories, setCategories] = useState<Category[]>([]);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isOwner = false;

  const fetchLecturer = useCallback(async () => {
    setIsLoading(true);
    try {
      const includeString = ['academic', 'educations', 'employments', 'addresses', 'families', 'identities', 'inpassings', 'stats', 'placements', 'positions', 'professorEmeritus', 'ranks', 'workContracts', 'hki', 'publicationAuthors', 'teachings', 'detaserings', 'academicOrations', 'additionalTasks', 'lectureMentorings', 'studentDevelopments', 'studentExaminations', 'studentSupervisions', 'teachingActivities', 'teachingMaterials', 'visitingScientists', 'communityServices', 'journalManagers', 'speakers', 'structuralPositions', 'publications', 'research', 'diklats', 'certifications', 'competencyTests', 'awards', 'otherSupportingActivities', 'professionalMemberships', 'allowances', 'scholarships', 'welfares'].join(',');

      const response = await api.get(`/public/lecturers/${_id}`, {
        params: { include: includeString }
      });
      
      const lecturer = response.data?.data || response.data;
      if (lecturer) {
        const mappedCategories = mapLecturerToCategories(lecturer);
        setCategories(mappedCategories);
        setProfileData(mapLecturerToProfileData(lecturer));
        
        const defaultCategory = mappedCategories.find((cat) => cat.subCategories.some((sub) => sub.visible)) ?? mappedCategories[0];
        const defaultSubCategoryId = defaultCategory?.subCategories.find((sub) => sub.visible)?.id ?? defaultCategory?.subCategories[0]?.id ?? "pendidikan-formal";
        setActiveSubCategory(defaultSubCategoryId);
      }
    } catch (error) {
      console.error("Error fetching lecturer:", error);
      // Optional: router.push('/daftar-dosen') or show error UI
    } finally {
      setIsLoading(false);
    }
  }, [_id]);

  useEffect(() => {
    if (_id) {
      fetchLecturer();
    }
  }, [_id, fetchLecturer]);

  if (isLoading || !profileData) return <Loading />;

  const totalPublications = profileData.publications.length;
  const totalCitations = profileData.publications.reduce((acc, p) => acc + (p.citations || 0), 0);
  const bimbinganCount =
    categories.find((c) => c.id === "pelaksanaan-pendidikan")?.subCategories.find((s) => s.id === "bimbingan-mahasiswa")?.rows.length ?? 0;
  const researchCount = profileData.researchCount;

  const sortedPublications = [...profileData.publications].sort((a, b) => {
    if (sortBy === "year-desc") return b.year - a.year;
    if (sortBy === "year-asc") return a.year - b.year;
    if (sortBy === "citation-desc") return b.citations - a.citations;
    return 0;
  });

  const activeCategory = categories.find((c) => c.id === activeTab);
  const activeSub = (() => {
    if (!activeCategory) return null;
    const visibleSubs = activeCategory.subCategories.filter(s => s.visible || isOwner);
    const sub = visibleSubs.find((s) => s.id === activeSubCategory);
    return sub || visibleSubs[0];
  })();

  const totalVisible = categories.reduce(
    (acc, cat) => acc + cat.subCategories.filter((s) => s.visible).length, 0
  );
  const totalSubCats = categories.reduce((acc, cat) => acc + cat.subCategories.length, 0);

  const handleToggleVisibility = (categoryId: string, subCategoryId: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
            ...cat,
            subCategories: cat.subCategories.map((sub) =>
              sub.id === subCategoryId ? { ...sub, visible: !sub.visible } : sub
            ),
          }
          : cat
      )
    );
  };

  const tabs: { key: TabType; label: string; count?: number }[] = [
    { key: "overview", label: "Ringkasan (Overview)" },
  ];

  return (
    <div className="relative min-h-screen bg-[#F5F5F5] pb-20">
      <DosenSidebar
        categories={categories}
        activeTab={activeTab}
        activeSubCategory={activeSubCategory}
        setActiveTab={setActiveTab}
        setActiveSubCategory={setActiveSubCategory}
        isOwner={isOwner}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <div className="w-full bg-white py-3 border-b border-slate-100 text-center text-sm md:text-[15px] font-medium relative z-20">
        <span className="text-[#1E40AF] hover:underline cursor-pointer">{profileData.university}</span>
        <span className="text-slate-300 mx-2">/</span>
        <span className="text-slate-500">{profileData.program}</span>
      </div>

      <div className="w-full bg-white border-b border-slate-200/80 shadow-sm relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:pl-[280px]">
          <div className="py-8 flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-[#0088CC] flex items-center justify-center text-white text-5xl font-light shadow-inner overflow-hidden">
                <img src={profileData.imageUrl} alt={profileData.name} className="w-full h-full object-cover rounded-full" />
              </div>
            </div>
            <div className="flex-grow">
              <h1 className="text-2xl font-bold text-slate-800 mb-3">{profileData.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-4">
                <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {profileData.university}</div>
                <div className="flex items-center gap-1.5"><GraduationCap className="w-4 h-4" /> {profileData.program}</div>
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4" /> NIDN/NIP:
                  <span className="font-semibold text-slate-700">{profileData.SiwadaId}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {profileData.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium border border-slate-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 flex gap-0 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key);
                  const cat = categories.find((c) => c.id === tab.key);
                  if (cat && cat.subCategories.length > 0) {
                    setActiveSubCategory(cat.subCategories[0].id);
                  }
                }}
                className={`py-4 px-5 text-sm font-semibold border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === tab.key
                  ? "text-[#1E40AF] border-[#1E40AF]"
                  : "text-slate-500 border-transparent hover:text-slate-700"
                  }`}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${activeTab === tab.key ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={`relative z-10 pt-8 pb-12 px-4 sm:px-6 lg:pr-8 ${isSidebarOpen ? "lg:pl-[280px]" : "lg:pl-4"}`}>
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-28 h-28 rounded-full bg-[#0088CC] flex items-center justify-center text-white text-4xl overflow-hidden">
                      <img 
                        src={profileData.imageUrl} 
                        alt={profileData.name} 
                        className="w-full h-full object-cover rounded-full" 
                        onError={(e) => {
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.name)}&background=F3F4F6&color=4B5563`;
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-slate-800">{profileData.name}</h1>
                    <p className="text-sm text-slate-500 mt-2">{profileData.program} • {profileData.university}</p>
                    <p className="mt-4 text-slate-600">{profileData.tags.join(' • ')}</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">ID Akademik & Eksternal</h3>
                  <ul className="text-sm text-slate-500 space-y-2">
                    <li>NIDN/NIP: <strong className="text-slate-700">{profileData.SiwadaId}</strong></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="col-span-1 sm:col-span-2 lg:col-span-1 bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
                <p className="text-xs text-slate-500">Total Publikasi</p>
                <div className="text-2xl font-bold text-slate-800">{totalPublications}</div>
              </div>
              <div className="col-span-1 sm:col-span-2 lg:col-span-1 bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
                <p className="text-xs text-slate-500">Total Sitasi</p>
                <div className="text-2xl font-bold text-slate-800">{totalCitations}</div>
              </div>
              <div className="col-span-1 sm:col-span-2 lg:col-span-1 bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
                <p className="text-xs text-slate-500">Bimbingan Mhs</p>
                <div className="text-2xl font-bold text-slate-800">{bimbinganCount}</div>
              </div>
              <div className="col-span-1 sm:col-span-2 lg:col-span-1 bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
                <p className="text-xs text-slate-500">Skor SINTA 3Thn</p>
                <div className="text-2xl font-bold text-slate-800">{profileData.metrics.sinta3Yr}</div>
              </div>
              <div className="col-span-1 sm:col-span-2 lg:col-span-1 bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
                <p className="text-xs text-slate-500">Skor SINTA Total</p>
                <div className="text-2xl font-bold text-slate-800">{profileData.metrics.sintaOverall}</div>
              </div>
              <div className="col-span-1 sm:col-span-2 lg:col-span-1 bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
                <p className="text-xs text-slate-500">Penelitian</p>
                <div className="text-2xl font-bold text-slate-800">{researchCount}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
                <h4 className="text-sm font-semibold text-slate-700 mb-3">Tren Publikasi & Sitasi</h4>
                <PublicationTrendChart data={profileData.activities.map(a => ({ year: Number(a.year), count: a.count }))} />
              </div>
              <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
                <h4 className="text-sm font-semibold text-slate-700 mb-3">Penelitian & Pengabdian</h4>
                <ResearchBarChart 
                  researchCount={profileData.researchCount} 
                  pengabdianCount={profileData.pengabdianCount} 
                  publicationCount={profileData.publicationCount} 
                />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-slate-800">Publikasi Terbaru</h3>
                <button onClick={() => setActiveTab("publications")} className="text-sm text-slate-700 font-semibold">Lihat semua</button>
              </div>
              <div className="space-y-3">
                {sortedPublications.slice(0, 5).map((pub) => (
                  <PublicationCard key={pub.id} pub={pub} />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "publications" && (
          <div className="space-y-6 animate-[fadeIn_0.3s_ease]">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 pt-5 px-6 border-b border-slate-50 gap-4">
                <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-slate-700" /> Semua Publikasi ({sortedPublications.length})
                </h2>
                <div className="flex items-center gap-2.5 bg-slate-50 p-1.5 rounded-lg border border-slate-100 w-full sm:w-auto">
                  <ArrowUpDown className="w-4 h-4 text-slate-500 ml-1.5" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortType)}
                    className="bg-transparent border-0 text-sm text-slate-700 outline-none pr-6 cursor-pointer font-medium"
                  >
                    <option value="year-desc">Tahun: Terbaru (Descending)</option>
                    <option value="year-asc">Tahun: Terlama (Ascending)</option>
                    <option value="citation-desc">Sitasi: Terbanyak</option>
                  </select>
                </div>
              </div>
              <div className="px-6 pb-6 pt-4 space-y-4">
                {sortedPublications.map((pub) => (
                  <PublicationCard key={pub.id} pub={pub} />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab !== "overview" && activeTab !== "publications" && activeCategory && (
          <div className="animate-[fadeIn_0.3s_ease]">
            <div className="w-full">
              {activeSub ? (
                <ProfileTable
                  key={activeSub.id}
                  activeSub={activeSub}
                  categories={categories}
                  isOwner={isOwner}
                />
              ) : (
                <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-sm border border-slate-100 py-24 text-slate-400">
                  <BookOpen className="w-10 h-10 mb-3 opacity-40" />
                  <p className="text-sm font-medium">Pilih sub-kategori</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 99px; }
        ::-webkit-scrollbar-thumb:hover { background: #94A3B8; }
      `}} />
    </div>
  );
}
