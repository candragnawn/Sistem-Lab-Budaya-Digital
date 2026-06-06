import { ReactNode } from 'react';
import { Edit, Trash2, Eye } from 'lucide-react';
import { Button } from './Button';

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onView?: (row: T) => void;
}

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  onEdit,
  onDelete,
  onView
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-muted border-b border-border">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className={`px-4 py-2 text-left text-xs font-medium text-muted-foreground ${column.className || ''}`}
              >
                {column.header}
              </th>
            ))}
            {(onEdit || onDelete || onView) && (
              <th className="px-4 py-2 text-right text-xs font-medium text-muted-foreground">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-muted">
          {data.map((row, rowIndex) => (
            <tr key={row.id} className="hover:bg-muted/50 transition-colors">
              {columns.map((column, colIndex) => (
                <td key={colIndex} className={`px-4 py-2.5 text-sm text-foreground ${column.className || ''}`}>
                  {typeof column.accessor === 'function'
                    ? column.accessor(row)
                    : String(row[column.accessor])}
                </td>
              ))}
              {(onEdit || onDelete || onView) && (
                <td className="px-4 py-2.5 text-right">
                  <div className="flex items-center justify-end gap-1">
                    {onView && (
                      <button
                        onClick={() => onView(row)}
                        className="p-1.5 hover:bg-muted rounded transition-colors text-muted-foreground hover:text-primary"
                        title="View"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row)}
                        className="p-1.5 hover:bg-muted rounded transition-colors text-muted-foreground hover:text-primary"
                        title="Edit"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(row)}
                        className="p-1.5 hover:bg-muted rounded transition-colors text-muted-foreground hover:text-destructive"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
