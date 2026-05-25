"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  FileText,
  PlusCircle,
  Activity,
  User,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Calendar,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function UsersDashboard() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState("Selamat Datang");
  const [currentDate, setCurrentDate] = useState("");

  // Mock data for user's reports since backend API is not ready
  const [reports, setReports] = useState([
    {
      id: "REP-2026-001",
      judul: "Jalan Rusak dan Berlubang di Jl. Merdeka",
      deskripsi: "Ada lubang besar di tengah jalan yang sangat membahayakan pengendara motor, terutama di malam hari.",
      kategori: "Infrastruktur",
      status: "diproses",
      tanggal: "2026-05-22",
    },
    {
      id: "REP-2026-002",
      judul: "Lampu Penerangan Jalan Umum Padam",
      deskripsi: "Lampu jalan di area RW 04 mati sejak seminggu lalu, membuat lingkungan gelap gulita dan rawan kriminalitas.",
      kategori: "Fasilitas Umum",
      status: "pending",
      tanggal: "2026-05-20",
    },
    {
      id: "REP-2026-003",
      judul: "Penumpukan Sampah Liar di Pinggir Sungai",
      deskripsi: "Warga membuang sampah sembarangan di bantaran sungai sehingga menimbulkan bau tidak sedap.",
      kategori: "Kebersihan/Lingkungan",
      status: "selesai",
      tanggal: "2026-05-18",
    }
  ]);

  useEffect(() => {
    // Set dynamic greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 11) setGreeting("Selamat Pagi");
    else if (hour < 15) setGreeting("Selamat Siang");
    else if (hour < 19) setGreeting("Selamat Sore");
    else setGreeting("Selamat Malam");

    // Format current date in Indonesian
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(new Date().toLocaleDateString('id-ID', options));

    // Try to load user data from cache first
    const cached = sessionStorage.getItem('user_session');
    if (cached) {
      setUserData(JSON.parse(cached));
      setLoading(false);
    }

    const fetchMe = async () => {
      try {
        const res = await fetch('/api/auth/me', {
          credentials: 'include',
        });

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
      } catch (error) {
        console.error("Gagal mengambil data user:", error);
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
          <p className="text-sm font-semibold text-gray-500">Memuat halaman...</p>
        </div>
      </div>
    );
  }



  // Stats computation from local reports
  const totalReports = reports.length;
  const pendingReports = reports.filter(r => r.status === 'pending').length;
  const processReports = reports.filter(r => r.status === 'diproses').length;
  const successReports = reports.filter(r => r.status === 'selesai').length;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100">
            <Clock size={12} className="shrink-0" />
            Menunggu
          </span>
        );
      case 'diproses':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
            <Activity size={12} className="shrink-0 animate-pulse" />
            Diproses
          </span>
        );
      case 'selesai':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
            <CheckCircle2 size={12} className="shrink-0" />
            Selesai
          </span>
        );
      case 'ditolak':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-100">
            <AlertCircle size={12} className="shrink-0" />
            Ditolak
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">

      {/* Top Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold tracking-wide uppercase mb-1">
            <Calendar size={14} className="text-gray-400" />
            {currentDate}
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
            {greeting}, <span className="text-[#33D6A6]">{userData?.username || 'Pengguna'}</span>! 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Pantau status laporan dan sampaikan pengaduan layanan publik Anda di sini.
          </p>
        </div>
      </div>



      {/* Stats Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Card: Total */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Laporan</span>
            <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 border border-gray-100">
              <FileText size={18} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl md:text-3xl font-black text-gray-900 leading-none">{totalReports}</h3>
            <p className="text-[10px] text-gray-400 mt-1 font-medium">Laporan terdaftar</p>
          </div>
        </div>

        {/* Card: Pending */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Menunggu</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-100/50">
              <Clock size={18} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl md:text-3xl font-black text-amber-600 leading-none">{pendingReports}</h3>
            <p className="text-[10px] text-gray-400 mt-1 font-medium">Perlu ditinjau</p>
          </div>
        </div>

        {/* Card: Process */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Diproses</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 border border-blue-100/50">
              <Activity size={18} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl md:text-3xl font-black text-blue-600 leading-none">{processReports}</h3>
            <p className="text-[10px] text-gray-400 mt-1 font-medium">Sedang ditindaklanjuti</p>
          </div>
        </div>

        {/* Card: Success */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Selesai</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-[#33D6A6] border border-emerald-100/50">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl md:text-3xl font-black text-emerald-600 leading-none">{successReports}</h3>
            <p className="text-[10px] text-gray-400 mt-1 font-medium">Tuntas diselesaikan</p>
          </div>
        </div>
      </div>

      {/* Main Sections: Action Shortcuts & Recent Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Side: Actions and Guidelines */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-5">
            <h2 className="text-lg font-bold text-gray-900">Aksi Cepat</h2>

            <div className="space-y-3">
              <Link href="/users/laporan/create" className="flex items-center justify-between p-4 bg-gradient-to-tr from-[#33D6A6] to-emerald-400 text-white rounded-2xl shadow-md shadow-[#33D6A6]/20 hover:scale-[1.02] transition-transform duration-200 group">
                <div className="flex items-center gap-3">
                  <PlusCircle size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                  <span className="text-sm font-bold">Buat Laporan Baru</span>
                </div>
                <ArrowRight size={16} />
              </Link>

              <Link href="/users/history" className="flex items-center justify-between p-4 bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-gray-400" />
                  <span className="text-sm font-bold">Riwayat Pengaduan</span>
                </div>
                <ArrowRight size={16} className="text-gray-400" />
              </Link>
            </div>
          </div>

          {/* Guide / Banner Card */}
          <div className="bg-gradient-to-tr from-slate-900 to-slate-800 text-white p-6 rounded-3xl shadow-lg border border-slate-700 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-slate-700/50 flex items-center justify-center text-[#33D6A6]">
              <HelpCircle size={20} />
            </div>
            <div>
              <h3 className="font-bold text-sm">Butuh bantuan?</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Setiap laporan yang Anda kirimkan akan dienkripsi dan dijamin kerahasiaannya. Ikuti format pelaporan yang baik agar mempermudah petugas kami untuk memverifikasi laporan.
              </p>
            </div>
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#33D6A6] hover:text-emerald-300 transition-colors">
              Baca FAQ & Ketentuan
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Right Side: Recent Activity Feed */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2.5">
                <Activity size={20} className="text-gray-400" />
                Laporan Terbaru Anda
              </h2>
              <Link href="/users/history" className="text-xs font-bold text-[#33D6A6] hover:text-emerald-500 transition-colors flex items-center gap-1">
                Lihat Semua
                <ArrowRight size={14} />
              </Link>
            </div>

            {reports.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400 space-y-3">
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 border border-gray-100">
                  <FileText size={28} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500">Belum ada laporan</p>
                  <p className="text-xs text-gray-400 mt-0.5">Semua laporan yang Anda kirimkan akan muncul di sini.</p>
                </div>
                <Button asChild className="bg-[#33D6A6] hover:bg-emerald-500 text-white mt-2">
                  <Link href="/users/laporan/create">Tulis Laporan Pertama</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {reports.map((report) => (
                  <div
                    key={report.id}
                    className="p-4 rounded-2xl border border-gray-100 hover:border-[#33D6A6]/20 bg-gray-50/20 hover:bg-white transition-all duration-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 cursor-pointer group"
                    onClick={() => router.push(`/users/history`)} // Navigate to details / history list
                  >
                    <div className="space-y-1.5 min-w-0">
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
                      <p className="text-xs text-gray-400 truncate line-clamp-1">
                        {report.deskripsi}
                      </p>
                    </div>
                    <div className="shrink-0 flex items-center justify-end w-full md:w-auto">
                      {getStatusBadge(report.status)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
