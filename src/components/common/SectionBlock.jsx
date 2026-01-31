import React from 'react';
import { motion } from 'framer-motion';

export default function SectionBlock({ 
  children, 
  className = "",
  noPadding = false,
  gradient = false
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`
        relative rounded-2xl overflow-hidden
        ${gradient 
          ? 'bg-gradient-to-br from-zinc-900/80 via-zinc-900/60 to-zinc-800/40 border border-white/5' 
          : 'bg-zinc-900/50 border border-white/5'
        }
        backdrop-blur-sm
        ${noPadding ? '' : 'p-6 md:p-10'}
        ${className}
      `}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 pointer-events-none" />
      
      {/* Noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.section>
  );
}