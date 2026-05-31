"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  MapPin, GraduationCap, User, BarChart2, TrendingUp,
  FileText, ChevronRight, ArrowUpDown, Eye, EyeOff,
  BookOpen, Settings,
} from "lucide-react";

import Loading from "./loading";
import type { TabType, SortType, Category } from "./types";
import { initialCategories, dummyProfileData } from "./data";
import ProfileTable from "./_components/ProfileTable";
import PublicationCard from "./_components/PublicationCard";

export default function DosenProfilePage() {
  const params = useParams();
  const _id = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [sortBy, setSortBy] = useState<SortType>("year-desc");
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [activeSubCategory, setActiveSubCategory] = useState<string>("pendidikan-formal");

  const isOwner = true;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Loading />;

  const profileData = dummyProfileData;

  const sortedPublications = [...profileData.publications].sort((a, b) => {
    if (sortBy === "year-desc") return b.year - a.year;
    if (sortBy === "year-asc") return a.year - b.year;
    if (sortBy === "citation-desc") return b.citations - a.citations;
    return 0;
  });

  const activeCategory = categories.find((c) => c.id === activeTab);
  const activeSub = (() => {
    if (!activeCategory) return null;
    const sub = activeCategory.subCategories.find((s) => s.id === activeSubCategory);
    return sub || activeCategory.subCategories[0];
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
    { key: "publications", label: "Publikasi", count: profileData.publications.length },
    ...categories.map(cat => ({ key: cat.id, label: cat.label })),
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5] relative pb-20">

      <div className="w-full bg-white py-3 border-b border-slate-100 text-center text-sm md:text-[15px] font-medium relative z-20">
        <span className="text-[#1E40AF] hover:underline cursor-pointer">Universitas Udayana</span>
        <span className="text-slate-300 mx-2">/</span>
        <span className="text-slate-500">Laboratorium Warisan Budaya Digital</span>
      </div>


      <div className="w-full bg-white border-b border-slate-200/80 shadow-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  <User className="w-4 h-4" /> SIWADA ID:
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


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8">
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="pb-2 pt-5 px-6 border-b border-slate-50 mb-4">
                  <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                    <BarChart2 className="w-5 h-5 text-slate-700" /> Metrik Peneliti
                  </h2>
                </div>
                <div className="px-6 pb-6">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "SINTA SCORE\nOVERALL", value: profileData.metrics.sintaOverall, large: true },
                      { label: "SINTA SCORE\n3YR", value: profileData.metrics.sinta3Yr, large: true },
                      { label: "SCOPUS H-\nINDEX", value: profileData.metrics.scopusHIndex, large: false },
                      { label: "WOS H-INDEX\n\u00a0", value: profileData.metrics.wosHIndex, large: false },
                    ].map((m, i) => (
                      <div key={i} className="bg-[#F8FAFC] border border-slate-100 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                        <span className="text-[10px] text-slate-400 font-bold tracking-wider mb-2 whitespace-pre-line">{m.label}</span>
                        <span className={`font-bold text-slate-800 ${m.large ? "text-2xl" : "text-xl"}`}>{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="pb-4 pt-5 px-6">
                  <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-slate-700" /> Aktivitas Terbaru
                  </h2>
                </div>
                <div className="px-8 pb-8">
                  <div className="relative border-l-2 border-slate-200 ml-4 mt-2 space-y-8">
                    {profileData.activities.map((act, idx) => (
                      <div key={idx} className="relative pl-6">
                        <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-700 border-4 border-white shadow-sm" />
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-bold text-slate-700">{act.year}</span>
                          <div className="bg-slate-100 rounded px-2 py-1 flex items-center gap-1 border border-slate-200">
                            <span className="text-sm font-bold text-slate-600">{act.count}</span>
                            <span className="text-[10px] text-slate-500 font-medium">Publikasi</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-slate-100">
                <div className="flex flex-row items-center justify-between pb-4 pt-5 px-6 border-b border-slate-50 mb-2">
                  <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-slate-700" /> Publikasi Terbaru
                  </h2>
                  <button onClick={() => setActiveTab("publications")} className="text-sm text-slate-700 hover:text-slate-900 font-semibold flex items-center gap-1">
                    Lihat Semua <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="px-6 pb-6 pt-2 space-y-4">
                  {sortedPublications.slice(0, 3).map((pub) => (
                    <PublicationCard key={pub.id} pub={pub} />
                  ))}
                </div>
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
            {isOwner && (
              <div className="mb-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl px-5 py-3.5">
                <div className="flex items-center gap-2 text-blue-700">
                  <Settings className="w-4 h-4" />
                  <span className="text-sm font-semibold">Mode Pengelolaan Profil</span>
                </div>
                <span className="text-xs text-blue-600">
                  Atur visibilitas setiap sub-kategori dengan tombol <Eye className="inline w-3.5 h-3.5 mx-0.5" /> / <EyeOff className="inline w-3.5 h-3.5 mx-0.5" />.
                  Saat ini <span className="font-bold">{totalVisible} dari {totalSubCats}</span> sub-kategori ditampilkan ke publik.
                </span>
              </div>
            )}

            <div className="flex flex-col lg:flex-row gap-6 items-start">

              <div className="w-full lg:w-64 flex-shrink-0 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0">
                {activeCategory.subCategories.map((sub) => {
                  const isActive = activeSub?.id === sub.id;
                  return (
                    <div
                      key={sub.id}
                      className={`flex items-center justify-between gap-1 p-1 lg:p-1.5 rounded-xl border transition-all w-full min-w-[200px] lg:min-w-0 ${isActive
                        ? "bg-[#1E40AF]/5 border-[#1E40AF]/20"
                        : "bg-white border-slate-200/60 hover:bg-slate-50"
                        }`}
                    >
                      <button
                        onClick={() => setActiveSubCategory(sub.id)}
                        className={`flex-grow text-left px-3 py-2 text-xs md:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap lg:whitespace-normal ${isActive
                          ? "text-[#1E40AF]"
                          : "text-slate-600"
                          } ${!sub.visible && !isOwner ? "opacity-40" : ""}`}
                      >
                        {sub.label}
                        {!sub.visible && isOwner && (
                          <span className="block mt-0.5 text-[10px] text-orange-600 font-bold">(Tersembunyi)</span>
                        )}
                      </button>
                      {isOwner && (
                        <button
                          title={sub.visible ? "Sembunyikan dari publik" : "Tampilkan ke publik"}
                          onClick={() => handleToggleVisibility(activeCategory.id, sub.id)}
                          className={`p-1.5 rounded-lg flex-shrink-0 transition-colors ${sub.visible ? "text-green-600 hover:bg-green-100/50" : "text-slate-400 hover:bg-slate-100"}`}
                        >
                          {sub.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>


              <div className="flex-1 w-full min-w-0">
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
