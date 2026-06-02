import { AdminSidebar } from "@/components/layout/AdminSidebar";

export const metadata = {
  title: 'Petugas Panel - Zona Lapor',
  description: 'Panel petugas untuk mengelola laporan Zona Lapor.',
};

export default function PetugasLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#FAFBFC] flex flex-col lg:flex-row">
      <AdminSidebar />
      <main className="flex-1 min-w-0">
        {children}
      </main>
    </div>
  );
}
