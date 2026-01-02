import GiftHeader from '@/templates/specialty-gifts/components/GiftHeader';
import GiftHero from '@/templates/specialty-gifts/components/GiftHero';
import CategoryBrowser from '@/templates/specialty-gifts/components/CategoryBrowser';
import FeaturedProducts from '@/templates/specialty-gifts/components/FeaturedProducts';
import Services from '@/templates/specialty-gifts/components/Services';
import About from '@/templates/specialty-gifts/components/About';
import ContactSection from '@/templates/specialty-gifts/components/ContactSection';
import GiftFooter from '@/templates/specialty-gifts/components/GiftFooter';

export default function SpecialtyGiftsPreview() {
  return (
    <div className="min-h-screen bg-white">
      <GiftHeader />
      <main>
        <GiftHero />
        <CategoryBrowser />
        <FeaturedProducts />
        <Services />
        <About />
        <ContactSection />
      </main>
      <GiftFooter />
    </div>
  );
}
