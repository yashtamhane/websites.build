import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

// ── Login rate limiter ──────────────────────────────────────────────────────
// 5 attempts per 15 minutes per IP. Stored in memory — resets on server
// restart, which is acceptable for a single-admin setup.
const LOGIN_MAX = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const loginAttempts = new Map<string, { count: number; resetTime: number }>();

function getIPFromHeaders(headers: Record<string, string | string[] | undefined>): string {
  const fwd = headers['x-forwarded-for'];
  if (typeof fwd === 'string') return fwd.split(',')[0].trim();
  if (Array.isArray(fwd)) return fwd[0].split(',')[0].trim();
  const real = headers['x-real-ip'];
  if (typeof real === 'string') return real.trim();
  return 'unknown';
}

function isLoginAllowed(ip: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || now > entry.resetTime) {
    loginAttempts.set(ip, { count: 1, resetTime: now + LOGIN_WINDOW_MS });
    return true;
  }
  entry.count += 1;
  return entry.count <= LOGIN_MAX;
}

// ── Auth options ────────────────────────────────────────────────────────────

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        // Rate limit by IP before doing any expensive work
        const ip = getIPFromHeaders(
          (req?.headers ?? {}) as Record<string, string | string[] | undefined>
        );
        if (!isLoginAllowed(ip)) {
          // Return null silently — don't reveal rate-limit status to attackers
          return null;
        }

        const adminUsername = process.env.ADMIN_USERNAME;
        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

        // Fail hard if username is not configured — prevents a missing env var
        // from defaulting to a guessable value
        if (!adminUsername) return null;

        if (credentials.username !== adminUsername) {
          return null;
        }

        // No hash configured — fall back to plain ADMIN_PASSWORD for local dev only
        if (!adminPasswordHash) {
          const devPassword = process.env.ADMIN_PASSWORD;
          if (devPassword && credentials.password === devPassword) {
            return { id: '1', name: 'Admin', email: 'admin@websitesbuild.in' };
          }
          return null;
        }

        // bcrypt.compare is timing-safe by design
        const isValid = await bcrypt.compare(credentials.password, adminPasswordHash);
        if (isValid) {
          return { id: '1', name: 'Admin', email: 'admin@websitesbuild.in' };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/dashboard/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60, // 8 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as { id?: string }).id = token.id as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
