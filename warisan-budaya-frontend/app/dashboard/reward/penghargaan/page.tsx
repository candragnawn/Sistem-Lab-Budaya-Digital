"use client";
import EmptySubPage from "@/components/empty-sub-page";
import { BookOpen } from "lucide-react";

export default function PenghargaanPage() {
  return (
    <EmptySubPage
      parentTitle="Reward"
      parentHref="/dashboard/reward"
      title="Penghargaan"
      description="Data penghargaan dan apresiasi yang pernah diterima."
      section="REWARD"
      icon={<BookOpen className="h-16 w-16" />}
    />
  );
}
