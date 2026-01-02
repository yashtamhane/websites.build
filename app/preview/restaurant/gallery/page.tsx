import RestaurantHeader from '@/templates/restaurant/components/RestaurantHeader';
import GalleryContent from '@/templates/restaurant/components/GalleryContent';
import RestaurantFooter from '@/templates/restaurant/components/RestaurantFooter';

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-white">
      <RestaurantHeader />
      <main className="pt-20">
        <GalleryContent />
      </main>
      <RestaurantFooter />
    </div>
  );
}
