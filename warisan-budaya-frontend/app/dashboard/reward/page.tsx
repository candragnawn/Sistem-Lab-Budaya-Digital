"use client";
import { useState, useEffect, useCallback } from "react";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Download, RefreshCw, Plus, Search, Eye, Pencil, Trash2, Home, ChevronRight, Trophy, Star } from "lucide-react";

interface UserData { name: string; role: string; photo: string; }

interface Reward {
  id: number;
  name: string;
  year: number;
  type: string;
  level: string;
  issuer: string;
}

const tingkatColors: Record<string, string> = {
  "Internasional": "bg-violet-50 text-violet-600",
  "Nasional": "bg-sky-50 text-sky-600",
  "Universitas": "bg-emerald-50 text-emerald-700",
};

export default function RewardPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [rewardData, setRewardData] = useState<Reward[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/awards');
      const items = res.data?.data || [];
      const mapped = items.map((item: any) => ({
        id: item.id,
        name: item.name || item.award_name,
        year: item.year,
        type: item.type || "Penghargaan",
        level: item.level || "Nasional",
        issuer: item.issuer || item.awarder || "Unknown"
      }));
      setRewardData(mapped);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { 
    const s = localStorage.getItem("user"); 
    if (s) setUser(JSON.parse(s)); 
    fetchData();
  }, [fetchData]);
  
  if (!user) return null;
  const filteredData = rewardData.filter(i => 
    i.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    i.issuer.toLowerCase().includes(searchQuery.toLowerCase()) || 
    i.level.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="text-sm text-gray-500"><span className="text-brand-navy font-medium">Universitas Udayana</span><span className="mx-2">/</span><span>Laboratorium Warisan Budaya Digital</span></div>
      <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-brand-gold">
              <img src={user.photo} alt={user.name} className="h-full w-full object-cover" />
              <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 ring-2 ring-white"><CheckCircle className="h-3 w-3 text-white" /></div>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-700">{user.name}</h1>
              <p className="text-sm text-amber-600/80 font-medium">{user.role}</p>
              <div className="mt-2 flex items-center gap-1 text-xs text-gray-500"><Trophy className="h-3 w-3" /> {rewardData.length} penghargaan tercatat</div>
            </div>
          </div>
          <div className="flex gap-2">
            
            <Button size="sm" variant="outline" className="text-xs gap-1.5 border-gray-300"><Download className="h-3 w-3" /> Unduh CV</Button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Home className="h-4 w-4 text-gray-400" /><span className="text-gray-400">Ikhtisar</span><ChevronRight className="h-3 w-3 text-gray-400" /><span className="text-brand-navy/80 font-medium">Reward</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Penghargaan", value: rewardData.length, icon: <Trophy className="h-5 w-5" />, color: "text-brand-gold bg-brand-gold/10" },
          { label: "Tingkat Internasional", value: rewardData.filter(d => d.level === "Internasional").length, icon: <Star className="h-5 w-5" />, color: "text-violet-500 bg-violet-50/60" },
          { label: "Tingkat Nasional", value: rewardData.filter(d => d.level === "Nasional").length, icon: <Star className="h-5 w-5" />, color: "text-sky-600 bg-sky-50" },
          { label: "Tanda Jasa", value: rewardData.filter(d => d.type === "Tanda Jasa").length, icon: <CheckCircle className="h-5 w-5" />, color: "text-emerald-600 bg-emerald-50/60" },
        ].map((stat, idx) => (
          <div key={idx} className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">
            <div className={`h-8 w-8 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>{stat.icon}</div>
            <p className="text-2xl font-medium text-gray-600">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-brand-gold/5 to-transparent p-6 border-b border-gray-100">
          <div className="flex items-start justify-between">
            <div><p className="text-xs font-medium uppercase tracking-wider text-amber-600/70 mb-1">REWARD</p><h2 className="text-2xl font-medium text-gray-600">Penghargaan &amp; Tanda Jasa</h2><p className="mt-1.5 text-sm text-gray-500">Daftar penghargaan dan tanda jasa yang telah diterima.</p></div>
            <div className="flex items-center rounded-full bg-gray-100 px-3 py-1.5"><span className="text-xs font-medium text-gray-500">{filteredData.length} data</span></div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
            <div className="relative max-w-xs"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" /><Input placeholder="Cari penghargaan..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 h-10 text-sm border-gray-200 rounded-lg" /></div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="text-xs gap-1.5 border-gray-300"><Download className="h-3.5 w-3.5" /> Ekspor</Button>
              <Button size="sm" className="bg-brand-navy text-white text-xs gap-1.5"><Plus className="h-3.5 w-3.5" /> Tambah Data</Button>
            </div>
          </div>
          <div className="space-y-3">
            {filteredData.map((item) => (
              <div key={item.id} className="flex items-center gap-4 rounded-xl border border-gray-200 p-4 hover:border-brand-gold/40 hover:bg-brand-gold/5 transition-all">
                <div className="h-12 w-12 rounded-xl bg-brand-gold/10 flex items-center justify-center shrink-0"><Trophy className="h-6 w-6 text-brand-gold" /></div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-700 text-sm">{item.name}</h3>
                  <p className="text-xs text-gray-500">{item.issuer} · {item.year}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${tingkatColors[item.level] || "bg-gray-100 text-gray-600"}`}>{item.level}</span>
                  <div className="flex gap-1">
                    <button className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-600" id={`view-reward-${item.id}`}><Eye className="h-3.5 w-3.5" /></button>
                    <button className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-yellow-50 hover:text-yellow-600" id={`edit-reward-${item.id}`}><Pencil className="h-3.5 w-3.5" /></button>
                    <button className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600" id={`delete-reward-${item.id}`}><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                </div>
              </div>
            ))}
            {filteredData.length === 0 && <div className="flex flex-col items-center gap-2 py-12"><Search className="h-8 w-8 text-gray-300" /><p className="text-sm text-gray-400">Tidak ada data ditemukan</p></div>}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs text-gray-500">Menampilkan {filteredData.length} dari {rewardData.length} data</p>
            <div className="flex items-center gap-1">
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-400 disabled:opacity-40" disabled={currentPage === 1}><ChevronRight className="h-3.5 w-3.5 rotate-180" /></button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-navy text-xs font-bold text-white">{currentPage}</button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-400 disabled:opacity-40" disabled><ChevronRight className="h-3.5 w-3.5" /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
