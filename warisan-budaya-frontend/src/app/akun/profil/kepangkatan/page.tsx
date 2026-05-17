'use client';
import React from 'react';
import { ProfileTableTemplate } from '@/components/dosen/profil/ProfileTableTemplate';
import { TableColumn } from '@/types/dosen-profil';

export default function KepangkatanPage() {
  const columns: TableColumn[] = [
    { header: 'PANGKAT/GOLONGAN', accessor: 'pangkat' },
    { header: 'NO. SK', accessor: 'noSk' },
    { header: 'TMT', accessor: 'tmt' },
    { header: 'MASA KERJA', accessor: 'masaKerja' },
    { header: 'AKSI', accessor: 'aksi', type: 'action' },
  ];

  const data = [
    { pangkat: 'Penata Muda / III-a', noSk: 'CPNS/001/1993', tmt: '01 Mar 1993', masaKerja: '2 Thn 0 Bln' },
    { pangkat: 'Penata Muda Tk.I / III-b', noSk: 'KP/002/1996', tmt: '01 Apr 1996', masaKerja: '3 Thn 1 Bln' },
    { pangkat: 'Penata / III-c', noSk: 'KP/003/2000', tmt: '01 Apr 2000', masaKerja: '4 Thn 0 Bln' },
    { pangkat: 'Penata Tk.I / III-d', noSk: 'KP/004/2004', tmt: '01 Apr 2004', masaKerja: '4 Thn 0 Bln' },
    { pangkat: 'Pembina / IV-a', noSk: 'KP/005/2008', tmt: '01 Apr 2008', masaKerja: '4 Thn 0 Bln' },
    { pangkat: 'Pembina Tk.I / IV-b', noSk: 'KP/006/2014', tmt: '01 Apr 2014', masaKerja: '6 Thn 0 Bln' },
    { pangkat: 'Pembina Utama Muda / IV-c', noSk: 'KP/007/2018', tmt: '01 Apr 2018', masaKerja: '4 Thn 0 Bln' },
    { pangkat: 'Pembina Utama Madya / IV-d', noSk: 'KP/008/2020', tmt: '01 Jul 2020', masaKerja: 'Berjalan' }
  ];

  return (
    <ProfileTableTemplate 
      title="Kepangkatan"
      description="Riwayat golongan dan pangkat kepegawaian dosen."
      status="Lengkap"
      dataCount={8}
      syncSource="SISTER"
      columns={columns}
      data={data}
    />
  );
}
