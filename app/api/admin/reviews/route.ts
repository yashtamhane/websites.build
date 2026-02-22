import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { getReviews, updateReviewStatus, deleteReview } from '@/lib/db';

function unauthorized() {
  return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
}

// GET — return all reviews (including email + timestamp for admin use)
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return unauthorized();

  const reviews = await getReviews();
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

    const found = await updateReviewStatus(id, status);
    if (!found) {
      return NextResponse.json(
        { success: false, message: 'Review not found.' },
        { status: 404 }
      );
    }

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

    const found = await deleteReview(id);
    if (!found) {
      return NextResponse.json(
        { success: false, message: 'Review not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request.' },
      { status: 400 }
    );
  }
}
