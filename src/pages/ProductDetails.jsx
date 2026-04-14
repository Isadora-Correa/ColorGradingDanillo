import React from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import { apiClient } from '@/api/apiClient';
import { LanguageProvider, useLanguage } from '../components/ui/LanguageContext';
import NavHeader from '../components/common/NavHeader';
import BeforeAfterSlider from '../components/course/BeforeAfterSlider';
import LanguagesSection from '../components/course/LanguagesSection';
import CourseHighlightsGallery from '../components/course/CourseHighlightsGallery';
import StudentShowcase from '../components/course/StudentShowcase';
import InstructorSection from '../components/course/InstructorSection';
import ClientLogos from '../components/course/ClientLogos';
import CourseModules from '../components/course/CourseModules';
import ExclusiveAdditionalContentSection from '../components/course/ExclusiveAdditionalContentSection';
import TestimonialsSection from '../components/course/TestimonialsSection';
import CertificateSection from '../components/course/CertificateSection';
import FAQSection from '../components/course/FAQSection';
import SectionBlock from '../components/common/SectionBlock';
import SectionTitle from '../components/common/SectionTitle';
import GlowText from '../components/common/GlowText';
import { Button } from '@/components/ui/button';

const COURSE_HERO_FEATURES = {
  pt: [
    'Curso completo de Color Grading em PORTUGUÊS.',
    'Se torne um colorista profissional aprendendo com um profissional de renome internacional.',
    'Você sairá com portfólio pronto para o mercado de trabalho.',
    'Você aprenderá técnicas eficazes comprovadas, usadas em comerciais e projetos de longos formatos.',
  ],
  en: [
    'Color Grading Course available in ENGLISH, FRENCH, SPANISH and ARABIC.',
    'Become a professional colorist. Learn from an international expert.',
    'Graduate with a portfolio ready for real-world projects.',
    'Learn techniques used in commercials and long-form productions.',
  ],
};

const LUTS_HERO_FEATURES = {
  pt: [
    'Uma coleção de 8 LUTs criadas e inspiradas nas cores que utilizo diariamente no meu trabalho profissional de color grading para filmes, séries e comerciais high-end.',
    'Desenvolvi essas LUTs para refletir meu estilo pessoal de correção de cor, mas, mais importante, para oferecer a versatilidade e eficiência que você precisa no seu workflow.',
    'Criadas para filmmakers, coloristas e videomakers que buscam resultados profissionais e impactantes.',
    'Tutorial incluído em Inglês e Português: Nava LUTs Tutorial (20:38).',
  ],
  en: [
    'A Collection of 8 LUTs crafted and inspired by the colors I use every day in my professional color grading work for films, series, and high-end ads.',
    'I developed these LUTs to reflect my personal grading style, but more importantly, to give you the versatility and efficiency you need in your workflow.',
    'Designed for filmmakers, colorists and videographers who are serious about achieving stunning and professional results.',
    'Includes a tutorial available in English and Portuguese: Nava LUTs Tutorial (20:38).',
  ],
};

const LUTS_BODY = {
  pt: {
    intro: [
      '8 LUTs cinematográficas.',
      'Cada LUT é fornecida em dez diferentes espaços de cor: ACES, Sony, Arri, Blackmagic, DJI, DWG, Panasonic, Rec.709, RED e o incrível Log-to-Log.',
    ],
    logTitle: 'O que é Log-to-Log?',
    logText:
      'Uma LUT Log-to-Log é como mágica. Uma forma altamente flexível de aplicar looks ao seu material. Ela oferece total liberdade criativa: misture, modifique e experimente cada LUT de acordo com o seu projeto e sua visão pessoal.',
    whyTitle: 'Por que escolher essas LUTs?',
    whyText:
      'Todas foram desenvolvidas por um colorista profissional com ampla experiência na indústria, colaborando com grandes nomes, diretores, DPs, séries e marcas renomadas. Estas NÃO são LUTs genéricas ou amadoras. São uma ferramenta acessível, mas verdadeiramente profissional.',
    checks: [
      'Testadas em mais de 2.000 clipes.',
      'Mantêm a integridade da imagem mesmo sob correções intensas.',
      'Desenvolvidas para entregar resultados ricos e cinematográficos sempre.',
      'Inclui atualizações vitalícias. Mantenha-se sempre atualizado, sem custo adicional.',
    ],
  },
  en: {
    intro: [
      '8 cinematic LUTs.',
      'Each LUT is provided in ten different color spaces: Aces, Sony, Arri, Blackmagic, DJI, DWG, Panasonic, Rec.709, RED and the amazing Log-to-Log.',
    ],
    logTitle: 'What is Log-to-Log?',
    logText:
      'A Log-to-Log LUT is like magic. It is a highly flexible way to apply looks to your footage. It gives you full creative freedom: mix, modify, and experiment with each LUT to suit your project and personal vision.',
    whyTitle: 'Why choose these LUTs?',
    whyText:
      'They are all developed by a professional Colorist with extensive experience in the industry, collaborating with major names, Directors, DPs, TV shows, and prestigious brands alike. These are NOT generic or amateur LUTs. They are an affordable yet truly professional tool.',
    checks: [
      'Stress-tested on over 2,000 clips.',
      'Maintains image integrity even under heavy grading.',
      'Designed to deliver rich, filmic results every time.',
      'Includes lifetime updates. Always stay up to date, at no extra cost.',
    ],
  },
};

