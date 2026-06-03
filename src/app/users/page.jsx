import { UserNavbar } from "@/components/layout/UserNavbar"
import HeroSection from "@/components/landing/HeroSection"
import { CreateReportSection } from "@/components/users/CreateReportSection"
import HowItWorksSection from "@/components/landing/HowItWorksSection"
import RecentReportsSection from "@/components/landing/RecentReportsSection"
import Footer from "@/components/layout/Footer"

export const metadata = {
  title: 'Dashboard Pengguna - Zona Lapor',
  description: 'Sampaikan laporan pengaduan masyarakat Anda dengan mudah dan aman.',
};

export default function UsersPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      {/* Top Section with Hero */}
      <div className="bg-[#FAFAFA] pb-10">
        <div className="max-w-7xl mx-auto">
          <UserNavbar />
          <div className="mt-8">
            <HeroSection
              buttonText="Buat Laporan Sekarang"
              buttonLink="#buat-laporan"
            />
          </div>
        </div>
      </div>

      {/* Buat Laporan Section (Replacing Features) */}
      <div className="bg-white">
        <CreateReportSection />
      </div>

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Laporan Terbaru Section */}
      <RecentReportsSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
