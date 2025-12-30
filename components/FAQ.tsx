'use client';

import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How long does it take to build a website?',
      answer: 'Typically, a standard website takes 1-3 weeks from initial consultation to launch, depending on complexity and your feedback speed. Rush projects can be accommodated.',
    },
    {
      question: 'What if I don\'t know what design I want?',
      answer: 'No problem! That\'s why we offer a curated template gallery. Browse through our examples, and we\'ll customize your chosen template to match your brand. We also provide design consultations to help you decide.',
    },
    {
      question: 'Can I make changes after the website is launched?',
      answer: 'Absolutely! We offer post-launch support and can make updates as your business grows. We can also provide training so you can make simple updates yourself.',
    },
    {
      question: 'Do you provide hosting and domain registration?',
      answer: 'Yes! We can handle all technical aspects including domain registration, hosting setup, and ongoing maintenance. Everything is taken care of so you can focus on your business.',
    },
    {
      question: 'Will my website work on mobile devices?',
      answer: 'Yes! All our websites are fully responsive and optimized for mobile phones, tablets, and desktop computers. We ensure your site looks great on all screen sizes.',
    },
    {
      question: 'What happens after I submit the form?',
      answer: 'We\'ll review your submission and contact you within 24-48 hours to discuss your project in detail, provide a timeline, and answer any questions you have.',
    },
    {
      question: 'Can you integrate my social media accounts?',
      answer: 'Yes! We can embed your social media feeds, add share buttons, and ensure all your social profiles are linked prominently on your website.',
    },
    {
      question: 'Do I own the website after it\'s built?',
      answer: 'Yes, you own all rights to your website. We provide you with all files, credentials, and access once the project is complete.',
    },
  ];

  return (
    <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8 bg-primary/5">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary text-center mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-secondary mb-12">
          Got questions? We've got answers
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-background rounded-lg shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-primary/5 transition-colors"
              >
                <span className="font-semibold text-primary pr-8">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-accent transition-transform flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-secondary leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
