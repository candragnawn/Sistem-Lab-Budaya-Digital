/**
 * Navigation Configuration with API Resource Mapping
 * Each menu item is mapped to its corresponding Laravel API resource endpoint(s)
 */

export interface NavChild {
  title: string;
  path: string;
  resource?: string | string[];
}

export interface NavGroup {
  title: string;
  icon: string;
  path: string;
  children?: NavChild[];
}

export const navigationConfig: NavGroup[] = [
  {
    title: 'Profil',
    icon: 'UserIcon',
    path: '/profil',
    children: [
      {
        title: 'Data pribadi',
        path: '/profil/data-pribadi',
        resource: [
          'identities',
          'lecturer-addresses',
          'lecturer-families',
          'lecturer-academics',
          'lecturer-employments',
          'positions',
          'work-contracts',
        ],
      },
      { title: 'Inpassing', path: '/profil/inpassing', resource: 'inpassings' },
      {
        title: 'Jabatan fungsional',
        path: '/profil/jabatan-fungsional',
        resource: 'functional-positions',
      },
      { title: 'Kepangkatan', path: '/profil/kepangkatan', resource: 'ranks' },
      { title: 'Penempatan', path: '/profil/penempatan', resource: 'placements' },
      {
        title: 'Profesor Emeritus',
        path: '/profil/profesor-emeritus',
        resource: 'professor-emerituses',
      },
    ],
  },
  {
    title: 'Kualifikasi',
    icon: 'AcademicCapIcon',
    path: '/kualifikasi',
    children: [
      {
        title: 'Pendidikan formal',
        path: '/kualifikasi/pendidikan-formal',
        resource: 'lecturer-educations',
      },
      { title: 'Diklat', path: '/kualifikasi/diklat', resource: 'diklats' },
      {
        title: 'Riwayat Pekerjaan',
        path: '/kualifikasi/riwayat-pekerjaan',
        resource: 'jobs',
      },
    ],
  },
  {
    title: 'Kompetensi',
    icon: 'AwardIcon',
    path: '/kompetensi',
    children: [
      { title: 'Sertifikasi', path: '/kompetensi/sertifikasi', resource: 'certifications' },
      { title: 'Tes', path: '/kompetensi/tes', resource: 'tests' },
    ],
  },
  {
    title: 'Pelaks. pendidikan',
    icon: 'BookOpenIcon',
    path: '/pelaksanaan-pendidikan',
    children: [
      {
        title: 'Pengajaran',
        path: '/pelaksanaan-pendidikan/pengajaran',
        resource: 'teachings',
      },
      {
        title: 'Bimbingan Mahasiswa',
        path: '/pelaksanaan-pendidikan/bimbingan-mahasiswa',
        resource: 'student-supervisions',
      },
      {
        title: 'Pengujian mahasiswa',
        path: '/pelaksanaan-pendidikan/pengujian-mahasiswa',
        resource: 'student-examinations',
      },
      {
        title: 'Bahan Ajar',
        path: '/pelaksanaan-pendidikan/bahan-ajar',
        resource: 'teaching-materials',
      },
      {
        title: 'Pembinaan Mahasiswa',
        path: '/pelaksanaan-pendidikan/pembinaan-mahasiswa',
        resource: 'student-developments',
      },
      {
        title: 'Visiting Scientist',
        path: '/pelaksanaan-pendidikan/visiting-scientist',
        resource: 'visiting-scientists',
      },
      {
        title: 'Detasering',
        path: '/pelaksanaan-pendidikan/detasering',
        resource: 'detaserings',
      },
      {
        title: 'Orasi Ilmiah',
        path: '/pelaksanaan-pendidikan/orasi-ilmiah',
        resource: 'academic-orations',
      },
      {
        title: 'Pembimbing dosen',
        path: '/pelaksanaan-pendidikan/pembimbing-dosen',
        resource: 'lecturer-mentorings',
      },
      {
        title: 'Tugas tambahan',
        path: '/pelaksanaan-pendidikan/tugas-tambahan',
        resource: 'additional-tasks',
      },
    ],
  },
  {
    title: 'Pelaks. penelitian',
    icon: 'BeakerIcon',
    path: '/pelaksanaan-penelitian',
    children: [
      {
        title: 'Penelitian',
        path: '/pelaksanaan-penelitian/penelitian',
        resource: 'research',
      },
      {
        title: 'Publikasi karya',
        path: '/pelaksanaan-penelitian/publikasi-karya',
        resource: ['publications', 'publication-authors'],
      },
      {
        title: 'Paten/HKI',
        path: '/pelaksanaan-penelitian/paten-hki',
        resource: 'hkis',
      },
    ],
  },
  {
    title: 'Pelaks. pengabdian',
    icon: 'UserGroupIcon',
    path: '/pelaksanaan-pengabdian',
    children: [
      {
        title: 'Pengabdian',
        path: '/pelaksanaan-pengabdian/pengabdian',
        resource: 'community-services',
      },
      {
        title: 'Pembicara',
        path: '/pelaksanaan-pengabdian/pembicara',
        resource: 'speakers',
      },
      {
        title: 'Pengelola jurnal',
        path: '/pelaksanaan-pengabdian/pengelola-jurnal',
        resource: 'journal-managers',
      },
      {
        title: 'Jabatan struktural',
        path: '/pelaksanaan-pengabdian/jabatan-struktural',
        resource: 'structural-positions',
      },
    ],
  },
  {
    title: 'Penunjang',
    icon: 'BriefcaseIcon',
    path: '/penunjang',
    children: [
      {
        title: 'Anggota profesi',
        path: '/penunjang/anggota-profesi',
        resource: 'professional-memberships',
      },
      { title: 'Penghargaan', path: '/penunjang/penghargaan', resource: 'awards' },
      {
        title: 'Penunjang lain',
        path: '/penunjang/penunjang-lain',
        resource: 'other-supporting-activities',
      },
    ],
  },
  {
    title: 'Reward',
    icon: 'GiftIcon',
    path: '/reward',
    children: [
      { title: 'Beasiswa', path: '/reward/beasiswa', resource: 'scholarships' },
      { title: 'Kesejahteraan', path: '/reward/kesejahteraan', resource: 'welfares' },
      { title: 'Tunjangan', path: '/reward/tunjangan', resource: 'allowances' },
    ],
  },
];

/**
 * Helper function to get API resource endpoint(s) for a given route
 * @param path - The route path (e.g., '/profil/data-pribadi')
 * @returns The resource name(s) or undefined if not found
 *
 * @example
 * getResourceForPath('/profil/data-pribadi')
 * // Returns: ['identities', 'lecturer-addresses', ...]
 *
 * getResourceForPath('/profil/inpassing')
 * // Returns: 'inpassings'
 */
export function getResourceForPath(path: string): string | string[] | undefined {
  for (const group of navigationConfig) {
    if (group.children) {
      const child = group.children.find(c => c.path === path);
      if (child?.resource) return child.resource;
    }
  }
  return undefined;
}

/**
 * Helper function to build API endpoint URL from resource name
 * @param resource - Resource name (e.g., 'identities', 'functional-positions')
 * @returns Full API endpoint URL
 *
 * @example
 * buildApiUrl('identities')
 * // Returns: '/api/identities'
 */
export function buildApiUrl(resource: string): string {
  return `/api/${resource}`;
}
