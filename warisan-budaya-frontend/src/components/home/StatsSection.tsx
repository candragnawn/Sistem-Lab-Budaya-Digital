import { DashboardStats } from '@/types';

export function StatsSection({ data }: { data: DashboardStats }) {
  return (
    <div className="bg-[#1b3252] text-[#ceaa56] grid grid-cols-4 text-center px-[50px] py-[30px] border-b-[5px] border-[#f9f8f4]">
      <div className="stat-item">
        <h3 className="text-[32px] mb-[5px] font-bold">{data.total_arsip.toLocaleString('id-ID')}</h3>
        <p className="text-[#ffffff] text-[12px]">Total Arsip Digital</p>
      </div>
      <div className="stat-item">
        <h3 className="text-[32px] mb-[5px] font-bold">{data.dosen_aktif}</h3>
        <p className="text-[#ffffff] text-[12px]">Dosen Aktif</p>
      </div>
      <div className="stat-item">
        <h3 className="text-[32px] mb-[5px] font-bold">{data.publikasi}</h3>
        <p className="text-[#ffffff] text-[12px]">Publikasi Akademik</p>
      </div>
      <div className="stat-item">
        <h3 className="text-[32px] mb-[5px] font-bold">{data.bahan_ajar}</h3>
        <p className="text-[#ffffff] text-[12px]">Bahan ajar</p>
      </div>
    </div>
  );
}
