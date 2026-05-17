'use client';
import React from 'react';
import Image from 'next/image';
import { Edit, CheckCircle, ExternalLink, BadgeCheck } from 'lucide-react';

// Helper component for sections
function SectionCard({ title, children, showUpdateBtn = true, titleBadge }: { title: string, children: React.ReactNode, showUpdateBtn?: boolean, titleBadge?: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-[#e2e8f0]">
      <div className="flex flex-wrap justify-between items-center mb-5 pb-3 border-b border-slate-100 gap-2">
        <div className="flex items-center gap-3">
          <div className="w-1 h-5 bg-[#1b3252] rounded-full"></div>
          <h3 className="font-bold text-[#1b3252] text-sm">{title}</h3>
          {titleBadge}
        </div>
        {showUpdateBtn && (
          <button className="flex items-center gap-1.5 text-xs text-slate-600 border border-slate-300 px-3 py-1.5 rounded bg-white hover:bg-slate-50 transition-colors font-medium">
            <Edit className="w-3.5 h-3.5" />
            Ajukan Pembaruan
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function Field({ label, value, vertical = false }: { label: string, value: React.ReactNode, vertical?: boolean }) {
  if (vertical) {
    return (
      <div className="mb-4">
        <div className="text-xs text-slate-500 mb-1">{label}</div>
        <div className="text-sm font-medium text-slate-800">{value}</div>
      </div>
    );
  }
  
  return (
    <div className="flex items-start py-2 border-b border-slate-50 last:border-0">
      <div className="w-[120px] shrink-0 text-xs text-slate-500 pt-0.5">{label}</div>
      <div className="flex-1 text-sm font-medium text-slate-800">{value}</div>
    </div>
  );
}

export default function DataPribadiPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* COLUMN 1 */}
      <div className="flex flex-col gap-6">
        
        {/* Profil Section */}
        <SectionCard 
          title="Profil" 
          showUpdateBtn={false}
          titleBadge={
            <span className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Data Terverifikasi
            </span>
          }
        >
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-40 h-48 rounded-lg overflow-hidden border border-slate-200 mb-4 bg-slate-100">
              {/* Fake Image Container */}
              <div className="absolute inset-0 bg-slate-200">
                <Image src="/default-avatar.png" alt="Profile" fill className="object-cover" />
              </div>
              <div className="absolute bottom-2 right-2 bg-emerald-500 text-white p-1 rounded-full border-2 border-white shadow-sm">
                <BadgeCheck className="w-4 h-4" />
              </div>
            </div>
            
            <button className="flex items-center gap-1.5 text-xs text-slate-600 border border-slate-300 px-4 py-2 rounded bg-white hover:bg-slate-50 transition-colors font-medium w-full justify-center mb-2">
              <Edit className="w-3.5 h-3.5" />
              Ajukan Pembaruan
            </button>
            <div className="flex gap-2 w-full justify-center">
              <span className="bg-emerald-50 text-emerald-600 text-[10px] px-3 py-1 rounded font-medium border border-emerald-100">SISTER</span>
              <span className="bg-slate-50 text-slate-500 text-[10px] px-3 py-1 rounded font-medium border border-slate-200">Manual</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <Field label="NIDN" value="0001096801" />
            <Field label="Nama" value="Kadek Pasek Divandra Kusuma" />
            <Field label="Nama Sebutan Dosen" value="Prof. Dr. Divandra Kusuma, S.CIn" />
            <Field label="Jenis Kelamin" value="Laki-laki" />
            <Field label="Tempat Lahir" value="Gianyar, Bali" />
            <Field label="Tanggal Lahir" value="1 September 1968" />
            <Field label="Bidang Keahlian" value={
              <div className="flex flex-wrap gap-2 mt-1">
                <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-xs border border-blue-100">Arsitektur Bali</span>
                <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-xs border border-blue-100">Sejarah</span>
                <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-xs border border-blue-100">Model Generatif</span>
              </div>
            } />
          </div>
        </SectionCard>

        {/* Kependudukan Section */}
        <SectionCard title="Kependudukan">
          <div className="flex flex-col gap-1">
            <Field label="NIK" value="5171010109680003" />
            <Field label="NPWP" value="34.123.456.1-904.000" />
            <Field label="Agama" value="Hindu" />
            <Field label="Kewarganegaraan" value="WNI" />
            <Field label="Status Perkawinan" value="Kawin" />
            <Field label="Nama Pasangan" value="Liat nomor 3" />
          </div>
        </SectionCard>

      </div>


      {/* COLUMN 2 */}
      <div className="flex flex-col gap-6">
        
        {/* Alamat dan Kontak */}
        <SectionCard title="Alamat dan Kontak">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <Field label="Email" value="Divandrakusuma@gmail.com" vertical />
            <Field label="No Ponsel" value="083456789012" vertical />
            <Field label="No. Telepon Rumah" value="(0361) 445678" vertical />
            <Field label="RT / RW" value="RT 04 / RW 08" vertical />
            <Field label="Desa / Kelurahan" value="Jimbaran" vertical />
            <Field label="Kecamatan / Kab." value="Kuta Selatan" vertical />
            <Field label="Provinsi" value="Bali" vertical />
            <Field label="Kode Pos" value="80361" vertical />
            <div className="col-span-2 mt-2">
              <Field label="NIK (Alamat)" value="5171010109680003" />
            </div>
          </div>
        </SectionCard>

        {/* Jabatan Fungsional & Akademik */}
        <SectionCard title="Jabatan Fungsional & Akademik">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-6">
            <Field label="Jabatan Akademik" value="Guru Besar" vertical />
            <Field label="Rumpun Ilmu" value="Sejarah dan Arkeologi" vertical />
            <div className="col-span-2">
              <Field label="Pangkat / Gol. (Inpassing)" value="Pembina Utama / IV-e" />
            </div>
          </div>

          <div className="text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-wider">METRIK AKADEMIK</div>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-6">
            <Field label="SINTA ID" value="5678901" vertical />
            <Field label="SINTA Score (3 Thn)" value="1.124" vertical />
            <Field label="SINTA Score Overall" value="3.456" vertical />
            <Field label="H-Index Scopus" value="23" vertical />
            <Field label="H-Index Google Scholar" value="31" vertical />
            <Field label="Bergabung Sejak" value="1 November 2019" vertical />
          </div>

          <button className="flex items-center gap-2 text-xs font-semibold text-blue-600 border border-blue-200 px-4 py-2 rounded bg-blue-50 hover:bg-blue-100 transition-colors w-max">
            <ExternalLink className="w-3.5 h-3.5" />
            Lihat Profil SINTA
          </button>
        </SectionCard>

      </div>


      {/* COLUMN 3 */}
      <div className="flex flex-col gap-6">

        {/* Kepegawaian */}
        <SectionCard title="Kepegawaian">
          <div className="text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-wider">DATA DARI SIASN</div>
          <div className="flex flex-col gap-1 mb-6 border-b border-slate-100 pb-6">
            <Field label="NIP" value="19680901199303001" />
            <Field label="Nomor SK CPNS / PNS / PPPK" value="821.3/345/BKD/1993" />
            <div className="grid grid-cols-2 gap-4 mt-2">
              <Field label="TMT SK CPNS / PNS / PPPK" value="1 Maret 1993" vertical />
              <Field label="Pangkat dan Golongan" value="Pembina Utama / IV-e" vertical />
            </div>
          </div>

          <div className="text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-wider">DATA KEPEGAWAIAN</div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-2">
            <Field label="Status Kepegawaian" value="PNS" vertical />
            <Field label="Status Keaktifan" value="Aktif" vertical />
            <Field label="Sumber Gaji" value="APBN" vertical />
            <Field label="Ikatan Kerja" value="Pegawai Tetap" vertical />
          </div>
          <div className="flex flex-col gap-1">
            <Field label="Unit Kerja" value="Fakultas Ilmu Budaya" />
            <Field label="Program Studi" value="Prodi Sejarah" />
            <Field label="Perguruan Tinggi" value="Universitas Udayana" />
            <Field label="Homebase Penugasan" value="Jimbaran" />
            <Field label="Masa Kerja" value="32 Tahun 8 Bulan" />
          </div>
        </SectionCard>

        {/* Identitas Akademik */}
        <SectionCard title="Identitas Akademik" showUpdateBtn={false}>
          <div className="flex flex-col gap-1 mb-6">
            <Field label="NIP" value="19680901199303001" />
            <Field label="NIDN" value="0001096801" />
            <Field label="NIK" value="5171010109680003" />
            <Field label="NPWP" value="34.123.456.1-904.000" />
            <Field label="SINTA ID" value="5678901" />
          </div>

          <div className="text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-wider">SKOR AKADEMIK</div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-indigo-50/50 rounded-lg p-3 text-center border border-indigo-100">
              <div className="text-2xl font-bold text-[#1b3252]">1.124</div>
              <div className="text-[10px] text-indigo-600 font-semibold mt-1">SINTA 3yr</div>
            </div>
            <div className="bg-purple-50/50 rounded-lg p-3 text-center border border-purple-100">
              <div className="text-2xl font-bold text-[#1b3252]">3.456</div>
              <div className="text-[10px] text-purple-600 font-semibold mt-1">SINTA All</div>
            </div>
            <div className="bg-orange-50/50 rounded-lg p-3 text-center border border-orange-100">
              <div className="text-2xl font-bold text-orange-600">23</div>
              <div className="text-[10px] text-orange-600 font-semibold mt-1">H-Scopus</div>
            </div>
            <div className="bg-blue-50/50 rounded-lg p-3 text-center border border-blue-100">
              <div className="text-2xl font-bold text-blue-600">31</div>
              <div className="text-[10px] text-blue-600 font-semibold mt-1">H-Scholar</div>
            </div>
          </div>
        </SectionCard>

      </div>

    </div>
  );
}
