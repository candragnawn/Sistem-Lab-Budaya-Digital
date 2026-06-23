"use client";
import { useState } from "react";
import { BookOpen, ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Category } from "../types";

interface DosenSidebarProps {
  categories: Category[];
  activeTab: string;
  activeSubCategory: string;
  setActiveTab: (tab: string) => void;
  setActiveSubCategory: (subCategoryId: string) => void;
  isOwner: boolean;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

export function DosenSidebar({
  categories,
  activeTab,
  activeSubCategory,
  setActiveTab,
  setActiveSubCategory,
  isOwner,
  isOpen: controlledIsOpen,
  setIsOpen: controlledSetIsOpen,
}: DosenSidebarProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(true);
  const isOpen = controlledIsOpen ?? internalIsOpen;
  const setIsOpen = controlledSetIsOpen ?? setInternalIsOpen;
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (categoryId: string) => {
    setExpandedItems((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const isCategoryActive = (categoryId: string) => activeTab === categoryId;
  const isSubActive = (subId: string) => activeSubCategory === subId;

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-[57px] left-0 z-50 flex h-10 w-10 items-center justify-center rounded-r-lg bg-brand-navy text-white shadow-lg transition-all duration-300 hover:bg-brand-navy/90"
          aria-label="Buka sidebar"
        >
          <Menu className="h-4 w-4" />
        </button>
      )}

      <aside
        className={cn(
          "fixed left-0 top-[57px] z-40 hidden h-[calc(100vh-57px)] w-[260px] flex-col border-r border-slate-200 bg-white shadow-xl transition-transform duration-300 lg:flex",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="border-b border-slate-100 bg-gradient-to-r from-brand-navy to-brand-navy/90 px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-white/15 text-white">
                <BookOpen className="h-3.5 w-3.5" />
              </div>
              <span className="text-xs font-medium uppercase tracking-wider text-white/80">
                Menu Kategori
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-md bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
              aria-label="Tutup sidebar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-3">
          <ul className="space-y-1">
            {categories.map((category) => {
              const activeParent = isCategoryActive(category.id);
              const visibleSubs = category.subCategories.filter((sub) => sub.visible || isOwner);
              const showSubs = activeParent || expandedItems.includes(category.id);

              return (
                <li key={category.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab(category.id);
                      if (visibleSubs.length > 0) {
                        setActiveSubCategory(visibleSubs[0].id);
                      }
                      toggleExpanded(category.id);
                    }}
                    className={cn(
                      "group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
                      activeParent
                        ? "bg-brand-navy text-white shadow-sm"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-7 w-7 items-center justify-center rounded-md transition-colors",
                        activeParent
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 text-slate-500 group-hover:bg-brand-navy/10 group-hover:text-brand-navy",
                      )}
                    >
                      {category.icon}
                    </span>
                    <span className="flex-1 text-left font-semibold">{category.label}</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        showSubs ? "rotate-180" : "rotate-0",
                      )}
                    />
                  </button>

                  {showSubs && visibleSubs.length > 0 && (
                    <ul className="mt-1 ml-5 space-y-1 border-l border-slate-200 pl-3 pb-2">
                      {visibleSubs.map((sub) => (
                        <li key={sub.id}>
                          <button
                            type="button"
                            onClick={() => setActiveSubCategory(sub.id)}
                            className={cn(
                              "flex w-full items-center justify-between rounded-md px-3 py-1.5 text-xs transition-all duration-200",
                              isSubActive(sub.id)
                                ? "bg-blue-50 text-[#1E40AF] font-semibold"
                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-700",
                            )}
                          >
                            <span>{sub.label}</span>
                            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
