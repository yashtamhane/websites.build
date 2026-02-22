import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WhyChooseUs from '@/components/WhyChooseUs';
import FeaturedTemplates from '@/components/FeaturedTemplates';
import HowWeWork from '@/components/HowWeWork';
import Reviews from '@/components/Reviews';
import QuickCTA from '@/components/QuickCTA';
import Footer from '@/components/Footer';
import { getApprovedReviews } from '@/lib/db';

export default async function Home() {
  // Pre-fetch reviews on the server so the carousel is visible immediately
  // (no client-side loading delay). Falls back to empty if MongoDB is slow/down.
  let initialReviews: {
    id: string;
    name: string;
    websiteType: 'business' | 'portfolio';
    text: string;
    websiteUrl?: string;
    rating: number;
  }[] = [];

  try {
    const raw = await getApprovedReviews();
    initialReviews = raw.map((r) => ({
      id: r.id,
      name: r.name,
      websiteType: r.websiteType,
      text: r.reviewText,
      websiteUrl: r.websiteUrl || undefined,
      rating: r.rating,
    }));
  } catch {
    // silently fail — Reviews component will still try a client-side fetch
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <WhyChooseUs />
        <HowWeWork />
        <Reviews initialReviews={initialReviews} />
        <FeaturedTemplates />
        <QuickCTA />
      </main>
      <Footer />
    </div>
  );
}
