import React from 'react';
import { useLanguage } from '../ui/LanguageContext';
import SectionBlock from '../common/SectionBlock';
import GlowText from '../common/GlowText';
import { Play, ExternalLink } from 'lucide-react';

export default function StudentShowcase({ students }) {
  const { language, t } = useLanguage();

  if (!students || students.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          {t('Resultados dos ', 'Student ')}
          <GlowText>{t('Alunos', 'Results')}</GlowText>
        </h2>
        <p className="text-zinc-400">
          {t('Veja o que nossos alunos conquistaram', 'See what our students have achieved')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {students.sort((a, b) => (a.order || 0) - (b.order || 0)).map((student, index) => (
          <SectionBlock key={student.id} gradient>
            <div className="flex flex-col h-full">
              {/* Student header */}
              <div className="flex items-center gap-4 mb-4">
                {student.photo_url && (
                  <img 
                    src={student.photo_url}
                    alt={student.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-purple-500/50"
                  />
                )}
                <div>
                  <h3 className="text-lg font-semibold text-white">{student.name}</h3>
                  {student.instagram && (
                    <a 
                      href={`https://instagram.com/${student.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1"
                    >
                      {student.instagram}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              {/* Showreel */}
              {student.showreel_url && (
                <a 
                  href={student.showreel_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-video rounded-xl overflow-hidden bg-zinc-900 mb-4 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-cyan-900/50 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-white fill-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 text-sm text-white/80">
                    {t('Ver Showreel', 'View Showreel')}
                  </div>
                </a>
              )}

              {/* Clients */}
              {student.clients && student.clients.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-zinc-500 uppercase mb-2">{t('Clientes', 'Clients')}</p>
                  <div className="flex flex-wrap gap-2">
                    {student.clients.map((client, idx) => (
                      <span key={idx} className="px-2 py-1 text-xs bg-zinc-800 rounded text-zinc-400">
                        {client}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Testimonial */}
              {(student.testimonial_pt || student.testimonial_en) && (
                <p className="text-sm text-zinc-400 italic mt-auto">
                  "{language === 'pt' ? student.testimonial_pt : student.testimonial_en}"
                </p>
              )}
            </div>
          </SectionBlock>
        ))}
      </div>
    </div>
  );
}