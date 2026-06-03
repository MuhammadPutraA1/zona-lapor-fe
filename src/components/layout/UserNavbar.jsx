"use client";

import { useEffect, useState } from 'react';
import Link from "next/link"; 
import { useRouter } from 'next/navigation';
import { User, LogOut, LayoutDashboard, ShieldCheck, ChevronDown, Clock, UserRound } from 'lucide-react';
import { Button } from "@/components/ui/button";

export function UserNavbar() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const cached = sessionStorage.getItem('user_session');
        if (cached) {
          setUserData(JSON.parse(cached));
        }

        const res = await fetch('/api/auth/me', {
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setUserData(data.user);
            sessionStorage.setItem('user_session', JSON.stringify(data.user));
          }
        }
      } catch (error) {
        console.error("Gagal mengambil data user:", error);
      }
    };

    fetchMe();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      sessionStorage.removeItem('user_session');
      router.push('/auth/login');
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 py-5 md:px-10">
      {/* LOGO */}
      <Link href="/users" className="flex items-center">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight">
          <span className="text-[#111827]">
            zona
          </span>
          <span className="text-[#33D6A6]">
            lapor
          </span>
        </h1>
      </Link>

      {/* MENU */}
      <div className="flex items-center gap-4">
        
        <Link 
          href="/users/history" 
          className="hidden md:flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#33D6A6] transition-colors"
        >
          <Clock size={18} />
          Riwayat Laporan
        </Link>

        {userData?.role !== 'user' && userData !== null && (
          <Link 
            href="/dashboard" 
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-indigo-500 transition-colors mr-2"
          >
            <ShieldCheck size={18} />
            Admin Panel
          </Link>
        )}

        {/* User Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 md:gap-3 p-1 pr-3 rounded-full border border-gray-200 hover:border-[#33D6A6] hover:shadow-sm transition-all bg-white"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#33D6A6] to-emerald-400 flex items-center justify-center text-white font-bold text-sm">
              {userData?.username ? userData.username.charAt(0).toUpperCase() : <User size={16} />}
            </div>
            <span className="text-sm font-bold text-gray-700 hidden sm:block max-w-[100px] truncate">
              {userData?.username || 'Memuat...'}
            </span>
            <ChevronDown size={14} className="text-gray-400" />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsDropdownOpen(false)}
              ></div>
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                  <p className="text-sm font-bold text-gray-900 truncate">{userData?.username}</p>
                  <p className="text-xs font-medium text-gray-500 truncate">{userData?.email}</p>
                </div>
                <div className="p-2 space-y-1">
                  <Link 
                    href="/users/history"
                    className="md:hidden flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Clock size={16} className="text-gray-400" />
                    Riwayat Laporan
                  </Link>

                  {userData?.role !== 'user' && (
                    <Link 
                      href="/dashboard"
                      className="md:hidden flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <ShieldCheck size={16} className="text-indigo-400" />
                      Admin Panel
                    </Link>
                  )}

                  <Link
                    href="/users/profile"
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <UserRound size={16} className="text-gray-400" />
                    Profil Saya
                  </Link>

                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={16} className="text-red-400" />
                    Keluar Akun
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}
