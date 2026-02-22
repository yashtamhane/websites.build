'use client'

import { useState, useEffect, useCallback } from 'react'

interface StoredReview {
  id: string
  name: string
  email: string
  websiteType: 'business' | 'portfolio'
  reviewText: string
  websiteUrl?: string
  rating: number
  timestamp: string
  status: 'pending' | 'approved' | 'rejected'
}

const STAR_PATH =
  'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'

function MiniStars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={12} height={12} viewBox="0 0 24 24" fill={i <= Math.round(rating) ? '#f15a25' : '#d1d5db'}>
          <path d={STAR_PATH} />
        </svg>
      ))}
      <span className="text-xs text-secondary ml-1">{rating}/5</span>
    </span>
  )
}

type Tab = 'pending' | 'approved' | 'rejected'

export default function ReviewsPanel() {
  const [reviews, setReviews] = useState<StoredReview[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<Tab>('pending')
  const [toast, setToast] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null)

  const showToast = (msg: string, type: 'ok' | 'err') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/reviews')
      if (res.ok) {
        const data = await res.json()
        setReviews(
          (data.reviews as StoredReview[]).sort(
            (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          )
        )
      }
    } catch {
      // silent
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchReviews()
  }, [fetchReviews])

  const handleAction = async (id: string, action: 'approve' | 'reject' | 'delete') => {
    // Optimistic update
    setReviews((prev) =>
      action === 'delete'
        ? prev.filter((r) => r.id !== id)
        : prev.map((r) =>
            r.id === id
              ? { ...r, status: action === 'approve' ? 'approved' : 'rejected' }
              : r
          )
    )

    try {
      const res = await fetch('/api/admin/reviews', {
        method: action === 'delete' ? 'DELETE' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          action === 'delete'
            ? { id }
            : { id, status: action === 'approve' ? 'approved' : 'rejected' }
        ),
      })
      if (!res.ok) throw new Error()
      showToast(
        action === 'approve'
          ? 'Review approved and published.'
          : action === 'reject'
          ? 'Review rejected.'
          : 'Review deleted.',
        'ok'
      )
    } catch {
      await fetchReviews()
      showToast('Something went wrong. Please try again.', 'err')
    }
  }

  const counts = {
    pending: reviews.filter((r) => r.status === 'pending').length,
    approved: reviews.filter((r) => r.status === 'approved').length,
    rejected: reviews.filter((r) => r.status === 'rejected').length,
  }

  const visible = reviews.filter((r) => r.status === activeTab)

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'pending', label: 'Pending', count: counts.pending },
    { key: 'approved', label: 'Approved', count: counts.approved },
    { key: 'rejected', label: 'Rejected', count: counts.rejected },
  ]

  if (loading) {
    return <div className="py-12 text-center text-secondary">Loading reviews…</div>
  }

  return (
    <div className="relative">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Pending', value: counts.pending, color: 'text-amber-500' },
          { label: 'Approved', value: counts.approved, color: 'text-emerald-500' },
          { label: 'Rejected', value: counts.rejected, color: 'text-secondary' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-background border border-primary/20 rounded-lg p-4 text-center">
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-secondary mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-primary/5 rounded-xl p-1">
        {tabs.map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
              activeTab === key
                ? 'bg-white text-primary shadow-sm'
                : 'text-secondary hover:text-primary'
            }`}
          >
            {key === 'pending' && count > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
            )}
            {label}
            <span
              className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
                activeTab === key ? 'bg-primary/10 text-primary' : 'bg-primary/5 text-secondary'
              }`}
            >
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* Cards */}
      {visible.length === 0 ? (
        <div className="text-center py-12 text-secondary">
          <p className="text-sm">No {activeTab} reviews.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {visible.map((review) => (
            <ReviewCard key={review.id} review={review} onAction={handleAction} />
          ))}
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-xl text-sm font-semibold text-white shadow-lg z-50 ${
            toast.type === 'ok' ? 'bg-emerald-500' : 'bg-red-500'
          }`}
        >
          {toast.msg}
        </div>
      )}
    </div>
  )
}

function ReviewCard({
  review,
  onAction,
}: {
  review: StoredReview
  onAction: (id: string, action: 'approve' | 'reject' | 'delete') => Promise<void>
}) {
  const [busy, setBusy] = useState<string | null>(null)

  const handleAction = async (action: 'approve' | 'reject' | 'delete') => {
    setBusy(action)
    await onAction(review.id, action)
    setBusy(null)
  }

  const date = new Date(review.timestamp).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="bg-background border border-primary/20 rounded-lg p-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <p className="font-semibold text-primary text-sm truncate">{review.name}</p>
          <p className="text-xs text-secondary/60 truncate">{review.email}</p>
        </div>
        <span
          className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex-shrink-0 ${
            review.websiteType === 'business'
              ? 'bg-accent/10 text-accent'
              : 'bg-primary/10 text-primary'
          }`}
        >
          {review.websiteType === 'business' ? 'Business' : 'Portfolio'}
        </span>
      </div>

      <div className="flex items-center justify-between mb-3">
        <MiniStars rating={review.rating} />
        <span className="text-xs text-secondary/50">{date}</span>
      </div>

      <p className="text-sm text-secondary leading-relaxed mb-3 bg-primary/[0.03] border border-primary/10 rounded-lg px-3 py-2 italic">
        &ldquo;{review.reviewText}&rdquo;
      </p>

      {review.websiteUrl && (
        <a
          href={review.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-accent hover:underline mb-3"
        >
          {review.websiteUrl}
          <svg width={10} height={10} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      )}

      <div className="flex items-center gap-2 pt-3 border-t border-primary/10">
        {review.status === 'pending' && (
          <>
            <button
              onClick={() => handleAction('approve')}
              disabled={busy !== null}
              className="flex-1 py-2 rounded-lg text-xs font-semibold text-white bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {busy === 'approve' ? '…' : '✓ Approve'}
            </button>
            <button
              onClick={() => handleAction('reject')}
              disabled={busy !== null}
              className="flex-1 py-2 rounded-lg text-xs font-semibold text-white bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {busy === 'reject' ? '…' : '✕ Reject'}
            </button>
          </>
        )}
        <button
          onClick={() => handleAction('delete')}
          disabled={busy !== null}
          className="flex-1 py-2 rounded-lg text-xs font-semibold text-white bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {busy === 'delete' ? '…' : '🗑 Delete'}
        </button>
      </div>
    </div>
  )
}
