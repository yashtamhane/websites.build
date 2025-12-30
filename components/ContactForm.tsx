'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  businessName: z.string().min(2, 'Business name is required'),
  businessType: z.string().min(2, 'Business type is required'),
  currentWebsite: z.string().url().optional().or(z.literal('')),
  templateChoice: z.enum(['template', 'custom']),
  selectedTemplate: z.string().optional(),
  customDescription: z.string().optional(),
  features: z.array(z.string()),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  additionalNotes: z.string().optional(),
}).refine(
  (data) => {
    if (data.templateChoice === 'template') {
      return !!data.selectedTemplate;
    }
    if (data.templateChoice === 'custom') {
      return !!data.customDescription && data.customDescription.length > 10;
    }
    return true;
  },
  {
    message: 'Please select a template or provide a custom description',
    path: ['customDescription'],
  }
);

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      templateChoice: 'template',
      features: [],
    },
  });

  const templateChoice = watch('templateChoice');

  const featureOptions = [
    'Contact Form',
    'Online Booking',
    'E-commerce/Shop',
    'Image Gallery',
    'Blog',
    'Social Media Integration',
    'Live Chat',
    'Newsletter Signup',
    'Customer Reviews',
  ];

  const templates = [
    { id: 'online-store', name: 'Online Store' },
    { id: 'photography-portfolio', name: 'Photography Portfolio' },
    { id: 'fine-dining', name: 'Fine Dining' },
    { id: 'fitness-studio', name: 'Fitness Studio' },
    { id: 'law-firm', name: 'Law Firm' },
    { id: 'real-estate-agency', name: 'Real Estate Agency' },
    { id: 'beauty-salon-spa', name: 'Beauty Salon & Spa' },
    { id: 'medical-clinic', name: 'Medical Clinic' },
    { id: 'tech-startup', name: 'Tech Startup' },
    { id: 'event-planning', name: 'Event Planning' },
    { id: 'educational-academy', name: 'Educational Academy' },
    { id: 'creative-agency', name: 'Creative Agency' },
    { id: 'coffee-shop', name: 'Coffee Shop' },
    { id: 'automotive-shop', name: 'Automotive Shop' },
    { id: 'construction-company', name: 'Construction Company' },
  ];

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        reset();
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        alert('Failed to submit form. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="form" className="py-16 px-4 sm:px-6 lg:px-8 bg-primary/5">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary text-center mb-4">
          Let's Build Your Website
        </h2>
        <p className="text-center text-secondary mb-12">
          Fill out the form below and we'll get started on your project
        </p>

        {submitSuccess && (
          <div className="mb-8 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            Thank you! We've received your submission and will contact you soon.
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Business Information */}
          <div className="bg-background p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-primary mb-4">Business Information</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-primary font-medium mb-2">
                  Business Name *
                </label>
                <input
                  {...register('businessName')}
                  className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-accent bg-background text-primary"
                  placeholder="Your Business Name"
                />
                {errors.businessName && (
                  <p className="text-red-500 text-sm mt-1">{errors.businessName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-primary font-medium mb-2">
                  Business Type / Industry *
                </label>
                <input
                  {...register('businessType')}
                  className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-accent bg-background text-primary"
                  placeholder="e.g., Restaurant, Retail Store, Photography"
                />
                {errors.businessType && (
                  <p className="text-red-500 text-sm mt-1">{errors.businessType.message}</p>
                )}
              </div>

              <div>
                <label className="block text-primary font-medium mb-2">
                  Current Website (if any)
                </label>
                <input
                  {...register('currentWebsite')}
                  type="url"
                  className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-accent bg-background text-primary"
                  placeholder="https://yourwebsite.com"
                />
                {errors.currentWebsite && (
                  <p className="text-red-500 text-sm mt-1">{errors.currentWebsite.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Website Vision */}
          <div className="bg-background p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-primary mb-4">Your Website Vision</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-primary font-medium mb-2">
                  How would you like to describe your website?
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      {...register('templateChoice')}
                      type="radio"
                      value="template"
                      className="mr-2"
                    />
                    <span className="text-primary">Select a template</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      {...register('templateChoice')}
                      type="radio"
                      value="custom"
                      className="mr-2"
                    />
                    <span className="text-primary">Describe my vision</span>
                  </label>
                </div>
              </div>

              {templateChoice === 'template' && (
                <div>
                  <label className="block text-primary font-medium mb-2">
                    Choose Template *
                  </label>
                  <select
                    {...register('selectedTemplate')}
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-accent bg-background text-primary"
                  >
                    <option value="">Select a template...</option>
                    {templates.map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                  {errors.selectedTemplate && (
                    <p className="text-red-500 text-sm mt-1">{errors.selectedTemplate.message}</p>
                  )}
                </div>
              )}

              {templateChoice === 'custom' && (
                <div>
                  <label className="block text-primary font-medium mb-2">
                    Describe Your Vision *
                  </label>
                  <textarea
                    {...register('customDescription')}
                    rows={5}
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-accent bg-background text-primary"
                    placeholder="Tell us about your ideal website - design style, colors, layout, inspiration, etc."
                  />
                  {errors.customDescription && (
                    <p className="text-red-500 text-sm mt-1">{errors.customDescription.message}</p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-primary font-medium mb-2">
                  Features You Need
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {featureOptions.map((feature) => (
                    <label key={feature} className="flex items-center">
                      <input
                        {...register('features')}
                        type="checkbox"
                        value={feature}
                        className="mr-2"
                      />
                      <span className="text-primary">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Social Media & Contact */}
          <div className="bg-background p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-primary mb-4">Social Media & Contact</h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-primary font-medium mb-2">Instagram</label>
                  <input
                    {...register('instagram')}
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-accent bg-background text-primary"
                    placeholder="@yourbusiness"
                  />
                </div>
                <div>
                  <label className="block text-primary font-medium mb-2">Facebook</label>
                  <input
                    {...register('facebook')}
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-accent bg-background text-primary"
                    placeholder="facebook.com/yourbusiness"
                  />
                </div>
                <div>
                  <label className="block text-primary font-medium mb-2">LinkedIn</label>
                  <input
                    {...register('linkedin')}
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-accent bg-background text-primary"
                    placeholder="linkedin.com/company/yourbusiness"
                  />
                </div>
                <div>
                  <label className="block text-primary font-medium mb-2">Twitter/X</label>
                  <input
                    {...register('twitter')}
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-accent bg-background text-primary"
                    placeholder="@yourbusiness"
                  />
                </div>
              </div>

              <div>
                <label className="block text-primary font-medium mb-2">
                  Your Email *
                </label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-accent bg-background text-primary"
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-primary font-medium mb-2">
                  Your Phone *
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-accent bg-background text-primary"
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-primary font-medium mb-2">
                  Additional Notes
                </label>
                <textarea
                  {...register('additionalNotes')}
                  rows={4}
                  className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-accent bg-background text-primary"
                  placeholder="Any other details, special requests, or questions..."
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent text-background py-4 rounded-lg text-lg font-semibold hover:bg-accent/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Your Project'}
          </button>
        </form>
      </div>
    </section>
  );
}
