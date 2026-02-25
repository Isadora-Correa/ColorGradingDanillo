import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/api/apiClient';
import { LanguageProvider, useLanguage } from '../components/ui/LanguageContext';
import NavHeader from '../components/common/NavHeader';
import ProductCatalog from '../components/home/ProductCatalog';
import BeforeAfterSlider from '../components/course/BeforeAfterSlider';
import ClientLogos from '../components/course/ClientLogos';
import CourseHighlightsGallery from '../components/course/CourseHighlightsGallery';
import StudentShowcase from '../components/course/StudentShowcase';
import InstructorSection from '../components/course/InstructorSection';
import LanguagesSection from '../components/course/LanguagesSection';
import CourseModules from '../components/course/CourseModules';
import TestimonialsSection from '../components/course/TestimonialsSection';
import CertificateSection from '../components/course/CertificateSection';
import FAQSection from '../components/course/FAQSection';
import { Loader2 } from 'lucide-react';

function HomeContent() {
  const { language } = useLanguage();

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
  });
  const { data: faqs } = useQuery({
    queryKey: ['faqs'],
    queryFn: () => apiClient.get('faqs'),
    initialData: [],
  });

  const siteSettings = settings?.[0] || {};
  const content = courseContent?.[0] || {}; // Se courseContent for um array
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
            <ProductCatalog products={products} />

            {/* 2. Course Details Section - Reorganized per design spec */}
            {courseProduct && (
              <div id="course-details" className="space-y-12">
                {/* 1. Before/After Slider */}
                <BeforeAfterSlider items={beforeAfterItems} isLoading={beforeAfterLoading} />
                
                {/* 2. Course Highlights Gallery */}
                <CourseHighlightsGallery />

                {/* 3. Student Showcase */}
                <StudentShowcase students={students} />

                {/* 4. Instructor Section */}
                <InstructorSection content={content} />

                {/* 5. Client Logos */}
                {logos.length > 0 && (
                  <ClientLogos logos={logos} />
                )}
                
                {/* 6. Languages Section */}
                <LanguagesSection languages={content.available_languages} />
                
                {/* 7. Course Modules */}
                {modules.length > 0 && (
                  <CourseModules modules={modules} />
                )}

                {/* 8. Testimonials */}
                {testimonials.length > 0 && (
                  <TestimonialsSection testimonials={testimonials} />
                )}

                {/* 9. Certificate */}
                <CertificateSection />

                {/* 10. FAQ */}
                <FAQSection faqs={faqs} />
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
