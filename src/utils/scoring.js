/**
 * Eurovision Scoring Utilities
 * Pure functions — no side effects, no Firebase dependency.
 */

export const POINT_SCALE = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12]

/**
 * Validates that a vote allocation is valid Eurovision-style
 * (each point value used exactly once, awarded to different countries)
 * @param {object} votes  - { countryId: points }
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateVotes(votes) {
  const errors = []
  const usedPoints = Object.values(votes).filter(Boolean)
  const usedSet = new Set(usedPoints)

  const invalidPoints = usedPoints.filter(p => !POINT_SCALE.includes(p))
  if (invalidPoints.length > 0) {
    errors.push(`Невірні очки: ${invalidPoints.join(', ')}`)
  }

  if (usedSet.size !== usedPoints.length) {
    errors.push('Кожне значення балів можна використати лише один раз')
  }

  return { valid: errors.length === 0, errors }
}

/**
 * Aggregates votes from multiple participants into a leaderboard
 * @param {object[]} allVotes - array of { userId, votes: { countryId: points } }
 * @returns {object[]} sorted leaderboard [{ countryId, totalScore, rank }]
 */
export function aggregateScores(allVotes) {
  const totals = {}

  allVotes.forEach(({ votes }) => {
    Object.entries(votes).forEach(([countryId, points]) => {
      totals[countryId] = (totals[countryId] || 0) + (points || 0)
    })
  })

  return Object.entries(totals)
    .map(([countryId, totalScore]) => ({ countryId, totalScore }))
    .sort((a, b) => b.totalScore - a.totalScore)
    .map((entry, index) => ({ ...entry, rank: index + 1 }))
}

/**
 * Returns the top N countries from a leaderboard
 */
export function getTopN(leaderboard, n = 10) {
  return leaderboard.slice(0, n)
}

/**
 * Formats a point value for display (e.g. "12 Points")
 */
export function formatPoints(points) {
  if (points === 12) return '12 Points Go To…'
  return `${points} ${points === 1 ? 'Point' : 'Points'}`
}
