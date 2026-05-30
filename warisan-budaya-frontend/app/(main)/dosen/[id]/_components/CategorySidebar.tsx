import React from "react";
import { ChevronDown, ChevronUp, Eye, EyeOff } from "lucide-react";
import type { Category } from "../types";

interface CategorySidebarProps {
  categories: Category[];
  activeSubCategory: string;
  expandedCategories: Set<string>;
  isOwner: boolean;
  onSelectSubCategory: (subId: string, catId: string) => void;
  onToggleCategory: (catId: string) => void;
  onToggleVisibility: (catId: string, subId: string) => void;
}

export default function CategorySidebar({
  categories,
  activeSubCategory,
  expandedCategories,
  isOwner,
  onSelectSubCategory,
  onToggleCategory,
  onToggleVisibility,
}: CategorySidebarProps) {
  return (
    <aside className="w-52 flex-shrink-0 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden sticky top-4">
      <div className="px-4 py-3.5 border-b border-slate-100 bg-slate-50">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Navigasi Kategori</p>
      </div>
      <nav className="py-2 max-h-[calc(100vh-180px)] overflow-y-auto">
        {categories.map((cat) => {
          const isExpanded = expandedCategories.has(cat.id);
          const hasActive = cat.subCategories.some((s) => s.id === activeSubCategory);

          return (
            <div key={cat.id}>
              <button
                onClick={() => onToggleCategory(cat.id)}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors ${hasActive ? "bg-slate-50" : "hover:bg-slate-50"
                  }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-black">{cat.icon}</span>
                  <span className={`text-xs font-bold uppercase tracking-wide ${hasActive ? "text-slate-800" : "text-slate-600"}`}>
                    {cat.label}
                  </span>
                </div>
                {isExpanded
                  ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                  : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
              </button>

              {isExpanded && (
                <div className="pl-4 pb-1">
                  {cat.subCategories.map((sub) => {
                    const isActive = sub.id === activeSubCategory;
                    return (
                      <div key={sub.id} className="flex items-center gap-1 pr-2">
                        <button
                          onClick={() => onSelectSubCategory(sub.id, cat.id)}
                          className={`flex-grow text-left px-3 py-2 rounded-lg text-xs font-medium transition-all my-0.5 ${isActive
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                            } ${!sub.visible && !isOwner ? "opacity-40" : ""}`}
                        >
                          <span className={!sub.visible && isOwner ? "opacity-50" : ""}>{sub.label}</span>
                          {!sub.visible && isOwner && (
                            <span className="ml-1 text-[9px] text-orange-400 font-bold">(Tersembunyi)</span>
                          )}
                        </button>

                        {isOwner && (
                          <button
                            title={sub.visible ? "Sembunyikan dari publik" : "Tampilkan ke publik"}
                            onClick={() => onToggleVisibility(cat.id, sub.id)}
                            className={`p-1 rounded-md flex-shrink-0 transition-colors ${sub.visible ? "text-green-600 hover:bg-green-50" : "text-slate-400 hover:bg-slate-100"
                              }`}
                          >
                            {sub.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
