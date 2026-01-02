import HyperHeader from '@/templates/marketing-pro/components/HyperHeader';
import HeroSection from '@/templates/marketing-pro/components/HeroSection';
import ServicesSection from '@/templates/marketing-pro/components/ServicesSection';
import ResultsSection from '@/templates/marketing-pro/components/ResultsSection';
import ContactSection from '@/templates/marketing-pro/components/ContactSection';
import HyperFooter from '@/templates/marketing-pro/components/HyperFooter';

export default function MarketingProPreview() {
  return (
    <div className="min-h-screen bg-slate-950">
      <HyperHeader />
      <main>
        <HeroSection />
        <ServicesSection />
        <ResultsSection />
        <ContactSection />
      </main>
      <HyperFooter />
    </div>
  );
}
