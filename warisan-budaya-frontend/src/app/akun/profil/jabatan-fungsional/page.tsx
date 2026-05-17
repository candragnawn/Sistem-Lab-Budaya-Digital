'use client';
import React from 'react';
import { ProfileTableTemplate } from '@/components/dosen/profil/ProfileTableTemplate';
import { TableColumn } from '@/types/dosen-profil';

export default function JabatanFungsionalPage() {
  const columns: TableColumn[] = [
    { header: 'JABATAN FUNGSIONAL', accessor: 'jabatanFungsional' },
    { header: 'NO. SK', accessor: 'noSk' },
    { header: 'TMT', accessor: 'tmt' },
    { header: 'ANGKA KREDIT', accessor: 'angkaKredit' },
    { 
      header: 'STATUS', 
      accessor: 'status', 
      type: 'badge',
      badgeColors: {
        'Selesai': 'bg-blue-50 text-blue-600 border-blue-200',
        'Aktif': 'bg-emerald-50 text-emerald-600 border-emerald-200'
      }
    },
    { header: 'AKSI', accessor: 'aksi', type: 'action' },
  ];

  const data = [
    { jabatanFungsional: 'Lektor', noSk: '211/SK/JAB/1997', tmt: '01 Feb 1997', angkaKredit: '200', status: 'Selesai' },
    { jabatanFungsional: 'Lektor Kepala', noSk: '211/SK/JAB/2003', tmt: '01 Agu 2003', angkaKredit: '400', status: 'Selesai' },
    { jabatanFungsional: 'Guru Besar', noSk: '211/SK/JAB/2012', tmt: '01 Des 2012', angkaKredit: '850', status: 'Aktif' }
  ];

  return (
    <ProfileTableTemplate 
      title="Jabatan Fungsional"
      description="Riwayat jabatan fungsional akademik dosen dari awal hingga saat ini. Data dari SINTA dan SISTER."
      status="Lengkap"
      dataCount={3}
      syncSource="SINTA"
      columns={columns}
      data={data}
    />
  );
}
