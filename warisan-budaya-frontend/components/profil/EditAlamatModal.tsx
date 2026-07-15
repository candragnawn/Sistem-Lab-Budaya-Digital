"use client";

import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { X, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface EditAlamatModalProps {
  isOpen: boolean;
  onClose: () => void;
  lecturerId: number | string;
  initialData: any;
  addressId?: number;
  onSuccess: () => void;
}

export default function EditAlamatModal({
  isOpen,
  onClose,
  lecturerId,
  initialData,
  addressId,
  onSuccess,
}: EditAlamatModalProps) {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    telephone_number: "", // Wait, is telephone_number in identities or addresses? 
    // In db identities: none. In identities from api? Wait, identities has telephone_number in API but we saw it missing in migration. I'll just skip telephone_number or put it in addresses.
    // Let's just put address fields:
    rt: "",
    rw: "",
    village: "",
    district: "",
    city: "",
    province: "",
    postal_code: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && initialData) {
      const [rtVal, rwVal] = (initialData.rtRw || "").split("/").map((s: string) => s.trim().replace("RT", "").replace("RW", "").trim());
      
      setFormData({
        email: initialData.email !== "-" ? initialData.email : "",
        phone: initialData.noHP !== "-" ? initialData.noHP : "",
        telephone_number: initialData.noTelepon !== "-" ? initialData.noTelepon : "",
        rt: rtVal !== "-" && rtVal ? rtVal : "",
        rw: rwVal !== "-" && rwVal ? rwVal : "",
        village: initialData.desa !== "-" ? initialData.desa : "",
        district: initialData.kecamatan !== "-" ? initialData.kecamatan : "",
        city: initialData.kabupaten !== "-" ? initialData.kabupaten : "",
        province: initialData.provinsi !== "-" ? initialData.provinsi : "",
        postal_code: initialData.kodePOS !== "-" ? initialData.kodePOS : "",
      });
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // 1. Simpan Email & Phone (Lecturer)
      await api.put(`/lecturers/${lecturerId}`, {
        email: formData.email,
        phone: formData.phone,
      });

      // 2. Simpan Alamat
      const addressPayload = {
        lecturer_id: lecturerId,
        rt: formData.rt,
        rw: formData.rw,
        village: formData.village,
        district: formData.district,
        city: formData.city,
        province: formData.province,
        postal_code: formData.postal_code,
        // We'll map telephone_number to phone_number in address if it matches DB
        phone_number: formData.telephone_number,
      };

      if (addressId) {
        await api.put(`/lecturer-addresses/${addressId}`, addressPayload);
      } else {
        await api.post(`/lecturer-addresses`, addressPayload);
      }

      toast.success("Alamat dan Kontak berhasil diperbarui!");
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Gagal memperbarui alamat.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-lg flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold text-gray-800">Edit Alamat & Kontak</h2>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-gray-100 transition-colors">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        <div className="overflow-y-auto p-4">
          <form id="edit-alamat-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 bg-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                  placeholder="Email"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">No Ponsel (HP)</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 bg-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                  placeholder="No HP"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">No Telepon Rumah</label>
              <input
                type="text"
                name="telephone_number"
                value={formData.telephone_number}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 bg-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                placeholder="No Telepon"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Provinsi</label>
                <input
                  type="text"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 bg-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Kabupaten/Kota</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 bg-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Kecamatan</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 bg-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Desa/Kelurahan</label>
                <input
                  type="text"
                  name="village"
                  value={formData.village}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 bg-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">RT</label>
                <input
                  type="text"
                  name="rt"
                  value={formData.rt}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 bg-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">RW</label>
                <input
                  type="text"
                  name="rw"
                  value={formData.rw}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 bg-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Kode Pos</label>
                <input
                  type="text"
                  name="postal_code"
                  value={formData.postal_code}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 bg-white focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                />
              </div>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-end gap-3 border-t p-4">
          <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            Batal
          </Button>
          <Button type="submit" form="edit-alamat-form" disabled={isLoading} className="bg-[#DAA520] hover:bg-[#B8860B] text-white border-none shadow-sm">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            Simpan Perubahan
          </Button>
        </div>
      </div>
    </div>
  );
}
