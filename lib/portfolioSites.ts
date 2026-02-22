/**
 * Registry of websites built by websites.build.
 *
 * HOW TO ADD A NEW SITE:
 *   Add the lowercase domain (without protocol or "www") to the array below.
 *   Examples: 'freshbites.in', 'chenphotography.com', 'myshop.in'
 *
 * IMPORTANT: Keep entries lowercase and strip any path/query strings.
 *   ✓  'example.com'
 *   ✗  'https://www.example.com/home'
 */
export const portfolioSites: string[] = [
  // Add your client domains here as you build their sites:
  // 'freshbites.in',
  // 'chenphotography.com',
]

/**
 * Strips protocol, www, path, query, and hash from a URL,
 * returning just the bare lowercase domain.
 */
export function normalizeDomain(url: string): string {
  return url
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .split('/')[0]
    .split('?')[0]
    .split('#')[0]
}

/**
 * Returns true when:
 *   – the URL is empty (optional field, always allowed), OR
 *   – the portfolioSites list is empty (validation disabled until you populate it), OR
 *   – the URL's domain matches an entry in portfolioSites.
 */
export function isPortfolioSite(url: string): boolean {
  if (!url || !url.trim()) return true
  if (portfolioSites.length === 0) return true
  const domain = normalizeDomain(url)
  return portfolioSites.some(
    (site) => domain === site || domain.endsWith('.' + site)
  )
}
