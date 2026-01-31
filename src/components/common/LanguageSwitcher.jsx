import React from 'react';
import { useLanguage } from '../ui/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLanguage('en')}
        className={`relative w-8 h-6 rounded overflow-hidden transition-all duration-300 ${
          language === 'en' ? 'ring-2 ring-white/50 scale-110' : 'opacity-60 hover:opacity-100'
        }`}
        title="English"
      >
        <div className="absolute inset-0 bg-[#002868]" />
        <div className="absolute top-0 left-0 w-full h-[7.69%] bg-[#bf0a30]" />
        <div className="absolute top-[15.38%] left-0 w-full h-[7.69%] bg-[#bf0a30]" />
        <div className="absolute top-[30.76%] left-0 w-full h-[7.69%] bg-[#bf0a30]" />
        <div className="absolute top-[46.14%] left-0 w-full h-[7.69%] bg-[#bf0a30]" />
        <div className="absolute top-[61.52%] left-0 w-full h-[7.69%] bg-[#bf0a30]" />
        <div className="absolute top-[76.9%] left-0 w-full h-[7.69%] bg-[#bf0a30]" />
        <div className="absolute top-[92.28%] left-0 w-full h-[7.69%] bg-[#bf0a30]" />
        <div className="absolute top-[7.69%] left-0 w-full h-[7.69%] bg-white" />
        <div className="absolute top-[23.07%] left-0 w-full h-[7.69%] bg-white" />
        <div className="absolute top-[38.45%] left-0 w-full h-[7.69%] bg-white" />
        <div className="absolute top-[53.83%] left-0 w-full h-[7.69%] bg-white" />
        <div className="absolute top-[69.21%] left-0 w-full h-[7.69%] bg-white" />
        <div className="absolute top-[84.59%] left-0 w-full h-[7.69%] bg-white" />
        <div className="absolute top-0 left-0 w-[40%] h-[53.83%] bg-[#002868]" />
      </button>
      
      <button
        onClick={() => setLanguage('pt')}
        className={`relative w-8 h-6 rounded overflow-hidden transition-all duration-300 ${
          language === 'pt' ? 'ring-2 ring-white/50 scale-110' : 'opacity-60 hover:opacity-100'
        }`}
        title="Português"
      >
        <div className="absolute inset-0 bg-[#009c3b]" />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[60%] bg-[#ffdf00]"
          style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#002776]" />
      </button>
    </div>
  );
}