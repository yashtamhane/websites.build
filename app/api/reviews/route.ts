import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface StoredReview {
  id: string;
  name: string;
  websiteType: 'business' | 'portfolio';
  reviewText: string;
  websiteUrl?: string;
  rating: number;
  status: string;
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'reviews.json');

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ success: true, reviews: [] });
    }

    const all: StoredReview[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Only serve approved reviews; map storage keys to the shape the UI expects
    const approved = all
      .filter((r) => r.status === 'approved')
      .map((r) => ({
        id: r.id,
        name: r.name,
        websiteType: r.websiteType,
        text: r.reviewText,          // storage uses "reviewText", UI uses "text"
        websiteUrl: r.websiteUrl || undefined,
        rating: r.rating,
      }));

    return NextResponse.json({ success: true, reviews: approved });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ success: false, reviews: [] });
  }
}
