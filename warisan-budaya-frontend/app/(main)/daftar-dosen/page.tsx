"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Search, Filter, X, ChevronLeft, ChevronRight, GraduationCap, Building2, Fingerprint, Calendar, Tags, BarChart3, CheckCircle2, RefreshCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import api from "@/lib/axios";

const ITEMS_PER_PAGE = 5;

const SkeletonCard = () => (
  <Card className="bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden animate-pulse">
    <CardContent className="p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <div className="w-20 h-20 rounded-lg bg-gray-200"></div>
        </div>
        <div className="flex-grow flex flex-col gap-3">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-2">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mt-2"></div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function DaftarDosenPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFakultas, setSelectedFakultas] = useState("");
  const [selectedProdi, setSelectedProdi] = useState("");
  const [statusIkatan, setStatusIkatan] = useState("");
  const [statusAktif, setStatusAktif] = useState("");
  const [sertifikasi, setSertifikasi] = useState("");
  const [agama, setAgama] = useState("");
  const [pendidikan, setPendidikan] = useState("");
  const [golongan, setGolongan] = useState("");
  const [jabatanFungsional, setJabatanFungsional] = useState("");
  const [gender, setGender] = useState("all");
  const [sortBy, setSortBy] = useState("-created_at"); // format API: sort=-created_at
  
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFilterLoading, setIsFilterLoading] = useState(false);

  const [dosenList, setDosenList] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Faculties and programs can be dynamic or static for now
  const allFakultas = ["Fakultas Teknik", "Fakultas MIPA", "Fakultas Kedokteran", "Fakultas Sastra", "Fakultas Ekonomi", "Fakultas Hukum"];
  const allProdis = ["Informatika", "Teknik Elektro", "Biologi", "Kimia", "Fisika", "Matematika", "Kedokteran Umum"];

  const fetchDosen = useCallback(async () => {
    setIsLoading(true);
    try {
      const params: any = {
        page: currentPage,
        per_page: ITEMS_PER_PAGE,
        sort: sortBy,
      };

      if (searchQuery) params.search = searchQuery;
      if (selectedFakultas) params.faculty = selectedFakultas;
      if (selectedProdi) params.study_program = selectedProdi;
      if (statusIkatan) params.status = statusIkatan; // assuming status field maps to this
      if (gender && gender !== "all") params.gender = gender;
      
      const response = await api.get('/public/lecturers', { params });
      
      if (response.data?.data) {
        setDosenList(response.data.data);
        setTotalPages(response.data.meta?.last_page || 1);
        setTotalItems(response.data.meta?.total || 0);
      }
    } catch (error) {
      console.error("Error fetching lecturers:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchQuery, selectedFakultas, selectedProdi, statusIkatan, statusAktif, sertifikasi, agama, pendidikan, golongan, jabatanFungsional, gender, sortBy]);

  useEffect(() => {
    fetchDosen();
  }, [fetchDosen]);

  const handleOpenFilter = () => {
    setIsFilterOpen(true);
    setIsFilterLoading(true);
    setTimeout(() => {
      setIsFilterLoading(false);
    }, 600);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedFakultas("");
    setSelectedProdi("");
    setStatusIkatan("");
    setStatusAktif("");
    setSertifikasi("");
    setAgama("");
    setPendidikan("");
    setGolongan("");
    setJabatanFungsional("");
    setGender("all");
    setCurrentPage(1);
    fetchDosen();
  };

  return (
    <div className="flex flex-col min-h-screen bg-white relative">
      <div className="w-full bg-white px-6 py-8 border-b">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-brand-navy mb-1">Daftar Dosen</h1>
            <p className="text-sm text-gray-500">Daftar seluruh dosen kontributor arsip</p>
          </div>
        </div>
      </div>

      <section className="w-full bg-[#F7F4EF] py-8 px-6 flex-grow">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col md:flex-row gap-3 bg-white p-2.5 rounded-xl shadow-sm border border-gray-100 items-center">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Cari nama atau NIDN/NIP..." 
                  className="pl-11 bg-brand-bg border-gray-200 text-black placeholder:text-gray-400 rounded-lg h-10 w-full focus-visible:ring-1 focus-visible:ring-brand-navy"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setCurrentPage(1);
                      fetchDosen();
                    }
                  }}
                />
              </div>
              
              <Button 
                variant="outline" 
                onClick={handleOpenFilter}
                className="h-10 border-gray-200 bg-brand-bg text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full md:w-auto px-4"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                Filter Pencarian Lanjutan
              </Button>

              <select 
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-10 w-full md:w-[220px] rounded-lg border border-gray-200 bg-brand-bg px-4 py-2 text-sm text-gray-700 outline-none focus:ring-1 focus:ring-brand-navy"
              >
                <option value="-created_at">Urutkan: Tahun Upload (Terbaru)</option>
                <option value="created_at">Urutkan: Tahun Upload (Terlama)</option>
                <option value="-sinta_score_total">SINTA Score Overall (Highest)</option>
                <option value="sinta_score_total">SINTA Score Overall (Lowest)</option>
                <option value="-sinta_score_3yr">SINTA Score 3Yr (Highest)</option>
                <option value="sinta_score_3yr">SINTA Score 3Yr (Lowest)</option>
              </select>
            </div>
            
            <div className="text-sm text-gray-600 font-medium">
              <span className="text-brand-navy">Halaman {currentPage} dari {totalPages || 1}</span> | Total Dosen {totalItems}
            </div>
          </div>


          <div className="flex flex-col gap-4">
            {isLoading ? (
              Array.from({ length: ITEMS_PER_PAGE }).map((_, idx) => (
                <SkeletonCard key={idx} />
              ))
            ) : dosenList.length > 0 ? (
              dosenList.map((dosen) => (
                <Card key={dosen.id} className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow rounded-xl">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      
                      <div className="flex-shrink-0">
                        <img 
                          src={dosen.photo_url || "https://ui-avatars.com/api/?name=" + encodeURIComponent(dosen.name) + "&background=F3F4F6&color=4B5563"} 
                          alt={`Avatar ${dosen.name}`} 
                          className="w-20 h-20 rounded-lg object-cover bg-gray-100"
                          onError={(e) => {
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(dosen.name)}&background=F3F4F6&color=4B5563`;
                          }}
                        />
                      </div>

                      <div className="flex-grow flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                          <Link href={`/dosen/${dosen.id}`}>
                            <h3 className="text-lg font-bold text-brand-navy hover:underline cursor-pointer transition-colors hover:text-blue-700">
                              {dosen.title_prefix} {dosen.name} {dosen.title_suffix}
                            </h3>
                          </Link>
                          {dosen.is_verified && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2"><GraduationCap className="h-4 w-4" /> {dosen.study_program || '-'}</div>
                          <div className="flex items-center gap-2"><Building2 className="h-4 w-4" /> {dosen.faculty || '-'}</div>
                          <div className="flex items-center gap-2"><Fingerprint className="h-4 w-4" /> NIDN: <strong>{dosen.nidn || '-'}</strong></div>
                          <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Bergabung: <strong>{new Date(dosen.created_at || Date.now()).getFullYear()}</strong></div>
                        </div>

                        <div className="flex items-start gap-2 mt-1">
                          <BarChart3 className="h-4 w-4 text-gray-400 mt-1" />
                          <div className="flex flex-wrap gap-y-1 gap-x-4 text-xs">
                            <span className="text-gray-500 font-medium pt-0.5">Metrics:</span>
                            <span className="text-gray-600">Scopus ID: <strong>{dosen.scopus_id || '-'}</strong></span>
                            <span className="text-gray-600">Google Scholar: <strong>{dosen.google_scholar_id || '-'}</strong></span>
                            <span className="text-gray-600">SINTA ID: <strong>{dosen.sinta_id || '-'}</strong></span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-center md:min-w-[150px] mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-gray-100 pl-0 md:pl-6">
                        <div className="text-right mb-4">
                          <div className="text-3xl font-bold text-brand-navy">{dosen.sinta_score_3yr || 0}</div>
                          <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">SINTA Score 3Yr</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-brand-navy">{dosen.sinta_score_total || 0}</div>
                          <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">SINTA Score Overall</div>
                        </div>
                      </div>

                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-10 text-gray-500 bg-white rounded-xl shadow-sm">
                Pencarian tidak ditemukan.
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handlePrev} 
                disabled={currentPage === 1}
                className="text-gray-600"
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pageNumber = idx + 1;
                  return (
                    <Button
                      key={pageNumber}
                      variant={pageNumber === currentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNumber)}
                      className={pageNumber === currentPage ? "bg-brand-navy text-white" : "text-gray-600"}
                    >
                      {pageNumber}
                    </Button>
                  );
                })}
              </div>

              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleNext} 
                disabled={currentPage === totalPages}
                className="text-gray-600"
              >
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}

        </div>
      </section>

      {isFilterOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-[fadeIn_0.2s_ease-out_forwards]">
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideDown {
              from {
                opacity: 0;
                transform: translateY(-40px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-slide-down {
              animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
          `}} />
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl flex flex-col max-h-[90vh] overflow-hidden animate-slide-down">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                <h2 className="text-lg font-semibold">Filter Pencarian Lanjutan</h2>
              </div>
              <button onClick={() => setIsFilterOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5"/>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <h3 className="text-center text-sm font-bold text-gray-700 uppercase tracking-widest mb-4">Filter Data Dosen</h3>
              <div className="border-b mb-6"></div>
              
              <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Cari ..." 
                  className="pl-11 bg-white border-0 border-b border-gray-200 rounded-none shadow-none focus-visible:ring-0 text-black placeholder:text-gray-400 h-12 w-full text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {isFilterLoading ? (
                <div className="flex flex-col gap-6 animate-pulse">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr_2fr] gap-4 items-center">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                      <div className="h-10 bg-gray-100 rounded w-full"></div>
                      <div className="hidden md:block h-4 bg-gray-200 rounded w-24"></div>
                      <div className="h-10 bg-gray-100 rounded w-full"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr_2fr] gap-4 items-center">
                  <div className="text-sm font-medium text-gray-700">Unit Kerja</div>
                  <select 
                    value={selectedFakultas}
                    onChange={(e) => setSelectedFakultas(e.target.value)}
                    className="w-full border-b border-gray-200 py-2 text-sm text-gray-500 outline-none focus:border-[#1E90FF]"
                  >
                    <option value="">Pilih Fakultas</option>
                    {allFakultas.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                  <div className="hidden md:block"></div>
                  <select 
                    value={selectedProdi}
                    onChange={(e) => setSelectedProdi(e.target.value)}
                    className="w-full border-b border-gray-200 py-2 text-sm text-gray-500 outline-none focus:border-[#1E90FF]"
                  >
                    <option value="">Pilih Jurusan</option>
                    {allProdis.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr_2fr] gap-4 items-center">
                  <div className="text-sm font-medium text-gray-700">Status Dosen</div>
                  <select 
                    value={statusIkatan}
                    onChange={(e) => setStatusIkatan(e.target.value)}
                    className="w-full border-b border-gray-200 py-2 text-sm text-gray-500 outline-none focus:border-[#1E90FF]"
                  >
                    <option value="">Pilih Status Ikatan Kerja</option>
                    <option value="tetap">Tetap</option>
                    <option value="tidak-tetap">Tidak Tetap</option>
                  </select>
                  <div className="hidden md:block"></div>
                  <select 
                    value={statusAktif}
                    onChange={(e) => setStatusAktif(e.target.value)}
                    className="w-full border-b border-gray-200 py-2 text-sm text-gray-500 outline-none focus:border-[#1E90FF]"
                  >
                    <option value="">Pilih Status Dosen Saat Ini</option>
                    <option value="aktif">Aktif</option>
                    <option value="cuti">Cuti</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr_2fr] gap-4 items-center">
                  <div className="text-sm font-medium text-gray-700">Sertifikasi</div>
                  <select 
                    value={sertifikasi}
                    onChange={(e) => setSertifikasi(e.target.value)}
                    className="w-full border-b border-gray-200 py-2 text-sm text-gray-500 outline-none focus:border-[#1E90FF]"
                  >
                    <option value="">Pilih Sertifikasi Dosen</option>
                    <option value="tersertifikasi">Tersertifikasi</option>
                    <option value="belum">Belum</option>
                  </select>
                  <div className="text-sm font-medium text-gray-700">Agama</div>
                  <select 
                    value={agama}
                    onChange={(e) => setAgama(e.target.value)}
                    className="w-full border-b border-gray-200 py-2 text-sm text-gray-500 outline-none focus:border-[#1E90FF]"
                  >
                    <option value="">Pilih Agama</option>
                    <option value="islam">Islam</option>
                    <option value="kristen">Kristen</option>
                    <option value="katolik">Katolik</option>
                    <option value="hindu">Hindu</option>
                    <option value="budha">Budha</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr_2fr] gap-4 items-center">
                  <div className="text-sm font-medium text-gray-700">Pendidikan</div>
                  <select 
                    value={pendidikan}
                    onChange={(e) => setPendidikan(e.target.value)}
                    className="w-full border-b border-gray-200 py-2 text-sm text-gray-500 outline-none focus:border-[#1E90FF]"
                  >
                    <option value="">Pilih Tingkat Pendidikan</option>
                    <option value="s2">S2</option>
                    <option value="s3">S3</option>
                  </select>
                  <div className="text-sm font-medium text-gray-700">Golongan</div>
                  <select 
                    value={golongan}
                    onChange={(e) => setGolongan(e.target.value)}
                    className="w-full border-b border-gray-200 py-2 text-sm text-gray-500 outline-none focus:border-[#1E90FF]"
                  >
                    <option value="">Pilih Golongan</option>
                    <option value="iii">III</option>
                    <option value="iv">IV</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr_2fr] gap-4 items-center">
                  <div className="text-sm font-medium text-gray-700">Jabatan Fungsional</div>
                  <select 
                    value={jabatanFungsional}
                    onChange={(e) => setJabatanFungsional(e.target.value)}
                    className="w-full border-b border-gray-200 py-2 text-sm text-gray-500 outline-none focus:border-[#1E90FF]"
                  >
                    <option value="">Pilih Jabatan Fungsional</option>
                    <option value="asisten-ahli">Asisten Ahli</option>
                    <option value="lektor">Lektor</option>
                    <option value="lektor-kepala">Lektor Kepala</option>
                    <option value="guru-besar">Guru Besar</option>
                  </select>
                  <div className="text-sm font-medium text-gray-700">Jenis Kelamin:</div>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="gender" 
                        value="L" 
                        checked={gender === "L"}
                        onChange={() => setGender("L")}
                        className="w-4 h-4 text-[#1E90FF]" 
                      />
                      <span className="text-sm text-gray-600">Laki-Laki</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="gender" 
                        value="P" 
                        checked={gender === "P"}
                        onChange={() => setGender("P")}
                        className="w-4 h-4 text-[#1E90FF]" 
                      />
                      <span className="text-sm text-gray-600">Perempuan</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="gender" 
                        value="all" 
                        checked={gender === "all"}
                        onChange={() => setGender("all")}
                        className="w-4 h-4 text-[#1E90FF]" 
                      />
                      <span className="text-sm text-gray-600">Semua</span>
                    </label>
                  </div>
                </div>

                </div>
              )}
            </div>
            
            <div className="p-4 border-t flex flex-col sm:flex-row justify-end items-center gap-4 bg-white shrink-0 mt-4">
              <button onClick={resetFilters} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 font-medium sm:mr-auto">
                <RefreshCcw className="w-4 h-4"/> REFRESH PENCARIAN LANJUTAN
              </button>
              <button onClick={() => setIsFilterOpen(false)} className="text-sm font-bold text-gray-700 hover:text-gray-900 px-4">
                TUTUP
              </button>
              <Button onClick={() => { setIsFilterOpen(false); setCurrentPage(1); fetchDosen(); }} className="bg-[#1E90FF] hover:bg-blue-600 text-white rounded-full px-8 py-5 flex items-center gap-2 font-bold">
                <Search className="w-4 h-4" /> CARI
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
