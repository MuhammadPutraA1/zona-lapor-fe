"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="py-24 px-10 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#111827] z-0"></div>
      <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-[#33D6A6] opacity-20 blur-[100px] rounded-full z-0"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-[#33D6A6] opacity-10 blur-[100px] rounded-full z-0"></div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Saatnya Suara Anda <span className="text-[#33D6A6]">Didengar</span>
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan masyarakat lainnya untuk mewujudkan lingkungan dan pelayanan publik yang lebih baik.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/auth/register" 
              className="w-full sm:w-auto px-8 py-4 bg-[#33D6A6] text-white font-bold rounded-xl hover:bg-white hover:text-[#111827] transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(51,214,166,0.3)]"
            >
              Mulai Melapor
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href="/auth/login" 
              className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-gray-700 text-white font-bold rounded-xl hover:border-gray-500 transition-all"
            >
              Masuk ke Akun
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
