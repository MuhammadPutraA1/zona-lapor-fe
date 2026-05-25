"use client";
import { motion } from "framer-motion";
import { FileText, Clock, CheckCircle } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      id: 1,
      title: "Tulis Laporan",
      description: "Laporkan keluhan atau aspirasi Anda dengan jelas dan lengkap beserta lampiran pendukung.",
      icon: <FileText size={24} className="text-[#33D6A6]" />,
      delay: 0.1
    },
    {
      id: 2,
      title: "Proses Verifikasi",
      description: "Laporan Anda akan diverifikasi dan diteruskan kepada instansi berwenang.",
      icon: <Clock size={24} className="text-[#33D6A6]" />,
      delay: 0.3
    },
    {
      id: 3,
      title: "Tindak Lanjut",
      description: "Instansi akan menindaklanjuti dan Anda bisa memantau perkembangannya.",
      icon: <CheckCircle size={24} className="text-[#33D6A6]" />,
      delay: 0.5
    }
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] mb-4">
            Bagaimana <span className="text-[#33D6A6]">Cara Kerjanya?</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Proses pelaporan di ZonaLapor sangat mudah, cepat, dan transparan. Ikuti 3 langkah sederhana di bawah ini.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector Line (Desktop only) */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gray-100 z-0"></div>

          {steps.map((step) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: step.delay }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              {/* Icon Circle */}
              <div className="w-24 h-24 rounded-full bg-[#EAF7EA] border-4 border-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>

              <h3 className="text-xl font-bold mb-3 text-[#111827]">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
