/**
 * hooks/usePublicVote.js
 *
 * Calculates Grand Final public (televote) points automatically from
 * the combined Semi Final 1 + Semi Final 2 Firestore totals.
 *
 * Eurovision televote scale (top 10 only):
 *   1st → 12 · 2nd → 10 · 3rd → 8 · 4th → 7 · 5th → 6
 *   6th → 5 · 7th → 4 · 8th → 3 · 9th → 2 · 10th → 1 · rest → 0
 *
 * Big 5 + Host (semi === null) are excluded from ranking → publicPoints = 0
 *
 * @param {object[]} allCountries  Full list of Grand Final countries
 * @returns {{ publicVote: object, loading: boolean }}
 *   publicVote: { [countryId]: points }
 */

import { useState, useEffect } from 'react'
import { dbService } from '../services/db'
import { VOTING_PHASES } from '../data/eurovision2026'

const TELEVOTE_SCALE = [12, 10, 8, 7, 6, 5, 4, 3, 2, 1]

export function usePublicVote(allCountries) {
  const [semi1Totals, setSemi1Totals] = useState({})
  const [semi2Totals, setSemi2Totals] = useState({})
  const [semi1Ready, setSemi1Ready] = useState(false)
  const [semi2Ready, setSemi2Ready] = useState(false)

  useEffect(() => {
    const unsub1 = dbService.onStageVotes(VOTING_PHASES.SEMI_1, (votes) => {
      const totals = {}
      votes.forEach(({ countryId, points }) => {
        totals[countryId] = (totals[countryId] || 0) + (points || 0)
      })
      setSemi1Totals(totals)
      setSemi1Ready(true)
    })

    const unsub2 = dbService.onStageVotes(VOTING_PHASES.SEMI_2, (votes) => {
      const totals = {}
      votes.forEach(({ countryId, points }) => {
        totals[countryId] = (totals[countryId] || 0) + (points || 0)
      })
      setSemi2Totals(totals)
      setSemi2Ready(true)
    })

    return () => {
      unsub1()
      unsub2()
    }
  }, [])

  const loading = !semi1Ready || !semi2Ready

  // Merge semi totals and convert to televote points
  const publicVote = {}

  if (!loading) {
    // Only countries that participated in semi-finals are eligible
    // Big 5 + Host (semi === null) are excluded from Public Vote ranking
    const eligible = allCountries.filter(c => c.semi !== null)
    const ineligible = allCountries.filter(c => c.semi === null)

    // Sum semi-1 + semi-2 for eligible countries only
    const combined = eligible.map(c => ({
      id: c.id,
      semiTotal: (semi1Totals[c.id] || 0) + (semi2Totals[c.id] || 0),
    }))

    // Sort descending by combined semi total
    combined.sort((a, b) => b.semiTotal - a.semiTotal)

    // Assign Eurovision televote points to top 10
    combined.forEach((entry, i) => {
      publicVote[entry.id] = TELEVOTE_SCALE[i] ?? 0
    })

    // Big 5 + Host always get 0 public points
    ineligible.forEach(c => {
      publicVote[c.id] = 0
    })
  }

  return { publicVote, loading }
}
