import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../ui/LanguageContext';
import SectionBlock from '../common/SectionBlock';
import SectionTitle from '../common/SectionTitle';
import { ChevronDown, Play, BookOpen } from 'lucide-react';

const MODULES = [
  { id: 1, order: 1, show_in_en: true, title_pt: 'Apresentacao', title_en: 'Introduction', lessons_pt: ['Visao geral do curso e da jornada de aprendizado', 'Metodologia pratica e progressiva', 'O que esperar ao longo dos modulos'], lessons_en: ['Course overview and learning journey', 'Practical and progressive methodology', 'What to expect across the modules'] },
  { id: 2, order: 2, show_in_en: true, title_pt: 'Project Manager', title_en: 'Project Manager', lessons_pt: ['Estrutura profissional de organizacao no DaVinci', 'Configuracao da Biblioteca e Database', 'Protecao contra perda de dados', 'Fluxo de trabalho escalavel e limpo'], lessons_en: ['Professional organization structure in DaVinci', 'Library and Database setup', 'Data loss protection', 'Clean and scalable workflow'] },
  { id: 3, order: 3, show_in_en: true, title_pt: 'Conform', title_en: 'Conform', lessons_pt: ['Importacao correta do projeto de outros softwares', 'Preparacao de timeline para grading', 'Conform com Adobe Premiere'], lessons_en: ['Correct project import from other software', 'Timeline prep for grading', 'Conform with Adobe Premiere'] },
  { id: 4, order: 4, show_in_en: true, title_pt: 'Personalizacoes e Atalhos', title_en: 'Customizations and Shortcuts', lessons_pt: ['Atalhos essenciais para agilidade', 'Configuracoes personalizadas', 'Otimizacao de performance', 'Fluidez no dia a dia de pos-producao'], lessons_en: ['Essential shortcuts for speed', 'Custom configurations', 'Performance optimization', 'Smoother post-production workflow'] },
  { id: 5, order: 5, show_in_en: true, title_pt: 'Interface do Resolve', title_en: 'Resolve Interface', lessons_pt: ['Tour pela aba Color', 'Ferramentas essenciais do colorista', 'Navegacao eficiente', 'Aba Edit: o essencial para um colorista'], lessons_en: ['Color page tour', 'Essential colorist tools', 'Efficient navigation', 'Edit page basics for colorists'] },
  { id: 6, order: 6, show_in_en: true, title_pt: 'Gerenciamento de Cor Basico', title_en: 'Basic Color Management', lessons_pt: ['Uma breve introducao ao gerenciamento de cor', 'Diferentes espacos de cor', 'Utilizando transformacoes de maneira eficiente'], lessons_en: ['Brief intro to color management', 'Different color spaces', 'Using transforms efficiently'] },
  { id: 7, order: 7, show_in_en: true, title_pt: 'Primaries, Scopes e Color Matching', title_en: 'Primaries, Scopes and Color Matching', lessons_pt: ['Conceitos do Color Balance', 'Entendendo as ferramentas primarias', 'Como interpretar os Scopes', 'Printer Lights', 'HDR Color Wheels', 'Color Matching'], lessons_en: ['Color balance concepts', 'Understanding primary tools', 'How to read scopes', 'Printer Lights', 'HDR Color Wheels', 'Color Matching'] },
  { id: 8, order: 8, show_in_en: true, title_pt: 'Gerenciamento de Cor Avancado', title_en: 'Advanced Color Management', lessons_pt: ['DaVinci YRGB, ACES e DWG', 'Entendendo o Camera Raw', 'Gerenciamento a nivel de Nodes'], lessons_en: ['DaVinci YRGB, ACES and DWG', 'Understanding camera raw', 'Node-level management'] },
  { id: 9, order: 9, show_in_en: true, title_pt: 'Nodes e Workflow', title_en: 'Nodes and Workflow', lessons_pt: ['Tipos de nodes e aplicacoes estrategicas', 'Construcao de Node Tree profissional', 'Workflow escalavel e organizado'], lessons_en: ['Node types and strategic applications', 'Professional node tree build', 'Scalable and organized workflow'] },
  { id: 10, order: 10, show_in_en: true, title_pt: 'Ferramentas Secundarias', title_en: 'Secondary Tools', lessons_pt: ['Uso avancado de Power Windows e Qualifiers', 'Curves, Warper e Noise Reduction', 'Magic Mask e Color Slice', 'Refino tecnico e estetico da imagem'], lessons_en: ['Advanced use of Power Windows and Qualifiers', 'Curves, Warper and Noise Reduction', 'Magic Mask and Color Slice', 'Technical and aesthetic image refinement'] },
  { id: 11, order: 11, show_in_en: true, title_pt: 'Skin Tones', title_en: 'Skin Tones', lessons_pt: ['Correcao de diferentes tipos de pele', 'Uso do Vectorscope para precisao', 'Tecnicas de realce com Glow e Beauty', 'Resultados cinematograficos e naturais'], lessons_en: ['Correction for different skin types', 'Vectorscope use for precision', 'Enhancement techniques with Glow and Beauty', 'Cinematic and natural results'] },
  { id: 12, order: 12, show_in_en: true, title_pt: 'Pratica - Color Balance & Matching', title_en: 'Practice - Color Balance & Matching', lessons_pt: ['Exercicio pratico com multiplos takes', 'Consistencia entre diferentes cameras e luzes', 'Ajuste fino de contraste e exposicao', 'Desenvolvimento do olhar tecnico'], lessons_en: ['Practical exercise with multiple takes', 'Consistency across different cameras and lighting', 'Fine contrast and exposure adjustment', 'Technical eye development'] },
  { id: 13, order: 13, show_in_en: true, title_pt: 'Criacao de Look', title_en: 'Look Creation', lessons_pt: ['Uso de LUTs tecnicos e criativos', 'Introducao a FPE e workflows com Cineon', 'Entendendo a utilizacao do Grao Analogico', 'Halation: Tecnicas avancadas', 'Construcao de looks com identidade visual'], lessons_en: ['Technical and creative LUT usage', 'FPE intro and Cineon workflows', 'Understanding analog grain usage', 'Halation: advanced techniques', 'Building looks with visual identity'] },
  { id: 14, order: 14, show_in_en: false, title_pt: 'Projeto Pratico 01', title_en: 'Practical Project 01', lessons_pt: ['Grading completo do inicio ao fim', 'Correcao primaria, secundaria e look', 'Consolidacao do workflow', 'Projeto guiado com aplicacao real'], lessons_en: ['Full grading from start to finish', 'Primary, secondary and look correction', 'Workflow consolidation', 'Guided project with real application'] },
  { id: 15, order: 15, show_in_en: true, title_pt: 'Projeto Pratico 02', title_en: 'Practical Project 02', lessons_pt: ['Continuacao da timeline do Modulo 03', 'Grading completo de um novo material', 'Exercicio de autonomia e tomada de decisao', 'Experiencia de projeto real completo'], lessons_en: ['Timeline continuation from Module 03', 'Full grading of new footage', 'Autonomy and decision-making exercise', 'Complete real project experience'] },
  { id: 16, order: 16, show_in_en: true, title_pt: 'Deliver e Conform Final', title_en: 'Final Deliver and Conform', lessons_pt: ['Diferentes metodos de Render', 'Como usar Individual Clips e Handles', 'Entregas profissionais e organizadas'], lessons_en: ['Different render methods', 'How to use individual clips and handles', 'Professional and organized deliveries'] },
];

