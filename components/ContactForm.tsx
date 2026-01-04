'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  projectType: z.enum(['business', 'portfolio']),
  businessName: z.string().min(2, 'Name is required'),
  businessType: z.string().min(2, 'Type/Industry is required'),
  currentWebsite: z.string().url().optional().or(z.literal('')),
  templateChoice: z.enum(['template', 'custom']),
  selectedTemplate: z.string().optional(),
  customDescription: z.string().optional(),
  features: z.array(z.string()),
  customFeature: z.string().optional(),
  instagram: z.string().optional(),
  linkedin: z.string().optional(),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid 10-digit phone number is required').max(10, 'Phone number should be 10 digits').regex(/^[6-9]\d{9}$/, 'Please enter a valid Indian mobile number'),
  preferredContact: z.array(z.string()).min(1, 'Please select at least one contact method'),
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
  const [showCustomFeature, setShowCustomFeature] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectType: 'business',
      templateChoice: 'template',
      features: [],
      preferredContact: [],
    },
  });

  const templateChoice = watch('templateChoice');
  const projectType = watch('projectType');

  const businessFeatures = [
    'Online Booking',
    'Contact Form',
    'WhatsApp Integration',
    'E-commerce/Shop',
    'Image Gallery',
    'Social Media Integration',
    'Customer Reviews',
    'Newsletter Signup',
    'Blog',
  ];

  const portfolioFeatures = [
    'Project Gallery',
    'Contact Form',
    'Resume/CV Download',
    'Testimonials',
    'Blog',
    'Social Media Integration',
    'Skills Showcase',
    'Case Studies',
  ];

  const featureOptions = projectType === 'business' ? businessFeatures : portfolioFeatures;

  const businessTemplates = [
    { id: 'specialty-gifts', name: 'Specialty Gifts' },
    { id: 'marketing-agency', name: 'Marketing Agency' },
    { id: 'marketing-pro', name: 'Marketing Pro' },
    { id: 'restaurant', name: 'Restaurant' },
  ];

  const portfolioTemplates = [
    { id: 'developer-portfolio', name: 'Developer Portfolio' },
    { id: 'creative-portfolio', name: 'Creative Portfolio' },
  ];

  const templates = projectType === 'business' ? businessTemplates : portfolioTemplates;

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
        <p className="text-center text-secondary mb-8">
          Fill out the form below to get started
        </p>

        {/* How We Work - Timeline */}
        <div className="bg-background p-6 sm:p-8 rounded-lg shadow-sm mb-12">
          <h3 className="text-2xl font-bold text-primary mb-8 text-center">How We Work</h3>

          {/* Mobile: Vertical Timeline */}
          <div className="md:hidden space-y-6">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-accent text-background rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div className="w-0.5 bg-accent/30 flex-1 mt-2"></div>
              </div>
              <div className="pb-6">
                <h4 className="font-semibold text-primary mb-1">Initial Inquiry</h4>
                <p className="text-sm text-secondary">
                  Fill out this form with your basic requirements and vision
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-accent text-background rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div className="w-0.5 bg-accent/30 flex-1 mt-2"></div>
              </div>
              <div className="pb-6">
                <h4 className="font-semibold text-primary mb-1">Detailed Discussion</h4>
                <p className="text-sm text-secondary">
                  We'll reach out to gather detailed requirements and preferences
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-accent text-background rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div className="w-0.5 bg-accent/30 flex-1 mt-2"></div>
              </div>
              <div className="pb-6">
                <h4 className="font-semibold text-primary mb-1">Development</h4>
                <p className="text-sm text-secondary">
                  Our team builds your website and keeps you updated
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-accent text-background rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-1">Delivery & Revisions</h4>
                <p className="text-sm text-secondary">
                  We deliver and make changes based on your feedback
                </p>
              </div>
            </div>
          </div>

          {/* Desktop: Horizontal Timeline */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-accent/30" style={{ left: '5%', right: '5%' }}></div>

              {/* Timeline Steps */}
              <div className="grid grid-cols-4 gap-4 relative">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-10 h-10 bg-accent text-background rounded-full flex items-center justify-center font-bold relative z-10">
                      1
                    </div>
                  </div>
                  <h4 className="font-semibold text-primary mb-2">Initial Inquiry</h4>
                  <p className="text-sm text-secondary">
                    Fill out this form with your basic requirements and vision
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-10 h-10 bg-accent text-background rounded-full flex items-center justify-center font-bold relative z-10">
                      2
                    </div>
                  </div>
                  <h4 className="font-semibold text-primary mb-2">Detailed Discussion</h4>
                  <p className="text-sm text-secondary">
                    We'll reach out to gather detailed requirements and preferences
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-10 h-10 bg-accent text-background rounded-full flex items-center justify-center font-bold relative z-10">
                      3
                    </div>
                  </div>
                  <h4 className="font-semibold text-primary mb-2">Development</h4>
                  <p className="text-sm text-secondary">
                    Our team builds your website and keeps you updated
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-10 h-10 bg-accent text-background rounded-full flex items-center justify-center font-bold relative z-10">
                      4
                    </div>
                  </div>
                  <h4 className="font-semibold text-primary mb-2">Delivery & Revisions</h4>
                  <p className="text-sm text-secondary">
                    We deliver and make changes based on your feedback
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {submitSuccess && (
          <div className="mb-8 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            Thank you! We've received your submission and will contact you soon.
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Project Type Selection */}
          <div className="bg-background p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-primary mb-4">What are you building?</h3>
            <div className="flex gap-4 mb-6">
              <label className="flex-1 cursor-pointer">
                <input
                  {...register('projectType')}
                  type="radio"
                  value="business"
                  className="peer sr-only"
                />
                <div className="border-2 border-primary/20 rounded-lg p-4 text-center peer-checked:border-accent peer-checked:bg-accent/5 hover:border-accent/50 transition-all">
                  <div className="text-2xl mb-2">🏢</div>
                  <div className="font-semibold text-primary">Business Website</div>
                  <div className="text-xs text-secondary mt-1">For companies, restaurants, shops</div>
                </div>
              </label>
              <label className="flex-1 cursor-pointer">
                <input
                  {...register('projectType')}
                  type="radio"
                  value="portfolio"
                  className="peer sr-only"
                />
                <div className="border-2 border-primary/20 rounded-lg p-4 text-center peer-checked:border-accent peer-checked:bg-accent/5 hover:border-accent/50 transition-all">
                  <div className="text-2xl mb-2">👤</div>
                  <div className="font-semibold text-primary">Personal Portfolio</div>
                  <div className="text-xs text-secondary mt-1">For developers, designers, creators</div>
                </div>
              </label>
            </div>
          </div>

          {/* Business/Portfolio Information */}
          <div className="bg-background p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-primary mb-4">
              {projectType === 'business' ? 'Business Information' : 'Your Information'}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-primary font-medium mb-2">
                  {projectType === 'business' ? 'Business Name *' : 'Your Name *'}
                </label>
                <input
                  {...register('businessName')}
                  className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-accent bg-background text-primary"
                  placeholder={projectType === 'business' ? 'Your Business Name' : 'Your Full Name'}
                />
                {errors.businessName && (
                  <p className="text-red-500 text-sm mt-1">{errors.businessName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-primary font-medium mb-2">
                  {projectType === 'business' ? 'Business Type / Industry *' : 'Your Profession / Field *'}
                </label>
                <input
                  {...register('businessType')}
                  className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-accent bg-background text-primary"
                  placeholder={projectType === 'business' ? 'e.g., Restaurant, Retail Store, Photography' : 'e.g., Web Developer, Graphic Designer, Photographer'}
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
            <h3 className="text-xl font-semibold text-primary mb-4">
              {projectType === 'business' ? 'Your Website Vision' : 'Your Portfolio Vision'}
            </h3>

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
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={showCustomFeature}
                      onChange={(e) => setShowCustomFeature(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-primary">Other</span>
                  </label>
                </div>
                {showCustomFeature && (
                  <div className="mt-3">
                    <input
                      {...register('customFeature')}
                      type="text"
                      className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-accent bg-background text-primary"
                      placeholder="Describe your custom feature..."
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-background p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-primary mb-4">Contact Information</h3>
            <p className="text-sm text-secondary mb-4">
              Provide your contact details so we can reach you to discuss your project.
            </p>

            <div className="space-y-4">
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
                  placeholder="+91 00000 00000"
                  maxLength={10}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-primary font-medium mb-2">
                  How would you like us to reach you? * (Select all that apply)
                </label>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer p-3 border-2 border-primary/20 rounded-lg hover:border-accent transition-all">
                    <input
                      {...register('preferredContact')}
                      type="checkbox"
                      value="email"
                      className="mr-3"
                    />
                    <div>
                      <span className="text-primary font-medium">Email</span>
                      <p className="text-xs text-secondary">We'll contact you via email</p>
                    </div>
                  </label>
                  <label className="flex items-center cursor-pointer p-3 border-2 border-primary/20 rounded-lg hover:border-accent transition-all">
                    <input
                      {...register('preferredContact')}
                      type="checkbox"
                      value="phone"
                      className="mr-3"
                    />
                    <div>
                      <span className="text-primary font-medium">Phone Call</span>
                      <p className="text-xs text-secondary">We'll call you on your phone</p>
                    </div>
                  </label>
                  <label className="flex items-center cursor-pointer p-3 border-2 border-primary/20 rounded-lg hover:border-accent transition-all">
                    <input
                      {...register('preferredContact')}
                      type="checkbox"
                      value="whatsapp"
                      className="mr-3"
                    />
                    <div>
                      <span className="text-primary font-medium">WhatsApp</span>
                      <p className="text-xs text-secondary">Make sure the number you provided is on WhatsApp</p>
                    </div>
                  </label>
                </div>
                {errors.preferredContact && (
                  <p className="text-red-500 text-sm mt-1">{errors.preferredContact.message}</p>
                )}
              </div>

              <div>
                <h4 className="text-primary font-medium mb-3 mt-6">
                  Your Social Media (Optional)
                </h4>
                <p className="text-xs text-secondary mb-3">
                  Share your social media handles if you'd like them linked on your website
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-primary font-medium mb-2 text-sm">Instagram</label>
                    <input
                      {...register('instagram')}
                      className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-accent bg-background text-primary"
                      placeholder={projectType === 'business' ? '@yourbusiness' : '@yourhandle'}
                    />
                  </div>
                  <div>
                    <label className="block text-primary font-medium mb-2 text-sm">LinkedIn</label>
                    <input
                      {...register('linkedin')}
                      className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-accent bg-background text-primary"
                      placeholder={projectType === 'business' ? 'linkedin.com/company/yourbusiness' : 'linkedin.com/in/yourname'}
                    />
                  </div>
                </div>
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

        {/* Still Have Questions CTA */}
        <div className="mt-12 text-center p-6 bg-background rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-primary mb-2">Still have questions?</h3>
          <p className="text-secondary mb-4">
            Check out our frequently asked questions or get in touch with us directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/faq"
              className="inline-block bg-primary text-background px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-all"
            >
              FAQ
            </a>
            <a
              href="/contact"
              className="inline-block border-2 border-primary text-primary px-6 py-3 rounded-full font-medium hover:bg-primary/5 transition-all"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
