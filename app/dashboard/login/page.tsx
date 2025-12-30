'use client';

import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const { status } = useSession();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid credentials. Please try again.');
        setIsLoading(false);
      } else if (result?.ok) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-secondary">Loading...</p>
      </div>
    );
  }

  if (status === 'authenticated') {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-background border border-primary/20 rounded-lg p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-primary mb-2 text-center">Dashboard Login</h1>
          <p className="text-secondary text-center mb-6">Enter your credentials to access submissions</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-primary font-medium mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-accent bg-background text-primary"
                placeholder="Enter username"
                required
                autoFocus
              />
            </div>

            <div>
              <label className="block text-primary font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-accent bg-background text-primary"
                placeholder="Enter password"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent text-background py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>

            <Link
              href="/"
              className="block text-center text-secondary hover:text-accent transition-colors"
            >
              Back to Site
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
