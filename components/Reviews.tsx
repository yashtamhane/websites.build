'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { containsProfanity } from '@/lib/profanityFilter'
import { isPortfolioSite } from '@/lib/portfolioSites'

// ─── Types ─────────────────────────────────────────────────────────────────

interface Review {
  id: string | number
  name: string
  websiteType: 'business' | 'portfolio'
  text: string
  websiteUrl?: string
  rating: number
}

// ─── Star icon (display) ────────────────────────────────────────────────────

const STAR_PATH =
  'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'

function StarIcon({
  type,
  size = 'sm',
}: {
  type: 'full' | 'half' | 'empty'
  size?: 'sm' | 'lg'
}) {
  const dim = size === 'lg' ? 28 : 16
  const filled = '#f15a25'
  const empty = '#d1d5db'

  if (type === 'full') {
    return (
      <svg width={dim} height={dim} viewBox="0 0 24 24" style={{ fill: filled, flexShrink: 0 }}>
        <path d={STAR_PATH} />
      </svg>
    )
  }
  if (type === 'empty') {
    return (
      <svg width={dim} height={dim} viewBox="0 0 24 24" style={{ fill: empty, flexShrink: 0 }}>
        <path d={STAR_PATH} />
      </svg>
    )
  }
  // Half star — left half filled, right half empty
  return (
    <span
      style={{
        position: 'relative',
        display: 'inline-block',
        width: dim,
        height: dim,
        flexShrink: 0,
      }}
    >
      <svg
        width={dim}
        height={dim}
        viewBox="0 0 24 24"
        style={{ fill: empty, position: 'absolute', top: 0, left: 0 }}
      >
        <path d={STAR_PATH} />
      </svg>
      <span
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          overflow: 'hidden',
          display: 'block',
        }}
      >
        <svg width={dim} height={dim} viewBox="0 0 24 24" style={{ fill: filled }}>
          <path d={STAR_PATH} />
        </svg>
      </span>
    </span>
  )
}

// ─── Star rating display ────────────────────────────────────────────────────

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <div style={{ display: 'flex', gap: 2 }}>
        {[1, 2, 3, 4, 5].map((i) => {
          const type =
            i <= Math.floor(rating)
              ? 'full'
              : i === Math.ceil(rating) && rating % 1 >= 0.5
              ? 'half'
              : 'empty'
          return <StarIcon key={i} type={type} />
        })}
      </div>
      <span className="text-xs font-semibold text-secondary" style={{ marginLeft: 4 }}>
        {rating % 1 === 0 ? `${rating}.0` : rating}/5
      </span>
    </div>
  )
}

// ─── Brand name highlighter ─────────────────────────────────────────────────

function highlightBrand(text: string) {
  const parts = text.split('websites.build')
  return parts.map((part, i) => (
    <span key={i}>
      {part}
      {i < parts.length - 1 && (
        <>
          <span className="font-bold text-primary not-italic">websites</span>
          <span className="font-bold text-accent not-italic">.build</span>
        </>
      )}
    </span>
  ))
}

// ─── Review card ────────────────────────────────────────────────────────────

