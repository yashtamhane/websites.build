import GiftHeader from './components/GiftHeader';
import GiftHero from './components/GiftHero';
import CategoryBrowser from './components/CategoryBrowser';
import FeaturedProducts from './components/FeaturedProducts';
import Services from './components/Services';
import About from './components/About';
import ContactSection from './components/ContactSection';
import GiftFooter from './components/GiftFooter';

export default function SpecialtyGiftsTemplate() {
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
