"use client";

import { useState } from 'react';
import {
  FileText,
  Search,
  Clock,
  CheckCircle2,
  Activity,
  AlertCircle,
  Eye,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  SlidersHorizontal,
  ArrowUpDown,
  MapPin,
  Calendar,
  User
} from 'lucide-react';

export function AdminLaporan() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('semua');
  const [currentPage, setCurrentPage] = useState(1);

  const allReports = [
    {
      id: "RPT-2026-0156",
      judul: "Jalan Rusak dan Berlubang di Jl. Merdeka",
      pelapor: "Ahmad Rizki",
      kategori: "Infrastruktur",
      status: "pending",
      tanggal: "2026-05-23",
      lokasi: "Jl. Merdeka No. 45, Kel. Sukajadi",
      komentar: 3,
    },
    {
      id: "RPT-2026-0155",
      judul: "Lampu PJU Padam di Area RW 04",
      pelapor: "Siti Nurhaliza",
      kategori: "Fasilitas Umum",
      status: "diproses",
      tanggal: "2026-05-22",
      lokasi: "RW 04, Kel. Cibiru",
      komentar: 7,
    },
    {
      id: "RPT-2026-0154",
      judul: "Penumpukan Sampah Liar di Bantaran Sungai",
      pelapor: "Budi Setiawan",
      kategori: "Kebersihan",
      status: "selesai",
      tanggal: "2026-05-21",
      lokasi: "Bantaran Sungai Cikapundung",
      komentar: 12,
    },
    {
      id: "RPT-2026-0153",
      judul: "Pohon Tumbang Menghalangi Jalan",
      pelapor: "Dewi Lestari",
      kategori: "Infrastruktur",
      status: "diproses",
      tanggal: "2026-05-21",
      lokasi: "Jl. Raya Cipadung No. 12",
      komentar: 5,
    },
    {
      id: "RPT-2026-0152",
      judul: "Dugaan Pungutan Liar di Kantor Kelurahan",
      pelapor: "Anonymous",
      kategori: "Pelayanan Publik",
      status: "pending",
      tanggal: "2026-05-20",
      lokasi: "Kantor Kelurahan Antapani",
      komentar: 0,
    },
    {
      id: "RPT-2026-0151",
      judul: "Kerusakan Fasilitas Taman Kota",
      pelapor: "Rina Handayani",
      kategori: "Fasilitas Umum",
      status: "selesai",
      tanggal: "2026-05-19",
      lokasi: "Taman Kota Bandung",
      komentar: 8,
    },
    {
      id: "RPT-2026-0150",
      judul: "Banjir Akibat Drainase Tersumbat",
      pelapor: "Hendra Wijaya",
      kategori: "Infrastruktur",
      status: "ditolak",
      tanggal: "2026-05-18",
      lokasi: "Jl. Gatot Subroto, Kel. Turangga",
      komentar: 2,
    },
    {
      id: "RPT-2026-0149",
      judul: "Kebisingan Pabrik di Lingkungan Perumahan",
      pelapor: "Agus Prasetyo",
      kategori: "Keamanan",
      status: "diproses",
      tanggal: "2026-05-17",
      lokasi: "Perum Griya Asri, Kel. Rancasari",
      komentar: 4,
    },
  ];

  const filters = [
    { key: 'semua', label: 'Semua', count: allReports.length },
    { key: 'pending', label: 'Menunggu', count: allReports.filter(r => r.status === 'pending').length },
    { key: 'diproses', label: 'Diproses', count: allReports.filter(r => r.status === 'diproses').length },
    { key: 'selesai', label: 'Selesai', count: allReports.filter(r => r.status === 'selesai').length },
    { key: 'ditolak', label: 'Ditolak', count: allReports.filter(r => r.status === 'ditolak').length },
  ];

  const filteredReports = allReports.filter((report) => {
    const matchFilter = activeFilter === 'semua' || report.status === activeFilter;
    const matchSearch = searchQuery === '' ||
      report.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.pelapor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });

  const getStatusBadge = (status) => {
    const badges = {
      pending: (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-100">
          <Clock size={11} className="shrink-0" />
          Menunggu
        </span>
      ),
      diproses: (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
          <Activity size={11} className="shrink-0 animate-pulse" />
          Diproses
        </span>
      ),
      selesai: (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
          <CheckCircle2 size={11} className="shrink-0" />
          Selesai
        </span>
      ),
      ditolak: (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-red-50 text-red-700 border border-red-100">
          <AlertCircle size={11} className="shrink-0" />
          Ditolak
        </span>
      ),
    };
    return badges[status] || null;
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
          Kelola Laporan
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Tinjau, proses, dan tanggapi semua laporan pengaduan masyarakat.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari berdasarkan judul, ID, atau nama pelapor..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#33D6A6]/20 focus:border-[#33D6A6]/50 transition"
            />
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition shrink-0">
            <SlidersHorizontal size={15} />
            Filter Lanjutan
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => { setActiveFilter(filter.key); setCurrentPage(1); }}
              className={`
                inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200
                ${activeFilter === filter.key
                  ? 'bg-[#33D6A6] text-white shadow-md shadow-[#33D6A6]/20'
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700 border border-gray-200'
                }
              `}
            >
              {filter.label}
              <span className={`
                px-1.5 py-0.5 rounded-md text-[10px] font-black
                ${activeFilter === filter.key ? 'bg-white/20 text-white' : 'bg-gray-200/60 text-gray-500'}
              `}>
                {filter.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50/80 border-b border-gray-100">
          <div className="col-span-5 flex items-center gap-1.5">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Laporan</span>
            <ArrowUpDown size={10} className="text-gray-300" />
          </div>
          <div className="col-span-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pelapor</span>
          </div>
          <div className="col-span-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tanggal</span>
          </div>
          <div className="col-span-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</span>
          </div>
          <div className="col-span-1 text-right">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Aksi</span>
          </div>
        </div>

        {/* Report Rows */}
        {filteredReports.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400 space-y-3">
            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 border border-gray-100">
              <FileText size={28} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500">Tidak ada laporan ditemukan</p>
              <p className="text-xs text-gray-400 mt-0.5">Coba ubah filter atau kata kunci pencarian Anda.</p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="md:grid md:grid-cols-12 md:gap-4 px-6 py-4 hover:bg-gray-50/50 transition-colors cursor-pointer group"
              >
                {/* Laporan Info */}
                <div className="col-span-5 space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold text-gray-400 tracking-wider font-mono">{report.id}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">{report.kategori}</span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#33D6A6] transition-colors line-clamp-1">
                    {report.judul}
                  </h3>
                  <div className="flex items-center gap-2 text-[10px] text-gray-400">
                    <MapPin size={10} className="shrink-0" />
                    <span className="truncate">{report.lokasi}</span>
                  </div>
                </div>

                {/* Pelapor */}
                <div className="col-span-2 flex items-center mt-2 md:mt-0">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 border border-gray-200/50 shrink-0">
                      <User size={13} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-700 truncate">{report.pelapor}</p>
                      {report.komentar > 0 && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] text-gray-400 font-medium">
                          <MessageSquare size={9} />
                          {report.komentar} komentar
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tanggal */}
                <div className="col-span-2 flex items-center mt-2 md:mt-0">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                    <Calendar size={12} className="text-gray-400 shrink-0" />
                    {report.tanggal}
                  </div>
                </div>

                {/* Status */}
                <div className="col-span-2 flex items-center mt-2 md:mt-0">
                  {getStatusBadge(report.status)}
                </div>

                {/* Aksi */}
                <div className="col-span-1 flex items-center justify-end mt-2 md:mt-0">
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition">
                    <Eye size={15} />
                  </button>
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition">
                    <MoreHorizontal size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50">
          <p className="text-xs text-gray-500 font-medium">
            Menampilkan <span className="font-bold text-gray-700">{filteredReports.length}</span> dari <span className="font-bold text-gray-700">{allReports.length}</span> laporan
          </p>
          <div className="flex items-center gap-1.5">
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-white hover:text-gray-600 border border-transparent hover:border-gray-200 transition disabled:opacity-40 disabled:cursor-not-allowed" disabled>
              <ChevronLeft size={15} />
            </button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-white bg-[#33D6A6] text-xs font-bold shadow-sm shadow-[#33D6A6]/20">
              1
            </button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-white hover:text-gray-700 border border-transparent hover:border-gray-200 transition text-xs font-bold">
              2
            </button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-white hover:text-gray-600 border border-transparent hover:border-gray-200 transition">
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
