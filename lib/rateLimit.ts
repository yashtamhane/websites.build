/**
 * Rate limiting middleware to prevent spam and DOS attacks
 * Limits requests per IP address within a time window
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting
// For production, consider using Redis for distributed systems
const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup old entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 10 * 60 * 1000);

export interface RateLimitConfig {
  /** Maximum number of requests allowed in the time window */
  maxRequests: number;
  /** Time window in milliseconds (default: 1 hour) */
  windowMs: number;
  /** Custom identifier (defaults to IP address) */
  identifier?: string;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  error?: string;
}

/**
 * Check if a request is within rate limits
 * @param request - The incoming request
 * @param config - Rate limit configuration
 * @returns Rate limit result
 */
export function checkRateLimit(
  request: Request,
  config: RateLimitConfig
): RateLimitResult {
  const { maxRequests, windowMs, identifier } = config;

  // Get client IP address
  const ip = identifier || getClientIP(request);
  const now = Date.now();

  // Get or create rate limit entry
  let entry = rateLimitStore.get(ip);

  // If no entry or window expired, create new entry
  if (!entry || now > entry.resetTime) {
    entry = {
      count: 1,
      resetTime: now + windowMs,
    };
    rateLimitStore.set(ip, entry);

    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetTime: entry.resetTime,
    };
  }

  // Increment counter
  entry.count++;

  // Check if limit exceeded
  if (entry.count > maxRequests) {
    const minutesUntilReset = Math.ceil((entry.resetTime - now) / 60000);
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
      error: `Too many requests. Please try again in ${minutesUntilReset} minute${minutesUntilReset > 1 ? 's' : ''}.`,
    };
  }

  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    resetTime: entry.resetTime,
  };
}

/**
 * Get client IP address from request headers
 * Handles various proxy and CDN headers
 */
function getClientIP(request: Request): string {
  // Try various headers in order of preference
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(',')[0].trim();
  }

  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP.trim();
  }

  const cfConnectingIP = request.headers.get('cf-connecting-ip'); // Cloudflare
  if (cfConnectingIP) {
    return cfConnectingIP.trim();
  }

  const vercelForwardedFor = request.headers.get('x-vercel-forwarded-for'); // Vercel
  if (vercelForwardedFor) {
    return vercelForwardedFor.split(',')[0].trim();
  }

  // Fallback to a default value
  return 'unknown';
}

/**
 * Preset rate limit configurations for common use cases
 */
export const RateLimitPresets = {
  /** Strict limits for contact forms: 5 requests per hour */
  CONTACT_FORM: {
    maxRequests: 5,
    windowMs: 60 * 60 * 1000, // 1 hour
  },

  /** Strict limits for project forms: 3 requests per hour */
  PROJECT_FORM: {
    maxRequests: 3,
    windowMs: 60 * 60 * 1000, // 1 hour
  },

  /** Moderate limits for API endpoints: 100 requests per 15 minutes */
  API_GENERAL: {
    maxRequests: 100,
    windowMs: 15 * 60 * 1000, // 15 minutes
  },

  /** Lenient limits for read-only operations: 300 requests per 15 minutes */
  READ_ONLY: {
    maxRequests: 300,
    windowMs: 15 * 60 * 1000, // 15 minutes
  },
};

/**
 * Clear rate limit for a specific IP (admin use)
 */
export function clearRateLimit(ip: string): void {
  rateLimitStore.delete(ip);
}

/**
 * Get current rate limit status for an IP
 */
export function getRateLimitStatus(ip: string): RateLimitEntry | null {
  return rateLimitStore.get(ip) || null;
}
