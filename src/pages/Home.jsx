import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/api/apiClient';
import { LanguageProvider, useLanguage } from '../components/ui/LanguageContext';
import NavHeader from '../components/common/NavHeader';
import ProductCatalog from '../components/home/ProductCatalog';
import BeforeAfterSlider from '../components/course/BeforeAfterSlider';
import ClientLogos from '../components/course/ClientLogos';
import StudentShowcase from '../components/course/StudentShowcase';
import InstructorSection from '../components/course/InstructorSection';
import LanguagesSection from '../components/course/LanguagesSection';
import TestimonialsSection from '../components/course/TestimonialsSection';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

function BuyNowSection({ label }) {
  const scrollToProducts = () => {
    const anchor = document.getElementById('products-top');
    if (anchor) anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="flex justify-center">
      <Button
        type="button"
        onClick={scrollToProducts}
        className="h-12 rounded-full bg-black/40 px-10 text-sm font-bold tracking-[0.18em] text-white shadow-[0_10px_35px_rgba(0,0,0,0.35)] transition-all duration-300 hover:scale-[1.02] hover:bg-black/55 active:scale-[0.98]"
      >
        <span className="relative inline-flex items-center px-1 py-0.5 leading-none">
          <span className="absolute -inset-1 rounded-md bg-[linear-gradient(90deg,#ff2f6d_0%,#ff8f1f_20%,#d8ff3a_40%,#31f2a7_60%,#26d8ff_78%,#7a6dff_90%,#ff38bd_100%)] opacity-65 blur-md" />
          <span className="relative text-white">{label}</span>
        </span>
      </Button>
    </div>
  );
}

function HomeContent() {
  const { t } = useLanguage();

  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: () => apiClient.get('settings'),
  });

  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => apiClient.get('products'),
    initialData: [],
  });

  const { data: courseContent } = useQuery({
    queryKey: ['courseContent'],
    queryFn: () => apiClient.get('courseContent'),
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
  });
  const siteSettings = settings?.[0] || {};
  const content = courseContent?.[0] || {};
  const courseProduct = products?.find(p => p.product_type === 'course');

  return (
    <div>
      <NavHeader logoUrl={siteSettings.logo_url} />
      
      <main className="max-w-6xl mx-auto px-4 pb-20 space-y-12 pt-32">
        {productsLoading ? (
          <div className="min-h-[1700px] space-y-6 py-10">
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
            </div>
            <div className="h-56 rounded-xl border border-white/10 bg-zinc-900/35" />
            <div className="h-[420px] rounded-xl border border-white/10 bg-zinc-900/30" />
            <div className="h-[320px] rounded-xl border border-white/10 bg-zinc-900/25" />
            <div className="h-[380px] rounded-xl border border-white/10 bg-zinc-900/20" />
          </div>
        ) : (
          <>
            {/* 1. Products Catalog - FIRST */}
            <div id="products-top">
              <ProductCatalog products={products} settings={siteSettings} />
            </div>

            {/* 2. Course Details Section - Reorganized per design spec */}
            {courseProduct && (
              <div id="course-details" className="space-y-12">
                <BeforeAfterSlider
                  items={beforeAfterItems}
                  isLoading={beforeAfterLoading}
                  maxItems={2}
                  titleLine1={t('Antes e depois', 'Before and after')}
                  titleSubtitle={t(
                    'Veja na prática a evolução visual aplicada nos projetos.',
                    'See the visual transformation applied in real projects.'
                  )}
                />

                <BuyNowSection label={t('COMPRE AGORA', 'BUY NOW')} />

                <InstructorSection content={content} />

                {logos.length > 0 && (
                  <ClientLogos logos={logos} />
                )}

                <StudentShowcase students={students} />

                <LanguagesSection languages={content.available_languages} />

                <BuyNowSection label={t('COMPRE AGORA', 'BUY NOW')} />

                {testimonials.length > 0 && (
                  <TestimonialsSection testimonials={testimonials} />
                )}
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} Nava Colorist. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <HomeContent />
    </LanguageProvider>
  );
}
