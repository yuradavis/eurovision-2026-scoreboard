/**
 * hooks/useGrandFinalJuryVoting.js
 *
 * Grand Final Jury Voting — Eurovision rules:
 *   - 10 point values: 1,2,3,4,5,6,7,8,10,12
 *   - Each value assigned to exactly ONE country
 *   - Assigning a value to country B removes it from country A
 *   - Submit only when all 10 values are assigned
 *   - Can re-submit (overwrite) at any time
 *   - Cannot vote for own country (if countryId set in firestoreUser)
 */

import { useState, useEffect, useCallback } from 'react'
import { dbService } from '../services/db'
import { useAuth } from '../context/AuthContext'
import { POINT_VALUES } from '../data/eurovision2026'

export function useGrandFinalJuryVoting(finalistCountries) {
  const { currentUser, firestoreUser } = useAuth()

  // local: { countryId: points } — working draft
  const [localVotes, setLocalVotes] = useState({})
  // whether the user has an existing submission in Firestore
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isReady, setIsReady] = useState(false)

  // My country — cannot vote for this country
  const myCountryId = firestoreUser?.countryId ?? null

  // Load existing grand-final votes from Firestore on mount
  useEffect(() => {
    if (!currentUser) {
      setLocalVotes({})
      setHasSubmitted(false)
      setIsReady(true)
      return
    }

    const unsub = dbService.onUserStageVotes(currentUser.uid, 'grand-final', (votes) => {
      if (votes.length > 0) {
        const map = {}
        votes.forEach(v => { map[v.countryId] = v.points })
        setLocalVotes(map)
        setHasSubmitted(true)
      }
      setIsReady(true)
    })

    return unsub
  }, [currentUser])

  /**
   * assignPoint — assign a point value to a country.
   * If that point is already assigned to another country, move it.
   * If clicking the same point on the same country → deselect.
   */
  const assignPoint = useCallback((countryId, points) => {
    setLocalVotes(prev => {
      const next = { ...prev }

      // If same country already has this exact point → deselect
      if (next[countryId] === points) {
        delete next[countryId]
        return next
      }

      // Remove this point value from whoever currently has it
      const currentHolder = Object.entries(next).find(([, p]) => p === points)
      if (currentHolder) {
        delete next[currentHolder[0]]
      }

      // Assign point to the new country
      next[countryId] = points
      return next
    })
  }, [])

  /**
   * removeCountryVote — remove the point from a country entirely
   */
  const removeCountryVote = useCallback((countryId) => {
    setLocalVotes(prev => {
      const next = { ...prev }
      delete next[countryId]
      return next
    })
  }, [])

  /**
   * submitVotes — save all 10 votes to Firestore
   */
  const submitVotes = useCallback(async () => {
    if (!currentUser || !isComplete) return
    setIsSubmitting(true)
    try {
      await dbService.saveGrandFinalJuryVotes({
        userId: currentUser.uid,
        userName: currentUser.displayName || 'Anonymous',
        votes: localVotes,
      })
      setHasSubmitted(true)
    } catch (err) {
      console.error('submitVotes error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }, [currentUser, localVotes])

  // Set of point values that are currently assigned
  const assignedPoints = new Set(Object.values(localVotes))

  // All 10 point values must be used exactly once
  const isComplete = POINT_VALUES.every(p => assignedPoints.has(p))

  // Validation: no duplicates (should always be true given assignPoint logic)
  const assignedCount = Object.keys(localVotes).length

  return {
    localVotes,
    assignedPoints,
    assignedCount,
    isComplete,
    hasSubmitted,
    isSubmitting,
    isReady,
    myCountryId,
    assignPoint,
    removeCountryVote,
    submitVotes,
  }
}
