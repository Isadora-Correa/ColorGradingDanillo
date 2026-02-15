import React from 'react';

export default function HeroSection({ videoUrl, imageUrl }) {
  const bgImageUrl = '/bg-4-YBg7QqJQNXuQZnnE.jpg';
  
  return (
    <section className="relative h-[200px] md:h-[220px] w-full overflow-hidden">
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
        <img 
          src={bgImageUrl} 
          alt="Hero Background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
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
    </section>
  );
}