export default function CourseModules() {
  const { language, t } = useLanguage();
  const [expandedModule, setExpandedModule] = useState(null);

  const filteredModules = MODULES.filter((m) => language === 'pt' || m.show_in_en !== false).sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <SectionBlock gradient>
      <SectionTitle
        line1={t('Grade do', 'Course')}
        highlight={t('Curso', 'Curriculum')}
        subtitle={t('Tudo o que voce vai aprender', 'Everything you will learn')}
      />

      <div className="space-y-3">
        {filteredModules.map((module, index) => {
          const isExpanded = expandedModule === index;
          const title = language === 'pt' ? module.title_pt : module.title_en;
          const lessons = language === 'pt' ? module.lessons_pt : module.lessons_en;

          return (
            <motion.div
              key={module.id || index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-zinc-800/50 rounded-xl border border-white/5 overflow-hidden"
            >
              <button
                onClick={() => setExpandedModule(isExpanded ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full">
                    <span className="absolute inset-0 rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,#ff2f6d_0%,#ff9c1f_18%,#d7ff3f_35%,#27f2a2_52%,#23dbff_70%,#635bff_84%,#ff38bd_100%)]" />
                    <span className="absolute inset-[2.5px] rounded-full bg-zinc-950" />
                    <span className="relative text-sm font-bold tracking-tight text-white">{String(index + 1).padStart(2, '0')}</span>
                  </span>
                  <div>
                    <h3 className="text-white font-medium">{title}</h3>
                    <span className="text-sm text-zinc-500">{lessons.length} {t('aulas', 'lessons')}</span>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 border-t border-white/5">
                      <ul className="mt-4 space-y-2">
                        {lessons.map((lesson, lessonIdx) => (
                          <li key={lessonIdx} className="flex items-center gap-3 text-sm text-zinc-300">
                            <Play className="w-4 h-4 text-purple-400" />
                            {lesson}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <div className="text-center mt-6">
        <p className="text-sm text-zinc-500 flex items-center justify-center gap-2">
          <BookOpen className="w-4 h-4" />
          {filteredModules.length} {t('modulos', 'modules')} - {filteredModules.reduce((acc, m) => acc + ((language === 'pt' ? m.lessons_pt : m.lessons_en)?.length || 0), 0)} {t('aulas', 'lessons')}
        </p>
      </div>
    </SectionBlock>
  );
}
