import MarketingHeader from '@/templates/marketing-agency/components/MarketingHeader';
import HeroSection from '@/templates/marketing-agency/components/HeroSection';
import ServicesSection from '@/templates/marketing-agency/components/ServicesSection';
import CaseStudiesSection from '@/templates/marketing-agency/components/CaseStudiesSection';
import TestimonialsSection from '@/templates/marketing-agency/components/TestimonialsSection';
import ContactSection from '@/templates/marketing-agency/components/ContactSection';
import MarketingFooter from '@/templates/marketing-agency/components/MarketingFooter';

export default function MarketingAgencyPreview() {
  return (
    <div className="min-h-screen bg-white">
      <MarketingHeader />
      <main>
        <HeroSection />
        <ServicesSection />
        <CaseStudiesSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <MarketingFooter />
    </div>
  );
}
