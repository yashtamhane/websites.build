import nodemailer from 'nodemailer';

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Email templates and functions
export const emailService = {
  // Send contact form inquiry to info@websitesbuild.in
  async sendContactInquiry(data: {
    name: string;
    email: string;
    message: string;
  }) {
    const mailOptions = {
      from: `"websites.build Contact Form" <${process.env.SMTP_USER}>`,
      to: 'info@websitesbuild.in',
      replyTo: data.email,
      subject: `New Contact Inquiry from ${data.name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #2563eb; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #1f2937; }
              .value { color: #4b5563; margin-top: 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Contact Inquiry</h2>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Name:</div>
                  <div class="value">${data.name}</div>
                </div>
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value">${data.email}</div>
                </div>
                <div class="field">
                  <div class="label">Message:</div>
                  <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
New Contact Inquiry

Name: ${data.name}
Email: ${data.email}
Message: ${data.message}
      `,
    };

    return transporter.sendMail(mailOptions);
  },

  // Send project form submission to forms@websitesbuild.in
  async sendProjectSubmission(data: any) {
    const mailOptions = {
      from: `"websites.build Project Form" <${process.env.SMTP_USER}>`,
      to: 'forms@websitesbuild.in',
      replyTo: data.email,
      subject: `New Project Request - ${data.businessName || data.fullName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 700px; margin: 0 auto; padding: 20px; }
              .header { background: #2563eb; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
              .section { margin-bottom: 25px; padding: 15px; background: white; border-radius: 6px; }
              .section-title { font-size: 18px; font-weight: bold; color: #1f2937; margin-bottom: 15px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; }
              .field { margin-bottom: 12px; }
              .label { font-weight: bold; color: #4b5563; }
              .value { color: #6b7280; margin-top: 3px; }
              .list { margin-left: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Project Request</h2>
                <p style="margin: 5px 0 0 0; opacity: 0.9;">Submission ID: ${data.id}</p>
              </div>
              <div class="content">
                <div class="section">
                  <div class="section-title">Contact Information</div>
                  <div class="field">
                    <div class="label">Full Name:</div>
                    <div class="value">${data.fullName}</div>
                  </div>
                  <div class="field">
                    <div class="label">Email:</div>
                    <div class="value">${data.email}</div>
                  </div>
                  <div class="field">
                    <div class="label">Phone:</div>
                    <div class="value">${data.phone}</div>
                  </div>
                </div>

                <div class="section">
                  <div class="section-title">Project Type</div>
                  <div class="field">
                    <div class="value">${data.projectType}</div>
                  </div>
                </div>

                ${data.businessName ? `
                <div class="section">
                  <div class="section-title">Business Information</div>
                  <div class="field">
                    <div class="label">Business Name:</div>
                    <div class="value">${data.businessName}</div>
                  </div>
                  ${data.industry ? `
                  <div class="field">
                    <div class="label">Industry:</div>
                    <div class="value">${data.industry}</div>
                  </div>
                  ` : ''}
                </div>
                ` : ''}

                ${data.features && data.features.length > 0 ? `
                <div class="section">
                  <div class="section-title">Features Required</div>
                  <ul class="list">
                    ${data.features.map((feature: string) => `<li>${feature}</li>`).join('')}
                  </ul>
                </div>
                ` : ''}

                ${data.hasContentReady !== undefined ? `
                <div class="section">
                  <div class="section-title">Content</div>
                  <div class="field">
                    <div class="label">Content Ready:</div>
                    <div class="value">${data.hasContentReady ? 'Yes' : 'No - Need help with content'}</div>
                  </div>
                </div>
                ` : ''}

                ${data.budget ? `
                <div class="section">
                  <div class="section-title">Budget</div>
                  <div class="field">
                    <div class="value">${data.budget}</div>
                  </div>
                </div>
                ` : ''}

                ${data.timeline ? `
                <div class="section">
                  <div class="section-title">Timeline</div>
                  <div class="field">
                    <div class="value">${data.timeline}</div>
                  </div>
                </div>
                ` : ''}

                ${data.additionalInfo ? `
                <div class="section">
                  <div class="section-title">Additional Information</div>
                  <div class="field">
                    <div class="value">${data.additionalInfo.replace(/\n/g, '<br>')}</div>
                  </div>
                </div>
                ` : ''}

                ${data.hearAboutUs ? `
                <div class="section">
                  <div class="section-title">How They Found Us</div>
                  <div class="field">
                    <div class="value">${data.hearAboutUs}</div>
                  </div>
                </div>
                ` : ''}

                <div class="section">
                  <div class="section-title">Submission Details</div>
                  <div class="field">
                    <div class="label">Submitted:</div>
                    <div class="value">${new Date(data.timestamp).toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    return transporter.sendMail(mailOptions);
  },

  // Send auto-reply to client after project form submission
  async sendProjectAutoReply(clientEmail: string, clientName: string) {
    const mailOptions = {
      from: `"websites.build" <noreply@websitesbuild.in>`,
      to: clientEmail,
      subject: 'Thank you for your project inquiry - websites.build',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #2563eb; color: white; padding: 30px 20px; border-radius: 8px 8px 0 0; text-align: center; }
              .content { background: #ffffff; padding: 30px 20px; border: 1px solid #e5e7eb; border-top: none; }
              .footer { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; text-align: center; font-size: 14px; color: #6b7280; }
              .button { display: inline-block; background: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
              h1 { margin: 0; font-size: 24px; }
              p { margin: 15px 0; }
              .highlight { background: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Thank You for Your Inquiry!</h1>
              </div>
              <div class="content">
                <p>Hi ${clientName},</p>

                <p>Thank you for reaching out to websites.build! We've received your project inquiry and are excited to learn more about your vision.</p>

                <div class="highlight">
                  <strong>What happens next?</strong><br>
                  Our team will carefully review your requirements and get back to you within 24-48 hours with a personalized response, timeline, and quote.
                </div>

                <p>In the meantime, feel free to:</p>
                <ul>
                  <li>Browse our <a href="https://websitesbuild.in/templates" style="color: #2563eb;">template gallery</a> for inspiration</li>
                  <li>Check out our <a href="https://websitesbuild.in/faq" style="color: #2563eb;">FAQ</a> for common questions</li>
                  <li>Reach out to us at <a href="mailto:info@websitesbuild.in" style="color: #2563eb;">info@websitesbuild.in</a> if you have any immediate questions</li>
                </ul>

                <p>We look forward to bringing your vision to life!</p>

                <p style="margin-top: 30px;">
                  Best regards,<br>
                  <strong>The websites.build Team</strong>
                </p>
              </div>
              <div class="footer">
                <p style="margin: 0;">This is an automated message. Please do not reply to this email.</p>
                <p style="margin: 10px 0 0 0;">For inquiries, contact us at <a href="mailto:info@websitesbuild.in" style="color: #2563eb;">info@websitesbuild.in</a></p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
Hi ${clientName},

Thank you for reaching out to websites.build! We've received your project inquiry and are excited to learn more about your vision.

WHAT HAPPENS NEXT?
Our team will carefully review your requirements and get back to you within 24-48 hours with a personalized response, timeline, and quote.

In the meantime, feel free to:
- Browse our template gallery at https://websitesbuild.in/templates
- Check out our FAQ at https://websitesbuild.in/faq
- Reach out to us at info@websitesbuild.in if you have any immediate questions

We look forward to bringing your vision to life!

Best regards,
The websites.build Team

---
This is an automated message. Please do not reply to this email.
For inquiries, contact us at info@websitesbuild.in
      `,
    };

    return transporter.sendMail(mailOptions);
  },
};
