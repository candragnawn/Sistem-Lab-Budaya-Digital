import { useState } from 'react';
import { Plus, Info, Eye, SquarePen, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

interface BahanAjarItem {
  id: number;
  judul: string;
  jenis: string;
  kategori: string;
  tahun: number;
  semester: string;
  dosenPengampu: string;
}

const bahanAjarData: BahanAjarItem[] = [
  {
    id: 1,
    judul: 'Algoritma dan Pemrograman Dasar',
    jenis: 'Modul',
    kategori: 'Ilmu Komputer',
    tahun: 2023,
    semester: 'Ganjil',
    dosenPengampu: 'Dr. I Wayan Sudarsana, S.T., M.T.',
  },
  {
    id: 2,
    judul: 'Basis Data Relasional dan SQL',
    jenis: 'Buku Ajar',
    kategori: 'Sistem Informasi',
    tahun: 2023,
    semester: 'Genap',
    dosenPengampu: 'Prof. Ni Luh Putu Saraswati, Ph.D.',
  },
  {
    id: 3,
    judul: 'Kalkulus untuk Teknik Informatika',
    jenis: 'Diktat',
    kategori: 'Matematika',
    tahun: 2022,
    semester: 'Ganjil',
    dosenPengampu: 'Dr. I Made Oka Widyantara, M.T.',
  },
  {
    id: 4,
    judul: 'Jaringan Komputer dan Komunikasi Data',
    jenis: 'Modul',
    kategori: 'Jaringan',
    tahun: 2024,
    semester: 'Genap',
    dosenPengampu: 'Dr. I Gede Arta Wibawa, S.T., M.T.',
  },
  {
    id: 5,
    judul: 'Rekayasa Perangkat Lunak',
    jenis: 'Buku Ajar',
    kategori: 'Ilmu Komputer',
    tahun: 2024,
    semester: 'Ganjil',
    dosenPengampu: 'Dr. I Ketut Gede Suhartana, S.Kom., M.Kom.',
  },
  {
    id: 6,
    judul: 'Kecerdasan Buatan dan Machine Learning',
    jenis: 'Modul',
    kategori: 'Ilmu Komputer',
    tahun: 2024,
    semester: 'Genap',
    dosenPengampu: 'Prof. Dr. I Nyoman Wirawan, M.T.',
  },
  {
    id: 7,
    judul: 'Keamanan Sistem Informasi',
    jenis: 'Diktat',
    kategori: 'Sistem Informasi',
    tahun: 2023,
    semester: 'Ganjil',
    dosenPengampu: 'Dr. Ni Kadek Ayu Wirdiani, S.T., M.T.',
  },
  {
    id: 8,
    judul: 'Pemrograman Berorientasi Objek dengan Java',
    jenis: 'Buku Ajar',
    kategori: 'Ilmu Komputer',
    tahun: 2022,
    semester: 'Genap',
    dosenPengampu: 'Dr. I Putu Ari Supadma Arsana, S.Kom., M.Kom.',
  },
];

const JENIS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Modul: { bg: `var(--theme-jenis-modul-bg)`, text: `var(--theme-jenis-modul-text)`, border: `var(--theme-jenis-modul-border)` },
  'Buku Ajar': { bg: `var(--theme-jenis-buku-bg)`, text: `var(--theme-jenis-buku-text)`, border: `var(--theme-jenis-buku-border)` },
  Diktat: { bg: `var(--theme-jenis-diktat-bg)`, text: `var(--theme-jenis-diktat-text)`, border: `var(--theme-jenis-diktat-border)` },
};

