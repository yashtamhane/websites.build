import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  // Only authenticated admins may read submissions
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const filePath = path.join(process.cwd(), 'data', 'submissions.json');

    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const submissions = JSON.parse(fileContent);

      // Sort by timestamp, newest first
      submissions.sort((a: { timestamp: string }, b: { timestamp: string }) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

      return NextResponse.json({ success: true, submissions }, { status: 200 });
    } catch {
      // File doesn't exist yet
      return NextResponse.json({ success: true, submissions: [] }, { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}
