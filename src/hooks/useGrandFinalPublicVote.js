/**
 * hooks/useGrandFinalPublicVote.js
 *
 * Grand Final Public (Televote):
 *   - One user = one vote for one country
 *   - Cannot vote for own country (if countryId in firestoreUser)
 *   - Saves to Firestore 'publicvotes' collection
 *   - Realtime totals: { countryId: voteCount }
 */

import { useState, useEffect, useCallback } from 'react'
import { dbService } from '../services/db'
import { useAuth } from '../context/AuthContext'

export function useGrandFinalPublicVote() {
  const { currentUser, firestoreUser } = useAuth()

  const [myVote, setMyVote] = useState(null)          // countryId or null
  const [publicTotals, setPublicTotals] = useState({}) // { countryId: count }
  const [totalVoters, setTotalVoters] = useState(0)
  const [isSaving, setIsSaving] = useState(false)
  const [isReady, setIsReady] = useState(false)

  const myCountryId = firestoreUser?.countryId ?? null

  // Subscribe to user's own public vote
  useEffect(() => {
    if (!currentUser) {
      setMyVote(null)
      setIsReady(true)
      return
    }

    const unsub = dbService.onUserPublicVote(currentUser.uid, (vote) => {
      setMyVote(vote?.countryId ?? null)
      setIsReady(true)
    })

    return unsub
  }, [currentUser])

  // Subscribe to all public votes for totals
  useEffect(() => {
    const unsub = dbService.onPublicVotes((votes) => {
      const totals = {}
      votes.forEach(v => {
        if (v.countryId) {
          totals[v.countryId] = (totals[v.countryId] || 0) + 1
        }
      })
      setPublicTotals(totals)
      setTotalVoters(votes.length)
    })

    return unsub
  }, [])

  /**
   * castPublicVote — vote for a country (or re-vote to change)
   */
  const castPublicVote = useCallback(async (countryId) => {
    if (!currentUser || isSaving) return
    if (countryId === myCountryId) return // can't vote for own country

    setIsSaving(true)
    try {
      await dbService.savePublicVote({
        userId: currentUser.uid,
        userName: currentUser.displayName || 'Anonymous',
        countryId,
      })
    } catch (err) {
      console.error('castPublicVote error:', err)
    } finally {
      setIsSaving(false)
    }
  }, [currentUser, myCountryId, isSaving])

  return {
    myVote,
    publicTotals,
    totalVoters,
    isSaving,
    isReady,
    myCountryId,
    castPublicVote,
  }
}
