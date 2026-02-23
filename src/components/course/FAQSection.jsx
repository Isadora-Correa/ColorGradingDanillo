import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../ui/LanguageContext';
import SectionBlock from '../common/SectionBlock';
import SectionTitle from '../common/SectionTitle';
import { ChevronDown } from 'lucide-react';

const DEFAULT_FAQS = [
  {
    question_pt: 'Nunca usei o DaVinci Resolve. Esse curso é pra mim?',
    answer_pt:
      'Sim. O curso vai do zero ao avançado. Você aprenderá desde a organização de projetos até a entrega final, com uma didática clara, progressiva e prática.',
    question_en: 'I have never used DaVinci Resolve. Is this course for me?',
    answer_en:
      'Yes. The course goes from beginner to advanced. You will learn from project organization to final delivery with a clear, progressive and practical method.',
  },
  {
    question_pt: 'Eu venho do Premiere. Vou ter dificuldade com a migração?',
    answer_pt:
      'Não. Há um módulo específico de Conform que ensina como trazer seus projetos do Premiere para o DaVinci Resolve com segurança, mantendo o fluxo e a qualidade do seu material.',
    question_en: 'I come from Premiere. Will migration be difficult?',
    answer_en:
      'No. There is a specific Conform module that teaches how to bring your Premiere projects into DaVinci Resolve safely while maintaining workflow and quality.',
  },
  {
    question_pt: 'O curso é só sobre ferramenta ou também ensina estética e criação de look?',
    answer_pt:
      'Ambos. Você vai aprender técnicas profissionais de correção e gerenciamento de cor, mas também vai desenvolver pensamento visual, criação de looks cinematográficos e estética autoral com base em workflows reais.',
    question_en: 'Is the course only about tools or also aesthetics and look creation?',
    answer_en:
      'Both. You will learn professional color correction and management techniques, and also develop visual thinking, cinematic look creation and authorial aesthetics based on real workflows.',
  },
  {
    question_pt: 'O que eu vou ter em mãos ao final do curso?',
    answer_pt:
      'Dois projetos completos de color grading feitos com orientação profissional, mais de 300GB de material bruto para praticar e um portfólio de respeito para mostrar ao mercado, com um workflow sólido, técnico e criativo.',
    question_en: 'What will I have by the end of the course?',
    answer_en:
      'Two complete color grading projects made with professional guidance, over 300GB of raw material for practice and a strong portfolio to show the market, with a solid technical and creative workflow.',
  },
  {
    question_pt: 'Vou aprender só teoria ou também colocar a mão na massa?',
    answer_pt:
      'É 100% focado em aplicação prática. Cada módulo prepara você para uma etapa real do processo. Ao final, você coloca tudo em prática com dois projetos reais, do início ao fim.',
    question_en: 'Will I only learn theory or also practice?',
    answer_en:
      'It is 100% focused on practical application. Each module prepares you for a real stage of the process. In the end, you apply everything in two real projects from start to finish.',
  },
  {
    question_pt: 'Por quanto tempo terei acesso ao curso e atualizações?',
    answer_pt: 'O acesso do curso é vitalício.',
    question_en: 'How long will I have access to the course and updates?',
    answer_en: 'Course access is lifetime.',
  },
  {
    question_pt: 'O curso oferece certificado?',
    answer_pt:
      'Sim. Ao concluir todas as aulas, você receberá um certificado digital de conclusão comprovando sua formação no curso, com carga horária e seu nome.',
    question_en: 'Does the course provide a certificate?',
    answer_en:
      'Yes. After completing all classes, you receive a digital completion certificate with your name and workload.',
  },
  {
    question_pt: 'Vou precisar de algum equipamento extra para acompanhar o curso?',
    answer_pt:
      'Não. Você não precisará de equipamento extra além de um bom computador e monitor ou notebook. Todo o conteúdo foi pensado para funcionar com teclado e mouse, como a maioria dos coloristas começa.',
    question_en: 'Will I need extra equipment to follow the course?',
    answer_en:
      'No. You do not need extra equipment beyond a good computer and monitor or notebook. The entire content was designed for keyboard and mouse workflow.',
  },
  {
    question_pt: 'O curso contempla módulos de prospecção e venda no mercado internacional?',
    answer_pt:
      'Em breve lançaremos um curso separado voltado para prospecção e atendimento de clientes internacionais. O curso atual contempla apenas a parte técnica.',
    question_en: 'Does the course include prospecting and sales modules for the international market?',
    answer_en:
      'Soon we will launch a separate course focused on prospecting and serving international clients. The current course focuses only on the technical side.',
  },
  {
    question_pt: 'A edição de Black Friday inclui atualizações futuras do curso?',
    answer_pt:
      'Na edição especial de Black Friday, você recebe acesso vitalício aos módulos atuais do curso. Algumas atualizações, novidades e novos módulos futuros poderão ser adquiridos separadamente.',
    question_en: 'Does the Black Friday edition include future course updates?',
    answer_en:
      'In the Black Friday special edition, you get lifetime access to the current modules. Some future updates and new modules may be purchased separately.',
  },
];

export default function FAQSection() {
  const { language, t } = useLanguage();
  const [expandedFaq, setExpandedFaq] = useState(null);
  const faqItems = DEFAULT_FAQS;

  return (
    <SectionBlock gradient>
      <SectionTitle
        line1={t('Perguntas', 'Frequently Asked')}
        highlight={t('Frequentes', 'Questions')}
      />

      <div className="max-w-3xl mx-auto space-y-3">
        {faqItems.map((faq, index) => {
          const isExpanded = expandedFaq === index;
          const question = language === 'pt' ? faq.question_pt : faq.question_en;
          const answer = language === 'pt' ? faq.answer_pt : faq.answer_en;
          const faqNumber = String(index + 1).padStart(2, '0');

          return (
            <motion.div
              key={faq.id || index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-zinc-800/50 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setExpandedFaq(isExpanded ? null : index)}
                className="w-full px-4 py-4 md:px-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full md:h-12 md:w-12">
                    <span className="absolute inset-0 rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,#ff2f6d_0%,#ff9c1f_18%,#d7ff3f_35%,#27f2a2_52%,#23dbff_70%,#635bff_84%,#ff38bd_100%)]" />
                    <span className="absolute inset-[3.5px] rounded-full bg-zinc-950" />
                    <span className="relative text-xs font-bold tracking-tight text-white md:text-sm">{faqNumber}</span>
                  </span>
                  <span className="text-white font-medium leading-snug">{question}</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.12, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pl-[4.35rem] md:px-6 md:pl-[5.2rem]">
                      <p className="text-zinc-400 leading-relaxed">{answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </SectionBlock>
  );
}
