'use client';
import React from 'react';
import { ProfileTableTemplate } from '@/components/dosen/profil/ProfileTableTemplate';
import { TableColumn } from '@/types/dosen-profil';

export default function ProfesorEmiritusPage() {
  const columns: TableColumn[] = [
    { header: 'NO. SK', accessor: 'noSk' },
    { header: 'TMT', accessor: 'tmt' },
    { header: 'BIDANG KEAHLIAN', accessor: 'bidangKeahlian' },
    { header: 'AKSI', accessor: 'aksi', type: 'action' },
  ];

  return (
    <ProfileTableTemplate 
      title="Profesor Emiritus"
      description="Riwayat pengakuan Profesor Emiritus (jika ada)."
      status="Belum Diisi"
      dataCount={0}
      columns={columns}
      data={[]}
    />
  );
}
