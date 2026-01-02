import RestaurantHeader from '@/templates/restaurant/components/RestaurantHeader';
import HeroSection from '@/templates/restaurant/components/HeroSection';
import FeaturedDishes from '@/templates/restaurant/components/FeaturedDishes';
import WhyChooseUs from '@/templates/restaurant/components/WhyChooseUs';
import RestaurantFooter from '@/templates/restaurant/components/RestaurantFooter';

export default function RestaurantPreview() {
  return (
    <div className="min-h-screen bg-white">
      <RestaurantHeader />
      <main className="pt-20">
        <HeroSection />
        <FeaturedDishes />
        <WhyChooseUs />
      </main>
      <RestaurantFooter />
    </div>
  );
}
