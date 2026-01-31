import React from 'react';
import { motion } from 'framer-motion';

export default function HeroSection({ videoUrl, imageUrl }) {
  return (
    <section className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
      {/* Video/Image Background */}
      {videoUrl ? (
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : imageUrl ? (
        <img 
          src={imageUrl} 
          alt="Hero" 
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-purple-900/20 to-zinc-900" />
      )}

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/50 via-transparent to-[#0a0a0a]/50" />
      
      {/* Film grain effect */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center px-4"
        >
          <div className="w-20 h-20 md:w-28 md:h-28 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-400 p-[2px]">
            <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center">
              <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">N</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Halation effect */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />
    </section>
  );
}