"use client";
import EmptySubPage from "@/components/empty-sub-page";
import { BookOpen } from "lucide-react";

export default function DokumenPribadiPage() {
  return (
    <EmptySubPage
      parentTitle="Data Dokumen"
      parentHref="/dashboard/data-dokumen"
      title="Dokumen Pribadi"
      description="Data dokumen identitas dan pribadi."
      section="DATA DOKUMEN"
      icon={<BookOpen className="h-16 w-16" />}
    />
  );
}
