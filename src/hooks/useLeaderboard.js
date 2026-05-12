/**
 * hooks/useLeaderboard.js
 *
 * Realtime leaderboard for a given stage.
 * Aggregates all votes from all users, sorted descending by total points.
 *
 * @param {string} stage          'semi-1' | 'semi-2'
 * @param {object[]} countriesList  The country data array for this stage
 * @returns {object[]}  Sorted array of countries with `totalPoints` and `rank`
 */

import { useState, useEffect } from 'react'
import { dbService } from '../services/db'

export function useLeaderboard(stage, countriesList) {
  const [leaderboard, setLeaderboard] = useState([])

  useEffect(() => {
    const unsub = dbService.onStageVotes(stage, (votes) => {
      // Sum all points per country
      const totals = {}
      votes.forEach(({ countryId, points }) => {
        totals[countryId] = (totals[countryId] || 0) + (points || 0)
      })

      // Merge with country metadata, sort descending
      const ranked = countriesList
        .map(c => ({
          ...c,
          totalPoints: totals[c.id] || 0,
        }))
        .sort((a, b) => b.totalPoints - a.totalPoints)
        .map((c, i) => ({ ...c, rank: i + 1 }))

      setLeaderboard(ranked)
    })

    return unsub
  }, [stage]) // countriesList is stable (imported constant)

  return leaderboard
}
