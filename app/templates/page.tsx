import TemplateGallery from '@/components/TemplateGallery';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Templates() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <TemplateGallery />
      </main>
      <Footer />
    </div>
  );
}
