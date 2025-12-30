import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WhyChooseUs from '@/components/WhyChooseUs';
import TemplateGallery from '@/components/TemplateGallery';
import ContactForm from '@/components/ContactForm';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <WhyChooseUs />
        <TemplateGallery />
        <ContactForm />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
