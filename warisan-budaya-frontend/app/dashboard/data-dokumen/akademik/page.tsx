"use client";
import EmptySubPage from "@/components/empty-sub-page";
import { BookOpen } from "lucide-react";

export default function DokumenAkademikPage() {
  return (
    <EmptySubPage
      parentTitle="Data Dokumen"
      parentHref="/dashboard/data-dokumen"
      title="Dokumen Akademik"
      description="Data dokumen akademik dan sertifikat pendidikan."
      section="DATA DOKUMEN"
      icon={<BookOpen className="h-16 w-16" />}
    />
  );
}
