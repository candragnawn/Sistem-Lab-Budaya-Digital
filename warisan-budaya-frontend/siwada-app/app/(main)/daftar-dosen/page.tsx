"use client";
import { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight, CheckCircle2, GraduationCap, Building2, Fingerprint, Tags, BarChart3 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";


const DUMMY_DOSEN = [
  {
    id: "1",
    name: "Kadek Pasek Divandra Kusuma",
    verified: true,
    prodi: "Prodi Informatika",
    fakultas: "Fakultas MIPA",
    ivanarsipId: "5678901",
    subjects: ["Arsitektur Bali", "Sejarah", "Model Generatif"],
    metrics: {
      scopusHIndex: 11,
      googleScholarHIndex: 23,
      googleScholarI10Index: 63,
    },
    sintaScore3Yr: "1.124",
    sintaScoreOverall: "3.456",
    avatar: "/adri.png",
  },
  {
    id: "2",
    name: "Dr. IPM, ASEAN eng Made Mahatmika Adriananda Kusuma, S.Kom, M.MalDev",
    verified: true,
    prodi: "Prodi Informatika",
    fakultas: "Fakultas MIPA",
    ivanarsipId: "6789012",
    subjects: ["Manuskrip", "Arkeologi", "Aksara Bali"],
    metrics: {
      scopusHIndex: 8,
      googleScholarHIndex: 15,
      googleScholarI10Index: 47,
    },
    sintaScore3Yr: "892",
    sintaScoreOverall: "2.341",
    avatar: "/adri.png",
  },
  {
    id: "3",
    name: "Ni Made Ayu Lestari, S.S., M.A.",
    verified: true,
    prodi: "Prodi Informatika",
    fakultas: "Fakultas MIPA",
    ivanarsipId: "7890123",
    subjects: ["Publikasi", "Sastra Lisan", "Lontar"],
    metrics: {
      scopusHIndex: 7,
      googleScholarHIndex: 13,
      googleScholarI10Index: 38,
    },
    sintaScore3Yr: "756",
    sintaScoreOverall: "1.987",
    avatar: "/adri.png",
  },
  {
    id: "4",
    name: "Ida Bagus Komang Suryawan, S.T., M.T.",
    verified: true,
    prodi: "Prodi Informatika",
    fakultas: "Fakultas MIPA",
    ivanarsipId: "8901234",
    subjects: ["Arsitektur Bali", "Model Generatif", "CAD"],
    metrics: {
      scopusHIndex: 8,
      googleScholarHIndex: 8,
      googleScholarI10Index: 29,
    },
    sintaScore3Yr: "634",
    sintaScoreOverall: "1.456",
    avatar: "/adri.png",
  },
  {
    id: "5",
    name: "Prof. Dr. I Nyoman Darma Putra, M.Litt.",
    verified: true,
    prodi: "Prodi Sastra Indonesia",
    fakultas: "Fakultas Ilmu Budaya",
    ivanarsipId: "9012345",
    subjects: ["Sastra Modern", "Pariwisata Budaya"],
    metrics: {
      scopusHIndex: 12,
      googleScholarHIndex: 28,
      googleScholarI10Index: 75,
    },
    sintaScore3Yr: "1.250",
    sintaScoreOverall: "4.100",
    avatar: "/adri.png",
  },
  {
    id: "6",
    name: "Luh Putu Sendi, S.Sn., M.Sn.",
    verified: false,
    prodi: "Prodi Seni Karawitan",
    fakultas: "Fakultas Seni Pertunjukan",
    ivanarsipId: "1122334",
    subjects: ["Karawitan Bali", "Seni Vokal"],
    metrics: {
      scopusHIndex: 2,
      googleScholarHIndex: 5,
      googleScholarI10Index: 10,
    },
    sintaScore3Yr: "120",
    sintaScoreOverall: "450",
    avatar: "/adri.png",
  },
];

const ITEMS_PER_PAGE = 3;

const SkeletonCard = () => (
  <Card className="bg-white border border-gray-100 shadow-sm rounded-xl">
    <CardContent className="p-6">
      <div className="flex flex-col md:flex-row gap-6 animate-pulse">
        <div className="flex-shrink-0">
          <div className="w-20 h-20 rounded-lg bg-gray-200"></div>
        </div>
        <div className="flex-grow flex flex-col gap-3">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 mt-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mt-2"></div>
        </div>
        <div className="flex flex-col items-end justify-center md:min-w-[150px] mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-gray-100 pl-0 md:pl-6">
          <div className="text-right mb-4 flex flex-col items-end gap-1 w-full">
            <div className="h-8 bg-gray-200 rounded w-16"></div>
            <div className="h-3 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="text-right flex flex-col items-end gap-1 w-full">
            <div className="h-6 bg-gray-200 rounded w-12"></div>
            <div className="h-3 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function DaftarDosenPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400); 
    return () => clearTimeout(timer);
  }, [currentPage, searchQuery]);

  const filteredDosen = DUMMY_DOSEN.filter((dosen) =>
    dosen.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDosen.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = filteredDosen.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="w-full bg-white px-6 py-8 border-b">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#1E3A5F] mb-1">Daftar Dosen</h1>
            <p className="text-sm text-gray-500">Daftar seluruh dosen kontributor arsip</p>
          </div>

        </div>
      </div>

      <section className="w-full bg-[#F7F4EF] py-8 px-6 flex-grow">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col md:flex-row gap-3 bg-white p-2.5 rounded-xl shadow-sm border border-gray-100">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Cari nama atau ID kontributor..." 
                  className="pl-11 bg-[#FDFBF7] border-gray-200 text-black placeholder:text-gray-400 rounded-lg h-10 w-full focus-visible:ring-1 focus-visible:ring-[#1E3A5F]"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              
              <select className="h-10 w-full md:w-[220px] rounded-lg border border-gray-200 bg-[#FDFBF7] px-4 py-2 text-sm text-gray-700 outline-none focus:ring-1 focus:ring-[#1E3A5F]">
                <option value="">Semua Prodi</option>
                <option value="sejarah">Sejarah</option>
                <option value="arkeologi">Arkeologi</option>
              </select>

              <select className="h-10 w-full md:w-[180px] rounded-lg border border-gray-200 bg-[#FDFBF7] px-4 py-2 text-sm text-gray-700 outline-none focus:ring-1 focus:ring-[#1E3A5F]">
                <option value="">Semua Subjek</option>
                <option value="arsitektur">Arsitektur Bali</option>
                <option value="sastra">Sastra</option>
              </select>
            </div>
            <div className="text-sm text-gray-600 font-medium">
              <span className="text-[#1E3A5F]">Halaman {currentPage} dari {totalPages || 1}</span> | Total Dosen {filteredDosen.length}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {isLoading ? (
              Array.from({ length: ITEMS_PER_PAGE }).map((_, idx) => (
                <SkeletonCard key={idx} />
              ))
            ) : currentData.length > 0 ? (
              currentData.map((dosen) => (
                <Card key={dosen.id} className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow rounded-xl">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      
                      <div className="flex-shrink-0">
                        <img 
                          src={dosen.avatar} 
                          alt={`Avatar ${dosen.name}`} 
                          className="w-20 h-20 rounded-lg object-cover bg-gray-100"
                        />
                      </div>

                      <div className="flex-grow flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-[#1E3A5F]">{dosen.name}</h3>
                          {dosen.verified && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2"><GraduationCap className="h-4 w-4" /> {dosen.prodi}</div>
                          <div className="flex items-center gap-2"><Building2 className="h-4 w-4" /> {dosen.fakultas}</div>
                          <div className="flex items-center gap-2"><Fingerprint className="h-4 w-4" /> SIWADA ID: <strong>{dosen.ivanarsipId}</strong></div>
                        </div>

                        <div className="flex items-start gap-2 mt-1">
                          <Tags className="h-4 w-4 text-gray-400 mt-1" />
                          <div className="flex flex-wrap gap-2 text-xs">
                            <span className="text-gray-500 font-medium pt-0.5 mr-1">Subjects:</span>
                            {dosen.subjects.map((sub, idx) => (
                              <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md border border-gray-200">
                                {sub}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-start gap-2 mt-1">
                          <BarChart3 className="h-4 w-4 text-gray-400 mt-1" />
                          <div className="flex flex-wrap gap-y-1 gap-x-4 text-xs">
                            <span className="text-gray-500 font-medium pt-0.5">Metrics:</span>
                            <span className="text-gray-600">Scopus H-Index: <strong>{dosen.metrics.scopusHIndex}</strong></span>
                            <span className="text-gray-600">Google Scholar H-Index: <strong>{dosen.metrics.googleScholarHIndex}</strong></span>
                            <span className="text-gray-600">Google Scholar i10-index: <strong>{dosen.metrics.googleScholarI10Index}</strong></span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-center md:min-w-[150px] mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-gray-100 pl-0 md:pl-6">
                        <div className="text-right mb-4">
                          <div className="text-3xl font-bold text-[#1E3A5F]">{dosen.sintaScore3Yr}</div>
                          <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">SINTA Score 3Yr</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-[#1E3A5F]">{dosen.sintaScoreOverall}</div>
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

          {totalPages > 0 && (
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
                      className={pageNumber === currentPage ? "bg-[#1E3A5F] text-white" : "text-gray-600"}
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
    </div>
  );
}
