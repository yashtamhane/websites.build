import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { emailService } from '@/lib/email';
import { checkRateLimit, RateLimitPresets } from '@/lib/rateLimit';
import { validateEmail, validateName, validatePhone, validateTextField, validateMessage } from '@/lib/validation';

export async function POST(request: Request) {
  try {
    // Rate limiting - prevent spam attacks (stricter for project forms)
    const rateLimit = checkRateLimit(request, RateLimitPresets.PROJECT_FORM);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, message: rateLimit.error },
        { status: 429 } // Too Many Requests
      );
    }

    const data = await request.json();

    // Validate required fields
    if (!data.fullName || !data.email || !data.phone || !data.projectType) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate and sanitize full name
    const nameValidation = validateName(data.fullName);
    if (!nameValidation.isValid) {
      return NextResponse.json(
        { success: false, message: `Full Name: ${nameValidation.error}` },
        { status: 400 }
      );
    }

    // Validate and sanitize email
    const emailValidation = validateEmail(data.email);
    if (!emailValidation.isValid) {
      return NextResponse.json(
        { success: false, message: `Email: ${emailValidation.error}` },
        { status: 400 }
      );
    }

    // Validate and sanitize phone
    const phoneValidation = validatePhone(data.phone);
    if (!phoneValidation.isValid) {
      return NextResponse.json(
        { success: false, message: `Phone: ${phoneValidation.error}` },
        { status: 400 }
      );
    }

    // Validate project type
    const projectTypeValidation = validateTextField(data.projectType, 'Project Type', 2, 100);
    if (!projectTypeValidation.isValid) {
      return NextResponse.json(
        { success: false, message: projectTypeValidation.error },
        { status: 400 }
      );
    }

    // Build sanitized submission object
    const sanitizedData: Record<string, any> = {
      fullName: nameValidation.sanitized!,
      email: emailValidation.sanitized!,
      phone: phoneValidation.sanitized!,
      projectType: projectTypeValidation.sanitized!,
    };

    // Validate optional fields
    if (data.businessName) {
      const businessNameValidation = validateTextField(data.businessName, 'Business Name', 2, 200);
      if (!businessNameValidation.isValid) {
        return NextResponse.json(
          { success: false, message: businessNameValidation.error },
          { status: 400 }
        );
      }
      sanitizedData.businessName = businessNameValidation.sanitized!;
    }

    if (data.industry) {
      const industryValidation = validateTextField(data.industry, 'Industry', 2, 100);
      if (!industryValidation.isValid) {
        return NextResponse.json(
          { success: false, message: industryValidation.error },
          { status: 400 }
        );
      }
      sanitizedData.industry = industryValidation.sanitized!;
    }

    if (data.features && Array.isArray(data.features)) {
      // Validate each feature
      const sanitizedFeatures = [];
      for (const feature of data.features) {
        if (typeof feature === 'string') {
          const featureValidation = validateTextField(feature, 'Feature', 1, 100);
          if (featureValidation.isValid) {
            sanitizedFeatures.push(featureValidation.sanitized!);
          }
        }
      }
      sanitizedData.features = sanitizedFeatures;
    }

    if (data.budget) {
      const budgetValidation = validateTextField(data.budget, 'Budget', 2, 50);
      if (!budgetValidation.isValid) {
        return NextResponse.json(
          { success: false, message: budgetValidation.error },
          { status: 400 }
        );
      }
      sanitizedData.budget = budgetValidation.sanitized!;
    }

    if (data.timeline) {
      const timelineValidation = validateTextField(data.timeline, 'Timeline', 2, 100);
      if (!timelineValidation.isValid) {
        return NextResponse.json(
          { success: false, message: timelineValidation.error },
          { status: 400 }
        );
      }
      sanitizedData.timeline = timelineValidation.sanitized!;
    }

    if (data.additionalInfo) {
      const additionalInfoValidation = validateMessage(data.additionalInfo, 2000);
      if (!additionalInfoValidation.isValid) {
        return NextResponse.json(
          { success: false, message: `Additional Info: ${additionalInfoValidation.error}` },
          { status: 400 }
        );
      }
      sanitizedData.additionalInfo = additionalInfoValidation.sanitized!;
    }

    if (data.hearAboutUs) {
      const hearAboutUsValidation = validateTextField(data.hearAboutUs, 'How did you hear about us', 2, 200);
      if (!hearAboutUsValidation.isValid) {
        return NextResponse.json(
          { success: false, message: hearAboutUsValidation.error },
          { status: 400 }
        );
      }
      sanitizedData.hearAboutUs = hearAboutUsValidation.sanitized!;
    }

    // Boolean fields (safe from XSS)
    if (typeof data.hasContentReady === 'boolean') {
      sanitizedData.hasContentReady = data.hasContentReady;
    }

    // Add timestamp and ID
    const submission = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...sanitizedData,
    };

    // Read existing submissions
    const filePath = path.join(process.cwd(), 'data', 'submissions.json');
    let submissions = [];

    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      submissions = JSON.parse(fileContent);
    } catch (error) {
      // File doesn't exist or is empty, start with empty array
      submissions = [];
    }

    // Add new submission
    submissions.push(submission);

    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(submissions, null, 2));

    // Send emails (don't block response if email fails)
    Promise.all([
      // Send notification to forms@websitesbuild.in
      emailService.sendProjectSubmission(submission),
      // Send auto-reply to client
      emailService.sendProjectAutoReply(sanitizedData.email, sanitizedData.fullName),
    ]).catch((error) => {
      console.error('Error sending emails:', error);
      // Log error but don't fail the request
    });

    return NextResponse.json(
      { success: true, message: 'Form submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit form' },
      { status: 500 }
    );
  }
}
