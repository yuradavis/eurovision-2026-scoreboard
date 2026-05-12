/**
 * hooks/useGrandFinalLeaderboard.js
 *
 * Realtime Grand Final leaderboard combining:
 *   - Jury points: aggregated from Firestore (stage = 'grand-final')
 *   - Public points: auto-calculated from semi-final totals via usePublicVote
 *
 * Returns countries sorted by combined total (juryPoints + publicPoints).
 *
 * @param {object[]} allCountries  Full Grand Final country list
 * @returns {object[]}  Sorted countries with juryPoints, publicPoints, totalPoints, rank
 */

import { useState, useEffect } from 'react'
import { dbService } from '../services/db'
import { VOTING_PHASES } from '../data/eurovision2026'
import { usePublicVote } from './usePublicVote'

export function useGrandFinalLeaderboard(allCountries) {
  const [juryTotals, setJuryTotals] = useState({})
  // Guard against undefined entries in the list
  const safeCountries = (allCountries || []).filter(Boolean)
  const { publicVote, loading: publicLoading } = usePublicVote(safeCountries)

  useEffect(() => {
    const unsub = dbService.onStageVotes(VOTING_PHASES.GRAND_FINAL, (votes) => {
      const totals = {}
      votes.forEach(({ countryId, points }) => {
        totals[countryId] = (totals[countryId] || 0) + (points || 0)
      })
      setJuryTotals(totals)
    })

    return unsub
  }, [])

  const leaderboard = safeCountries
    .map(c => {
      const juryPoints = juryTotals[c.id] || 0
      const publicPoints = publicLoading ? 0 : (publicVote[c.id] || 0)
      const totalPoints = juryPoints + publicPoints
      return { ...c, juryPoints, publicPoints, totalPoints }
    })
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .map((c, i) => ({ ...c, rank: i + 1 }))

  return { leaderboard, publicLoading }
}
