import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { LanguageProvider, useLanguage } from '../components/ui/LanguageContext';
import NavHeader from '../components/common/NavHeader';
import HeroSection from '../components/home/HeroSection';
import ProductCatalog from '../components/home/ProductCatalog';
import CourseHero from '../components/course/CourseHero';
import BeforeAfterSlider from '../components/course/BeforeAfterSlider';
import ClientLogos from '../components/course/ClientLogos';
import StudentShowcase from '../components/course/StudentShowcase';
import InstructorSection from '../components/course/InstructorSection';
import LanguagesSection from '../components/course/LanguagesSection';
import CourseModules from '../components/course/CourseModules';
import TestimonialsSection from '../components/course/TestimonialsSection';
import FAQSection from '../components/course/FAQSection';
import { Loader2 } from 'lucide-react';

function HomeContent() {
  const { language } = useLanguage();

  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: () => base44.entities.SiteSettings.list(),
  });

  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list(),
    initialData: [],
  });

  const { data: courseContent } = useQuery({
    queryKey: ['courseContent'],
    queryFn: () => base44.entities.CourseContent.list(),
  });

  const { data: modules } = useQuery({
    queryKey: ['modules'],
    queryFn: () => base44.entities.CourseModule.list(),
    initialData: [],
  });

  const { data: students } = useQuery({
    queryKey: ['students'],
    queryFn: () => base44.entities.Student.list(),
    initialData: [],
  });

  const { data: logos } = useQuery({
    queryKey: ['logos'],
    queryFn: () => base44.entities.ClientLogo.list(),
    initialData: [],
  });

  const { data: testimonials } = useQuery({
    queryKey: ['testimonials'],
    queryFn: () => base44.entities.Testimonial.list(),
    initialData: [],
  });

  const { data: faqs } = useQuery({
    queryKey: ['faqs'],
    queryFn: () => base44.entities.FAQ.list(),
    initialData: [],
  });

  const { data: beforeAfterItems } = useQuery({
    queryKey: ['beforeAfter'],
    queryFn: () => base44.entities.BeforeAfter.list(),
    initialData: [],
  });

  const siteSettings = settings?.[0] || {};
  const content = courseContent?.[0] || {};
  const courseProduct = products?.find(p => p.product_type === 'course');
  const lutsProduct = products?.find(p => p.product_type === 'luts');

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <NavHeader logoUrl={siteSettings.logo_url} />
      
      <HeroSection 
        videoUrl={siteSettings.hero_video_url}
        imageUrl={siteSettings.hero_image_url}
      />

      <main className="max-w-6xl mx-auto px-4 pb-20 space-y-12 -mt-20">
        {productsLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
          </div>
        ) : (
          <>
            {/* Products Catalog */}
            <ProductCatalog products={products} />

            {/* Course Details Section */}
            {courseProduct && (
              <div id="course-details" className="space-y-12">
                {beforeAfterItems.length > 0 && (
                  <BeforeAfterSlider items={beforeAfterItems} />
                )}
                
                {logos.length > 0 && (
                  <ClientLogos logos={logos} />
                )}

                {/* Career changing section */}
                {content.career_description_pt && (
                  <div className="text-center py-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      {language === 'pt' 
                        ? 'O curso que vai mudar sua carreira'
                        : 'The course that will change your career'
                      }
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                      {language === 'pt' ? content.career_description_pt : content.career_description_en}
                    </p>
                  </div>
                )}

                {students.length > 0 && (
                  <StudentShowcase students={students} />
                )}

                <InstructorSection content={content} />
                
                <LanguagesSection languages={content.available_languages} />
                
                {modules.length > 0 && (
                  <CourseModules modules={modules} />
                )}

                {testimonials.length > 0 && (
                  <TestimonialsSection testimonials={testimonials} />
                )}

                <CourseHero content={content} product={courseProduct} lutsProduct={lutsProduct} />

                {faqs.length > 0 && (
                  <FAQSection faqs={faqs} />
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