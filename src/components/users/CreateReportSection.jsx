"use client";

import { useState } from 'react';
import { Send, MapPin, AlignLeft, Tag, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";

export function CreateReportSection() {
  const [formData, setFormData] = useState({
    judul: '',
    deskripsi: '',
    kategori: 'Infrastruktur',
    lokasi: '',
    isAnonymous: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Connect to backend API
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Laporan berhasil dikirim!");
      setFormData({
        judul: '',
        deskripsi: '',
        kategori: 'Infrastruktur',
        lokasi: '',
        isAnonymous: false
      });
    }, 1500);
  };

  return (
    <section className="py-20 relative px-4" id="buat-laporan">
      <div className="absolute inset-0 bg-[#33D6A6]/5 transform -skew-y-2 z-0"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-10 space-y-4">
          <h2 className="text-3xl md:text-4xl font-black text-[#111827] tracking-tight">
            Sampaikan Laporan Anda
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-medium">
            Tuliskan keluhan, saran, atau aspirasi Anda dengan jelas dan lengkap. Kami menjamin kerahasiaan identitas Anda jika memilih opsi anonim.
          </p>
        </div>

        <div className="bg-white p-6 md:p-10 rounded-[2rem] shadow-xl shadow-[#33D6A6]/10 border border-[#33D6A6]/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Judul Laporan */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Tag size={16} className="text-[#33D6A6]" />
                Judul Laporan
              </label>
              <input 
                type="text" 
                required
                value={formData.judul}
                onChange={(e) => setFormData({...formData, judul: e.target.value})}
                placeholder="Ketik judul laporan Anda (misal: Jalan Berlubang di Jl. Sudirman)" 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#33D6A6]/30 focus:border-[#33D6A6] transition-all"
              />
            </div>

            {/* Isi Laporan */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <AlignLeft size={16} className="text-[#33D6A6]" />
                Isi Laporan
              </label>
              <textarea 
                required
                rows={5}
                value={formData.deskripsi}
                onChange={(e) => setFormData({...formData, deskripsi: e.target.value})}
                placeholder="Jelaskan secara detail apa yang terjadi, kapan, dan pihak yang terlibat..." 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#33D6A6]/30 focus:border-[#33D6A6] transition-all resize-y"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Kategori */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <Info size={16} className="text-[#33D6A6]" />
                  Kategori Instansi/Masalah
                </label>
                <select 
                  value={formData.kategori}
                  onChange={(e) => setFormData({...formData, kategori: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#33D6A6]/30 focus:border-[#33D6A6] transition-all appearance-none"
                >
                  <option value="Infrastruktur">Infrastruktur & Pembangunan</option>
                  <option value="Kebersihan">Kebersihan & Lingkungan</option>
                  <option value="Pelayanan Publik">Pelayanan Publik</option>
                  <option value="Kesehatan">Kesehatan</option>
                  <option value="Keamanan">Keamanan & Ketertiban</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              {/* Lokasi */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <MapPin size={16} className="text-[#33D6A6]" />
                  Lokasi Kejadian
                </label>
                <input 
                  type="text" 
                  required
                  value={formData.lokasi}
                  onChange={(e) => setFormData({...formData, lokasi: e.target.value})}
                  placeholder="Sebutkan lokasi spesifik..." 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#33D6A6]/30 focus:border-[#33D6A6] transition-all"
                />
              </div>
            </div>

            {/* Opsi Anonim & Submit */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-100 mt-6">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input 
                    type="checkbox" 
                    checked={formData.isAnonymous}
                    onChange={(e) => setFormData({...formData, isAnonymous: e.target.checked})}
                    className="w-5 h-5 rounded border-gray-300 text-[#33D6A6] focus:ring-[#33D6A6] transition-all cursor-pointer peer appearance-none checked:bg-[#33D6A6] checked:border-transparent"
                  />
                  <svg className="w-3.5 h-3.5 text-white absolute pointer-events-none opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900">Kirim sebagai Anonim</span>
                  <p className="text-[11px] text-gray-500 font-medium">Identitas Anda tidak akan ditampilkan ke publik.</p>
                </div>
              </label>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-[#33D6A6] hover:bg-emerald-500 text-white font-bold px-8 py-6 rounded-xl text-base shadow-lg shadow-[#33D6A6]/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 disabled:opacity-70 disabled:hover:scale-100 w-full sm:w-auto"
              >
                {isSubmitting ? 'Mengirim...' : (
                  <>
                    <Send size={18} />
                    Kirim Laporan
                  </>
                )}
              </Button>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
}
