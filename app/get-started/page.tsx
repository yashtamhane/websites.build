import ContactForm from '@/components/ContactForm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function GetStarted() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
