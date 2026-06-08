"use client";
import EmptySubPage from "@/components/empty-sub-page";
import { BookOpen } from "lucide-react";

export default function KeanggotaanPage() {
  return (
    <EmptySubPage
      parentTitle="Penunjang"
      parentHref="/dashboard/penunjang"
      title="Keanggotaan Profesi"
      description="Data keanggotaan dalam organisasi profesi."
      section="PENUNJANG"
      icon={<BookOpen className="h-16 w-16" />}
    />
  );
}
