'use client';
import React from 'react';
import { ProfileTableTemplate } from '@/components/dosen/profil/ProfileTableTemplate';
import { TableColumn } from '@/types/dosen-profil';

export default function InpassingPage() {
  const columns: TableColumn[] = [
    { header: 'NOMOR SK', accessor: 'nomorSk' },
    { header: 'TMT', accessor: 'tmt' },
    { header: 'PANGKAT/GOLONGAN', accessor: 'pangkatGolongan' },
    { header: 'GAJI POKOK', accessor: 'gajiPokok', type: 'currency' },
    { header: 'AKSI', accessor: 'aksi', type: 'action' },
  ];

  const data = [
    { nomorSk: '821.4/1003/BKD/2020', tmt: '01 Juli 2020', pangkatGolongan: 'Pembina Utama / IV-e', gajiPokok: 'Rp 4.087.100' }
  ];

  return (
    <ProfileTableTemplate 
      title="Inpassing"
      description="Riwayat penyetaraan pangkat/golongan berdasarkan inpassing dosen."
      status="Sebagian"
      dataCount={1}
      syncSource="SISTER"
      columns={columns}
      data={data}
    />
  );
}
