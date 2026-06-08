"use client";
import EmptySubPage from "@/components/empty-sub-page";
import { BookOpen } from "lucide-react";

export default function ManajerJurnalPage() {
  return (
    <EmptySubPage
      parentTitle="Penunjang"
      parentHref="/dashboard/penunjang"
      title="Manajer Jurnal"
      description="Data pengelolaan jurnal ilmiah."
      section="PENUNJANG"
      icon={<BookOpen className="h-16 w-16" />}
    />
  );
}
