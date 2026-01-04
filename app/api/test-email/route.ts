import { NextResponse } from 'next/server';
import { emailService } from '@/lib/email';

export async function GET() {
  try {
    console.log('Testing email configuration...');
    console.log('SMTP_HOST:', process.env.SMTP_HOST);
    console.log('SMTP_PORT:', process.env.SMTP_PORT);
    console.log('SMTP_USER:', process.env.SMTP_USER);
    console.log('SMTP_PASSWORD:', process.env.SMTP_PASSWORD ? '***set***' : 'NOT SET');

    // Try sending a test email
    await emailService.sendContactInquiry({
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a test email to verify SMTP configuration.',
    });

    return NextResponse.json(
      { success: true, message: 'Test email sent successfully!' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Email test failed:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Email test failed',
        error: error.message,
        details: error.toString()
      },
      { status: 500 }
    );
  }
}
