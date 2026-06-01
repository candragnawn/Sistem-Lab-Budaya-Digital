import React, { useState } from "react";
import { Eye, EyeOff, BookMarked, ChevronLeft, ChevronRight } from "lucide-react";
import type { SubCategory, Category } from "../types";

interface ProfileTableProps {
  activeSub: SubCategory;
  categories: Category[];
  isOwner: boolean;
}

const ITEMS_PER_PAGE = 2;

export default function ProfileTable({ activeSub, categories, isOwner }: ProfileTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const parentCategory = categories.find((c) =>
    c.subCategories.some((s) => s.id === activeSub.id)
  );

  const totalRows = activeSub.rows.length;
  const totalPages = Math.ceil(totalRows / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedRows = activeSub.rows.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">
            {parentCategory?.label} {" › "} {activeSub.label}
          </p>
          <h2 className="text-lg font-bold text-slate-800">{activeSub.entity}</h2>
        </div>

        {isOwner && (
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${activeSub.visible
              ? "bg-green-50 border-green-200 text-green-700"
              : "bg-orange-50 border-orange-200 text-orange-700"
              }`}
          >
            {activeSub.visible
              ? <><Eye className="w-3.5 h-3.5" /> Tampil ke Publik</>
              : <><EyeOff className="w-3.5 h-3.5" /> Tersembunyi dari Publik</>}
          </div>
        )}
        {!isOwner && !activeSub.visible && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border bg-slate-50 border-slate-200 text-slate-500">
            <EyeOff className="w-3.5 h-3.5" /> Data ini tidak ditampilkan
          </div>
        )}
      </div>
      {!isOwner && !activeSub.visible ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <EyeOff className="w-10 h-10 mb-3 opacity-40" />
          <p className="text-sm font-medium">Data ini tidak ditampilkan oleh dosen</p>
        </div>
      ) : activeSub.rows.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <BookMarked className="w-10 h-10 mb-3 opacity-40" />
          <p className="text-sm font-medium">Belum ada data</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {activeSub.columns.map((col, i) => (
                    <th
                      key={i}
                      className="px-5 py-3.5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedRows.map((row, ri) => (
                  <tr
                    key={ri}
                    className={`border-b border-slate-50 transition-colors hover:bg-blue-50/40 ${ri % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                      }`}
                  >
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className={`px-5 py-4 text-slate-700 leading-relaxed ${ci === 0 ? "text-slate-400 font-medium text-center w-10 whitespace-nowrap" : ""
                          }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalRows > 0 && (
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4 bg-slate-50/50">
              <span className="text-xs text-slate-500 font-medium">
                Menampilkan <span className="font-semibold text-slate-700">{startIndex + 1}</span> -{" "}
                <span className="font-semibold text-slate-700">
                  {Math.min(startIndex + ITEMS_PER_PAGE, totalRows)}
                </span>{" "}
                dari <span className="font-semibold text-slate-700">{totalRows}</span> entri
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${currentPage === 1
                    ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-95"
                    }`}
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Prev
                </button>

                <div className="flex items-center gap-1">
                  {getPageNumbers().map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-lg border transition-all ${currentPage === page
                        ? "bg-[#1E40AF] border-[#1E40AF] text-white shadow-sm"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 active:scale-95"
                        }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${(currentPage === totalPages || totalPages === 0)
                    ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-95"
                    }`}
                >
                  Next <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
