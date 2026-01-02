import RestaurantHeader from '@/templates/restaurant/components/RestaurantHeader';
import AboutContent from '@/templates/restaurant/components/AboutContent';
import RestaurantFooter from '@/templates/restaurant/components/RestaurantFooter';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <RestaurantHeader />
      <main className="pt-20">
        <AboutContent />
      </main>
      <RestaurantFooter />
    </div>
  );
}
