import { HeroSection } from '@/components/home/HeroSection';
import { StatsSection } from '@/components/home/StatsSection';
import { CategorySection } from '@/components/home/CategorySection';
import { DashboardStats, Category } from '@/types';
import { PageTransition } from '@/components/ui/PageTransition';

async function fetchData() {
  const API_URL = process.env.NEXT_PUBLIC_LARAVEL_API_URL || 'http://localhost:8000/api';
  
  try {
    const stats: DashboardStats = {
      total_arsip: 1247, 
      dosen_aktif: 67, 
      publikasi: 67, 
      bahan_ajar: 69
    };
    
    const categories: Category[] = [
      { id: 1, title: 'Pengabdian', description: 'Pengabdian Author', count: 487, iconPath: '/icon-pengabdian.png' },
      { id: 2, title: 'Publikasi Karya', description: 'Jurnal dan Penelitian Akademik', count: 298, iconPath: '/icon-publikasi.png' },
      { id: 3, title: 'Bahan Ajar', description: 'Bahan ajar akademik', count: 274, iconPath: '/icon-bahan-ajar.png' },
    ];

    return { stats, categories };
  } catch (error) {
    console.error("Gagal mengambil data dari API Laravel", error);
    return { stats: null, categories: [] };
  }
}

export default async function HomePage() {
  const { stats, categories } = await fetchData();

  return (
    <PageTransition className="flex flex-col min-h-screen">
      <div className="bg-white px-[50px] py-[10px] text-[12px] text-[#64748b] border-b border-[#e2e8f0]">
        <span className="text-[#1b3252] font-semibold">Universitas Udayana</span> / Sistem Informasi Warisan Budaya
      </div>

      <HeroSection />
      
      {stats && <StatsSection data={stats} />}
      
      <CategorySection categories={categories} />
    </PageTransition>
  );
}