function ReviewCard({ review }: { review: Review }) {
  return (
    <div
      className="flex-shrink-0 bg-white rounded-2xl border border-primary/10 shadow-sm flex flex-col"
      style={{ width: 300, padding: '1.5rem' }}
    >
      {/* Top row: tag + rating */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 12 }}>
        <span
          className={`text-xs font-bold px-3 py-1 rounded-full ${
            review.websiteType === 'business'
              ? 'bg-accent/10 text-accent'
              : 'bg-primary/10 text-primary'
          }`}
          style={{ flexShrink: 0 }}
        >
          {review.websiteType === 'business' ? 'Business' : 'Portfolio'}
        </span>
        <StarDisplay rating={review.rating} />
      </div>

      {/* Quote icon */}
      <svg
        width={22}
        height={22}
        viewBox="0 0 24 24"
        style={{ fill: '#f15a25', opacity: 0.2, marginBottom: 10, flexShrink: 0 }}
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>

      {/* Review text */}
      <p
        className="text-secondary text-sm leading-relaxed italic"
        style={{ flexGrow: 1, marginBottom: 16, display: '-webkit-box', WebkitLineClamp: 7, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
      >
        {highlightBrand(review.text)}{'"'}
      </p>

      {/* Attribution */}
      <div style={{ borderTop: '1px solid rgba(67,73,77,0.1)', paddingTop: 14 }}>
        <p className="text-sm font-semibold text-primary">{review.name}</p>
        {review.websiteUrl && (
          <a
            href={review.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs hover:underline"
            style={{ color: '#f15a25', marginTop: 4 }}
          >
            View Website
            <svg width={11} height={11} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>
    </div>
  )
}

// ─── Interactive star rating input (for form) ───────────────────────────────

function StarRatingInput({
  value,
  onChange,
}: {
  value: number
  onChange: (v: number) => void
}) {
  const [hoverValue, setHoverValue] = useState(0)
  const display = hoverValue || value

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      {[1, 2, 3, 4, 5].map((starNum) => {
        const starType =
          starNum <= Math.floor(display)
            ? 'full'
            : starNum === Math.ceil(display) && display % 1 >= 0.5
            ? 'half'
            : 'empty'
        return (
          <div key={starNum} style={{ position: 'relative', width: 32, height: 32, cursor: 'pointer' }}>
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              <StarIcon type={starType} size="lg" />
            </div>
            <div
              style={{ position: 'absolute', left: 0, top: 0, width: '50%', height: '100%' }}
              onMouseEnter={() => setHoverValue(starNum - 0.5)}
              onMouseLeave={() => setHoverValue(0)}
              onClick={() => onChange(starNum - 0.5)}
            />
            <div
              style={{ position: 'absolute', right: 0, top: 0, width: '50%', height: '100%' }}
              onMouseEnter={() => setHoverValue(starNum)}
              onMouseLeave={() => setHoverValue(0)}
              onClick={() => onChange(starNum)}
            />
          </div>
        )
      })}
      {display > 0 && (
        <span className="text-sm font-semibold text-secondary" style={{ marginLeft: 6 }}>
          {display % 1 === 0 ? `${display}.0` : display}/5
        </span>
      )}
    </div>
  )
}

// ─── Review form modal ──────────────────────────────────────────────────────

function ReviewForm({
  onClose,
  onSubmitted,
}: {
  onClose: () => void
  onSubmitted: () => void
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [websiteType, setWebsiteType] = useState<'business' | 'portfolio' | ''>('')
  const [reviewText, setReviewText] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [rating, setRating] = useState(0)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const submittingRef = useRef(false)

  const MAX_TEXT = 300

  // Lock body scroll + close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const validate = () => {
    const e: Record<string, string> = {}
    if (!name.trim() || name.trim().length < 2)
      e.name = 'Please enter your name (min 2 chars)'
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = 'Please enter a valid email address'
    if (!websiteType)
      e.websiteType = 'Please select the type of website we built for you'
    if (!reviewText.trim() || reviewText.trim().length < 20)
      e.reviewText = 'Review must be at least 20 characters'
    if (reviewText.length > MAX_TEXT)
      e.reviewText = `Review must be ${MAX_TEXT} characters or less`
    // Profanity check
    if (containsProfanity(reviewText) || containsProfanity(name))
      e.reviewText = 'Your review contains inappropriate language. Please revise it.'
    if (rating === 0)
      e.rating = 'Please select a rating'
    // Portfolio URL check
    if (websiteUrl.trim() && !/^(https?:\/\/)?[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(websiteUrl.trim()))
      e.websiteUrl = 'Please enter a valid URL (e.g. https://yourwebsite.com)'
    else if (websiteUrl.trim() && !isPortfolioSite(websiteUrl.trim()))
      e.websiteUrl = "We couldn't verify this as a website built by us. Please double-check the URL, or leave it blank."
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submittingRef.current) return
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    submittingRef.current = true
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/submit-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, websiteType, reviewText, websiteUrl, rating }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        onSubmitted() // trigger re-fetch in parent so review appears immediately
        // submittingRef stays true — success screen prevents any resubmission
      } else {
        // Surface server-side error (e.g. profanity caught server-side)
        setErrors({ reviewText: data.message || 'Submission failed.' })
        submittingRef.current = false // allow retry
      }
    } catch {
      setStatus('error')
      submittingRef.current = false // allow retry on network error
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl border bg-white text-primary placeholder:text-secondary/50 text-sm outline-none transition-all focus:ring-2 focus:ring-accent/30 focus:border-accent/60'
  const labelClass = 'block text-sm font-semibold text-primary mb-1.5'
  const errorClass = 'text-xs text-red-500 mt-1'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(67,73,77,0.65)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="relative bg-background rounded-2xl w-full max-w-lg shadow-2xl overflow-y-auto"
        style={{ maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: '1px solid rgba(67,73,77,0.1)' }}
        >
          <div>
            <h3 className="text-xl font-bold text-primary">Share Your Story</h3>
            <p className="text-sm text-secondary mt-0.5">We'd love to hear about your experience</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-secondary hover:bg-primary/10 transition-colors"
            aria-label="Close"
          >
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Success state */}
        {status === 'success' ? (
          <div className="px-6 py-12 text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: 'rgba(241,90,37,0.1)' }}
            >
              <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="#f15a25" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-primary mb-2">Review submitted!</h4>
            <p className="text-secondary text-sm leading-relaxed">
              Your review is pending approval. We'll publish it shortly — thank you for taking the time to share your experience!
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-8 py-3 rounded-full text-sm font-semibold text-background transition-all hover:scale-105"
              style={{ background: '#f15a25' }}
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="px-6 py-5 space-y-4">

            {/* Name */}
            <div>
              <label className={labelClass}>Your Name *</label>
              <input
                type="text"
                placeholder="e.g. Priya Sharma"
                value={name}
                onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: '' })) }}
                className={`${inputClass} ${errors.name ? 'border-red-400' : 'border-primary/20'}`}
              />
              {errors.name && <p className={errorClass}>{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className={labelClass}>Email Address *</label>
              <input
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: '' })) }}
                className={`${inputClass} ${errors.email ? 'border-red-400' : 'border-primary/20'}`}
              />
              <p className="text-xs text-secondary/60 mt-1">Used only to verify your review — never shown publicly.</p>
              {errors.email && <p className={errorClass}>{errors.email}</p>}
            </div>

            {/* Website Type */}
            <div>
              <label className={labelClass}>Type of Website We Built *</label>
              <div className="flex gap-3">
                {(['business', 'portfolio'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => { setWebsiteType(type); setErrors((p) => ({ ...p, websiteType: '' })) }}
                    className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold border-2 transition-all capitalize ${
                      websiteType === type
                        ? 'border-accent bg-accent/10 text-accent'
                        : 'border-primary/20 bg-white text-secondary hover:border-accent/40'
                    }`}
                  >
                    {type === 'business' ? '💼 Business' : '🎨 Portfolio'}
                  </button>
                ))}
              </div>
              {errors.websiteType && <p className={errorClass}>{errors.websiteType}</p>}
            </div>

            {/* Rating */}
            <div>
              <label className={labelClass}>Your Rating *</label>
              <StarRatingInput
                value={rating}
                onChange={(v) => { setRating(v); setErrors((p) => ({ ...p, rating: '' })) }}
              />
              {errors.rating && <p className={errorClass}>{errors.rating}</p>}
            </div>

            {/* Review text */}
            <div>
              <label className={labelClass}>
                Your Review *
                <span
                  className={`ml-2 font-normal ${
                    reviewText.length > MAX_TEXT ? 'text-red-500' : 'text-secondary/60'
                  }`}
                >
                  ({reviewText.length}/{MAX_TEXT})
                </span>
              </label>
              <textarea
                rows={3}
                placeholder="Tell us about your experience with websites.build..."
                value={reviewText}
                onChange={(e) => { setReviewText(e.target.value); setErrors((p) => ({ ...p, reviewText: '' })) }}
                className={`${inputClass} resize-none ${errors.reviewText ? 'border-red-400' : 'border-primary/20'}`}
                maxLength={MAX_TEXT}
              />
              {errors.reviewText && <p className={errorClass}>{errors.reviewText}</p>}
            </div>

            {/* Website URL (optional) */}
            <div>
              <label className={labelClass}>
                Your Website URL{' '}
                <span className="font-normal text-secondary/60">(optional)</span>
              </label>
              <input
                type="url"
                placeholder="https://yourwebsite.com"
                value={websiteUrl}
                onChange={(e) => { setWebsiteUrl(e.target.value); setErrors((p) => ({ ...p, websiteUrl: '' })) }}
                className={`${inputClass} ${errors.websiteUrl ? 'border-red-400' : 'border-primary/20'}`}
              />
              <p className="text-xs text-secondary/60 mt-1">
                Only websites built by us are accepted here.
              </p>
              {errors.websiteUrl && <p className={errorClass}>{errors.websiteUrl}</p>}
            </div>

            {/* Generic error banner */}
            {status === 'error' && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx={12} cy={12} r={10} />
                  <path strokeLinecap="round" d="M12 8v4M12 16h.01" />
                </svg>
                Something went wrong. Please try again later.
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-full text-sm font-semibold text-background transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{ background: '#f15a25' }}
            >
              {isSubmitting ? 'Publishing…' : 'Publish My Review →'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

// ─── Main Reviews section ───────────────────────────────────────────────────

export default function Reviews({ initialReviews = [] }: { initialReviews?: Review[] }) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const trackRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)
  const lastTimestampRef = useRef(0)
  const animRef = useRef<number | undefined>(undefined)
  const [showForm, setShowForm] = useState(false)
  const SPEED = 38 // px/s

  // Derive allCards inside the component so it reacts to state
  const allCards = reviews.length > 0 ? [...reviews, ...reviews] : []

  // Fetch approved reviews from the API
  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch('/api/reviews')
      const data = await res.json()
      if (data.success) setReviews(data.reviews)
    } catch {
      // silently fail — carousel stays empty
    }
  }, [])

  useEffect(() => {
    fetchReviews()
  }, [fetchReviews])

  // Auto-scroll animation
  const animate = useCallback((timestamp: number) => {
    const track = trackRef.current
    if (track) {
      if (!pausedRef.current && lastTimestampRef.current > 0) {
        const dt = Math.min((timestamp - lastTimestampRef.current) / 1000, 0.05)
        track.scrollLeft += SPEED * dt
        const halfWidth = track.scrollWidth / 2
        if (halfWidth > 0 && track.scrollLeft >= halfWidth) {
          track.scrollLeft -= halfWidth
        }
      }
      lastTimestampRef.current = timestamp
    }
    animRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    animRef.current = requestAnimationFrame(animate)
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [animate])

  const scrollBy = (direction: 'left' | 'right') => {
    const track = trackRef.current
    if (!track) return
    const CARD_W = 300 + 20
    track.scrollTo({ left: track.scrollLeft + (direction === 'right' ? CARD_W : -CARD_W), behavior: 'smooth' })
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            What Our Clients Say
          </h2>
          <p className="text-secondary max-w-xl mx-auto">
            Real stories from real people who trusted us with their online presence.
          </p>
        </div>

        {/* Carousel — only shown when there are reviews */}
        {reviews.length > 0 && (
          <div className="relative">
            {/* Fade edges */}
            <div
              className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
              style={{ width: 72, background: 'linear-gradient(to right, #f9f5e9, transparent)' }}
            />
            <div
              className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
              style={{ width: 72, background: 'linear-gradient(to left, #f9f5e9, transparent)' }}
            />

            {/* Left arrow */}
            <button
              onClick={() => scrollBy('left')}
              aria-label="Scroll left"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-primary/15 shadow-md flex items-center justify-center text-primary hover:border-accent hover:text-accent transition-colors"
            >
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Scrollable track */}
            <div
              ref={trackRef}
              className="flex gap-5 overflow-x-hidden py-4 px-2"
              style={{ scrollBehavior: 'auto', cursor: 'grab' }}
              onMouseEnter={() => { pausedRef.current = true }}
              onMouseLeave={() => { pausedRef.current = false }}
            >
              {allCards.map((review, idx) => (
                <ReviewCard key={`${review.id}-${idx}`} review={review} />
              ))}
            </div>

            {/* Right arrow */}
            <button
              onClick={() => scrollBy('right')}
              aria-label="Scroll right"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-primary/15 shadow-md flex items-center justify-center text-primary hover:border-accent hover:text-accent transition-colors"
            >
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-secondary text-sm mb-5">Had a great experience with us?</p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 bg-accent text-background px-10 py-4 rounded-full text-base font-semibold hover:bg-accent/90 transition-all transform hover:scale-105"
          >
            Share Your Story
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Review form modal */}
      {showForm && (
        <ReviewForm
          onClose={() => setShowForm(false)}
          onSubmitted={fetchReviews}
        />
      )}
    </section>
  )
}
