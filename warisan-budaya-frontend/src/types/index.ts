export interface DashboardStats {
  total_arsip: number;
  dosen_aktif: number;
  publikasi: number;
  bahan_ajar: number;
}

export interface Category {
  id: number;
  title: string;
  description: string;
  count: number;
  iconPath: string;
}

export interface Dosen {
  id: string;
  name: string;
  isVerified: boolean;
  avatarUrl?: string | null;
  prodi: string;
  fakultas: string;
  subjects: string[];
  metrics: {
    scopusHIndex: number;
    gsHIndex: number;
    gsi10Index: number;
  };
  sinta3yr: string;
  sintaOverall: string;
  joinDate: string;
}
