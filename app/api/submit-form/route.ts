import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Add timestamp and ID
    const submission = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...data,
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
