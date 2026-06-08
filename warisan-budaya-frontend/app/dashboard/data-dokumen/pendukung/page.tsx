"use client";
import EmptySubPage from "@/components/empty-sub-page";
import { BookOpen } from "lucide-react";

export default function DokumenPendukungPage() {
  return (
    <EmptySubPage
      parentTitle="Data Dokumen"
      parentHref="/dashboard/data-dokumen"
      title="Dokumen Pendukung"
      description="Data dokumen pendukung dan lampiran."
      section="DATA DOKUMEN"
      icon={<BookOpen className="h-16 w-16" />}
    />
  );
}
