"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Mail, Globe, MapPin, GraduationCap, User, BarChart2, TrendingUp, FileText, ChevronRight, ArrowUpDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Loading from "./loading";

export default function DosenProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "publications">("overview");
  const [sortBy, setSortBy] = useState<"year-desc" | "year-asc" | "citation-desc">("year-desc");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const profileData = {
    name: "Galang Mahessa",
    imageUrl: "/adri.png",
    university: "Universitas Udayana",
    program: "S1 - Informatika",
    SiwadaId: "6000208",
    tags: [
      "Data Science",
      "Chemoinformatics",
      "Machine Learning",
      "Computational Chemistry",
      "Modeling and Simulation",
    ],
    metrics: {
      sintaOverall: "4,025",
      sinta3Yr: "888",
      scopusHIndex: "11",
      wosHIndex: "7",
    },
    activities: [
      { year: "2025", count: 3 },
      { year: "2024", count: 5 },
      { year: "2023", count: 2 },
    ],
    publications: [
      {
        id: 1,
        title: "Detecting Alzheimer's Based on MRI Medical Images by Using External Attention Transformer",
        venue: "Jurnal RESTI (Rekayasa Sistem dan Teknologi Informasi)",
        year: 2025,
        authorOrder: "2 of 2",
        type: "Journal Article",
        citations: 0,
      },
      {
        id: 2,
        title: "Implementation of Firefly Algorithm-Support Vector Machine in Classifying Clinical Trial Toxicity",
        venue: "2025 International Conference on Information and Communication Technology",
        year: 2025,
        authorOrder: "3 of 4",
        type: "Conference",
        citations: 1,
      },
      {
        id: 3,
        title: "In silico-based MMP-9 Inhibitors Prediction as Anti Cancer Therapeutics by using Particle Swarm Optimization-XGBoost",
        venue: "Proceedings Ic2ie 2025 8th International Conference",
        year: 2025,
        authorOrder: "2 of 2",
        type: "Conference",
        citations: 0,
      },
    ],
  };

  if (isLoading) {
    return <Loading />;
  }

  const sortedPublications = [...profileData.publications].sort((a, b) => {
    if (sortBy === "year-desc") {
      return b.year - a.year;
    }
    if (sortBy === "year-asc") {
      return a.year - b.year;
    }
    if (sortBy === "citation-desc") {
      return b.citations - a.citations;
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#F5F5F5] relative pb-20">
      <div className="w-full bg-white py-3 border-b border-slate-100 text-center text-sm md:text-[15px] font-medium relative z-20">
        <span className="text-[#1E40AF] hover:underline cursor-pointer">Universitas Udayana</span>
        <span className="text-slate-300 mx-2">/</span>
        <span className="text-slate-500">Laboratorium Warisan Budaya Digital</span>
      </div>

      <div className="absolute top-[45px] left-0 right-0 h-64 bg-[#E8EDF2] z-0">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16">
        <Card className="bg-white rounded-xl shadow-sm border-0 overflow-hidden mb-8">
          <CardContent className="p-0">
            <div className="p-8 flex flex-col md:flex-row gap-8 items-start md:items-center">
  
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full bg-[#0088CC] flex items-center justify-center text-white text-5xl font-light shadow-inner">
                  <img src={profileData.imageUrl} alt={profileData.name} className="w-full h-full object-cover rounded-full" />
                </div>
              </div>
              <div className="flex-grow">
                <h1 className="text-2xl font-bold text-slate-800 mb-3">{profileData.name}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-4">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" /> {profileData.university}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4" /> {profileData.program}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4" /> SIWADA ID: <span className="font-semibold text-slate-700">{profileData.SiwadaId}</span>
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

              <div>
              </div>
            </div>

            <div className="border-t border-slate-100 px-8 flex gap-8">
              <button 
                onClick={() => setActiveTab("overview")}
                className={`py-4 text-sm font-semibold border-b-2 transition-all ${
                  activeTab === "overview" 
                    ? "text-slate-800 border-slate-800" 
                    : "text-slate-500 border-transparent hover:text-slate-700"
                }`}
              >
                Ringkasan (Overview)
              </button>
              <button 
                onClick={() => setActiveTab("publications")}
                className={`py-4 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
                  activeTab === "publications" 
                    ? "text-slate-800 border-slate-800" 
                    : "text-slate-500 border-transparent hover:text-slate-700"
                }`}
              >
                Publikasi 
                <span className="bg-slate-100 px-2 py-0.5 rounded-full text-xs text-slate-600 font-bold">
                  {profileData.publications.length}
                </span>
              </button>
            </div>
          </CardContent>
        </Card>
        {activeTab === "overview" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-6">
              <Card className="rounded-xl shadow-sm border-slate-100 bg-white">
                <CardHeader className="pb-2 pt-5 px-6 border-b border-slate-50 mb-4">
                  <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
                    <BarChart2 className="w-5 h-5 text-slate-700" /> Metrik Peneliti
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#F8FAFC] border border-slate-100 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                      <span className="text-[10px] text-slate-400 font-bold tracking-wider mb-2">SINTA SCORE<br />OVERALL</span>
                      <span className="text-2xl font-bold text-slate-800">{profileData.metrics.sintaOverall}</span>
                    </div>
                    <div className="bg-[#F8FAFC] border border-slate-100 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                      <span className="text-[10px] text-slate-400 font-bold tracking-wider mb-2">SINTA SCORE<br />3YR</span>
                      <span className="text-2xl font-bold text-slate-800">{profileData.metrics.sinta3Yr}</span>
                    </div>
                    <div className="bg-white border border-slate-100 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                      <span className="text-[10px] text-slate-400 font-bold tracking-wider mb-2">SCOPUS H-<br />INDEX</span>
                      <span className="text-xl font-bold text-slate-700">{profileData.metrics.scopusHIndex}</span>
                    </div>
                    <div className="bg-white border border-slate-100 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                      <span className="text-[10px] text-slate-400 font-bold tracking-wider mb-2">WOS H-INDEX<br />{"\u00a0"}</span>
                      <span className="text-xl font-bold text-slate-700">{profileData.metrics.wosHIndex}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-xl shadow-sm border-slate-100 bg-white">
                <CardHeader className="pb-4 pt-5 px-6">
                  <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-slate-700" /> Aktivitas Terbaru
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <div className="relative border-l-2 border-slate-200 ml-4 mt-2 space-y-8">
                    {profileData.activities.map((act, idx) => (
                      <div key={idx} className="relative pl-6">
                        <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-700 border-4 border-white shadow-sm"></div>
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
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <Card className="rounded-xl shadow-sm border-slate-100 bg-white h-full animate-[fadeIn_0.3s_ease]">
                <CardHeader className="flex flex-row items-center justify-between pb-4 pt-5 px-6 border-b border-slate-50 mb-2">
                  <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-slate-700" /> Publikasi Terbaru
                  </CardTitle>
                  <button 
                    onClick={() => setActiveTab("publications")}
                    className="text-sm text-slate-700 hover:text-slate-900 font-semibold flex items-center gap-1"
                  >
                    Lihat Semua <ChevronRight className="w-4 h-4" />
                  </button>
                </CardHeader>
                <CardContent className="px-6 pb-6 pt-2 space-y-4">
                  {sortedPublications.slice(0, 3).map((pub) => (
                    <div key={pub.id} className="border border-slate-100 rounded-xl p-5 hover:shadow-md transition-shadow bg-white flex justify-between items-start gap-4">
                      <div className="space-y-3 flex-grow">
                        <h3 className="text-[15px] font-semibold text-slate-800 leading-snug">
                          {pub.title}
                        </h3>
                        <p className="text-sm text-slate-600">{pub.venue}</p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                          <span className="bg-slate-100 px-2 py-1 rounded font-medium text-slate-600">{pub.year}</span>
                          <div className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5" /> Author Order: {pub.authorOrder}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5" /> {pub.type}
                          </div>
                        </div>
                      </div>

                      <div className="flex-shrink-0 flex flex-col items-center justify-center border border-slate-100 rounded-lg w-16 h-16 bg-[#FAFAFA]">
                        <span className="text-xl font-bold text-slate-700 leading-none mb-1">{pub.citations}</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Citasi</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-[fadeIn_0.3s_ease]">
            <Card className="rounded-xl shadow-sm border-slate-100 bg-white">
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 pt-5 px-6 border-b border-slate-50 gap-4">
                <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-slate-700" /> Semua Publikasi ({sortedPublications.length})
                </CardTitle>
                
                <div className="flex items-center gap-2.5 bg-slate-50 p-1.5 rounded-lg border border-slate-100 w-full sm:w-auto">
                  <ArrowUpDown className="w-4 h-4 text-slate-500 ml-1.5" />
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-transparent border-0 text-sm text-slate-700 outline-none pr-6 cursor-pointer font-medium"
                  >
                    <option value="year-desc">Tahun: Terbaru (Descending)</option>
                    <option value="year-asc">Tahun: Terlama (Ascending)</option>
                    <option value="citation-desc">Sitasi: Terbanyak</option>
                  </select>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-4 space-y-4">
                {sortedPublications.map((pub) => (
                  <div key={pub.id} className="border border-slate-100 rounded-xl p-5 hover:shadow-md transition-shadow bg-white flex justify-between items-start gap-4">
                    <div className="space-y-3 flex-grow">
                      <h3 className="text-[15px] font-semibold text-slate-800 leading-snug">
                        {pub.title}
                      </h3>
                      <p className="text-sm text-slate-600">{pub.venue}</p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                        <span className="bg-slate-100 px-2 py-1 rounded font-medium text-slate-600">{pub.year}</span>
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5" /> Author Order: {pub.authorOrder}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5" /> {pub.type}
                        </div>
                      </div>
                    </div>

                    <div className="flex-shrink-0 flex flex-col items-center justify-center border border-slate-100 rounded-lg w-16 h-16 bg-[#FAFAFA]">
                      <span className="text-xl font-bold text-slate-700 leading-none mb-1">{pub.citations}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Citasi</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
