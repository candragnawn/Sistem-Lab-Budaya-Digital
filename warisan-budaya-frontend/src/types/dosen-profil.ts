export interface TableColumn {
  header: string;
  accessor: string;
  type?: 'text' | 'badge' | 'action' | 'currency';
  badgeColors?: Record<string, string>;
}

export interface ProfileTableProps {
  title: string;
  description: string;
  status: 'Lengkap' | 'Sebagian' | 'Belum Diisi';
  dataCount: number;
  syncSource?: 'SISTER' | 'SINTA';
  columns: TableColumn[];
  data: any[];
}
