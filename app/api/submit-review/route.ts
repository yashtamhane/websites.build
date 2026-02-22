import { NextResponse } from 'next/server';
import { checkRateLimit, RateLimitPresets } from '@/lib/rateLimit';
import { validateName, validateEmail, validateMessage, validateTextField } from '@/lib/validation';
import { sanitizeForEmail } from '@/lib/validation';
import { containsProfanity } from '@/lib/profanityFilter';
import { isPortfolioSite } from '@/lib/portfolioSites';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    // Rate limit — 5 per hour per IP
    const rateLimit = checkRateLimit(request, RateLimitPresets.CONTACT_FORM);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, message: rateLimit.error },
        { status: 429 }
      );
    }

    const data = await request.json();
    const { name, email, websiteType, reviewText, websiteUrl, rating } = data;

    // Required field presence check
    if (!name || !email || !websiteType || !reviewText || rating == null) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields.' },
        { status: 400 }
      );
    }

    // Validate name
    const nameResult = validateName(name);
    if (!nameResult.isValid) {
      return NextResponse.json({ success: false, message: nameResult.error }, { status: 400 });
    }

    // Validate email
    const emailResult = validateEmail(email);
    if (!emailResult.isValid) {
      return NextResponse.json({ success: false, message: emailResult.error }, { status: 400 });
    }

    // Validate website type
    if (!['business', 'portfolio'].includes(websiteType)) {
      return NextResponse.json(
        { success: false, message: 'Invalid website type.' },
        { status: 400 }
      );
    }

    // Validate review text (min 10 chars, max 300 chars)
    const textResult = validateMessage(reviewText, 300);
    if (!textResult.isValid) {
      return NextResponse.json({ success: false, message: textResult.error }, { status: 400 });
    }

    // Server-side profanity check (catches anyone who bypasses the client filter)
    if (containsProfanity(reviewText) || containsProfanity(name)) {
      return NextResponse.json(
        { success: false, message: 'Your review contains inappropriate language. Please revise it.' },
        { status: 400 }
      );
    }

    // Validate rating
    const numRating = parseFloat(String(rating));
    if (isNaN(numRating) || numRating < 0.5 || numRating > 5) {
      return NextResponse.json(
        { success: false, message: 'Rating must be between 0.5 and 5.' },
        { status: 400 }
      );
    }
    if (Math.round(numRating * 2) / 2 !== numRating) {
      return NextResponse.json(
        { success: false, message: 'Rating must be in 0.5 increments.' },
        { status: 400 }
      );
    }

    // Validate optional URL — must be from our portfolio
    let sanitizedUrl = '';
    if (websiteUrl && websiteUrl.trim()) {
      const urlResult = validateTextField(websiteUrl.trim(), 'Website URL', 5, 500);
      if (!urlResult.isValid) {
        return NextResponse.json({ success: false, message: urlResult.error }, { status: 400 });
      }
      if (!isPortfolioSite(websiteUrl.trim())) {
        return NextResponse.json(
          {
            success: false,
            message:
              "We couldn't verify this as a website built by us. Please double-check the URL, or leave it blank.",
          },
          { status: 400 }
        );
      }
      sanitizedUrl = urlResult.sanitized!;
    }

    // Build submission — status is 'pending' until approved in the admin panel
    const submission = {
      id: `review_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      name: nameResult.sanitized!,
      email: emailResult.sanitized!,
      websiteType,
      reviewText: textResult.sanitized!,
      websiteUrl: sanitizedUrl,
      rating: numRating,
      timestamp: new Date().toISOString(),
      status: 'pending',
    };

    // ── Save to reviews.json ────────────────────────────────────────────────
    try {
      const dataDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
      const filePath = path.join(dataDir, 'reviews.json');
      const existing = fs.existsSync(filePath)
        ? JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        : [];
      existing.push(submission);
      fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), 'utf-8');
    } catch (fsErr) {
      console.error('❌ Failed to save review to file:', fsErr);
    }

    // ── Notify us via email ─────────────────────────────────────────────────
    try {
      const stars = '★'.repeat(Math.floor(numRating)) + (numRating % 1 >= 0.5 ? '½' : '');
      await transporter.sendMail({
        from: `"websites.build Reviews" <${process.env.SMTP_USER}>`,
        to: 'info@websitesbuild.in',
        replyTo: submission.email,
        subject: `New Review — ${numRating}/5 from ${submission.name} (pending approval)`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #f15a25; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                .content { background: #f9f5e9; padding: 20px; border-radius: 0 0 8px 8px; }
                .field { margin-bottom: 14px; }
                .label { font-weight: bold; color: #43494d; }
                .value { color: #7d746f; margin-top: 4px; }
                .review-box { background: #fff; padding: 14px; border-left: 4px solid #f15a25; margin: 16px 0; font-style: italic; color: #43494d; }
                .pending-badge { display:inline-block; background:#f59e0b; color:#fff; padding:3px 10px; border-radius:999px; font-size:12px; font-weight:bold; margin-left:8px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2 style="margin:0">New Review <span class="pending-badge">PENDING</span></h2>
                  <p style="margin:6px 0 0;opacity:.9">This review passed all checks and is awaiting your approval in the admin panel.</p>
                </div>
                <div class="content">
                  <div class="field"><div class="label">Name:</div><div class="value">${sanitizeForEmail(submission.name)}</div></div>
                  <div class="field"><div class="label">Email:</div><div class="value">${sanitizeForEmail(submission.email)}</div></div>
                  <div class="field"><div class="label">Website Type:</div><div class="value" style="text-transform:capitalize">${sanitizeForEmail(submission.websiteType)}</div></div>
                  <div class="field"><div class="label">Rating:</div><div class="value">${stars} ${numRating}/5</div></div>
                  ${submission.websiteUrl ? `<div class="field"><div class="label">Their Website:</div><div class="value">${sanitizeForEmail(submission.websiteUrl)}</div></div>` : ''}
                  <div class="review-box">"${sanitizeForEmail(submission.reviewText)}"</div>
                  <div class="field"><div class="label">Submitted:</div><div class="value">${new Date(submission.timestamp).toLocaleString('en-IN')}</div></div>
                  <div class="field"><div class="label">ID:</div><div class="value" style="font-family:monospace;font-size:12px">${submission.id}</div></div>
                </div>
              </div>
            </body>
          </html>
        `,
        text: `
New Review — PENDING APPROVAL
==============================
Name:         ${submission.name}
Email:        ${submission.email}
Type:         ${submission.websiteType}
Rating:       ${numRating}/5
Website:      ${submission.websiteUrl || 'Not provided'}

"${submission.reviewText}"

Submitted: ${new Date(submission.timestamp).toLocaleString('en-IN')}
ID: ${submission.id}
        `.trim(),
      });
    } catch (emailErr) {
      console.error('❌ Failed to send review email:', emailErr);
    }

    return NextResponse.json(
      { success: true, message: 'Review published successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in submit-review route:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