export function BahanAjar() {
  const [data] = useState(bahanAjarData);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const paginatedData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div>
      {/* Subsection heading */}
      <p style={{ fontSize: '15px', fontWeight: 500, color: `var(--text-main)`, marginBottom: '12px' }}>
        Bahan Ajar
      </p>

      {/* Master card container */}
      <div
        style={{
          backgroundColor: `var(--brand-card)`,
          borderRadius: '4px',
          border: '1px solid #E2E8F0',
          overflow: 'hidden',
        }}
      >
        {/* Alert infobar */}
        <div
          style={{
            backgroundColor: `var(--theme-info-subtle)`,
            border: '1px solid #BAE6FD',
            borderRadius: '4px',
            margin: '12px 12px 0 12px',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
          }}
        >
          <Info
            style={{ width: '15px', height: '15px', color: `var(--theme-info-icon)`, flexShrink: 0, marginTop: '1px' }}
          />
          <p style={{ fontSize: '12px', fontWeight: 400, color: `var(--theme-info-text)`, margin: 0, lineHeight: '1.5' }}>
            Pastikan Kategori bahan ajar telah sesuai dengan ketentuan{' '}
            <span style={{ textDecoration: 'underline' }}>PO BKD 2021</span>
            {' '}sebelum melakukan pengisian data. Bahan ajar yang telah diverifikasi tidak dapat diedit tanpa persetujuan admin.
          </p>
        </div>

        {/* Toolbar: title + add button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 12px 10px 12px',
          }}
        >
          <div>
            <p style={{ fontSize: '13px', fontWeight: 500, color: `var(--text-body)`, margin: 0 }}>
              Daftar Bahan Ajar
            </p>
            <p style={{ fontSize: '11px', fontWeight: 400, color: `var(--text-placeholder)`, margin: 0, marginTop: '1px' }}>
              Total {data.length} bahan ajar terdaftar
            </p>
          </div>
          <button
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              backgroundColor: `var(--theme-success)`,
              color: `var(--brand-card)`,
              border: 'none',
              borderRadius: '4px',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer',
              letterSpacing: '0.01em',
            }}
          >
            <Plus style={{ width: '14px', height: '14px' }} />
            + Tambah
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: `var(--brand-divider)`, borderBottom: '1px solid #E2E8F0' }}>
                <th
                  style={{
                    width: '44px',
                    padding: '8px 12px',
                    textAlign: 'center',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: `var(--text-muted)`,
                    letterSpacing: '0.03em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}
                >
                  No.
                </th>
                <th
                  style={{
                    padding: '8px 12px',
                    textAlign: 'left',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: `var(--text-muted)`,
                    letterSpacing: '0.03em',
                    textTransform: 'uppercase',
                  }}
                >
                  Judul Bahan Ajar
                </th>
                <th
                  style={{
                    padding: '8px 12px',
                    textAlign: 'left',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: `var(--text-muted)`,
                    letterSpacing: '0.03em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Jenis
                </th>
                <th
                  style={{
                    padding: '8px 12px',
                    textAlign: 'left',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: `var(--text-muted)`,
                    letterSpacing: '0.03em',
                    textTransform: 'uppercase',
                  }}
                >
                  Kategori
                </th>
                <th
                  style={{
                    padding: '8px 12px',
                    textAlign: 'center',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: `var(--text-muted)`,
                    letterSpacing: '0.03em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Tahun
                </th>
                <th
                  style={{
                    padding: '8px 12px',
                    textAlign: 'center',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: `var(--text-muted)`,
                    letterSpacing: '0.03em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Semester
                </th>
                <th
                  style={{
                    padding: '8px 12px',
                    textAlign: 'left',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: `var(--text-muted)`,
                    letterSpacing: '0.03em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Dosen Pengampu
                </th>
                <th
                  style={{
                    padding: '8px 12px',
                    textAlign: 'center',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: `var(--text-muted)`,
                    letterSpacing: '0.03em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => {
                const rowNum = (currentPage - 1) * rowsPerPage + index + 1;
                const jenisStyle = JENIS_COLORS[item.jenis] ?? {
                  bg: `var(--brand-bg)`,
                  text: `var(--text-muted)`,
                  border: `var(--brand-border)`,
                };
                return (
                  <tr
                    key={item.id}
                    style={{ borderBottom: '1px solid #E2E8F0' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLTableRowElement).style.backgroundColor = `var(--theme-bg-hover)`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLTableRowElement).style.backgroundColor = 'transparent';
                    }}
                  >
                    {/* No */}
                    <td
                      style={{
                        padding: '9px 12px',
                        textAlign: 'center',
                        fontSize: '13px',
                        fontWeight: 400,
                        color: `var(--text-placeholder)`,
                      }}
                    >
                      {rowNum}
                    </td>

                    {/* Judul */}
                    <td style={{ padding: '9px 12px' }}>
                      <p
                        style={{
                          fontSize: '13px',
                          fontWeight: 400,
                          color: `var(--text-body)`,
                          margin: 0,
                          maxWidth: '260px',
                        }}
                      >
                        {item.judul}
                      </p>
                    </td>

                    {/* Jenis badge */}
                    <td style={{ padding: '9px 12px' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '2px 8px',
                          borderRadius: '3px',
                          fontSize: '11px',
                          fontWeight: 400,
                          backgroundColor: jenisStyle.bg,
                          color: jenisStyle.text,
                          border: `1px solid ${jenisStyle.border}`,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {item.jenis}
                      </span>
                    </td>

                    {/* Kategori */}
                    <td
                      style={{
                        padding: '9px 12px',
                        fontSize: '13px',
                        fontWeight: 400,
                        color: `var(--text-body)`,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.kategori}
                    </td>

                    {/* Tahun */}
                    <td
                      style={{
                        padding: '9px 12px',
                        textAlign: 'center',
                        fontSize: '13px',
                        fontWeight: 400,
                        color: `var(--text-body)`,
                      }}
                    >
                      {item.tahun}
                    </td>

                    {/* Semester */}
                    <td
                      style={{
                        padding: '9px 12px',
                        textAlign: 'center',
                        fontSize: '13px',
                        fontWeight: 400,
                        color: `var(--text-body)`,
                      }}
                    >
                      {item.semester}
                    </td>

                    {/* Dosen */}
                    <td
                      style={{
                        padding: '9px 12px',
                        fontSize: '13px',
                        fontWeight: 400,
                        color: `var(--text-body)`,
                        maxWidth: '200px',
                      }}
                    >
                      <span
                        style={{
                          display: 'block',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          maxWidth: '200px',
                        }}
                        title={item.dosenPengampu}
                      >
                        {item.dosenPengampu}
                      </span>
                    </td>

                    {/* Action buttons */}
                    <td style={{ padding: '9px 12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
                        {/* Info / Detail */}
                        <button
                          title="Detail"
                          style={{
                            width: '26px',
                            height: '26px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: `var(--theme-info)`,
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            flexShrink: 0,
                          }}
                        >
                          <Eye style={{ width: '13px', height: '13px', color: `var(--brand-card)` }} />
                        </button>

                        {/* Edit */}
                        <button
                          title="Edit"
                          style={{
                            width: '26px',
                            height: '26px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: `var(--theme-warning)`,
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            flexShrink: 0,
                          }}
                        >
                          <SquarePen style={{ width: '13px', height: '13px', color: `var(--brand-card)` }} />
                        </button>

                        {/* Delete */}
                        <button
                          title="Hapus"
                          style={{
                            width: '26px',
                            height: '26px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: `var(--theme-danger)`,
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            flexShrink: 0,
                          }}
                        >
                          <Trash2 style={{ width: '13px', height: '13px', color: `var(--brand-card)` }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 12px',
            borderTop: '1px solid #F1F5F9',
          }}
        >
          <p style={{ fontSize: '12px', fontWeight: 400, color: `var(--text-placeholder)`, margin: 0 }}>
            Menampilkan {(currentPage - 1) * rowsPerPage + 1}–{Math.min(currentPage * rowsPerPage, data.length)} dari {data.length} data
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              style={{
                width: '28px',
                height: '28px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #E2E8F0',
                borderRadius: '4px',
                backgroundColor: currentPage === 1 ? `var(--brand-bg)` : `var(--brand-card)`,
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                color: currentPage === 1 ? `var(--switch-background)` : `var(--text-muted)`,
              }}
            >
              <ChevronLeft style={{ width: '14px', height: '14px' }} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  width: '28px',
                  height: '28px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: page === currentPage ? '1px solid #0F52BA' : '1px solid #E2E8F0',
                  borderRadius: '4px',
                  backgroundColor: page === currentPage ? `var(--brand-primary)` : `var(--brand-card)`,
                  color: page === currentPage ? `var(--brand-card)` : `var(--text-muted)`,
                  fontSize: '12px',
                  fontWeight: page === currentPage ? 500 : 400,
                  cursor: 'pointer',
                }}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              style={{
                width: '28px',
                height: '28px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #E2E8F0',
                borderRadius: '4px',
                backgroundColor: currentPage === totalPages ? `var(--brand-bg)` : `var(--brand-card)`,
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                color: currentPage === totalPages ? `var(--switch-background)` : `var(--text-muted)`,
              }}
            >
              <ChevronRight style={{ width: '14px', height: '14px' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
