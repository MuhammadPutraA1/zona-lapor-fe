"use client";
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export default function HeroSection({ buttonText = "Mulai Lapor", buttonLink = "/auth/register" }) {
  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 items-center px-10 min-h-[70vh]">

      {/* LEFT */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-5xl lg:text-7xl leading-[1.1] font-black text-[#111827] tracking-tight">
          Suara Anda <br/>
          <span className="text-[#33D6A6] relative">
            Sangat Berarti
            {/* Decorative underline */}
            <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#EAF7EA] -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
            </svg>
          </span>
          <br/>
          Untuk Perubahan
        </h1>

        <p className="mt-6 text-gray-500 text-lg max-w-md leading-relaxed">
          Platform pengaduan masyarakat online yang transparan, mudah digunakan, dan terintegrasi dengan instansi terkait.
        </p>

        <div className="mt-8 flex gap-4 items-center">
          <Link href={buttonLink} className="px-8 py-4 rounded-xl bg-[#111827] text-white text-base font-bold hover:bg-[#33D6A6] hover:scale-105 transition-all shadow-lg">
            {buttonText}
          </Link>

        </div>
      </motion.div>

      {/* RIGHT */}
      <motion.div 
        className="flex justify-center mt-12 lg:mt-0 relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Floating background decorative element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#DDF8EC] rounded-full blur-[60px] -z-10"></div>
        
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <Image
            src="/foto/landing.jpg"
            alt="landing"
            width={480}
            height={480}
            className="object-contain drop-shadow-2xl rounded-[2rem]"
            priority
          />
        </motion.div>
      </motion.div>

    </div>
  )
}