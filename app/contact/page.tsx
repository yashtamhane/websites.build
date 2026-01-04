import SimpleContactForm from '@/components/SimpleContactForm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Contact() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <SimpleContactForm />
      </main>
      <Footer />
    </div>
  );
}
