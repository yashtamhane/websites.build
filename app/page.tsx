import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WhyChooseUs from '@/components/WhyChooseUs';
import FeaturedTemplates from '@/components/FeaturedTemplates';
import HowWeWork from '@/components/HowWeWork';
import QuickCTA from '@/components/QuickCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <WhyChooseUs />
        <HowWeWork />
        <FeaturedTemplates />
        <QuickCTA />
      </main>
      <Footer />
    </div>
  );
}
