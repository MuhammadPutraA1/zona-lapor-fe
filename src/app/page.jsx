import Navbar from "@/components/layout/Navbar"
import HeroSection from "@/components/landing/HeroSection"
import HowItWorksSection from "@/components/landing/HowItWorksSection"
import FeatureSection from "@/components/landing/FeatureSection"
import RecentReportsSection from "@/components/landing/RecentReportsSection"
import Footer from "@/components/layout/Footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans overflow-x-hidden">

      {/* Top Section with Hero */}
      <div className="bg-[#FAFAFA] pb-10">
        <div className="max-w-7xl mx-auto">
          <Navbar />
          <div className="mt-8">
            <HeroSection />
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Bento Box Features Section */}
      <FeatureSection />

      {/* Laporan Terbaru Section */}
      <RecentReportsSection />

      {/* Footer */}
      <Footer />

    </main>
  )
}