"use client";
import EmptySubPage from "@/components/empty-sub-page";
import { BookOpen } from "lucide-react";

export default function JabatanStrukturalPage() {
  return (
    <EmptySubPage
      parentTitle="Penunjang"
      parentHref="/dashboard/penunjang"
      title="Jabatan Struktural"
      description="Data jabatan struktural yang pernah atau sedang dijabat."
      section="PENUNJANG"
      icon={<BookOpen className="h-16 w-16" />}
    />
  );
}
