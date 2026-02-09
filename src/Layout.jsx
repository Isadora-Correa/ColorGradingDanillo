import React from 'react';
import { Toaster } from '@/components/ui/sonner';

export default function Layout({ children }) {
  return (
    <>
      <style>{`
        :root {
          --background: 0 0% 4%;
          --foreground: 0 0% 98%;
          --card: 0 0% 8%;
          --card-foreground: 0 0% 98%;
          --popover: 0 0% 8%;
          --popover-foreground: 0 0% 98%;
          --primary: 270 60% 50%;
          --primary-foreground: 0 0% 98%;
          --secondary: 180 60% 50%;
          --secondary-foreground: 0 0% 98%;
          --muted: 0 0% 15%;
          --muted-foreground: 0 0% 65%;
          --accent: 270 60% 50%;
          --accent-foreground: 0 0% 98%;
          --destructive: 0 62% 30%;
          --destructive-foreground: 0 0% 98%;
          --border: 0 0% 15%;
          --input: 0 0% 15%;
          --ring: 270 60% 50%;
        }
        
        * {
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.1) transparent;
        }
        
        *::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        *::-webkit-scrollbar-track {
          background: transparent;
        }
        
        *::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 3px;
        }
        
        *::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.2);
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        .glow-text {
          text-shadow: 0 0 40px rgba(168, 85, 247, 0.5), 0 0 80px rgba(168, 85, 247, 0.3);
        }
        
        .glow-box {
          box-shadow: 0 0 40px rgba(168, 85, 247, 0.2), 0 0 80px rgba(168, 85, 247, 0.1);
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .animate-shimmer {
          animation: shimmer 3s infinite linear;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
          background-size: 200% 100%;
        }
      `}</style>
      {children}
      <Toaster position="top-right" />
    </>
  );
}