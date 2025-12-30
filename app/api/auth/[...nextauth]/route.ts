import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        // Get credentials from environment variables
        const adminUsername = process.env.ADMIN_USERNAME || 'admin';
        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

        // Check username
        if (credentials.username !== adminUsername) {
          return null;
        }

        // If no hash is set, use default password 'admin123'
        if (!adminPasswordHash) {
          if (credentials.password === 'admin123') {
            return {
              id: '1',
              name: 'Admin',
              email: 'admin@websites.build',
            };
          }
          return null;
        }

        // Verify password against hash
        const isValid = await bcrypt.compare(credentials.password, adminPasswordHash);

        if (isValid) {
          return {
            id: '1',
            name: 'Admin',
            email: 'admin@websites.build',
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/dashboard/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
