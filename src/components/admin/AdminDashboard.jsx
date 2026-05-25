"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  FileText,
  Users,
  Clock,
  CheckCircle2,
  Activity,
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  TrendingUp,
  Calendar,
  Eye,
  BarChart3,
  MessageSquare,
  ShieldCheck,
  Zap
} from 'lucide-react';

export function AdminDashboard() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState("Selamat Datang");
  const [currentDate, setCurrentDate] = useState("");

  // Mock data - akan diganti dengan API nanti
  const stats = {
    totalLaporan: 156,
    laporanBaru: 12,
    sedangDiproses: 34,
    selesai: 98,
    ditolak: 12,
    totalPengguna: 342,
    penggunaBaru: 18,
  };

  const recentReports = [
    {
      id: "RPT-2026-0156",
      judul: "Jalan Rusak dan Berlubang di Jl. Merdeka",
      pelapor: "Ahmad Rizki",
      kategori: "Infrastruktur",
      status: "pending",
      tanggal: "2026-05-23",
      komentar: 3,
    },
    {
      id: "RPT-2026-0155",
      judul: "Lampu PJU Padam di Area RW 04",
      pelapor: "Siti Nurhaliza",
      kategori: "Fasilitas Umum",
      status: "diproses",
      tanggal: "2026-05-22",
      komentar: 7,
    },
    {
      id: "RPT-2026-0154",
      judul: "Penumpukan Sampah Liar di Bantaran Sungai",
      pelapor: "Budi Setiawan",
      kategori: "Kebersihan",
      status: "selesai",
      tanggal: "2026-05-21",
      komentar: 12,
    },
    {
      id: "RPT-2026-0153",
      judul: "Pohon Tumbang Menghalangi Jalan",
      pelapor: "Dewi Lestari",
      kategori: "Infrastruktur",
      status: "diproses",
      tanggal: "2026-05-21",
      komentar: 5,
    },
    {
      id: "RPT-2026-0152",
      judul: "Dugaan Pungutan Liar di Kantor Kelurahan",
      pelapor: "Anonymous",
      kategori: "Pelayanan Publik",
      status: "pending",
      tanggal: "2026-05-20",
      komentar: 0,
    },
  ];

  const topCategories = [
    { nama: "Infrastruktur", jumlah: 48, persen: 31, warna: "bg-blue-500" },
    { nama: "Kebersihan", jumlah: 35, persen: 22, warna: "bg-emerald-500" },
    { nama: "Fasilitas Umum", jumlah: 28, persen: 18, warna: "bg-amber-500" },
    { nama: "Pelayanan Publik", jumlah: 24, persen: 15, warna: "bg-violet-500" },
    { nama: "Keamanan", jumlah: 21, persen: 14, warna: "bg-rose-500" },
  ];

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 11) setGreeting("Selamat Pagi");
    else if (hour < 15) setGreeting("Selamat Siang");
    else if (hour < 19) setGreeting("Selamat Sore");
    else setGreeting("Selamat Malam");

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(new Date().toLocaleDateString('id-ID', options));

    const cached = sessionStorage.getItem('user_session');
    if (cached) {
      setUserData(JSON.parse(cached));
      setLoading(false);
    }

    const fetchMe = async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (!res.ok) {
          sessionStorage.removeItem('user_session');
          router.push('/auth/login');
          return;
        }
        const data = await res.json();
        if (data.success) {
          setUserData(data.user);
          sessionStorage.setItem('user_session', JSON.stringify(data.user));
        } else {
          sessionStorage.removeItem('user_session');
          router.push('/auth/login');
        }
      } catch {
        sessionStorage.removeItem('user_session');
        router.push('/auth/login');
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin w-10 h-10 border-4 border-[#33D6A6] border-t-transparent rounded-full"></div>
          <p className="text-sm font-semibold text-gray-500">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

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
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold tracking-wide uppercase mb-1">
            <Calendar size={14} className="text-gray-400" />
            {currentDate}
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
            {greeting}, <span className="text-[#33D6A6]">{userData?.username || 'Admin'}</span>! 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Kelola dan pantau semua laporan pengaduan masyarakat dari sini.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/laporan"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-tr from-[#33D6A6] to-emerald-400 hover:from-emerald-500 hover:to-emerald-400 text-white text-sm font-bold rounded-xl shadow-md shadow-[#33D6A6]/20 hover:shadow-lg hover:shadow-[#33D6A6]/30 transition-all duration-200 hover:scale-[1.02]"
          >
            <Eye size={16} />
            Lihat Semua Laporan
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Total Laporan */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Laporan</span>
            <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 border border-gray-100">
              <FileText size={18} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl md:text-3xl font-black text-gray-900 leading-none">{stats.totalLaporan}</h3>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                <ArrowUpRight size={10} /> +{stats.laporanBaru}
              </span>
              <span className="text-[10px] text-gray-400 font-medium">minggu ini</span>
            </div>
          </div>
        </div>

        {/* Menunggu */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Menunggu</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-100/50">
              <Clock size={18} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl md:text-3xl font-black text-amber-600 leading-none">{stats.laporanBaru}</h3>
            <p className="text-[10px] text-gray-400 mt-1 font-medium">Perlu ditinjau segera</p>
          </div>
        </div>

        {/* Diproses */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Diproses</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 border border-blue-100/50">
              <Activity size={18} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl md:text-3xl font-black text-blue-600 leading-none">{stats.sedangDiproses}</h3>
            <p className="text-[10px] text-gray-400 mt-1 font-medium">Sedang ditindaklanjuti</p>
          </div>
        </div>

        {/* Selesai */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Selesai</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-[#33D6A6] border border-emerald-100/50">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl md:text-3xl font-black text-emerald-600 leading-none">{stats.selesai}</h3>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                <TrendingUp size={10} /> 63%
              </span>
              <span className="text-[10px] text-gray-400 font-medium">tingkat penyelesaian</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left: Recent Reports */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <Zap size={16} className="text-[#33D6A6]" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Laporan Terbaru</h2>
              </div>
              <Link href="/admin/laporan" className="text-xs font-bold text-[#33D6A6] hover:text-emerald-500 transition-colors flex items-center gap-1">
                Lihat Semua
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="divide-y divide-gray-50">
              {recentReports.map((report) => (
                <div
                  key={report.id}
                  className="px-6 py-4 hover:bg-gray-50/50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold text-gray-400 tracking-wider font-mono">{report.id}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full" />
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md capitalize">{report.kategori}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full" />
                        <span className="text-[10px] text-gray-400 font-medium">{report.tanggal}</span>
                      </div>
                      <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#33D6A6] transition-colors truncate">
                        {report.judul}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-gray-400 font-medium">
                          oleh <span className="text-gray-600 font-semibold">{report.pelapor}</span>
                        </span>
                        {report.komentar > 0 && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-gray-400 font-medium">
                            <MessageSquare size={10} />
                            {report.komentar}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="shrink-0 pt-1">
                      {getStatusBadge(report.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet-500 border border-violet-100/50 shrink-0">
                <Users size={18} />
              </div>
              <div>
                <p className="text-xl font-black text-gray-900 leading-none">{stats.totalPengguna}</p>
                <p className="text-[10px] text-gray-400 font-semibold mt-1 uppercase tracking-wider">Total User</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-500 border border-sky-100/50 shrink-0">
                <Users size={18} />
              </div>
              <div>
                <p className="text-xl font-black text-gray-900 leading-none">+{stats.penggunaBaru}</p>
                <p className="text-[10px] text-gray-400 font-semibold mt-1 uppercase tracking-wider">User Baru</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500 border border-rose-100/50 shrink-0">
                <AlertCircle size={18} />
              </div>
              <div>
                <p className="text-xl font-black text-gray-900 leading-none">{stats.ditolak}</p>
                <p className="text-[10px] text-gray-400 font-semibold mt-1 uppercase tracking-wider">Ditolak</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Sidebar Widgets */}
        <div className="lg:col-span-1 space-y-6">

          {/* Status Distribution */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                <BarChart3 size={16} className="text-[#33D6A6]" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Distribusi Status</h2>
            </div>

            <div className="space-y-3.5">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-gray-600">Menunggu</span>
                  <span className="font-bold text-amber-600">{Math.round((stats.laporanBaru / stats.totalLaporan) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-1000" style={{ width: `${(stats.laporanBaru / stats.totalLaporan) * 100}%` }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-gray-600">Diproses</span>
                  <span className="font-bold text-blue-600">{Math.round((stats.sedangDiproses / stats.totalLaporan) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-1000" style={{ width: `${(stats.sedangDiproses / stats.totalLaporan) * 100}%` }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-gray-600">Selesai</span>
                  <span className="font-bold text-emerald-600">{Math.round((stats.selesai / stats.totalLaporan) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#33D6A6] to-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${(stats.selesai / stats.totalLaporan) * 100}%` }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-gray-600">Ditolak</span>
                  <span className="font-bold text-rose-600">{Math.round((stats.ditolak / stats.totalLaporan) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-rose-400 to-rose-500 rounded-full transition-all duration-1000" style={{ width: `${(stats.ditolak / stats.totalLaporan) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Top Categories */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                <FileText size={16} className="text-[#33D6A6]" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Top Kategori</h2>
            </div>

            <div className="space-y-3">
              {topCategories.map((cat, i) => (
                <div key={cat.nama} className="flex items-center gap-3 group cursor-pointer">
                  <span className="text-[11px] font-bold text-gray-400 w-5 text-center">{i + 1}</span>
                  <div className={`w-2 h-2 rounded-full ${cat.warna} shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-700 group-hover:text-[#33D6A6] transition-colors truncate">{cat.nama}</span>
                      <span className="text-[11px] font-bold text-gray-500 shrink-0 ml-2">{cat.jumlah}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Admin Access Info */}
          <div className="bg-gradient-to-tr from-slate-900 to-slate-800 text-white p-6 rounded-3xl shadow-lg border border-slate-700 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-slate-700/50 flex items-center justify-center text-[#33D6A6]">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="font-bold text-sm">Akses {userData?.role === 'admin' ? 'Administrator' : 'Petugas'}</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Anda memiliki akses penuh untuk mengelola semua laporan, memverifikasi pengaduan, dan memberikan tanggapan resmi kepada pelapor.
              </p>
            </div>
            <Link href="/admin/laporan" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#33D6A6] hover:text-emerald-300 transition-colors">
              Kelola Laporan
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
