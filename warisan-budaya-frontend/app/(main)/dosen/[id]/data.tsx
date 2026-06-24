import React from "react";
import {
  GraduationCap, Award, BookOpen, FlaskConical,
  Handshake, Star, Shield, FolderOpen,
} from "lucide-react";
import type { Category, ProfileData } from "./types";

export const initialCategories: Category[] = [
  {
    id: "kualifikasi",
    label: "Kualifikasi",
    icon: <GraduationCap className="w-5 h-5" />,
    color: "#000000ff",
    subCategories: [
      {
        id: "pendidikan-formal",
        label: "Pendidikan Formal",
        entity: "Riwayat Pendidikan Formal",
        columns: ["No", "Jenjang", "Bidang Ilmu", "Institusi", "Negara", "Tahun Lulus"],
        rows: [
          ["1", "S3", "Informatika", "Universitas Gadjah Mada", "Indonesia", "2018"],
          ["2", "S2", "Ilmu Komputer", "Universitas Indonesia", "Indonesia", "2012"],
          ["3", "S1", "Teknik Informatika", "Universitas Udayana", "Indonesia", "2009"],
        ],
        visible: true,
      },
      {
        id: "diklat",
        label: "Diklat",
        entity: "Diklat",
        columns: ["No", "Nama Diklat", "Penyelenggara", "Tahun", "Durasi (Jam)", "Bukti"],
        rows: [
          ["1", "Pelatihan AI & Machine Learning", "Kemendikbud", "2024", "32", "Sertifikat"],
          ["2", "Diklat Pekerti", "Universitas Udayana", "2020", "40", "Sertifikat"],
        ],
        visible: true,
      },
      {
        id: "riwayat-pekerjaan",
        label: "Riwayat Pekerjaan",
        entity: "Riwayat Pekerjaan",
        columns: ["No", "Jabatan", "Instansi", "Bidang Kerja", "Tahun Mulai", "Tahun Selesai"],
        rows: [
          ["1", "Dosen Tetap", "Universitas Udayana", "Informatika", "2018", "Sekarang"],
          ["2", "Research Assistant", "UGM", "Machine Learning", "2014", "2018"],
        ],
        visible: true,
      },
    ],
  },
  {
    id: "kompetensi",
    label: "Kompetensi",
    icon: <Award className="w-5 h-5" />,
    color: "#7C3AED",
    subCategories: [
      {
        id: "sertifikasi",
        label: "Sertifikasi",
        entity: "Sertifikasi",
        columns: ["No", "Nama Sertifikat", "Lembaga Sertifikasi", "Tahun", "Masa Berlaku", "Bidang"],
        rows: [
          ["1", "Certified Data Scientist", "IBM", "2023", "2026", "Data Science"],
          ["2", "AWS Machine Learning Specialty", "Amazon Web Services", "2022", "2025", "Cloud ML"],
        ],
        visible: true,
      },
      {
        id: "tes",
        label: "Tes",
        entity: "Tes",
        columns: ["No", "Nama Tes", "Penyelenggara", "Tahun", "Skor", "Keterangan"],
        rows: [
          ["1", "TOEFL ITP", "ETS", "2023", "567", "Aktif"],
          ["2", "Tes Potensi Akademik", "Kemendikbud", "2018", "750", "Aktif"],
        ],
        visible: true,
      },
    ],
  },
  {
    id: "pelaksanaan-pendidikan",
    label: "Pelaksanaan Pendidikan",
    icon: <BookOpen className="w-5 h-5" />,
    color: "#0369A1",
    subCategories: [
      {
        id: "pengajaran",
        label: "Pengajaran",
        entity: "Pengajaran",
        columns: ["No", "Mata Kuliah", "Jenjang", "Semester", "SKS", "Kelas", "Jumlah Mahasiswa"],
        rows: [
          ["1", "Machine Learning", "S1", "Gasal 2024/2025", "3", "A", "45"],
          ["2", "Kecerdasan Buatan", "S1", "Genap 2024/2025", "3", "B", "38"],
          ["3", "Data Mining", "S2", "Gasal 2024/2025", "3", "A", "22"],
        ],
        visible: true,
      },
      {
        id: "bimbingan-mahasiswa",
        label: "Bimbingan Mahasiswa",
        entity: "Bimbingan Mahasiswa",
        columns: ["No", "Nama Mahasiswa", "NIM", "Jenjang", "Judul", "Semester", "Status"],
        rows: [
          ["1", "I Kadek Dharma Putra", "2108561001", "S1", "Deteksi Penyakit Alzheimer dengan CNN", "Gasal 2024/2025", "Berjalan"],
          ["2", "Ni Luh Made Sari", "2008561025", "S1", "Klasifikasi Sentimen Media Sosial", "Genap 2023/2024", "Selesai"],
        ],
        visible: true,
      },
      {
        id: "pengujian-mahasiswa",
        label: "Pengujian Mahasiswa",
        entity: "Pengujian Mahasiswa",
        columns: ["No", "Nama Mahasiswa", "NIM", "Jenjang", "Judul", "Peran", "Tanggal Ujian"],
        rows: [
          ["1", "Putu Bayu Santika", "1908561010", "S1", "Sistem Rekomendasi E-Commerce", "Penguji 2", "15 Mei 2025"],
          ["2", "Made Ayu Pratiwi", "2108561030", "S1", "Deteksi Fraud Kartu Kredit", "Penguji 1", "20 Mei 2025"],
        ],
        visible: true,
      },
      {
        id: "bahan-ajar",
        label: "Bahan Ajar",
        entity: "Bahan Ajar",
        columns: ["No", "Judul", "Jenis", "Mata Kuliah", "Tahun", "Penerbit/Platform"],
        rows: [
          ["1", "Pengantar Machine Learning", "Modul Ajar", "Machine Learning", "2024", "Universitas Udayana Press"],
          ["2", "Praktikum Data Mining", "Buku Praktikum", "Data Mining", "2023", "Self-published"],
        ],
        visible: true,
      },
      {
        id: "pembinaan-mahasiswa",
        label: "Pembinaan Mahasiswa",
        entity: "Pembinaan Mahasiswa",
        columns: ["No", "Kegiatan", "Peran", "Jumlah Peserta", "Tahun", "Keterangan"],
        rows: [
          ["1", "Pembimbing Akademik Mahasiswa Baru", "Dosen PA", "40", "2024", "Aktif"],
          ["2", "Pendampingan PKKMB", "Pendamping", "120", "2023", "Selesai"],
        ],
        visible: true,
      },
      {
        id: "visiting-scientist",
        label: "Visiting Scientist",
        entity: "Visiting Scientist",
        columns: ["No", "Institusi Tujuan", "Negara", "Bidang", "Tanggal Mulai", "Tanggal Selesai"],
        rows: [
          ["1", "Universiti Malaya", "Malaysia", "Machine Learning in Healthcare", "01 Mar 2024", "31 Mar 2024"],
        ],
        visible: true,
      },
      {
        id: "datasering",
        label: "Datasering",
        entity: "Datasering",
        columns: ["No", "Institusi Tujuan", "Bidang Tugas", "Tanggal Mulai", "Tanggal Selesai", "SK Nomor"],
        rows: [
          ["1", "Badan Riset dan Inovasi Nasional", "Analisis Data Riset", "01 Jan 2023", "31 Des 2023", "SK/2023/001"],
        ],
        visible: true,
      },
      {
        id: "orasi-ilmiah",
        label: "Orasi Ilmiah",
        entity: "Riwayat Orasi Ilmiah",
        columns: ["No", "Judul Orasi", "Acara", "Institusi", "Tanggal", "Tingkat"],
        rows: [
          ["1", "Peran AI dalam Transformasi Digital Pendidikan", "Dies Natalis Unud ke-62", "Universitas Udayana", "29 Sep 2024", "Nasional"],
        ],
        visible: true,
      },
      {
        id: "pembimbing-dosen",
        label: "Pembimbing Dosen",
        entity: "Data Pembimbing Dosen",
        columns: ["No", "Nama Dosen Dibimbing", "NIP/NIDK", "Bidang", "Periode", "Status"],
        rows: [
          ["1", "Dr. I Wayan Suardika, S.T., M.T.", "198603012019031001", "Informatika", "2023–2024", "Berjalan"],
        ],
        visible: true,
      },
      {
        id: "tugas-tambahan",
        label: "Tugas Tambahan",
        entity: "Tugas Tambahan",
        columns: ["No", "Jabatan", "Unit Kerja", "SK Nomor", "Tanggal SK", "Periode"],
        rows: [
          ["1", "Koordinator Program Studi S1 Informatika", "Fakultas MIPA Unud", "SK/2024/045", "01 Feb 2024", "2024–2026"],
          ["2", "Anggota Senat Fakultas", "Fakultas MIPA Unud", "SK/2022/017", "01 Mar 2022", "2022–2024"],
        ],
        visible: true,
      },
    ],
  },
  {
    id: "pelaksanaan-penelitian",
    label: "Pelaksanaan Penelitian",
    icon: <FlaskConical className="w-5 h-5" />,
    color: "#B45309",
    subCategories: [
      {
        id: "penelitian",
        label: "Penelitian",
        entity: "Penelitian",
        columns: ["No", "Judul Penelitian", "Peran", "Sumber Dana", "Tahun", "Status"],
        rows: [
          ["1", "Pengembangan Model Deep Learning untuk Deteksi Kanker Payudara", "Ketua", "Hibah BRIN", "2024", "Berjalan"],
          ["2", "Implementasi Federated Learning pada IoT", "Anggota", "DIPA Unud", "2023", "Selesai"],
        ],
        visible: true,
      },
      {
        id: "publikasi-karya",
        label: "Publikasi Karya",
        entity: "Publikasi Karya",
        columns: ["No", "Judul", "Jenis", "Penerbit/Venue", "Tahun", "Pengindeks"],
        rows: [
          ["1", "Detecting Alzheimer's Based on MRI Medical Images", "Artikel Jurnal", "Jurnal RESTI", "2025", "Sinta 2"],
          ["2", "Firefly Algorithm-SVM in Classifying Clinical Trial Toxicity", "Prosiding", "ICICT 2025", "2025", "Scopus"],
        ],
        visible: true,
      },
      {
        id: "hak-paten-hki",
        label: "Hak Paten/HKI",
        entity: "Paten",
        columns: ["No", "Judul Invensi", "Nomor Paten", "Jenis", "Tahun Terbit", "Status"],
        rows: [
          ["1", "Sistem Rekomendasi Berbasis Hybrid Filtering", "IDP000080XXX", "Paten Sederhana", "2023", "Granted"],
        ],
        visible: true,
      },
    ],
  },
  {
    id: "pelaksanaan-pengabdian",
    label: "Pelaksanaan Pengabdian",
    icon: <Handshake className="w-5 h-5" />,
    color: "#065F46",
    subCategories: [
      {
        id: "pengabdian",
        label: "Pengabdian",
        entity: "Pengabdian",
        columns: ["No", "Judul", "Peran", "Mitra", "Sumber Dana", "Tahun", "Status"],
        rows: [
          ["1", "Pelatihan Digital Marketing untuk UMKM Bali", "Ketua", "Desa Ubud, Gianyar", "DIPA Unud", "2024", "Selesai"],
          ["2", "Pendampingan Literasi Digital Siswa SMA", "Anggota", "SMAN 1 Denpasar", "Mandiri", "2023", "Selesai"],
        ],
        visible: true,
      },
      {
        id: "pembicara",
        label: "Pembicara",
        entity: "Pembicara",
        columns: ["No", "Judul Kegiatan", "Peran", "Penyelenggara", "Tanggal", "Tingkat"],
        rows: [
          ["1", "Seminar Nasional Teknologi Informasi 2024", "Keynote Speaker", "STIKI Malang", "20 Nov 2024", "Nasional"],
          ["2", "Workshop AI for Good", "Narasumber", "Google Developer Group Bali", "15 Sep 2024", "Regional"],
        ],
        visible: true,
      },
      {
        id: "pengelola-jurnal",
        label: "Pengelola Jurnal",
        entity: "Pengelola Jurnal",
        columns: ["No", "Nama Jurnal", "Peran", "ISSN", "Penerbit", "Periode"],
        rows: [
          ["1", "Jurnal Ilmiah Merpati", "Editor", "2252-3006", "Universitas Udayana", "2021–Sekarang"],
        ],
        visible: true,
      },
      {
        id: "jabatan-struktural",
        label: "Jabatan Struktural",
        entity: "Jabatan Struktural",
        columns: ["No", "Jabatan", "Unit Kerja", "Tingkat", "Periode", "SK Nomor"],
        rows: [
          ["1", "Kepala Laboratorium Komputasi Cerdas", "Prodi Informatika Unud", "Jurusan", "2022–2024", "SK/2022/042"],
        ],
        visible: true,
      },
    ],
  },
  {
    id: "penunjang",
    label: "Penunjang",
    icon: <Star className="w-5 h-5" />,
    color: "#9D174D",
    subCategories: [
      {
        id: "anggota-profesi",
        label: "Anggota Profesi",
        entity: "Riwayat Anggota Profesi",
        columns: ["No", "Nama Organisasi", "Tingkat", "Nomor Anggota", "Tahun Bergabung", "Status"],
        rows: [
          ["1", "APTIKOM (Asosiasi Pendidikan Tinggi Informatika dan Komputer)", "Nasional", "APT-2019-1234", "2019", "Aktif"],
          ["2", "IEEE (Institute of Electrical and Electronics Engineers)", "Internasional", "98765432", "2020", "Aktif"],
        ],
        visible: true,
      },
      {
        id: "penghargaan",
        label: "Penghargaan",
        entity: "Penghargaan",
        columns: ["No", "Nama Penghargaan", "Pemberi", "Tahun", "Tingkat", "Keterangan"],
        rows: [
          ["1", "Dosen Berprestasi Terbaik", "Universitas Udayana", "2023", "Universitas", "Peringkat 1"],
          ["2", "Best Paper Award", "ICICT 2022", "2022", "Internasional", "Top 3 Paper"],
        ],
        visible: true,
      },
      {
        id: "penunjang-lain",
        label: "Penunjang Lain",
        entity: "Penunjang Lain",
        columns: ["No", "Jenis Kegiatan", "Peran", "Penyelenggara", "Tahun", "Keterangan"],
        rows: [
          ["1", "Reviewer Jurnal Nasional", "Reviewer", "Jurnal RESTI", "2023–Sekarang", "Aktif"],
          ["2", "Panitia Konferensi SENASIF 2024", "Panitia Teknis", "ITATS Surabaya", "2024", "Selesai"],
        ],
        visible: true,
      },
    ],
  },
  {
    id: "reward",
    label: "Reward",
    icon: <Shield className="w-5 h-5" />,
    color: "#000000ff",
    subCategories: [
      {
        id: "beasiswa",
        label: "Beasiswa",
        entity: "Beasiswa",
        columns: ["No", "Nama Beasiswa", "Pemberi", "Jenjang", "Tahun Mulai", "Tahun Selesai"],
        rows: [
          ["1", "Beasiswa PMDSU", "Kemendikbud", "S3", "2015", "2018"],
        ],
        visible: true,
      },
      {
        id: "kesejahteraan",
        label: "Kesejahteraan",
        entity: "Kesejahteraan",
        columns: ["No", "Jenis", "Pemberi", "Nilai", "Periode", "Keterangan"],
        rows: [
          ["1", "Dana Pensiun Dosen", "TASPEN", "—", "2018–Sekarang", "Aktif"],
        ],
        visible: true,
      },
      {
        id: "tunjangan",
        label: "Tunjangan",
        entity: "Tunjangan",
        columns: ["No", "Jenis Tunjangan", "Dasar Hukum", "Nilai", "Periode", "Status"],
        rows: [
          ["1", "Tunjangan Profesi Dosen (Serdos)", "UU No. 14 Tahun 2005", "1× Gaji Pokok", "2019–Sekarang", "Aktif"],
        ],
        visible: true,
      },
    ],
  },
  {
    id: "data-dokumen",
    label: "Data Dokumen",
    icon: <FolderOpen className="w-5 h-5" />,
    color: "#000000ff",
    subCategories: [
      {
        id: "riwayat-dokumen-pribadi",
        label: "Riwayat Dokumen Pribadi",
        entity: "Riwayat Dokumen Pribadi",
        columns: ["No", "Jenis Dokumen", "Nomor Dokumen", "Tanggal Terbit", "Masa Berlaku", "Status"],
        rows: [
          ["1", "Kartu Tanda Penduduk (KTP)", "5171xxxxxx", "01 Jan 2022", "Seumur Hidup", "Aktif"],
          ["2", "Paspor", "B1234567X", "15 Mar 2022", "15 Mar 2027", "Aktif"],
          ["3", "NPWP", "01.234.567.8-901.000", "01 Jun 2009", "Seumur Hidup", "Aktif"],
        ],
        visible: true,
      },
    ],
  },
];
export const dummyProfileData: ProfileData = {
  name: "Prof. Dr. Ivan Ganteng, S.cin",
  imageUrl: "/ivankeren.jpeg",
  university: "Universitas Udayana",
  program: "Fakultas Informatika",
  SiwadaId: "0001196801",
  tags: ["Arsitektur Kol", "Sejarah", "Model Generatif"],
  metrics: { sintaOverall: "3.456", sinta3Yr: "1.124", scopusHIndex: "23", wosHIndex: "31" },
  activities: [
    { year: "2025", count: 3 },
    { year: "2024", count: 5 },
    { year: "2023", count: 2 },
  ],
  publications: [
    {
      id: 1,
      title: "Sejarah Aksara Bali pada Lontar Kuno",
      venue: "Jurnal Sejarah Nusantara",
      year: 2025, authorOrder: "1 of 2", type: "Journal Article", citations: 4,
    },
    {
      id: 2,
      title: "Model Generatif untuk Rekonstruksi Bangunan Sejarah",
      venue: "International Conference on Digital Heritage",
      year: 2024, authorOrder: "1 of 3", type: "Conference", citations: 12,
    },
    {
      id: 3,
      title: "Arsitektur Kolonial di Bali: Pendekatan Digital",
      venue: "Jurnal Arsitektur Indonesia",
      year: 2023, authorOrder: "2 of 4", type: "Journal Article", citations: 8,
    },
  ],
};
