import Team from '@/components/Team';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TeamPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Team />
      </main>
      <Footer />
    </div>
  );
}
