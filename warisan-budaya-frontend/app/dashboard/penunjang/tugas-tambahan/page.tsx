"use client";
import EmptySubPage from "@/components/empty-sub-page";
import { BookOpen } from "lucide-react";

export default function TugasTambahanPage() {
  return (
    <EmptySubPage
      parentTitle="Penunjang"
      parentHref="/dashboard/penunjang"
      title="Tugas Tambahan"
      description="Data tugas tambahan di luar tugas pokok."
      section="PENUNJANG"
      icon={<BookOpen className="h-16 w-16" />}
    />
  );
}
