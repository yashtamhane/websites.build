import RestaurantHeader from '@/templates/restaurant/components/RestaurantHeader';
import ContactContent from '@/templates/restaurant/components/ContactContent';
import RestaurantFooter from '@/templates/restaurant/components/RestaurantFooter';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <RestaurantHeader />
      <main className="pt-20">
        <ContactContent />
      </main>
      <RestaurantFooter />
    </div>
  );
}
