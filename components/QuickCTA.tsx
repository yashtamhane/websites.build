import Link from 'next/link';

export default function QuickCTA() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary/5">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-lg text-secondary mb-8 max-w-2xl mx-auto">
          Tell us about your project and we'll bring your vision to life. Fill out our detailed form to get a personalized quote and timeline.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/get-started"
            className="inline-block bg-accent text-background px-10 py-4 rounded-full text-lg font-semibold hover:bg-accent/90 transition-all transform hover:scale-105"
          >
            Start Your Project →
          </Link>
          <Link
            href="/templates"
            className="inline-block bg-primary text-background px-10 py-4 rounded-full text-lg font-semibold hover:bg-primary/90 transition-all transform hover:scale-105"
          >
            View All Templates →
          </Link>
        </div>
      </div>
    </section>
  );
}
