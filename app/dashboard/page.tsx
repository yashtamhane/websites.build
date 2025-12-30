'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Submission {
  id: string;
  timestamp: string;
  businessName: string;
  businessType: string;
  currentWebsite?: string;
  templateChoice: 'template' | 'custom';
  selectedTemplate?: string;
  customDescription?: string;
  features: string[];
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  twitter?: string;
  email: string;
  phone: string;
  additionalNotes?: string;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/dashboard/login');
    } else if (status === 'authenticated') {
      fetchSubmissions();
    }
  }, [status, router]);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/submissions');
      if (response.ok) {
        const data = await response.json();
        setSubmissions(data.submissions || []);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSubmissions = submissions.filter((sub) =>
    sub.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.businessType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-secondary">Loading...</p>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-background py-4 px-6 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex gap-3">
            <button
              onClick={handleLogout}
              className="bg-background/20 px-4 py-2 rounded-lg hover:bg-background/30 transition-colors"
            >
              Logout
            </button>
            <Link
              href="/"
              className="bg-accent px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors"
            >
              Back to Site
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by business name, type, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-accent"
          />
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-secondary">Loading submissions...</p>
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-secondary">
              {searchTerm ? 'No submissions found matching your search.' : 'No submissions yet.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Submissions List */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Submissions ({filteredSubmissions.length})
              </h2>
              {filteredSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  onClick={() => setSelectedSubmission(submission)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedSubmission?.id === submission.id
                      ? 'border-accent bg-accent/5'
                      : 'border-primary/20 hover:border-accent/50 bg-background'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-primary">{submission.businessName}</h3>
                    <span className="text-xs text-secondary">
                      {formatDate(submission.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-secondary">{submission.businessType}</p>
                  <p className="text-sm text-secondary mt-1">{submission.email}</p>
                  <div className="mt-2 flex gap-2">
                    {submission.templateChoice === 'template' ? (
                      <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                        Template
                      </span>
                    ) : (
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                        Custom
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Submission Details */}
            <div className="lg:sticky lg:top-6 h-fit">
              {selectedSubmission ? (
                <div className="bg-background border border-primary/20 rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-primary mb-6">
                    {selectedSubmission.businessName}
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-primary mb-1">Business Type</h3>
                      <p className="text-secondary">{selectedSubmission.businessType}</p>
                    </div>

                    {selectedSubmission.currentWebsite && (
                      <div>
                        <h3 className="font-semibold text-primary mb-1">Current Website</h3>
                        <a
                          href={selectedSubmission.currentWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline"
                        >
                          {selectedSubmission.currentWebsite}
                        </a>
                      </div>
                    )}

                    <div>
                      <h3 className="font-semibold text-primary mb-1">Website Type</h3>
                      <p className="text-secondary">
                        {selectedSubmission.templateChoice === 'template'
                          ? `Template: ${selectedSubmission.selectedTemplate}`
                          : 'Custom Design'}
                      </p>
                    </div>

                    {selectedSubmission.customDescription && (
                      <div>
                        <h3 className="font-semibold text-primary mb-1">Vision Description</h3>
                        <p className="text-secondary">{selectedSubmission.customDescription}</p>
                      </div>
                    )}

                    {selectedSubmission.features.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-primary mb-1">Required Features</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedSubmission.features.map((feature, index) => (
                            <span
                              key={index}
                              className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <h3 className="font-semibold text-primary mb-1">Contact Information</h3>
                      <p className="text-secondary">Email: {selectedSubmission.email}</p>
                      <p className="text-secondary">Phone: {selectedSubmission.phone}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-primary mb-1">Social Media</h3>
                      <div className="space-y-1">
                        {selectedSubmission.instagram && (
                          <p className="text-secondary">Instagram: {selectedSubmission.instagram}</p>
                        )}
                        {selectedSubmission.facebook && (
                          <p className="text-secondary">Facebook: {selectedSubmission.facebook}</p>
                        )}
                        {selectedSubmission.linkedin && (
                          <p className="text-secondary">LinkedIn: {selectedSubmission.linkedin}</p>
                        )}
                        {selectedSubmission.twitter && (
                          <p className="text-secondary">Twitter: {selectedSubmission.twitter}</p>
                        )}
                      </div>
                    </div>

                    {selectedSubmission.additionalNotes && (
                      <div>
                        <h3 className="font-semibold text-primary mb-1">Additional Notes</h3>
                        <p className="text-secondary">{selectedSubmission.additionalNotes}</p>
                      </div>
                    )}

                    <div className="pt-4 border-t border-primary/10">
                      <p className="text-xs text-secondary">
                        Submitted: {formatDate(selectedSubmission.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-background border border-primary/20 rounded-lg p-12 text-center">
                  <p className="text-secondary">Select a submission to view details</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
