"use client";

import { motion } from "framer-motion";
import { FileText, Search, CheckCircle2, AlertCircle } from "lucide-react";

export function AnimatedHeroIllustration() {
  return (
    <div className="relative w-full h-[400px] md:h-[480px] flex items-center justify-center">
      {/* Background circles */}
      <motion.div 
        className="absolute w-[280px] h-[280px] md:w-[350px] md:h-[350px] bg-emerald-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute w-[250px] h-[250px] md:w-[300px] md:h-[300px] bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 translate-x-10 translate-y-10"
        animate={{
          scale: [1.1, 1, 1.1],
          rotate: [0, -90, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Center Group */}
      <div className="relative z-10 w-48 h-48 md:w-56 md:h-56">
        {/* Document / Paper */}
        <motion.div
          className="absolute inset-0 bg-white rounded-3xl shadow-xl border-2 border-gray-100 flex flex-col items-center justify-center p-6"
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-full space-y-4 opacity-30 mt-2">
            <div className="h-3 bg-gray-300 rounded-full w-3/4"></div>
            <div className="h-3 bg-gray-300 rounded-full w-full"></div>
            <div className="h-3 bg-gray-300 rounded-full w-5/6"></div>
            <div className="h-3 bg-gray-300 rounded-full w-1/2"></div>
          </div>
          <FileText size={80} className="absolute text-[#33D6A6] opacity-20" />
        </motion.div>

        {/* Magnifying Glass (Kaca Pembesar) Scanning */}
        <motion.div
          className="absolute z-20 top-0 left-0"
          animate={{ 
            x: [-20, 100, 40, -20], 
            y: [-20, 30, 100, -20],
            rotate: [-10, 10, -5, -10]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="bg-white p-4 rounded-full shadow-2xl border border-gray-100 text-blue-500">
            <Search size={48} />
          </div>
        </motion.div>
      </div>

      {/* Floating Elements (Results) */}
      <motion.div 
        className="absolute z-20 top-[15%] right-[15%] bg-white p-3 md:p-4 rounded-2xl shadow-xl border border-gray-50 text-emerald-500"
        animate={{ y: [0, -15, 0], x: [0, 10, 0], rotate: [-5, 5, -5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <CheckCircle2 size={32} />
      </motion.div>

      <motion.div 
        className="absolute z-20 bottom-[20%] left-[10%] bg-white p-3 md:p-4 rounded-2xl shadow-xl border border-gray-50 text-amber-500"
        animate={{ y: [0, 15, 0], x: [0, -10, 0], rotate: [5, -5, 5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <AlertCircle size={36} />
      </motion.div>

      <motion.div 
        className="absolute z-0 top-[30%] left-[20%] bg-blue-100 p-3 rounded-full text-blue-500 shadow-md"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <Search size={20} />
      </motion.div>
      
      <motion.div 
        className="absolute z-0 bottom-[30%] right-[20%] bg-emerald-100 p-2 rounded-full text-emerald-600 shadow-md"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <FileText size={16} />
      </motion.div>
    </div>
  );
}
