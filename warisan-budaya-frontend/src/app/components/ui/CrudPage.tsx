import { useState, ReactNode } from 'react';
import { Plus, Search, Download, Trash2, Edit, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRole } from '../../hooks/useAuth';
import { PublicBanner } from './PublicBanner';

export interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => ReactNode);
  className?: string;
}

interface CrudPageProps<T extends { id: number | string }> {
  title: string;
  subtitle?: string;
  columns: Column<T>[];
  data: T[];
  onAdd?: () => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onView?: (row: T) => void;
  searchPlaceholder?: string;
  addLabel?: string;
  stats?: { label: string; value: string | number }[];
}

export function StatusBadge({ status, type = 'default' }: {
  status: string;
  type?: 'success' | 'warning' | 'error' | 'info' | 'default';
}) {
  const styles = {
    success: 'bg-success-alt/10 text-success-alt border-success-alt/20',
    warning: 'bg-amber-600/10 text-amber-600 border-amber-600/20',
    error: 'bg-red-600/10 text-red-600 border-red-600/20',
    info: 'bg-info/10 text-info border-info/20',
    default: 'bg-gray-700/50 text-text-placeholder border-border-dark',
  };

  return (
    <span className={`px-1.5 py-0.5 rounded text-[10px] border ${styles[type]}`}>
      {status}
    </span>
  );
}

export function LoadingSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="divide-y divide-gray-700">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-4 px-4 py-3">
          {Array.from({ length: cols }).map((_, c) => (
            <div
              key={c}
              className="h-3 bg-gray-700 rounded animate-pulse"
              style={{ width: c === 0 ? '30%' : `${60 / (cols - 1)}%` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function EmptyState({ message, description }: { message?: string; description?: string }) {
  const { isPublic } = useRole();

  const defaultMessage = message || 'Belum ada data';
  const defaultDescription = description || (
    isPublic
      ? 'Belum ada data yang tersedia. Login sebagai dosen untuk menambah data.'
      : 'Tambah data baru untuk memulai.'
  );

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-12 h-12 bg-surface-darker rounded-[6px] flex items-center justify-center mb-3">
        <Eye className="w-5 h-5 text-text-placeholder" />
      </div>
      <p className="text-sm font-medium text-brand-card">{defaultMessage}</p>
      <p className="text-xs text-text-placeholder mt-1">{defaultDescription}</p>
    </div>
  );
}

export function CrudPage<T extends { id: number | string }>({
  title,
  subtitle,
  columns,
  data,
  onAdd,
  onEdit,
  onDelete,
  onView,
  searchPlaceholder = 'Cari...',
  addLabel = 'Tambah',
  stats,
}: CrudPageProps<T>) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 10;
  const { canWrite } = useRole();

  const filtered = data.filter(row =>
    columns.some(col => {
      if (typeof col.accessor === 'function') return false;
      const val = row[col.accessor];
      return String(val).toLowerCase().includes(search.toLowerCase());
    })
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="space-y-3">
      {/* Public Banner */}
      <PublicBanner />

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-base font-medium text-brand-card">{title}</h1>
          {subtitle && <p className="text-xs text-text-placeholder mt-0.5">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs border border-border-dark rounded-[6px] text-gray-200 hover:bg-gray-800 transition-colors">
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
          {canWrite && onAdd && (
            <button
              onClick={onAdd}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs bg-info text-brand-card rounded-[6px] hover:bg-info-hover transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              {addLabel}
            </button>
          )}
        </div>
      </div>

      {/* Stats Row */}
      {stats && stats.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map((s, i) => (
            <div key={i} className="bg-surface-dark border border-border-dark rounded-[6px] px-3 py-2.5">
              <p className="text-[10px] text-text-placeholder">{s.label}</p>
              <p className="text-lg font-medium text-brand-card mt-0.5">{s.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Table Card */}
      <div className="bg-surface-dark border border-border-dark rounded-[6px]">
        {/* Toolbar */}
        <div className="px-4 py-2.5 border-b border-border-dark flex items-center justify-between gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-text-placeholder" />
            <input
              type="text"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder={searchPlaceholder}
              className="pl-8 pr-3 py-1.5 text-xs bg-surface-darker border border-border-dark text-brand-card rounded-[4px] focus:outline-none focus:ring-1 focus:ring-info placeholder:text-text-placeholder w-52"
            />
          </div>
          <p className="text-[10px] text-text-placeholder">{filtered.length} data ditemukan</p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-darker border-b border-border-dark">
              <tr>
                <th className="px-4 py-2.5 text-left text-[10px] font-medium text-text-placeholder w-8">#</th>
                {columns.map((col, i) => (
                  <th key={i} className={`px-4 py-2.5 text-left text-[10px] font-medium text-text-placeholder ${col.className ?? ''}`}>
                    {col.header}
                  </th>
                ))}
                {(onView || (canWrite && (onEdit || onDelete))) && (
                  <th className="px-4 py-2.5 text-right text-[10px] font-medium text-text-placeholder w-24">Aksi</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 2}>
                    <EmptyState />
                  </td>
                </tr>
              ) : (
                paginated.map((row, ri) => (
                  <tr key={row.id} className="hover:bg-gray-800 transition-colors">
                    <td className="px-4 py-2.5 text-[10px] text-text-placeholder">{(page - 1) * perPage + ri + 1}</td>
                    {columns.map((col, ci) => (
                      <td key={ci} className={`px-4 py-2.5 text-xs text-brand-card ${col.className ?? ''}`}>
                        {typeof col.accessor === 'function'
                          ? col.accessor(row)
                          : String(row[col.accessor] ?? '-')}
                      </td>
                    ))}
                    {(onView || (canWrite && (onEdit || onDelete))) && (
                      <td className="px-4 py-2.5">
                        <div className="flex items-center justify-end gap-1">
                          {onView && (
                            <button onClick={() => onView(row)} className="p-1.5 hover:bg-gray-700 rounded transition-colors text-text-placeholder hover:text-info" title="Lihat">
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {canWrite && onEdit && (
                            <button onClick={() => onEdit(row)} className="p-1.5 hover:bg-gray-700 rounded transition-colors text-text-placeholder hover:text-info" title="Edit">
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {canWrite && onDelete && (
                            <button onClick={() => onDelete(row)} className="p-1.5 hover:bg-red-900/20 rounded transition-colors text-text-placeholder hover:text-red-500" title="Hapus">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-2.5 border-t border-border-dark flex items-center justify-between">
          <p className="text-[10px] text-text-placeholder">
            Halaman {page} dari {totalPages} · {filtered.length} total
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded hover:bg-gray-700 disabled:opacity-30 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5 text-text-placeholder" />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pg = Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
              if (pg > totalPages) return null;
              return (
                <button
                  key={pg}
                  onClick={() => setPage(pg)}
                  className={`w-6 h-6 rounded text-[10px] transition-colors ${
                    pg === page
                      ? 'bg-info text-brand-card'
                      : 'text-text-placeholder hover:bg-gray-700'
                  }`}
                >
                  {pg}
                </button>
              );
            })}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded hover:bg-gray-700 disabled:opacity-30 transition-colors"
            >
              <ChevronRight className="w-3.5 h-3.5 text-text-placeholder" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
