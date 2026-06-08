import React from "react";
import { User, FileText } from "lucide-react";
import type { Publication } from "../types";

interface PublicationCardProps {
  pub: Publication;
}

export default function PublicationCard({ pub }: PublicationCardProps) {
  return (
    <div className="border border-slate-100 rounded-xl p-5 hover:shadow-md transition-shadow bg-white flex justify-between items-start gap-4">
      <div className="space-y-3 flex-grow">
        <h3 className="text-[15px] font-semibold text-slate-800 leading-snug">{pub.title}</h3>
        <p className="text-sm text-slate-600">{pub.venue}</p>
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
          <span className="bg-slate-100 px-2 py-1 rounded font-medium text-slate-600">{pub.year}</span>
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" /> Author Order: {pub.authorOrder}
          </div>
          <div className="flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" /> {pub.type}
          </div>
        </div>
      </div>
      <div className="flex-shrink-0 flex flex-col items-center justify-center border border-slate-100 rounded-lg w-16 h-16 bg-[#FAFAFA]">
        <span className="text-xl font-bold text-slate-700 leading-none mb-1">{pub.citations}</span>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Citasi</span>
      </div>
    </div>
  );
}
