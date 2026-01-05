import { NextResponse } from 'next/server';
import { emailService } from '@/lib/email';
import { checkRateLimit, RateLimitPresets } from '@/lib/rateLimit';
import { validateEmail, validateName, validateMessage } from '@/lib/validation';

export async function POST(request: Request) {
  try {
    // Rate limiting - prevent spam attacks
    const rateLimit = checkRateLimit(request, RateLimitPresets.CONTACT_FORM);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, message: rateLimit.error },
        { status: 429 } // Too Many Requests
      );
    }

    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate and sanitize name
    const nameValidation = validateName(data.name);
    if (!nameValidation.isValid) {
      return NextResponse.json(
        { success: false, message: nameValidation.error },
        { status: 400 }
      );
    }

    // Validate and sanitize email
    const emailValidation = validateEmail(data.email);
    if (!emailValidation.isValid) {
      return NextResponse.json(
        { success: false, message: emailValidation.error },
        { status: 400 }
      );
    }

    // Validate and sanitize message
    const messageValidation = validateMessage(data.message);
    if (!messageValidation.isValid) {
      return NextResponse.json(
        { success: false, message: messageValidation.error },
        { status: 400 }
      );
    }

    // Use sanitized values
    const sanitizedData = {
      name: nameValidation.sanitized!,
      email: emailValidation.sanitized!,
      message: messageValidation.sanitized!,
    };

    // Send both emails
    try {
      await Promise.all([
        // Send notification to info@websitesbuild.in
        emailService.sendContactInquiry({
          name: sanitizedData.name,
          email: sanitizedData.email,
          message: sanitizedData.message,
        }),
        // Send auto-reply to client
        emailService.sendContactAutoReply(sanitizedData.email, sanitizedData.name, sanitizedData.message),
      ]);
      console.log('✅ Contact form emails sent successfully to:', sanitizedData.email);
    } catch (emailError) {
      console.error('❌ Error sending contact form emails:', emailError);
      // Don't fail the request, but log the error
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending contact email:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
