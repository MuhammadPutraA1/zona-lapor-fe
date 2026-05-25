"use client";
import { motion } from "framer-motion";
import {
  PencilLine,
  Search,
  Users,
  ShieldCheck,
} from "lucide-react"

export default function FeatureSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="py-24 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-10">
        
        <div className="mb-12">
          <h2 className="text-3xl font-extrabold text-[#111827]">
            Fitur <span className="text-[#33D6A6]">Unggulan</span>
          </h2>
          <p className="text-gray-500 mt-2">Segala kemudahan untuk melaporkan masalah di sekitar Anda.</p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* BENTO ITEM 1 (Large Span) */}
          <motion.div variants={itemVariants} className="md:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col justify-between group hover:shadow-md transition-all">
            <div className="w-14 h-14 rounded-2xl bg-[#DDF8EC] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <PencilLine size={28} className="text-[#33D6A6]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#111827] mb-2">Laporan Komprehensif</h3>
              <p className="text-gray-500 max-w-md">Sampaikan keluhan dengan detail. Anda dapat menambahkan foto, lokasi akurat, dan deskripsi lengkap untuk memudahkan tindak lanjut.</p>
            </div>
          </motion.div>

          {/* BENTO ITEM 2 */}
          <motion.div variants={itemVariants} className="bg-[#111827] rounded-3xl p-8 shadow-sm text-white flex flex-col justify-between group hover:-translate-y-1 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-gray-800 flex items-center justify-center mb-6 group-hover:bg-[#33D6A6] transition-colors">
              <Search size={28} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Lacak Real-time</h3>
              <p className="text-gray-400 text-sm">Ketahui status laporan Anda secara langsung. Dari diproses hingga selesai.</p>
            </div>
          </motion.div>

          {/* BENTO ITEM 3 */}
          <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col justify-between group hover:-translate-y-1 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-[#DDF8EC] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users size={28} className="text-[#33D6A6]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#111827] mb-2">Terbuka Untuk Semua</h3>
              <p className="text-gray-500 text-sm">Akses platform ini dari mana saja. Dukungan penuh untuk seluruh lapisan masyarakat.</p>
            </div>
          </motion.div>

          {/* BENTO ITEM 4 (Large Span) */}
          <motion.div variants={itemVariants} className="md:col-span-2 bg-gradient-to-br from-[#EAF7EA] to-[#DDF8EC] rounded-3xl p-8 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all">
            <div className="w-14 h-14 rounded-2xl bg-white/60 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck size={28} className="text-[#111827]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#111827] mb-2">Aman & Terpercaya</h3>
              <p className="text-gray-700 max-w-md">Identitas Anda terlindungi. Kami menggunakan standar keamanan tinggi untuk memastikan data pelapor aman dari pihak yang tidak berkepentingan.</p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  )
}