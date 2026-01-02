import RestaurantHeader from '@/templates/restaurant/components/RestaurantHeader';
import ReservationForm from '@/templates/restaurant/components/ReservationForm';
import RestaurantFooter from '@/templates/restaurant/components/RestaurantFooter';

export default function ReservationsPage() {
  return (
    <div className="min-h-screen bg-white">
      <RestaurantHeader />
      <main className="pt-20">
        <ReservationForm />
      </main>
      <RestaurantFooter />
    </div>
  );
}
