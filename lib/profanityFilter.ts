/**
 * Basic profanity / offensive-content filter.
 * Uses word-boundary matching so words like "class" or "pass"
 * are never flagged by shorter sub-word patterns.
 *
 * Add more words to OFFENSIVE_WORDS as needed.
 */

const OFFENSIVE_WORDS: string[] = [
  // Common expletives
  'fuck', 'fucker', 'fucking', 'fucked', 'motherfucker',
  'shit', 'shitting', 'bullshit',
  'bitch', 'bastard',
  'cunt', 'cock', 'dick', 'pussy',
  'asshole', 'jackass', 'dumbass',
  'whore', 'slut',
  'piss', 'prick',
  // Slurs
  'nigger', 'nigga',
  'faggot', 'fag',
  'retard', 'retarded',
  // Threats / harmful content
  'rape', 'molest',
  'kill yourself', 'kys',
  'go die', 'drop dead',
]

/**
 * Returns true if the text contains any offensive word.
 * Single-word entries are matched with word boundaries (\b).
 * Multi-word phrases are matched with a simple includes() check.
 */
export function containsProfanity(text: string): boolean {
  if (!text) return false
  const lower = text.toLowerCase()
  return OFFENSIVE_WORDS.some((word) => {
    if (word.includes(' ')) {
      return lower.includes(word)
    }
    return new RegExp(`\\b${word}\\b`, 'i').test(lower)
  })
}