const LUTS_COMPARE_ITEMS = [
  {
    id: 'luts-1',
    title_pt: 'LUT 01',
    title_en: 'LUT 01',
    beforeSrc: '/beforeafterLuts/1.LOG.webp',
    duringSrc: '/beforeafterLuts/1.REC.709.webp',
    afterSrc: '/beforeafterLuts/1.FINAL.webp',
  },
  {
    id: 'luts-2',
    title_pt: 'LUT 02',
    title_en: 'LUT 02',
    beforeSrc: '/beforeafterLuts/2.LOG.webp',
    duringSrc: '/beforeafterLuts/2.REC.709.webp',
    afterSrc: '/beforeafterLuts/2.FINAL.webp',
  },
  {
    id: 'luts-3',
    title_pt: 'LUT 03',
    title_en: 'LUT 03',
    beforeSrc: '/beforeafterLuts/3.LOG.webp',
    duringSrc: '/beforeafterLuts/3.REC.709.webp',
    afterSrc: '/beforeafterLuts/3.FINAL.webp',
  },
];

function scrollToPurchaseTop() {
  const anchor = document.getElementById('purchase-top');
  if (anchor) anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function ProductHero({ product, settings, content, onBack, featureItems, buyLink }) {
  const { language, t } = useLanguage();
  const productName = language === 'pt' ? (product.name_pt || product.name_en) : (product.name_en || product.name_pt);
  const heroTitle = product.product_type === 'course'
    ? (language === 'pt' ? (content?.hero_title_pt || productName) : (content?.hero_title_en || productName))
    : productName;
  const heroSubtitle = product.product_type === 'course'
    ? (language === 'pt' ? content?.hero_subtitle_pt : content?.hero_subtitle_en)
    : '';
  const price = language === 'pt' ? product.price_brl : product.price_usd;
  const currency = language === 'pt' ? 'R$' : '$';
  const productImage = language === 'pt'
    ? (product.detail_image_url_pt || product.image_url_pt || product.detail_image_url || product.image_url)
    : (product.detail_image_url_en || product.image_url_en || product.detail_image_url || product.image_url);
  const detailImage = product.product_type === 'course'
    ? (content?.hero_image_url || productImage)
    : productImage;
  const openCheckout = () => {
    if (buyLink) {
      window.open(buyLink, '_blank');
      return;
    }
    scrollToPurchaseTop();
  };

  return (
    <>
      <NavHeader logoUrl={settings?.logo_url} />

      <div id="purchase-top" className="relative px-4 pb-10 pt-32 md:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 flex justify-end">
            <Button
              onClick={onBack}
              variant="ghost"
              className="rounded-full border border-white/20 bg-transparent px-4 text-zinc-300 hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              {t('Voltar', 'Back')}
            </Button>
          </div>

          <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-8">
            <motion.img
              key={`${language}-${product.id || product.slug || 'detail'}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              src={detailImage}
              alt={heroTitle}
              className={`mx-auto h-auto w-full max-w-[900px] ${
                product.product_type === 'course'
                  ? 'max-h-[38vh] rounded-[28px] object-cover object-center sm:max-h-[48vh] lg:col-span-6 lg:max-h-[68vh]'
                  : 'max-h-[34vh] object-contain sm:max-h-[46vh] lg:col-span-6 lg:max-h-[66vh]'
              }`}
            />

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-6"
            >
              <span className="mb-3 inline-flex w-fit text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
                {product.product_type === 'course' ? t('Curso', 'Course') : 'LUTs'}
              </span>

              <h1 className="mb-3 text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
                {heroTitle}
              </h1>

              {heroSubtitle ? (
                <p className="mb-5 max-w-2xl text-base leading-relaxed text-zinc-300 md:text-lg">
                  {heroSubtitle}
                </p>
              ) : null}

              <div className="mb-6 flex w-fit items-end gap-3">
                <span className="text-3xl font-bold text-white lg:text-4xl">
                  {currency}
                  {price?.toLocaleString(language === 'pt' ? 'pt-BR' : 'en-US', {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>

              <ul className="mb-6 grid gap-2">
                {featureItems.map((item, idx) => (
                  <li key={`${item}-${idx}`} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#39e09b]" />
                    <span className="text-sm text-zinc-200 md:text-base">{item}</span>
                  </li>
                ))}
              </ul>

              <Button
                type="button"
                onClick={openCheckout}
                className="h-12 rounded-full border-2 border-white bg-black/40 px-10 text-sm font-bold tracking-[0.18em] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.28),0_10px_35px_rgba(0,0,0,0.35)] transition-all duration-300 hover:scale-[1.02] hover:bg-black/55 active:scale-[0.98]"
              >
                <span className="relative inline-flex items-center px-1 py-0.5 leading-none">
                  <span className="absolute -inset-1 rounded-md bg-[linear-gradient(90deg,#ff2f6d_0%,#ff8f1f_20%,#d8ff3a_40%,#31f2a7_60%,#26d8ff_78%,#7a6dff_90%,#ff38bd_100%)] opacity-65 blur-md" />
                  <span className="relative text-white">{t('COMPRAR AGORA', 'BUY NOW')}</span>
                </span>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

function productFeatureItems(product, language, fallbackItems) {
  const dynamic =
    language === 'pt'
      ? product?.features_pt || product?.course_highlights_pt
      : product?.features_en || product?.course_highlights_en;
  return Array.isArray(dynamic) && dynamic.length > 0 ? dynamic : fallbackItems;
}

function TrailerSection({ content = {} }) {
  const { t } = useLanguage();
  const line1Pt = content.trailer_title_line1_pt || 'Domine o Color Grading';
  const line1En = content.trailer_title_line1_en || 'Master Color Grading';
  const trailerTitle = t(content.trailer_title_pt || 'Trailer do curso', content.trailer_title_en || 'Course trailer');

  return (
    <SectionBlock gradient>
      <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
        {trailerTitle}
      </p>
      <SectionTitle
        line1={t(line1Pt, line1En)}
        highlight={t(content.trailer_highlight_pt || 'do iniciante ao profissional', content.trailer_highlight_en || 'from beginner to professional')}
        titleClassName="text-[1.55rem] leading-[1.1] md:text-4xl lg:text-5xl"
      />

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40">
        <div className="relative aspect-video w-full">
          <iframe
            src={content.trailer_url || 'https://player.vimeo.com/video/1079126634?title=0&byline=0&portrait=0&badge=0'}
            className="absolute inset-0 h-full w-full"
            allow="autoplay; fullscreen; picture-in-picture"
            loading="lazy"
            title={trailerTitle}
          />
        </div>
      </div>
    </SectionBlock>
  );
}

function MidPageBuyButton() {
  const { t } = useLanguage();

  return (
    <div className="flex justify-center">
      <Button
        type="button"
        onClick={scrollToPurchaseTop}
        className="h-12 rounded-full border-2 border-white bg-black/40 px-10 text-sm font-bold tracking-[0.18em] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.28),0_10px_35px_rgba(0,0,0,0.35)] transition-all duration-300 hover:scale-[1.02] hover:bg-black/55 active:scale-[0.98]"
      >
        <span className="relative inline-flex items-center px-1 py-0.5 leading-none">
          <span className="absolute -inset-1 rounded-md bg-[linear-gradient(90deg,#ff2f6d_0%,#ff8f1f_20%,#d8ff3a_40%,#31f2a7_60%,#26d8ff_78%,#7a6dff_90%,#ff38bd_100%)] opacity-65 blur-md" />
          <span className="relative text-white">{t('COMPRAR AGORA', 'BUY NOW')}</span>
        </span>
      </Button>
    </div>
  );
}

function SingleBeforeAfterSection() {
  const { t } = useLanguage();

  return (
    <BeforeAfterSlider
      items={[
        {
          id: 'course-extra-1',
          title_pt: 'Case 04',
          title_en: 'Case 04',
          beforeSrc: '/beforeafter/4.ANTES.webp',
          duringSrc: '/beforeafter/4.DURANTE.webp',
          afterSrc: '/beforeafter/4.DEPOIS.webp',
        },
      ]}
      maxItems={1}
      titleLine1={t('Antes e', 'Before and')}
      titleHighlight={t('depois', 'after')}
      titleSubtitle={t(
        'Uma comparação direta para visualizar o refinamento final da imagem.',
        'A direct comparison to visualize the final image refinement.'
      )}
    />
  );
}

function LutsInfoSection() {
  const { language, t } = useLanguage();
  const copy = language === 'pt' ? LUTS_BODY.pt : LUTS_BODY.en;

  return (
    <SectionBlock gradient>
      <SectionTitle
        line1={t('Tudo o que você', 'What you will')}
        highlight={t('recebe', 'get')}
        singleLine
        subtitle={t(
          'Uma ferramenta profissional pensada para acelerar seu workflow e ampliar sua liberdade criativa.',
          'A professional tool designed to speed up your workflow and expand your creative freedom.'
        )}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-2xl border border-white/10 bg-black/20 p-6">
          <h3 className="text-2xl font-semibold text-white">{t('O que você vai receber?', 'What will I get?')}</h3>
          <ul className="space-y-2">
            {copy.intro.map((item) => (
              <li key={item} className="flex items-start gap-2 text-zinc-200">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#39e09b]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-zinc-400">
            {t('Tutorial incluído em Inglês e Português.', 'Tutorial included in English and Portuguese.')}
          </p>
        </div>

        <div className="space-y-4 rounded-2xl border border-white/10 bg-black/20 p-6">
          <h3 className="text-2xl font-semibold text-white">{copy.logTitle}</h3>
          <p className="leading-relaxed text-zinc-200">{copy.logText}</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-6">
        <h3 className="mb-3 text-2xl font-semibold text-white">{copy.whyTitle}</h3>
        <p className="mb-4 leading-relaxed text-zinc-200">{copy.whyText}</p>
        <div className="grid gap-2 md:grid-cols-2">
          {copy.checks.map((item) => (
            <div key={item} className="flex items-start gap-2 text-zinc-100">
              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#39e09b]" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionBlock>
  );
}

function CourseDetailPage({ product, settings, courseContent, modules, logos, students, testimonials, beforeAfterItems, beforeAfterLoading, faqs, buyLink }) {
  const { language } = useLanguage();
  const featureItems = productFeatureItems(product, language, language === 'pt' ? COURSE_HERO_FEATURES.pt : COURSE_HERO_FEATURES.en);

  return (
    <div className="relative min-h-screen overflow-x-hidden text-white">
      <ProductHero
        product={product}
        settings={settings}
        content={courseContent}
        onBack={() => window.history.back()}
        featureItems={featureItems}
        buyLink={buyLink}
      />

      <main className="relative mx-auto max-w-6xl space-y-12 px-4 pb-20 md:px-8">
        <LanguagesSection content={courseContent} />

        {language === 'pt' ? (
          <TrailerSection content={courseContent} />
        ) : (
          <BeforeAfterSlider items={beforeAfterItems} isLoading={beforeAfterLoading} maxItems={2} />
        )}

        <CourseHighlightsGallery content={courseContent} />
        <StudentShowcase students={students} content={courseContent} />
        <InstructorSection content={courseContent} />
        {logos.length > 0 ? <ClientLogos logos={logos} title={language === 'pt' ? courseContent.client_logos_title_pt : courseContent.client_logos_title_en} /> : null}
        <MidPageBuyButton />
        <SingleBeforeAfterSection />
        <CourseModules modules={modules} content={courseContent} productType="course" />
        <ExclusiveAdditionalContentSection content={courseContent} />
        {testimonials.length > 0 ? <TestimonialsSection testimonials={testimonials} content={courseContent} /> : null}
        {language === 'en' ? <MidPageBuyButton /> : null}
        <CertificateSection
          content={courseContent}
          imageSrc={courseContent.certificate_image_url_pt || '/certificado.webp'}
          imageSrcEn={courseContent.certificate_image_url_en || '/certificado-ingles.webp'}
        />
        <FAQSection faqs={faqs} content={courseContent} />
      </main>
    </div>
  );
}

function LutsDetailPage({ product, settings, buyLink, modules, courseContent }) {
  const { language, t } = useLanguage();
  const featureItems = language === 'pt' ? LUTS_HERO_FEATURES.pt : LUTS_HERO_FEATURES.en;

  return (
    <div className="relative min-h-screen overflow-x-hidden text-white">
      <ProductHero
        product={product}
        settings={settings}
        content={courseContent}
        onBack={() => window.history.back()}
        featureItems={featureItems}
        buyLink={buyLink}
      />

      <main className="relative mx-auto max-w-6xl space-y-12 px-4 pb-20 md:px-8">
        <LutsInfoSection />

        <CourseModules modules={modules} content={courseContent} productType="luts" />

        <BeforeAfterSlider
          items={LUTS_COMPARE_ITEMS}
          labels={[
            { id: 'before', label: 'LOG', mobileLine1: 'LOG', mobileLine2: '' },
            { id: 'during', label: 'REC.709', mobileLine1: 'REC.', mobileLine2: '709' },
            { id: 'after', label: 'FINAL', mobileLine1: 'FINAL', mobileLine2: '' },
          ]}
          titleLine1={t('LOG, REC.709, FINAL', 'LOG, REC.709, FINAL')}
          titleSubtitle={t(
            'Compare diferentes estágios da imagem com as LUTs aplicadas.',
            'Compare different image stages with the LUTs applied.'
          )}
        />

        <SectionBlock gradient>
          <div className="text-center">
            <h2 className="mx-auto max-w-4xl text-3xl font-semibold leading-tight text-white md:text-4xl lg:text-5xl">
              <GlowText
                className="font-extrabold"
                gradient="from-[#ff3d77] via-[#9be15d] via-[#00e5ff] to-[#7b61ff]"
                glowColor="rgba(120,220,255,0.42)"
              >
                {t('Atualizações vitalícias', 'Lifetime updates')}
              </GlowText>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-300">
              {t(
                'Você continua recebendo melhorias sem custo adicional.',
                'You keep receiving improvements at no extra cost.'
              )}
            </p>
            <div className="mt-6">
              <MidPageBuyButton />
            </div>
          </div>
        </SectionBlock>
      </main>
    </div>
  );
}

function ProductDetailContent() {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { slug: routeSlug } = useParams();
  const [searchParams] = useSearchParams();
  const productSlug = routeSlug || searchParams.get('slug');

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productSlug],
    queryFn: async () => {
      const products = await apiClient.get('products');
      return products.find((p) => p.slug === productSlug);
    },
    enabled: !!productSlug,
  });

  const { data: settings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: () => apiClient.get('settings'),
    select: (data) => data?.[0] || {},
  });

  const { data: courseContent } = useQuery({
    queryKey: ['courseContent'],
    queryFn: () => apiClient.get('courseContent'),
    select: (data) => data?.[0] || {},
  });

  const { data: modules } = useQuery({
    queryKey: ['modules'],
    queryFn: () => apiClient.get('modules'),
    initialData: [],
  });

  const { data: logos } = useQuery({
    queryKey: ['logos'],
    queryFn: () => apiClient.get('logos'),
    initialData: [],
  });

  const { data: students } = useQuery({
    queryKey: ['students'],
    queryFn: () => apiClient.get('students'),
    initialData: [],
  });

  const { data: testimonials } = useQuery({
    queryKey: ['testimonials'],
    queryFn: () => apiClient.get('testimonials'),
    initialData: [],
  });

  const { data: beforeAfterItems, isLoading: beforeAfterLoading } = useQuery({
    queryKey: ['beforeAfter'],
    queryFn: () => apiClient.get('beforeAfter'),
    initialData: [],
  });

  const { data: faqs } = useQuery({
    queryKey: ['faqs'],
    queryFn: () => apiClient.get('faqs'),
    initialData: [],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050608] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#050608] flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-zinc-400">{t('Produto não encontrado', 'Product not found')}</p>
          <Button onClick={() => navigate('/')} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('Voltar', 'Back')}
          </Button>
        </div>
      </div>
    );
  }

  if (product.product_type === 'course') {
    const buyLink = language === 'pt'
      ? (product.buy_link_brl || product.buy_link_usd)
      : (product.buy_link_usd || product.buy_link_brl);
    return (
      <CourseDetailPage
        product={product}
        settings={settings}
        courseContent={courseContent}
        modules={modules}
        logos={logos}
        students={students}
        testimonials={testimonials}
        beforeAfterItems={beforeAfterItems}
        beforeAfterLoading={beforeAfterLoading}
        faqs={faqs}
        buyLink={buyLink}
      />
    );
  }

  const buyLink = language === 'pt'
    ? (product.buy_link_brl || product.buy_link_usd)
    : (product.buy_link_usd || product.buy_link_brl);

  return <LutsDetailPage product={product} settings={settings} buyLink={buyLink} modules={modules} courseContent={courseContent} />;
}

export default function ProductDetail() {
  return (
    <LanguageProvider>
      <ProductDetailContent />
    </LanguageProvider>
  );
}
