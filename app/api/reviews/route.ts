import { NextResponse } from 'next/server';
import { getApprovedReviews } from '@/lib/db';

export async function GET() {
  try {
    const reviews = await getApprovedReviews();

    // Map storage field names to the shape the UI expects
    const mapped = reviews.map((r) => ({
      id: r.id,
      name: r.name,
      websiteType: r.websiteType,
      text: r.reviewText,
      websiteUrl: r.websiteUrl || undefined,
      rating: r.rating,
    }));

    return NextResponse.json({ success: true, reviews: mapped });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ success: false, reviews: [] });
  }
}
