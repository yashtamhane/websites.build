'use client';

export default function Hero() {
  const scrollToForm = () => {
    const formSection = document.getElementById('form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-6">
          We Build Your Dream Website
        </h1>
        <p className="text-xl sm:text-2xl text-secondary mb-8 max-w-3xl mx-auto">
          Professional, custom websites for small businesses, restaurants, and personal portfolios.
          Simple, fast, and tailored to your needs.
        </p>
        <button
          onClick={scrollToForm}
          className="bg-accent text-background px-8 py-4 rounded-full text-lg font-semibold hover:bg-accent/90 transition-all transform hover:scale-105"
        >
          Start Your Project
        </button>
      </div>
    </section>
  );
}
