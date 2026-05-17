'use client';
import React from 'react';
import { ProfileTableTemplate } from '@/components/dosen/profil/ProfileTableTemplate';
import { TableColumn } from '@/types/dosen-profil';

export default function PenempatanPage() {
  const columns: TableColumn[] = [
    { header: 'UNIT KERJA', accessor: 'unitKerja' },
    { header: 'FAKULTAS', accessor: 'fakultas' },
    { header: 'MULAI', accessor: 'mulai' },
    { header: 'SELESAI', accessor: 'selesai' },
    { header: 'AKSI', accessor: 'aksi', type: 'action' },
  ];

  const data = [
    { unitKerja: 'Prodi Sejarah', fakultas: 'Fakultas Ilmu Budaya', mulai: '01 Mar 1993', selesai: 'Sekarang' }
  ];

  return (
    <ProfileTableTemplate 
      title="Penempatan"
      description="Riwayat penempatan/unit kerja dosen."
      status="Sebagian"
      dataCount={1}
      syncSource="SISTER"
      columns={columns}
      data={data}
    />
  );
}
