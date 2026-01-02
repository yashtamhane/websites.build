# Specialty Gifts Template - Usage Guide

## How to Use This Template

This template is a complete, ready-to-deploy website for gift shops and specialty retail businesses.

### Template Structure

```
specialty-gifts/
├── page.tsx                    # Main page component
├── components/
│   ├── GiftHeader.tsx         # Navigation header
│   ├── GiftHero.tsx           # Hero section with CTA
│   ├── CategoryBrowser.tsx    # Browse by occasion/price
│   ├── FeaturedProducts.tsx   # Product showcase with tabs
│   ├── Services.tsx           # Services offered
│   ├── About.tsx              # About section
│   ├── ContactSection.tsx     # Contact form
│   └── GiftFooter.tsx         # Footer with links
├── assets/                     # Images and media
└── README.md                   # Template documentation
```

### Customization Guide

#### 1. **Business Information**

**Header (GiftHeader.tsx):**
- Line 14: Change business name "The Gift Gallery"
- Line 15: Change tagline "Perfect Gifts for Every Occasion"

**Footer (GiftFooter.tsx):**
- Line 8-9: Update business name and tagline
- Lines 60-72: Update contact info (phone, email, address)

#### 2. **Hero Section (GiftHero.tsx)**

- Lines 10-16: Update headline and description
- Lines 27-39: Modify quick stats (items, customers, delivery time)

#### 3. **Categories (CategoryBrowser.tsx)**

**Occasions (Lines 4-11):**
- Modify or add occasions based on your business
- Change icons (emojis) and colors

**Price Ranges (Lines 13-18):**
- Adjust price ranges to match your inventory
- Update currency if needed (currently ₹ Indian Rupees)

#### 4. **Products (FeaturedProducts.tsx)**

**Product Lists (Lines 8-30):**
- Replace sample products with your actual products
- Update names, prices, categories
- Change product icons/emojis

**Tabs (Lines 67-89):**
- Customize tab names if needed
- Add or remove product categories

#### 5. **Services (Services.tsx)**

Lines 6-60: Customize services based on what you offer:
- Gift wrapping
- Personalization
- Bulk orders
- Scheduled delivery
- Quality guarantee
- Gift vouchers

#### 6. **About Section (About.tsx)**

- Lines 13-17: Update company story and description
- Lines 22-30: Update statistics (years, brands, etc.)

#### 7. **Contact Form (ContactSection.tsx)**

- Lines 49-123: Modify form fields as needed
- Lines 137-170: Update contact information
- Lines 172-196: Add your social media links

#### 8. **Colors**

Current color scheme: Pink/Purple gradient

To change colors, find and replace:
- `pink-600` → your primary color
- `pink-50` → your light background color
- `purple-50` → your secondary background color

Common pink/purple combinations:
- `pink-600`, `pink-700`, `pink-400` (buttons, accents)
- `from-pink-50 to-purple-50` (gradients)

### Adding Your Logo

1. Add your logo image to `/assets/` folder
2. Update `GiftHeader.tsx` line 11-16:

```tsx
<Link href="#" className="flex items-center">
  <Image
    src="/assets/your-logo.png"
    alt="Your Business Name"
    width={150}
    height={50}
  />
</Link>
```

### Deployment

1. Copy all files from `specialty-gifts/` to your Next.js project
2. Update all placeholder content with your actual business information
3. Add product images to the `/assets/` folder
4. Test locally: `npm run dev`
5. Deploy to Vercel or your hosting platform

### Integration with Main Site

To use this as a standalone template page in your website.build project:

1. Create a new route: `/app/templates/specialty-gifts/page.tsx`
2. Import the main template component
3. Add navigation link to template gallery

### Support

For customization help or questions:
- Email: support@websites.build
- Documentation: /templates/specialty-gifts/README.md

---

**Template Version:** 1.0
**Last Updated:** January 2026
**License:** Use for client projects with websites.build
