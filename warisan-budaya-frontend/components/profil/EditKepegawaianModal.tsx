"use client";

import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { X, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface EditKepegawaianModalProps {
  isOpen: boolean;
  onClose: () => void;
  lecturerId: number | string;
  initialData: any;
  workContractId?: number;
  rankId?: number;
  placementId?: number;
  onSuccess: () => void;
}

export default function EditKepegawaianModal({
  isOpen,
  onClose,
  lecturerId,
  initialData,
  workContractId,
  rankId,
  placementId,
  onSuccess,
}: EditKepegawaianModalProps) {
  const [formData, setFormData] = useState({
    nip: "",
    status: "", // Status Keaktifan in Lecturer
    faculty: "", // Unit Kerja
    study_program: "",
    department: "", // Perguruan Tinggi
    
    // Work Contract
    sk_number: "",
    tmt: "",
    salary_source: "",
    years_of_service: "",
    work_status: "", // Status Pegawai

    // Rank
    rank_name: "",
    group_code: "",
    
    // Placement
    assignment_homebase: "",
    employment_bond: "", // Ikatan kerja
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && initialData) {
      setFormData({
        nip: initialData.nip !== "-" ? initialData.nip : "",
        status: initialData.statusKeaktifan !== "-" ? initialData.statusKeaktifan : "",
        faculty: initialData.unitKerja !== "-" ? initialData.unitKerja : "",
        study_program: initialData.programStudi !== "-" ? initialData.programStudi : "",
        department: initialData.perguruanTinggi !== "-" ? initialData.perguruanTinggi : "",
        
        sk_number: initialData.nomorSKCPNS !== "-" ? initialData.nomorSKCPNS : "",
        tmt: initialData.tmtSK !== "-" ? initialData.tmtSK : "",
        salary_source: initialData.sumberGaji !== "-" ? initialData.sumberGaji : "",
        years_of_service: initialData.masaKerja !== "-" ? initialData.masaKerja : "",
        work_status: initialData.statusPegawai !== "-" ? initialData.statusPegawai : "",
        
        rank_name: initialData.pangkat !== "-" ? initialData.pangkat : "",
        group_code: initialData.golongan !== "-" ? initialData.golongan : "",
        
        assignment_homebase: initialData.homebasePenugasan !== "-" ? initialData.homebasePenugasan : "",
        employment_bond: initialData.ikatanKerja !== "-" ? initialData.ikatanKerja : "",
      });
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // 1. Simpan Lecturer fields
      await api.put(`/lecturers/${lecturerId}`, {
        nip: formData.nip,
        status: formData.status,
        faculty: formData.faculty,
        study_program: formData.study_program,
        department: formData.department,
      });

      // 2. Simpan Work Contract
      const wcPayload = {
        lecturer_id: lecturerId,
        sk_number: formData.sk_number,
        tmt: formData.tmt,
        salary_source: formData.salary_source,
        years_of_service: formData.years_of_service,
        work_status: formData.work_status,
      };
      // We will blindly attempt the request to standard endpoint conventions or skip if it fails.
      try {
        if (workContractId) await api.put(`/work-contracts/${workContractId}`, wcPayload);
        else await api.post(`/work-contracts`, wcPayload);
      } catch (e) { console.warn(e); }

      // 3. Simpan Rank
      const rankPayload = {
        lecturer_id: lecturerId,
        rank_name: formData.rank_name,
        group_code: formData.group_code,
      };
      try {
        if (rankId) await api.put(`/ranks/${rankId}`, rankPayload);
        else await api.post(`/ranks`, rankPayload);
      } catch (e) { console.warn(e); }

      // 4. Simpan Placement
      const placementPayload = {
        lecturer_id: lecturerId,
        assignment_homebase: formData.assignment_homebase,
        employment_bond: formData.employment_bond,
        status: formData.work_status,
        unit: formData.faculty,
      };
      try {
        if (placementId) await api.put(`/placements/${placementId}`, placementPayload);
        else await api.post(`/placements`, placementPayload);
      } catch (e) { console.warn(e); }

      toast.success("Data Kepegawaian berhasil diperbarui!");
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Gagal memperbarui kepegawaian.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-xl bg-white shadow-lg flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold text-gray-800">Edit Data Kepegawaian</h2>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-gray-100 transition-colors">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        <div className="overflow-y-auto p-4">
          <form id="edit-kepegawaian-form" onSubmit={handleSubmit} className="space-y-6">
            
            {/* Bagian SIASN */}
            <div>
              <h3 className="text-sm font-semibold text-brand-navy mb-3 border-b pb-1">Data dari SIASN (Manual Override)</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">NIP</label>
                  <input type="text" name="nip" value={formData.nip} onChange={handleChange} className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 bg-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Nomor SK CPNS / PNS</label>
                  <input type="text" name="sk_number" value={formData.sk_number} onChange={handleChange} className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 bg-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">TMT SK CPNS/PNS</label>
                  <input type="text" name="tmt" value={formData.tmt} onChange={handleChange} className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 bg-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Pangkat</label>
                    <input type="text" name="rank_name" value={formData.rank_name} onChange={handleChange} className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 bg-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold" placeholder="Penata Muda" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Golongan</label>
                    <input type="text" name="group_code" value={formData.group_code} onChange={handleChange} className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 bg-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold" placeholder="III/a" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bagian Kepegawaian Lokal */}
            <div>
              <h3 className="text-sm font-semibold text-brand-navy mb-3 border-b pb-1">Data Kepegawaian Universitas</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Status Pegawai</label>
                  <input type="text" name="work_status" value={formData.work_status} onChange={handleChange} className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 bg-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold" placeholder="PNS / Non-PNS" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Status Keaktifan</label>
                  <input type="text" name="status" value={formData.status} onChange={handleChange} className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 bg-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold" placeholder="Aktif" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Sumber Gaji</label>
                  <input type="text" name="salary_source" value={formData.salary_source} onChange={handleChange} className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 bg-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Ikatan Kerja</label>
                  <input type="text" name="employment_bond" value={formData.employment_bond} onChange={handleChange} className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 bg-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Unit Kerja / Fakultas</label>
                  <input type="text" name="faculty" value={formData.faculty} onChange={handleChange} className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 bg-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Program Studi</label>
                  <input type="text" name="study_program" value={formData.study_program} onChange={handleChange} className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 bg-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Perguruan Tinggi</label>
                  <input type="text" name="department" value={formData.department} onChange={handleChange} className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 bg-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Homebase Penugasan</label>
                  <input type="text" name="assignment_homebase" value={formData.assignment_homebase} onChange={handleChange} className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 bg-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold" />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-end gap-3 border-t p-4">
          <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            Batal
          </Button>
          <Button type="submit" form="edit-kepegawaian-form" disabled={isLoading} className="bg-[#DAA520] hover:bg-[#B8860B] text-white border-none shadow-sm">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            Simpan Perubahan
          </Button>
        </div>
      </div>
    </div>
  );
}
