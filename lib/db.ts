/**
 * Database abstraction layer.
 *
 * Currently backed by MongoDB Atlas.
 * To migrate to a different database (e.g. MySQL on Hostinger):
 *   – Swap the MongoClient connection for your new driver
 *   – Re-implement the exported functions below
 *   – Everything else in the codebase stays unchanged
 */

import { MongoClient } from 'mongodb';

// ── Types ────────────────────────────────────────────────────────────────────

export interface Review {
  id: string;
  name: string;
  email: string;
  websiteType: 'business' | 'portfolio';
  reviewText: string;
  websiteUrl?: string;
  rating: number;
  timestamp: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Submission {
  id: string;
  timestamp: string;
  [key: string]: unknown;
}

// ── Connection (cached for serverless) ───────────────────────────────────────

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error('MONGODB_URI environment variable is not set');

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development, cache the connection on the global object so hot-reloads
  // don't create a new connection on every file change.
  const g = global as typeof globalThis & { _mongoClientPromise?: Promise<MongoClient> };
  if (!g._mongoClientPromise) {
    g._mongoClientPromise = new MongoClient(uri).connect();
  }
  clientPromise = g._mongoClientPromise;
} else {
  clientPromise = new MongoClient(uri).connect();
}

async function getDb() {
  const client = await clientPromise;
  return client.db('websitesbuild');
}

// ── Review operations ────────────────────────────────────────────────────────

/** All reviews — for admin panel */
export async function getReviews(): Promise<Review[]> {
  const db = await getDb();
  return db
    .collection<Review>('reviews')
    .find({}, { projection: { _id: 0 } })
    .sort({ timestamp: -1 })
    .toArray() as Review[];
}

/** Approved reviews only — for public carousel */
export async function getApprovedReviews(): Promise<Review[]> {
  const db = await getDb();
  return db
    .collection<Review>('reviews')
    .find({ status: 'approved' }, { projection: { _id: 0 } })
    .sort({ timestamp: -1 })
    .toArray() as Review[];
}

/** Insert a new review */
export async function saveReview(review: Review): Promise<void> {
  const db = await getDb();
  await db.collection('reviews').insertOne({ ...review });
}

/** Update a review's status. Returns false if the id wasn't found. */
export async function updateReviewStatus(
  id: string,
  status: 'approved' | 'rejected'
): Promise<boolean> {
  const db = await getDb();
  const result = await db.collection('reviews').updateOne({ id }, { $set: { status } });
  return result.matchedCount > 0;
}

/** Permanently delete a review. Returns false if the id wasn't found. */
export async function deleteReview(id: string): Promise<boolean> {
  const db = await getDb();
  const result = await db.collection('reviews').deleteOne({ id });
  return result.deletedCount > 0;
}

// ── Submission operations ─────────────────────────────────────────────────────

/** All submissions — for admin panel */
export async function getSubmissions(): Promise<Submission[]> {
  const db = await getDb();
  return db
    .collection('submissions')
    .find({}, { projection: { _id: 0 } })
    .sort({ timestamp: -1 })
    .toArray() as Submission[];
}

/** Insert a new submission */
export async function saveSubmission(submission: Record<string, unknown>): Promise<void> {
  const db = await getDb();
  await db.collection('submissions').insertOne({ ...submission });
}
