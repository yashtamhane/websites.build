import RestaurantHeader from '@/templates/restaurant/components/RestaurantHeader';
import MenuContent from '@/templates/restaurant/components/MenuContent';
import RestaurantFooter from '@/templates/restaurant/components/RestaurantFooter';

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-white">
      <RestaurantHeader />
      <main className="pt-20">
        <MenuContent />
      </main>
      <RestaurantFooter />
    </div>
  );
}
