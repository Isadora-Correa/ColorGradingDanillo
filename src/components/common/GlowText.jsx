import React from 'react';

export default function GlowText({ 
  children, 
  className = "", 
  gradient = "from-purple-400 via-pink-500 to-cyan-400",
  glowColor = "rgba(168, 85, 247, 0.5)",
  as: Component = "span"
}) {
  return (
    <Component 
      className={`relative inline-block ${className}`}
    >
      <span 
        className={`absolute inset-0 blur-xl bg-gradient-to-r ${gradient} opacity-50`}
        style={{ filter: `drop-shadow(0 0 20px ${glowColor})` }}
      >
        {children}
      </span>
      <span 
        className={`relative bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
        style={{ 
          textShadow: `0 0 40px ${glowColor}, 0 0 80px ${glowColor}`,
        }}
      >
        {children}
      </span>
    </Component>
  );
}