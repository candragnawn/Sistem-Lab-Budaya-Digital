import { createContext, useState, useEffect, ReactNode } from 'react';
import { useParams } from 'react-router';

export interface Dosen {
  id: number;
  name: string;
  title_prefix?: string;
  title_suffix?: string;
  nidn: string;
  nip: string;
  email: string;
  phone?: string;
  photo_path?: string;
  faculty: string;
  department: string;
  study_program: string;
  bio?: string;
  status: string;

  // External IDs
  sinta_id?: string;
  scopus_id?: string;
  google_scholar_id?: string;
  orcid_id?: string;

  // Stats
  sinta_score?: number;
  scopus_h_index?: number;
  google_scholar_h_index?: number;
  total_publications?: number;
  total_citations?: number;
  tahun_upload?: number;
}

interface DosenContextType {
  currentDosen: Dosen | null;
  setCurrentDosen: (dosen: Dosen | null) => void;
  isLoading: boolean;
}

export const DosenContext = createContext<DosenContextType | undefined>(undefined);

interface DosenProviderProps {
  children: ReactNode;
}

// Mock data - replace with API call
const mockDosens: Dosen[] = [
  {
    id: 1,
    name: 'Dr. Rudi Hartono',
    title_prefix: 'Dr.',
    title_suffix: 'S.Kom., M.T.',
    nidn: '0012345678',
    nip: '198501012010011001',
    email: 'rudi.h@university.ac.id',
    phone: '+62 812 3456 7890',
    faculty: 'Teknik',
    department: 'Teknik Informatika',
    study_program: 'Sistem Informasi',
    bio: 'Dosen tetap dengan keahlian di bidang kecerdasan buatan dan machine learning.',
    status: 'active',
    sinta_id: 'S-12345678',
    scopus_id: '57234567890',
    google_scholar_id: 'abc123XYZ',
    orcid_id: '0000-0001-2345-6789',
    sinta_score: 120,
    scopus_h_index: 8,
    google_scholar_h_index: 10,
    total_publications: 25,
    total_citations: 170,
    tahun_upload: 2026,
  },
  {
    id: 2,
    name: 'Prof. Dr. Siti Aminah',
    title_prefix: 'Prof. Dr.',
    title_suffix: 'M.Sc., Ph.D.',
    nidn: '0023456789',
    nip: '197503151998022001',
    email: 'siti.a@university.ac.id',
    phone: '+62 813 4567 8901',
    faculty: 'Teknik',
    department: 'Teknik Informatika',
    study_program: 'Teknik Komputer',
    bio: 'Profesor dengan keahlian di bidang computer vision dan image processing.',
    status: 'active',
    sinta_id: 'S-23456789',
    scopus_id: '57345678901',
    google_scholar_id: 'def456ABC',
    orcid_id: '0000-0002-3456-7890',
    sinta_score: 892,
    scopus_h_index: 15,
    google_scholar_h_index: 18,
    total_publications: 87,
    total_citations: 1243,
    tahun_upload: 2025,
  },
  {
    id: 3,
    name: 'Luh Putu Sendi',
    title_prefix: '',
    title_suffix: 'S.Sn., M.Sn.',
    nidn: '1122334',
    nip: '198901012015011001',
    email: 'luh.putu@university.ac.id',
    faculty: 'MIPA',
    department: 'Informatika',
    study_program: 'Informatika',
    bio: 'Dosen dengan fokus di bidang data science dan analytics.',
    status: 'active',
    sinta_score: 120,
    scopus_h_index: 2,
    google_scholar_h_index: 10,
    total_publications: 15,
    total_citations: 89,
    tahun_upload: 2026,
  },
];

export function DosenProvider({ children }: DosenProviderProps) {
  const params = useParams<{ dosenId: string }>();
  const [currentDosen, setCurrentDosen] = useState<Dosen | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (params.dosenId) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const dosen = mockDosens.find(d => d.id === parseInt(params.dosenId!));
        setCurrentDosen(dosen || null);
        setIsLoading(false);
      }, 100);
    } else {
      setCurrentDosen(null);
    }
  }, [params.dosenId]);

  const value: DosenContextType = {
    currentDosen,
    setCurrentDosen,
    isLoading,
  };

  return <DosenContext.Provider value={value}>{children}</DosenContext.Provider>;
}

// Export mock data for DosenList
export { mockDosens };
