import { Dosen } from '@/types';
import { PageTransition } from '@/components/ui/PageTransition';
import { DosenListClient } from '@/components/dosen/DosenListClient';

// Dummy Data
const dosenList: Dosen[] = [
  {
    id: "5678901",
    name: "Koncet",
    isVerified: true,
    avatarUrl: "https://via.placeholder.com/150",
    prodi: "Sejarah",
    fakultas: "Ilmu Budaya",
    subjects: ["Arsitektur Bali", "Sejarah", "Model Generatif"],
    metrics: { scopusHIndex: 11, gsHIndex: 23, gsi10Index: 63 },
    sinta3yr: "1.124",
    sintaOverall: "3.456",
    joinDate: "2023-01-15"
  },
  {
    id: "6789012",
    name: "Dr. IPM, ASEAN eng Made Mahatmika Adriananda Kusuma, S.Kom, M.MalDev",
    isVerified: true,
    avatarUrl: null,
    prodi: "Arkeologi",
    fakultas: "Ilmu Budaya",
    subjects: ["Manuskrip", "Arkeologi", "Aksara Bali"],
    metrics: { scopusHIndex: 8, gsHIndex: 15, gsi10Index: 47 },
    sinta3yr: "892",
    sintaOverall: "2.341",
    joinDate: "2023-05-01"
  },
  {
    id: "7890123",
    name: "Ayu Putri",
    isVerified: false,
    avatarUrl: null,
    prodi: "Sastra Bali",
    fakultas: "Ilmu Budaya",
    subjects: ["Lontar", "Sastra"],
    metrics: { scopusHIndex: 15, gsHIndex: 30, gsi10Index: 80 },
    sinta3yr: "1.500",
    sintaOverall: "4.000",
    joinDate: "2022-11-20"
  }
];

export default function DaftarDosenPage() {
  return (
    <PageTransition className="flex flex-col min-h-screen bg-[#f9f8f4]">
      {/* Breadcrumb */}
      <div className="bg-white px-[50px] py-[10px] text-[12px] text-[#64748b] border-b border-[#e2e8f0]">
        <span className="text-[#1b3252] font-semibold">Universitas Udayana</span> / Sistem Informasi Warisan Budaya
      </div>

      {/* Interactive List Component */}
      <DosenListClient initialData={dosenList} />
    </PageTransition>
  );
}
