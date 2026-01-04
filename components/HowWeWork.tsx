export default function HowWeWork() {
  const steps = [
    {
      number: 1,
      title: 'Initial Inquiry',
      description: 'Fill out our form with your basic requirements and vision',
    },
    {
      number: 2,
      title: 'Detailed Discussion',
      description: "We'll reach out to gather detailed requirements and preferences",
    },
    {
      number: 3,
      title: 'Development',
      description: 'Our team builds your website and keeps you updated',
    },
    {
      number: 4,
      title: 'Delivery & Revisions',
      description: 'We deliver and make changes based on your feedback',
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary/5">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary text-center mb-4">
          How We Work
        </h2>
        <p className="text-center text-secondary mb-12 max-w-2xl mx-auto">
          Our simple, transparent process ensures you get exactly what you envision
        </p>

        {/* Mobile: Vertical Timeline */}
        <div className="md:hidden space-y-6">
          {steps.map((step, index) => (
            <div key={step.number} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-accent text-background rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {step.number}
                </div>
                {index !== steps.length - 1 && (
                  <div className="w-0.5 bg-accent/30 flex-1 mt-2"></div>
                )}
              </div>
              <div className="pb-6">
                <h3 className="text-xl font-semibold text-primary mb-2">{step.title}</h3>
                <p className="text-secondary">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Horizontal Timeline */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Timeline Line */}
            <div
              className="absolute top-6 left-0 right-0 h-0.5 bg-accent/30"
              style={{ left: '6%', right: '6%' }}
            ></div>

            {/* Timeline Steps */}
            <div className="grid grid-cols-4 gap-8 relative">
              {steps.map((step) => (
                <div key={step.number} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-accent text-background rounded-full flex items-center justify-center font-bold text-lg relative z-10">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2">{step.title}</h3>
                  <p className="text-secondary text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
