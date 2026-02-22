import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import fs from 'fs';
import path from 'path';

const REVIEWS_PATH = path.join(process.cwd(), 'data', 'reviews.json');

function readReviews(): Record<string, unknown>[] {
  if (!fs.existsSync(REVIEWS_PATH)) return [];
  return JSON.parse(fs.readFileSync(REVIEWS_PATH, 'utf-8'));
}

function writeReviews(data: Record<string, unknown>[]): void {
  fs.writeFileSync(REVIEWS_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

function unauthorized() {
  return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
}

// GET — return all reviews (including email + timestamp for admin use)
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return unauthorized();

  const reviews = readReviews();
  return NextResponse.json({ success: true, reviews });
}

// PATCH — update a review's status  { id, status: 'approved' | 'rejected' }
export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return unauthorized();

  try {
    const { id, status } = await request.json();

    if (!id || !['approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid request body.' },
        { status: 400 }
      );
    }

    const reviews = readReviews();
    const idx = reviews.findIndex((r) => r.id === id);
    if (idx === -1) {
      return NextResponse.json(
        { success: false, message: 'Review not found.' },
        { status: 404 }
      );
    }

    reviews[idx] = { ...reviews[idx], status };
    writeReviews(reviews);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request.' },
      { status: 400 }
    );
  }
}

// DELETE — remove a review entirely  { id }
export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return unauthorized();

  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Missing review id.' },
        { status: 400 }
      );
    }

    const reviews = readReviews();
    const filtered = reviews.filter((r) => r.id !== id);

    if (filtered.length === reviews.length) {
      return NextResponse.json(
        { success: false, message: 'Review not found.' },
        { status: 404 }
      );
    }

    writeReviews(filtered);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request.' },
      { status: 400 }
    );
  }
}
