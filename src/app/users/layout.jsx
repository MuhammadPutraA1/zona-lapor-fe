"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UsersLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
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
          sessionStorage.setItem('user_session', JSON.stringify(data.user));
          setIsAuthorized(true);
          if (data.user.role === 'petugas') {
            router.push('/dashboard');
          }
        } else {
          sessionStorage.removeItem('user_session');
          router.push('/auth/login');
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        sessionStorage.removeItem('user_session');
        router.push('/auth/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FAFAFA]">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin w-10 h-10 border-4 border-[#33D6A6] border-t-transparent rounded-full"></div>
          <p className="text-sm font-semibold text-gray-500">Memverifikasi sesi...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) return null;

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans overflow-x-hidden">
      {/* Main Content without sidebar */}
      {children}
    </div>
  );
}
