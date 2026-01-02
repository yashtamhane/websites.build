import PhotographyHeader from '@/templates/creative-portfolio/components/PhotographyHeader';
import HeroSection from '@/templates/creative-portfolio/components/HeroSection';
import PortfolioGallery from '@/templates/creative-portfolio/components/PortfolioGallery';
import AboutSection from '@/templates/creative-portfolio/components/AboutSection';
import ServicesSection from '@/templates/creative-portfolio/components/ServicesSection';
import ContactSection from '@/templates/creative-portfolio/components/ContactSection';
import PhotographyFooter from '@/templates/creative-portfolio/components/PhotographyFooter';

export default function CreativePortfolioPreview() {
  return (
    <div className="min-h-screen bg-white">
      <PhotographyHeader />
      <main>
        <HeroSection />
        <PortfolioGallery />
        <AboutSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <PhotographyFooter />
    </div>
  );
}
